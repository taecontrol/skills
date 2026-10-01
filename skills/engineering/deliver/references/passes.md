# Delivery passes

Contracts for the delivering agent's slice work and repairs. The fresh reviewers it dispatches work under the [review contract](review.md).

## Shared contract

- Work only in the current worktree and the active assignment: one accepted slice, or a repair of a supported integrated finding. Preserve unrelated changes and the integrated results outside that boundary.
- Keep the accepted inputs in view. Before editing, read the specification's active slice and every brief, design, or contract section it cites, and read them again after context compaction. The cited source, not a paraphrase of it, defines the required and forbidden results.
- Read applicable project instructions, coding standards, and executable gate configuration. Inspect the actual affected flow; a summary, including your own earlier one, is not repository evidence.
- For work with UI, open its authoritative visual references before editing or judging. Follow [method selection](../../product-validation/SKILL.md#choose-a-faithful-method) to exercise the running product.
- Load the [`strategic-programming`](../../strategic-programming/SKILL.md) skill before the first slice and apply it to every slice and repair; reread it after context compaction. Its lenses are part of this contract.
- Resolve reversible implementation details locally. Return evidence that invalidates accepted behavior, a public contract, sensitive policy, or costly-to-reverse architecture instead of changing it silently.
- Name every new file, test, fixture, script key, and document in a versioned location for what it is. Journey labels, slice numbers, and other temporary-document identifiers stay in temporary documents.
- If a failing gate or observed defect remains causally uncertain after direct inspection, establish a diagnosis under `diagnosing-bugs` before changing production code. A gate that passes only on an unchanged retry is an undiagnosed intermittent failure, not green.
- Undo a temporary edit by reversing it; restoring the file from Git also discards its uncommitted work.
- Run gates after the final edit. For CRAP, follow the specification's command, analysis scope, coverage prerequisites, and per-slice disposition under [Validation](../../implementation-spec/SKILL.md#validation). A full-project calculator does not establish that a changed-code check exists. Report an unavailable check without inventing tooling or waiving a required project gate.

## Slice

Produce the complete vertical behavior of the active slice.

Trace the real flow and callers before editing. For each protected behavior at risk in the slice, run its characterization proof against the unmodified code first, writing it when the specification names one that does not exist yet, and watch it pass; it stays green through the change unless an accepted obligation changes that behavior.

Reach beyond the diff in both directions. Where the slice adds behavior next to comparable existing behavior, find the policy the code already applies to those peers, such as guards, validation, authorization, waits, and special-case branches, and decide whether the new behavior inherits each one. Where the slice makes a **semantic change**, meaning an existing name, state, value, or seam now holds or does something different, changes at different times, or comes from a different source, trace every consumer of it, including code the slice did not touch, and judge each one against the new meaning. The specification's touchpoints are the starting point, not the limit; a question no accepted source answers is a resynchronization point.

Where correctness depends on interacting state, such as concurrent reads and writes against a cache, retries, or form fields that reshape other fields, enumerate the **state space** before implementing: each operation outcome, ordering, or field change against each state it can meet, with the accepted result. The specification's complete outcome sets are the starting point; add the ones the dependency's actual behavior reveals. Derive the tests from that enumeration, so review confirms the state space instead of discovering it path by path.

Implement the accepted outcome, tests, migrations, interface changes, and supporting documentation that belong to the slice. Exercise the behavior through the narrowest faithful seam and cover material failure, authorization, malformed-input, migration, restart, or state-preservation behavior when applicable, with inputs built from what was actually observed.

Prove the proof: for each new guard, policy branch, or failure path, temporarily apply the credible regression it guards against and confirm that a test goes red. A test that stays green is decoration; strengthen it before handoff.

Then finish strategically: inspect change amplification, leaked implementation detail, duplicated policy, avoidable custom machinery, dishonest names or types, and failure behavior without a clear owner. Repair what the slice supports, then run the applicable gates against the final state.

### UI acceptance within a slice

Before a UI slice is green, exercise its complete available behavior in the running target app, including the material invalid-input, recovery, and state-preservation cases in its accepted scope. Follow data through the next available consumer: creating a record is incomplete proof when the slice also requires selecting or using it. Check normal use first; expand only to accepted cases and supported risks. For an enabling slice without a usable interface, prove its capability through the narrowest faithful seam and identify the later slice that exercises the UI.

Compare the implemented screen with the selected design at equivalent sizes and states. Inspect composition, hierarchy, content, controls, actions, and interaction behavior; retain the reference and actual rendered evidence together. Platform adaptation preserves accepted decisions. Correct material divergence before the slice is green; a changed design requires acceptance. Missing runtime or visual evidence is an explicit gap, not a green slice based on technical tests.

## Integrated repair

Repair one supported finding, or a group sharing one seam, after integrated review or a failed full-project gate or product validation. The finding and its evidence replace the active-slice boundary; do not invent or reopen a slice. Setup failures and missing tooling follow [When validation cannot proceed](../SKILL.md#when-validation-cannot-proceed) first.

Fix the cause at its seam, even when that seam crosses code introduced by more than one slice. When the seam has an enumerated state space, check the repair against all of it, not only the reported path. Add or adjust a test that fails without the repair. When the repair touches a seam other callers use, run or add a characterization proof for each existing caller, or name the accepted change in behavior. For a test finding, fix, delete, or add the test so the suite proves what its names claim and every accepted obligation has a test that goes red without it. Run the affected focused tests, the changed-code complexity check when configured, and other affected gates, then create one focused commit.

## Recurrence prevention

Prevention targets the general cause, never the instance. After the repairs, look across all repaired defects together and ask what they have in common: which missing principle or unguarded mechanism let them through. Several findings often share one cause; a single finding rarely justifies an addition on its own.

Add a check or rule only when it passes all of these tests:

- **General:** it states a principle or catches a mechanism that applies across the project's future work, not the specific file, operation, or value where the defect appeared. Name at least one other plausible instance it would catch besides the one found. A pre-existing defect with the same mechanism, seen during review or repair, is such an instance and the strongest evidence that the cause is general.
- **Useful:** it would have caught a defect that cost real repair work, and its false positives and maintenance cost stay small.
- **Not already owned:** no existing check or rule covers it. Prefer broadening or sharpening an existing check or rule over adding a new one.

Then choose the owner:

- **Deterministic check.** When the project's configured tools can express the principle reliably, as a lint or type rule, an architectural test, or a script in the existing verification or CI command, add it. A shared component or helper that owns the mechanism, with a lint or architectural restriction that routes every caller through it, is such a check. Prove it goes red on the defect or an equivalent planted violation. Fix the existing violations it reports, or scope them with a named exception when fixing them is outside the delivery.
- **Coding standard.** When the principle needs reviewer judgment, add or revise a rule in the project's standards source under the [`coding-standards`](../../coding-standards/SKILL.md) filter: accepted, project-specific, durable, concrete enough to judge in a diff, and not enforceable by tooling.
- **New tool.** When the check needs a tool the project does not already use, such as mutation testing, recommend it in the close report with its expected cost instead of installing it.

Most deliveries add nothing or one addition; each one earns its place against the tests above. Commit each addition separately from the repairs, and present it in the close report with the defects it generalizes and the other instances it would catch. A pre-existing instance left unrepaired goes in the close report with the check that would catch it, added or recommended.
