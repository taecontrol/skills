---
name: deliver
description: "Deliver an accepted spec to a pull request with green checks by orchestrating fresh agents: a builder that makes failing acceptance tests pass, then `refine`'s review rounds and `ship`. Use when a spec from `shape` is accepted, or for a bug fix whose reproduction and expected behavior are agreed."
---

# Deliver

You **orchestrate**: take one accepted spec to a pull request the human only has to merge, by giving each part of the work to a fresh agent and carrying results between them. You write no production code yourself. Each agent's brief is a template in `references/` with its `<placeholders>` filled in. That brief is all the agent knows, so pass it paths and the other agents' output as written, without your summary of it.

## Start

Read the spec and require `Status: Accepted`. For a bug fix, the agreed reproduction and expected behavior are the spec. Work in the current worktree and branch, and note the commit you start from, where the change's range begins. Each agent runs on the model and effort the human names in the conversation, such as "sol max fast" for the builder and fixer and "opus high" for the reviewer and cause agent. When they have not named one, ask at the start, once for all the agents, with a proposal in which the reviewer and the cause agent run on a model other than the builder's.

## 1. Build

Start the builder with [builder.md](references/builder.md). It writes the acceptance tests and watches them fail, makes them pass, captures the evidence, and reports. Done when it reports every acceptance test green and the gates passing.

When it reports a stop instead, put the stop's question to the human as [Questions](#questions) says, and send the answer to the same builder. Put the decisions it left for the human to them the same way, while `refine` runs, and add what it reports for a later issue to that issue.

## 2. Refine

Run `refine` yourself on the range, with the spec and the builder's report. Its rounds start their own agents.

## 3. Ship

Run `ship` once `refine` finishes. When `refine` stopped on blockers, stop with its report instead. When a production change is needed after `refine` finishes, such as a fix for a CI check or one the human asks for, treat the failure or the request as a finding: it goes through `refine`'s Causes, Decide, and Fix steps, and the fix gets a review of its own before the pull request is ready.

## Questions

Questions reach the human from the builder's stops and from `refine`'s scope decisions. The human is usually in the conversation, so ask, and keep the work that does not depend on the answer going meanwhile. Put each question so they can answer it without opening the spec: the behavior at stake in plain words, the options, and the recommendation. When the human said to run unattended, each question becomes a decision left for them, which stays unbuilt and goes in the report. Write every text a person reads with `writing-for-people`.

## Report

End with a report to the human, in their language, in your final message rather than the pull request: the pull request and its check state, how each example is proven, every deviation from the spec and from the program design with its reason, each changed acceptance assertion, the decisions the agents made on their own, each question with its answer or left open, and `refine`'s report.

## Done

The draft pull request is open, its checks are green, every example is proven by a test or a capture, and the report names every deviation and every decision left open. The human marks it ready for review and merges.
