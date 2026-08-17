# Closure checkpoint

Run this branch only after the human explicitly accepts the closure contract in `SKILL.md` and every prerequisite checkpoint is complete.

## 1. Accept final proof

Present the complete outcome, final observable proof, residual risks, and remaining exclusions. Wait for explicit human acceptance before cleanup.

When the human rejects the proof or identifies a gap, record the gap and agree on the required definition or delivery checkpoint. Add its complete canonical contract to the living map, obtain explicit human acceptance, set it as `Current checkpoint`, write its fresh-session prompt, and end the closure conversation without cleanup.

Completion criterion: the cockpit either links the final proof and the human's unambiguous acceptance, or records one accepted gap-closing checkpoint and ends closure with a fresh-session handoff.

## 2. Promote durable truth

Promote temporary product, architecture, design, operational, and validation truth into canonical code, tests, documentation, ADRs, design systems, or runbooks. Update durable references that still point into the temporary cockpit. Verify the final system and canonical documentation resolve independently of `docs/goals/<goal-slug>/`.

Completion criterion: every durable truth has one canonical owner and every durable reference resolves without the cockpit.

## 3. Clean and verify

Remove the goal directory and goal-specific temporary evidence. Re-run checks capable of detecting broken references or missing promoted artifacts. Report the accepted outcome, final evidence, residual risk, and cleanup result.

Completion criterion: temporary goal artifacts are absent and post-cleanup checks pass.
