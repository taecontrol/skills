# Brief

Build the feature in the spec named at the end of this brief, in the current worktree, from start to finish on your own. Nobody will answer questions during the run.

- **Read first:** the spec, every source its Context and Decisions point to, and the project's `AGENTS.md` and coding standards.
- **Design the code well.** Load `strategic-programming` before you write code. When the phase has an accepted program design, follow it and record each departure with its reason. When it has none, load `program-design` and write yours to `.work/<phase>/program-design.md` before you code.
- **Decide on your own.** Make each choice the spec leaves open yourself. When the spec contradicts itself or the code, take the reading its Decisions and accepted references support. Record each such choice in the proof.
- **Stay local.** Commit on the worktree's branch. The run never pushes, opens a pull request, or touches a remote service or production data.
- **Tests:** your arm's section below sets them. It replaces the test rules in the project's `AGENTS.md` and in the spec's test boundary. Existing tests stay, and they pass.
- **Review:** when the feature works, run `refine` in a fresh context, such as a subagent, with the configured reviewer's model. Every arm gets this review, so the arms differ only in tests.
- **Gates:** the project's gates pass on your final commit (`vp run verify` here).

## Proof of work

Write `.work/<phase>/proof.md` with one entry per example in the spec, and one per sequence the review drove. Each entry holds:
- the **claim**: works, does not work, or not verified;
- **how you showed it**: the steps or command you ran against the product;
- **what you observed**: an output excerpt, or the path of a capture under `.work/<phase>/evidence/`.

Every claim comes from the running product at your final commit. Someone else will check each claim against the product, so state only what you saw. Say in the proof how to start the product and seed it with the spec's data, so someone else can repeat it.

## Finish

End with a short report: done or stopped, the final commit, what you decided on your own, and anything you know is wrong or unverified.
