---
name: spike
description: "Run a bounded technical experiment when reading cannot settle feasibility, integration, performance, or tool behavior."
---

# Spike

Use for an empirical technical question. A spike is discovery-only, never a delivery phase.

## Process

1. State one observable question, why it affects the next decision, representative conditions, the observations that would validate or invalidate it, and a cost, time, or scope bound.
2. Before building, choose one disposition: delete after preserving the evidence, or retain only in an isolated discovery location excluded from production candidates.
3. Build the smallest runnable experiment that exercises the uncertainty. Include representative conditions and important failure cases.
4. Run it under the stated conditions. Capture actual commands, inputs, outputs, measurements, or failures. Investigate surprises only within the bound.
5. Return to the Coordinator the execution evidence, material surprises, one verdict of `Validated`, `Partial`, or `Invalidated`, production constraints, and a recommendation. Do not update the goal map, routing, or accepted decisions.

Any reuse, copying, or adaptation begins an explicit production promotion. It needs a Coordinator-recorded production slice, re-entry through the complete production delivery lifecycle, and does not inherit production status from the spike.

## Completion criteria

- The question, decision relevance, success observations, and bound are explicit.
- Actual execution covered representative conditions and relevant failure cases.
- The verdict is supported by captured execution evidence.
- The artifact has one explicit disposable disposition.
- Retention does not imply promotion, and reuse is identified as an explicit production promotion.
