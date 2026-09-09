# Collaborative design

Use this for every new goal and whenever delivery evidence invalidates part of an accepted design. The outcome is an accepted design baseline and complete implementation-slice batch, not production code.

## Establish the design workspace

Inspect repository instructions, canonical product truth, durable coding-standard sources, current behavior, worktree state, prior decisions, project profile, goal map, candidate lineage, and evidence. Record only facts and decisions with an authority source. Investigate repository facts, feasibility, and empirical behavior instead of asking the human to supply them.

For a new goal, create the smallest useful project profile and goal map in the repository's established location. If none exists, use `.goals/<goal-slug>/` at the repository root.

Give the profile a versioned identity. Reference the single validation table defined below; record protected surfaces, faithful product drivers and environments, architecture constraints, Git and external-effect policy, harness limits, gate dispositions, available isolation capacity, and each applicable coding-standard source by durable path and repository revision or content digest. Record `baseline-only` when no project-specific standard exists. Keep maintained standards outside the disposable goal directory and do not infer new policy from existing code.

Give the map its own identity. Record the goal outcome and final observable proof, boundaries, protected behavior, facts, assumptions, proposals, accepted decisions and rationale, open questions, design evidence, phase, risks, blockers, design-baseline identity, slice-batch identity, dependency graph, resource plan, integration order, candidate lineage, and goal-validation disposition.

The canonical design package consists of the design baseline, complete slice batch, execution plan, and goal-validation disposition. Store its content in the goal map or versioned artifacts linked from it under the same goal directory, with one owner for each fact. Prefer one design-package artifact with named sections over separate documents for each component. Each component identity must resolve to one exact revision or SHA-256 digest. The human-acceptance record names those component identities, their exact revisions or digests, and the accepted concurrency limit. Placeholder identities or digests such as `updated after this record` are invalid.

Keep accepted component content immutable. A component may retain a pre-acceptance status header only when the acceptance record explicitly identifies that exact content and states that it changes the component's lifecycle status. The current-state section of the goal map must mark earlier frontiers, proposals, and questions as historical, resolved, or superseded. Before dispatch, recompute every accepted digest and reject a mismatch instead of repairing or merging the package in place.

Completion criterion: the Coordinator can recover the design state, authorities, constraints, and unresolved frontier from durable artifacts alone.

## Complete the applicable design work

Use [design discovery](definition-checkpoint.md) until every applicable design surface is settled enough to define the whole goal. Applicability is determined by the goal, not by which skills happen to be installed:

- use `grilling` for the human-owned material decision frontier;
- use `domain-modeling` for uncertain terms, boundaries, and invariants;
- use `architecture-design` for expensive-to-reverse seams, ownership, persistence, public contracts, security, concurrency, or recovery;
- use `research`, `spike`, or `prototype` for bounded factual, feasibility, or experiential uncertainty;
- route accepted consequential rationale to `adr` when the completed code and maintained documentation would not preserve why.

Record findings and decisions from applicable capabilities. Omit irrelevant specialists without creating a ledger entry for each installed skill. Architecture and UI/UX are production inputs when applicable, not cleanup after slicing.

Model human-owned decisions as a dependency tree. Ask every currently answerable frontier decision in one numbered round. Give a recommendation and main consequence for each. Keep dependent questions out until their prerequisites are settled. After each response, record the answer and rationale, update the frontier, and continue discovery on independent settled branches. Silence is not acceptance.

Completion criterion: contracts, domain rules, architecture, UI/UX, validation behavior, boundaries, and protected behavior are accepted or explicitly not applicable; every remaining uncertainty is non-material and safely reversible inside a slice.

## Define how the goal will be proved

Before implementation, keep one validation table in the design package. The profile, slice assignments, reviews, and closure reference its gate IDs instead of copying checklists. Separate outcome proof from required repository regression gates: a green suite does not by itself prove the requested improvement.

For each gate, record:

| ID and goal requirement or protected risk | Command or concrete user procedure | Observable pass/fail criterion | Environment, data, and fidelity limits | Execution owner and stage | Expected cost, prerequisites, and rerun inputs |
| --- | --- | --- | --- | --- | --- |

Use the smallest faithful boundary that can distinguish a successful solution from the current behavior or a plausible defect. Prefer existing tests and tools. Add a check only for an uncovered goal requirement or concrete risk of the proposed change; installed skills and generic quality checklists do not create requirements. Assign one primary execution owner per gate. Independent reviewers judge its evidence and execute only checks assigned to them or needed to resolve a concrete evidence gap.

Check feasibility during design: locate the executable or procedure, confirm its observation boundary and available environment, and use the smallest pilot when execution is needed to establish fidelity. For comparative goals, specify the baseline, final condition, comparable inputs, measured interval or output, and sufficient sampling for the intended claim. Capture available baseline evidence before changing that behavior. If tooling is missing, make the bounded capability work and pilot the first dependency; do not build the proposed solution before establishing how its success can be observed.

Expose unavailable access, external authorization, expensive setup, and unmeasurable claims before acceptance. Preparation for an external gate may proceed locally; actual external actions still require their own authority. A substitute must prove the same requirement or carry a narrower claim, never silently replace the outcome gate.

Keep accepted gate definitions immutable; execution results reference the same IDs in the slice result record. Reopen a gate definition only when evidence shows its criterion is invalid or a changed requirement or risk needs different proof. The Coordinator records the reason; seek human direction for changed scope, success criteria, material cost, or external authority, not routine invocation fixes. Unrelated findings do not expand the table. Stop validation when the accepted criteria are satisfied.

Completion criterion: the human can see what will prove the goal, which regressions must remain green, what each check costs, and what cannot yet run; every gate has a concrete criterion and owner before implementation.

## Define the complete slice batch

Only after the design is coherent, derive all currently known production work needed to prove the accepted goal. Present the slices together as one batch. Do not accept or start the first slice while later known work remains hidden or undefined.

Each slice must be a coherent vertical result and record:

- stable identity, user-visible or operational outcome, included and excluded behavior, and protected behavior;
- design decisions, contracts, rules, and evidence it realizes;
- dependencies and the exact accepted output required from each dependency;
- affected surfaces and expected overlap with other slices;
- references to validation-table gate IDs, with preparation and independent review responsibilities;
- required workspace, data, accounts, ports, services, simulators or emulators, fixtures, and cleanup ownership;
- focused local commit boundary and integration order.

Assign Product Validation only when a named goal requirement needs independent execution through a real product interface beyond the accepted technical gates. Changed product code alone does not require a second campaign. Record its gate IDs or `Not applicable` with the uncovered-risk rationale. Judge effects rather than filenames; drivers and operational changes can require real-interface proof. An explicitly accepted journey remains binding until its owner revises it.

Build a dependency and conflict graph. Propose parallel waves from it, with an independent workspace and resource allocation for every concurrently runnable slice. Propose a maximum concurrency based on available isolation capacity; use three when evidence does not justify another value. The human chooses the limit.

Persist the dependency and conflict graph, parallel waves, integration order, resource plan, cleanup ownership, and concurrency limit as the execution plan.

Record the goal-validation disposition as `Required` or `Per-slice evidence sufficient`. Default to `Per-slice evidence sufficient` for one slice integrated mechanically with unchanged validation inputs. Recommend `Required` only for a named interaction or environment risk not exercised by slice evidence, such as shared state, migrations, cross-slice journeys, or platform assembly. Define the additional obligations, applicable journeys, environment, and gates before delivery; do not duplicate the slice suite merely to close the goal.

Completion criterion: the batch covers the accepted goal without overlapping ownership, every dependency and resource conflict is explicit, ready slices are independently judgeable, and the validation disposition is evidence-backed.

## Obtain one design acceptance

Play back the complete design package:

1. goal outcome, boundaries, protected behavior, and the validation table: concrete success criteria, methods, environments, owners, expected cost, and missing prerequisites;
2. material product, domain, architecture, UI/UX, security, data, and validation decisions with rationale;
3. relevant contracts, rules, designs, rendered evidence, assumptions, risks, and explicit non-applicability decisions;
4. the complete implementation-slice batch;
5. dependency graph, parallel-wave proposal, integration order, resource-isolation plan, and concurrency limit;
6. goal-validation disposition and, when required, its combined journeys.

Use `grilling` to close the remaining frontier and obtain explicit human acceptance of the design package. Persist immutable design-baseline, slice-batch, execution-plan, goal-validation-disposition, and human-acceptance identities. Requested changes reopen the affected design work and require playback of the complete revised design package.

No production edit, slice dispatch, or delivery work may begin without this acceptance. Acceptance authorizes the recorded local slice lifecycles through focused commits; external effects remain separately controlled.

Completion criterion: the durable map identifies one explicitly accepted design baseline and complete slice batch, the human-selected concurrency limit, the resource and integration plan, and the goal-validation disposition; the acceptance record has no placeholder identity or digest; every accepted component still matches it; and no stale section is presented as the current frontier.
