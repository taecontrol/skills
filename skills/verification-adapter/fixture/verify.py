#!/usr/bin/env python3
"""Canonical verification CLI for the local counter fixture."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import secrets
import shutil
import signal
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

from common import (
    SCHEMA_VERSION,
    SUPPORTED_SURFACE,
    TARGET_ID,
    ControlError,
    RunPaths,
    adapter_digest,
    assert_recorded_ownership,
    assert_observed_identity,
    atomic_write_json,
    build_procedure_digest,
    candidate_digest,
    environment_identity,
    evidence_safe_identity,
    execute_recorded,
    feature_map_digest,
    fixture_dir,
    http_json,
    load_manifest,
    load_metadata,
    now,
    paths_for,
    read_json,
    register_artifact,
    sha256_file,
    write_manifest,
)


def make_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Launch, inspect, and record the exact local counter candidate. "
            "Successful commands are control outcomes, never product acceptance."
        ),
        epilog=(
            "Exit 0: operation completed; 2: unsafe/invalid invocation; "
            "3: unreachable, stale, unsupported, timeout, or ambiguous; "
            "4: evidence invalid. Example: verify.py --root .runs --run-id pv-1 "
            "doctor --candidate <sha256>"
        ),
    )
    parser.add_argument("--root", required=True, help="isolated runtime/evidence root")
    parser.add_argument("--run-id", required=True, help="unique owned run namespace")
    parser.add_argument(
        "--acknowledge-shared-target",
        action="store_true",
        help="explicitly acknowledge a reserved shared/default run_id (default: refused)",
    )
    commands = parser.add_subparsers(dest="command", required=True, metavar="COMMAND")

    commands.add_parser("info", help="report configured identities and artifact paths")
    provision = commands.add_parser("provision", help="launch an isolated exact candidate")
    provision.add_argument("--candidate", required=True, help="immutable candidate digest")
    provision.add_argument(
        "--timeout", type=float, default=3.0, help="readiness seconds (default: 3.0)"
    )

    doctor = commands.add_parser("doctor", help="compare expected and observed identities")
    _identity_arguments(doctor)

    restart = commands.add_parser("restart", help="restart the owned instance in place")
    restart.add_argument(
        "--timeout", type=float, default=3.0, help="readiness seconds (default: 3.0)"
    )
    commands.add_parser("stop", help="stop only the instance proven owned by this run")
    commands.add_parser("clean", help="remove owned runtime state and preserve evidence")
    commands.add_parser("capture", help="capture an identity and counter observation")

    wait = commands.add_parser("wait", help="wait for an observable counter value")
    wait.add_argument("--expected", type=int, required=True)
    wait.add_argument("--timeout", type=float, default=1.0, help="seconds (default: 1.0)")

    observe = commands.add_parser(
        "observe-persistent",
        help="compare the product API with a separate read-only state-file view",
    )
    observe.add_argument("--expected", type=int, required=True)

    support = commands.add_parser(
        "check-support", help="fail closed when a requested user surface is unsupported"
    )
    support.add_argument("--surface", required=True)

    evidence = commands.add_parser(
        "verify-evidence", help="verify manifest identities and artifact integrity"
    )
    _identity_arguments(evidence)
    return parser


def _identity_arguments(parser: argparse.ArgumentParser) -> None:
    parser.add_argument("--candidate", required=True, help="expected candidate digest")
    parser.add_argument(
        "--adapter", default=None, help="expected adapter digest (default: local adapter)"
    )
    parser.add_argument(
        "--feature-map",
        default=None,
        help="expected Feature Map digest (default: local Feature Map)",
    )


def create_manifest(paths: RunPaths, metadata: dict[str, Any]) -> dict[str, Any]:
    return {
        "schema_version": SCHEMA_VERSION,
        "run_id": paths.run_id,
        "source_revision": f"content-sha256:{metadata['candidate_digest']}",
        "candidate_digest": metadata["candidate_digest"],
        "adapter_digest": metadata["adapter_digest"],
        "feature_map_digest": metadata["feature_map_digest"],
        "features_exercised": [],
        "build_procedure_digest": metadata["build_procedure_digest"],
        "lockfile_identity": "stdlib-no-lockfile",
        "environment": metadata["environment"],
        "target": TARGET_ID,
        "data_store": metadata["data_store"],
        "run_owner_digest": hashlib.sha256(
            metadata["owner_token"].encode()
        ).hexdigest(),
        "created_at": now(),
        "actions": [],
        "observations": [],
        "artifacts": [],
        "cleanup": {"status": "not_run"},
        "limitations": [],
        "redaction": {
            "applied": True,
            "fields": ["owner_token"],
            "secrets_recorded": False,
        },
    }


def terminate_spawned(process: subprocess.Popen[Any]) -> None:
    """Stop only the child handle created by this invocation."""
    if process.poll() is not None:
        return
    try:
        process.terminate()
    except ProcessLookupError:
        process.wait(timeout=1)
        return
    try:
        process.wait(timeout=1)
    except subprocess.TimeoutExpired:
        try:
            process.kill()
        except ProcessLookupError:
            pass
        process.wait(timeout=1)


def launch(paths: RunPaths, metadata: dict[str, Any], timeout: float) -> dict[str, Any]:
    if timeout <= 0:
        raise ControlError("invalid_timeout", "timeout must be positive", exit_code=2)
    generation = int(metadata.get("generation", 0)) + 1
    paths.ready.unlink(missing_ok=True)
    log_path = paths.evidence / f"service-{generation:04d}.log"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    command = [
        sys.executable,
        str(fixture_dir() / "service.py"),
        "--runtime-dir",
        str(paths.runtime),
        "--ready-file",
        str(paths.ready),
        "--run-id",
        paths.run_id,
        "--owner-token",
        metadata["owner_token"],
        "--candidate",
        metadata["candidate_digest"],
        "--adapter",
        metadata["adapter_digest"],
        "--generation",
        str(generation),
    ]
    with log_path.open("ab", buffering=0) as log:
        process = subprocess.Popen(
            command,
            cwd=fixture_dir(),
            stdin=subprocess.DEVNULL,
            stdout=log,
            stderr=subprocess.STDOUT,
            start_new_session=True,
        )
    try:
        deadline = time.monotonic() + timeout
        ready: dict[str, Any] | None = None
        while time.monotonic() < deadline:
            if process.poll() is not None:
                raise ControlError(
                    "launch_failed",
                    "product service exited before readiness",
                    details={"exit_code": process.returncode, "log": str(log_path)},
                )
            if paths.ready.exists():
                try:
                    ready = read_json(paths.ready, "launch_failed")
                except ControlError as error:
                    raise ControlError(
                        "launch_failed",
                        "product readiness evidence is unreadable or malformed",
                        details={"read_reason": error.reason},
                    ) from error
                break
            time.sleep(0.02)
        if ready is None:
            raise ControlError("timeout", "product readiness timed out")
        ready_pid = int(ready["pid"])
        ready_port = int(ready["port"])
        if ready_pid != process.pid:
            raise ControlError(
                "ownership_unknown",
                "ready identity does not name the spawned process",
                details={"spawned_pid": process.pid, "observed_pid": ready_pid},
            )
        launching_metadata = {**metadata, "pid": ready_pid, "port": ready_port}
        observed = http_json(ready_port, "GET", "/health")
        assert_observed_identity(launching_metadata, observed)
        metadata.update(
            {
                "pid": ready_pid,
                "port": ready_port,
                "generation": generation,
                "log_path": str(log_path),
                "status": "running",
            }
        )
        atomic_write_json(paths.metadata, metadata)
    except ControlError:
        terminate_spawned(process)
        raise
    except (KeyError, TypeError, ValueError) as error:
        terminate_spawned(process)
        raise ControlError(
            "launch_failed", "product readiness identity is incomplete or malformed"
        ) from error
    except OSError as error:
        terminate_spawned(process)
        raise ControlError(
            "launch_failed", "owned runtime metadata could not be persisted"
        ) from error
    return {"port": metadata["port"], "generation": generation}


def provision(paths: RunPaths, candidate: str, timeout: float) -> dict[str, Any]:
    if len(candidate) != 64 or any(character not in "0123456789abcdef" for character in candidate):
        raise ControlError(
            "invalid_identity",
            "candidate digest must be a lowercase SHA-256 value",
            exit_code=2,
        )
    observed_candidate = candidate_digest()
    if candidate != observed_candidate:
        raise ControlError(
            "stale_or_wrong_target",
            "requested candidate does not match the executable product source",
            details={"expected": candidate, "observed": observed_candidate},
        )
    if paths.runtime.exists() or paths.evidence.exists():
        raise ControlError(
            "run_exists",
            "run_id already has runtime or retained evidence; choose a fresh run_id",
            exit_code=2,
        )
    paths.runtime.mkdir(parents=True)
    paths.evidence.mkdir(parents=True)
    owner_token = secrets.token_hex(24)
    metadata: dict[str, Any] = {
        "run_id": paths.run_id,
        "owner_token": owner_token,
        "candidate_digest": candidate,
        "adapter_digest": adapter_digest(),
        "feature_map_digest": feature_map_digest(),
        "build_procedure_digest": build_procedure_digest(),
        "environment": environment_identity(),
        "target": TARGET_ID,
        "runtime_dir": str(paths.runtime),
        "data_store": str(paths.state),
        "status": "provisioning",
        "generation": 0,
    }
    atomic_write_json(paths.state, {"counter": 0})
    atomic_write_json(paths.metadata, metadata)
    write_manifest(paths, create_manifest(paths, metadata))
    try:
        launched = launch(paths, metadata, timeout)
    except ControlError:
        shutil.rmtree(paths.runtime)
        raise
    return {
        "status": "completed",
        "operation": "provision",
        "run_id": paths.run_id,
        "candidate_digest": candidate,
        "adapter_digest": metadata["adapter_digest"],
        "feature_map_digest": metadata["feature_map_digest"],
        "port": launched["port"],
        "artifact_location": str(paths.evidence),
    }


def info(paths: RunPaths) -> dict[str, Any]:
    current = {
        "candidate_digest": candidate_digest(),
        "adapter_digest": adapter_digest(),
        "feature_map_digest": feature_map_digest(),
        "build_procedure_digest": build_procedure_digest(),
        "environment": environment_identity(),
    }
    if not paths.metadata.exists():
        return {
            "status": "completed",
            "operation": "info",
            "project": "verification-adapter-counter-fixture",
            "checkout": str(fixture_dir()),
            "target": TARGET_ID,
            "run_id": paths.run_id,
            "active_run": False,
            **current,
            "artifact_location": str(paths.evidence),
            "runtime_status": "not_provisioned",
        }
    metadata = load_metadata(paths)
    return {
        "status": "completed",
        "operation": "info",
        "project": "verification-adapter-counter-fixture",
        "checkout": str(fixture_dir()),
        "target": metadata["target"],
        "run_id": paths.run_id,
        "active_run": True,
        "candidate_digest": metadata["candidate_digest"],
        "adapter_digest": metadata["adapter_digest"],
        "feature_map_digest": metadata["feature_map_digest"],
        "build_procedure_digest": metadata["build_procedure_digest"],
        "environment": metadata["environment"],
        "current_inputs": current,
        "artifact_location": str(paths.evidence),
        "runtime_status": metadata["status"],
    }


def identity_mismatches(
    paths: RunPaths,
    recorded: dict[str, Any],
    candidate: str,
    adapter: str | None,
    feature_map: str | None,
) -> tuple[dict[str, Any], dict[str, Any]]:
    current = {
        "candidate_digest": candidate_digest(),
        "adapter_digest": adapter_digest(),
        "feature_map_digest": feature_map_digest(),
        "build_procedure_digest": build_procedure_digest(),
        "environment": environment_identity(),
        "target": TARGET_ID,
        "data_store": str(paths.state),
    }
    supplied = {
        "candidate_digest": candidate,
        "adapter_digest": adapter or current["adapter_digest"],
        "feature_map_digest": feature_map or current["feature_map_digest"],
    }
    mismatches: dict[str, Any] = {}
    for key, value in supplied.items():
        if value != current[key]:
            mismatches[f"supplied_{key}"] = {
                "expected": current[key],
                "supplied": value,
            }
    for key, value in current.items():
        if recorded.get(key) != value:
            mismatches[f"recorded_{key}"] = {
                "expected": value,
                "recorded": recorded.get(key),
            }
    return current, mismatches


def doctor(
    paths: RunPaths, candidate: str, adapter: str | None, feature_map: str | None
) -> dict[str, Any]:
    metadata = load_metadata(paths)
    expected, mismatches = identity_mismatches(
        paths, metadata, candidate, adapter, feature_map
    )
    if mismatches:
        raise ControlError(
            "stale_or_wrong_target",
            "recorded run identities do not match expected identities",
            details=mismatches,
        )
    if metadata.get("status") != "running":
        raise ControlError("unreachable", "owned product instance is not running")
    observed = http_json(int(metadata["port"]), "GET", "/health")
    assert_observed_identity(metadata, observed)
    return {
        "status": "completed",
        "operation": "doctor",
        "run_id": paths.run_id,
        "expected": expected,
        "observed": evidence_safe_identity(observed),
    }


def process_exists(pid: int) -> bool:
    try:
        os.kill(pid, 0)
        return True
    except ProcessLookupError:
        return False
    except PermissionError:
        return True


def stop_owned(paths: RunPaths) -> dict[str, Any]:
    metadata = load_metadata(paths)
    assert_recorded_ownership(paths, metadata)
    if metadata.get("status") == "stopped":
        return {"status": "completed", "operation": "stop", "already_stopped": True}
    pid = int(metadata.get("pid", 0))
    port = int(metadata.get("port", 0))
    if pid <= 0 or port <= 0:
        raise ControlError("ownership_unknown", "runtime lacks process identity")
    try:
        observed = http_json(port, "GET", "/health")
    except ControlError:
        if process_exists(pid):
            raise ControlError(
                "ownership_unknown",
                "process exists but current service identity cannot be observed; refusing stop",
            )
        metadata["status"] = "stopped"
        atomic_write_json(paths.metadata, metadata)
        return {"status": "completed", "operation": "stop", "already_stopped": True}
    assert_observed_identity(metadata, observed)
    os.kill(pid, signal.SIGTERM)
    deadline = time.monotonic() + 3
    while process_exists(pid) and time.monotonic() < deadline:
        time.sleep(0.02)
    if process_exists(pid):
        raise ControlError("timeout", "owned process did not stop before timeout")
    metadata["status"] = "stopped"
    atomic_write_json(paths.metadata, metadata)
    manifest = load_manifest(paths)
    log_path = Path(metadata["log_path"])
    if log_path.exists():
        register_artifact(paths, manifest, log_path, "text/plain")
    write_manifest(paths, manifest)
    return {"status": "completed", "operation": "stop", "already_stopped": False}


def restart(paths: RunPaths, timeout: float) -> dict[str, Any]:
    metadata = load_metadata(paths)
    _, mismatches = identity_mismatches(
        paths, metadata, metadata["candidate_digest"], None, None
    )
    if mismatches:
        raise ControlError(
            "stale_or_wrong_target",
            "run inputs changed before restart",
            details=mismatches,
        )
    stopped = stop_owned(paths)
    metadata = load_metadata(paths)
    launched = launch(paths, metadata, timeout)
    return {
        "status": "completed",
        "operation": "restart",
        "previously_stopped": stopped["already_stopped"],
        **launched,
    }


def clean(paths: RunPaths) -> dict[str, Any]:
    if not paths.runtime.exists():
        if not paths.manifest.exists():
            raise ControlError("not_provisioned", "run has no runtime or evidence")
        manifest = load_manifest(paths)
        manifest["cleanup"] = {"status": "completed", "at": now(), "repeated": True}
        write_manifest(paths, manifest)
        return {"status": "completed", "operation": "clean", "repeated": True}
    metadata = load_metadata(paths)
    assert_recorded_ownership(paths, metadata)
    stop_owned(paths)
    current_metadata = load_metadata(paths)
    assert_recorded_ownership(paths, current_metadata)
    if metadata["owner_token"] != current_metadata["owner_token"]:
        raise ControlError("ownership_unknown", "run ownership changed during cleanup")
    manifest = load_manifest(paths)
    shutil.rmtree(paths.runtime)
    manifest["cleanup"] = {"status": "completed", "at": now(), "repeated": False}
    write_manifest(paths, manifest)
    return {
        "status": "completed",
        "operation": "clean",
        "repeated": False,
        "evidence_preserved": str(paths.evidence),
    }


def capture(paths: RunPaths) -> dict[str, Any]:
    metadata = load_metadata(paths)
    _, mismatches = identity_mismatches(
        paths, metadata, metadata["candidate_digest"], None, None
    )
    if mismatches:
        raise ControlError("stale_or_wrong_target", "capture inputs are stale", details=mismatches)
    observed = http_json(int(metadata["port"]), "GET", "/health")
    assert_observed_identity(metadata, observed)
    counter = http_json(int(metadata["port"]), "GET", "/counter")
    artifact = paths.evidence / f"capture-{len(load_manifest(paths)['artifacts']):04d}.json"
    atomic_write_json(
        artifact,
        {"captured_at": now(), "identity": evidence_safe_identity(observed), **counter},
    )
    manifest = load_manifest(paths)
    record = register_artifact(paths, manifest, artifact, "application/json")
    manifest["observations"].append(
        {"at": now(), "kind": "capture", "artifact": record["path"]}
    )
    write_manifest(paths, manifest)
    return {"status": "completed", "operation": "capture", "artifact": record}


def wait_for_counter(paths: RunPaths, expected: int, timeout: float) -> dict[str, Any]:
    if timeout <= 0:
        raise ControlError("invalid_timeout", "timeout must be positive", exit_code=2)
    metadata = load_metadata(paths)
    _, mismatches = identity_mismatches(
        paths, metadata, metadata["candidate_digest"], None, None
    )
    if mismatches:
        raise ControlError("stale_or_wrong_target", "wait inputs are stale", details=mismatches)
    deadline = time.monotonic() + timeout
    last: Any = None
    while time.monotonic() < deadline:
        observed_identity = http_json(int(metadata["port"]), "GET", "/health")
        assert_observed_identity(metadata, observed_identity)
        last = http_json(int(metadata["port"]), "GET", "/counter").get("counter")
        if last == expected:
            return {
                "status": "completed",
                "operation": "wait",
                "expected": expected,
                "observed": last,
            }
        time.sleep(0.02)
    raise ControlError(
        "timeout",
        "observable counter value did not arrive before timeout",
        details={"expected": expected, "last_observed": last},
    )


def observe_persistent(paths: RunPaths, expected: int) -> dict[str, Any]:
    metadata = load_metadata(paths)
    _, mismatches = identity_mismatches(
        paths, metadata, metadata["candidate_digest"], None, None
    )
    if mismatches:
        raise ControlError(
            "stale_or_wrong_target", "observation inputs are stale", details=mismatches
        )
    observed_identity = http_json(int(metadata["port"]), "GET", "/health")
    assert_observed_identity(metadata, observed_identity)
    api_value = http_json(int(metadata["port"]), "GET", "/counter").get("counter")
    file_value = read_json(paths.state).get("counter")
    if api_value != expected or file_value != expected or api_value != file_value:
        raise ControlError(
            "ambiguous",
            "product view and read-only persistence view do not agree with expectation",
            details={
                "expected": expected,
                "product_view": api_value,
                "persistent_view": file_value,
            },
        )
    manifest = load_manifest(paths)
    artifact = paths.evidence / (
        f"persistence-{metadata['generation']:04d}-{len(manifest['artifacts']):04d}.json"
    )
    atomic_write_json(
        artifact,
        {
            "observed_at": now(),
            "expected": expected,
            "product_view": api_value,
            "persistent_view": file_value,
            "state_file": str(paths.state),
            "generation": metadata["generation"],
        },
    )
    record = register_artifact(paths, manifest, artifact, "application/json")
    manifest["observations"].append(
        {
            "at": now(),
            "kind": "persistent_second_seam",
            "artifact": record["path"],
            "feature_ids": ["counter.persistence"],
        }
    )
    if "counter.persistence" not in manifest["features_exercised"]:
        manifest["features_exercised"].append("counter.persistence")
    write_manifest(paths, manifest)
    return {
        "status": "completed",
        "operation": "observe-persistent",
        "product_view": api_value,
        "persistent_view": file_value,
        "artifact": record,
    }


def check_support(surface: str) -> dict[str, Any]:
    if surface != SUPPORTED_SURFACE:
        raise ControlError(
            "unsupported",
            "requested user path is not supported by this project-local adapter",
            details={"surface": surface, "supported": [SUPPORTED_SURFACE]},
        )
    return {"status": "completed", "operation": "check-support", "surface": surface}


def verify_evidence(
    paths: RunPaths, candidate: str, adapter: str | None, feature_map: str | None
) -> dict[str, Any]:
    manifest = load_manifest(paths)
    expected, mismatches = identity_mismatches(
        paths, manifest, candidate, adapter, feature_map
    )
    if mismatches:
        raise ControlError(
            "evidence_stale",
            "manifest identities do not match expected identities",
            exit_code=4,
            details=mismatches,
        )
    invalid: list[dict[str, Any]] = []
    for artifact in manifest.get("artifacts", []):
        path = (paths.root / artifact["path"]).resolve()
        try:
            path.relative_to(paths.root)
        except ValueError:
            invalid.append({"path": artifact["path"], "reason": "outside_root"})
            continue
        if not path.is_file():
            invalid.append({"path": artifact["path"], "reason": "missing"})
            continue
        size = path.stat().st_size
        checksum = sha256_file(path)
        if size != artifact["bytes"] or checksum != artifact["sha256"]:
            invalid.append(
                {
                    "path": artifact["path"],
                    "reason": "integrity_mismatch",
                    "recorded_bytes": artifact["bytes"],
                    "observed_bytes": size,
                    "recorded_sha256": artifact["sha256"],
                    "observed_sha256": checksum,
                }
            )
    if invalid:
        raise ControlError(
            "evidence_invalid",
            "one or more evidence artifacts failed integrity checks",
            exit_code=4,
            details={"artifacts": invalid},
        )
    return {
        "status": "completed",
        "operation": "verify-evidence",
        "artifacts_verified": len(manifest.get("artifacts", [])),
        "identities": expected,
    }


def operation_for(args: argparse.Namespace, paths: RunPaths):
    if args.command == "info":
        return lambda: info(paths)
    if args.command == "provision":
        return lambda: provision(paths, args.candidate, args.timeout)
    if args.command == "doctor":
        return lambda: doctor(paths, args.candidate, args.adapter, args.feature_map)
    if args.command == "restart":
        return lambda: restart(paths, args.timeout)
    if args.command == "stop":
        return lambda: stop_owned(paths)
    if args.command == "clean":
        return lambda: clean(paths)
    if args.command == "capture":
        return lambda: capture(paths)
    if args.command == "wait":
        return lambda: wait_for_counter(paths, args.expected, args.timeout)
    if args.command == "observe-persistent":
        return lambda: observe_persistent(paths, args.expected)
    if args.command == "check-support":
        return lambda: check_support(args.surface)
    if args.command == "verify-evidence":
        return lambda: verify_evidence(
            paths, args.candidate, args.adapter, args.feature_map
        )
    raise AssertionError(f"unhandled command: {args.command}")


def main(argv: list[str] | None = None) -> int:
    raw = list(sys.argv[1:] if argv is None else argv)
    parser = make_parser()
    args = parser.parse_args(raw)
    try:
        paths = paths_for(args.root, args.run_id, args.acknowledge_shared_target)
        exit_code, payload = execute_recorded(paths, raw, operation_for(args, paths))
    except ControlError as error:
        exit_code, payload = error.exit_code, error.payload()
    stream = sys.stdout if exit_code == 0 else sys.stderr
    print(json.dumps(payload, sort_keys=True), file=stream)
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
