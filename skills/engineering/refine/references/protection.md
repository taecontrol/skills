# Choose the protection tests

A change works and its review rounds are done. Now it needs the few tests that will protect it from later changes. You propose them; the human approves the list; a fixer writes them. You change no code and commit nothing.

- **Worktree:** `<worktree>`. The change is `<range>`.
- **Spec:** `<spec>`, or the request when there is none.
- **The rounds:** `<reviews, groupings, and fixer reports>`, with the human's decisions.
- **Answer:** write it to `<answer>`, and end your turn with its path.
- Load `strategic-programming` and apply its test value reference to every candidate, including the project's existing tests.

## Candidates

A test earns a place only when it catches a credible later regression more cheaply than reviews and people using the product would. Consider, in this order:

1. **Each confirmed product defect,** the bug the change fixes when it is a bug fix and each defect the rounds found: one regression test at the boundary that owns it, which goes red on the commit before its fix.
2. **Contracts whose failure is costly and silent:** what a later change could break without anyone seeing it before users do, such as a release gate or a rule later work reuses.
3. **Logic with many cases at a cheap seam,** where one table of cases replaces repeated manual checks.

Leave out what a person sees at once when they use the product, what only restates the code, and what costs more to keep than the regression would cost to notice.

## Answer

For each proposed test: what it protects, the credible regression that turns it red, its boundary, its estimated size and run time, and how its author will show it red, on the commit before its fix or with the regression made by hand. Then list the candidates you rejected, each with one line on why. Write the list in words the human follows without opening the code, with the total of added lines and run time.
