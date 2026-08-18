# Command behavior

`gh stack <command> --help` from the installed extension is authoritative for flags and arguments.
This reference covers preconditions, side effects, atomicity, and failure modes that matter to an
automated agent.

## `init`

`gh stack init [--base <trunk>] <branches...>` processes branches bottom to top, adopts existing
branches, creates missing branches, records the local stack, and checks out the last branch.

- The trunk defaults to the repository default branch.
- A missing first branch is created from trunk; each later missing branch is created from the previous
  branch.
- Existing branches are adopted; there is no separate adopt mode.
- `init` may offer to enable Git `rerere` in an interactive terminal. Non-interactive runs leave a
  disabled setting unchanged. Check it explicitly and obtain user approval before changing the
  repository-local Git configuration.

Verify the result with `gh stack view --json` rather than assuming adoption preserved the intended
ancestry.

## `add`

`gh stack add <branch>` creates a branch at current HEAD, adds it at the top, and checks it out.

- It must run from the current top branch or exits 5.
- Staged and unstaged changes carry into the new branch.
- `-A` stages all changes and `-u` stages tracked changes; both require `-m` and are mutually
  exclusive.
- `add -Am` commits in place when the current branch has no commits yet instead of creating another
  branch.

Prefer explicit staging and commits when layer ownership matters.

## `push`

`gh stack push --remote <name>` pushes every active branch with per-branch
`--force-with-lease` protection.

- Active means not merged and not queued.
- The operation is not atomic: one rejected branch does not roll back branches already pushed.
- A rejection means the remote branch moved. Inspect and reconcile that branch, then rerun.
- `push` never creates or updates PRs; use `submit`.

## `submit`

`gh stack submit --auto [--open] --remote <name>` pushes active branches, creates missing PRs with
correct bases, updates existing PR bases, and links them as a GitHub stack.

- The operation is not atomic; earlier pushes and PR updates survive a later failure.
- `--auto` uses generated titles and skips the editor.
- Without `--open`, new PRs are drafts. `--open` also marks existing PRs ready for review.
- A single-commit branch uses the commit subject as title and body as PR body. A multi-commit branch
  humanizes the branch name.
- Custom titles and bodies are edited later with `gh pr edit`.
- A fully merged stack cannot be extended. Remaining unmerged branches become a new stack rooted at
  trunk.
- If stacked PRs are unavailable, non-interactive submit exits 9.

After every submit, get PR numbers from `view --json`, then verify each PR's base and readiness with
`gh pr view <number> --json headRefName,baseRefName,isDraft,state,reviewDecision,statusCheckRollup`.

## `link`

`gh stack link [--base <trunk>] [--open] --remote <name> <branches-or-prs...>` creates or updates a
GitHub stack without local `.git/gh-stack` tracking.

Use it for branches managed by another tool or worktree.

- Arguments are ordered bottom to top.
- Branch arguments are pushed and missing PRs are created.
- Existing PRs with incorrect bases are corrected.
- Membership updates are additive; `link` does not remove existing PRs.
- If the first numeric argument is an existing stack number, later arguments append to that stack.
- Local navigation commands do not work until the stack is checked out locally.

## `sync`

`gh stack sync --remote <name>` is the routine reconciliation command. It:

1. fetches the remote;
2. reconciles remote stack membership locally;
3. fast-forwards trunk when possible;
4. cascade-rebases when ancestry is stale;
5. pushes active branches;
6. refreshes PR state;
7. updates the remote stack object when at least two PRs exist;
8. prunes merged local branches only with `--prune` in non-interactive use.

Important behavior:

- `sync` never creates PRs; `submit` does.
- On a rebase conflict it restores every branch and exits 3.
- On local/remote composition divergence, non-interactive sync prints `Sync aborted`, changes nothing,
  and can exit 0. Verify postconditions instead of trusting the code alone.

## `rebase`

`gh stack rebase --remote <name>` fetches and cascade-rebases from trunk upward. In a repository
with multiple remotes, also set the user-approved `remote.pushDefault` because other commands lack a
remote flag.

- `--upstack` starts at the current branch and replays every branch above it.
- `--downstack` starts at trunk and stops at the current branch.
- `--no-trunk` aligns stack branches without fetching or rebasing trunk.
- `--continue` resumes after staged conflict resolution.
- `--abort` restores the complete stack.
- Merged PRs, including squash merges, are replayed with the appropriate `--onto` behavior.
- Starting another rebase while one is active exits 7.

## `view`

`gh stack view --json` returns machine-readable stack state on stdout. Status text is sent to stderr.
The command refreshes PR state from GitHub on a best-effort basis.

Bare `view` can open a TUI. `--short` is non-interactive but human-formatted; parse `--json`.

## `checkout`

`gh stack checkout <target>` accepts a stack number, PR number, PR URL, or branch name.

- A bare number resolves as stack number, then PR number, then branch name.
- Stack numbers, PR numbers, and PR URLs can fetch remote state and establish local tracking.
- Branch names resolve only against local stack tracking.
- A conflicting local composition cannot be forced. Remove only local tracking with
  `gh stack unstack --local`, then retry.
- With multiple remotes, checkout depends on `remote.pushDefault` because it has no `--remote` flag.

## `unstack`

`gh stack unstack [<stack-number>] [--local]` removes stack grouping and tracking. It does not delete
PRs or branches.

- No argument targets the active stack locally and on GitHub.
- A stack number can target remote grouping from anywhere in the repository.
- `--local` removes local tracking only and never contacts GitHub.
- Unknown stacks exit 2.

## `merge`

`gh stack merge <pr-or-stack-number> --yes <method>` merges an authorized set.

- A numeric argument resolves as a stack number before a PR number. Query both
  `repos/{owner}/{repo}/stacks/<number>` and `repos/{owner}/{repo}/pulls/<number>` with `gh api`
  before merging. When both exist, stop: the CLI has no syntax that safely forces PR interpretation.
- A PR number selects that PR plus every unmerged PR below it.
- A stack number selects every unmerged PR in the stack.
- The selected operation is all-or-nothing.
- Accepted method flags are version-dependent; inspect `merge --help`. Common forms are `--squash`,
  `--rebase`, `--merge`, or `--merge-method <method>`.
- Only open, non-draft PRs are eligible before repository rules are evaluated.
- Branch protection cannot be bypassed.
- A merge queue can override the requested method and may land queued PRs in separate groups.
- `gh pr merge` does not perform stack semantics.
- `view --json` does not report direct PR bases, checks, reviews, or draft state. Inspect every PR in
  the selected prefix with `gh pr view --json` before merge.

## Navigation

`up`, `down`, `top`, `bottom`, and `trunk` are non-interactive. `up` and `down` accept a count and
clamp at stack bounds. Merged branches are skipped when navigating among active layers.

`gh stack switch` is interactive and has no unattended path.
