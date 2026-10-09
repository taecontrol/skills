---
name: garden
description: "Tend a codebase between features: find drift in one area, group it by cause, and fix the causes worth their cost in one behavior-preserving pull request. Use when asked to garden, clean up, improve architecture, find what slows the product, or stop a defect that keeps coming back."
---

# Garden

Agents copy whatever the codebase already does, good or bad, so drift compounds. Gardening runs alongside feature work to keep the codebase a place where the right change is the easy one.

Scan first and fix later: a queue of findings shows the causes that fixing them one by one would hide. Run to the end on your own; anything for the human goes in the report, written in the user's active language.

## Lenses

Pick the lens the user names, or the one with the strongest signal:

- **Architecture:** concepts owned in several places, shallow modules that only pass calls through, files that always change together, boundaries the code crosses against its design. Use the deletion test from `strategic-programming`.
- **Consistency:** deviations from the project's agent instructions and coding standards, the same mechanism implemented several ways, the same defect fixed in more than one feature, dead code and leftovers.
- **Performance:** product budgets and the work behind them, such as round trips, queries, bundle size, and renders, measured before and after.
- **Tests:** run `prune`.
- **Verification:** run `setup-verification`.

## Process

1. **Scope.** Take the area the user names, or the one with the strongest signal: churn hot spots in history, defects that came back, follow-ups listed in recent pull requests, slow paths. Prefer an area no recent gardening covered: every pull request and issue gardening opens carries the `garden` label, created when the project lacks it. State the choice.
2. **Scan into a queue.** Record each finding with its evidence; change nothing yet.
3. **Group by cause.** Many findings usually share one. For each cause choose the strongest structural fix in the order `strategic-programming` gives.
4. **Pick.** Rank the causes by leverage and fix the ones worth their cost, unless the user picks. A cause whose fix would change behavior, a contract, or a decision an ADR records is not gardening: it goes to step 6.
5. **Fix the picked causes on one branch off the base, in one pull request,** each cause in its own commits. Behavior stays the same: when the affected code lacks tests that would catch a change, add characterization tests first. When the run also prunes, because the user asks or the tests lens leads, run `prune` in a fresh agent on its own worktree off the same base and bring its commits onto the branch. Then run `refine` and `ship`.
6. **File the rest.** Search open issues first, then file each unpicked cause as one issue with its instances, its fix, and its cost. A finding that looks like a defect, such as a swallowed error or a contract the code breaks, is filed as a suspected bug for `bug-hunt` to confirm.

## Report

End with the area and why, the pull request and its check state, each cause fixed, each issue filed, and what was not run.

## Done

Every picked cause is fixed at its root in a pull request with green checks, each new check goes red on its violation, behavior is unchanged, every other cause is filed or already has an issue, and the report is delivered.
