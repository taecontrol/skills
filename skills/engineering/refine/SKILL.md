---
name: refine
description: "Review a working change with fresh agents against its spec, group what they find by cause, and fix at the causes without changing the behavior its acceptance tests lock, in at most three rounds. Use after a change works and before it ships, or when asked to review or improve a branch."
---

# Refine

The change works; now **make it right, make it fast**. You **orchestrate** the rounds: fresh agents review the change, find the causes behind what the review found, and fix them, while you carry results between them and put decisions to the human. You fix nothing yourself. Each agent's brief is a template in `references/` with its `<placeholders>` filled in. That brief is all the agent knows, so pass it paths and the other agents' output as written, without your summary of it and without a remedy of your own.

Your inputs are the worktree, the spec or the request when there is none, the diff range, and the delivery's report with its evidence and assertion changes, when there is one. The reviewers and the cause agent run on a model other than the one that wrote the code, as the human's instructions say.

## Round

1. **Review.** Start a fresh reviewer with [reviewer.md](references/reviewer.md). On a large change, start several, each with one or two of its lenses across the whole change, and give the tests and mutations a reviewer of their own. Done when every reviewer has written its findings.
2. **Causes.** Give all the round's findings, together, to one fresh agent with [causes.md](references/causes.md). It checks each finding against the code and groups them by the choice that produces them, into cause fixes, scope decisions for the human, and local fixes. Done when its grouping is written.
3. **Decide.** Put each scope decision to the human as `deliver`'s Questions section says, with the cause agent's options and recommendation.
4. **Fix.** Start a fresh fixer with [fixer.md](references/fixer.md), the review, and the grouping, without waiting for the human's answers; send it each answer as it arrives. The grouping is the fixer's plan. When the fixer reports a finding back because its fix needs something the grouping did not name, give that report and the grouping to a fresh cause agent, and take its answer to step 3. Done when every finding is fixed, a report line, or a decision with the human's answer or left open, and the gates pass.

## Next round

Only blockers start another round, up to three in all. Its review covers the range of the previous round's fixes and the code they reach: a fix is new code no review has seen. Give its cause agent the earlier rounds' groupings too, so a blocker still waiting on the human stays open until it is fixed or the human decides it. When a review finds no blocker, have its fixes made, run the gates, and finish.

A sound spec and a sound delivery converge within three rounds. If the third review still finds a blocker, stop, even when the human said to go on without stopping: the flow failed, not just the code. Report the blockers and what let them through, such as a guarantee never written, a link missing from its path, a missing example, a wrong decision, or a gap in the environment.

## Report

Leave for the delivery's report, or for the human when nothing else will report: the rounds; each finding and how it ended, as a cause fix, a local fix, a report line, or a decision with its answer; the mutations and their results; the checks added with the defects they generalize; and the follow-ups.

## Done

The last review found no blocker and its fixes are made, every `test` example and every link of each guarantee's path has a test that goes red when it breaks, the project's gates pass on the final state, no blocker is waiting on a decision, and every other scope decision has the human's answer or is in the report as open.
