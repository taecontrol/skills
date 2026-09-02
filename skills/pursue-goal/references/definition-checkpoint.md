# Design discovery

Use this inside the design phase when evidence is missing for a sound contract, decision, slice batch, isolation plan, or validation plan. Discovery answers bounded questions; it does not authorize production or accept human-owned decisions.

## Dispatch bounded questions

For each question, state why it matters, known constraints and accepted decisions, the evidence that can answer it, and a time, cost, or scope bound. Dispatch independent questions in parallel when they do not compete for the same environment or depend on each other's result.

Choose the capability that fits the uncertainty:

- `research` for repository or authoritative facts;
- `spike` for empirical feasibility, integration, performance, or tool behavior;
- `prototype` for product behavior, interaction, state, or UI comparison;
- `domain-modeling` for uncertain vocabulary, concept boundaries, and invariants;
- `architecture-design` for a costly-to-reverse seam or system shape;
- the design-only track of `ui-ux-design` for affected tasks, flows, states, accessibility, or visual direction;
- `diagnosing-bugs` for an observed failure whose mechanism is unknown;
- a named specialist for a bounded technology or risk question.

When available, use `javascript-react-patterns` for a bounded JavaScript or React design, composition, rendering, or performance choice. A costly-to-reverse seam still belongs to `architecture-design`; the pattern result is supporting evidence, not decision authority.

Require primary evidence, limits, surprises, a verdict, and a recommendation. Keep a durable artifact only when it remains useful after the decision. Prototypes, spike code, fixtures, and exploratory edits are disposable by default and must remain outside production candidates.

Completion criterion: each dispatch has one answerable question, a settling observation, a bound, an authority-safe capability, and an isolation disposition.

## Recompute the design frontier

Record each result in the goal map as evidence, not acceptance. From the new frontier:

- dispatch another discoverable question;
- bring every currently answerable material decision to the human through `grilling`;
- record a blocker with its owner and exact unblock condition; or
- when the complete design is coherent, return to collaborative design to define the entire slice batch.

Discovery may continue on independent settled branches while a human answer is pending. It must not silently settle a material decision, draft production code, start a slice, or accept a partial slice batch.

Any production use of a discovery artifact requires explicit inclusion in the accepted design and a named implementation slice. It then re-enters through the complete Slice Owner lifecycle without inheriting discovery status or evidence.

Completion criterion: every question has an evidence-backed disposition, the map records its effect on the design frontier, and the next design route is explicit.
