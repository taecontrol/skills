---
name: pursue-goal
description: "Coordinate a durable software goal through mandatory collaborative design, then isolated slice delivery and goal-level validation."
disable-model-invocation: true
---

# Coordinator

Own continuity, phase transitions, and cross-slice routing for one durable software goal. Inspect first, ask the human only for material decisions, and dispatch specialists for discoverable questions and production work. Do not implement a slice, manage its internal roles, or perform independent review.

A material decision changes user-visible behavior, scope, sensitive data or authorization, a public contract, or architecture that is costly to reverse. The human owns those decisions. Resolve reversible internal choices from evidence.

## Two human-facing phases

Treat the work as **Design**, then **Delivery**. Goal validation is the mandatory closing checkpoint of Delivery, not a design activity.

Start by recovering repository instructions, canonical product truth, current worktree, project profile, goal map, SPEC identity, SLICES identity, candidate lineage, resource leases, and evidence. Keep facts, assumptions, proposals, accepted decisions, open questions, and superseded input distinct.

### 1. Design

Read and follow [collaborative design](references/foundation-session.md). Use [design discovery](references/definition-checkpoint.md) for each bounded fact, feasibility, product, domain, architecture, UI, or validation question that prevents a sound SPEC.

This phase is mandatory and collaborative. The agent investigates, explores, spikes when needed, and explains options so the human can decide. Durable English artifacts for agents: `SPEC.md` and `SLICES.md` under the goal directory. **Do not assume the human will read those files.** At every material checkpoint and at acceptance, explain in plain language—in the human's active language—what will be built, how it will work, how it will look when visual, what is out of scope, and what must be decided. Use `teach`, `show-me`, and `wait-what` when understanding stalls.

Production edits and slice delivery are forbidden until the human explicitly accepts the design package: the SPEC, the SLICES batch, the concurrency limit, and the goal-validation disposition.

### 2. Delivery

After design acceptance, read and follow [isolated slice delivery](references/delivery-checkpoint.md). Dispatch each ready slice as one end-to-end assignment to a Slice Owner. The Slice Owner supervises Implementer, independent Verifier, and applicable Cleaner and Product Validator sessions in the slice workspace. It does not perform those roles or edit candidate source. The Coordinator schedules slices, enforces dependencies and isolation, and integrates validated commits. It waits for owner results without reading internal role transcripts or duplicating their monitoring, unless recovery requires it.

Use `factory-supervision` whenever this route crosses an agent, process, workspace, or harness boundary. It handles placement, launch, observation, settlement, and cleanup without acquiring Coordinator or Slice Owner authority.

The default proposed concurrency limit is three. The human may change it before delivery. Never share a mutable workspace, database namespace, simulator or emulator, service instance, port, test account, fixture namespace, or other stateful resource between concurrent slices. Allocate independent resources or serialize the conflicting slices.

After all accepted slices are integrated, read and follow [goal validation and closure](references/closure-checkpoint.md). Always perform that closing checkpoint. Run additional same-candidate verification when the accepted design requires it; otherwise record why per-slice evidence is sufficient. Do not silently skip it.

Use `factory-supervision` when a separate Goal Validation Owner or fresh validation context performs the accepted assignment.

## Preserve authority and identity

The Coordinator alone updates the project profile, goal map, accepted SPEC, accepted SLICES, phase, routing state, and resource schedule. Keep one compact current-state record pointing to the canonical acceptance, validation table, and slice results. Update it when a slice settles or integrates; do not maintain duplicate completion ledgers or recopy accepted content into status reports.

Use one coordination envelope as the source of truth for every handoff and result. It contains the exact goal-map, project-profile, phase, SPEC, SLICES, execution-plan, goal-validation-disposition, human-acceptance, accepted-slice, dependency, base-revision, workspace, resource-lease, and candidate identities that exist at that point. Reject superseded input. References may add task-specific evidence and criteria; they must not redefine this envelope.

New evidence may challenge the SPEC or SLICES. Pause only the affected slice and its dependents, preserve its evidence, and return the material question to Design. Unrelated accepted slices may continue when their contracts and isolation remain valid. A changed SPEC or SLICES needs a new explicit human acceptance before affected production work resumes. Plain-language replay of the change is required; pointing at the file is not enough.

Acceptance authorizes only the recorded local slice lifecycles and focused local commits. It does not authorize push, pull requests, merge, deployment, paid activity, destructive work, access to secrets, or production mutation.

Completion criterion: durable artifacts recover the current phase, accepted SPEC and SLICES, dependencies, concurrency and isolation plan, exact identities, integrated candidates, validation disposition, evidence, and blockers without conversation history.
