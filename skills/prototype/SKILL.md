---
name: prototype
description: "Build a disposable product, interaction, state-model, or UI experiment when intended behavior must be exercised or compared."
license: MIT
---

# Prototype

Use this discovery capability when the Coordinator needs evidence about how a product behavior, interaction, state model, or UI alternative works in use. It is not a delivery phase or an orchestrator.

## Choose the artifact from the question

Before building, establish:

- one design question;
- why it blocks or materially changes the next decision;
- known constraints, intended users, and relevant evidence;
- the actions and observations that will distinguish the alternatives or settle the question; and
- a cost, time, or scope bound.

Choose exactly one artifact disposition before building:

- **Delete:** delete the discovery artifact after preserving its question, evidence, verdict, and useful constraints.
- **Retain:** keep it only in an isolated discovery location explicitly excluded from every production candidate.

Use a state or logic artifact when actions and state transitions must be exercised. Use a visual artifact when the question concerns presentation, interaction, layout, or comparison. Keep only the behavior needed to make the question observable. Avoid production abstractions, persistence, error handling, and polish unless they are themselves under test.

## Exercise the prototype

1. Build a runnable, clearly discovery-only artifact that a relevant reviewer can exercise.
2. Surface the state, result, or alternative after each material action.
3. Exercise representative actions and important edge or failure states. Capture the observed results.
4. For a visual artifact, render the exact artifact in its intended runtime before presentation. Inspect the rendered result, including each presented variant or state, and capture rendered evidence such as screenshots or a reproducible render record. Source inspection, static markup, or an uninspected build is not rendered verification.
5. Return a compact verdict and the decision-relevant evidence.

Return this shape to the Coordinator:

```text
Question: <design question>
Artifact and exercise: <what was exercised, by whom, and under which states>
Evidence: <observations and pointers; rendered evidence for visual artifacts>
Verdict: <supported answer or comparison>
Limits: <what the prototype does not establish>
Recommendation: <next decision or capability>
Disposition: Delete | Retain at <isolated discovery location excluded from every production candidate>
```

Preserve the question, evidence, verdict, and useful constraints under either disposition. Any reuse of a prototype artifact, including copying or adapting its code, begins a Coordinator-recorded production slice. Do not silently treat a prototype as production. That slice follows complete production delivery, including applicable production implementation, gates, independent verification, and product validation. If promotion or reuse would make a material decision, it requires explicit human acceptance before the production slice begins. Prototype evidence may inform that delivery but cannot replace it.

## Completion criteria

A prototype is complete only when all of the following are true:

- The question, decision relevance, observations that settle it, and exploration bound are explicit.
- The artifact shape matches the question, and material state or alternatives are observable after exercise.
- Representative actions and important edge or failure states produced captured observations.
- Every visual artifact was actually rendered and inspected before presentation, with rendered evidence for every presented variant or state.
- The result separates evidence, verdict, limits, and recommendation.
- The artifact has exactly one explicit disposition: delete after evidence is preserved, or retain in an isolated discovery location explicitly excluded from every production candidate.
- Any reuse is identified as the start of a Coordinator-recorded production slice; no promotion is implied by retention.
- A promotion or reuse that makes a material decision has explicit human acceptance before the production slice begins.

## Provenance

- Canonical package: `prototype`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/engineering/prototype/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates and restructures the upstream prototype procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: material Factory integration adaptation.
- Taecontrol changes: makes the capability Coordinator-selected; bounds it by a decision question and observable exercise; requires compact verdicts and evidence; requires actual rendered inspection before presenting visual artifacts; and replaces upstream retention and implementation handling with disposable-code and explicit full-production-promotion rules.
