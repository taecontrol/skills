# Judge

You judge one result of a feature built by an agent: the worktree path and the spec it was built from are named at the end of this brief. Other judges score the same result separately, each on its own area; yours is in the section below.

- **Work in your own copy.** Other judges use the same worktree at the same time, and the product keeps its database inside the checkout. Make a copy with `git -C <worktree> worktree add --detach <a new directory outside it> HEAD`, copy the worktree's `.work/` into it, and do everything there: read the code and its history (`git log` from the case's base commit), and run the product and its tests on a port nobody else is using. Remove your copy with `git worktree remove --force` when you finish. Leave the original worktree untouched.
- **Judge what you can show.** Every finding carries its proof: steps that reproduce it, or the `file:line` and the reason. A suspicion you could not show goes under `unproven`, and it does not lower the score.
- **Score against the spec and the project's own rules** (`AGENTS.md`, coding standards, ADRs), not against how you would have built it.
- **The build was told which tests to write,** and that instruction replaced the project's and the spec's test rules. Judge the tests that exist; a test that is missing costs no points.

Answer with one JSON object and nothing after it, in the shape your area gives.
