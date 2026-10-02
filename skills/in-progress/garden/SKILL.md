---
name: garden
description: "Tend a codebase between features: scan one area for drift in architecture, consistency, or performance, group findings by cause, and fix the causes the human picks in small behavior-preserving pull requests, turning repeated mistakes into checks. Use when asked to garden, clean up, improve architecture, find what slows the product, or stop a defect that keeps coming back."
---

# Garden

Agents copy whatever the codebase already does, good or bad, so drift compounds. Gardening runs alongside feature work to keep the codebase a place where the right change is the easy one.

Scan first and fix later: a queue of findings shows the causes that fixing them one by one would hide.

## Lenses

Pick the lens the user names, or the one with the strongest signal:

- **Architecture:** concepts owned in several places, shallow modules that only pass calls through, files that always change together, boundaries the code crosses against its design. Use the deletion test from `strategic-programming`.
- **Consistency:** deviations from the project's agent instructions and coding standards, the same mechanism implemented several ways, the same defect fixed in more than one feature, dead code and leftovers.
- **Performance:** product budgets and the work behind them, such as round trips, queries, bundle size, and renders, measured before and after.
- **Tests:** suggest that the user run `prune`.
- **Verification:** run `setup-verification`.

## Process

1. **Scope.** Take the area the user names, or the one with the strongest signal: churn hot spots in history, defects that came back, follow-ups listed in recent pull requests, slow paths. State the choice.
2. **Scan into a queue.** Record each finding with its evidence; change nothing yet.
3. **Group by cause.** Many findings usually share one. For each cause choose the strongest structural fix: a type that makes the bad state unrepresentable, then a lint or architecture rule, then a shared component or helper that owns the mechanism, then a coding standard for what needs judgment. Prefer sharpening an existing check or rule over adding one.
4. **Present.** Show the causes ranked by leverage, each with its instances, its fix, and its cost. The human picks.
5. **Fix each picked cause in its own branch off the base and its own pull request.** Behavior stays the same: when the affected code lacks tests that would catch a change, add characterization tests first. Fix the existing violations a new check reports, or name them as exceptions; prove the check goes red on a planted violation. Then run `refine` and `ship`.
6. **Keep the rest.** Offer to file the causes the human did not pick as issues.

## Done

Every picked cause is fixed at its root in a pull request with green checks, each new check goes red on its violation, behavior is unchanged, and the remaining causes are filed or knowingly dropped.
