# Delivery passes

Use these contracts when dispatching the two required write passes for one accepted slice or a bounded repair after integrated validation. Supply only the active assignment, the specification path, repository location, and any material current-state fact the actor cannot discover locally.

## Shared contract

- Work only in the current worktree and active assignment: one accepted slice, or an integrated repair explicitly dispatched after final validation. Preserve unrelated changes and the integrated results outside that boundary.
- Read the accepted slice or failed integrated obligation, applicable project instructions, coding standards, and executable gate configuration. Inspect the actual affected flow; do not treat another actor's summary as repository evidence.
- Apply the shared `strategic-programming` standard. At minimum, keep each policy at one clear seam, prefer deep modules and honest boundaries, use the least custom machinery that preserves accepted behavior and safety, and require proof that can disagree with the implementation.
- Resolve reversible implementation details locally. Return evidence that invalidates accepted behavior, a public contract, sensitive policy, or costly-to-reverse architecture instead of changing it silently.
- Own every supported defect within the accepted scope. Do not knowingly defer it to the next actor.
- If a failing gate or observed defect remains causally uncertain after direct inspection, establish a diagnosis under `diagnosing-bugs` before changing production code. Continue in the same pass when repair is already authorized; do not turn an obvious local cause into a formal debugging exercise.
- Run gates after the pass's final edit—or after review when no edit was needed. Both passes independently run applicable unit tests, the changed-code CRAP check with maximum `8` when configured, and any other affected project gate. Missing project tooling is reported, never invented.
- Keep the handoff concise: outcome, material design choice, files or seams changed, exact gate commands and results, and a precise blocker or residual risk when one remains. Do not create a ledger or progress file.

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

Act as a Finisher. Repair only what is necessary to satisfy that obligation and protected behavior, even when the correct seam crosses code introduced by more than one slice. Run the affected focused tests, changed-code complexity check when configured, and other affected project gates. Return the repair for one focused commit; the orchestrator reruns every full-project or product check invalidated by the change.
