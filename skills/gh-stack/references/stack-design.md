# Designing a stack

Choose what belongs in each layer before running `gh stack init`.

## Plan the dependency chain first

A stack is a dependency chain. If code in one layer depends on code in another, the dependency must
live in the same branch or a lower one. Planning is cheaper than restructuring because there is no
non-interactive in-place reorder.

Write the intended chain bottom to top:

```text
(main) <- todo/models <- todo/api <- todo/frontend <- todo/integration
```

- `todo/models` — shared types and schema
- `todo/api` — routes that use the models
- `todo/frontend` — components that call the routes
- `todo/integration` — proof across the complete feature

This is illustrative. Infer the topic and concerns from the actual task; never reuse these names
mechanically.

## Layer test

A proposed layer is sound when:

1. Its concern fits in one sentence.
2. Its direct diff is useful to review without reading higher layers.
3. It depends only on trunk or lower layers.
4. Its files and commits have one clear owner in the stack.
5. Its observable obligations have proportionate proof at that layer.
6. Removing it would not leave unrelated changes stranded above it.

A layer that fails the one-sentence test is usually two layers. A layer with no independent review
value may belong with an adjacent layer instead.

## Branch naming

Prefer a shared topic prefix plus the layer concern:

```text
<topic>/<concern>
billing/schema
billing/api
billing/ui
```

Repository and user naming conventions take precedence. Names are used exactly as given; slashes are
preserved. `gh stack add refactor/foo` creates a branch literally named `refactor/foo`.

If `gh stack add -m` is used without a branch name, the CLI generates a date-and-slug name from the
commit message. Explicit names keep the dependency story visible and are preferable for planned
stacks.

## Stage deliberately

Use `git add` and `git commit` directly so each branch receives only its concern:

```bash
git add internal/models/user.go internal/models/session.go
git commit -m "Add user and session models"

gh stack add billing/api
git add internal/api/routes.go internal/api/handlers.go
git commit -m "Add billing API routes"
```

Multiple commits per branch are fine when they serve the same concern. Different concerns belong in
different layers.

`gh stack add <branch>` without `-Am` does not touch the working tree. Uncommitted changes carry to
the new branch, so commit or stash first when the next layer must start clean.

## Decide when to add a layer

Add a branch when the next concern depends on the current work and any of these signals apply:

- reviewer expertise changes;
- subsystem or product surface changes;
- the current diff is already independently reviewable;
- separate rollout, risk, or validation makes the boundary valuable;
- feedback on the lower concern should not require re-reviewing the higher concern.

Do not add layers merely to reach a target PR count. Review boundaries should follow conceptual and
dependency boundaries.

## Keep one story per stack

Use one stack when every branch contributes to the same accepted outcome, even if layers span models,
APIs, UI, tests, docs, or migration work.

Start a separate stack for:

- a different feature;
- an unrelated bug fix;
- an independent refactor;
- parallel work that does not depend on the current chain.

A trivial incidental correction can ride in the layer that owns the affected concern. Once it grows
into an independently reviewable project, give it its own stack.

## Review the plan

Before implementation, inspect the proposed chain as a reviewer would:

```text
Trunk <- foundation <- behavior <- integration
```

For every arrow, state why the right layer depends on the left. If the dependency cannot be stated,
merge or reorder the layers. If two branches are parallel rather than dependent, they do not belong
in one linear stack.

Completion criterion: every change maps to one owner layer, every dependency points toward trunk,
each direct diff is reviewable, and the entire chain describes one coherent outcome.
