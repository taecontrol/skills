# Collaborative design

Use this for every new goal and whenever delivery evidence invalidates part of an accepted design. The outcome is an accepted English `SPEC.md` and `SLICES.md`, not production code.

## Establish the design workspace

Inspect repository instructions, canonical product truth, durable coding-standard sources, current behavior, worktree state, prior decisions, project profile, goal map, candidate lineage, and evidence. Record only facts and decisions with an authority source. Investigate repository facts, feasibility, and empirical behavior instead of asking the human to supply them.

For a new goal, create the smallest useful project profile and goal map in the repository's established location. If none exists, use `.goals/<goal-slug>/` at the repository root.

Give the profile a versioned identity. Reference the single validation table inside `SPEC.md`; record protected surfaces, faithful product drivers and environments, architecture constraints, Git and external-effect policy, harness limits, gate dispositions, available isolation capacity, and each applicable coding-standard source by durable path and repository revision or content digest. Record `baseline-only` when no project-specific standard exists. Keep maintained standards outside the disposable goal directory and do not infer new policy from existing code.

Give the map its own identity. Record pointers to `SPEC.md` and `SLICES.md`, phase, open questions, design evidence, risks, blockers, candidate lineage, and acceptance state. Prefer the SPEC and SLICES files as the canonical design content; keep the map as the index and current-state pointer, not a second copy of the SPEC.

Durable Design artifacts are written in English. Human conversation uses the human's active language.

Completion criterion: the Coordinator can recover design state, authorities, constraints, and the unresolved frontier from durable artifacts alone.

## Explain to the human, not the file

`SPEC.md` and `SLICES.md` are for agents and later recovery. **Never assume the human will open or read them.**

Whenever options, architecture, flows, UI, boundaries, or acceptance are in play:

1. Explain in plain words what would be built and why.
2. Cover functional flow and, when visual, how it will look.
3. Name what is out of scope and what the human must decide.
4. Offer a clear recommendation and main consequence for each decision.

Use `teach` when the human needs to understand a subsystem or idea before deciding. Use `show-me` for diagrams or visual sketches. Use `wait-what` when they say the last explanation did not land. Pointing at a path is not an explanation.

Completion criterion: a human who never opens the goal directory can still accept or reject the design from conversation alone.

## Complete the applicable design work

Use [design discovery](definition-checkpoint.md) until every applicable design surface is settled enough to write the SPEC. Applicability is determined by the goal, not by which skills happen to be installed:

- use `grilling` for the human-owned material decision frontier;
- use `domain-modeling` for uncertain terms, boundaries, and invariants;
- use `architect` when the goal needs a system or module shape before coding—ground with `how`/`why`, sketch via `arena`, obtain human Agree, and stop without implementing;
- use `architecture-design` for one expensive-to-reverse seam or decision when a full `architect` pass is unnecessary;
- use `research`, `spike`, or `prototype` for bounded factual, feasibility, experiential, or UI comparison uncertainty;
- use `show-me` to make structure or flow visible in conversation;
- route accepted consequential rationale to `adr` when the completed code and maintained documentation would not preserve why.

Record findings and decisions from applicable capabilities. Omit irrelevant specialists without creating a ledger entry for each installed skill. Architecture and UI are production inputs when applicable, not cleanup after slicing.

Model human-owned decisions as a dependency tree. Ask every currently answerable frontier decision in one numbered round. Give a recommendation and main consequence for each. Keep dependent questions out until their prerequisites are settled. After each response, record the answer and rationale, update the frontier, and continue discovery on independent settled branches. Silence is not acceptance.

Completion criterion: contracts, domain rules, architecture, UI, validation behavior, boundaries, and protected behavior are accepted or explicitly not applicable; every remaining uncertainty is non-material and safely reversible inside a slice.

## Write SPEC.md

Create or update `.goals/<goal-slug>/SPEC.md` in English. Use [SPEC template](spec-template.md) as the shape. Keep it concise and complete enough that Delivery can proceed without rediscovering intent.

The SPEC must include, when applicable:

- goal outcome, boundaries, no-goals, and protected behavior;
- functional flows and user-visible behavior;
- architecture: seams, ownership, persistence, public contracts, security, concurrency, recovery;
- UI: tasks, flows, states, and visual direction, with rendered or sketched evidence when visual;
- the validation table (how outcome and regressions will be proved);
- accepted decisions with rationale, assumptions, risks, and explicit non-applicability.

### Validation table inside the SPEC

Keep one validation table in the SPEC. The profile, slice assignments, reviews, and closure reference its gate IDs instead of copying checklists. Separate outcome proof from required repository regression gates: a green suite does not by itself prove the requested improvement.

For each gate, record:

| ID and goal requirement or protected risk | Command or concrete user procedure | Observable pass/fail criterion | Environment, data, and fidelity limits | Execution owner and stage | Expected cost, prerequisites, and rerun inputs |
| --- | --- | --- | --- | --- | --- |

Use the smallest faithful boundary that can distinguish a successful solution from the current behavior or a plausible defect. Prefer existing tests and tools. Add a check only for an uncovered goal requirement or concrete risk of the proposed change.

During Design, confirm that each gate is definable: locate the executable or procedure, note the observation boundary, and record gaps. A short disposable pilot is allowed only to establish whether an existing check is faithful enough to name in the SPEC. **Do not spend Design turning harness or measurement work into the project.** Forbidden unless the goal outcome itself is that harness and the SPEC says so: multi-hour harness repairs, new measurement stacks, or “prove the future improvement” campaigns before the product change exists.

If tooling is missing, record the gate as blocked or deferred with owner and unblock condition, or define the smallest bounded capability spike with an explicit time/cost bound and disposable disposition. Do not build the proposed product solution in Design to make a gate runnable.

For comparative goals, specify baseline, final condition, comparable inputs, and measured interval in the SPEC. Capture available baseline evidence only when it is cheap and non-destructive; otherwise record how baseline will be captured as the first Delivery obligation.

Expose unavailable access, external authorization, expensive setup, and unmeasurable claims before acceptance. Keep accepted gate definitions immutable after acceptance; reopen only when evidence shows the criterion is invalid or requirements change.

Completion criterion: the human has heard, in plain language, what will be built and how success will be judged; `SPEC.md` is coherent, concise, and digest-stable.

## Derive SLICES.md after the SPEC is coherent

Only after the SPEC is coherent, derive all currently known production work needed to prove it. Write `.goals/<goal-slug>/SLICES.md` in English as a separate artifact. Use [SLICES template](slices-template.md) as the shape. Do not accept or start the first slice while later known work remains hidden or undefined.

Each slice must be a coherent vertical result and record:

- stable identity, user-visible or operational outcome, included and excluded behavior, and protected behavior;
- SPEC decisions, contracts, rules, and evidence it realizes;
- dependencies and the exact accepted output required from each dependency;
- affected surfaces and expected overlap with other slices;
- references to validation-table gate IDs, with preparation and independent review responsibilities;
- required workspace, data, accounts, ports, services, simulators or emulators, fixtures, and cleanup ownership;
- focused local commit boundary and integration order.

Assign Product Validation only when a named goal requirement needs independent execution through a real product interface beyond the accepted technical gates. Changed product code alone does not require a second campaign. Record its gate IDs or `Not applicable` with the uncovered-risk rationale.

Build a dependency and conflict graph. Propose parallel waves from it, with an independent workspace and resource allocation for every concurrently runnable slice. Propose a maximum concurrency based on available isolation capacity; use three when evidence does not justify another value. The human chooses the limit.

Persist the dependency and conflict graph, parallel waves, integration order, resource plan, cleanup ownership, and concurrency limit as the execution plan inside or linked from `SLICES.md`.

Record the goal-validation disposition as `Required` or `Per-slice evidence sufficient`. Default to `Per-slice evidence sufficient` for one slice integrated mechanically with unchanged validation inputs. Recommend `Required` only for a named interaction or environment risk not exercised by slice evidence. Define additional obligations before delivery; do not duplicate the slice suite merely to close the goal.

Completion criterion: `SLICES.md` covers the accepted SPEC without overlapping ownership, every dependency and resource conflict is explicit, ready slices are independently judgeable, and the validation disposition is evidence-backed.

## Obtain one design acceptance

Play back in plain language first, then keep `SPEC.md` and `SLICES.md` as the agent record:

1. what will be built, what will not, and how the user will notice success;
2. functional flow and, when visual, how it will look;
3. architecture shape and material tradeoffs;
4. how success will be proved (validation table in plain words: criteria, cost, gaps);
5. how the work is sliced, in what order, with what concurrency;
6. goal-validation disposition.

Use `grilling` to close the remaining frontier and obtain explicit human acceptance of both artifacts together as the design package. Persist immutable SPEC, SLICES, execution-plan, goal-validation-disposition, and human-acceptance identities (exact revisions or SHA-256 digests). Placeholder identities are invalid. Requested changes reopen the affected design work and require a fresh plain-language playback of the revised package.

No production edit, slice dispatch, or delivery work may begin without this acceptance. Acceptance authorizes the recorded local slice lifecycles through focused commits; external effects remain separately controlled.

If only the slice batch must change and the SPEC product intent is unchanged, revise and re-accept `SLICES.md` alone after a plain-language explanation of the batch change. If product, architecture, UI, boundaries, or proof criteria change, revise and re-accept the SPEC (and dependent SLICES).

Completion criterion: the durable map identifies one explicitly accepted SPEC and SLICES pair, the human-selected concurrency limit, the resource and integration plan, and the goal-validation disposition; the acceptance record has no placeholder identity or digest; every accepted component still matches it; and the human accepted from explanation, not from being told to read a file.
