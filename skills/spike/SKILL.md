---
name: spike
description: "Run a bounded technical experiment when feasibility, integration, performance, or tool behavior cannot be settled by reading."
license: MIT
---

# Spike

Use this discovery capability when the Coordinator needs empirical evidence about a technical feasibility, integration, performance, or tool-behavior question that research cannot settle. It is not a delivery phase or an orchestrator.

## Bound the experiment

Before writing code, establish:

- one observable question;
- why it blocks or materially changes the next decision;
- representative conditions, relevant constraints, and known evidence;
- the observation that would validate, partially validate, or invalidate the hypothesis; and
- a cost, time, or scope bound.

Choose exactly one artifact disposition before building:

- **Delete:** delete the discovery artifact after preserving its question, execution evidence, verdict, and useful constraints.
- **Retain:** keep it only in an isolated discovery location explicitly excluded from every production candidate.

Choose the smallest runnable experiment that exercises the uncertainty. Include representative conditions and important failure cases; a happy-path-only run does not settle the question.

## Execute and judge

1. Build only the scaffolding needed to exercise the question. Mark the artifact clearly as discovery-only.
2. Run the experiment under the stated conditions. Capture actual commands, inputs, outputs, measurements, or failures that support the result.
3. Investigate surprises that could change the verdict while remaining inside the bound.
4. Judge the evidence with exactly one verdict: `Validated`, `Partial`, or `Invalidated`.
5. State the production constraints and recommended next decision or capability.

Return a compact result to the Coordinator:

```text
Question: <observable question>
Experiment: <conditions and bounded method>
Evidence: <actual execution result and pointer>
Verdict: Validated | Partial | Invalidated
Constraints: <production-relevant limits>
Recommendation: <next decision or capability>
Disposition: Delete | Retain at <isolated discovery location excluded from every production candidate>
```

Preserve the question, execution evidence, verdict, and useful constraints under either disposition. Any reuse of a spike artifact, including copying or adapting its code, begins a Coordinator-recorded production slice. Do not silently treat a spike as production. That slice follows complete production delivery, including applicable production implementation, gates, independent verification, and product validation. Prior spike evidence informs that work but does not replace it.

## Completion criteria

A spike is complete only when all of the following are true:

- The empirical question, decision relevance, success observations, and exploration bound are explicit.
- The experiment exercised representative conditions and relevant failure cases.
- The verdict is supported by actual execution evidence, not an unrun implementation or a source-code reading.
- The result contains one allowed verdict, production constraints, and a recommendation.
- The artifact has exactly one explicit disposition: delete after evidence is preserved, or retain in an isolated discovery location explicitly excluded from every production candidate.
- Any reuse is identified as the start of a Coordinator-recorded production slice; no promotion is implied by retention.

## Provenance

- Canonical package: `spike`.
- Upstream baseline: no distributable upstream baseline.
- Incorporation mode: Taecontrol-authored; no external text incorporated.
- Taecontrol changes: defines a Coordinator-selected bounded technical experiment with execution evidence, compact verdicts, representative and failure-case coverage, and explicit disposable-code and production-promotion boundaries.
