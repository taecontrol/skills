# Architecture arena

Use this protocol for every costly-to-reverse architecture decision, whether it changes one boundary or a whole system.

## Candidate brief

Give every candidate the same neutral brief: the question and bound, evidence and its limits, accepted constraints, protected behavior, resolved domain meaning and explicit assumptions, and the applicable validation paths. Do not disclose a preferred answer or the judge's scoring notes.

Dispatch at least two fresh candidates concurrently. Prefer different model families when the environment supports them. Each candidate must produce:

- realistic caller-first usage, including a meaningful failure;
- the proposed owners, public interfaces, data and control flow, and invariant placement;
- what complexity each consequential boundary hides;
- a validation path and unresolved risks;
- tradeoffs and at least one structurally different alternative it rejected.

For a narrow boundary, candidates still show its callers and neighboring obligations. For a system shape, they show enough end-to-end journeys to expose incompatible ownership or interactions. Types, signatures, sketches, and pseudocode are allowed; production implementation is not.

## Cross-judge

After the candidates finish, dispatch a fresh read-only judge that authored none of them. Give it every complete candidate, the shared grounding, and [design-quality.md](design-quality.md). The judge checks factual grounding, constraint coverage, caller usability, invariant ownership, depth, locality of likely changes, failure behavior, reversibility assumptions, and validation. It recommends a base and names useful grafts, rejections, contradictions, and unresolved ties. It does not decide by majority or prose quality.

## Synthesis

Read every candidate end to end and compare them against the same evidence and design-quality tests. Select the base that hides the most relevant complexity behind the smallest coherent surface without collapsing unrelated responsibilities. Graft only the strongest compatible ideas from losing candidates. Record the base, grafts, rejections, cross-judge verdict, disagreements, and remaining uncertainty.

Replace one failed or unusable candidate within the original bound. If two real candidates or a fresh judge remain unavailable, stop with `Inconclusive`; record the missing role rather than presenting a solo sketch as an arena result.
