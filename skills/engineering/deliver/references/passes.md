# Delivery passes

Use these contracts when dispatching the two required write passes for one accepted slice or a bounded repair after integrated validation. Supply only the active assignment, the specification path, repository location, and any material current-state fact the actor cannot discover locally.

## Shared contract

- Work only in the current worktree and active assignment: one accepted slice, or an integrated repair explicitly dispatched after final validation. Preserve unrelated changes and the integrated results outside that boundary.
- Read the accepted slice or failed integrated obligation, applicable project instructions, coding standards, and executable gate configuration. Inspect the actual affected flow; do not treat another actor's summary as repository evidence.
- For a slice with UI, open its authoritative visual references before editing or judging. Follow [method selection](../../product-validation/SKILL.md#choose-a-faithful-method) to exercise the running product. This is part of the existing pass, not a separate validator dispatch.
- Apply the shared `strategic-programming` standard. At minimum, keep each policy at one clear seam, prefer deep modules and honest boundaries, use the least custom machinery that preserves accepted behavior and safety, and require proof that can disagree with the implementation.
- Resolve reversible implementation details locally. Return evidence that invalidates accepted behavior, a public contract, sensitive policy, or costly-to-reverse architecture instead of changing it silently.
- Own every supported defect within the accepted scope. Do not knowingly defer it to the next actor.
- If a failing gate or observed defect remains causally uncertain after direct inspection, establish a diagnosis under `diagnosing-bugs` before changing production code. Continue in the same pass when repair is already authorized; do not turn an obvious local cause into a formal debugging exercise.
- Run gates after the pass's final edit—or after review when no edit was needed. Both passes independently run applicable unit tests and affected project gates. For CRAP, follow the specification's command, analysis scope, coverage prerequisites, and per-slice disposition under [Validation](../../implementation-spec/SKILL.md#validation). A full-project calculator does not establish that a changed-code check exists. Report an unavailable check without inventing tooling or waiving a required project gate.
- Keep the handoff concise: outcome, files or seams changed, exact gate commands and results, direct product observations and evidence locations when applicable, and any precise blocker. Do not create a ledger or progress file.

## UI acceptance within a slice

Before a UI slice is green, exercise its complete available behavior in the running target app, including the material invalid-input, recovery, and state-preservation cases in its accepted scope. Follow data through the next available consumer: creating a record is incomplete proof when the slice also requires selecting or using it. Check normal use first; expand only to accepted cases and supported risks. For an enabling slice without a usable interface, prove its capability through the narrowest faithful seam and identify the later slice that exercises the UI.

Compare the implemented screen with the selected design at equivalent sizes and states. Inspect composition, hierarchy, content, controls, actions, and interaction behavior; retain the reference and actual rendered evidence together. Platform adaptation preserves accepted decisions. Correct material divergence before handoff; a changed design requires acceptance. Missing runtime or visual evidence is an explicit gap, not a green handoff based on technical tests.

The Implementer performs these checks before handoff. The Finisher opens the authoritative references and actual rendered result independently, then directly exercises the slice's principal behavior and any repaired or uncertain paths. Reuse applicable evidence for unaffected cases instead of repeating the entire exploration. Both passes judge the final state after their edits.

## Implementer

Produce the complete vertical behavior of the active slice.

Trace the real flow and callers before editing. Implement the accepted outcome, tests, migrations, interface changes, and supporting documentation that belong to the slice. Exercise the behavior through the narrowest faithful seam and cover material failure, authorization, malformed-input, migration, or state-preservation behavior when applicable.

After the proof is green, finish strategically: inspect change amplification, leaked implementation detail, duplicated policy, avoidable custom machinery, dishonest names or types, and failure behavior without a clear owner. Repair what the slice supports, then execute the applicable gates against the final state before handoff.

## Finisher

Start in a fresh context. The role combines independent quality review and direct repair; it is not a read-only Verifier.

Judge the accepted outcome against the repository and current slice diff before relying on the Implementer's explanation. Look for incomplete behavior, regressions, weak or tautological proof, missed callers, coding-standard violations, misplaced policy, shallow modules, boundary failures, and unnecessary machinery.

Repair every supported in-scope defect directly. Reinspect the resulting design when a repair changes its shape. If that repair materially reshapes a consequential seam or affects a sensitive boundary, flag the need for another fresh review rather than approving your own new design by default.

Even when no repair is necessary, independently execute the applicable slice gates. Return green only for the final state you actually inspected and validated.

## Integrated repair

Use this boundary only when a full-project gate or Product Validator exposes an in-scope defect after all slices are integrated. The failed accepted obligation and its observable evidence replace the active-slice boundary; do not invent or reopen a slice.

Setup failures and missing tooling follow [When validation cannot proceed](../SKILL.md#when-validation-cannot-proceed) before a repair is assigned.

Act as a Finisher. Repair only what is necessary to satisfy that obligation and protected behavior, even when the correct seam crosses code introduced by more than one slice. Run the affected focused tests, changed-code complexity check when configured, and other affected project gates. Return the repair for one focused commit; the orchestrator reruns every full-project or product check invalidated by the change.
