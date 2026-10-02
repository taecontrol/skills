---
name: refine
description: "Review a working change with fresh eyes against its spec, then make it right and make it fast without changing the behavior its acceptance tests lock, in at most three rounds. Use after a change works and before it ships, or when asked to review or improve a branch."
---

# Refine

The change works; now **make it right, make it fast**. You are the fresh eyes the author could not be: find what breaks the spec, then improve the code while the acceptance tests hold its behavior still.

Your inputs are the spec, or the request when there is none, the diff range, and the assertion changes the delivery listed. Load `strategic-programming`: its lenses are your standard for right.

## Round

### Review

Read the spec and its sources yourself; the spec, not the diff, is your oracle. Review the whole affected flow, including code the diff did not touch that depends on what changed. Look through these lenses:

- **Behavior:** each example and what must never happen; each `evidence` example against what the delivery captured, such as the screen against the chosen prototype; the spec's state table when it has one; each dependency's failures, restarts, retries, and duplicates; every consumer of a name, value, or seam whose meaning changed; the policy existing peers apply, such as validation, authorization, and guards, that the new behavior should inherit.
- **Tests:** each test against [test value](../../engineering/strategic-programming/references/test-value.md); stand-ins that differ from the real target; assertion changes that weakened an example; sleeps, wall-clock dependence, and flakiness; tests that CI will not run.
- **Mutations:** prove the tests by breaking the code, as [below](#mutations): in the first round, every target; later, only what the previous round added.
- **Right:** the `strategic-programming` lenses, the project's coding standards, duplicated policy, dead code, scaffolding left from making it work, and temporary labels in durable files.
- **Fast:** the spec's budgets, and work the change made needlessly slow, such as extra round trips, queries, renders, or suite time.

A finding needs a concrete scenario reachable from input the product accepts, or a mutation that stayed green. Drop the rest. Sort what survives:

- **Blocker:** breaks an example or something that must never happen, loses data, exposes security, or turns a check red.
- **Fix:** a real defect, or a quality problem the change introduced.
- **Follow-up:** real, but outside the change's scope.

On a large change, when the harness allows, split the review by area across fresh reviewers and give the tests and mutations their own reviewer.

### Improve

Fix blockers first, then fixes. A behavior fix comes with a test that fails without it. Keep structural changes in their own commits, separate from behavior changes, and run the tests before and after each. The acceptance tests' assertions stay as they are.

When several findings share a cause, fix the cause: a type that makes the bad state unrepresentable, a lint or architecture rule, or a shared component that owns the mechanism, with any existing violations fixed or named. Prove a new check goes red on the violation.

### Next round

Only blockers start another round. Its review, with fresh eyes when the harness allows, covers the final state of what the previous round changed and its callers. When a review finds no blocker, make its fixes, run the gates, and finish.

## Three rounds

A sound spec and a sound delivery converge in at most three rounds. If the third review still finds a blocker, stop: the flow failed, not just the code. Report the blockers and what let them through, such as a missing example, a wrong decision, or a gap in the environment.

## Mutations

In a disposable checkout of the reviewed revision outside the worktree, such as `git worktree add --detach` under the system temporary directory, break each guard and failure path the change added, and each value that realizes an example, with the credible regression it protects against. Run the narrowest suite that claims it, limited to a few times its normal duration; a timeout counts as red. A mutation that stays green is a finding: the test is vacuous or the example has no test. Call it unreachable only after trying to reach it from real input. Remove the checkout by path with `git worktree remove --force <path>`; `git worktree prune` also drops other sessions' worktrees.

## Report

Leave for the pull request: the rounds, each blocker and fix with how it was resolved, mutations and their results, checks added with the defects they generalize, and the follow-ups.

## Done

The last review found no blocker and its fixes are made, every example still has a test that goes red without it, the project's gates pass on the final state, and the report is ready for `ship`.
