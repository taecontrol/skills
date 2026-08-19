---
name: research
description: "Investigate a bounded question from authoritative sources when reading can settle the next decision."
license: MIT
---

# Research

Use this discovery capability only when the Coordinator has a question that can be settled by inspecting sources rather than building an experiment. It is not a delivery phase or an orchestration procedure.

## Bound the inquiry

Before reading, establish:

- the one question;
- why its answer blocks or materially changes the next decision;
- known constraints and evidence;
- the observation or conclusion that will settle it; and
- a time, source, or scope bound when the inquiry could expand.

If a source cannot answer the question, return that limit so the Coordinator can select another capability.

## Investigate

1. Start with the source that owns the relevant fact: official documentation, specifications, source code, first-party APIs, or the repository itself.
2. Use secondary material only to locate or interpret an authoritative source. Label it as secondary; do not let it carry an unsupported claim.
3. Record each material finding with a source pointer precise enough to check it. Separate direct evidence from inference.
4. Check important constraints, versions, and exceptions that could reverse the conclusion.
5. Stop when the settled evidence answers the bounded question or the stated bound is reached.

## Return evidence

Return a compact result to the Coordinator:

```text
Question: <question>
Evidence: <finding — source pointer> …
Limits or uncertainty: <what evidence does not establish>
Verdict: <answer supported by the evidence>
Recommendation: <next decision or capability>
```

Persist a Markdown report only when the findings will remain useful after the immediate decision, such as when they support a consequential accepted decision, avoid repeated costly investigation, or provide durable recovery context. Discover the repository convention before writing it. For a short-lived lookup, return the compact result without creating an artifact.

## Completion criteria

Research is complete only when all of the following are true:

- One bounded question and its decision relevance are explicit.
- Every material claim is linked to an authoritative source or marked as an inference or uncertainty.
- Relevant version, constraint, or exception evidence was checked when it could change the verdict.
- The result separates evidence, limits, verdict, and recommendation.
- Any persisted report meets the durable-use test and follows the discovered repository convention; otherwise no report was created.

## Provenance

- Canonical package: `research`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/engineering/research/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates and restructures the upstream research procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: material artifact-policy adaptation.
- Taecontrol changes: makes research a Coordinator-selected discovery capability; requires a bounded decision question and settling evidence; separates evidence from inference and uncertainty; returns a compact verdict; and persists a report only when durable under a discovered repository convention.
