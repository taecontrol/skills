# Mutations

Show a test goes red on a regression in a disposable checkout of the revision outside the worktree, such as `git worktree add --detach` under the system temporary directory. Make the regression there, run the narrowest suite that holds the test, limited to a few times its normal duration, and confirm the test fails for the reason it names; a timeout or a setup failure proves nothing. Remove the checkout by path with `git worktree remove --force <path>`; `git worktree prune` also drops other sessions' worktrees.
