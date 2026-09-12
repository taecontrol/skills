# Accepted architecture deliverable

The final deliverable is the implementation-facing source of truth for one accepted architecture decision. Candidate sketches and judge notes are working material; consolidate their useful evidence here rather than preserving parallel design authorities.

## Location and identity

Choose the destination in this order:

1. A path supplied by the user.
2. An established canonical architecture or design artifact in the repository. Update its architecture section and return `path#heading` when the file owns more than this decision.
3. `docs/design/<decision-slug>.md`.

Avoid creating a standalone file when an existing artifact already owns the implementation contract. Record `Status: Accepted`, the acceptance date, and the relevant repository revision or product version so later work can detect stale grounding. Never mark a proposal accepted without explicit human agreement.

## Required content

Keep the document compact, but include every item that changes implementation:

1. **Problem and scope.** The decision, bound, protected behavior, and what remains outside it.
2. **Grounding.** Decisive evidence, accepted constraints, evidence limits, and the revision or version inspected.
3. **Domain meaning.** Accepted terms and invariants, references to canonical definitions when they exist, and explicitly bounded assumptions. Do not duplicate canonical definitions or present proposed meaning as accepted.
4. **Caller usage.** Realistic normal and failure examples showing the public contract before internal structure.
5. **Architecture shape.** Owners, interfaces, data and control flow, dependencies, and where each invariant and failure responsibility lives.
6. **Hidden complexity.** For each consequential boundary, the policy or mechanism it hides and the caller decisions it removes.
7. **Alternatives and tradeoffs.** The real alternatives considered, why they lost, and costs accepted by the chosen shape.
8. **Synthesis provenance.** Candidate base, compatible grafts, rejections, cross-judge verdict, and any unresolved disagreement.
9. **Implementation contract.** Material decisions implementation must preserve, reversible choices it may make, validation obligations, and evidence that requires design re-entry.
10. **Open risks.** Remaining non-blocking uncertainty and how later work will observe or contain it.

## Handoff discipline

Return the exact accepted location and state that downstream implementation must read it before changing production code. Treat its material decisions as constraints and its explicitly reversible choices as implementation freedom. If implementation discovers evidence that invalidates the accepted shape, stop the affected work and return to design; neither diverge silently nor rewrite the accepted decision as though it had always said something else.

Do not add slice plans, task breakdowns, estimates, or unrelated product requirements unless the repository's canonical artifact combines those concerns. The architecture deliverable defines the implementable shape and its obligations; planning may reference it without duplicating it.
