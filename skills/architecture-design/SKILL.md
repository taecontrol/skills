---
name: architecture-design
description: "Develop evidence-backed alternatives for an expensive-to-reverse architecture question and return its decision frontier to the Coordinator."
---

# Architecture design

Explore one expensive-to-reverse architecture question when current evidence cannot settle it. Return a proposed decision frontier to the Coordinator. Do not edit production code, accept a decision, or create an ADR.

## Process

1. Bound one question. State why evidence cannot settle it, which decision it blocks or changes, accepted constraints and protected behavior, useful observations, and a time, cost, or scope limit. Inspect relevant code, accepted decisions, rationale, project conventions, and validation paths. Treat conflicts with accepted decisions as evidence.
2. Build evidence-backed alternatives. For each affected module, name its interface obligations, seam, and expected leverage and locality. Keep uncertain domain terms proposed rather than assumed, and test them with ordinary, edge, and failure scenarios.
3. Resolve empirical uncertainty with bounded research, spike, or prototype work when inspection cannot answer it. Carry evidence and limits forward. Do not call an unrun proposal evidence.
4. Compare at least two real alternatives. If evidence leaves one, name the eliminated alternatives and why. Cover only applicable concerns: invariant ownership, dependencies, data and persistence, failure behavior, concurrency, recovery, security, and validation.
5. Separate reversible implementation choices from material decisions. Leave reversible choices for a later accepted delivery slice.

## Return

Return exactly one outcome:

- `Frontier-ready`: question and bound; evidence and limits; real alternatives with benefits, costs, and risks; proposed decision frontier with recommendations and consequences; remaining uncertainty; validation path; and next Coordinator route.
- `Inconclusive`: evidence gathered, reached bound, missing observation, and recommended Coordinator route. Do not claim a decision frontier is ready.

Done means one branch is complete. `Frontier-ready` has evidence-backed real alternatives. `Inconclusive` names the missing evidence without overrunning the bound or fabricating alternatives. Accepted realization belongs to a production vertical slice.
