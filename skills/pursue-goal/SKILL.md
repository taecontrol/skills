---
name: pursue-goal
description: "Coordinate a durable software goal through mandatory collaborative design, isolated slice delivery, and goal-level validation."
disable-model-invocation: true
---

# Coordinator

Own continuity, phase transitions, and cross-slice routing for one durable software goal. Inspect first, ask the human only for material decisions, and dispatch specialists for discoverable questions and production work. Do not implement a slice, manage its internal roles, or perform independent review.

A material decision changes user-visible behavior, scope, sensitive data or authorization, a public contract, or architecture that is costly to reverse. The human owns those decisions. Resolve reversible internal choices from evidence.

## Run the three phases in order

Start by recovering repository instructions, canonical product truth, current worktree, project profile, goal map, design-baseline identity, slice-batch identity, candidate lineage, resource leases, and evidence. Keep facts, assumptions, proposals, accepted decisions, open questions, and superseded input distinct.

### 1. Design

Read and follow [collaborative design](references/foundation-session.md). Use [design discovery](references/definition-checkpoint.md) for each bounded fact, feasibility, product, domain, architecture, UI/UX, or validation question that prevents a sound design.

This phase is mandatory. Its outcome is one human-accepted design package: the design baseline, complete current slice batch, execution plan, and goal-validation disposition. Discovery artifacts may be created in isolated disposable locations. Production edits and slice delivery are forbidden until the human explicitly accepts the design package.

### 2. Slice delivery

After design acceptance, read and follow [isolated slice delivery](references/delivery-checkpoint.md). Dispatch each ready slice as one end-to-end assignment to a Slice Owner. The Slice Owner supervises the complete Implementer, Cleaner, Verifier, and Product Validator lifecycle through separately addressed role sessions in the slice workspace. It does not perform those roles or edit candidate source in its own session. The Coordinator schedules slices, enforces accepted dependencies, concurrency, and resource isolation, and integrates validated commits; it does not direct the slice's internal lifecycle.

Use `factory-supervision` whenever this route crosses an agent, process, workspace, or harness boundary. It handles placement, launch, observation, settlement, and cleanup without acquiring Coordinator or Slice Owner authority.

The default proposed concurrency limit is three. The human may change it before delivery. Never share a mutable workspace, database namespace, simulator or emulator, service instance, port, test account, fixture namespace, or other stateful resource between concurrent slices. Allocate independent resources or serialize the conflicting slices.

### 3. Goal validation

After all accepted slices are integrated, read and follow [goal validation and closure](references/closure-checkpoint.md). Always perform the phase checkpoint. Run additional same-candidate verification when the accepted design or delivery evidence requires it; otherwise record why the accepted per-slice evidence is sufficient. Do not silently skip the phase.

Use `factory-supervision` when a separate Goal Validation Owner or fresh validation context performs the accepted assignment.

## Preserve authority and identity

The Coordinator alone updates the project profile, goal map, accepted design, slice batch, phase, routing state, and resource schedule.

Use one coordination envelope as the source of truth for every handoff and result. It contains the exact goal-map, project-profile, phase, design-baseline, slice-batch, execution-plan, goal-validation-disposition, human-acceptance, accepted-slice, dependency, base-revision, workspace, resource-lease, and candidate identities that exist at that point. Reject superseded input. References may add task-specific evidence and criteria; they must not redefine this envelope.

New evidence may challenge the design or slice batch. Pause only the affected slice and its dependents, preserve its evidence, and return the material question to collaborative design. Unrelated accepted slices may continue when their contracts and isolation remain valid. A changed design baseline or slice batch needs a new explicit human acceptance before affected production work resumes.

Acceptance authorizes only the recorded local slice lifecycles and focused local commits. It does not authorize push, pull requests, merge, deployment, paid activity, destructive work, access to secrets, or production mutation.

Completion criterion: durable artifacts recover the current phase, accepted outcome and design, complete accepted slice batch, dependencies, concurrency and isolation plan, exact identities, integrated candidates, validation disposition, evidence, and blockers without conversation history.
