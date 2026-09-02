# Orca adapter

Use this adapter when Orca owns any relevant worktree, terminal, Run, Task, Dispatch, or resource state.

## Load the live contract

Resolve the Orca executable and load the version-matched `orca-cli` and `orchestration` guides before acting. Confirm the runtime is reachable. Use their current selectors, receipts, recovery actions, and lifecycle commands; do not copy command syntax from this skill or guess it from memory.

If the selected executable or runtime is unavailable, return `Blocked` with its exact error. Do not fall through to another Orca installation or replace Orca state with a native subagent.

## Choose one supervision layer

Use structured Orca orchestration for the outer assignment when the initiating owner must track completion, questions, escalation, or cancellation:

- The goal Coordinator may supervise one Slice Owner per active slice.
- The goal Coordinator may supervise a Goal Validation Owner.
- A Slice Owner may supervise its internal roles through structured Dispatches only when the runtime proves that another generation is allowed and the accepted execution plan selects that topology.

Otherwise use ordinary Orca agent terminals for internal slice roles. A Slice Owner that is already a supervised worker should default to fresh ordinary terminals in its current slice worktree. It waits for and reads each role result before starting the next lifecycle role.

Do not create a Run, Task, or Dispatch as a capability probe. Do not create structured state and then fall back to an ordinary terminal after a depth rejection. If structured nesting is not proven before state creation, use ordinary terminals from the start. Never change Orca's nested-worker setting without explicit human authorization.

Completion criterion: the assignment uses either one structured Dispatch or one ordinary terminal session, never both for the same attempt.

## Place the worker

For a slice already assigned an exclusive Orca worktree, start every internal role in that exact worktree. Do not create role-specific worktrees.

For concurrent slices, the goal Coordinator creates or selects one isolated worktree per slice:

- use child lineage under the integration worktree when the slice belongs to that goal;
- set the Git base to the exact accepted or integrated revision independently from Orca lineage;
- run repository setup according to the repository's configured policy;
- record the complete worktree identity returned by Orca.

For a single slice already running in the correct worktree, create only a fresh agent terminal. Do not create another worktree.

Select the worker harness from the accepted execution plan or capability check. Use Orca's installed agent launcher when it expresses the requested harness, model, and effort. Otherwise use the current guide's custom-terminal path. Do not assume Codex because the initiating owner uses Codex; Cursor, Claude Code, and other available harnesses are valid when they satisfy the role contract.

Completion criterion: Orca reports the intended worktree, exact base, effective agent launcher, and one authoritative terminal handle before assignment delivery.

## Deliver and observe

Wait for the target harness to become ready when startup can race input. Deliver the assignment once.

For a structured Dispatch:

- use the injected lifecycle contract and stable Dispatch route;
- process each delivery before acknowledging it;
- keep waiting through timeouts while the worker remains live;
- accept only the Dispatch-scoped terminal result;
- reuse, retain, release, stop, or abandon the worker through the exact lifecycle operation and recovery action returned by Orca.

For an ordinary terminal:

- tell the worker to print one completion or question envelope as its final response;
- use Orca terminal readiness, read, and send operations from the live guide;
- treat an idle prompt as a read checkpoint, not proof of success;
- inspect the envelope and workspace before accepting completion;
- close only the exact role terminal after preserving its result.

Do not monitor an ordinary full handoff as though it were a Dispatch. Do not accept terminal prose as `worker_done` for structured tracking.

## Integrate and clean up

The Slice Owner settles and closes its internal role terminals after preserving their results. It leaves its slice worktree intact for the goal Coordinator.

The goal Coordinator validates the Slice Owner result, settles the Dispatch, integrates only as allowed by `pursue-goal`, runs the required impact check, and then removes or archives the slice worktree. Before removal, confirm that the commit is integrated or explicitly preserved, no unique changes remain, and every owned resource lease is released.

Keep the integration worktree in progress while the goal has active slices. Update its durable status only when the current phase changes; a completed earlier slice does not complete the program worktree.
