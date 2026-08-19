# Adaptive discovery

Use this procedure when the current frontier contains a discoverable uncertainty: a repository fact, external fact, empirical feasibility, product behavior, state model, architecture choice, defect cause, or specialist risk that prevents a decision or judgeable vertical slice. It replaces a mandatory definition checkpoint.

## Bound one question

Create a dispatch with only the information needed to make exploration judgeable:

- the single question or uncertainty;
- why it blocks or could materially change the next decision;
- known constraints, accepted decisions, and evidence pointers;
- the observation, artifact, or verdict that will answer it; and
- an explicit cost, time, or scope bound when exploration could expand indefinitely.

Select a capability that matches the question: research for discoverable facts; a spike for empirical feasibility; a prototype for product, interaction, or state comparison; architecture design for consequential seams; diagnosis for an observed failure; or a domain-specific specialist for a named risk. Skills are selected capabilities, not permanent mandatory roles.

## Receive and route evidence

Require the specialist to return compact primary evidence, limits, surprises, a verdict, and a recommendation. Persist a durable artifact only when the result will remain useful after the question is settled. Update the goal map with the evidence and route change.

Then decide from the new frontier:

- another independent uncertainty remains: dispatch the next bounded discovery action;
- a human-owned material decision is now ready: return to Coordinator synchronization;
- a vertical slice is judgeable: synchronize its concise playback and enter production delivery;
- the evidence establishes a blocker: record its owner and exact unblock condition.

Discovery can iterate without predicting the remaining route. It may proceed while unrelated human decisions are pending, but it must not silently resolve a human-owned material decision.

## Keep discovery separate from production

Discovery code, fixtures, and prototypes are disposable by default. Preserve the question, evidence, verdict, and useful constraints; do not treat exploratory code as production. Promotion requires an explicit accepted decision and entry through the complete Implementer → Cleaner → Verifier → Product Validator lifecycle. Prior discovery evidence informs that lifecycle but never replaces its gates or independent judgment.

Completion criterion: the question has a bounded evidence-backed disposition, the map records its effect on the frontier, and the next route is discovery, synchronization, production delivery, or a concrete blocker.
