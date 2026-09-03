"""Validate a Factory assignment preflight manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path
from typing import Any

REQUIRED_ASSIGNMENT_FIELDS = (
    "assignment",
    "attempt",
    "initiating_owner",
    "target_role",
)
REQUIRED_IDENTITY_FIELDS = (
    "goal_map",
    "project_profile",
    "phase",
    "design_baseline",
    "slice_batch",
    "execution_plan",
    "goal_validation",
    "human_acceptance",
    "accepted_slice",
    "candidate",
    "base_revision",
)
ACCEPTED_FILE_IDENTITIES = (
    "project_profile",
    "design_baseline",
    "slice_batch",
    "execution_plan",
    "goal_validation",
    "human_acceptance",
)
EMPTY_IDENTITIES = {"none", "not applicable"}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def git(workspace: Path, *args: str) -> subprocess.CompletedProcess[bytes]:
    return subprocess.run(
        ["git", "-C", str(workspace), *args],
        check=False,
        capture_output=True,
    )


def status_paths(workspace: Path, errors: list[str]) -> set[str]:
    result = git(workspace, "status", "--porcelain=v1", "-z", "--untracked-files=all")
    if result.returncode != 0:
        errors.append(
            f"git status failed: {result.stderr.decode(errors='replace').strip()}"
        )
        return set()

    paths: set[str] = set()
    entries = result.stdout.split(b"\0")
    index = 0
    while index < len(entries):
        entry = entries[index]
        index += 1
        if not entry:
            continue
        if len(entry) < 4:
            errors.append("git status returned an unparseable entry")
            continue
        status = entry[:2].decode(errors="replace")
        paths.add(entry[3:].decode(errors="surrogateescape"))
        if "R" in status or "C" in status:
            if index >= len(entries) or not entries[index]:
                errors.append("git status returned an incomplete rename or copy entry")
                continue
            paths.add(entries[index].decode(errors="surrogateescape"))
            index += 1
    return paths


def mapping(value: Any, name: str, errors: list[str]) -> dict[str, Any]:
    if not isinstance(value, dict):
        errors.append(f"{name} must be an object")
        return {}
    return value


def string(value: Any, name: str, errors: list[str]) -> str:
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{name} must be a non-empty string")
        return ""
    return value.strip()


def sequence(value: Any, name: str, errors: list[str]) -> list[Any]:
    if not isinstance(value, list):
        errors.append(f"{name} must be an array")
        return []
    return value


def valid_digest(value: str) -> bool:
    return len(value) == 64 and all(
        character in "0123456789abcdef" for character in value.lower()
    )


def valid_revision(value: str) -> bool:
    return len(value) in {40, 64} and all(
        character in "0123456789abcdef" for character in value.lower()
    )


def safe_workspace_file(
    workspace: Path, value: Any, name: str, errors: list[str]
) -> Path | None:
    relative = Path(string(value, name, errors))
    if not relative.parts or relative.is_absolute() or ".." in relative.parts:
        errors.append(f"{name} must be a relative path inside the workspace")
        return None
    resolved = (workspace / relative).resolve()
    try:
        resolved.relative_to(workspace.resolve())
    except ValueError:
        errors.append(f"{name} escapes the workspace")
        return None
    return resolved


def validate(document: Any, manifest_path: Path) -> list[str]:
    errors: list[str] = []
    root = mapping(document, "manifest", errors)
    assignment = mapping(root.get("assignment"), "assignment", errors)
    for field in REQUIRED_ASSIGNMENT_FIELDS:
        string(assignment.get(field), f"assignment.{field}", errors)

    identities = mapping(
        assignment.get("factory_identities"), "assignment.factory_identities", errors
    )
    identity_values: dict[str, str] = {
        key: value.strip()
        for key, value in identities.items()
        if isinstance(key, str) and isinstance(value, str) and value.strip()
    }
    for field in REQUIRED_IDENTITY_FIELDS:
        identity_values[field] = string(
            identities.get(field), f"assignment.factory_identities.{field}", errors
        )

    assignment_base = identity_values.get("base_revision", "")
    if assignment_base and not valid_revision(assignment_base):
        errors.append(
            "assignment.factory_identities.base_revision must be a full Git object ID"
        )
    artifacts = sequence(root.get("accepted_artifacts"), "accepted_artifacts", errors)
    artifact_identities: set[str] = set()
    for index, raw_artifact in enumerate(artifacts):
        artifact = mapping(raw_artifact, f"accepted_artifacts[{index}]", errors)
        identity = string(
            artifact.get("identity"), f"accepted_artifacts[{index}].identity", errors
        )
        path_value = string(
            artifact.get("path"), f"accepted_artifacts[{index}].path", errors
        )
        expected = string(
            artifact.get("sha256"), f"accepted_artifacts[{index}].sha256", errors
        ).lower()
        if identity:
            if identity in artifact_identities:
                errors.append(f"accepted artifact identity is duplicated: {identity}")
            artifact_identities.add(identity)
            if identity not in identity_values.values():
                errors.append(
                    f"accepted artifact identity is absent from factory identities: {identity}"
                )
        if expected and not valid_digest(expected):
            errors.append(
                f"accepted_artifacts[{index}].sha256 must be 64 hexadecimal characters"
            )
        if path_value:
            artifact_path = Path(path_value)
            if not artifact_path.is_absolute():
                artifact_path = manifest_path.parent / artifact_path
            if not artifact_path.is_file():
                errors.append(f"accepted artifact does not exist: {artifact_path}")
            elif valid_digest(expected) and sha256(artifact_path) != expected:
                errors.append(
                    f"accepted artifact digest mismatch: {identity or artifact_path}"
                )

    for field in ACCEPTED_FILE_IDENTITIES:
        identity = identity_values.get(field, "")
        if (
            identity
            and identity.lower() not in EMPTY_IDENTITIES
            and identity not in artifact_identities
        ):
            errors.append(
                f"accepted artifact is missing for factory identity {field}: {identity}"
            )

    workspace_data = mapping(root.get("workspace"), "workspace", errors)
    workspace_value = string(workspace_data.get("path"), "workspace.path", errors)
    workspace_base = string(
        workspace_data.get("base_revision"), "workspace.base_revision", errors
    )
    if workspace_base and not valid_revision(workspace_base):
        errors.append("workspace.base_revision must be a full Git object ID")
    if assignment_base and workspace_base and assignment_base != workspace_base:
        errors.append(
            "workspace.base_revision differs from assignment.factory_identities.base_revision"
        )
    if workspace_data.get("materialization_complete") is not True:
        errors.append("workspace.materialization_complete must be true")

    workspace = Path(workspace_value) if workspace_value else None
    if workspace is not None and not workspace.is_absolute():
        errors.append("workspace.path must be absolute")
        workspace = None
    if workspace is not None and not workspace.is_dir():
        errors.append(f"workspace does not exist: {workspace}")
        workspace = None
    if workspace is not None:
        workspace = workspace.resolve()

    allowed_raw = sequence(
        workspace_data.get("allowed_dirty_paths"),
        "workspace.allowed_dirty_paths",
        errors,
    )
    allowed: set[str] = set()
    for index, value in enumerate(allowed_raw):
        path_value = string(value, f"workspace.allowed_dirty_paths[{index}]", errors)
        relative = Path(path_value)
        if path_value and (relative.is_absolute() or ".." in relative.parts):
            errors.append(
                f"workspace.allowed_dirty_paths[{index}] must stay inside the workspace"
            )
        elif path_value:
            allowed.add(relative.as_posix())
    if len(allowed) != len(allowed_raw):
        errors.append(
            "workspace.allowed_dirty_paths contains duplicates or invalid entries"
        )

    if workspace is not None:
        head = git(workspace, "rev-parse", "HEAD")
        if head.returncode != 0:
            errors.append(
                f"workspace is not a readable Git worktree: {head.stderr.decode(errors='replace').strip()}"
            )
        elif workspace_base:
            expected_base = git(
                workspace, "rev-parse", "--verify", f"{workspace_base}^{{commit}}"
            )
            if expected_base.returncode != 0:
                errors.append(
                    f"workspace base revision is not resolvable: {workspace_base}"
                )
            elif head.stdout.strip() != expected_base.stdout.strip():
                errors.append(
                    "workspace HEAD differs from base revision: "
                    f"{head.stdout.decode().strip()} != {expected_base.stdout.decode().strip()}"
                )
        actual = status_paths(workspace, errors)
        undeclared = sorted(actual - allowed)
        stale = sorted(allowed - actual)
        if undeclared:
            errors.append(
                f"workspace has undeclared dirty paths: {', '.join(undeclared)}"
            )
        if stale:
            errors.append(
                f"workspace allowed_dirty_paths lists clean paths: {', '.join(stale)}"
            )

        protected = sequence(
            workspace_data.get("protected_files"), "workspace.protected_files", errors
        )
        for index, raw_file in enumerate(protected):
            protected_file = mapping(
                raw_file, f"workspace.protected_files[{index}]", errors
            )
            protected_path = safe_workspace_file(
                workspace,
                protected_file.get("path"),
                f"workspace.protected_files[{index}].path",
                errors,
            )
            expected = string(
                protected_file.get("sha256"),
                f"workspace.protected_files[{index}].sha256",
                errors,
            ).lower()
            if expected and not valid_digest(expected):
                errors.append(
                    f"workspace.protected_files[{index}].sha256 must be 64 hexadecimal characters"
                )
            if protected_path is not None:
                if not protected_path.is_file():
                    errors.append(
                        f"protected workspace file does not exist: {protected_path}"
                    )
                elif valid_digest(expected) and sha256(protected_path) != expected:
                    errors.append(
                        f"protected workspace file digest mismatch: {protected_path.relative_to(workspace)}"
                    )

    sessions = sequence(root.get("role_sessions"), "role_sessions", errors)
    roles: set[str] = set()
    identities_seen: dict[str, str] = {}
    for index, raw_session in enumerate(sessions):
        session = mapping(raw_session, f"role_sessions[{index}]", errors)
        role = string(session.get("role"), f"role_sessions[{index}].role", errors)
        identity = string(
            session.get("identity"), f"role_sessions[{index}].identity", errors
        )
        if role:
            roles.add(role)
        if identity:
            prior_role = identities_seen.get(identity)
            if prior_role == role:
                errors.append(
                    f"session identity is listed more than once for {role}: {identity}"
                )
            elif prior_role is not None:
                errors.append(
                    f"session identity is reused by {prior_role} and {role}: {identity}"
                )
            identities_seen[identity] = role

    initiating_owner = assignment.get("initiating_owner")
    target_role = assignment.get("target_role")
    if isinstance(initiating_owner, str) and initiating_owner not in roles:
        errors.append(
            f"role session is missing for initiating owner: {initiating_owner}"
        )
    if isinstance(target_role, str) and target_role not in roles:
        errors.append(f"role session is missing for target role: {target_role}")

    return errors


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "manifest", type=Path, help="Path to the preflight JSON manifest"
    )
    args = parser.parse_args(argv)
    manifest_path = args.manifest.resolve()
    try:
        document = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print("preflight: fail", file=sys.stderr)
        print(f"- cannot read manifest: {error}", file=sys.stderr)
        return 1

    errors = validate(document, manifest_path)
    if errors:
        print("preflight: fail", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print("preflight: pass")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
