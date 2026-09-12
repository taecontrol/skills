---
name: retro
description: "Analyze a completed or paused agent run and preserve an evidence-backed retrospective for improving future work. User-invoked only; produce a temporary Markdown report without changing skills, project instructions, tooling, or code."
disable-model-invocation: true
---

# Retro

Turn one agent run into evidence that can improve future runs. Reconstruct only what matters, identify supported improvement candidates, and preserve the result for a separate decision. Do not improve the workflow during the retrospective itself.

Write the report and response in the user's active language.

## Establish the run

Analyze the run the user identifies, or the current run when none is named. Prefer primary evidence you can access directly: conversation and tool history, session logs, commits and diffs, test or validation output, produced artifacts, and the exact installed instructions or skills involved.

Do not ask the user to retell evidence that is already accessible. When history was compacted, logs are unavailable, or a claim cannot be checked, name the gap and reduce confidence instead of reconstructing missing events from plausibility. Record the repository revision, worktree, session identifier, or artifact provenance only when available and useful.

Keep secrets, credentials, personal data, and unrelated source content out of the report. Include the minimum sanitized fact or excerpt needed to make each finding understandable on its own. Refer to large logs or artifacts by path and relevant location only as supplementary provenance, never as the report's sole evidence.

## Reconstruct the useful story

Describe the original objective, actual outcome, and only the turning points that changed cost, quality, direction, or confidence. Capture both friction and behavior that should be preserved. Do not produce a turn-by-turn transcript or judge success only by whether the final code passed.

For each material friction, separate:

- the observed event and its evidence;
- its effect on the run;
- the likely mechanism, explicitly labeled as an inference when not proven; and
- evidence that contradicts or limits that interpretation.

## Find improvement candidates

Use these as lenses, not a checklist:

- navigation or missing project knowledge;
- automated tests, checks, or observability;
- project-specific agent instructions or coding standards;
- reusable skill behavior, activation, boundaries, or handoffs;
- tool access, reliability, or economy; and
- unnecessary instructions, artifacts, roles, or repeated work.

Inspect the actual applicable instruction or skill before attributing a failure to it. When evidence permits, record the version or content actually available during the run and distinguish a skill that was not selected or loaded from one that was loaded but not followed and one whose instructions induced the behavior. Also distinguish a missing rule, conflicting instructions, unavailable information, insufficient authority, an actual product defect, and ordinary one-off model variation. Do not recommend adding prose for behavior an executable check can enforce or for guidance that already exists.

A candidate is worth reporting only when evidence connects a recurring or material cost to a changeable part of the working environment. For each candidate, identify the evidence, impact, correct destination, smallest plausible change or experiment, confidence, recurrence signal, and risk of making the workflow worse. Prefer deletion, clarification, better access, or automation over adding another protocol when those address the mechanism.

`No change recommended` is a valid conclusion when evidence is weak, the event is isolated, the current behavior was appropriate, or the proposed cure would cost more than the observed problem.

## Preserve the retrospective

Create a unique directory under the operating system's temporary directory, using `mktemp -d` or the platform equivalent. Give it a neutral name that contains no sensitive data and keep its permissions limited to the current user when the platform supports that. Never place the report in the project, worktree, skill catalog, or another existing directory. Write one `retro.md` file there.

Keep the report compact and portable. Adapt its depth to the evidence; do not fill empty sections, and keep a `No change recommended` result especially brief. Include as applicable:

- scope and evidence provenance, including material gaps;
- objective, outcome, and relevant turning points;
- behavior worth preserving;
- supported improvement candidates ordered by impact;
- rejected or unsupported changes when they prevent a tempting overreaction; and
- open questions for the later decision.

Do not attach the full transcript. Make every candidate traceable to evidence without requiring the next agent to have the original session context.

Return the exact report path, a short summary of the strongest findings, and a reminder that the directory is temporary. If filesystem access is unavailable, return the complete Markdown report in the conversation and state that no file was written.

## Preserve the decision boundary

Do not edit skills, `AGENTS.md`, coding standards, project configuration, tooling, tests, or production code. Do not create commits, issues, plans, or follow-up tasks. The report supplies evidence for a later, separately authorized review; it does not approve any proposed change.

## Completion criteria

One temporary Markdown report lets a fresh agent understand what materially happened, what should be preserved, which improvements have evidence, where each improvement belongs, and what remains uncertain—without access to the original transcript and without any workflow change being applied.
