---
name: architect
description: "Sketch system and module shape before code via grounded multi-agent design, then stop for human Agree. Use in Design when jumping to implementation would lock the wrong shape."
disable-model-invocation: true
---

# Architect

Design before implementing. Ground the problem, sketch types, signatures, and module boundaries with `not implemented` bodies or pseudocode, synthesize across agents (preferably models), obtain human Agree, and **stop**. Do not implement product code. If later Delivery proves the sketch wrong, scrap and redesign rather than bolting workarounds.

Authority: returns a proposed sketch and rationale to the Coordinator / Design conversation. Does not accept material decisions, edit production candidates, update the goal map, or write ADRs.

## Process

1. **Ground.** Build a real mental model of every system the new work touches. Run `how` over the relevant subsystems. If the design redefines ownership or layering, also run `why` on the existing shape so rationale becomes a constraint. Skip only for genuine greenfield with no surrounding system. Naming files is not grounding.
2. **Sketch.** Run `arena` with a design-sketch task and the grounding artifacts. Pass [runner-prompt](references/runner-prompt.md) to each runner. Each candidate produces a design package shaped per [rationale-template](references/rationale-template.md). Require at least two structurally distinct candidates before synthesis. Screen every candidate against [design-red-flags](references/design-red-flags.md); reject or revise shallow modules, information leakage, temporal decomposition, and pass-through methods. Prefer the design that hides more complexity behind a smaller public surface. Use configured `architect runners` / `arena runners` from `~/.cursor/rules/pstack-models.mdc` when present.
3. **Agree (required).** Surface the synthesized sketch to the human in plain language: what will exist, how callers use it, what is hidden, what was rejected, and open risks. Do not assume they will read the sketch files. Pause for explicit sign-off. Pushback is new Phase 1 evidence—re-ground and re-sketch before any Delivery work against the old shape. For adversarial pressure before Agree, run an installed design-critique skill when available; it is optional.
4. **Stop.** Hand the agreed sketch and rationale to the Coordinator for inclusion in `SPEC.md`. Do not fill in implementations. Do not start slices.

## Scrap signal (for later Delivery)

If implementation later shows a pattern of friction the sketch cannot absorb—repeated workarounds, escape-hatch types, callers needing internal rules, or repeated same-shape deviations—throw the sketch out, re-run `how` on what was learned, redesign smaller first, and return to Sketch. That loop is a Design re-entry, not silent patching inside a slice when the architecture is wrong.

## Return

- `Agree-ready` or `Agreed`: grounded constraints; synthesized sketch; rationale including usage, shape, synthesis decision, tradeoffs, alternatives; open questions; recommended SPEC sections to update.
- `Inconclusive`: evidence gathered, bound or arena failure, missing observation, and recommended next Design route.

Completion criterion: the human can accept or reject the shape from conversation; durable sketch artifacts are English and agent-facing; no production implementation was performed under this skill.
