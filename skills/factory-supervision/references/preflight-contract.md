# Assignment preflight

Use this after workspace setup and target-session creation but before delivering a Git-backed assignment. It detects stale accepted content, materialization changes, and role-session reuse. It does not decide product behavior or prove that a harness session is independent.

## Required checks

Record one JSON manifest with:

- `assignment`: `assignment`, `attempt`, `initiating_owner`, `target_role`, and `factory_identities`;
- `accepted_artifacts`: every applicable accepted project profile, design baseline, slice batch, execution plan, goal-validation disposition, human-acceptance record, and any additional identity the assignment treats as immutable, each with `identity`, `path`, and SHA-256 `sha256`;
- `workspace`: absolute `path`, full 40- or 64-character Git object ID as `base_revision`, `materialization_complete`, exact `allowed_dirty_paths`, and protected lock or configuration files with their accepted SHA-256 values;
- `role_sessions`: the initiating owner, target role, and every earlier internal lifecycle role in the same slice attempt, each with a distinct routing identity.

Use `not applicable` only when the phase has no such identity. Do not use placeholders for accepted revisions or digests. List both sides of a rename in `allowed_dirty_paths`. Paths may be absolute or relative to the manifest, except protected workspace files, which must be relative and remain inside the workspace.

Store the manifest in the assignment evidence destination. If that destination is tracked or untracked inside the candidate worktree, include the manifest itself in `allowed_dirty_paths`.

Example:

```json
{
  "assignment": {
    "assignment": "ASG-42-IMP-001",
    "attempt": "ATT-42-IMP-001",
    "initiating_owner": "Slice Owner",
    "target_role": "Implementer",
    "factory_identities": {
      "goal_map": "GM-42-003",
      "project_profile": "PP-42-002",
      "phase": "Delivery",
      "design_baseline": "DB-42-002",
      "slice_batch": "SB-42-002",
      "execution_plan": "EP-42-002",
      "goal_validation": "GV-42-001",
      "human_acceptance": "HA-42-001",
      "accepted_slice": "SL-42-001",
      "candidate": "none",
      "base_revision": "0123456789abcdef0123456789abcdef01234567"
    }
  },
  "accepted_artifacts": [
    {
      "identity": "PP-42-002",
      "path": "../project-profile-v2.md",
      "sha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "identity": "DB-42-002",
      "path": "../design-baseline-v2.md",
      "sha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    },
    {
      "identity": "SB-42-002",
      "path": "../slice-batch-v2.md",
      "sha256": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
    },
    {
      "identity": "EP-42-002",
      "path": "../execution-plan-v2.md",
      "sha256": "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
    },
    {
      "identity": "GV-42-001",
      "path": "../goal-validation-v1.md",
      "sha256": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    },
    {
      "identity": "HA-42-001",
      "path": "../human-acceptance-001.md",
      "sha256": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    }
  ],
  "workspace": {
    "path": "/absolute/path/to/slice-worktree",
    "base_revision": "0123456789abcdef0123456789abcdef01234567",
    "materialization_complete": true,
    "allowed_dirty_paths": [],
    "protected_files": [
      {
        "path": "pnpm-lock.yaml",
        "sha256": "1111111111111111111111111111111111111111111111111111111111111111"
      }
    ]
  },
  "role_sessions": [
    {"role": "Slice Owner", "identity": "term_owner"},
    {"role": "Implementer", "identity": "term_implementer"}
  ]
}
```

## Deterministic helper

Run:

```text
python3 <factory-supervision-skill>/scripts/validate_preflight.py <manifest.json>
```

The command exits zero only when required fields exist, accepted digests match, the workspace is at the declared base, dirty paths exactly match the declared set, protected files match, and role-session identities are unique. Keep the manifest and output in the assignment evidence.

The adapter must still confirm through its runtime that the recorded target session exists in the declared workspace and that Verifier and Product Validator are fresh. A passing file check cannot prove those runtime facts.

Completion criterion: setup is complete, every accepted byte and protected workspace input matches its recorded identity, all current workspace changes are declared, the target uses one dedicated session, and the adapter has confirmed the runtime facts the helper cannot observe.
