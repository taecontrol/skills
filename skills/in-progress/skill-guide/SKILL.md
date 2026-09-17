---
name: skill-guide
description: "Explain available skills, compare their boundaries, or recommend what the user should invoke next. User-invoked only; provide guidance and example prompts without invoking, routing, or executing another skill."
disable-model-invocation: true
---

# Skill guide

Help the user understand and choose among the skills currently available to them. This is an advisory guide, not an orchestrator.

Answer in the user's active language. Lead with the useful answer rather than explaining the lookup process.

## Use the live catalog

Start with the current harness's catalog and establish whether it includes user-invoked skills. When coverage is incomplete or unknown, inspect the installed skill locations exposed by the environment or attached skill paths, including project-local skills. Manual-only skills remain recommendation candidates even when absent from the automatic catalog. In a catalog repository, use its current categorized catalogs and candidates; ignore deprecated entries and legacy copies unless the user explicitly asks about them.

Do not maintain or rely on a duplicated static inventory in this skill. Do not invent unavailable skills or assume a remembered version still matches the installed one. If the relevant manifest cannot be inspected, state that limitation.

## Verify the next move

Before recommending a skill or writing a handoff prompt:

1. Identify the requested outcome and current state from the conversation and relevant artifacts. Distinguish accepted design from an executable implementation contract.
2. Find candidates by the outcome they own. Read the selected candidate and plausible alternatives, including their entry requirements, completion criteria, and references that determine the choice. Reading only an initially favored skill does not establish fit.
3. Select the skill that owns the requested result. A workflow may apply a programming standard internally; recommending that standard alone would omit the workflow's sequencing, independent passes, and completion obligations.
4. Check the selected skill's required inputs against the actual artifacts. If a prerequisite is missing, recommend the preparation needed first and label any later execution prompt as conditional. Do not describe an unchecked handoff as ready.

Reading a candidate's instructions for comparison is advisory inspection, not invocation or authorization to execute it. Reuse instruction content already supplied in the current context.

## Answer the user's question

Adapt to the request:

- **Learn one skill:** explain what it helps accomplish, when to invoke it, the input it needs, its expected result, and its important boundary. Give one realistic invocation example.
- **Compare skills:** explain the decision boundary in terms of the user's situation. Prefer one concrete discriminator over parallel feature lists.
- **Recommend what to do next:** use the current objective, accepted decisions, evidence, and blocker to recommend the smallest useful next move. A recommendation may be one skill, a short sequence when dependencies are real, or no skill when direct work is simpler.
- **Show the catalog:** organize only the available skills by the human intent they serve. Keep the map concise and distinguish manual-only skills when that information is available.

Do not turn Factory phases into a mandatory pipeline or recommend a skill merely because one exists. When several skills could apply, select the best fit and mention an alternative only when the unresolved distinction could change the choice.

## Make the recommendation actionable

For a recommendation, provide:

1. the next action and skill invocation using the current harness's supported syntax, or say plainly that no skill is needed;
2. one short reason tied to the user's current situation; and
3. a concise prompt the user can paste or adapt to invoke that skill.

Include the verified input paths and any unmet prerequisites needed for the handoff. Point to the selected skill's contract instead of rewriting its workflow in the prompt. For optional context, state a reversible assumption instead of interviewing the user by default.

## Preserve the manual boundary

While the request is advisory, provide guidance without invoking another skill, starting recommended work, dispatching agents, or modifying files. A recommendation alone is not authorization to act. A later explicit instruction to perform work ends the advisory task: follow that instruction under the applicable workflow. In particular, an explicit acceptance of a prepared specification authorizes recording its accepted status; this guide is not a reason to leave it as Draft or require another session.

## Completion criteria

The recommendation is grounded in inspected candidate contracts and relevant artifacts. The user can tell which available skill fits, why it fits, whether its prerequisites are met, and how to invoke it—or understands why proceeding without a skill is the better next move.
