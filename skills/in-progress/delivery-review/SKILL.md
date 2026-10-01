---
name: delivery-review
description: "Independently review a finished delivery or pull request against the accepted specification and design it was built from, and return a prioritized report of defects, tests to fix, delete, or add, and what the delivery's own review missed. Use after `deliver` or before merging work built from accepted design; not for changes without accepted design."
---

# Delivery review

Judge one finished delivery against the design it was built from, independently of the agent that built it. Return a prioritized report the human uses to decide what to repair. Every finding also records its **escape**: where the delivery's own review should have caught it. Escapes that repeat across reviews are the evidence for improving `deliver`.

Write the report and response in the user's active language.

## Establish the target

1. **Resolve the change.** Use the pull request or branch the user names, otherwise the open pull request for the current branch, otherwise the current branch against its base. Record the base, the head revision, and the diff range. When the current worktree is at the head revision with no uncommitted changes, review there. Otherwise create one disposable detached checkout of the head outside the reviewed worktree, such as under the system temporary directory, review from it, and remove it before closing.
2. **Resolve the accepted inputs.** Find the implementation specification from the user, the delivery's close report or pull request description, then the repository's convention for local work artifacts. Read it and every brief, design, ADR, prototype, contract, and standard it cites. Without an accepted specification or design, stop and ask for its path: a review with no accepted oracle is a generic code review, outside this skill.
3. **Collect the delivery record.** Read the close report `deliver` wrote beside the specification, otherwise the pull request description. Take from it the review partition and rounds, the test reviewer's mutations, repaired findings, decisions where sources conflicted, residual risk and who accepted it, and scope changes and human decisions. Residual risk that a specification cut or a human decision accepted is reported as known, not as a new finding. Risk the delivery accepted on its own is a decision to judge, not a waiver: review it against the accepted inputs and report it as a finding marked known to the delivery.
4. **Prepare the gates.** Run the project's test command once yourself and record the exact working invocation, including any environment setup it needs, so every reviewer can run tests.

## Review

Read `references/review.md` in the installed `deliver` skill ([review contract](../../engineering/deliver/references/review.md)) and review under it; when `deliver` is not installed, stop and say so. Take the area with the highest-ranked risk yourself, usually the data or domain boundary; when this session authored the change or an accepted input it is judged against, you are not independent, so dispatch that area too. Dispatch fresh reviewers in parallel for the other areas and for the separate test reviewer, each with the inputs the contract lists plus the verified test invocation. When parallel dispatch is unavailable, review the areas in sequence; the test review still executes its mutations.

## Confirm and rank

Merge the findings and drop duplicates. Confirm each one with evidence before it enters the report: reproduce it, trace it through the code, or rerun its mutation. Carry a finding you cannot confirm as uncertain. Order confirmed findings by the contract's rank. For each test finding, state the action (fix, delete, or add) and its reason: vacuous under a named mutation, contradicting a named accepted input, or redundant with a named test.

Classify each confirmed finding's escape:

- `missed`: a lens in the review contract covers it. Name the lens, and from the delivery record whether a reviewer held it.
- `upstream`: the specification or the design it cites was wrong or silent on it. Name the section.
- `introduced by repair`: it lives in code that the delivery's repair rounds changed.
- `outside contract`: no lens covers it. Name the gap.

Without a delivery record, name the lens and mark its assignment unknown.

## Report

Lead with the verdict: how many findings block merging (ranks 1–2), and whether any accepted journey is broken. Then give:

- the target: pull request, head revision, specification path, the partition you used, and the commands run;
- confirmed findings by rank, each with file and line, the violated source section, its evidence, a repair direction, and its escape;
- tests to fix, delete, or add;
- ambiguities for the human to settle, with both readings;
- uncertain findings and pre-existing defects, separately;
- an escape summary for `deliver`: findings grouped by escape class and lens, the cause each group shares, and the existing rule that should have caught it, or the rule to add when none covers it;
- what was not reviewed or executed, and why.

When the human asks about a finding, answer that question first, in your next message, before any further tool call.

## Repair selected findings

The human starts repair by selecting findings. Load `deliver` and run steps 4–7 of its [Review and repair the integrated result](../../engineering/deliver/SKILL.md#review-and-repair-the-integrated-result) over the selected findings: repair in rank order under [integrated repair](../../engineering/deliver/references/passes.md#integrated-repair), apply recurrence prevention, dispatch fresh reviewers over the areas the repairs touched with the callers of each changed seam, and rerun the full-project gates. A repair left without that re-review repeats the mechanism behind the `introduced by repair` escape. Rerun product validation only when a repair changed code on the specification's representative journey; otherwise report it as skipped with that reason. Add the repair's report, including its re-review rounds, to the delivery's close report.

## Boundaries

- During the review, change nothing outside disposable checkouts, including pull request comments and the specification, and remove each checkout before the review closes.
- The report is evidence. It changes no skill, instruction, or standard; the escape summary feeds `retro` and a separately authorized change to `deliver`.
- The review closes with the report. Repair is a separate task under [Repair selected findings](#repair-selected-findings).

## Completion criteria

Every accepted journey, guarantee, and protected behavior in the specification's scope was held by a reviewer; the test reviewer executed its mutations or named each suite it could not run; every reported finding is confirmed with evidence, ranked, and classified by escape; ambiguities, uncertain findings, and pre-existing defects are separate; and the reviewed worktree is unchanged with no disposable checkout left behind.
