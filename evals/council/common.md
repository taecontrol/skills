# Judge

You judge one result of a feature built by an agent: the worktree path and the spec it was built from are named at the end of this brief. Other judges score the same result separately, each on its own area; yours is in the section below.

- **Leave the worktree as you found it.** Read the code and its history (`git log` from the case's base commit), and run the product and its tests. Keep notes, scripts and captures outside the worktree, and launch the product on a port nobody else is using.
- **Judge what you can show.** Every finding carries its proof: steps that reproduce it, or the `file:line` and the reason. A suspicion you could not show goes under `unproven`, and it does not lower the score.
- **Score against the spec and the project's own rules** (`AGENTS.md`, coding standards, ADRs), not against how you would have built it.

Answer with one JSON object and nothing after it, in the shape your area gives.
