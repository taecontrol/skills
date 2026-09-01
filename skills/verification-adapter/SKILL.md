---
name: verification-adapter
description: "Create or reconcile a target project's local verification CLI and Feature Map when independent product validation needs stable launch, control, isolation, observation, or evidence capabilities."
---

# Verification adapter

Give an independent Product Validator a maintained way to operate the exact
candidate through real product surfaces. Create project-owned infrastructure;
do not install a shared runtime, choose a universal automation technology, or
decide whether a product journey passes.

## Establish the local contract

1. Read repository instructions, the accepted journey, launch and build paths,
   existing automation, user-facing surfaces, stable handles, persistent state,
   and available observation seams. Identify the target project's toolchain and
   the local owner of control code.
2. Extend an existing control tool when it clearly owns the required behavior.
   Otherwise create the smallest project-local package in the project's native
   language and package manager. Keep its guide, CLI, Feature Map, tests, and
   evidence schema together so the project can maintain them without this skill.
3. Name the expected candidate/build, adapter, Feature Map, environment, target,
   and `run_id` identities. Treat unknown or mismatched identity as a blocking
   result. If the project cannot provide an immutable executable identity, return
   the gap to the Coordinator instead of approximating freshness.

Completion: the intended owner, real product seam, persistent observation seam,
identity sources, isolation boundary, and unsupported surfaces are explicit.

## Build or reconcile the package

1. Implement one canonical CLI entry point whose `--help` is the command source
   of truth. Apply the lifecycle, identity, control, and failure rules in
   [CLI contract](references/cli-contract.md).
2. Create a Feature Map index and one file per coherent user capability using
   [Feature Map contract](references/feature-map-contract.md). The map describes
   observable behavior and recipes; it neither invents requirements nor proves
   that a journey passes.
3. Emit direct, integrity-checked artifacts and a machine-readable manifest as
   specified by [Evidence contract](references/evidence-contract.md). The CLI
   reports operations and observations only. Do not add `pass`, `approve`, or an
   equivalent product-acceptance command.
4. Add focused black-box tests for identity mismatch, isolation, ownership-safe
   cleanup, fail-closed observations, evidence integrity and freshness, and one
   persistent effect observed through a second faithful seam. Tests invoke the
   public executable boundaries, not driver internals.

Completion: `doctor` proves expected versus observed identity, parallel runs do
not share owned resources, unknown ownership blocks deletion, evidence survives
cleanup, and no command can serialize unsupported, stale, timed-out, or ambiguous
results as success.

## Exercise and hand off

1. Follow [Maintenance workflow](references/maintenance-workflow.md) for both new
   packages and reconciliations. Execute representative Feature Map recipes
   against the exact candidate and retain the command sequence and direct proof.
2. Confirm a real user action through the product surface and its persistent
   effect through a separate read-only seam. Direct state mutation may seed a
   disposable fixture, but cannot stand in for the user action under judgment.
3. Report candidate, adapter, Feature Map, environment, target and run identities;
   commands; artifact locations; limitations; unsupported paths; cleanup; and
   remaining uncertainty. Keep credentials, cookies, tokens, and unrelated user
   data out of evidence.
4. Hand the maintained package and durable inputs to Cleaner. Cleaner materializes
   the exact candidate; Verifier reviews its technical safety; Product Validator
   independently returns only `Pass`, `Fail`, or `Inconclusive` for accepted
   journeys. A changed product, driver, map, build procedure, fixture, or relevant
   configuration creates new evidence identity.

Completion: a fresh Product Validator can choose a recipe, run `doctor`, exercise
the real interface, inspect direct evidence, and clean owned resources without
the Implementer's transcript.

## Executable example

[`fixture/`](fixture/) is a deterministic, dependency-free sample project that
demonstrates these contracts with its own CLI-shaped product. It is contract
proof, not a runtime or template to install into target projects.
