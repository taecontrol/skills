---
name: refine
description: "Review a working change with fresh eyes against its spec, then make it right and make it fast without changing the behavior its acceptance tests lock, in at most three rounds. Use after a change works and before it ships, or when asked to review or improve a branch."
---

# Refine

The change works; now **make it right, make it fast**. You are the fresh eyes the author could not be: find what breaks the spec or the contracts the change touches, then improve the code while the acceptance tests hold its behavior still.

Your inputs are the spec, or the request when there is none, the diff range, and the assertion changes the delivery listed. Load `strategic-programming`.

## Round

### Review

Read the spec and its sources yourself, and the project's review guidance when its agent instructions point to one; its facts and blocking rules add to the ones below. Your oracle is the spec plus every contract the change touches: what its documentation, types, and peers promise, and how the product runs where it ships. Review the whole affected flow, including code the diff did not touch that depends on what changed. Look through these lenses:

- **Behavior:** each example and what must never happen; each `capture` example against what the delivery captured, such as the screen against the chosen prototype; the spec's state space when it has one; each dependency's failures, restarts, retries, and duplicates; every consumer of a name, value, or seam whose meaning changed; the policy existing peers apply, such as validation, authorization, and guards, that the new behavior should inherit on every entry point that produces the same effect.
- **Runtime:** how the product runs where it ships, read from its deployment configuration rather than assumed: state that must survive a request landing on another replica, entry points that bypass the intended one, and the previous release running beside this one through a rollout and its migrations.
- **Docs:** every sentence the change adds or edits in documentation, docblocks, and API references, read against the code. A false sentence is a defect.
- **Tests:** each test against `strategic-programming`'s test value reference; stand-ins that differ from the real target; assertion changes that weakened an example; sleeps, wall-clock dependence, and flakiness; tests that CI will not run.
- **Mutations:** prove the tests by breaking the code, as [mutations](references/mutations.md) describes: in the first round, every target; later, only what the previous round added.
- **Right:** the `strategic-programming` lenses, the accepted program design when the spec points to one (the diff follows it, or the delivery names each departure), the project's coding standards, duplicated policy, dead code, scaffolding left from making it work, and temporary labels in durable files.
- **Fast:** the spec's budgets, and work the change made needlessly slow, such as extra round trips, queries, renders, or suite time.

A finding needs a concrete scenario reachable from input the product accepts or from how it runs, or a mutation that stayed green. Hand every finding to a fresh agent that found none of them, to check each against the code and the configuration: **confirmed** when the scenario follows from them or from a run, and reading is enough; **plausible** when the risk is real but the evidence cannot show it, naming the evidence that would; **refuted** when a guard elsewhere stops it or nothing reaches it. Drop the refuted. The change's **scope** is the code the diff modifies or newly reaches, such as an old function a new caller now exposes. Sort the rest:

- **Blocker:** a confirmed defect in scope that breaks an example or something that must never happen, loses or corrupts data, crosses a security or tenant boundary, fails under how the product runs, or turns a gate or CI check red; or a mutation that stays green on a security, privilege, or isolation guard. The spec's silence about it does not lower it. A defect in these classes whose worst case is cosmetic or corrects itself is a fix.
- **Fix:** any other real defect in scope, a quality problem the change introduced, a plausible risk with cheap evidence to settle it, or a gap in the evidence, such as a missing test or a missing or mistimed capture.
- **Follow-up:** real, but out of scope.

On a large change, when the harness allows, split the review by lens, not by area: each fresh reviewer takes one or two lenses across the whole change, so what crosses areas lands in front of someone, and the tests and mutations get their own reviewer.

### Improve

Fix blockers first, then fixes. A behavior fix comes with a test that fails without it. Keep structural changes in their own commits, separate from behavior changes, and run the tests before and after each. The acceptance tests' assertions stay as they are.

When several findings share a cause, fix the cause as `strategic-programming` orders it.

A fix closes its finding inside the change's design. When closing it needs a new mechanism the spec did not ask for, such as a limiter, a lock, a cache, or a table, it is a scope decision: put it to the human with the options and your recommendation, and fix the rest meanwhile.

### Next round

Only blockers start another round, up to three in all. Its review, with fresh eyes when the harness allows, covers the whole change in its final state and looks hardest at what the previous round's fixes added: a fix is new code no review has seen. When a review finds no blocker, make its fixes, run the gates, and finish.

A sound spec and a sound delivery converge within three rounds. If the third review still finds a blocker, stop: the flow failed, not just the code. Report the blockers and what let them through, such as a missing example, a wrong decision, or a gap in the environment.

## Report

Leave for the delivery's report: the rounds, each blocker and fix with how it was resolved, mutations and their results, checks added with the defects they generalize, and the follow-ups.

## Done

The last review found no blocker and its fixes are made, every example still has a test that goes red without it, the project's gates pass on the final state, and its report is ready for the delivery's report to the human.
