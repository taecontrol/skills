---
name: gh-stack
description: >
  Creates and manages stacked GitHub pull requests with gh stack. Use for splitting dependent work
  into reviewable layers; creating, editing, submitting, syncing, rebasing, checking out, or merging
  a stack; or whenever stacked PRs, dependent PRs, branch layers, or gh stack are mentioned.
metadata:
  author: taecontrol, adapted from github/gh-stack
  version: "0.1.0"
---

# GitHub Stacked PRs

Use `gh stack` to turn one coherent change into an ordered chain of small pull requests. Each branch
has one PR based on the branch below it, so each review shows only that layer's focused diff.

`gh stack` prints trunk first:

```text
(main) <- auth <- api <- frontend
```

Left is the **bottom** and merges first. Right is the **top** and merges last. `up` moves away from
trunk; `down` moves toward it. Foundational work belongs below the code that depends on it.

## When to use

Use a stack when one outcome contains dependent concerns that are easier to review separately. Use a
single ordinary PR when the change is already focused and independently reviewable. Use separate
stacks for unrelated work or parallel changes without a dependency chain.

Before creating a stack or choosing its layers, read
[`references/stack-design.md`](references/stack-design.md).

## Prerequisites

Require:

- a GitHub CLI version compatible with the installed extension; the current quickstart documents
  2.90.0 or later, but `gh stack --help` is the executable capability gate;
- Git 2.20 or later;
- `gh auth status` succeeds;
- a GitHub repository the user can push to;
- GitHub Stacked PRs enabled for the repository.

Inspect first:

```bash
gh --version
git --version
gh auth status
git remote -v
```

Install or update the extension when `gh stack --help` is unavailable:

```bash
gh extension install github/gh-stack
# Existing installation:
gh extension upgrade github/gh-stack

gh stack --help
```

Git `rerere` remembers conflict resolutions, but non-interactive `gh stack` does not enable it when
it is disabled. Check `git config --bool --get rerere.enabled`; explain the repository-local change
and obtain user approval before running `git config rerere.enabled true`.

When the repository has more than one remote, resolve the intended push remote before mutating
anything. Set `remote.pushDefault` to that user-approved remote because `checkout` and `trunk` have
no `--remote` flag, and also pass `--remote <name>` to every shown `rebase`, `push`, `submit`, `sync`,
or `link` invocation.

```bash
git config remote.pushDefault <name>
```

Completion criterion: required versions and authentication are verified, `gh stack --help` works,
the target repository, trunk, and push remote are unambiguous, and the `rerere` disposition is
explicit without silently changing Git configuration.

## Agent-safe command forms

Several commands open prompts or full-screen interfaces when stdout is a TTY. For unattended agent
runs, use explicit arguments and machine-readable output:

| Use | Avoid unattended | Reason |
|---|---|---|
| `gh stack view --json` | `gh stack view` | bare form can open a TUI |
| `gh stack submit --auto --remote <name>` | `gh stack submit` | bare form edits PRs interactively |
| `gh stack init <branch>...` | `gh stack init` | bare form prompts for names |
| `gh stack add <branch>` | `gh stack add` | bare form prompts for a name |
| `gh stack checkout <target>` | `gh stack checkout` | bare form opens a picker |
| `gh stack merge <target> --yes` | bare `gh stack merge` | bare form prompts and target is unclear |
| `up`, `down`, `top`, `bottom`, `trunk` | `gh stack switch` | `switch` is menu-only |
| rebuild with `unstack` + `init` | `gh stack modify` | `modify` is TUI-only |

Use `gh stack <command> --help` for the installed version's flags. `gh stack help <command>` only
prints top-level help.

## Procedure

### 1. Inspect repository state

```bash
git status --short
git branch --show-current
git remote -v
gh repo view --json nameWithOwner,defaultBranchRef
```

If already inside a stack, inspect it before editing:

```bash
gh stack view --json
```

Treat uncommitted or unrelated work as user-owned. Preserve it; place only accepted files and commits
into the stack. A rebase or stack reconstruction starts only from a clean worktree unless the exact
command explicitly preserves the current changes.

Completion criterion: current branch, trunk, remote, existing stack membership, dirty files, and
unrelated work are accounted for.

### 2. Design the dependency chain

Write the proposed layers bottom to top before changing files. Each layer must:

- have one sentence that names its concern;
- depend only on trunk or lower layers;
- be independently reviewable at its direct base;
- contain its own behavioral proof when practical;
- avoid unrelated cleanup.

Use repository branch conventions. Otherwise prefer `<topic>/<concern>`, such as
`billing/schema`, `billing/api`, `billing/ui`.

Completion criterion: every accepted change maps to exactly one layer, dependency direction is valid,
and the chain tells one coherent story.

### 3. Initialize the bottom layer before implementation

For new work, initialize only the first planned layer:

```bash
gh stack init auth
gh stack view --json
```

Create each higher branch only after the lower layer has its commits. Pre-creating every empty layer
would freeze each higher branch at the parent's old tip; navigation alone does not propagate later
lower-layer commits.

For a non-default trunk:

```bash
gh stack init --base develop auth
```

Use multi-branch `init` only to adopt an existing chain or create deliberately empty branches whose
ancestry will be rebased before work continues. Its branch arguments are ordered bottom to top and
it checks out the last branch.

Completion criterion: `view --json` reports the intended trunk and bottom branch, and no pre-created
higher branch can miss commits that have not been made yet.

### 4. Implement and commit by ownership

Work on the layer that owns the concern. Stage files deliberately, then create the next planned
layer from the committed tip:

```bash
git add <files-owned-by-this-layer>
git commit -m "<focused message>"
gh stack add <next-layer>
```

Run `gh stack add <branch>` only from the current top branch. It creates the new branch at current
HEAD and carries uncommitted changes into it, so commit first when the new layer should start clean.
After the final planned layer, omit `add` and remain on that branch.

When changing an existing lower layer:

```bash
gh stack checkout <owner-branch>
# edit, test, stage, commit
gh stack rebase --upstack --remote <name>
gh stack top
gh stack push --remote <name>
```

If ownership is unclear, inspect `gh stack view --json` and `git log --all -- <path>` before editing.

Completion criterion: every commit belongs to the concern of its current branch, each layer's tests
pass at that layer, and all branches above a changed lower layer contain the updated parent tip.

### 5. Submit and verify every PR

Create or update the stack non-interactively:

```bash
gh stack submit --auto --remote <name>
gh stack view --json
```

`--auto` creates new PRs as drafts. Add `--open` only when the PRs are genuinely ready for review.
Edit generated titles and bodies afterwards when needed:

```bash
gh pr edit <number> --title "<focused title>" --body-file <file>
```

Read each PR number from the stack JSON, then inspect the live PR:

```bash
gh pr view <number> --json number,url,headRefName,baseRefName,isDraft,state,reviewDecision,statusCheckRollup
```

Verify that:

- every active branch has one PR;
- the bottom PR's `baseRefName` is trunk;
- each higher PR's `baseRefName` is the branch immediately below it;
- PR order matches the dependency plan;
- draft, checks, and review state match the intended submission state and repository policy.

Completion criterion: all intended branches are pushed, all intended PRs exist with correct bases,
and the reported stack order matches the local dependency chain.

### 6. Stay synchronized

Use the routine synchronization command:

```bash
gh stack sync --remote <name>
gh stack view --json
```

Use `--prune` only when deleting merged local branches is intended:

```bash
gh stack sync --remote <name> --prune
```

After editing a lower layer without a full sync, use
`gh stack rebase --upstack --remote <name>` and then push.
On a conflict, read
[`references/troubleshooting.md`](references/troubleshooting.md) before continuing. On unexpected
command behavior, read [`references/commands.md`](references/commands.md).

Completion criterion: no active branch reports `needsRebase`, local and remote stack composition
agree, and any pruning was explicitly intended.

### 7. Merge only the intended prefix

A PR target merges that PR and every unmerged PR below it. A stack target merges every unmerged PR in
the stack. A bare number resolves as a stack number before a PR number. Before authorizing the
operation, query both resources:

```bash
repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
gh api "repos/$repo/stacks/<number>"
gh api "repos/$repo/pulls/<number>"
```

A 404 means that resource identity does not exist. If both exist, `gh stack merge <number>` is
ambiguous and would select the stack. Stop and report the collision; the CLI has no disambiguating
syntax for a PR target. Use an explicitly approved safe alternative, such as the GitHub stack UI,
rather than guessing.

For every PR in the unambiguous selected prefix, inspect live eligibility:

```bash
gh pr view <number> --json number,url,headRefName,baseRefName,isDraft,state,reviewDecision,statusCheckRollup
```

Confirm direct bases, open/non-draft state, required reviews, and required checks against repository
policy before merge.

```bash
gh stack merge <pr-or-stack-number> --yes --merge-method <approved-method>
```

Use the repository's accepted merge method. `gh pr merge` is not a substitute for a stack merge.
The operation is all-or-nothing for the selected set, but branch protection and repository rules are
evaluated by GitHub. A merge queue can override the requested method.

A user request to merge one named PR authorizes only the prefix ending at that PR, not higher layers.
When numeric identity, merge set, bases, checks, or review state is ambiguous, stop before the merge
and surface the exact uncertainty.

After merge:

```bash
gh stack sync --remote <name> --prune
gh stack view --json
```

Completion criterion: the numeric target had one unambiguous identity, every selected PR satisfied
repository policy, the merged set exactly matches the authorized prefix, GitHub reports the expected
state, and remaining layers are correctly rebased on the updated trunk.

## Reading state

`gh stack view --json` writes structured state to stdout; status messages go to stderr.

```text
trunk           string
currentBranch   string
branches[]      name, head, base, isCurrent, isMerged, isQueued, needsRebase
branches[].pr   number, url, state (OPEN | MERGED | QUEUED); absent when no PR exists
```

`base` is the saved SHA of the parent branch last known to be contained, not necessarily the parent's
current tip. `needsRebase` is the direct stale-parent signal.

## Exit codes

| Code | Meaning | Recovery |
|---|---|---|
| 0 | Success | Verify postconditions; `sync` can exit 0 after an aborted divergence |
| 1 | Generic error | Read stderr |
| 2 | Not in a stack | Initialize or check out a stack |
| 3 | Rebase conflict | Follow the recovery reference |
| 4 | GitHub API failure | Check authentication and retry |
| 5 | Invalid arguments or precondition | Fix invocation or branch position |
| 6 | Branch belongs to multiple stacks | Check out a branch unique to the intended stack |
| 7 | Rebase already in progress | Continue or abort it |
| 8 | Stack metadata is locked | Wait for the other process, then retry |
| 9 | Stacked PRs unavailable | Enable the repository feature or report the blocker |
| 10 | Modify recovery required | `gh stack modify --abort` |

## Pitfalls

- **Large change first, split later:** create and design the stack before implementation.
- **Wrong-layer fix:** check out the owning lower branch, commit there, then rebase upstack.
- **Parsing human output:** use `view --json` and exit codes.
- **Assuming exit 0 means sync happened:** divergence can print `Sync aborted` and exit 0; verify state.
- **Unscoped remote:** with multiple remotes, pass `--remote` or set an intentional push default.
- **Interactive deadlock:** avoid bare prompt/TUI commands in unattended runs.
- **Rewriting a dirty tree:** preserve unrelated work and start rebases or reconstruction from a clean
  state.
- **Merging the top accidentally:** resolve whether a number denotes a PR or stack and inspect the
  exact merge prefix first.

## References and provenance

Open only the branch-specific reference needed:

- [`references/stack-design.md`](references/stack-design.md) — layer boundaries and naming.
- [`references/commands.md`](references/commands.md) — command preconditions, side effects, and
  atomicity.
- [`references/troubleshooting.md`](references/troubleshooting.md) — conflicts, divergence,
  squash-merge recovery, and reconstruction.

This skill adapts the official `github/gh-stack` agent skill and documentation from
<https://github.com/github/gh-stack> at revision `ab00aa4a3f2dddc51aa65849c68b391a1b079311`.
The upstream project is available under its
[MIT license](https://github.com/github/gh-stack/blob/main/LICENSE).
