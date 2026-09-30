---
name: deliver
description: "Execute an accepted implementation specification in the current worktree: implement its slices in order with the full design context, then review, repair, and validate the integrated result without waiting on the human. Use explicitly to deliver already-settled software design; do not use to design the solution or manage parallel worktrees."
---

# Deliver

Turn one accepted implementation specification into integrated, validated code. You implement it yourself, holding the specification and the design it cites; fresh reviewers and a fresh Product Validator judge the result. Do not redesign the work or maintain a second execution system.

## Start from accepted work

1. Resolve the specification from a user-supplied path, then an established local-work convention. Require `Status: Accepted`, an applicable repository revision, ordered slices, and a validation contract. Stop with the exact missing input when the document is absent, still a draft, or materially stale.
2. Read the **accepted inputs**: the specification and every feature brief, design, ADR, prototype, contract, and standard it cites. The specification orders the work; its cited sources define what correct means.
3. Inspect the current worktree, Git status and history, applicable agent instructions, coding standards, and executable gate configuration. Preserve unrelated user changes. Do not create or switch branches or worktrees beyond the one exception in [Boundaries](#boundaries).
4. Determine the next unfinished slice from the ordered specification and Git evidence. If prior work cannot be mapped safely, ask one focused resynchronization question rather than inventing execution state.
5. Read [references/passes.md](references/passes.md), then implement exactly one slice at a time.

Apply subsequent explicit user instructions to the active scope and every dispatch. An already authorized scope change needs no second approval; keep it visible in the close report without turning the specification into a progress log. Ask only for genuinely unresolved changes, and do not restore removed requirements from an older contract.

## Implement each slice

Implement the active slice under the [slice contract](references/passes.md#slice). A slice is green when its outcome works, its gates pass against the final state, and its slice-level product check is done. Do not advance from a known failing slice.

Diagnose and repair ordinary in-scope failures without a fixed retry count. Stop when evidence invalidates an accepted outcome, public contract, sensitive policy, costly-to-reverse design, or other authority boundary, and name the exact decision that must be resynchronized.

When the slice is green, inspect that the diff belongs to the active slice and preserves unrelated work. Create one focused local commit following the repository's commit convention, staging only the slice. Do not amend or rewrite existing commits unless the user separately requests it. Then select the next slice.

## Review and repair the integrated result

After all slices are committed, run this phase to completion on your own; the human judges its outcome in the close report.

1. Run the full-project technical gates required by the accepted specification and executable project configuration, including the full-project CRAP maximum of `8` only when its tool and command are configured.
2. Read the [review contract](references/review.md) and dispatch fresh reviewers in parallel under its partition, including the separate test reviewer, with the inputs it lists.
3. Merge the findings. Drop duplicates, verify each uncertain finding yourself or carry it to the report, and order the defects by the contract's [rank](references/review.md#rank).
4. Repair every supported finding in rank order under [integrated repair](references/passes.md#integrated-repair). When the specification contradicts the brief or design it cites without naming the difference as a cut, the cited source wins. When no accepted source settles a finding, choose the option most consistent with the accepted inputs and record the choice for the report. Resynchronize only when the choice would change a public contract, sensitive policy, or costly-to-reverse architecture.
5. Apply [recurrence prevention](references/passes.md#recurrence-prevention): generalize the repaired defects to their common cause, and add a check or coding standard only when that general form is useful and not already owned.
6. Dispatch fresh reviewers for every area the repairs touched, over the final state rather than the repair diff, with the repaired findings and the callers of each changed seam, and a fresh test reviewer over every guard, obligation, and test the repairs changed. Repeat steps 3–6 until a round finds no new supported defect. When the same finding survives two repairs, stop repairing it and carry it to the report with its evidence.
7. Rerun the full-project gates, then dispatch a fresh read-only Product Validator under the `product-validation` contract to exercise the representative journey defined by the specification through the real product interface. Accept its verdict only when the report names the controller used and, for a browser journey, the Manuvra probe result and the reason each earlier controller was skipped; otherwise return the report for completion. A `Fail` is repaired like a review finding, and the evidence it invalidates is rerun.

Close each agent once you accept its result. If a dispatch fails on an agent limit, close idle agents and retry; if the parallel partition still cannot be created, run the areas sequentially. Technical gates do not replace product validation, and product validation does not waive technical failures.

### When validation cannot proceed

Separate a product defect from a failed setup or missing control capability before repairing. `Inconclusive` is not automatically a product repair. Continue with the next usable controller in `product-validation`'s [method order](../product-validation/SKILL.md#choose-a-faithful-method).

For a setup failure, isolate the earliest failed prerequisite and make only a supported, authorized correction. Verify that prerequisite with a narrow check before resuming the affected path. Another attempt needs new evidence or a verified correction; unchanged retries and speculative repair chains do not advance delivery. Preserve prepared environments and unrelated validation state.

When the method requires building or extending a harness, report the exact unverified behavior and separate that tooling proposal from delivery. Continue work that does not depend on the gap. If no faithful method is available, report incomplete validation rather than silently expanding scope or claiming success. Tooling repairs count as restored capability only when observed; they are not product acceptance evidence.

### Close delivery

Close as `Delivered` only when all evidence required by the current accepted scope is green. When the human defers product validation or another required check, or it stays `Inconclusive`, still complete the integrated review and its repairs, which need no external authority, and close as `Delivered without validation`, naming each missing piece of evidence. A slice check that ended `Inconclusive` stays an open obligation until final validation covers it or the report names it.

Confirm that durable knowledge has an existing maintained owner in code, tests, documentation, an ADR, or the domain glossary. Do not create durable documents as an incidental cleanup step. Preserve the implementation specification and the accepted inputs it references, and report their paths: `delivery-review` judges the result against them, and temporary ones retire with the worktree.

Write the close report once, at close, to a Markdown file beside the specification, such as `<specification>.delivery.md`, and give it in your response. `delivery-review` runs in a later session and reads only what is on disk.

The close report contains:

- delivered commits and gate results;
- the review partition and rounds, findings by rank, and how each was repaired;
- the test reviewer's mutations, each with its target and whether a test went red;
- decisions you made where accepted sources conflicted or were silent;
- checks and coding standards added, each with the defects it generalizes, and recommended checks not installed;
- product evidence;
- pre-existing defects observed but not repaired, including intermittent tests;
- omissions, unresolved findings, and accepted residual risk.

## Boundaries

- Do not create goal maps, execution ledgers, candidate identifiers, progress files, child worktrees, or parallel slice scheduling. The test reviewer's disposable mutation checkout is the one exception, and it is removed before the reviewer returns. The close report is not a progress file: it is written once, at close.
- Do not modify the accepted specification to record progress or results.
- Add only work that accepted slices, repairs of supported findings, or recurrence prevention require.
- Never stage or commit unrelated changes. If active work cannot be separated safely from unrelated changes in the same file, stop and ask rather than committing mixed work.
- Do not push, publish a pull request, deploy, mutate production, spend money, or perform another external effect without separate authority.
- Keep reviewers and the Product Validator read-only on the delivery worktree. A code change invalidates the evidence it affects.

## Completion criteria

Every slice in the current accepted scope exists as one coherent local commit with green slice gates and slice product checks; the integrated repository passes its required full-project gates; the last round of fresh integrated review found no new supported defect; every check or standard added is general, useful, and not already owned; a fresh Product Validator has proven the representative journey, or the close names the missing validation; the specification, its accepted inputs, and the close report beside it remain available for review; and no known in-scope defect or unresolved authority boundary remains unreported.
