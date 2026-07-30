# Discovery Ticket Profiles

Load this reference only for Code Archaeology, Research, or Technical Spike.

## Shared investigation strategy

Choose the cheapest shape that can produce defensible confidence:

1. Use one owner with an explicit coverage map for bounded work.
2. Partition evidence among subagents only when domains can be scoped independently and synthesized without rereading the same corpus.
3. Add an adversarial reviewer when breadth, uncertainty, consequence, or known blind spots make an omission material.
4. Give that reviewer the objective, raw evidence, and coverage map; ask it to attack gaps and unsupported conclusions rather than repeat the investigation.

Record why the chosen shape is sufficient. More agents are not evidence by themselves.

## Code Archaeology

**Kind / Type:** `Discovery / code-archaeology`

Build a deep, evidence-backed map of the current system so Mission Control can decide what to do next. Trace relevant entry points, responsibility boundaries, state and data flows, integrations, tests, configuration, documentation, and recent history when it affects current truth. Follow important behavior end to end instead of listing files.

Work independently by default. Checkpoint when the evidence reveals materially different scope, contradictory product intent, missing access, or a decision that changes what must be mapped.

Use independently scoped subagents or an adversarial completeness review for a broad or high-consequence map. Return:

- a plain-language explanation of where the system stands;
- an evidence-linked technical map;
- confirmed facts, contradictions, risks, and fog;
- confidence and coverage limits; and
- justified next tickets.

Completion criterion: every in-scope subsystem and end-to-end flow is accounted for by evidence or named explicitly as a coverage gap. Product code remains unchanged.

## Research

**Kind / Type:** `Discovery / research`

Investigate an external system, documented behavior, philosophy, design, standard, or practice. Search current external sources. Prefer primary authority; record publication or version dates, source reliability, conflicts, and inference. Triangulate material claims when no single source is sufficient.

Work independently by default. Interview Mission Control when different interpretations would answer different questions or when a discovered trade-off changes the decision being supported. Add an adversarial reviewer for contradictory evidence, consequential decisions, or broad synthesis with material coverage risk.

Completion criterion: every material conclusion traces to a current, reliable source or is labeled as inference; contradictions, confidence, remaining questions, practical meaning, and next tickets are explicit.

## Technical Spike

**Kind / Type:** `Discovery / technical-spike`

Time-box an experiment that tests technical viability. State the hypothesis, feasibility threshold, constraints, smallest useful experiment, measurements, and stop condition before work.

Return `viable`, `conditionally viable`, `not viable`, or `inconclusive` with reproducible evidence, limits, operational risks, and the remaining production work. Treat experimental code as evidence, not a production candidate; a later Implementation ticket must explicitly adopt and harden it.

Completion criterion: the hypothesis has a reproducible verdict against its predefined threshold, and every untested production risk is named.
