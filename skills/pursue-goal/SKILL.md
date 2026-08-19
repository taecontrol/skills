---
name: pursue-goal
description: Pursue one durable goal through collaboratively accepted checkpoints, one fresh session at a time.
disable-model-invocation: true
---

# Pursue Goal

Pursue one durable goal through a temporary project-local cockpit. Define intended behavior with the human, keep a living checkpoint map, and execute autonomously only inside one accepted checkpoint.

## Core contract

- A **session** is one fresh conversation or context started by the human for either foundation work or one named checkpoint. Another turn in the same conversation remains the same session.
- Use checkpoints only to reduce real uncertainty or produce an independently useful result. Let evidence add, split, remove, or reorder checkpoints throughout the goal.
- Make requirements, boundaries, functional behavior, UI/UX, consequential architecture, and validation strategy collaborative. Treat explicit human acceptance as evidence; silence is an open decision.
- Confine each session to one foundation disposition or one checkpoint disposition. Plan approval never authorizes a checkpoint in the foundation conversation or a later checkpoint in another checkpoint's conversation.
- Begin delivery only from accepted design evidence that makes every material decision for that exact scope settled and judgeable.

## 1. Orient

Inspect repository instructions, canonical product truth, worktree state, and `docs/goals/`. Resume the matching cockpit when one exists. Read its accepted evidence pointers deeply enough to distinguish facts, accepted decisions, assumptions, and open questions.

Completion criterion: the outcome, boundaries, living map, current checkpoint, accepted evidence, and open material decisions can be stated from project artifacts alone.

## 2. Route one session

Choose exactly one branch and read only its linked file:

- For a new goal or material re-grounding, read and follow [`references/foundation-session.md`](references/foundation-session.md). Keep all checkpoint-execution branches out of this session.
- For an accepted **definition** checkpoint, accept the checkpoint start below, then read and follow [`references/definition-checkpoint.md`](references/definition-checkpoint.md).
- For an accepted **delivery** checkpoint, read and follow [`references/delivery-checkpoint.md`](references/delivery-checkpoint.md). It adds readiness to the checkpoint start proposal and accepts both in one response.
- For an accepted **closure** checkpoint, accept the checkpoint start below, then read and follow [`references/closure-checkpoint.md`](references/closure-checkpoint.md).

Each linked branch contains the complete steps and completion criteria for that session. Leave unselected branches unread so their later work cannot pull the current session forward.

## 3. Accept the checkpoint start

For every non-foundation session, build one concise checkpoint-start proposal from the cockpit's complete current-checkpoint record:

- ID, type, and requirement or question;
- accepted dependency evidence by pointer;
- deliverable, boundaries, and non-goals;
- observable `Done when` proof; and
- exact human collaboration promised in this session.

For definition and closure, present this proposal and wait for explicit human acceptance. For delivery, enter the selected branch first; it adds readiness to this proposal and owns the single start approval.

Record the response in the canonical map entry before execution. When the human changes the proposal, update that entry and present the complete revision. When a dependency is missing, record the gap and propose the checkpoint that resolves it.

Completion criterion: the cockpit links the complete start proposal and an unambiguous human response accepting it; for delivery that single response also accepts the linked readiness record. Otherwise execution has not started.

## Cockpit

Use the repository's established equivalent when present; otherwise keep `docs/goals/<goal-slug>/` as a temporary resumption cockpit. Keep canonical code, tests, and durable documentation in their normal locations.

```text
docs/goals/<goal-slug>/
  goal.md
  <checkpoint artifacts and evidence>
```

Keep each fact in one authoritative place and use pointers elsewhere:

```markdown
# Goal

## Outcome and final proof
## Boundaries and exclusions
## Must preserve

## Requirements
<requirement IDs, status, and canonical evidence pointers>

## Checkpoint map
<one canonical record per checkpoint: ID; type; requirement or question; dependencies and accepted evidence pointers; deliverable; boundaries; non-goals; Done when; human collaboration; contract-acceptance pointer; result-evidence pointer; status>

## Current checkpoint
<one accepted checkpoint ID pointing to its map entry, or none>

## Decision and evidence index
<pointers to accepted design and rationale; do not restate their content>

## Open questions and risks
## Next-session prompt
```

Record map changes and decision supersessions instead of silently rewriting accepted history. A fresh agent and the human must be able to recover what is accepted, why, what remains open, and which single checkpoint a new session may run.

## Accepted result and automatic commit

Checkpoint start approval authorizes execution. Result acceptance authorizes commit. When a branch presents completed work or final proof, wait for explicit human acceptance. Incorporate requested corrections inside the same checkpoint and present the complete result again.

After result acceptance, finish the branch's cockpit updates and handoff, then commit automatically:

1. Record the human acceptance beside the result evidence.
2. Inspect repository status and diff. Stage only files or hunks owned by this session, including its cockpit bookkeeping.
3. Re-run any proof affected by final corrections or bookkeeping.
4. Inspect the staged diff and create one focused commit using the repository's conventions.
5. Report the commit ID with the checkpoint disposition. Stop after the commit. Pushing, amending, and starting another checkpoint require separate authorization.

When the session produces no repository change, record and report that fact instead of creating an empty commit. Diagnose and repair commit failures. If the failure remains blocked, report the exact error and leave the disposition blocked.

Completion criterion: every accepted, repository-changing disposition ends in a verified focused commit containing only session-owned changes, or an explicit recorded blocker.

## Definition and delivery handoff

After a definition or delivery branch completes, update its single map entry with status and result-evidence pointers. Add, split, remove, or reorder future checkpoints with human acceptance whenever current evidence justifies the change; execute none of them in this conversation. Set `Current checkpoint` to at most one accepted next ID and write an exact prompt that starts it in a fresh conversation.

Present the current checkpoint disposition, evidence, residual uncertainty, map changes, and recommended next checkpoint. End work on the goal for this conversation.

Completion criterion: the cockpit contains one definition or delivery checkpoint disposition and a self-sufficient fresh-session handoff, with no later checkpoint executed. Foundation and closure use their branch-specific completion criteria instead.
