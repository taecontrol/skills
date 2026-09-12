---
name: architect
description: "Design costly-to-reverse architecture—one seam or whole-system shape—via grounded multi-agent arena with a cross-judge, then stop for human Agree. Use whenever jumping to implementation would lock the wrong shape or evidence cannot settle an expensive architecture question."
disable-model-invocation: true
---

# Architect

Design before implementing. Bound one costly-to-reverse architecture question (a single seam or a whole-system / module shape), ground it, fan out structurally distinct candidates through `arena` with a mandatory cross-judge, synthesize one package, obtain human Agree, and **stop**. Do not implement product code. If later Delivery proves the sketch wrong, scrap and redesign rather than bolting workarounds.

Authority: returns a proposed sketch, decision frontier, and rationale to the Coordinator / Design conversation. Does not accept material decisions, edit production candidates, update the goal map, or write ADRs.

## Process

1. **Bound.** State the one architecture question, why current evidence cannot settle it, which decision it blocks or changes, accepted constraints and protected behavior, useful observations, and a time, cost, or scope limit. Separate reversible implementation choices from material decisions; leave reversible choices for a later accepted delivery slice. Treat conflicts with accepted decisions as evidence.

2. **Ground.** Build a real mental model of every system the new work touches. Run `how` over the relevant subsystems. If the design redefines ownership or layering, also run `why` on the existing shape so rationale becomes a constraint. Skip only for genuine greenfield with no surrounding system. Naming files is not grounding. Resolve empirical uncertainty with bounded `research`, `spike`, or `prototype` when inspection cannot answer it; carry evidence and limits forward. Do not call an unrun proposal evidence. Keep uncertain domain terms proposed rather than assumed.

3. **Arena (required).** Always run `arena`—never a solo sketch. Pass [runner-prompt](references/runner-prompt.md) to each runner. Each candidate produces a design package shaped per [rationale-template](references/rationale-template.md). Require at least two structurally distinct candidates before synthesis. Arena must include its cross-judge step; prefer distinct model families when configured. Use configured `architect runners` / `arena runners` from `~/.cursor/rules/pstack-models.mdc` when present. Screen every candidate against [design-red-flags](references/design-red-flags.md); reject or revise shallow modules, information leakage, temporal decomposition, and pass-through methods. Prefer the design that hides more complexity behind a smaller public surface. Compare alternatives on applicable concerns only: invariant ownership, dependencies, data and persistence, failure behavior, concurrency, recovery, security, and validation.

4. **Agree (required).** Surface the synthesized package to the human in plain language: the question and bound, what will exist, how callers use it, what is hidden, what was rejected (and why), open risks, and remaining uncertainty. Do not assume they will read the sketch files. Pause for explicit sign-off. Pushback is new Phase 1 evidence—re-bound, re-ground, and re-arena before any Delivery work against the old shape. For adversarial pressure before Agree, run an installed design-critique skill when available; it is optional.

5. **Stop.** Hand the agreed sketch, frontier, and rationale to the Coordinator for inclusion in `SPEC.md`. Do not fill in implementations. Do not start slices. Accepted realization belongs to a production vertical slice. Route accepted consequential rationale to `adr` only after human acceptance when maintained docs would not preserve why.

## Scrap signal (for later Delivery)

If implementation later shows a pattern of friction the sketch cannot absorb—repeated workarounds, escape-hatch types, callers needing internal rules, or repeated same-shape deviations—throw the sketch out, re-run `how` on what was learned, redesign smaller first, and return to Arena. That loop is a Design re-entry, not silent patching inside a slice when the architecture is wrong.

## Return

Return exactly one outcome:

- `Agree-ready` or `Agreed`: question and bound; grounded constraints; evidence and limits; synthesized sketch; rationale including usage, shape, synthesis decision (base, grafts, rejections, cross-judge verdict), tradeoffs, alternatives; open questions; validation path; recommended SPEC sections to update; next Coordinator route.
- `Inconclusive`: evidence gathered, reached bound or arena failure, missing observation, and recommended next Design route. Do not claim Agree-ready without real alternatives and a cross-judged synthesis.

Completion criterion: at least two arena candidates and a cross-judge ran (or an explicit single-model limitation was recorded); the human can accept or reject the shape from conversation; durable sketch artifacts are English and agent-facing; no production implementation was performed under this skill.
