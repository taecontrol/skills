---
name: grilling
description: "Interview a human about material decisions with complete numbered design-tree frontier rounds."
license: MIT
---

# Grilling

Use this skill when a human must make material decisions about a plan, product, interface, scope, risk, or expensive-to-reverse architecture. The human owns those decisions. Resolve discoverable facts through available evidence or research instead of asking the human to find them.

At dispatch, name one **acceptance scope**: either the current material decision set or a proposed vertical slice. Ask and accept decisions only within that scope. A **frontier** is every unresolved in-scope decision whose prerequisites are settled.

Model the in-scope decision space as a **design tree**. Each decision branches into the decisions that depend on it.

## Run frontier rounds

1. State the acceptance scope, then build or update its design tree from the goal, accepted decisions, known constraints, and evidence.
2. Separate facts from decisions. Investigate facts that can be discovered without the human. A fact still under investigation is an unsettled prerequisite only for its dependent branch; it does not delay independent frontier questions.
3. Ask the complete current in-scope frontier in one numbered round. Do not reduce the round to one question when other independent in-scope frontier decisions are answerable.
4. Use the human's active language. Keep wording concise, and define a technical or project-specific term before relying on it. Give a recommended answer and its principal consequence for every question. Use this format:

   ```text
   Q1. <decision title>
   <question and the information needed to choose>

   Recommendation: <recommended answer>
   Consequence: <principal trade-off or effect>
   ```

5. Wait for the human's answers. Do not silently answer a human-owned decision. Independent discovery may continue while waiting.
6. Record each answer, rationale, and remaining uncertainty. Recompute the in-scope tree and ask the next complete frontier. A question that depends on another question still open in the same round belongs to a later round.
7. When the in-scope frontier is empty, present one short, complete playback for that acceptance scope: the intended outcome, accepted decisions and rationale, boundaries, protected behavior or risk, and the observable proof of success. Ask for acceptance before acting on the result.
8. After acceptance, return an ephemeral agent-facing decision handoff with the same material decisions, rationale, boundaries, and unresolved facts. It must add no material assumption. Persist it only when the Coordinator explicitly delegates that write with a named destination and current map identity; otherwise the Coordinator remains the sole durable owner. The surrounding workflow decides what work acceptance authorizes.

When the user asks for clarification or clearly signals that a round or playback did not land, pause its dependent communication or decision thread and invoke the communication-recovery capability in the user's active language. Otherwise wait for the answer or ask one bounded clarification. Do not replace the complete-frontier experiment with a one-question interview.

## Completion criteria

This skill is complete only when all of the following are true:

- The dispatch named one acceptance scope: the current material decision set or a proposed vertical slice.
- Every human-owned decision within that scope whose prerequisites are settled was included in exactly one current numbered frontier round.
- Every question had a recommendation and principal consequence.
- Discoverable facts were investigated rather than delegated to the human as research work.
- No decision that depends on an unresolved prerequisite was asked early or decided silently.
- The in-scope frontier is empty, the human accepted one concise complete playback for that scope, and the ephemeral decision handoff matches that playback without new material assumptions; any durable write has explicit Coordinator delegation, destination, and map identity.

## Provenance

- Canonical package: `grilling`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/productivity/grilling/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates a substantial portion of the upstream procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: material adaptation with frontier behavior preserved.
- Taecontrol changes: integrates the procedure with human-owned material decisions; preserves complete numbered frontier rounds; adds the recommendation consequence, bounded independent discovery, concise acceptance playback, and agent-facing accepted-decision record; treats unresolved facts as discovery prerequisites; provides re-explanation as communication recovery rather than a changed batching policy.
