---
name: arena
description: "Fan out parallel multi-agent (preferably multi-model) candidates for one artifact, pick a base, and graft the strongest ideas into one synthesis."
disable-model-invocation: true
---

# Arena

Fan out N parallel attempts at the same task. Read every candidate end to end. Pick the strongest as the base. Graft the best ideas from the others into it. Verify the synthesized result holds as one coherent artifact.

Use when one attempt at a non-trivial design or artifact would lock in the wrong shape. Prefer distinct models when the harness allows; otherwise use multiple agents on the best available model.

## Process

1. **Frame.** State the artifact each candidate must produce. Derive a rubric of 3–6 concrete gradeable criteria (picker-only; candidates do not see the rubric). Choose runners from `arena runners` in `~/.cursor/rules/pstack-models.mdc` when present; otherwise spawn at least two agents and prefer different model families when configured. Assign each candidate its own output path (worktree when possible, otherwise an isolated temp directory).
2. **Fan out.** Spawn all candidates in one message. Give each the same task, shared grounding, its output path, and instructions to produce the artifact plus a short rationale that names alternatives considered and rejected.
3. **Cross-judge.** After candidates finish, spawn one readonly judge on a model from `arena cross-judge pool` when present, preferring a different family from the parent. The judge scores each criterion and recommends a base. Run this in parallel with the parent's own reading.
4. **Pick.** Read every candidate end to end. Score criterion by criterion. Compare with the cross-judge. Prefer the base a future maintainer can extend without breaking invariants; when tied, prefer the smaller public surface.
5. **Graft.** Port only the strongest one or two ideas from each loser into the base by hand so one mental model remains. Record base, grafts, rejections, and dropouts. If candidates converge, note convergence and skip needless grafts. If they wildly diverge, reframe and re-run rather than averaging.
6. **Verify.** Check the synthesis against the rubric. If it fails, reframe or finish a missed graft—do not paper over.

## Return

Return one synthesized artifact and a short synthesis note: base, grafts with sources, rejections, dropouts, cross-judge verdict, verification result.

Completion criterion: at least two real candidates were attempted (or an explicit single-model limitation was recorded), one coherent synthesis exists, and the note is enough for a later reader to see why that shape won.
