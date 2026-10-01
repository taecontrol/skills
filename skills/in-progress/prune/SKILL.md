---
name: prune
description: "Prune one area's verification surface: delete, consolidate, or repair the tests and checks that no longer earn their cost, remove the test-only production code they keep alive, and prove every contract still has a test that goes red."
disable-model-invocation: true
---

# Prune

Verification accretes. Each delivery adds tests, checks, and the seams they need, and nothing retires them. Prune one **scope** of that surface so what remains is cheaper to run and maintain and still proves every contract. Optimize for confidence, not deletion count.

Write the report and response in the user's active language.

## Value bar

Read `references/test-value.md` in the installed `strategic-programming` skill ([test value](../../engineering/strategic-programming/references/test-value.md)); when it is not installed, stop and say so. Its keeper, junk patterns, and retention bar judge every test in scope.

A **check** is a lint or type rule, an architectural test, or a script or step in the verification or CI command. It earns its cost when the mechanism it guards still exists, it goes red on a planted violation, and no other check catches the same violation. A gate that runs the same suite twice, or a step that cannot fail, is a check without value.

## Baseline

1. Resolve the scope: the module, package, subsystem, or kind of check the user names. Without one, take the area with the strongest signal, such as the slowest or intermittent suites, test code growing faster than the production code it covers, or checks added since the area was last pruned, and state the choice.
2. Read root and scoped agent instructions, coding standards, gate configuration, and CI routing.
3. At a pinned revision, record the scope's test and support line counts, the result and duration of each suite, and each check. List baseline failures separately: they are possible product bugs, not stale tests.

Done when every test file and check in scope has a recorded baseline.

## Ledger

When the scope is larger than one reader can hold, split it into **lanes** along production owner boundaries, not file prefixes, and give each lane to a fresh read-only agent. Every test file and check in scope belongs to exactly one lane.

The reader reads every assigned test in full, including parameter tables, and its production owner, entry point, callers, overlapping tests, CI routing, and history; use `why` when the reason a test, seam, or check exists is not evident. It gives every test declaration and check one mark with an evidence line:

- `R` retain: the contract and the regression it catches;
- `F` fix: retain the contract and repair the assertion, such as a negative control that passes when only one of several items is missing;
- `C` consolidate: the keeper that absorbs the assertion;
- `D` delete: the proof that remains, or why no contract exists.

Judge a test by its assertions, not its name. A `C` or `D` also names the production seams and dead code it unlocks: exports, flags, injection hooks, wrappers, and paths whose only callers are tests. A candidate whose evidence is incomplete stays `R`.

Then reread the ledgers for the redundant **layer**: a whole suite that replays a keeper's contract through mocks. Name the keeper for each contract, preferring the real boundary with a fake external dependency over a mocked collaborator, and correct the ledger marks this pass contradicts.

Done when every declaration and check in scope has a mark and an evidence line, and every contract has a named keeper.

## Cut over

Work in the current worktree, one coherent owner boundary per commit, following the repository's commit convention. Carry each `C` assertion into its keeper before deleting the original. Delete the unlocked seams and dead code without leaving aliases. Serialize edits to shared harnesses and support files. Update CI routing, test inventories, and size baselines the moves affect. Add no replacement test that restates the implementation it replaces.

A baseline failure that survives into a keeper is a product defect. Diagnose it under `diagnosing-bugs` and repair it at its owner in its own commit, with a control run that reverts the repair and shows the old behavior. Report unrelated product discrepancies instead of repairing them.

After each lane, run its keepers and sibling suites; after the last, run the affected project gates against the final state.

## Preservation review

Dispatch fresh read-only reviewers, one per group of lanes, with the ledgers and the diff. They compare removed coverage against the keepers and report contracts that lost their only proof and new or moved assertions that cannot fail.

Prove each claimed keeper by mutation, with the disposable checkout, time limit, and cleanup of the executed test review in the installed `deliver` skill ([review contract](../../engineering/deliver/references/review.md#executed-test-review)). For every contract whose test was consolidated or deleted with a named remaining proof, mutate the production behavior once and confirm the keeper goes red; for every retired check claimed covered by another, plant the violation and confirm the other check goes red. A mutation that stays green is a gap: restore the coverage and rerun it.

Done when every reported gap is restored or rejected with source evidence, and every claimed keeper and covering check went red on its mutation.

## Close

Report:

- the scope, the baseline and final revisions, and the commands run;
- removed tests grouped by junk pattern, and retired checks with their reason;
- production simplifications: seams and dead code removed;
- test, support, and production line counts and suite durations, baseline against final, production counted separately;
- retained candidates that looked removable, and the contract each one guards;
- every mutation, with its target and result;
- product defects, each with its control and repaired run;
- stale coding standards or agent instructions found, as candidates for `coding-standards` or `agents-md`;
- what was not run, and why.

A junk pattern that recurs across the scope is evidence for `deliver`'s test review: name it, so `retro` or a separately authorized change can act on it.

## Boundaries

- Commits stay local. Pushing, opening a pull request, or merging needs separate authority.
- Edit only the scope's tests, checks, test support, and the production code they unlock, plus the defect repairs above.
- Report stale coding standards and agent instructions; their skills own the change.
- Remove each mutation and disposable checkout before closing.

## Completion criteria

Every test and check in scope has a mark backed by evidence; every removed contract's keeper went red on a mutation; the affected gates pass on the final state; every baseline failure is repaired with a control or reported; and the report separates production from test changes.
