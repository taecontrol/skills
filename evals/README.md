# Evals

Replay a real feature from the owner's history under different ways of working, and score what each one ships. The first question these evals answer: does writing tests change the outcome when every way of working must design the code well and prove it works?

An eval run builds one **case** with each **arm**, under one **configuration** of models, then has a **council** score every result.

- **Case**: a real feature, replayed from the commit before it was built. Two phases: the feature, then the feature that came after it, built on top by a fresh agent. Phase 2 shows how easy the code was to change and what broke. Cases live in `cases/`.
- **Arm**: a way of verifying the work. The arms share [`arms/common.md`](arms/common.md) and differ only in tests:
  - [A, no tests](arms/a-no-tests.md);
  - [B, expect tests](arms/b-expect-tests.md);
  - [C, current flow](arms/c-current-flow.md), meaning `deliver` with acceptance tests first.
- **Configuration**: which model plays each role in an arm.
  - **Lead** receives the brief and owns the result.
  - **Implementer** writes the code; when it is the lead's model, the lead implements itself.
  - **Reviewer** runs `refine` in arm C.

  Write each model with its options, such as `gpt-6.2-sol max ultrafast` or `claude-opus-5-5 high`.
- **Council**: three judges per area, each working alone. The areas are [correctness](council/correctness.md), [design](council/design.md) and [proof](council/proof.md). The judges stay the same across runs, so scores compare: `claude-opus-5-5 high`, `claude-fable-5-2 high`, `gpt-6.2-astra high`.

The skills under test are the ones installed on the machine. To evaluate a skills change, install that version first and record its commit in the results.

## Run

You are the runner: you set up, launch, collect and score. You do not help an arm, and you do not tell an arm or a judge which arm a result came from.

1. **Set up each arm.** Create a worktree of the case's repository at its base commit, one per arm. Copy the phase's inputs into `.work/<phase>/` inside it. The case's `hidden-checks.md` and `history/` never enter a worktree. Give each worktree a neutral name such as `run-1`, assigned at random, and keep the mapping to arms in your notes.
2. **Launch phase 1.** Start one lead per arm, in parallel, in its worktree, with the configured model. Its brief is `arms/common.md`, then its arm's file, then the phase's spec path, and the implementer's and reviewer's models when they differ from the lead's. Record start and end times. Agents started with `delegate_task` begin in this repository, where the hidden checks live, so every brief names the worktree as the only place to read.
3. **Check.** When every arm is done, run the case's hidden checks against each worktree with one checker agent per worktree: `claude-sonnet-5-5 high`, following `hidden-checks.md`, and returning pass or fail per check with evidence.
4. **Convene the council.** For each worktree and area, start the three judges. Each brief is `council/common.md`, then the area's file, then the phase's spec and the worktree path. That is nine judges per worktree. Collect their JSON. Correctness and proof judges each run the product and a browser, so start them in waves the machine can carry; a starved machine makes timeouts that look like bugs.
5. **Run phase 2.** Start a fresh lead per arm in the same worktree with phase 2's spec, then repeat steps 3 and 4. In phase 2 the hidden checks include phase 1's, so a regression shows.
6. **Score.** Write `results/<date>-<configuration-name>.md` from [`results/TEMPLATE.md`](results/TEMPLATE.md).

**Done** when every arm finished both phases, or stopped with its reason recorded, and the results file has every cell filled, with each confirmed bug carrying its reproduction.

## Reading the council

- **A bug counts as confirmed** when its steps reproduce on a rerun. Collect every bug that only some judges or checks reported, and give each worktree's list to one verifier on the most capable model, which reruns the steps from a fresh seed and sets the severity. Report a disagreement between judges as one, not as an average.
- **Expect correctness judges to disagree.** In the pilot one judge gave 4 and another 10 to the same build, because only one of them navigated between screens. The hidden checks and the three different models are what make the count trustworthy.
- **A false claim** is a proof entry that says an example works when a judge or a hidden check shows that it does not.
- **Scores** are the median of the three judges, with the spread next to them.

## When the eval gets too easy

When every arm scores full marks on the hidden checks and the council confirms no bug, across two runs, the case no longer separates the arms. Add a harder case: a feature from the history whose real bugs were harder to find.

## Add a case

A case is a folder in `cases/` with:
- `case.md`: the repository, the base commit, how to launch the product with the case's data, and where each phase's inputs are;
- `phase-1/` and `phase-2/`: what the arms receive, such as the accepted spec, program design and data;
- `hidden-checks.md`: what the real history says broke, and the examples most likely to break, as steps with an expected observation;
- `history/`: what happened in the real delivery, for the runner only.

Keep secrets and personal data out: no tokens, account IDs or real household data. Seed data must be synthetic.
