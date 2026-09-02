# Collaborative design

Use this for every new goal and whenever delivery evidence invalidates part of an accepted design. The outcome is an accepted design baseline and complete implementation-slice batch, not production code.

## Establish the design workspace

Inspect repository instructions, canonical product truth, durable coding-standard sources, current behavior, worktree state, prior decisions, project profile, goal map, candidate lineage, and evidence. Record only facts and decisions with an authority source. Investigate repository facts, feasibility, and empirical behavior instead of asking the human to supply them.

For a new goal, create the smallest useful project profile and goal map in the repository's established location. If none exists, use `.goals/<goal-slug>/` at the repository root.

Give the profile a versioned identity. Record executable gates, protected surfaces, faithful product drivers and environments, architecture constraints, Git and external-effect policy, harness limits, gate dispositions, available isolation capacity, and each applicable coding-standard source by durable path and repository revision or content digest. Record `baseline-only` when no project-specific standard exists. Keep maintained standards outside the disposable goal directory and do not infer new policy from existing code.

Give the map its own identity. Record the goal outcome and final observable proof, boundaries, protected behavior, facts, assumptions, proposals, accepted decisions and rationale, open questions, design evidence, phase, risks, blockers, design-baseline identity, slice-batch identity, dependency graph, resource plan, integration order, candidate lineage, and goal-validation disposition.

The canonical design package consists of the design baseline, complete slice batch, execution plan, and goal-validation disposition. Store its content in the goal map or versioned artifacts linked from it under the same goal directory, with one owner for each fact. Each component identity must resolve to one exact revision or content digest. The human-acceptance record names those component identities and the accepted concurrency limit; an identity without recoverable content is invalid.

Completion criterion: the Coordinator can recover the design state, authorities, constraints, and unresolved frontier from durable artifacts alone.

## Complete the applicable design work

Use [design discovery](definition-checkpoint.md) until every applicable design surface is settled enough to define the whole goal. Applicability is determined by the goal, not by which skills happen to be installed:

- use `grilling` for the human-owned material decision frontier;
- use `domain-modeling` for uncertain terms, boundaries, and invariants;
- use `architecture-design` for expensive-to-reverse seams, ownership, persistence, public contracts, security, concurrency, or recovery;
- use the design-only track of `ui-ux-design` for new or materially changed tasks, flows, navigation, states, accessibility, or visual direction;
- use `research`, `spike`, or `prototype` for bounded factual, feasibility, or experiential uncertainty;
- route accepted consequential rationale to `adr` when the completed code and maintained documentation would not preserve why.

For each capability, record its result or a concrete `Not applicable` reason. Do not use a checklist to manufacture work, but do not treat an unexamined surface as settled. Architecture and UI/UX are production inputs when applicable, not cleanup after slicing.

Model human-owned decisions as a dependency tree. Ask every currently answerable frontier decision in one numbered round. Give a recommendation and main consequence for each. Keep dependent questions out until their prerequisites are settled. After each response, record the answer and rationale, update the frontier, and continue discovery on independent settled branches. Silence is not acceptance.

Completion criterion: contracts, domain rules, architecture, UI/UX, validation behavior, boundaries, and protected behavior are accepted or explicitly not applicable; every remaining uncertainty is non-material and safely reversible inside a slice.

## Define the complete slice batch

Only after the design is coherent, derive all currently known production work needed to prove the accepted goal. Present the slices together as one batch. Do not accept or start the first slice while later known work remains hidden or undefined.

Each slice must be a coherent vertical result and record:

- stable identity, user-visible or operational outcome, included and excluded behavior, and protected behavior;
- design decisions, contracts, rules, and evidence it realizes;
- dependencies and the exact accepted output required from each dependency;
- affected surfaces and expected overlap with other slices;
- Implementer proof, applicable profile gates, Verifier obligations, and accepted Product Validator journeys;
- required workspace, data, accounts, ports, services, simulators or emulators, fixtures, and cleanup ownership;
- focused local commit boundary and integration order.

Build a dependency and conflict graph. Propose parallel waves from it, with an independent workspace and resource allocation for every concurrently runnable slice. Propose a maximum concurrency based on available isolation capacity; use three when evidence does not justify another value. The human chooses the limit.

Persist the dependency and conflict graph, parallel waves, integration order, resource plan, cleanup ownership, and concurrency limit as the execution plan.

Record the goal-validation disposition as `Required` or `Per-slice evidence sufficient`. Recommend `Required` when combined behavior can introduce risk not exercised by any slice alone, including shared state, migrations, public contracts, cross-slice journeys, platform assembly, or consequential integration order. For `Required`, define the combined journeys, faithful environment, gates, and evidence before delivery. For `Per-slice evidence sufficient`, state why integration creates no additional material behavior to judge.

Completion criterion: the batch covers the accepted goal without overlapping ownership, every dependency and resource conflict is explicit, ready slices are independently judgeable, and the validation disposition is evidence-backed.

## Obtain one design acceptance

Play back the complete design package:

1. goal outcome, boundaries, protected behavior, and final proof;
2. material product, domain, architecture, UI/UX, security, data, and validation decisions with rationale;
3. relevant contracts, rules, designs, rendered evidence, assumptions, risks, and explicit non-applicability decisions;
4. the complete implementation-slice batch;
5. dependency graph, parallel-wave proposal, integration order, resource-isolation plan, and concurrency limit;
6. goal-validation disposition and, when required, its combined journeys.

Use `grilling` to close the remaining frontier and obtain explicit human acceptance of the design package. Persist immutable design-baseline, slice-batch, execution-plan, goal-validation-disposition, and human-acceptance identities. Requested changes reopen the affected design work and require playback of the complete revised design package.

No production edit, slice dispatch, or delivery work may begin without this acceptance. Acceptance authorizes the recorded local slice lifecycles through focused commits; external effects remain separately controlled.

Completion criterion: the durable map identifies one explicitly accepted design baseline and complete slice batch, the human-selected concurrency limit, the resource and integration plan, and the goal-validation disposition.
