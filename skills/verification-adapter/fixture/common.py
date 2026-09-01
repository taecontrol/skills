"""Project-specific support code for the counter verification fixture."""

from __future__ import annotations

import hashlib
import json
import os
import platform
import re
import sys
import tempfile
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath, PureWindowsPath
from typing import Any, Callable


SCHEMA_VERSION = "1"
TARGET_ID = "counter-service-cli"
SUPPORTED_SURFACE = "product-cli"
RUN_ID_PATTERN = re.compile(r"^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}$")
SHARED_RUN_IDS = {"default", "shared", "user"}
BUILD_PROCEDURE_ID = "python-standard-library-direct-source-v1"
FEATURE_IDS = {"counter.set", "counter.persistence"}


class ControlError(Exception):
    def __init__(
        self,
        reason: str,
        message: str,
        *,
        exit_code: int = 3,
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(message)
        self.reason = reason
        self.message = message
        self.exit_code = exit_code
        self.details = details or {}

    def payload(self) -> dict[str, Any]:
        return {
            "status": self.reason,
            "message": self.message,
            "details": self.details,
        }


@dataclass(frozen=True)
class RunPaths:
    root: Path
    run_id: str

    @property
    def runtime(self) -> Path:
        return self.root / "runtime" / self.run_id

    @property
    def evidence(self) -> Path:
        return self.root / "evidence" / self.run_id

    @property
    def metadata(self) -> Path:
        return self.runtime / "runtime.json"

    @property
    def state(self) -> Path:
        return self.runtime / "state.json"

    @property
    def ready(self) -> Path:
        return self.runtime / "ready.json"

    @property
    def manifest(self) -> Path:
        return self.evidence / "manifest.json"


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace(
        "+00:00", "Z"
    )


def validate_run_id(run_id: str, acknowledge_shared: bool = False) -> str:
    if not RUN_ID_PATTERN.fullmatch(run_id):
        raise ControlError(
            "unsafe_target",
            "run_id must use 1-64 letters, digits, dots, underscores, or hyphens",
            exit_code=2,
        )
    if run_id in SHARED_RUN_IDS and not acknowledge_shared:
        raise ControlError(
            "shared_target_refused",
            "shared/default targets require --acknowledge-shared-target",
            exit_code=2,
            details={"run_id": run_id},
        )
    return run_id


def paths_for(root: str | Path, run_id: str, acknowledge_shared: bool = False) -> RunPaths:
    validate_run_id(run_id, acknowledge_shared)
    return RunPaths(Path(root).expanduser().resolve(), run_id)


def atomic_write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    handle, temporary = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(handle, "w", encoding="utf-8") as stream:
            json.dump(value, stream, indent=2, sort_keys=True)
            stream.write("\n")
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def read_json(path: Path, missing_reason: str = "not_provisioned") -> dict[str, Any]:
    try:
        with path.open(encoding="utf-8") as stream:
            value = json.load(stream)
    except FileNotFoundError as error:
        raise ControlError(missing_reason, f"missing required file: {path}") from error
    except (OSError, json.JSONDecodeError) as error:
        raise ControlError("invalid_state", f"cannot read {path}: {error}") from error
    if not isinstance(value, dict):
        raise ControlError("invalid_state", f"expected JSON object in {path}")
    return value


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(65536), b""):
            digest.update(chunk)
    return digest.hexdigest()


def digest_files(paths: list[Path], base: Path) -> str:
    digest = hashlib.sha256()
    for path in sorted(paths):
        digest.update(path.relative_to(base).as_posix().encode())
        digest.update(b"\0")
        digest.update(path.read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


def fixture_dir() -> Path:
    return Path(__file__).resolve().parent


def adapter_digest() -> str:
    base = fixture_dir()
    return digest_files(
        [base / name for name in ("common.py", "verify.py", "OPERATING.md")], base
    )


def candidate_digest() -> str:
    """Identify the product source that is executed by this fixture."""
    base = fixture_dir()
    return digest_files(
        [base / name for name in ("common.py", "product_cli.py", "service.py")], base
    )


def build_procedure_digest() -> str:
    return hashlib.sha256(BUILD_PROCEDURE_ID.encode()).hexdigest()


def feature_map_digest() -> str:
    base = fixture_dir() / "feature-map"
    return digest_files(list(base.rglob("*.md")), base)


def environment_identity() -> dict[str, str]:
    return {
        "implementation": platform.python_implementation(),
        "python": platform.python_version(),
        "platform": platform.system().lower(),
        "machine": platform.machine().lower(),
        "executable": str(Path(sys.executable).resolve()),
    }


def load_metadata(paths: RunPaths) -> dict[str, Any]:
    metadata = read_json(paths.metadata)
    if metadata.get("run_id") != paths.run_id:
        raise ControlError("ownership_unknown", "runtime metadata has a different run_id")
    if Path(str(metadata.get("runtime_dir", ""))).resolve() != paths.runtime:
        raise ControlError("ownership_unknown", "runtime metadata names a different directory")
    return metadata


def http_json(
    port: int,
    method: str,
    route: str,
    payload: dict[str, Any] | None = None,
    timeout: float = 0.5,
) -> dict[str, Any]:
    body = None if payload is None else json.dumps(payload).encode()
    request = urllib.request.Request(
        f"http://127.0.0.1:{port}{route}",
        data=body,
        method=method,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            value = json.loads(response.read().decode())
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        raise ControlError("unreachable", f"product service unavailable: {error}") from error
    if not isinstance(value, dict):
        raise ControlError("ambiguous", "product service returned a non-object response")
    return value


def expected_identity(metadata: dict[str, Any]) -> dict[str, Any]:
    expected = {
        "run_id": metadata["run_id"],
        "owner_token": metadata["owner_token"],
        "candidate_digest": metadata["candidate_digest"],
        "adapter_digest": metadata["adapter_digest"],
        "build_procedure_digest": metadata["build_procedure_digest"],
        "environment": metadata["environment"],
        "target": metadata["target"],
        "data_store": metadata["data_store"],
    }
    if "pid" in metadata:
        expected["pid"] = metadata["pid"]
    return expected


def evidence_safe_identity(identity: dict[str, Any]) -> dict[str, Any]:
    """Remove the ownership capability while retaining a comparable identity."""
    safe = dict(identity)
    owner_token = safe.pop("owner_token", None)
    if isinstance(owner_token, str) and owner_token:
        safe["run_owner_digest"] = hashlib.sha256(owner_token.encode()).hexdigest()
    return safe


def assert_observed_identity(
    metadata: dict[str, Any], observed: dict[str, Any]
) -> None:
    expected = expected_identity(metadata)
    mismatches = {}
    for key, value in expected.items():
        observed_value = observed.get(key)
        if observed_value == value:
            continue
        if key == "owner_token":
            value = "redacted"
            observed_value = "redacted"
        mismatches[key] = {"expected": value, "observed": observed_value}
    required = {"health", "counter.read", "counter.write"}
    observed_capabilities = set(observed.get("capabilities", []))
    if not required.issubset(observed_capabilities):
        mismatches["capabilities"] = {
            "expected": sorted(required),
            "observed": sorted(observed_capabilities),
        }
    if mismatches:
        raise ControlError(
            "stale_or_wrong_target",
            "observed product identity does not match the run",
            details=mismatches,
        )


def manifest_error(message: str, *, details: dict[str, Any] | None = None) -> ControlError:
    return ControlError("evidence_invalid", message, exit_code=4, details=details)


def require_exact_keys(
    value: dict[str, Any], expected: set[str], location: str
) -> None:
    observed = set(value)
    if observed != expected:
        raise manifest_error(
            f"{location} has an invalid shape",
            details={
                "location": location,
                "missing": sorted(expected - observed),
                "unknown": sorted(observed - expected),
            },
        )


def require_string(value: Any, location: str) -> str:
    if not isinstance(value, str) or not value:
        raise manifest_error(f"{location} must be a non-empty string")
    return value


def require_sha256(value: Any, location: str) -> str:
    digest = require_string(value, location)
    if len(digest) != 64 or any(character not in "0123456789abcdef" for character in digest):
        raise manifest_error(f"{location} must be a lowercase SHA-256 value")
    return digest


def require_timestamp(value: Any, location: str) -> datetime:
    timestamp = require_string(value, location)
    try:
        parsed = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
    except ValueError as error:
        raise manifest_error(f"{location} must be an ISO-8601 timestamp") from error
    if parsed.tzinfo is None:
        raise manifest_error(f"{location} must include a timezone")
    return parsed


def require_string_list(
    value: Any, location: str, *, unique: bool = False
) -> list[str]:
    if not isinstance(value, list) or any(
        not isinstance(item, str) or not item for item in value
    ):
        raise manifest_error(f"{location} must be a list of non-empty strings")
    if unique and len(value) != len(set(value)):
        raise manifest_error(f"{location} must not contain duplicates")
    return value


def canonical_artifact_identity(
    paths: RunPaths, value: Any, location: str
) -> tuple[str, Path]:
    artifact_path = require_string(value, location)
    if "\\" in artifact_path or "\x00" in artifact_path:
        raise manifest_error(f"{location} must use canonical POSIX separators")
    declared = PurePosixPath(artifact_path)
    if declared.is_absolute() or PureWindowsPath(artifact_path).is_absolute():
        raise manifest_error(f"{location} must be relative to the run root")
    canonical = declared.as_posix()
    if canonical != artifact_path or any(part in {".", ".."} for part in declared.parts):
        raise manifest_error(
            f"{location} must be canonical",
            details={"declared": artifact_path, "canonical": canonical},
        )
    namespace = PurePosixPath("evidence") / paths.run_id
    try:
        namespace_relative = declared.relative_to(namespace)
    except ValueError as error:
        raise manifest_error(
            "artifact path is outside the run evidence namespace",
            details={"path": artifact_path},
        ) from error
    if not namespace_relative.parts:
        raise manifest_error(f"{location} must identify an artifact below the namespace")
    resolved = paths.root.joinpath(*declared.parts).resolve()
    try:
        resolved.relative_to(paths.evidence)
    except ValueError as error:
        raise manifest_error(
            "artifact resolves outside the run evidence namespace",
            details={"path": artifact_path},
        ) from error
    return canonical, resolved


def validate_manifest(paths: RunPaths, manifest: dict[str, Any]) -> None:
    """Parse schema v1 into safe assumptions for every manifest consumer."""
    require_exact_keys(
        manifest,
        {
            "schema_version",
            "run_id",
            "source_revision",
            "candidate_digest",
            "adapter_digest",
            "feature_map_digest",
            "features_exercised",
            "build_procedure_digest",
            "lockfile_identity",
            "environment",
            "target",
            "data_store",
            "run_owner_digest",
            "created_at",
            "actions",
            "observations",
            "artifacts",
            "cleanup",
            "limitations",
            "redaction",
        },
        "manifest",
    )
    if manifest["schema_version"] != SCHEMA_VERSION:
        raise manifest_error("unsupported manifest schema")
    if manifest["run_id"] != paths.run_id:
        raise manifest_error("manifest run_id mismatch")
    candidate = require_sha256(manifest["candidate_digest"], "candidate_digest")
    if manifest["source_revision"] != f"content-sha256:{candidate}":
        raise manifest_error("source_revision does not identify candidate_digest")
    require_sha256(manifest["adapter_digest"], "adapter_digest")
    require_sha256(manifest["feature_map_digest"], "feature_map_digest")
    require_sha256(manifest["build_procedure_digest"], "build_procedure_digest")
    require_sha256(manifest["run_owner_digest"], "run_owner_digest")
    require_string(manifest["lockfile_identity"], "lockfile_identity")
    require_string(manifest["target"], "target")
    require_string(manifest["data_store"], "data_store")
    require_timestamp(manifest["created_at"], "created_at")

    features = require_string_list(
        manifest["features_exercised"], "features_exercised", unique=True
    )
    unknown_features = set(features) - FEATURE_IDS
    if unknown_features:
        raise manifest_error(
            "features_exercised contains unknown feature IDs",
            details={"unknown": sorted(unknown_features)},
        )

    environment = manifest["environment"]
    if not isinstance(environment, dict):
        raise manifest_error("environment must be an object")
    require_exact_keys(
        environment,
        {"implementation", "python", "platform", "machine", "executable"},
        "environment",
    )
    for key, value in environment.items():
        require_string(value, f"environment.{key}")

    actions = manifest["actions"]
    if not isinstance(actions, list):
        raise manifest_error("actions must be a list")
    for index, action in enumerate(actions):
        location = f"actions[{index}]"
        if not isinstance(action, dict):
            raise manifest_error(f"{location} must be an object")
        require_exact_keys(
            action,
            {"command", "started_at", "finished_at", "exit_code", "stdout", "stderr"},
            location,
        )
        command = require_string_list(action["command"], f"{location}.command")
        if not command:
            raise manifest_error(f"{location}.command must not be empty")
        started_at = require_timestamp(action["started_at"], f"{location}.started_at")
        finished_at = require_timestamp(action["finished_at"], f"{location}.finished_at")
        if finished_at < started_at:
            raise manifest_error(f"{location} finishes before it starts")
        exit_code = action["exit_code"]
        if isinstance(exit_code, bool) or not isinstance(exit_code, int):
            raise manifest_error(f"{location}.exit_code must be an integer")
        if not isinstance(action["stdout"], str) or not isinstance(action["stderr"], str):
            raise manifest_error(f"{location} output fields must be strings")
        if exit_code == 0 and action["stderr"]:
            raise manifest_error(f"{location} cannot record stderr for a completed action")
        if exit_code != 0 and action["stdout"]:
            raise manifest_error(f"{location} cannot record stdout for a failed action")

    artifacts = manifest["artifacts"]
    if not isinstance(artifacts, list):
        raise manifest_error("artifacts must be a list")
    artifact_paths: dict[str, Path] = {}
    artifact_identities: set[Path] = set()
    for index, artifact in enumerate(artifacts):
        location = f"artifacts[{index}]"
        if not isinstance(artifact, dict):
            raise manifest_error(f"{location} must be an object")
        require_exact_keys(artifact, {"path", "media_type", "bytes", "sha256"}, location)
        artifact_path, resolved = canonical_artifact_identity(
            paths, artifact["path"], f"{location}.path"
        )
        if artifact_path in artifact_paths:
            raise manifest_error("artifact paths must be unique", details={"path": artifact_path})
        if resolved in artifact_identities:
            raise manifest_error(
                "artifact records must resolve to unique identities",
                details={"path": artifact_path, "resolved": str(resolved)},
            )
        artifact_paths[artifact_path] = resolved
        artifact_identities.add(resolved)
        require_string(artifact["media_type"], f"{location}.media_type")
        byte_count = artifact["bytes"]
        if isinstance(byte_count, bool) or not isinstance(byte_count, int) or byte_count < 0:
            raise manifest_error(f"{location}.bytes must be a non-negative integer")
        require_sha256(artifact["sha256"], f"{location}.sha256")

    observations = manifest["observations"]
    if not isinstance(observations, list):
        raise manifest_error("observations must be a list")
    for index, observation in enumerate(observations):
        location = f"observations[{index}]"
        if not isinstance(observation, dict):
            raise manifest_error(f"{location} must be an object")
        kind = observation.get("kind")
        expected_keys = {"at", "kind", "artifact"}
        if kind == "persistent_second_seam":
            expected_keys.add("feature_ids")
        elif kind != "capture":
            raise manifest_error(f"{location}.kind is unsupported")
        require_exact_keys(observation, expected_keys, location)
        require_timestamp(observation["at"], f"{location}.at")
        artifact_path, resolved = canonical_artifact_identity(
            paths, observation["artifact"], f"{location}.artifact"
        )
        if artifact_path not in artifact_paths:
            raise manifest_error(
                "observation references an unlisted artifact",
                details={"location": location, "path": artifact_path},
            )
        if artifact_paths[artifact_path] != resolved:
            raise manifest_error(
                "observation artifact identity is inconsistent",
                details={"location": location, "path": artifact_path},
            )
        if kind == "persistent_second_seam":
            observation_features = require_string_list(
                observation["feature_ids"], f"{location}.feature_ids", unique=True
            )
            if not observation_features or not set(observation_features).issubset(features):
                raise manifest_error(
                    "observation feature IDs must be exercised by this run",
                    details={"location": location, "feature_ids": observation_features},
                )

    cleanup = manifest["cleanup"]
    if not isinstance(cleanup, dict):
        raise manifest_error("cleanup must be an object")
    if cleanup.get("status") == "not_run":
        require_exact_keys(cleanup, {"status"}, "cleanup")
    elif cleanup.get("status") == "completed":
        require_exact_keys(cleanup, {"status", "at", "repeated"}, "cleanup")
        require_timestamp(cleanup["at"], "cleanup.at")
        if not isinstance(cleanup["repeated"], bool):
            raise manifest_error("cleanup.repeated must be a boolean")
    else:
        raise manifest_error("cleanup.status is unsupported")

    limitations = manifest["limitations"]
    if not isinstance(limitations, list):
        raise manifest_error("limitations must be a list")
    failed_actions = sorted(
        (action["finished_at"], tuple(action["command"]))
        for action in actions
        if action["exit_code"] != 0
    )
    limitation_actions: list[tuple[str, tuple[str, ...]]] = []
    for index, limitation in enumerate(limitations):
        location = f"limitations[{index}]"
        if not isinstance(limitation, dict):
            raise manifest_error(f"{location} must be an object")
        require_exact_keys(limitation, {"at", "command", "reason", "message"}, location)
        require_timestamp(limitation["at"], f"{location}.at")
        limitation_command = require_string_list(
            limitation["command"], f"{location}.command"
        )
        if not limitation_command:
            raise manifest_error(f"{location}.command must not be empty")
        require_string(limitation["reason"], f"{location}.reason")
        require_string(limitation["message"], f"{location}.message")
        limitation_actions.append((limitation["at"], tuple(limitation_command)))
    if sorted(limitation_actions) != failed_actions:
        raise manifest_error(
            "limitations must correspond exactly to failed actions",
            details={
                "failed_actions": len(failed_actions),
                "limitation_actions": len(limitation_actions),
            },
        )

    redaction = manifest["redaction"]
    if not isinstance(redaction, dict):
        raise manifest_error("redaction must be an object")
    require_exact_keys(redaction, {"applied", "fields", "secrets_recorded"}, "redaction")
    if not isinstance(redaction["applied"], bool) or not isinstance(
        redaction["secrets_recorded"], bool
    ):
        raise manifest_error("redaction status fields must be booleans")
    redacted_fields = require_string_list(
        redaction["fields"], "redaction.fields", unique=True
    )
    if not redaction["applied"] or redaction["secrets_recorded"]:
        raise manifest_error("manifest evidence must apply redaction and exclude secrets")
    if redacted_fields != ["owner_token"]:
        raise manifest_error("schema v1 must redact the ownership capability")


def load_manifest(paths: RunPaths) -> dict[str, Any]:
    try:
        manifest = read_json(paths.manifest, "evidence_missing")
    except ControlError as error:
        if error.reason == "evidence_missing":
            raise
        raise manifest_error(
            "manifest is not readable schema v1 evidence",
            details={"read_reason": error.reason},
        ) from error
    validate_manifest(paths, manifest)
    return manifest


def assert_recorded_ownership(
    paths: RunPaths, metadata: dict[str, Any], manifest: dict[str, Any] | None = None
) -> None:
    """Prove mutable runtime metadata still belongs to the retained run record."""
    try:
        retained = load_manifest(paths) if manifest is None else manifest
    except ControlError as error:
        raise ControlError(
            "ownership_unknown",
            "retained ownership evidence is missing or invalid",
            details={"evidence_reason": error.reason},
        ) from error
    owner_token = metadata.get("owner_token")
    if not isinstance(owner_token, str) or not owner_token:
        raise ControlError("ownership_unknown", "runtime owner token is missing")
    observed_owner = hashlib.sha256(owner_token.encode()).hexdigest()
    expected_values = {
        "run_owner_digest": observed_owner,
        "data_store": str(paths.state),
        "target": TARGET_ID,
    }
    mismatches = {
        key: {"expected": value, "recorded": retained.get(key)}
        for key, value in expected_values.items()
        if retained.get(key) != value
    }
    if metadata.get("data_store") != str(paths.state):
        mismatches["runtime_data_store"] = {
            "expected": str(paths.state),
            "recorded": metadata.get("data_store"),
        }
    if metadata.get("target") != TARGET_ID:
        mismatches["runtime_target"] = {
            "expected": TARGET_ID,
            "recorded": metadata.get("target"),
        }
    if mismatches:
        raise ControlError(
            "ownership_unknown",
            "runtime ownership does not match retained ownership evidence",
            details=mismatches,
        )


def write_manifest(paths: RunPaths, manifest: dict[str, Any]) -> None:
    validate_manifest(paths, manifest)
    atomic_write_json(paths.manifest, manifest)


def mark_features_exercised(paths: RunPaths, feature_ids: list[str]) -> None:
    manifest = load_manifest(paths)
    exercised = manifest.setdefault("features_exercised", [])
    for feature_id in feature_ids:
        if feature_id not in exercised:
            exercised.append(feature_id)
    write_manifest(paths, manifest)


def register_artifact(
    paths: RunPaths, manifest: dict[str, Any], artifact: Path, media_type: str
) -> dict[str, Any]:
    resolved = artifact.resolve()
    try:
        relative = resolved.relative_to(paths.root)
    except ValueError as error:
        raise ControlError("unsafe_artifact", "artifact is outside the run root") from error
    record = {
        "path": relative.as_posix(),
        "media_type": media_type,
        "bytes": resolved.stat().st_size,
        "sha256": sha256_file(resolved),
    }
    artifacts = manifest.setdefault("artifacts", [])
    artifacts[:] = [item for item in artifacts if item.get("path") != record["path"]]
    artifacts.append(record)
    return record


def append_action(
    paths: RunPaths,
    command: list[str],
    started_at: str,
    finished_at: str,
    exit_code: int,
    payload: dict[str, Any],
) -> None:
    if not paths.manifest.exists():
        return
    manifest = load_manifest(paths)
    manifest.setdefault("actions", []).append(
        {
            "command": command,
            "started_at": started_at,
            "finished_at": finished_at,
            "exit_code": exit_code,
            "stdout": json.dumps(payload, sort_keys=True) if exit_code == 0 else "",
            "stderr": json.dumps(payload, sort_keys=True) if exit_code != 0 else "",
        }
    )
    if exit_code != 0:
        manifest.setdefault("limitations", []).append(
            {
                "at": finished_at,
                "command": command,
                "reason": payload.get("status", "failed"),
                "message": payload.get("message", "operation failed"),
            }
        )
    write_manifest(paths, manifest)


def execute_recorded(
    paths: RunPaths,
    command: list[str],
    operation: Callable[[], dict[str, Any]],
) -> tuple[int, dict[str, Any]]:
    started_at = now()
    try:
        payload = operation()
        exit_code = 0
    except ControlError as error:
        payload = error.payload()
        exit_code = error.exit_code
    finished_at = now()
    try:
        append_action(paths, command, started_at, finished_at, exit_code, payload)
    except (ControlError, OSError) as recording_error:
        if exit_code == 0:
            error = ControlError(
                "evidence_invalid",
                f"operation completed but its evidence could not be recorded: {recording_error}",
                exit_code=4,
            )
            return error.exit_code, error.payload()
    return exit_code, payload
