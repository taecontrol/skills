"""Black-box contract proof for the project-local verification fixture."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import signal
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


FIXTURE = Path(__file__).resolve().parents[1]
VERIFY = FIXTURE / "verify.py"
PRODUCT = FIXTURE / "product_cli.py"

def product_digest(fixture: Path) -> str:
    """Compute the documented product identity without importing driver code."""
    digest = hashlib.sha256()
    for name in sorted(("common.py", "product_cli.py", "service.py")):
        digest.update(name.encode())
        digest.update(b"\0")
        digest.update((fixture / name).read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


CANDIDATE = product_digest(FIXTURE)
OTHER_CANDIDATE = "b" * 64 if CANDIDATE != "b" * 64 else "c" * 64


class VerificationContractTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name) / "runs"
        self.run_ids: set[str] = set()

    def tearDown(self) -> None:
        for run_id in self.run_ids:
            command = [
                sys.executable,
                str(VERIFY),
                "--root",
                str(self.root),
                "--run-id",
                run_id,
            ]
            if run_id in {"default", "shared", "user"}:
                command.append("--acknowledge-shared-target")
            subprocess.run(
                [*command, "clean"],
                cwd=FIXTURE,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                timeout=5,
                check=False,
            )
            metadata_path = self.root / "runtime" / run_id / "runtime.json"
            if metadata_path.exists():
                metadata = json.loads(metadata_path.read_text())
                pid = int(metadata.get("pid", 0))
                if pid > 0:
                    try:
                        os.kill(pid, signal.SIGTERM)
                    except ProcessLookupError:
                        pass
        self.temporary.cleanup()

    def verify(
        self, run_id: str, *arguments: str, acknowledge_shared: bool = False
    ) -> subprocess.CompletedProcess[str]:
        command = [
            sys.executable,
            str(VERIFY),
            "--root",
            str(self.root),
            "--run-id",
            run_id,
        ]
        if acknowledge_shared:
            command.append("--acknowledge-shared-target")
        return subprocess.run(
            [*command, *arguments],
            cwd=FIXTURE,
            text=True,
            capture_output=True,
            timeout=8,
            check=False,
        )

    def product(self, run_id: str, *arguments: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [
                sys.executable,
                str(PRODUCT),
                "--root",
                str(self.root),
                "--run-id",
                run_id,
                *arguments,
            ],
            cwd=FIXTURE,
            text=True,
            capture_output=True,
            timeout=5,
            check=False,
        )

    def provision(self, run_id: str, candidate: str = CANDIDATE) -> dict:
        self.run_ids.add(run_id)
        result = self.verify(run_id, "provision", "--candidate", candidate)
        self.assertEqual(result.returncode, 0, result.stderr)
        return json.loads(result.stdout)

    def manifest(self, run_id: str) -> dict:
        path = self.root / "evidence" / run_id / "manifest.json"
        return json.loads(path.read_text())

    def test_doctor_rejects_reachable_wrong_candidate(self) -> None:
        self.provision("wrong-candidate")
        result = self.verify(
            "wrong-candidate", "doctor", "--candidate", OTHER_CANDIDATE
        )
        self.assertEqual(result.returncode, 3)
        self.assertEqual(json.loads(result.stderr)["status"], "stale_or_wrong_target")
        healthy = self.verify("wrong-candidate", "doctor", "--candidate", CANDIDATE)
        self.assertEqual(healthy.returncode, 0, healthy.stderr)

    def test_isolated_invocation_refuses_shared_default_target(self) -> None:
        self.run_ids.add("default")
        provision = self.verify(
            "default",
            "provision",
            "--candidate",
            CANDIDATE,
            acknowledge_shared=True,
        )
        self.assertEqual(provision.returncode, 0, provision.stderr)
        doctor = self.verify("default", "doctor", "--candidate", CANDIDATE)
        self.assertEqual(doctor.returncode, 2)
        self.assertEqual(json.loads(doctor.stderr)["status"], "shared_target_refused")
        product = self.product("default", "set", "--value", "8")
        self.assertEqual(product.returncode, 2)
        self.assertEqual(json.loads(product.stderr)["status"], "shared_target_refused")

    def test_parallel_runs_have_disjoint_ports_state_and_resources(self) -> None:
        self.run_ids.update({"parallel-a", "parallel-b"})
        commands = []
        for run_id in sorted(self.run_ids):
            commands.append(
                subprocess.Popen(
                    [
                        sys.executable,
                        str(VERIFY),
                        "--root",
                        str(self.root),
                        "--run-id",
                        run_id,
                        "provision",
                        "--candidate",
                        CANDIDATE,
                    ],
                    cwd=FIXTURE,
                    text=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                )
            )
        outputs = [process.communicate(timeout=8) for process in commands]
        self.assertTrue(all(process.returncode == 0 for process in commands), outputs)
        metadata_a = json.loads(
            (self.root / "runtime" / "parallel-a" / "runtime.json").read_text()
        )
        metadata_b = json.loads(
            (self.root / "runtime" / "parallel-b" / "runtime.json").read_text()
        )
        self.assertNotEqual(metadata_a["port"], metadata_b["port"])
        self.assertNotEqual(metadata_a["data_store"], metadata_b["data_store"])
        self.assertNotEqual(metadata_a["owner_token"], metadata_b["owner_token"])
        self.assertEqual(self.product("parallel-a", "set", "--value", "41").returncode, 0)
        other = self.product("parallel-b", "get")
        self.assertEqual(json.loads(other.stdout)["counter"], 0)

        metadata_a_path = self.root / "runtime" / "parallel-a" / "runtime.json"
        crossed = dict(metadata_a)
        crossed["port"] = metadata_b["port"]
        metadata_a_path.write_text(json.dumps(crossed))
        refused = self.verify("parallel-a", "wait", "--expected", "0")
        self.assertEqual(refused.returncode, 3)
        self.assertEqual(
            json.loads(refused.stderr)["status"], "stale_or_wrong_target"
        )
        metadata_a_path.write_text(json.dumps(metadata_a))

    def test_cleanup_is_owned_idempotent_and_preserves_evidence(self) -> None:
        self.provision("cleanup-a")
        self.provision("cleanup-b")
        metadata_path = self.root / "runtime" / "cleanup-a" / "runtime.json"
        original = json.loads(metadata_path.read_text())
        forged = dict(original)
        forged["owner_token"] = "forged-owner"
        metadata_path.write_text(json.dumps(forged))
        refused = self.verify("cleanup-a", "clean")
        self.assertEqual(refused.returncode, 3)
        self.assertEqual(json.loads(refused.stderr)["status"], "ownership_unknown")
        self.assertTrue((self.root / "runtime" / "cleanup-a").exists())
        self.assertTrue((self.root / "runtime" / "cleanup-b").exists())
        metadata_path.write_text(json.dumps(original))
        first = self.verify("cleanup-a", "clean")
        self.assertEqual(first.returncode, 0, first.stderr)
        self.assertFalse((self.root / "runtime" / "cleanup-a").exists())
        self.assertTrue((self.root / "runtime" / "cleanup-b").exists())
        self.assertTrue((self.root / "evidence" / "cleanup-a" / "manifest.json").exists())
        self.assertEqual(self.manifest("cleanup-a")["cleanup"]["status"], "completed")
        repeated = self.verify("cleanup-a", "clean")
        self.assertEqual(repeated.returncode, 0, repeated.stderr)
        self.assertTrue(json.loads(repeated.stdout)["repeated"])

        self.provision("cleanup-stopped")
        self.assertEqual(self.verify("cleanup-stopped", "stop").returncode, 0)
        stopped_metadata_path = (
            self.root / "runtime" / "cleanup-stopped" / "runtime.json"
        )
        stopped_metadata = json.loads(stopped_metadata_path.read_text())
        forged_stopped = dict(stopped_metadata)
        forged_stopped["owner_token"] = "forged-after-stop"
        stopped_metadata_path.write_text(json.dumps(forged_stopped))
        stopped_refusal = self.verify("cleanup-stopped", "clean")
        self.assertEqual(stopped_refusal.returncode, 3)
        self.assertEqual(
            json.loads(stopped_refusal.stderr)["status"], "ownership_unknown"
        )
        self.assertTrue((self.root / "runtime" / "cleanup-stopped").exists())
        stopped_metadata_path.write_text(json.dumps(stopped_metadata))

        self.provision("pid-binding")
        pid_metadata_path = self.root / "runtime" / "pid-binding" / "runtime.json"
        pid_metadata = json.loads(pid_metadata_path.read_text())
        unrelated = subprocess.Popen(
            [sys.executable, "-c", "import time; time.sleep(30)"],
            stdin=subprocess.DEVNULL,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        try:
            forged_pid = dict(pid_metadata)
            forged_pid["pid"] = unrelated.pid
            pid_metadata_path.write_text(json.dumps(forged_pid))
            pid_refusal = self.verify("pid-binding", "stop")
            self.assertEqual(pid_refusal.returncode, 3)
            self.assertEqual(
                json.loads(pid_refusal.stderr)["status"], "stale_or_wrong_target"
            )
            self.assertIsNone(unrelated.poll())
        finally:
            pid_metadata_path.write_text(json.dumps(pid_metadata))
            unrelated.terminate()
            unrelated.wait(timeout=3)

    def test_failed_launch_is_bounded_and_leaves_only_recorded_evidence(self) -> None:
        self.run_ids.add("launch-timeout")
        result = self.verify(
            "launch-timeout", "provision", "--candidate", CANDIDATE, "--timeout", "1e-9"
        )
        self.assertEqual(result.returncode, 3)
        self.assertEqual(json.loads(result.stderr)["status"], "timeout")
        self.assertFalse((self.root / "runtime" / "launch-timeout").exists())
        manifest = self.manifest("launch-timeout")
        self.assertEqual(manifest["actions"][-1]["exit_code"], 3)
        self.assertEqual(manifest["limitations"][-1]["reason"], "timeout")
        cleanup = self.verify("launch-timeout", "clean")
        self.assertEqual(cleanup.returncode, 0, cleanup.stderr)

    def test_malformed_readiness_terminates_the_live_spawned_child(self) -> None:
        copied_root = Path(self.temporary.name) / "malformed-readiness-fixture"
        shutil.copytree(FIXTURE, copied_root)
        isolated_root = Path(self.temporary.name) / "malformed-readiness-runs"
        (copied_root / "service.py").write_text(
            """#!/usr/bin/env python3
import argparse
import os
import time
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("--runtime-dir", required=True)
parser.add_argument("--ready-file", required=True)
args, _ = parser.parse_known_args()
root = Path(args.runtime_dir).resolve().parents[1]
(root / "malformed-child.pid").write_text(str(os.getpid()))
Path(args.ready_file).write_text("{")
while True:
    time.sleep(1)
"""
        )
        candidate = product_digest(copied_root)

        def run(*arguments: str) -> subprocess.CompletedProcess[str]:
            return subprocess.run(
                [
                    sys.executable,
                    str(copied_root / "verify.py"),
                    "--root",
                    str(isolated_root),
                    "--run-id",
                    "malformed-readiness",
                    *arguments,
                ],
                cwd=copied_root,
                text=True,
                capture_output=True,
                timeout=8,
                check=False,
            )

        result = run("provision", "--candidate", candidate)
        self.assertEqual(result.returncode, 3)
        self.assertEqual(json.loads(result.stderr)["status"], "launch_failed")
        child_pid = int((isolated_root / "malformed-child.pid").read_text())
        child_is_alive = False
        try:
            os.kill(child_pid, 0)
        except ProcessLookupError:
            child_is_alive = False
        else:
            child_is_alive = True
        finally:
            if child_is_alive:
                os.kill(child_pid, signal.SIGTERM)
        self.assertFalse(child_is_alive, "malformed readiness left its child alive")
        self.assertFalse((isolated_root / "runtime" / "malformed-readiness").exists())
        manifest = json.loads(
            (isolated_root / "evidence" / "malformed-readiness" / "manifest.json").read_text()
        )
        self.assertEqual(manifest["limitations"][-1]["reason"], "launch_failed")
        self.assertEqual(run("clean").returncode, 0)

    def test_timeout_is_recorded_as_failure_not_success(self) -> None:
        self.provision("timeout")
        result = self.verify(
            "timeout", "wait", "--expected", "99", "--timeout", "0.05"
        )
        self.assertEqual(result.returncode, 3)
        self.assertEqual(json.loads(result.stderr)["status"], "timeout")
        manifest = self.manifest("timeout")
        action = manifest["actions"][-1]
        self.assertNotEqual(action["exit_code"], 0)
        self.assertEqual(json.loads(action["stderr"])["status"], "timeout")
        self.assertEqual(manifest["limitations"][-1]["reason"], "timeout")

    def test_manifest_records_exact_identities_actions_times_and_checksums(self) -> None:
        provision = self.provision("manifest")
        owner_token = json.loads(
            (self.root / "runtime" / "manifest" / "runtime.json").read_text()
        )["owner_token"]
        self.assertEqual(self.manifest("manifest")["features_exercised"], [])
        self.assertEqual(
            self.verify("manifest", "doctor", "--candidate", CANDIDATE).returncode, 0
        )
        self.assertEqual(self.product("manifest", "set", "--value", "6").returncode, 0)
        self.assertEqual(
            self.manifest("manifest")["features_exercised"], ["counter.set"]
        )
        self.assertEqual(self.verify("manifest", "restart").returncode, 0)
        self.assertEqual(
            self.verify("manifest", "observe-persistent", "--expected", "6").returncode,
            0,
        )
        self.assertEqual(self.verify("manifest", "stop").returncode, 0)
        manifest = self.manifest("manifest")
        self.assertEqual(manifest["candidate_digest"], CANDIDATE)
        self.assertEqual(manifest["adapter_digest"], provision["adapter_digest"])
        self.assertEqual(manifest["feature_map_digest"], provision["feature_map_digest"])
        self.assertEqual(manifest["features_exercised"], ["counter.set", "counter.persistence"])
        self.assertEqual(manifest["target"], "counter-service-cli")
        self.assertTrue(manifest["environment"]["python"])
        self.assertGreaterEqual(len(manifest["actions"]), 6)
        for action in manifest["actions"]:
            self.assertIn("started_at", action)
            self.assertIn("finished_at", action)
            self.assertIn("exit_code", action)
            self.assertTrue(action["command"])
        self.assertGreaterEqual(len(manifest["artifacts"]), 3)
        for artifact in manifest["artifacts"]:
            self.assertRegex(artifact["sha256"], r"^[0-9a-f]{64}$")
            self.assertGreaterEqual(artifact["bytes"], 0)
            self.assertTrue(artifact["media_type"])
        retained = "\n".join(
            path.read_text(errors="replace")
            for path in (self.root / "evidence" / "manifest").iterdir()
            if path.is_file()
        )
        self.assertNotIn(owner_token, retained)
        self.assertTrue(manifest["redaction"]["applied"])

    def test_artifact_tampering_is_detected(self) -> None:
        self.provision("tamper")
        capture = self.verify("tamper", "capture")
        self.assertEqual(capture.returncode, 0, capture.stderr)
        self.assertEqual(self.verify("tamper", "stop").returncode, 0)
        manifest = self.manifest("tamper")
        artifact = self.root / manifest["artifacts"][0]["path"]
        with artifact.open("ab") as stream:
            stream.write(b"tampered")
        result = self.verify("tamper", "verify-evidence", "--candidate", CANDIDATE)
        self.assertEqual(result.returncode, 4)
        self.assertEqual(json.loads(result.stderr)["status"], "evidence_invalid")

    def test_manifest_schema_and_observation_references_fail_closed(self) -> None:
        self.provision("dangling-observation")
        capture = self.verify("dangling-observation", "capture")
        self.assertEqual(capture.returncode, 0, capture.stderr)
        self.assertEqual(self.verify("dangling-observation", "stop").returncode, 0)
        manifest_path = (
            self.root / "evidence" / "dangling-observation" / "manifest.json"
        )
        manifest = json.loads(manifest_path.read_text())
        referenced_path = manifest["observations"][0]["artifact"]
        manifest["artifacts"] = [
            artifact
            for artifact in manifest["artifacts"]
            if artifact["path"] != referenced_path
        ]
        (self.root / referenced_path).unlink()
        manifest_path.write_text(json.dumps(manifest))
        dangling = self.verify(
            "dangling-observation", "verify-evidence", "--candidate", CANDIDATE
        )
        self.assertEqual(dangling.returncode, 4)
        self.assertEqual(json.loads(dangling.stderr)["status"], "evidence_invalid")

        self.provision("malformed-schema")
        self.assertEqual(self.verify("malformed-schema", "stop").returncode, 0)
        malformed_path = self.root / "evidence" / "malformed-schema" / "manifest.json"
        malformed = json.loads(malformed_path.read_text())
        del malformed["actions"]
        malformed_path.write_text(json.dumps(malformed))
        schema = self.verify(
            "malformed-schema", "verify-evidence", "--candidate", CANDIDATE
        )
        self.assertEqual(schema.returncode, 4)
        self.assertEqual(json.loads(schema.stderr)["status"], "evidence_invalid")

    def test_artifact_paths_reject_absolute_and_noncanonical_aliases(self) -> None:
        for run_id, alias_kind in (
            ("absolute-alias", "absolute"),
            ("dot-segment-alias", "dot-segment"),
            ("resolved-alias", "resolved"),
        ):
            with self.subTest(alias_kind=alias_kind):
                self.provision(run_id)
                capture = self.verify(run_id, "capture")
                self.assertEqual(capture.returncode, 0, capture.stderr)
                self.assertEqual(self.verify(run_id, "stop").returncode, 0)
                manifest_path = self.root / "evidence" / run_id / "manifest.json"
                manifest = json.loads(manifest_path.read_text())
                referenced_path = manifest["observations"][0]["artifact"]
                original = next(
                    artifact
                    for artifact in manifest["artifacts"]
                    if artifact["path"] == referenced_path
                )
                alias = dict(original)
                if alias_kind == "absolute":
                    alias["path"] = str((self.root / referenced_path).resolve())
                    manifest["artifacts"].append(alias)
                else:
                    prefix, filename = referenced_path.rsplit("/", 1)
                    if alias_kind == "dot-segment":
                        alias["path"] = f"{prefix}/./{filename}"
                        original["path"] = alias["path"]
                        manifest["observations"][0]["artifact"] = alias["path"]
                    else:
                        alias["path"] = f"{prefix}/resolved-alias.json"
                        (self.root / alias["path"]).symlink_to(filename)
                        manifest["artifacts"].append(alias)
                manifest_path.write_text(json.dumps(manifest))
                result = self.verify(
                    run_id, "verify-evidence", "--candidate", CANDIDATE
                )
                self.assertEqual(result.returncode, 4)
                self.assertEqual(
                    json.loads(result.stderr)["status"], "evidence_invalid"
                )

    def test_candidate_or_adapter_change_invalidates_prior_evidence(self) -> None:
        provision = self.provision("freshness")
        wrong_candidate = self.verify(
            "freshness", "verify-evidence", "--candidate", OTHER_CANDIDATE
        )
        self.assertEqual(wrong_candidate.returncode, 4)
        self.assertEqual(json.loads(wrong_candidate.stderr)["status"], "evidence_stale")
        wrong_adapter = self.verify(
            "freshness",
            "verify-evidence",
            "--candidate",
            CANDIDATE,
            "--adapter",
            "c" * 64,
            "--feature-map",
            provision["feature_map_digest"],
        )
        self.assertEqual(wrong_adapter.returncode, 4)
        self.assertEqual(json.loads(wrong_adapter.stderr)["status"], "evidence_stale")

    def test_changed_executable_inputs_invalidate_evidence_without_caller_hint(self) -> None:
        for changed_file in ("product_cli.py", "verify.py", "feature-map/index.md"):
            with self.subTest(changed_file=changed_file):
                copied_root = Path(self.temporary.name) / changed_file.replace("/", "-")
                shutil.copytree(FIXTURE, copied_root)
                isolated_root = copied_root / ".runs"
                candidate = product_digest(copied_root)

                def run(*arguments: str) -> subprocess.CompletedProcess[str]:
                    return subprocess.run(
                        [
                            sys.executable,
                            str(copied_root / "verify.py"),
                            "--root",
                            str(isolated_root),
                            "--run-id",
                            "freshness-files",
                            *arguments,
                        ],
                        cwd=copied_root,
                        text=True,
                        capture_output=True,
                        timeout=8,
                        check=False,
                    )

                self.assertEqual(
                    run("provision", "--candidate", candidate).returncode, 0
                )
                self.assertEqual(run("stop").returncode, 0)
                path = copied_root / changed_file
                marker = "# changed input" if path.suffix == ".py" else "<!-- changed input -->"
                path.write_text(path.read_text() + f"\n{marker}\n")
                result = run("verify-evidence", "--candidate", candidate)
                self.assertEqual(result.returncode, 4, result.stderr)
                self.assertEqual(json.loads(result.stderr)["status"], "evidence_stale")
                self.assertEqual(run("clean").returncode, 0)

    def test_persistent_mutation_uses_read_only_second_view_after_restart(self) -> None:
        self.provision("persistence")
        action = self.product("persistence", "set", "--value", "23")
        self.assertEqual(action.returncode, 0, action.stderr)
        restart = self.verify("persistence", "restart")
        self.assertEqual(restart.returncode, 0, restart.stderr)
        observation = self.verify(
            "persistence", "observe-persistent", "--expected", "23"
        )
        self.assertEqual(observation.returncode, 0, observation.stderr)
        payload = json.loads(observation.stdout)
        self.assertEqual(payload["product_view"], 23)
        self.assertEqual(payload["persistent_view"], 23)
        artifact = self.root / payload["artifact"]["path"]
        direct = json.loads(artifact.read_text())
        self.assertEqual(direct["generation"], 2)
        self.assertEqual(direct["product_view"], direct["persistent_view"])

    def test_help_operating_guide_and_feature_recipes_agree(self) -> None:
        help_result = subprocess.run(
            [sys.executable, str(VERIFY), "--help"],
            cwd=FIXTURE,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(help_result.returncode, 0)
        operating = (FIXTURE / "OPERATING.md").read_text()
        feature_index = (FIXTURE / "feature-map" / "index.md").read_text()
        marker = re.compile(r"verification-commands: ([^>]+?) -->")
        guide_commands = set(marker.search(operating).group(1).split())
        map_commands = set(marker.search(feature_index).group(1).split())
        help_commands = set(
            re.findall(r"^    ([a-z][\w-]+)\s{2,}\S", help_result.stdout, re.MULTILINE)
        )
        self.assertEqual(guide_commands, map_commands)
        self.assertEqual(guide_commands, set(COMMANDS_FROM_CONTRACT))
        self.assertEqual(guide_commands, help_commands)
        for command in guide_commands:
            command_help = self.verify("help-only", command, "--help")
            self.assertEqual(command_help.returncode, 0, command_help.stderr)
        recipe = (FIXTURE / "feature-map" / "features" / "counter.md").read_text()
        mentioned = set(re.findall(r"verify\.py --root <root> --run-id <run> ([\w-]+)", recipe))
        self.assertTrue(mentioned)
        self.assertTrue(mentioned.issubset(guide_commands))

    def test_unsupported_path_is_explicit_and_cannot_be_reported_verified(self) -> None:
        self.provision("unsupported")
        result = self.verify("unsupported", "check-support", "--surface", "browser")
        self.assertEqual(result.returncode, 3)
        self.assertEqual(json.loads(result.stderr)["status"], "unsupported")
        manifest = self.manifest("unsupported")
        self.assertEqual(manifest["limitations"][-1]["reason"], "unsupported")
        serialized = json.dumps(manifest).lower()
        self.assertNotIn('"acceptance"', serialized)
        self.assertNotIn('"pass"', serialized)

    def test_fresh_copy_runs_complete_journey_without_repository_context(self) -> None:
        copied_root = Path(self.temporary.name) / "fresh-project"
        shutil.copytree(FIXTURE, copied_root)
        isolated_root = Path(self.temporary.name) / "fresh-runs"
        copied_candidate = product_digest(copied_root)

        def run(script: str, *arguments: str) -> subprocess.CompletedProcess[str]:
            return subprocess.run(
                [sys.executable, str(copied_root / script), *arguments],
                cwd=copied_root,
                text=True,
                capture_output=True,
                timeout=8,
                check=False,
                env={"PATH": os.environ.get("PATH", "")},
            )

        common = ["--root", str(isolated_root), "--run-id", "fresh"]
        steps = [
            run("verify.py", *common, "provision", "--candidate", copied_candidate),
            run("verify.py", *common, "doctor", "--candidate", copied_candidate),
            run("product_cli.py", *common, "set", "--value", "31"),
            run("verify.py", *common, "restart"),
            run("verify.py", *common, "observe-persistent", "--expected", "31"),
            run("verify.py", *common, "stop"),
            run("verify.py", *common, "verify-evidence", "--candidate", copied_candidate),
            run("verify.py", *common, "clean"),
        ]
        self.assertTrue(all(step.returncode == 0 for step in steps), steps)
        self.assertFalse((isolated_root / "runtime" / "fresh").exists())
        self.assertTrue((isolated_root / "evidence" / "fresh" / "manifest.json").exists())


COMMANDS_FROM_CONTRACT = (
    "info",
    "provision",
    "doctor",
    "restart",
    "stop",
    "clean",
    "capture",
    "wait",
    "observe-persistent",
    "check-support",
    "verify-evidence",
)


if __name__ == "__main__":
    unittest.main()
