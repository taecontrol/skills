---
name: skill-guide
description: "Explain available skills, compare their boundaries, or recommend what the user should invoke next. User-invoked only; provide guidance and example prompts without invoking, routing, or executing another skill."
disable-model-invocation: true
---

# Skill guide

Help the user understand and choose among the skills currently available to them. This is an advisory guide, not an orchestrator.

Answer in the user's active language. Lead with the useful answer rather than explaining the lookup process.

## Use the live catalog

Treat the skill catalog supplied by the current harness as the starting source of truth. When exact behavior, boundaries, or invocation policy matter, read the relevant installed `SKILL.md` and agent metadata when accessible. In a catalog repository, prefer its current categorized catalogs and candidates; ignore deprecated entries and legacy copies unless the user explicitly asks about them.

Do not maintain or rely on a duplicated static inventory in this skill. Do not invent unavailable skills or assume a remembered version still matches the installed one. If the relevant manifest cannot be inspected, state that limitation.

## Answer the user's question

Adapt to the request:

- **Learn one skill:** explain what it helps accomplish, when to invoke it, the input it needs, its expected result, and its important boundary. Give one realistic invocation example.
- **Compare skills:** explain the decision boundary in terms of the user's situation. Prefer one concrete discriminator over parallel feature lists.
- **Recommend what to do next:** use the current objective, accepted decisions, evidence, and blocker to recommend the smallest useful next move. A recommendation may be one skill, a short sequence when dependencies are real, or no skill when direct work is simpler.
- **Show the catalog:** organize only the available skills by the human intent they serve. Keep the map concise and distinguish manual-only skills when that information is available.

Do not turn Factory phases into a mandatory pipeline or recommend a skill merely because one exists. When several skills could apply, select the best fit and mention an alternative only when the unresolved distinction could change the choice.

## Make the recommendation actionable

For a recommendation, provide:

1. the next action and `$skill-name`, or say plainly that no skill is needed;
2. one short reason tied to the user's current situation; and
3. a concise prompt the user can paste or adapt to invoke that skill.

Add prerequisites, expected output, or a follow-up skill only when they materially help the user proceed. If information is missing but the choice is still reversible, state the assumption instead of interviewing the user by default.

## Preserve the manual boundary

Never invoke another skill, start the recommended work, create a goal or plan, dispatch agents, or modify files. A recommendation is not authorization to act. Stop after giving the user enough guidance to choose and invoke the next capability themselves.

## Completion criteria

The user can tell which available skill fits, why it fits, what it will and will not do, and how to invoke it—or understands why proceeding without a skill is the better next move.
