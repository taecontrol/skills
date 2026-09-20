# Accepted architecture implementation brief

The final brief is the implementation-facing source of truth for one accepted architecture decision until implementation and verification transfer its live information to code, tests, and maintained documentation. It is not permanent architecture documentation by default. Candidate sketches and judge notes are working material; consolidate their useful evidence here rather than preserving parallel design authorities.

## Location and identity

Choose the destination in this order:

1. A path supplied by the user.
2. An established design-work location in the repository. When the repository intentionally maintains a canonical architecture artifact after implementation, update its architecture section and return `path#heading` when the file owns more than this decision.
3. `docs/design/<decision-slug>.md`.

Avoid creating a standalone file when an existing artifact already owns the implementation contract. Otherwise, treat the standalone brief as eligible for retirement after implementation and verification. Record `Status: Accepted`, the acceptance date, and the relevant repository revision or product version so later work can detect stale grounding. Never mark a proposal accepted without explicit human agreement.

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

Do not add slice plans, task breakdowns, estimates, or unrelated product requirements unless the repository's canonical artifact combines those concerns. The architecture brief defines the implementable shape and its obligations; planning may reference it without duplicating it.

## Lifecycle and durable residue

Keep the brief through implementation and independent verification. At closeout, give each piece of information that must remain one maintained owner:

- code and tests own implemented behavior, structure, and invariants they make observable;
- maintained product, API, or operational documentation owns contracts people still need to consult;
- the canonical glossary owns accepted domain vocabulary;
- an ADR may own the rationale, tradeoff, or constraint behind a consequential decision when those remain important but are not recoverable from the other maintained artifacts.

Name an `ADR candidate` only when that rationale is likely to disappear with the brief. Do not create the ADR from this skill or make one a routine requirement for every accepted design.

Once implementation and verification are complete and every still-relevant item has a maintained owner, a standalone brief may be deleted. This skill never performs that deletion because it stops before implementation. No lasting artifact should rely exclusively on a brief intended for retirement. When the repository deliberately maintains architecture documentation, reconcile the implemented result into that canonical artifact instead.
