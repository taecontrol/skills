---
name: delivery-review
description: "Independently review a finished delivery or pull request against the accepted specification and design it was built from, and return a prioritized report of defects, tests to fix, delete, or add, and what the delivery's own review missed. Use after `deliver` or before merging work built from accepted design; not for changes without accepted design."
---

# Delivery review

Judge one finished delivery against the design it was built from, independently of the agent that built it. Return a prioritized report the human uses to decide what to repair. Every finding also records its **escape**: where the delivery's own review should have caught it. Escapes that repeat across reviews are the evidence for improving `deliver`.

Write the report and response in the user's active language.

## Establish the target

1. **Resolve the change.** Use the pull request or branch the user names, otherwise the open pull request for the current branch, otherwise the current branch against its base. Record the base, the head revision, and the diff range. When the current worktree is at the head revision with no uncommitted changes, review there. Otherwise create one disposable detached checkout of the head under the system temporary directory, review from it, and remove it before closing.
2. **Resolve the accepted inputs.** Find the implementation specification from the user, the delivery's close report or pull request description, then the repository's convention for local work artifacts. Read it and every brief, design, ADR, prototype, contract, and standard it cites. Without an accepted specification or design, stop and ask for its path: a review with no accepted oracle is a generic code review, outside this skill.
3. **Collect the delivery record.** Read what the delivery left: its close report, review partition and rounds, repaired findings, decisions where sources conflicted, accepted residual risk, and scope changes and human decisions. Accepted residual risk is reported as known, not as a new finding.
4. **Prepare the gates.** Run the project's test command once yourself and record the exact working invocation, including any environment setup it needs, so every reviewer can run tests.

## Review

Read `references/review.md` in the installed `deliver` skill ([review contract](../../engineering/deliver/references/review.md)) and review under it; when `deliver` is not installed, stop and say so. Take the area with the highest-ranked risk yourself, usually the data or domain boundary; when this session delivered the change, you are not independent, so dispatch that area too. Dispatch fresh reviewers in parallel for the other areas and for the separate test reviewer, each with the inputs the contract lists plus the verified test invocation. When parallel dispatch is unavailable, review the areas in sequence; the test review still executes its mutations.

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
- an escape summary for `deliver`: findings grouped by escape class and lens, and the smallest change to `deliver` or its review contract each group suggests;
- what was not reviewed or executed, and why.

When the human asks about a finding, answer that question first, in your next message, before any further tool call.

## Boundaries

- Keep the reviewed worktree read-only: no edits, commits, stashes, resets, pull request comments, or specification changes. Disposable checkouts are the only mutation, and each is removed before the review closes.
- The report is evidence. It changes no skill, instruction, or standard; the escape summary feeds `retro` and a separately authorized change to `deliver`.
- The review closes with the report. Repair is a separate task the human starts by selecting findings; perform it in rank order under `deliver`'s [integrated repair](../../engineering/deliver/references/passes.md#integrated-repair) contract.

## Completion criteria

Every accepted journey, guarantee, and protected behavior in the specification's scope was held by a reviewer; the test reviewer executed its mutations or named each suite it could not run; every reported finding is confirmed with evidence, ranked, and classified by escape; ambiguities, uncertain findings, and pre-existing defects are separate; and the reviewed worktree is unchanged with no disposable checkout left behind.
