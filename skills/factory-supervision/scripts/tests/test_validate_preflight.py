from __future__ import annotations

import hashlib
import importlib.util
import json
import subprocess
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).parents[1] / "validate_preflight.py"
SPEC = importlib.util.spec_from_file_location("validate_preflight", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


def run(*args: str, cwd: Path) -> str:
    result = subprocess.run(
        [*args], cwd=cwd, check=True, text=True, stdout=subprocess.PIPE
    )
    return result.stdout.strip()


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class ValidatePreflightTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.worktree = self.root / "worktree"
        self.worktree.mkdir()
        run("git", "init", "-q", cwd=self.worktree)
        run("git", "config", "user.email", "test@example.com", cwd=self.worktree)
        run("git", "config", "user.name", "Test", cwd=self.worktree)
        (self.worktree / "source.txt").write_text("base\n", encoding="utf-8")
        (self.worktree / "lockfile").write_text("locked\n", encoding="utf-8")
        run("git", "add", ".", cwd=self.worktree)
        run("git", "commit", "-qm", "base", cwd=self.worktree)
        self.base = run("git", "rev-parse", "HEAD", cwd=self.worktree)

        self.artifacts: dict[str, Path] = {}
        for field, identity in {
            "project_profile": "PP-1",
            "design_baseline": "DB-1",
            "slice_batch": "SB-1",
            "execution_plan": "EP-1",
            "goal_validation": "GV-1",
            "human_acceptance": "HA-1",
        }.items():
            path = self.root / f"{field}.md"
            path.write_text(f"{identity}\n", encoding="utf-8")
            self.artifacts[identity] = path

        self.manifest = {
            "assignment": {
                "assignment": "ASG-1",
                "attempt": "ATT-1",
                "initiating_owner": "Slice Owner",
                "target_role": "Implementer",
                "factory_identities": {
                    "goal_map": "GM-1",
                    "project_profile": "PP-1",
                    "phase": "Delivery",
                    "design_baseline": "DB-1",
                    "slice_batch": "SB-1",
                    "execution_plan": "EP-1",
                    "goal_validation": "GV-1",
                    "human_acceptance": "HA-1",
                    "accepted_slice": "SL-1",
                    "candidate": "none",
                    "base_revision": self.base,
                },
            },
            "accepted_artifacts": [
                {"identity": identity, "path": str(path), "sha256": digest(path)}
                for identity, path in self.artifacts.items()
            ],
            "workspace": {
                "path": str(self.worktree),
                "base_revision": self.base,
                "materialization_complete": True,
                "allowed_dirty_paths": [],
                "protected_files": [
                    {"path": "lockfile", "sha256": digest(self.worktree / "lockfile")}
                ],
            },
            "role_sessions": [
                {"role": "Slice Owner", "identity": "term-owner"},
                {"role": "Implementer", "identity": "term-implementer"},
            ],
        }
        self.manifest_path = self.root / "preflight.json"

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def validate(self) -> list[str]:
        self.manifest_path.write_text(json.dumps(self.manifest), encoding="utf-8")
        return MODULE.validate(self.manifest, self.manifest_path)

    def test_accepts_matching_artifacts_clean_workspace_and_distinct_sessions(
        self,
    ) -> None:
        self.assertEqual([], self.validate())

    def test_rejects_changed_accepted_artifact(self) -> None:
        self.artifacts["DB-1"].write_text("changed\n", encoding="utf-8")
        self.assertIn("accepted artifact digest mismatch: DB-1", self.validate())

    def test_rejects_setup_created_protected_file_change(self) -> None:
        (self.worktree / "lockfile").write_text("rewritten\n", encoding="utf-8")
        errors = self.validate()
        self.assertIn("workspace has undeclared dirty paths: lockfile", errors)
        self.assertIn("protected workspace file digest mismatch: lockfile", errors)

    def test_rejects_undeclared_candidate_change(self) -> None:
        (self.worktree / "source.txt").write_text("candidate\n", encoding="utf-8")
        self.assertIn(
            "workspace has undeclared dirty paths: source.txt", self.validate()
        )

    def test_accepts_exact_declared_candidate_change(self) -> None:
        (self.worktree / "source.txt").write_text("candidate\n", encoding="utf-8")
        self.manifest["workspace"]["allowed_dirty_paths"] = ["source.txt"]
        self.assertEqual([], self.validate())

    def test_rejects_one_session_claiming_two_roles(self) -> None:
        self.manifest["role_sessions"][1]["identity"] = "term-owner"
        self.assertIn(
            "session identity is reused by Slice Owner and Implementer: term-owner",
            self.validate(),
        )

    def test_rejects_placeholder_digest(self) -> None:
        self.manifest["accepted_artifacts"][0]["sha256"] = "updated after this record"
        self.assertIn(
            "accepted_artifacts[0].sha256 must be 64 hexadecimal characters",
            self.validate(),
        )

    def test_rejects_missing_accepted_artifact(self) -> None:
        self.manifest["accepted_artifacts"] = self.manifest["accepted_artifacts"][1:]
        self.assertIn(
            "accepted artifact is missing for factory identity project_profile: PP-1",
            self.validate(),
        )

    def test_rejects_workspace_at_wrong_base(self) -> None:
        (self.worktree / "later.txt").write_text("later\n", encoding="utf-8")
        run("git", "add", ".", cwd=self.worktree)
        run("git", "commit", "-qm", "later", cwd=self.worktree)
        self.assertTrue(
            any(
                error.startswith("workspace HEAD differs from base revision:")
                for error in self.validate()
            )
        )

    def test_rejects_symbolic_base_revision(self) -> None:
        self.manifest["assignment"]["factory_identities"]["base_revision"] = "HEAD"
        self.manifest["workspace"]["base_revision"] = "HEAD"
        errors = self.validate()
        self.assertIn(
            "assignment.factory_identities.base_revision must be a full Git object ID",
            errors,
        )
        self.assertIn("workspace.base_revision must be a full Git object ID", errors)

    def test_accepts_additional_immutable_identity(self) -> None:
        manifest = self.root / "source-manifest.md"
        manifest.write_text("SM-1\n", encoding="utf-8")
        self.manifest["assignment"]["factory_identities"]["source_manifest"] = "SM-1"
        self.manifest["accepted_artifacts"].append(
            {"identity": "SM-1", "path": str(manifest), "sha256": digest(manifest)}
        )
        self.assertEqual([], self.validate())


if __name__ == "__main__":
    unittest.main()
