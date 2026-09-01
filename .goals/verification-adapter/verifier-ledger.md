# Verifier ledger: verification adapter

## Review 1

- Goal map: `verification-adapter-map-v4`
- Accepted slice: `verification-adapter-slice-v1`
- Project profile: `verification-adapter-profile-v1`
- Base revision: `755c150e3d765643e0641281dd540ea08fa1ad17`
- Candidate: `verification-adapter-candidate-sha256-92d03e4ba797edbe6cfaccae617806b824accf6bcacfaf3067292b3bcc2e2b99`
- Outcome: `Repair -> Cleaner`
- Candidate digest independently reproduced: yes
- Independent suite: 14/14 pass

| ID | Origin | Evidence and consequence | Required outcome | Status |
| --- | --- | --- | --- | --- |
| `VER-001` | implementation-defect | Removing a capture artifact and its artifact record while retaining the observation reference still made `verify-evidence` exit `0`. The retained tamper test covered only modified bytes of listed artifacts. | Validate required manifest shape and observation-to-artifact referential integrity; add a black-box negative test for missing/dangling evidence. | Open |
| `VER-002` | implementation-defect | Malformed readiness JSON raised before the launch termination guard; a controlled child remained unterminated while provision removed runtime state. | Put every post-spawn readiness read, parse, and identity failure behind child termination; add a discriminating live-child malformed-readiness test. | Open |

Other traced obligations passed on the reviewed candidate: progressive disclosure, independent installation, Factory authority, exact identities and freshness, run isolation and shared-instance protection, owner capability redaction, persistent proof through a real product CLI and independent read-only seam, licensing, durable names, and project-local rather than shared-runtime boundaries.

Full review evidence was returned by the independent Verifier on `2026-09-01`; this durable ledger preserves the route and stable finding identities.

## Cleaner repair handoff

- New candidate: `verification-adapter-candidate-sha256-c3346828467a483c44c63b84f4b60b97e8a2da1a7ce669bdb48c397c53a46836`
- Parent/rejected candidate: `verification-adapter-candidate-sha256-92d03e4ba797edbe6cfaccae617806b824accf6bcacfaf3067292b3bcc2e2b99`
- `VER-001`: repaired by Cleaner; pending independent re-verification.
- `VER-002`: repaired by Cleaner; pending independent re-verification.
- Cleaner evidence: `.goals/verification-adapter/candidate-ledger.md`; 16/16 black-box tests plus all complete gates pass on the new digest.

## Review 2

- Goal map: `verification-adapter-map-v6`
- Candidate: `verification-adapter-candidate-sha256-c3346828467a483c44c63b84f4b60b97e8a2da1a7ce669bdb48c397c53a46836`
- Outcome: `Repair -> Cleaner`
- Candidate digest independently reproduced: yes
- Independent suite: 16/16 pass

| ID | Origin | Evidence and consequence | Required outcome | Status |
| --- | --- | --- | --- | --- |
| `VER-001` | implementation-defect | Original dangling observation/artifact probe now exits `4` with `evidence_invalid`; retained public-boundary negative proof passes. | None. | Resolved |
| `VER-002` | implementation-defect | Original malformed-readiness probe terminates and reaps the direct child; retained live-child negative proof passes. | None. | Resolved |
| `VER-003` | implementation-defect | A manifest with one relative artifact record and one absolute alias to the same in-namespace file passed `verify-evidence`; uniqueness compared raw strings rather than canonical resolved identity. | Reject absolute/noncanonical paths, enforce canonical resolved uniqueness, and retain a black-box negative probe. | Open |

## Cleaner repair handoff 2

- New candidate: `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`
- Parent/rejected candidate: `verification-adapter-candidate-sha256-c3346828467a483c44c63b84f4b60b97e8a2da1a7ce669bdb48c397c53a46836`
- `VER-003`: repaired by Cleaner; pending independent re-verification.
- Cleaner evidence: `.goals/verification-adapter/candidate-ledger.md`; 17/17 black-box tests and all complete gates pass on the new digest.

## Review 3

- Goal map: `verification-adapter-map-v8`
- Candidate: `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`
- Outcome: `Pass -> Product Validator`
- Candidate digest independently reproduced: yes
- Independent suite: 17/17 pass

| ID | Status | Independent evidence |
| --- | --- | --- |
| `VER-001` | Resolved | Dangling observation/artifact and malformed-schema cases fail closed. |
| `VER-002` | Resolved | Live malformed-readiness child is terminated and reaped. |
| `VER-003` | Resolved | Relative/absolute, dot-segment, resolved-symlink, unlisted observation alias, and namespace-escape cases fail closed. |

No findings remain open. Previously passed identity, freshness, isolation, ownership, redaction, persistence, licensing, progressive-disclosure, and Factory-authority obligations showed no regression. Route the exact candidate to a fresh-context Product Validator.
