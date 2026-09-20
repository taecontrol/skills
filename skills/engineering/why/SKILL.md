---
name: why
description: "Recover why existing code, systems, or technical decisions acquired their current shape from historical evidence."
disable-model-invocation: true
---

# Why

Help the user understand the historical forces and choices that produced an existing technical shape. Reconstruct recorded rationale, alternatives, tradeoffs, and forcing functions; do not defend the current state merely because it exists.

## Process

1. **Frame the why.** Identify the exact code, system shape, or decision in question and the historical period that matters. If the target is ambiguous, state the most useful interpretation and proceed so the user can redirect.
2. **Anchor in the present.** Inspect only enough current code, configuration, tests, or documentation to name the shape being explained and form a precise historical question. An anchor establishes what exists, not why it was chosen.
3. **Trace the lineage.** Follow the relevant logic through complete diffs, renames, moves, behavior-changing commits, reverts, and linked reviews or issues. Distinguish the first visible introduction, later changes, and the version that produced the current behavior. The last `blame` is not necessarily the origin.
4. **Find the evidence seam.** Start with the local lineage, then selectively inspect the sources most likely to resolve a material uncertainty: ADRs, RFCs, pull requests, tickets, release notes, incidents, team discussions, deployment records, or observability. Widen the search or investigate independent seams in parallel only when the risk or evidence warrants it. Name inaccessible or fruitless sources when their absence limits the conclusion.
5. **Reconstruct the decision.** Connect the pressure or constraint, alternatives available at the time, chosen compromise, resulting shape, and cost accepted. Account for abandoned approaches, reversals, contradictions, and later changes. Separate why the choice was made from whether its forcing conditions still apply.
6. **Explain.** Lead with the strongest supported conclusion, then tell the smallest causal history that makes it intelligible. Cite evidence next to the claim it supports and distinguish recorded rationale, supported inference, competing hypotheses, and unknowns. Use a short timeline or before/after comparison only when several changes materially shaped the answer.

## Evidence rules

- Current code and diffs can establish behavior and evolution; they establish historical intent only when a contemporaneous source records it.
- A source proves what it records, not a person's complete or private motivation.
- Authorship, activity, co-change, and chronology are clues, not proof of ownership or causality.
- Preserve contradictions and missing evidence. Prefer an inconclusive answer to a plausible story presented as fact.
- Distinguish the rationale for introducing a choice, the rationale for retaining it, and evidence that the original rationale may have been superseded.

## Boundaries

- Investigate and explain without modifying the system or writing repository artifacts unless the user explicitly requests them.
- Do not turn historical rationale into diagnosis, redesign, or a recommendation to preserve or remove the current shape.
- Do not require every possible source category; pursue the smallest evidence set that can support the conclusion honestly.

## Completion criteria

The user can see which pressure and alternatives produced the current shape, which claims are recorded versus inferred, what tradeoff was accepted, whether the original reason may still apply, and what remains unknown.
