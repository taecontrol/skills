# Troubleshooting and recovery

Use this reference for rebase conflicts, squash merges, local/remote divergence, reconstruction,
ambiguous membership, locked metadata, and worktree integrations.

## Rebase conflicts: exit 3

`rebase` and `sync` both exit 3 on conflict, but leave different states:

- `sync` restores every branch to its pre-operation state before exiting;
- `rebase` stops at the conflict and waits for resolution.

After a failed `rebase`:

```bash
# Resolve the listed files.
git add <resolved-paths>
gh stack rebase --continue
```

Repeat resolution and `--continue` if higher layers conflict. To abandon the complete cascade:

```bash
gh stack rebase --abort
```

After a failed `sync`, run `gh stack rebase --remote <name>` to recreate the conflict in resumable
form, resolve it, stage the files, and continue.

When `rerere` was already enabled—or the user explicitly approved enabling it—Git can replay a
resolution when the same conflict appears in higher layers. Non-interactive `gh stack` does not
enable a disabled setting. Still inspect the result and rerun the relevant proof after every replay.

## After a squash merge

A squash merge replaces the original commits with one new trunk commit. `gh stack sync` detects the
merged layer and rebases higher branches with the appropriate `--onto` behavior:

```bash
gh stack sync --remote <name>
gh stack view --json
```

No manual commit-dropping should be needed. If conflict occurs, sync restores all branches and exits
3. Run `gh stack rebase --remote <name>`, resolve, and continue. Add `--prune` only when deleting
merged local branches is intended.

## Local and remote stacks diverged

Divergence means local and GitHub stack composition changed independently. In non-interactive mode,
`sync` can print both chains, make no changes, print `Sync aborted`, and exit 0.

Choose one source of truth deliberately.

### Keep the remote composition

```bash
gh stack unstack --local
gh stack checkout <stack-or-pr-number>
gh stack view --json
```

This removes only local tracking, then reconstructs it from GitHub.

### Keep the local composition

```bash
gh stack unstack
gh stack submit --auto --remote <name>
gh stack view --json
```

This removes the GitHub grouping but preserves PRs and branches, then recreates the stack from local
tracking. Auto-merge or queued PRs may remain stacked; clear that state before retrying when GitHub
refuses to unstack them.

Completion criterion: one declared source of truth won, both sides report the same order, and no PR
or branch was deleted.

## Restructure a stack without the TUI

`gh stack modify` is interactive. For unattended restructuring, rebuild metadata after correcting Git
ancestry:

```bash
gh stack unstack
# Rename, drop, or rebase branches so ancestry matches the new order.
gh stack init --base main branch-1 branch-2 branch-3
gh stack submit --auto --remote <name>
gh stack view --json
```

`init` adopts existing branches and existing PRs survive. `submit` corrects bases and re-links them.
Changing stack metadata alone does not change Git ancestry.

For a reorder, capture original layer boundaries before moving any branch:

```bash
old_models=$(git rev-parse models)
old_migration=$(git rev-parse migration)
```

Inspect each commit range with `git log <old-parent>..<branch>`, then replay ranges bottom to top with
`git rebase --onto`. Rebuild the stack only after ancestry itself matches the intended order.

## Branch belongs to several stacks: exit 6

A shared branch—often a trunk for several stacks—cannot identify one active stack. Check out a branch
unique to the intended stack:

```bash
gh stack checkout <unique-branch>
```

Commands that take a stack number, such as `merge <stack-number>` or `unstack <stack-number>`, avoid
current-branch inference.

## Drive stacks from another tool or worktree

Use `gh stack link` when branches are managed by `jj`, Sapling, git-town, another Git worktree, or a
workflow where local `.git/gh-stack` tracking would be absent or misleading:

```bash
gh stack link --remote <name> branch-a branch-b branch-c
gh stack link --base develop --open --remote <name> a b c
gh stack link --remote <name> 10 20 30
gh stack link --remote <name> 7 feature-d
```

Arguments are bottom to top. `link` writes no local stack metadata, so local navigation is unavailable.
Use `gh stack checkout <stack-number>` later to establish local tracking.

## Stack metadata locked: exit 8

Another `gh stack` process holds `.git/gh-stack.lock`. Wait briefly and retry. A persistent lock means
another process remains active; identify and stop that process before another write. Avoid deleting
the lock while a writer may still be alive.

## Interrupted modify session: exit 10

If a human left an unfinished `gh stack modify` session, restore the stack before other operations:

```bash
gh stack modify --abort
```

Then verify `git status --short` and `gh stack view --json` before continuing.

## Recovery verification

After any recovery:

```bash
git status --short
gh stack view --json
```

Verify that:

- the worktree contains no unexplained changes;
- branch order and direct bases match the accepted design;
- no active branch reports `needsRebase`;
- every expected PR still exists;
- local and GitHub stack composition agree;
- focused tests pass on every rewritten layer.

A successful command without these postconditions is not a completed recovery.
