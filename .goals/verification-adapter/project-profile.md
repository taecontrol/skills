# Project profile: verification-adapter

- Profile identity: `verification-adapter-profile-v2`
- Supersedes: `verification-adapter-profile-v1`
- Repository: `taecontrol/skills`
- Base revision: `755c150e3d765643e0641281dd540ea08fa1ad17`
- Recorded: `2026-09-01`

## Product and repository

- This repository distributes independently installable, portable agent skills.
- Canonical repository catalog and installation guidance: `README.md` at the base revision.
- Canonical requested outcome and scope: GitHub issue `taecontrol/skills#30`, "Spec: add project-local verification CLI and Feature Map workflow".
- Skill packages live under `skills/<skill-name>/`; detailed material is progressively disclosed through `references/`, with templates or scripts only when useful.

## Executable gates and harness limits

- No project-level package manifest, test runner, formatter, or linter is present at the base revision.
- The independently installable fixture owns its black-box gate: from `skills/verification-adapter/fixture`, run `python3 -m unittest discover -s tests -v`.
- Additional gates are canonical CLI help, Python compilation, package links/frontmatter, patch hygiene, coordination-boundary scan, process cleanup, candidate digest reproduction, independent Verifier review, and fresh-context Product Validation.
- No separate lint or formatting gate applies because the repository still has no maintained linter or formatter configuration.
- The deliverable must remain harness-agnostic and independently installable; it cannot rely on Cursor-only paths, APIs, or invocation.

## Protected surfaces and architecture constraints

- Preserve the separate authority of Coordinator, Implementer, Cleaner, Verifier, and Product Validator.
- The project-local CLI may launch, drive, observe, and record, but may not decide product acceptance.
- Share procedural guidance, templates, and contract tests, not a universal runtime, daemon, protocol, SDK, or cross-project control framework.
- Evidence and candidate identity must fail closed when freshness, ownership, support, or interpretation is unknown.
- Cleanup must be scoped to known run ownership and preserve proof artifacts and user-owned state.

## Git and external-effect policy

- Work only in the current isolated worktree.
- Acceptance of a slice authorizes its complete local lifecycle and focused local commit.
- It does not authorize push, pull request creation, merge, deployment, publication, paid activity, destructive work, or production mutation.
- External sources may be read; pinned revisions in issue #30 are the design inputs.

## Coding standards

- Disposition: `baseline-only`.
- No project-specific coding-standard file exists at the base revision.
- Applicable maintained sources are `README.md`, the role skill contracts under `skills/`, and issue #30; do not infer new repository policy from incidental existing code.
