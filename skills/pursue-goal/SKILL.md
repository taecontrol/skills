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
- For an accepted **delivery** checkpoint, read [`references/delivery-checkpoint.md`](references/delivery-checkpoint.md) and follow its combined checkpoint-contract and readiness start gate. Do not run a separate contract gate first.
- For an accepted **closure** checkpoint, accept the checkpoint start below, then read and follow [`references/closure-checkpoint.md`](references/closure-checkpoint.md).

Each linked branch contains the complete steps and completion criteria for that session. Leave unselected branches unread so their later work cannot pull the current session forward.

## 3. Accept the checkpoint start

For every non-foundation session, present one concise but complete checkpoint-start proposal from the cockpit's current-checkpoint record:

- ID, type, and requirement or question;
- accepted dependency evidence by pointer;
- deliverable, boundaries, and non-goals;
- observable `Done when` proof; and
- exact human collaboration promised in this session.

For delivery, inspect readiness before presenting this proposal. Include its verdict and only material caveats alongside the contract; keep the exhaustive readiness evidence in the cockpit. The same human response accepts both the checkpoint contract and readiness. Never stop for a second readiness presentation or approval.

Wait for explicit human acceptance of the exact start proposal and record the response in its canonical map entry before execution. When the human changes the proposal, update that entry and present the complete revision for acceptance. When a dependency is missing or delivery is not ready, record the gap and propose the appropriate checkpoint instead of executing the blocked one.

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

Starting a checkpoint and accepting its result are different decisions. When a branch presents completed work or final proof, wait for explicit human acceptance of that result. Incorporate requested corrections inside the same checkpoint and present the complete result again.

After result acceptance, finish the branch's required cockpit updates and handoff, then commit automatically without asking for separate commit permission:

1. Record the human acceptance beside the result evidence.
2. Inspect repository status and diff. Stage only files or hunks owned by this session, including its cockpit bookkeeping; never absorb unrelated human changes.
3. Re-run any proof that the final bookkeeping or corrections could affect, inspect the staged diff, and create one focused commit using the repository's commit conventions.
4. Report the commit ID with the checkpoint disposition. Do not amend, push, or start another checkpoint unless separately authorized.

When the session produces no committable repository change, record and report that fact instead of creating an empty commit. A commit failure is a blocker to report and repair, not a reason to ask whether the accepted work should be committed.

Completion criterion: every accepted, repository-changing disposition ends in a verified focused commit containing only session-owned changes, or an explicit recorded blocker.

## Definition and delivery handoff

After a definition or delivery branch completes, update its single map entry with status and result-evidence pointers. Add, split, remove, or reorder future checkpoints with human acceptance whenever current evidence justifies the change; execute none of them in this conversation. Set `Current checkpoint` to at most one accepted next ID and write an exact prompt that starts it in a fresh conversation.

Present the current checkpoint disposition, evidence, residual uncertainty, map changes, and recommended next checkpoint. End work on the goal for this conversation.

Completion criterion: the cockpit contains one definition or delivery checkpoint disposition and a self-sufficient fresh-session handoff, with no later checkpoint executed. Foundation and closure use their branch-specific completion criteria instead.
