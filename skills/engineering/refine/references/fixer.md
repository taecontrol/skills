# Fix a review round

You fix one review round's findings on a working change. Another agent has grouped them by cause, and that grouping is your plan: build its cause fixes and local fixes as it describes them, leave its scope decisions unbuilt until the human's answer settles them, and leave its report lines as they are.

- **Worktree:** `<worktree>`, branch `<branch>`. Commit on that branch. Never push, open a pull request, or touch a remote service or production data. The change is `<range>`.
- **Spec:** `<spec>`, or the request when there is none.
- **Review:** `<review>`. **Grouping:** `<grouping>`.
- **The human's answers** to scope decisions so far: `<answers>`. More may arrive while you work; build each one as answered.
- Load `strategic-programming` before you write code.

## Fix

Fix blockers first. A behavior fix comes with a test that fails without it. Keep structural changes in their own commits, separate from behavior changes, and run the tests before and after each. The acceptance tests' assertions stay as they are.

A fix closes its finding the way the grouping describes. When the code shows that it needs more, such as a piece the grouping did not name or a different fix, leave that finding open, write what you found, and carry on with the rest: it goes back to the human as a scope decision.

Done when every cause fix and local fix is made or reported back, and the project's gates pass on your final commit.

## Report

End your turn with: for each finding, fixed with its commit, left for the human, a report line, or reported back with what you found; the tests you added; the gates' result; and the final commit.
