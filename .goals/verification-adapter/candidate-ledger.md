# Candidate ledger: verification adapter

## Immutable identity

- Candidate identity: `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`
- Candidate digest: `6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`
- Digest algorithm: SHA-256 over the literal byte stream `base\0<base-revision>\n`, followed by each included path in bytewise lexical order as `<path>\0<content-sha256>\n`.
- Goal map: `verification-adapter-map-v7`
- Accepted slice: `verification-adapter-slice-v1`
- Project profile: `verification-adapter-profile-v1`
- Base revision: `755c150e3d765643e0641281dd540ea08fa1ad17`
- Materialization state: frozen after bounded Cleaner repair of independent finding `VER-003`; `.goals/` is coordination state and is excluded from the candidate.

## Candidate lineage

| Candidate | Parent | Disposition | Evidence |
| --- | --- | --- | --- |
| `verification-adapter-candidate-sha256-92d03e4ba797edbe6cfaccae617806b824accf6bcacfaf3067292b3bcc2e2b99` | Base revision | Rejected by independent Verifier; superseded, never committed | Review 1 in `.goals/verification-adapter/verifier-ledger.md`; open `VER-001` and `VER-002` |
| `verification-adapter-candidate-sha256-c3346828467a483c44c63b84f4b60b97e8a2da1a7ce669bdb48c397c53a46836` | Rejected candidate `92d03e4b…` | Rejected by independent Verifier; superseded, never committed | Review 2 resolved `VER-001`/`VER-002` and opened `VER-003` |
| `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca` | Rejected candidate `c3346828…` | Current frozen Cleaner candidate | Canonical relative artifact-path and resolved-identity repair recorded below |

Reproduce the candidate digest from a checkout containing these exact files:

```zsh
artifact_files=$( { git diff --name-only; find skills/verification-adapter -type f -not -path '*/__pycache__/*'; } | LC_ALL=C sort -u )
{
  printf 'base\0%s\n' "$(git rev-parse HEAD)"
  for artifact_file in ${(f)artifact_files}; do
    content_digest=$(shasum -a 256 "$artifact_file" | awk '{print $1}')
    printf '%s\0%s\n' "$artifact_file" "$content_digest"
  done
} | shasum -a 256
```

Expected final line: `6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca  -`.

## Included artifacts

Every candidate file is regular mode `100644`; no generated or ignored file is included.

| Content SHA-256 | Path |
| --- | --- |
| `6e753163c3924b56955a50078f8e99b50496172ed85ef3f1ad3ed39ed402b0ae` | `README.md` |
| `86535815871b6b6500625978947373cbf9c842c03255b38182b28d394eea90c9` | `THIRD_PARTY_NOTICES.md` |
| `c814bc87a698390b7de2b3e940563a99e4d5dbd4e67fd52896661d6eb74f9dc1` | `skills/cleaner/SKILL.md` |
| `132a76853968f4a3f2c67a2e09047e71ea6e4b99868a4c932d4337d99463261f` | `skills/implementation-review/SKILL.md` |
| `083ecc40bca322f9014cb7086cc65d5f0b2fd84c98419ea0524f9d9988f8e3ed` | `skills/pursue-goal/references/delivery-checkpoint.md` |
| `9c93aa83c26022ec266870b65c8f1ffd37b19295f41ebcf21ae287b493dbb4c9` | `skills/use-case-qa/SKILL.md` |
| `2e0718b806c4409e7f6d06ee3d1ce941c59ca968c33d5941cbb2d751c73a3a36` | `skills/verification-adapter/SKILL.md` |
| `49ad6155c8447fdd1f57b68ab9e2d749dccdd4c78bc1bb6c1f02aa5e9e95622d` | `skills/verification-adapter/fixture/OPERATING.md` |
| `ce032fd0fc23ed226257e24a238a6039fb8808e14ccbfcdd0ecf32f641ae9b9b` | `skills/verification-adapter/fixture/README.md` |
| `08f9963ef1538b14ea1cd49420653914b75fb91489daf7eb315b9c1f7ce59310` | `skills/verification-adapter/fixture/common.py` |
| `f4c18c6f7d71d885e7271311b8d260c633ee3a150716e62e45c7edd994d52826` | `skills/verification-adapter/fixture/feature-map/features/counter.md` |
| `b9bfa8916ffe05916c35f3b875cfe2f4c800320ec4772a149c59034059136404` | `skills/verification-adapter/fixture/feature-map/index.md` |
| `e12bb6777af1512c61168ae8fe5210f3fead8695e53c721f67df9d7d980ebf64` | `skills/verification-adapter/fixture/product_cli.py` |
| `e17890a5c7b025161554e42f69b8c17b89a9b0dac5237e8b48b515d4a2e0d69f` | `skills/verification-adapter/fixture/service.py` |
| `5bcfeb03462912930b7dc3e68e04eb7676c7eee87f8bac4539bf289627352afb` | `skills/verification-adapter/fixture/tests/test_contract.py` |
| `6ab8f24b7a9fdcd5de298bf4219ba37fea6bef434bc8aeea88556c08281fa520` | `skills/verification-adapter/fixture/verify.py` |
| `90d6a91a5f76bd1581021af40f141625c68337dd1f8a14fe6bcfa31c948491fa` | `skills/verification-adapter/references/cli-contract.md` |
| `dfdd7d280766b6c47fea803ccea5e39538bf632a93a42cc2ad1d5bd9519be7a5` | `skills/verification-adapter/references/evidence-contract.md` |
| `cb3ad439d57b82f9948cf870fc38218fc0dd95e188fe96d0d8a88e85e67be7a4` | `skills/verification-adapter/references/feature-map-contract.md` |
| `067ff24c11c1c1fbeee8189b8509edf27541f45465ac1dba052e5d0d5dbc6118` | `skills/verification-adapter/references/maintenance-workflow.md` |

## Generated output and dependency procedure

- Production and test inputs execute directly from source; there is no build output to retain.
- Python bytecode under `__pycache__/` is disposable and excluded. Recreate it, if desired, with `python3 -m compileall -q skills/verification-adapter/fixture`; it is not an executable identity source.
- The fixture has no third-party runtime dependency, package install, lockfile, network service, database, or browser. `lockfile_identity` is `stdlib-no-lockfile`.
- Build-procedure identity: `ca2a9df90a89165f783d72387cbdbe4f5267b8610bb32630a74630f676d7f6c2`, the SHA-256 of `python-standard-library-direct-source-v1`.
- Fixture product identity: `4d8d5a04c8fadd3bca0a2340d2572337915630379cb6daebc82288f35b1e457c`.
- Fixture adapter identity: `088eecebf8768cb00cd22ec813e6ce74351e5302ca2e91ad7fe8bb0633cf233b`.
- Feature Map identity: `c0d6b5df890089a6ac231ff04cbfdf57f11782eed02d386729deea18426b0a5f`.
- Target identity: `counter-service-cli`; supported user surface: `product-cli`.

## Permitted configuration, fixture data, and drivers

- Required run inputs: an explicit absolute-or-resolvable `--root`, a validated unique `--run-id`, and the product digest reported by pre-launch `info`.
- Optional bounded inputs: lifecycle/wait timeout, expected counter integer, explicit expected adapter/Feature Map digests, requested support surface, and explicit acknowledgement for reserved shared/default run names.
- Fixture baseline: counter `0`; tests use only temporary directories, ephemeral localhost ports, generated ownership capabilities, and integer values local to each named run.
- Validation driver: `/Applications/Xcode.app/Contents/Developer/usr/bin/python3`, resolved to `/Applications/Xcode.app/Contents/Developer/Library/Frameworks/Python3.framework/Versions/3.9/bin/python3.9`.
- Driver environment: CPython `3.9.6`, Darwin `25.6.0`, `arm64`; Git `2.50.1 (Apple Git-155)`.
- Every retained owner identity is SHA-256 digested. Raw ownership capabilities exist only in temporary runtime metadata and service health exchange, and cleanup removes them.

## Excluded ambient state

- Excluded: `.git/`, `.goals/`, ignored caches, `__pycache__/`, prior test roots, prior service processes, shell history, editor state, environment variables other than the executable lookup used to start Python, and any workspace file not listed above.
- Excluded: credentials, tokens, cookies, real user data, user profiles, shared/default instances, remote network state, and external services.
- Tests create and clean isolated local resources. Evidence remains only inside each test's temporary directory until its enclosing temporary directory is released.

## Cleaner finding ledger

| ID | Origin | Finding and consequence | Repair and discriminating evidence | Status |
| --- | --- | --- | --- | --- |
| `CLN-001` | implementation-defect | Candidate identity was caller-supplied and echoed by the service, so a wrong executable could self-report the expected digest. | Product digest now covers executable inputs, `info` derives it, provision/service independently reject mismatches, and file-change probes invalidate product, adapter, and Feature Map evidence without a caller hint. | repaired |
| `CLN-002` | implementation-defect | `features_exercised` claimed both journeys at provision, before any user action. | The manifest starts empty; product `set` and persistent observation add only their exercised IDs. Tests inspect all three states. | repaired |
| `CLN-003` | implementation-defect | Cleanup of a stopped run trusted mutable metadata and could delete after owner-token forgery. | Runtime ownership is compared to retained hashed ownership, target, and data-store evidence before stop and immediately before deletion; running and stopped forgery probes fail closed. | repaired |
| `CLN-004` | implementation-defect | A reachable service identity was not bound to the PID that `stop` would signal. | Service health now reports its PID; launch binds the child handle to readiness; stop compares observed PID before signaling. A forged-PID probe proves an unrelated live process is preserved. | repaired |
| `CLN-005` | implementation-defect | `wait` and persistent observation read a configured port without revalidating the run identity. | Both commands compare current package identities and observed service identity. A cross-run port probe fails rather than consuming another run's value. | repaired |
| `CLN-006` | implementation-defect | Readiness validation failure could leave the spawned process or partial runtime behind. | Launch terminates only its direct child handle on timeout/malformed identity, and failed provision removes runtime while retaining the structured limitation. A deterministic readiness-timeout probe covers recovery. | repaired |
| `CLN-007` | implementation-defect | `doctor` and capture evidence retained the raw ownership capability. | Evidence-safe identities replace it with a digest, manifest redaction is explicit, and the suite scans all retained files for the raw token. | repaired |
| `CLN-008` | stale-or-invalid | The README generated a fictitious digest that the repaired fail-closed provision correctly rejects. | README and operating guide now derive the real digest via `info` before provision. | repaired |
| `VER-001` | implementation-defect | The rejected candidate accepted an observation whose referenced artifact and artifact record were both removed. | Schema-v1 parsing now validates complete shape, types, timestamps, redaction, failure history, artifact namespace/uniqueness, and observation-to-artifact/feature references before any consumer interprets evidence. Black-box dangling-reference and missing-required-field probes exit `4` with `evidence_invalid`. | repaired |
| `VER-002` | implementation-defect | A malformed readiness file raised before the rejected candidate's termination guard, leaving its directly spawned child alive. | Every post-spawn readiness wait/read/parse/identity and ownership-metadata failure now shares direct-child termination and reaping. A copied-fixture stub writes malformed JSON then stays alive; the probe proves its PID is absent when `provision` returns. | repaired |
| `VER-003` | implementation-defect | Candidate `c3346828…` accepted relative and absolute manifest paths resolving to the same in-namespace artifact because uniqueness used raw strings. | Schema-v1 parsing now requires canonical relative POSIX paths below the exact run namespace, rejects dot segments and Windows/POSIX absolute forms, deduplicates resolved identities including symlinks, and parses observation references through the same boundary. Black-box absolute, dot-segment, and resolved-symlink alias probes all exit `4` with `evidence_invalid`. | repaired |

No finding challenges accepted user behavior, public authority, architecture, or gate policy. No resynchronization is required.

## Prior candidate gate ledger

Executed against candidate `verification-adapter-candidate-sha256-92d03e4ba797edbe6cfaccae617806b824accf6bcacfaf3067292b3bcc2e2b99` on `2026-09-01T15:58:46Z`:

| Gate | Result | Evidence |
| --- | --- | --- |
| Black-box contract suite | Pass | From `skills/verification-adapter/fixture`: `python3 -m unittest discover -s tests -v`; 14 tests passed in 12.695 seconds, covering the twelve issue cases plus executable-input freshness and failed-launch recovery. |
| Canonical CLI help | Pass | `python3 verify.py --help`; listed all eleven documented commands, global flags, defaults, example, and exit meanings; exit `0`. |
| Fresh operational journey | Pass | Pre-launch `info` derived the product digest; provision, exact-identity doctor, public product `set 47`, restart, second-seam persistence observation, stop, integrity verification, and cleanup all exited `0`. Final manifest had 8 ordered actions, 3 checksummed artifacts, both exercised feature IDs, completed cleanup, and no runtime directory. |
| Python source validation | Pass | `python3 -m compileall -q skills/verification-adapter/fixture`; exit `0`. No project linter or formatter exists at the base revision, so no separate lint gate is applicable under the project profile. |
| Package link/frontmatter check | Pass | Parsed every local Markdown link below `skills/verification-adapter/`; all targets exist. Confirmed required `name` and quoted `description` frontmatter. |
| Patch hygiene | Pass | `git diff --check`; no output, exit `0`. |
| Coordination-boundary scan | Pass | No goal-map, slice, profile, or base-revision identity occurs in retained production, test, fixture, or maintained documentation artifacts. |
| Process cleanup | Pass | `pgrep -fl '[s]ervice.py --runtime-dir'` found no fixture service after the final suite and manual journey. |
| Candidate materialization recheck | Pass | Recomputed 20-file/base digest after all gates: `92d03e4ba797edbe6cfaccae617806b824accf6bcacfaf3067292b3bcc2e2b99`. |

All required and discovered applicable gates are satisfied. The candidate is ready for independent, read-only Verifier review; this ledger is evidence, not independent verification or Product Validation.

Those results apply only to rejected candidate `verification-adapter-candidate-sha256-92d03e4ba797edbe6cfaccae617806b824accf6bcacfaf3067292b3bcc2e2b99` and cannot approve its successor.

## Superseded candidate gate ledger

Executed against candidate `verification-adapter-candidate-sha256-c3346828467a483c44c63b84f4b60b97e8a2da1a7ce669bdb48c397c53a46836` on `2026-09-01T16:11:56Z`:

| Gate | Result | Evidence |
| --- | --- | --- |
| Complete black-box contract suite | Pass | From `skills/verification-adapter/fixture`: `python3 -m unittest discover -s tests -v`; 16 tests passed in 14.151 seconds. This includes the prior 14 plus exact public-boundary probes for dangling observation evidence/malformed schema and a live child with malformed readiness. |
| Canonical CLI help | Pass | `python3 verify.py --help`; all eleven documented commands, global flags, defaults, example, and exit meanings listed; exit `0`. |
| Fresh operational journey | Pass | Pre-launch `info` derived product `0093f584…`; provision, exact-identity doctor, public product `set 53`, restart, second-seam persistence observation, stop, strict evidence verification, and cleanup all exited `0`. Final manifest had 8 ordered actions, 3 checksummed artifacts, both exercised feature IDs, completed cleanup, and no runtime directory. |
| Python source validation | Pass | `python3 -m compileall -q skills/verification-adapter/fixture`; exit `0`. No project linter or formatter exists at the base revision, so no separate lint gate is applicable under the project profile. |
| Package link/frontmatter check | Pass | Parsed every local Markdown link below `skills/verification-adapter/`; all targets exist. Confirmed required `name` and quoted `description` frontmatter. |
| Patch hygiene | Pass | `git diff --check`; no output, exit `0`. |
| Coordination-boundary scan | Pass | No goal-map, slice, profile, or base-revision identity occurs in retained production, test, fixture, or maintained documentation artifacts. |
| Process cleanup | Pass | `pgrep -fl '[s]ervice.py --runtime-dir'` found no fixture service after the complete suite and final manual journey. The malformed-readiness probe also independently proved its injected child PID was absent before returning. |
| Candidate materialization recheck | Pass | Recomputed 20-file/base digest after all gates: `c3346828467a483c44c63b84f4b60b97e8a2da1a7ce669bdb48c397c53a46836`. |

All required and discovered applicable gates are satisfied. `VER-001` and `VER-002` are locally repaired with discriminating proof. This new candidate is ready for fresh independent, read-only Verifier review; neither the prior review nor this Cleaner ledger approves it.

Those results apply only to rejected candidate `verification-adapter-candidate-sha256-c3346828467a483c44c63b84f4b60b97e8a2da1a7ce669bdb48c397c53a46836` and cannot approve its successor.

## Current candidate final gate ledger

Executed against candidate `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca` on `2026-09-01T16:20:05Z`:

| Gate | Result | Evidence |
| --- | --- | --- |
| Complete black-box contract suite | Pass | From `skills/verification-adapter/fixture`: `python3 -m unittest discover -s tests -v`; 17 tests passed in 16.126 seconds. The new path-identity test independently rejects relative+absolute aliases, record/reference dot-segment aliases, and distinct canonical paths resolving through a symlink. |
| Canonical CLI help | Pass | `python3 verify.py --help`; all eleven documented commands, global flags, defaults, example, and exit meanings listed; exit `0`. |
| Fresh operational journey | Pass | Pre-launch `info` derived product `4d8d5a04…`; provision, exact-identity doctor, public product `set 59`, restart, second-seam persistence observation, stop, strict evidence verification, and cleanup all exited `0`. Final manifest had 8 ordered actions, 3 checksummed canonical artifacts, both exercised feature IDs, completed cleanup, and no runtime directory. |
| Python source validation | Pass | `python3 -m compileall -q skills/verification-adapter/fixture`; exit `0`. No project linter or formatter exists at the base revision, so no separate lint gate is applicable under the project profile. |
| Package link/frontmatter check | Pass | Parsed every local Markdown link below `skills/verification-adapter/`; all targets exist. Confirmed required `name` and quoted `description` frontmatter. |
| Patch hygiene | Pass | `git diff --check`; no output, exit `0`. |
| Coordination-boundary scan | Pass | No goal-map, slice, profile, or base-revision identity occurs in retained production, test, fixture, or maintained documentation artifacts. |
| Process cleanup | Pass | `pgrep -fl '[s]ervice.py --runtime-dir'` found no fixture service after the complete suite and final manual journey. |
| Candidate materialization recheck | Pass | Recomputed 20-file/base digest after all gates: `6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`. |

All required and discovered applicable gates are satisfied. `VER-003` is locally repaired with discriminating proof, while independently resolved `VER-001` and `VER-002` remain protected. This candidate is ready for fresh independent, read-only Verifier review; no earlier review or Cleaner ledger approves it.
