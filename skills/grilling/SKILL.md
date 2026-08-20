---
name: grilling
description: "Interview a human about material decisions through complete, scoped frontier rounds."
---

# Grilling

Use for material decisions about a plan, product, interface, scope, risk, or costly-to-reverse architecture. The human makes those decisions. Research facts that can be discovered without them.

## Process

1. Name one acceptance scope: the current decision set or a proposed vertical slice. Map its unresolved decisions and their prerequisites.
2. Separate facts from decisions. Investigate discoverable facts. A pending fact blocks only decisions that depend on it.
3. Ask every settled, in-scope frontier decision in one numbered round. For each, use the human's language, define needed terms, recommend an answer, and state its main consequence.
4. Record answers and rationale. Recompute the frontier. Ask dependent decisions only after their prerequisites are settled.
5. When the frontier is empty, play back the outcome, accepted decisions and rationale, boundaries, protected behavior or risk, and observable proof of success. Get the human's acceptance.
6. Give an ephemeral decision handoff that matches the accepted playback. Persist it only with explicit Coordinator delegation, a destination, and map identity.

Until acceptance, do not execute the scoped slice or decide an unresolved human-owned material decision. Independent discovery may continue only on settled branches.

If the user asks for clarification or says the round did not land, use wait-what in the user's active language before continuing that thread.

## Completion criteria

- One acceptance scope was named.
- Each human-owned decision entered exactly one frontier round after its prerequisites were settled.
- Every question included a recommendation and main consequence.
- Discoverable facts were researched rather than assigned to the human.
- The human accepted a complete playback, and any handoff adds no material assumption.
