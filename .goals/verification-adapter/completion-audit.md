# Completion audit: verification adapter

- Audit input goal map: `verification-adapter-map-v10`
- Closure goal map: `verification-adapter-map-v12`
- Accepted slice: `verification-adapter-slice-v1`
- Delivery project profile: `verification-adapter-profile-v1`
- Current project profile: `verification-adapter-profile-v2`
- Base revision: `755c150e3d765643e0641281dd540ea08fa1ad17`
- Final candidate: `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`
- Candidate ledger: `.goals/verification-adapter/candidate-ledger.md`
- Verifier ledger: `.goals/verification-adapter/verifier-ledger.md`
- Product Validation ledger: `.goals/verification-adapter/product-validation-ledger.md`
- Audit status: complete.
- Delivery commit: `b61306092a8b7d9070bf8e9a1cead799f40969d2`.

## Scope and deliverables

| Requirement | Authoritative evidence | Disposition |
| --- | --- | --- |
| Independently installable `verification-adapter` follows repository skill conventions. | `skills/verification-adapter/SKILL.md` has conservative frontmatter, a compact operational flow, local progressive references, and a self-contained fixture; `README.md` installs and catalogs it in Factory core. | Proven |
| Create or reconcile a project-owned CLI and Feature Map without a universal runtime. | Main skill first extends the local owner or creates the smallest native package; `fixture/README.md` explicitly forbids treating the sample as a runtime/template. | Proven |
| Cover identity, freshness, lifecycle, product control, isolation, evidence, and ownership-safe cleanup. | `references/cli-contract.md`, `references/evidence-contract.md`, and the executable fixture CLI/tests. | Proven |
| Bind evidence to candidate, adapter, Feature Map, build, environment, target, data store, run, and owner identities. | Evidence contract; manifest gate; Cleaner materialization ledger; fresh Product Validation manifest. | Proven |
| Fail closed for unknown, stale, unsupported, timeout, ambiguity, invalid evidence, and unknown ownership. | CLI exit contract; black-box stale/shared/timeout/unsupported/schema/ownership tests; independent Verifier probes. | Proven |
| Maintain a behavioral Feature Map with every reachable entry point, literal drive steps, observations, proof, variants, and gotchas. | `fixture/feature-map/index.md`, `fixture/feature-map/features/counter.md`, and `references/feature-map-contract.md`; help/guide/map agreement test. | Proven |
| Exercise a real action and persistent effect through a second faithful seam. | Public `product_cli.py` mutation, service restart, public read plus read-only state-file view; retained test and Product Validation journey `0 → 73`. | Proven |
| Execute concurrent isolation and user-session protection. | Parallel-run test uses distinct live ports/state/resources; shared/default target test refuses without acknowledgement; ownership/PID/cross-run probes in Cleaner ledger. | Proven |
| Preserve Cleaner → Verifier → Product Validator authority mechanically. | Conditional role edits; no acceptance command; three rejected-candidate lineages; same-candidate Verifier pass; fresh-context Product Validator pass. | Proven |
| CLI emits observations/artifacts but no acceptance oracle. | Canonical help and source scans; control-only result semantics; Product Validator alone issued `Pass`. | Proven |
| Factory documentation and install instructions include the capability. | `README.md` Factory core install/catalog plus conditional edits to delivery, Cleaner, Verifier, and Product Validator contracts. | Proven |
| Applicable tests, linters, and validation pass. | 17/17 black-box tests; help, compile, links/frontmatter, diff, coordination, process, manual journey, and digest gates pass. Profile documents that no repository linter/formatter exists. An isolated clone detached at delivery commit `b613060` repeated the full suite, help, compile, diff hygiene, process scan, and manifest-based digest reproduction. | Proven |
| Attribution/licensing obligations are satisfied. | `THIRD_PARTY_NOTICES.md` names pstack 0.14.5, pinned SHA, adapted surfaces, copyright, and MIT terms. No wording from the unlicensed fictional sample was copied. | Proven |

## Required executable proof

| Issue #30 case | Retained evidence | Independent evidence | Disposition |
| --- | --- | --- | --- |
| 1. `doctor` rejects reachable wrong candidate. | `test_doctor_rejects_reachable_wrong_candidate` | Verifier identity/freshness trace. | Proven |
| 2. Isolated checkout refuses shared/default target. | `test_isolated_invocation_refuses_shared_default_target` | Verifier shared-target trace. | Proven |
| 3. Concurrent runs have distinct resources and cannot cross-observe. | `test_parallel_runs_have_disjoint_ports_state_and_resources` | Cleaner cross-run port/identity probe; Verifier regression pass. | Proven |
| 4. Cleanup is owned, idempotent, and preserves proof. | `test_cleanup_is_owned_idempotent_and_preserves_evidence` | Forged owner/PID probes; Product Validator cleaned twice and retained five artifacts. | Proven |
| 5. Timeout/ambiguous state cannot serialize success. | `test_timeout_is_recorded_as_failure_not_success`; CLI result contract. | Verifier fail-closed review; no ambiguous result used as proof. | Proven |
| 6. Manifest records exact identities, history, timestamps, artifacts, sizes, and checksums. | `test_manifest_records_exact_identities_actions_times_and_checksums` | Product Validator inspected 17 commands and five artifacts. | Proven |
| 7. Artifact tampering is detectable. | `test_artifact_tampering_is_detected`, strict schema/reference and canonical-path tests. | `VER-001` and `VER-003` adversarial probes resolved. | Proven |
| 8. Candidate/adapter changes invalidate evidence. | `test_candidate_or_adapter_change_invalidates_prior_evidence` and `test_changed_executable_inputs_invalidate_evidence_without_caller_hint`. | Verifier independently reproduced content-derived candidate digest. | Proven |
| 9. Persistent mutation is confirmed through a second seam. | `test_persistent_mutation_uses_read_only_second_view_after_restart`. | Product Validator observed public and persistent views both `73` after restart. | Proven |
| 10. Help, guide, and recipes agree. | `test_help_operating_guide_and_feature_recipes_agree`. | Product Validator discovered and executed commands only from durable inputs. | Proven |
| 11. Unsupported paths remain explicit and cannot borrow proof. | `test_unsupported_path_is_explicit_and_cannot_be_reported_verified`. | Verifier contract/authority trace. | Proven |
| 12. Fresh consumer succeeds without Implementer transcript. | `test_fresh_copy_runs_complete_journey_without_repository_context`. | Independent Product Validator used a fresh copied fixture and no prior reasoning. | Proven |

## Additional adversarial evidence

- Cleaner repaired eight pre-freeze findings before the first candidate, including content-derived identity, truthful feature history, owner/PID binding, observation freshness, child recovery, and secret redaction.
- Independent Verifier rejected candidate `92d03e4b…` for dangling evidence references and malformed-readiness child leakage (`VER-001`, `VER-002`).
- Independent Verifier rejected candidate `c3346828…` for absolute/noncanonical/canonical-alias artifact identity (`VER-003`).
- Candidate `6403d5c0…` resolves all three findings. The Verifier reproduced its digest, reran original and retained attacks, added observation-alias and namespace-escape probes, and returned `Pass -> Product Validator` with no open finding.
- Product Validator reproduced the digest before and after the journey and returned `Pass -> Coordinator commit readiness`; earliest divergence: none.

## Current local gates

- `python3 -m unittest discover -s tests -v`: 17/17 `Pass` on final bytes.
- `python3 verify.py --help`: canonical eleven-command surface and exit semantics present.
- `python3 -m compileall -q .`: `Pass`.
- `git diff --check`: `Pass`.
- Candidate digest reproduction: `6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`.
- Fixture process scan: none present.
- Clean checkout at `b613060`: 17/17 suite `Pass`; help, compile, diff hygiene, process scan, and candidate digest `6403d5c0…` reproduction `Pass`.

## Closure

Every issue #30 acceptance criterion and named executable case has direct candidate, Verifier, and Product Validation evidence. The delivery surface is committed locally, the clean-checkout gate passes, no finding or blocker remains, and no external action was taken.
