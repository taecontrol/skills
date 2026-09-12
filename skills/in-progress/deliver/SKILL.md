---
name: deliver
description: "Execute an accepted implementation specification sequentially in the current worktree through implementation, fresh quality repair, technical gates, and final product validation. Use explicitly to deliver already-settled software design; do not use to design the solution or manage parallel worktrees."
disable-model-invocation: true
---

# Deliver

Turn one accepted implementation specification into integrated, validated code. Coordinate the work; do not redesign it or maintain a second execution system.

## Start from accepted work

1. Resolve the specification from a user-supplied path, then an established local-work convention. Require `Status: Accepted`, an applicable repository revision, ordered slices, and a validation contract. Stop with the exact missing input when the document is absent, still a draft, or materially stale.
2. Inspect the current worktree, Git status and history, applicable agent instructions, coding standards, and executable gate configuration. Preserve unrelated user changes. Do not create or switch branches or worktrees.
3. Determine the next unfinished slice from the ordered specification and Git evidence. If prior work cannot be mapped safely, ask one focused resynchronization question rather than inventing execution state.
4. Read [references/passes.md](references/passes.md), then execute exactly one slice at a time. Never dispatch slices in parallel.

## Complete a slice

Dispatch a fresh Implementer with the specification path, the one active slice, the current worktree, and the Implementer contract. It owns the complete vertical outcome, its strategic finish, and its gates. Do not advance from a known failing handoff.

After the Implementer's green handoff, dispatch a different fresh Finisher with the same accepted inputs and the Finisher contract. The Finisher independently inspects the slice and repository state, repairs supported in-scope defects directly, and runs its own applicable gates against its final result. The Implementer's evidence is context for diagnosis, never a substitute for the Finisher's validation.

Allow either actor to diagnose and repair ordinary in-scope failures without a fixed retry count or role ceremony. Stop when evidence invalidates an accepted outcome, public contract, sensitive policy, costly-to-reverse design, or other authority boundary. Name the exact decision that must be resynchronized.

Use another fresh read-only review only when a Finisher repair materially reshapes the design it first inspected, touches a sensitive boundary, or leaves uncertainty another perspective could settle. This is a risk response, not a default third pass.

When the Finisher is green, inspect that the resulting diff belongs to the active slice and preserves unrelated work. Create one focused local commit following the repository's commit convention, staging only the slice. Do not amend or rewrite existing commits unless the user separately requests it. Then select the next slice.

## Validate the integrated result

After all slices are committed:

- run the full-project technical gates required by the accepted specification and executable project configuration, including the full-project CRAP maximum of `8` only when its tool and command are configured;
- dispatch a fresh read-only Product Validator under the `product-validation` contract to exercise the representative journey defined by the specification through the real product interface and report observable evidence;
- route an in-scope defect to a fresh Finisher under the integrated-repair contract, run the affected gates, and create a focused repair commit; then rerun invalidated full-project and product evidence;
- resynchronize instead of repairing when a finding changes accepted behavior, scope, public contracts, sensitive policy, or costly-to-reverse architecture.

Technical gates do not replace product validation, and product validation does not waive technical failures.

Once all accepted evidence is green, confirm that durable knowledge has an existing maintained owner in code, tests, documentation, an ADR, or the domain glossary. Do not create durable documents as an incidental cleanup step. Delete the implementation specification only when its accepted contract identifies it as temporary and authorizes retirement after delivery; otherwise preserve it and report why. Report the delivered commits, gates, product evidence, omissions, and any accepted residual risk.

## Boundaries

- Do not create goal maps, execution ledgers, candidate identifiers, progress files, child worktrees, or parallel scheduling.
- Do not modify the accepted specification to record progress or results.
- Do not add work outside a slice because it seems useful; only repair defects necessary to satisfy accepted work or protected behavior.
- Never stage or commit unrelated changes. If active work cannot be separated safely from unrelated changes in the same file, stop and ask rather than committing mixed work.
- Do not push, publish a pull request, deploy, mutate production, spend money, or perform another external effect without separate authority.
- Keep the Product Validator read-only. A code change always returns to a finishing pass and invalidates the evidence affected by that change.

## Completion criteria

Every slice exists as one coherent local commit after independent Implementer and Finisher gate runs; the integrated repository passes its accepted full-project gates; a fresh Product Validator has proven the representative journey; the specification's accepted retirement contract has been honored; and no known in-scope defect or unresolved authority boundary remains.
