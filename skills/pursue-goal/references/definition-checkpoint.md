# Design discovery

Use this inside Design when evidence is missing for a sound SPEC, decision, SLICES batch, isolation plan, or validation plan. Discovery answers bounded questions; it does not authorize production or accept human-owned decisions.

## Dispatch bounded questions

For each question, state why it matters, known constraints and accepted decisions, the evidence that can answer it, and a time, cost, or scope bound. Dispatch independent questions in parallel when they do not compete for the same environment or depend on each other's result. Until mutable outputs are mapped, run commands that install, build, generate, cache, migrate, or write reports serially inside one workspace. Parallelize only work proven read-only or isolated by an explicit output lease.

Choose the capability that fits the uncertainty:

- `research` for repository or authoritative facts;
- `how` for how an existing subsystem works before changing it;
- `why` for the forces that shaped existing code or thresholds;
- `teach` when the human must understand something before they can decide;
- `spike` for empirical feasibility, integration, performance, or tool behavior;
- `prototype` for product behavior, interaction, state, or UI comparison;
- `domain-modeling` for uncertain vocabulary, concept boundaries, and invariants;
- `architect` for a non-trivial system or module shape (multi-agent sketch, human Agree, no implementation);
- `architecture-design` for one costly-to-reverse seam when a full architect pass is unnecessary;
- `diagnosing-bugs` for an observed failure whose mechanism is unknown;
- a named specialist for a bounded technology or risk question.

When available, use `javascript-react-patterns` for a bounded JavaScript or React design, composition, rendering, or performance choice. A costly-to-reverse seam still belongs to `architecture-design` or `architect`; the pattern result is supporting evidence, not decision authority.

Require primary evidence, limits, surprises, a verdict, and a recommendation. Keep a durable artifact only when it remains useful after the decision. Prototypes, spike code, fixtures, and exploratory edits are disposable by default and must remain outside production candidates.

Stop when the bound is reached. Return `Inconclusive` with the missing observation rather than expanding into harness or product work. Harness, measurement, or verification-adapter work during Design is allowed only as a short bound pilot to name a SPEC gate, or when the SPEC outcome itself is that capability.

Completion criterion: each dispatch has one answerable question, a settling observation, a bound, an authority-safe capability, and an isolation disposition.

## Recompute the design frontier

Record each result in the goal map as evidence, not acceptance. Explain material findings to the human in plain language when they change options. From the new frontier:

- dispatch another discoverable question;
- bring every currently answerable material decision to the human through `grilling`;
- record a blocker with its owner and exact unblock condition; or
- when the SPEC is coherent, return to collaborative design to write or finalize `SPEC.md` and then derive `SLICES.md`.

Discovery may continue on independent settled branches while a human answer is pending. It must not silently settle a material decision, draft production code, start a slice, or accept a partial SLICES batch.

Any production use of a discovery artifact requires explicit inclusion in the accepted SPEC and a named implementation slice. It then re-enters through the complete Slice Owner lifecycle without inheriting discovery status or evidence.

Completion criterion: every question has an evidence-backed disposition, the map records its effect on the design frontier, and the next design route is explicit.
