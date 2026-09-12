---
name: research
description: Investigate a bounded question against high-trust primary sources through parallel independent research, then produce a cross-checked Markdown report. Use when a topic needs documented research rather than a quick factual lookup.
---

# Research

Investigate one bounded question through independent source work and publish one cited Markdown report. Use existing evidence; do not create new empirical evidence by building, benchmarking, or testing a proposed solution.

## Process

1. **Frame.** State the question, relevant context, exclusions, applicable dates or versions, and a source, time, or scope bound. Choose the report path in this order: a path supplied by the user, an existing repository convention, or a sensible Markdown location that you name before dispatch.
2. **Investigate independently.** Dispatch two fresh background agents concurrently with the same neutral brief, bound, and output requirements. Neither researcher sees the other's work. Each follows material claims to primary sources, checks contrary evidence and relevant exceptions, and returns a draft with claim-level citations, inferences, limitations, and unresolved questions. Do not let researchers create their own research teams.
3. **Judge the evidence.** After both drafts are complete, dispatch a fresh agent that authored neither draft. Give the judge the question, both complete drafts, and access to their cited sources. The judge checks the sources behind decisive or disputed claims, distinguishes independent corroboration from repeated use of one source, resolves disagreements when the evidence permits, and writes a new synthesis from the strongest supported findings. It may reject both conclusions or preserve an unresolved disagreement; it must not decide by vote or prose quality.
4. **Handle an incomplete run.** If a researcher fails or returns unusable work, replace it once within the original bound. If two substantive drafts or a fresh judge remain unavailable, do not present the result as independently synthesized. Preserve usable material only in a report clearly marked `Incomplete`, naming the missing role and unresolved validation.
5. **Publish.** Have the judge write the final report to the chosen path. Keep researcher drafts temporary unless the user asks to retain them. Verify that the report answers the framed question, cites every material factual claim, describes material uncertainty honestly, and records any curtailed work. Return the report path and a one-sentence answer to the user.

## Evidence rules

- Base material factual claims on sources that own the fact: official documentation, specifications, maintained source code, first-party APIs or data, standards, and original research. Secondary sources may help locate primary evidence but do not replace it silently.
- Put a direct, checkable citation next to each material claim. Use stable URLs, document sections, or repository paths with revisions and line numbers when available.
- Confirm that each cited source was inspected and supports the claim for the stated date, version, configuration, or jurisdiction.
- Separate established findings, inference, and unresolved uncertainty. Do not turn researcher agreement into evidence, especially when both rely on the same underlying source.
- Prefer a qualified or inconclusive answer over unsupported certainty. Do not invent numerical confidence scores.

## Final report

The report contains:

- the question, context, scope, bound, and applicable date or version;
- a direct answer with any material qualification;
- synthesized findings with claim-level citations;
- contrary evidence, disagreements, and how they were resolved;
- limitations, inferences, and unresolved uncertainty;
- a conclusion and practical implications;
- a short method note covering completed roles, shared-source dependence, replacements, and curtailed work;
- a source list.

The final report is the only durable deliverable by default. Do not modify product code or other repository files during the investigation.
