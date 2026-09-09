---
name: factory-supervision
description: "Supervise accepted Factory assignments across agent sessions, workspaces, and harnesses while preserving authority, isolation, independence, and lifecycle evidence. Use when a Coordinator, Slice Owner, or Goal Validation Owner delegates work, runs slices concurrently, or mixes Cursor, Codex, Claude Code, or another harness."
---

# Factory supervision

Execute an already chosen Factory route across agent boundaries. The reader is a Coordinator, Slice Owner, or Goal Validation Owner. The outcome is one settled assignment whose workspace, authority, evidence, and cleanup remain traceable across harnesses.

This skill owns execution placement and supervision. It does not choose product behavior, accept a design, change a slice, update the project profile or goal map, or replace `pursue-goal` and the role skills.

## Prepare the assignment

1. Identify the initiating owner, target role, accepted route, and terminal result expected by that route. Reject a request that gives the target more Factory authority than its role permits.
2. Require one current coordination envelope and one bounded assignment. Read [the execution contract](references/execution-contract.md) for required identities, topology, and capabilities. For a Git-backed filesystem assignment, also read and apply [the preflight contract](references/preflight-contract.md). Reject superseded identities instead of merging them.
3. Inspect the available runtimes and target harnesses. Follow explicit human direction or the accepted execution plan. Otherwise choose only among harnesses that satisfy the role and supervision contract. Do not infer capability from a model or product name.
4. Choose one adapter before creating state:
   - When Orca owns the worktree, terminal, or coordination state, read [the Orca adapter](references/orca-adapter.md).
   - Otherwise read [the native harness adapter](references/native-harness-adapter.md).

Completion criterion: the assignment has one owner, one role, current identities, a valid workspace and resource lease, a capable target harness, and one selected adapter.

## Preserve the topology

- A fresh agent session is not a fresh workspace.
- One active slice has one mutable workspace. Its Implementer and Cleaner use that workspace; its independent Verifier and Product Validator judge the same candidate without creating role-specific mutable workspaces.
- Concurrent slices use isolated workspaces and non-conflicting resource leases.
- A Slice Owner supervises its complete internal lifecycle but does not perform an internal role or edit candidate source in its own session. Implementer, Cleaner, Verifier, and Product Validator use separately addressed sessions in the slice workspace. The goal Coordinator schedules and integrates slices but does not assign or supervise their internal roles.
- A Goal Validation Owner supervises only the accepted read-only combined validation assignment.
- Do not create nested tracking state merely to discover whether nesting is supported. Preflight capabilities first and use an ordinary session adapter when structured nesting is unavailable.

Completion criterion: every mutable actor is attached to the workspace and lease named by its assignment, each lifecycle role has one distinct session identity, the Slice Owner has not edited candidate source, and no second owner manages the same lifecycle transition.

## Launch and supervise

1. Start one target session dedicated to that role, or resume the same Verifier for a bounded re-review. Confirm its workspace, distinct identity from other roles, and current preflight. Initial Verifier and Product Validator contexts must be fresh; a returning Verifier retains only its own review context and declared evidence.
2. Deliver the assignment by a worker-readable path and digest, naming the role and expected result. Keep the coordination envelope, evidence pointers, effects, routing, and cleanup owner in that artifact using [completion envelopes](references/completion-envelopes.md). The worker verifies the digest and reads the assignment; do not duplicate it in the launch prompt. Load role instructions and supporting skills only as needed for the assigned obligations.
3. Wait through the selected adapter. Only the immediate owner monitors internal role activity. Use completion notifications or blocking waits. Poll only when the adapter lacks those capabilities or a concrete liveness fault needs recovery; use backoff and incremental output. The Coordinator consumes Slice Owner results, not the internal worker stream, and does not request checkpoints while a previously reported bounded operation remains healthy. Route results according to `pursue-goal`; forward phase changes, terminal results, and required escalations rather than routine heartbeats.
4. Treat timeout, idle state, heartbeat, or visible activity as liveness evidence, not completion. Do not duplicate a live assignment. A bounded wait for diagnosis or an owner answer uses a nonterminal question/progress record with safe state and resume condition; retain and resume the same role session. A terminal result settles the attempt and must not be used as a pause marker.
5. Accept exactly one terminal result for each attempt. Reject results with stale identities, the wrong role or candidate, sessions shared across roles, missing independence, or undeclared workspace changes. A same-role Verifier continuation is valid under the bounded re-review rule. A mixed-role session invalidates the attempt.

Completion criterion: the initiating owner can reproduce who ran the assignment, in which workspace and harness, against which identities, with what result and evidence.

## Settle and clean up

Settle tracking state before reusing or releasing the session. Preserve inspectable output. Retain a Verifier session with no active validation resources while its findings are repaired, then resume it for re-review. Release it after the slice settles or a fresh full review is required. Release other resources owned by the completed attempt; retain them only with a named reason and cleanup owner.

Do not remove a slice workspace merely because its worker finished. The goal Coordinator removes or archives it only after validating the result, integrating or explicitly preserving its commit, confirming no unique work remains, and releasing its leases.

Return the result envelope and cleanup status to the initiating owner. Do not update accepted decisions, routing, the project profile, or goal map on that owner's behalf.

Completion criterion: the attempt has one terminal state, its evidence remains readable, no obsolete tracking item remains actionable, and every retained resource has an owner and recovery condition.
