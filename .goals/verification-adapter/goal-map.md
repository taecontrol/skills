# Goal map: verification-adapter

- Goal-map identity: `verification-adapter-map-v11`
- Project profile: `verification-adapter-profile-v1`
- Base revision: `755c150e3d765643e0641281dd540ea08fa1ad17`
- Current immutable candidate: `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`
- Current accepted slice: `verification-adapter-slice-v1`
- Status: complete

## Outcome and observable proof

Add an independently installable `verification-adapter` Factory specialist that creates or reconciles a target project's own verification CLI and Feature Map. Prove the contract with an executable deterministic fixture that exercises a real user action, identity freshness, concurrent isolation, ownership-safe cleanup, evidence integrity, and persistent-effect confirmation through a second faithful seam. Integrate the capability into the existing Factory role contracts and repository installation/catalog documentation.

Observable completion is the acceptance checklist in GitHub issue `taecontrol/skills#30`, with all applicable repository gates passing from a clean checkout and a focused local commit.

## Accepted material decisions

Authority: GitHub issue `taecontrol/skills#30`.

1. Use the pstack-shaped, project-local pattern first; do not build a shared runtime or control framework.
2. The shared repository artifact is procedural guidance, contracts, templates where useful, and executable contract proof.
3. The target project owns its implementation language, toolchain, CLI, Feature Map, isolation, and evidence mechanisms.
4. The CLI reports control outcomes and observations only; Product Validator independently returns `Pass`, `Fail`, or `Inconclusive`.
5. Implementer, Cleaner, Verifier, and Product Validator remain distinct authorities over one exact candidate identity.
6. If no realistic pilot is available here, use a deterministic sample project or harness that executes the lifecycle end to end.
7. Pinned pstack and fictional-sample revisions are design inputs; attribution is required if wording or structure is adapted rather than independently implemented.

## Boundaries

Included:

- `skills/verification-adapter/` with an operational `SKILL.md` and progressively disclosed contracts.
- A deterministic executable fixture or available real pilot.
- Behavior-oriented proof for the twelve failure and evidence cases named in issue #30.
- Targeted integration changes to `pursue-goal`, `cleaner`, `implementation-review`, `use-case-qa`, and `README.md`.
- Attribution updates if source adaptation requires them.

Excluded:

- Universal CLI/runtime/daemon/protocol/SDK abstractions.
- Generalizing Manuvra or selecting one automation technology for all product types.
- Exhaustively mapping existing Taecontrol products.
- Merge, deploy, publish, PR, or push operations.

## Facts and evidence

- The worktree is clean at the base revision.
- The repository contains skill documentation but no project-level automated test or lint configuration.
- No `AGENTS.md`, existing `.goals/` state, candidate lineage, or project-specific coding-standard file exists at the base revision.
- Issue #30 is open and contains no follow-up comments or superseding decisions as of `2026-09-01`.

## Discovery dispositions

### Repository contract integration

- Verdict: add a role-constrained capability, not a new Factory authority or lifecycle stage.
- Minimum safe edit surface: the new package; `pursue-goal/references/delivery-checkpoint.md`; `cleaner/SKILL.md`; `implementation-review/SKILL.md`; `use-case-qa/SKILL.md`; `README.md`; and `THIRD_PARTY_NOTICES.md` when adaptation requires it.
- Existing generic contracts already own exact-candidate identity, gates, isolation, role independence, and real-interface journey proof; integration should refer to them rather than duplicate or weaken them.
- Primary repository evidence: `skills/pursue-goal/references/delivery-checkpoint.md`, `skills/cleaner/SKILL.md`, `skills/implementation-review/SKILL.md`, `skills/use-case-qa/SKILL.md`, `skills/writing-for-agents/SKILL.md`, and `README.md` at the base revision.

### Pinned-source structure and licensing

- Verdict: selectively adapt the pstack project-local pattern under its MIT license, using issue #30 as the principal contract and Taecontrol's own wording.
- Required attribution: name the verification material, pinned revision `b9ddc83c32972210b8a94d389130713e8eed346e`, sources, and pstack copyright/permission notice in `THIRD_PARTY_NOTICES.md`.
- The fictional example at `d5abe70d0d8c671672b6cef4069363f26c488feb` has no license file in its pinned tree and labels itself a private reference. Do not copy or adapt its wording, selectors, recipes, or distinctive detailed arrangement; use it only as a non-copying conceptual check where issue #30 independently specifies the behavior.
- Primary external evidence: pinned pstack plugin metadata, `LICENSE`, creation and maintenance skills, and Feature Map examples; pinned fictional example tree, README, operating guide, and feature files.

### Fixture architecture

- Verdict: the smallest discriminating option is a self-contained local-service sample with a real user-facing product CLI, a separate canonical verification CLI, one run capsule per `run_id`, persistent state, manifest-backed artifacts, and black-box contract consumers.
- The sample product binds an actual ephemeral localhost port, publishes observed identity, accepts one real product-CLI mutation, persists it across restart, and exposes a distinct read-only observation seam.
- The verification CLI owns lifecycle/control/evidence operations but exposes no product-acceptance command. Tests invoke executable boundaries and do not import driver internals.
- This topology physically exposes all twelve required cases: wrong reachable candidate, shared target refusal, concurrent isolation, ownership-safe idempotent cleanup, timeout/ambiguity failure, complete evidence identity, tamper detection, freshness invalidation, persistence through a second seam, help/guide/map agreement, explicit unsupported paths, and fresh-context consumption.
- Rejected alternatives: a browser fixture adds unjustified dependencies and endorses one automation surface; an external pilot is unavailable in this repository; a single-process simulation cannot discriminate real process, port, ownership, restart, or second-seam failures.
- Reversible delivery choices: implementation language, filenames below the package contract, serialization helpers, and test-runner details.

## Material frontier

- Empty for `verification-adapter-slice-v1`.
- Human acceptance: user response `aprobado` on `2026-09-01`, accepting the proposed self-contained local-service fixture and complete local lifecycle.

## Accepted judgeable slice: `verification-adapter-slice-v1`

- Acceptance identity: `verification-adapter-slice-v1`
- Accepted against goal map: `verification-adapter-map-v2`
- Delivery goal map: `verification-adapter-map-v3`
- Project profile: `verification-adapter-profile-v1`
- Base revision: `755c150e3d765643e0641281dd540ea08fa1ad17`
- Authority: explicit user response `aprobado` on `2026-09-01`.

User-visible outcome:

- Installing `verification-adapter` gives an agent an operational, harness-agnostic procedure to create or reconcile a target project's own verification CLI and Feature Map.
- A self-contained fixture proves the complete contract through executable black-box behavior from a fresh context.
- Existing Factory roles know when and how to use the capability without merging authority or treating CLI output as acceptance.

Included behavior:

- Operational `skills/verification-adapter/SKILL.md` plus progressively disclosed CLI, Feature Map, evidence, and maintenance contracts.
- A fixture-local service, user-facing product CLI, separate verification CLI, Feature Map, evidence manifest, and tests covering every required case in issue #30.
- Capability-conditional integration into Coordinator delivery, Cleaner, Verifier, Product Validator, installation/catalog documentation, and precise pstack attribution.
- Cleaner materialization, independent Verifier review, and fresh-context Product Validator execution against one exact candidate, ending in a focused local commit if all gates pass.

Excluded behavior:

- A reusable runtime or framework, browser/mobile/desktop-specific implementation, real external pilot, generalized automation protocol, unrelated skills/tooling, push, PR, merge, deploy, or publication.

Protected behavior:

- Project-local ownership and target toolchain choice.
- Exact candidate/adapter/Feature Map/environment identities and fail-closed semantics.
- Run isolation, user-instance protection, ownership-scoped cleanup, retained proof, and no secrets.
- Independent Cleaner → Verifier → Product Validator authority; the CLI cannot return acceptance.

Product Validator proof:

- From only the accepted contract, CLI help, Feature Map, and candidate artifacts, a fresh Product Validator runs `doctor`, performs the real product-CLI mutation, observes persistence after restart through the separate read-only seam, inspects direct evidence/checksums, and judges the journey independently.
- The deterministic suite separately demonstrates all twelve failure, integrity, concurrency, cleanup, freshness, support, and fresh-context requirements.

## Current route

Goal complete. The verified delivery surface is committed locally at `b613060` (`feat(verification): add project-local adapter workflow`). No push, pull request, merge, deploy, or publication was performed or authorized.

## Candidate and gate evidence

- Cleaner outcome: `Ready`.
- Candidate identity: `verification-adapter-candidate-sha256-92d03e4ba797edbe6cfaccae617806b824accf6bcacfaf3067292b3bcc2e2b99`.
- Materialization and gate ledger: `.goals/verification-adapter/candidate-ledger.md`.
- Included surface: 20 production, test, fixture, role-contract, catalog, and attribution files; coordination artifacts excluded.
- Cleaner repaired eight local findings covering content-derived identity, truthful exercised-feature recording, stopped-run ownership, PID/service binding, observation freshness, failed-launch cleanup, capability redaction, and executable documentation.
- Gates: 14/14 black-box tests, canonical help, fresh operational journey, compile check, package links/frontmatter, patch hygiene, coordination-boundary scan, process cleanup, and digest reproduction all `Pass`.
- Independent Verifier outcome on this candidate: `Repair -> Cleaner`.
- Verifier ledger: `.goals/verification-adapter/verifier-ledger.md`.
- Open `VER-001`: `verify-evidence` accepted a manifest whose observation referenced an artifact removed from both disk and the artifact record.
- Open `VER-002`: malformed readiness JSON escaped the post-spawn termination guard and could leave the child alive after runtime cleanup.
- Cleaner repair outcome: `Ready` with new candidate `verification-adapter-candidate-sha256-c3346828467a483c44c63b84f4b60b97e8a2da1a7ce669bdb48c397c53a46836`; parent candidate `92d03e4b…` remains rejected and uncommitted.
- `VER-001` repair: strict schema-v1 validation now enforces complete shape, namespaces, uniqueness, and observation-to-artifact/feature referential integrity; dangling and missing-field probes fail closed.
- `VER-002` repair: every post-spawn readiness/identity failure now terminates and reaps the direct child; a live malformed-readiness stub proves its PID is gone on return.
- Current gates: 16/16 black-box tests and the full help, journey, compile, link, diff, coordination, process, and digest gates pass; independent re-verification remains required.
- Independent re-verification: `VER-001` and `VER-002` resolved on candidate `c3346828…`.
- New `VER-003`: manifest artifact paths accepted absolute/noncanonical aliases and enforced uniqueness on raw strings, allowing two records to resolve to the same file. Require relative canonical paths, canonical-identity uniqueness, and a black-box negative probe.
- Cleaner `VER-003` repair outcome: `Ready` with new candidate `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`.
- Repair enforces relative canonical POSIX paths beneath the exact run evidence namespace, rejects absolute and dot/noncanonical forms, deduplicates resolved identities including symlink aliases, and applies the same parser to observations.
- Current gates: 17/17 black-box tests plus full help, journey, compile, link, diff, coordination, process, and digest gates pass.
- Independent Verifier outcome: `Pass -> Product Validator` on exact candidate `6403d5c0…`; all `VER-001`, `VER-002`, and `VER-003` are `Resolved` and no findings remain open.
- Fresh-context Product Validator outcome: `Pass -> Coordinator commit readiness` on the exact same candidate.
- Product journey evidence: `.goals/verification-adapter/product-validation-ledger.md`.
- Final accepted journey: fresh copy and isolated run; exact `doctor`; baseline `0`; public product-CLI mutation to `73`; restart generation `1 → 2`; public and independent persistent views both `73`; five canonical artifacts/checksums verified before and after cleanup; evidence preserved; second cleanup idempotent; runtime and process absent; candidate digest unchanged.
- Delivery commit: `b61306092a8b7d9070bf8e9a1cead799f40969d2`.
- Clean-checkout gate: local isolated clone detached at `b613060`; 17/17 tests, canonical help, compile, diff hygiene, zero process residue, and manifest-based candidate digest reproduction all `Pass`.

## Evidence-supported future slices

- None required for issue #30. Browser, GUI, mobile, desktop, external pilots, and any future shared abstraction remain separate decisions and slices.

## Risks and blockers

- Risk: documentation-only assertions could satisfy text checks while failing operational behavior.
- Risk: the fixture could accidentally establish a universal implementation rather than demonstrate a project-local contract.
- Risk: self-reported evidence could blur product acceptance authority.
- Residual fidelity limit: executable proof covers the documented local CLI/localhost fixture, not browser, GUI, mobile, desktop, external pilots, or production environments; these were explicitly outside the accepted slice.
- Blockers: none.

## Superseded input

- None.
