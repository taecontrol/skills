---
name: architect
description: "Design a costly-to-reverse technical boundary, ownership model, or system shape when implementation would otherwise lock an unsettled architecture decision. Leave routine, local, and safely reversible choices to implementation."
---

# Architect

Own one costly-to-reverse design question from grounding through human agreement. Hide the choice of semantic, narrow-boundary, or system-wide procedure from the user. Produce a technical shape the human can accept, not production implementation.

## Process

1. **Gate and bound.** State the question, why the answer would be costly to reverse, the decision it blocks, accepted constraints, protected behavior, and a time, cost, or scope bound. If evidence already determines the answer or the choice is safely reversible, return `No-architecture-decision` with the evidence and next handoff, then stop. If a material observation cannot be obtained within the bound, return `Inconclusive`. Once the gate passes, choose and announce the final deliverable location: a user-supplied path, the repository's canonical design artifact, or `docs/design/<decision-slug>.md`.
2. **Ground.** Inspect the present behavior, relevant history and rationale, accepted decisions, project conventions, and validation paths for every system the proposed shape touches. Separate observation, accepted meaning, proposed meaning, inference, and unknowns. Gather missing empirical evidence through bounded observation or a disposable experiment; an untested proposal is not evidence.
3. **Require settled domain meaning.** Before arena, ensure every term, relationship, or invariant that could materially change the alternatives has accepted meaning. Treat canonical definitions as evidence. If a blocking ambiguity remains, return `Inconclusive` with the exact unresolved semantic decision. Carry only non-blocking uncertainty as explicit assumptions.
4. **Choose depth internally.** For a narrow boundary, show the owner, its public interface, immediate callers, and affected neighboring obligations while leaving unrelated structure fixed. For a system shape, show enough owners and end-to-end journeys to prove the boundaries work together. Small scope does not make an irreversible decision reversible.
5. **Run the arena.** Read [arena.md](references/arena.md) and [design-quality.md](references/design-quality.md). Dispatch at least two fresh, independent candidates with the same grounded brief, then a fresh cross-judge. Require structurally distinct shapes, not cosmetic variations. Read every candidate, choose a base from evidence rather than votes, and graft only ideas that preserve one coherent design. If two usable candidates and an independent judge cannot run, return `Inconclusive` instead of silently weakening the process.
6. **Synthesize.** Read [deliverable.md](references/deliverable.md). Build one proposed decision package containing the question and bound; evidence and limits; accepted domain meaning and bounded assumptions; caller-first usage; owners, interfaces, data and control flow; complexity hidden by each consequential boundary; alternatives and tradeoffs; synthesis decision; open risks; and validation path. Keep reversible implementation choices unset and keep this proposed synthesis temporary until agreement.
7. **Agree.** Explain the package in plain language so the human need not read candidate artifacts. Show what callers do, what each boundary owns and hides, what lost and why, and what remains uncertain. Pause for explicit agreement. Treat pushback as new evidence: re-bound and rerun the affected work rather than patching an obsolete shape.
8. **Materialize and stop.** After agreement, incorporate the accepted feedback and write one implementation-lifetime Markdown brief with status `Accepted`. If the repository intentionally maintains a canonical architecture artifact, update only its architecture section instead of creating a competing source of truth. Otherwise, keep the brief as a temporary implementation input. Return the exact path or path and heading that implementation must consume, name any accepted rationale likely to remain invisible after implementation as an ADR candidate, then stop without beginning implementation or creating another artifact.

## Authority and boundaries

- Investigate, propose, and synthesize; the human accepts material domain meaning and architecture.
- Do not modify production code or start implementation. Persist the final design only after the relevant human agreement; writing the accepted implementation brief is part of this skill's required result.
- Do not manufacture architecture to justify the invocation. Report settled, reversible, or out-of-scope questions directly.
- Keep candidate and judge work temporary. Preserve only the accepted synthesis for implementation; do not treat it as permanent architecture documentation by default.

## Outcomes

- `No-architecture-decision`: evidence settles the question, or the remaining choice is reversible; state why and hand it back without designing further.
- `Agree-ready`: the proposed decision package is complete enough to accept but has not been persisted as an accepted design.
- `Agreed`: the accepted design has been materialized and its exact implementation-facing location is known.
- `Inconclusive`: name the reached bound, evidence gathered, missing observation or arena role, and the safest next step.

## Completion criteria

The user can accept or reject one grounded shape from the caller's point of view; every material invariant has an owner, every consequential boundary hides identifiable complexity, alternatives received independent comparison, uncertainty remains explicit, and no implementation began. An `Agreed` outcome also has one accepted implementation brief whose exact location, obligations, and expected retirement point are recoverable without conversation history.
