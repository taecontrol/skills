# Isolated slice delivery

Use this only after the human has accepted the complete design baseline, slice batch, concurrency limit, resource plan, and goal-validation disposition. The Coordinator schedules whole slices; a Slice Owner supervises each accepted slice end to end.

## Schedule without overlap

Confirm the accepted identities and recompute readiness from the dependency graph. A slice is ready only when every required dependency output is integrated or the accepted contract explicitly permits parallel work from the same base.

Maintain at most the accepted number of active Slice Owners. The default proposal is three, not an instruction to exceed proven isolation capacity. Start ready slices from the accepted parallel waves, then adjust scheduling when evidence reveals a dependency or resource conflict. Changing order is allowed when contracts remain intact; changing a slice or design decision requires a revised accepted batch.

Before dispatch, allocate and record:

- an independent workspace or worktree, branch, and base revision;
- unique or exclusively leased database instances, schemas, data namespaces, service instances, ports, queues, buckets, caches, fixture roots, temporary directories, test accounts, and other mutable state;
- one exclusive simulator, emulator, device, browser profile, desktop session, or other stateful driver when it cannot be safely namespaced;
- build-output and dependency-cache rules that prevent writes from affecting another slice;
- cleanup ownership, lease duration, and a safe recovery procedure.

Never let concurrent slices share mutable state by convention or timing. If a resource cannot be namespaced or leased exclusively, serialize its users. Validate ownership before cleanup and preserve user-owned instances and data.

Completion criterion: every active slice has a ready dependency state, isolated workspace, non-conflicting resource lease, and recorded cleanup owner.

## Dispatch one complete slice

Give one Slice Owner the current coordination envelope. Reference protected behavior, design and contract pointers, assigned validation-table gate IDs, commit boundary, and evidence destination. Do not create a second validation plan.

Use `factory-supervision` to place and supervise the Slice Owner. The Slice Owner uses it again when an internal role crosses an agent or harness boundary. The supervision adapter executes the route defined here; it does not choose lifecycle transitions or acquire either owner's authority.

The Slice Owner owns delivery routing inside that boundary. It selects the agents, models, and separately addressed sessions that perform implementation, cleaning, technical verification, product validation, diagnosis, and repair. The Coordinator must not assign those internal roles or require approval between their routine transitions.

The Slice Owner session is coordination-only. It may create assignments and evidence ledgers, inspect repository and worker state, route results, stage an already frozen candidate when the accepted protocol assigns that step to it, and create the final commit after every required pass. It must not edit candidate source, act as an internal role, or claim an internal role result. Implementer and Cleaner each run in their own addressed sessions. Verifier and Product Validator initially run in fresh independent sessions; bounded Verifier re-review may retain its own session. A session may not claim more than one lifecycle role for the same slice attempt.

Reject the attempt before accepting candidate evidence when the Slice Owner edits candidate source, a role result names another role, two roles use the same session identity, or a required prior-role result is missing. Preserve the workspace and route a new attempt through the correct role session; do not bless the mixed session after the fact.

Role independence still applies:

- Implementer may not act as the independent Verifier or Product Validator for its own candidate.
- Implementer and Cleaner are separately addressed sessions. Cleaner may repair but may not approve the candidate it changed.
- Verifier starts fresh and remains independent and read-only, including on bounded re-review.
- Product Validator is fresh and independent from Implementer, Cleaner, and Verifier. It cannot change the candidate or contract; it may mutate only validation state owned by its recorded resource lease.

The Slice Owner reports meaningful phase changes and its terminal result. It interrupts the Coordinator only for `Resynchronize` or `Blocked`. Routine logs, heartbeats, and report-writing progress stay with the immediate owner.

Completion criterion: the Slice Owner can supervise the complete lifecycle without guessing, editing candidate source, reusing one session for multiple roles, sharing mutable state, or requiring further routing from the Coordinator.

## Run the internal lifecycle

Run each applicable numbered role in its recorded session. The Slice Owner waits for and validates one terminal result before starting the next role. A candidate change requires renewed downstream approval; unaffected gate evidence may carry forward as described below.

1. **Implementer:** create the smallest coherent end-to-end behavior and focused observable proof inside the allocated workspace. When the accepted slice includes a product-control capability gap, create or reconcile the project-local verification CLI and Feature Map through `verification-adapter` in the same candidate. When Cleaner is omitted, materialize the candidate and satisfy the applicable gates before returning `Implemented`.
2. **Cleaner, when needed:** repair local correctness and design defects, materialize the candidate, and satisfy applicable gates. Use a separate Cleaner when a concrete preparation or repair need exists, when the accepted profile requires it, or after `Repair` or product `Fail`. Otherwise route a ready Implementer candidate directly to Verifier; the subject area alone does not require another preparation pass. This changes preparation ownership, not the independent approval requirement.
3. **Verifier:** independently judge the exact materialized candidate through `implementation-review`. Its predecessor is Cleaner `Ready` or Implementer `Implemented` with complete materialization and gate evidence. `Repair` returns inside the slice to Cleaner. `Pass` advances to Product Validator when applicable; otherwise it makes the candidate eligible for commit.
4. **Product Validator, when applicable:** establish evidence for every accepted journey through the named real product interface on the same Verifier-passed candidate through `use-case-qa`, using execution or the evidence-reuse rule below. `Fail` returns inside the slice to Cleaner. `Pass` makes that candidate eligible for commit. When the accepted slice records Product Validation as not applicable, preserve that disposition and do not manufacture a journey.

A Cleaner change creates a new candidate identity, reruns affected gates, and returns to Verifier. When Product Validation applies, rerun journeys whose consumed inputs or exercised behavior changed. The independent Product Validator may carry forward its prior passing evidence with an explicit applicability reason and original execution identity. Rerun when applicability is uncertain or the accepted gate requires a complete final run. Diagnostic runs do not become acceptance evidence by relabeling.

Materialize source with a retained Git tree and base revision, or a complete binary patch with its digest and all new files. Use a private index if needed to preserve the user's staging. Include dependency locks, configuration, fixtures, generated-output procedures, and relevant driver/environment identities in one manifest. A digest alone cannot reconstruct missing content; preserve referenced objects or artifacts through review and integration. Full source copies and per-role snapshots are unnecessary when this representation is reproducible.

Reuse passing gate evidence when its consumed inputs are unchanged, with a brief applicability reason. A correction only to an unconsumed report or coordination recipe does not require repeating the suite. Required independent checks still run. Keep primary logs on disk and pass their pointers, hashes, and results rather than copying their contents into every handoff.

Keep coordination identities at the coordination boundary. Goal-map, slice, finding, branch, and disposable-workspace identifiers may identify handoffs and evidence, but must not become names or dependencies in production code, retained tests, fixtures, or maintained documentation unless the project defines them as durable product vocabulary.

Completion criterion: the final immutable candidate has satisfied gates, an independent Verifier pass, and a Product Validator pass for every accepted slice journey when Product Validation applies.

## Repair autonomously

Keep gate results and stable findings in one slice result record referencing the accepted validation table and primary evidence. A stable failure is one gate ID and unmet obligation, one Verifier finding ID, or one Product Validator journey and earliest divergence, all tied to a candidate lineage. Route repairable implementation, test, and local design defects between Cleaner, Verifier, and Product Validator without asking the Coordinator or human for permission.

Classify a failure as product defect, test/driver defect, environment limitation, or invalid criterion before widening repair. Bound tool repair to the capability needed by the accepted gate; further infrastructure work needs an explicit scope decision.

After two unsuccessful repairs of the same stable failure, invoke `diagnosing-bugs` in a fresh context with a project-profile time or scope bound. If no bound exists, set the smallest bound that can distinguish the recorded hypotheses. Route a diagnosed local defect or reversible implementation-design defect to Cleaner. Route a contract gap, invalid accepted decision, or costly-to-reverse architecture gap to `Resynchronize`. Route a missing environment or harness capability to `Blocked` after the diagnosis reaches its bound and every accepted safe resource or substitute has been attempted. A demonstrated capability mismatch follows the project-profile escalation policy; without an authorized alternative it is `Blocked`.

A worker awaiting a bounded diagnosis or owner answer remains paused in the same role and assignment. Record a question, safe resource state, and resume condition; do not emit terminal `Blocked` for that wait. Resume the same worker after the dependency settles, checking only changed assignment, candidate, and resource inputs.

Return only one terminal outcome:

- `Validated commit`: the final candidate passes the lifecycle and the focused local commit exactly matches its validated surface.
- `Resynchronize`: evidence challenges user-visible behavior, scope, sensitive policy, a public contract, costly-to-reverse architecture, the accepted slice boundary, or another human-owned material decision. Name the decision, evidence, affected slices, and safe resume condition.
- `Blocked`: required access, authorization, tool, environment, dependency, isolation, or materialization is unavailable after safe alternatives are exhausted. Name the owner and exact unblock condition.

Failing tests, ordinary implementation choices, Cleaner repairs, Verifier findings, Product Validator failures, and routine diagnostic work are not Coordinator interruptions while they remain repairable within the accepted contract.

## Commit and integrate

After the final required pass, the Slice Owner inspects the staged diff and creates one focused local commit that exactly matches the validated candidate, except permitted coordination-only bookkeeping that cannot affect behavior. It reports the commit, candidate, evidence, resource cleanup, and residual advisory risks to the Coordinator. It does not push or publish.

The Coordinator records the result and integrates validated slice commits in accepted dependency order. It may perform only a clean mechanical integration that does not edit the validated patch. That integration retains slice evidence only when an explicit impact check confirms that no accepted obligation or resource identity changed.

On any conflict, the Coordinator stops without resolving or editing code and dispatches the affected accepted slice to a Slice Owner on the integrated base. The Slice Owner resolves the conflict inside the accepted contract and obtains independent review plus affected gates and journeys, retaining unaffected evidence with its applicability reason. If the conflict exposes a contract or material design gap, it returns `Resynchronize`.

Pause only a resynchronizing or blocked slice and its dependents. Continue unrelated slices when their design, base assumptions, and resource isolation remain valid.

Push, pull-request publication, merge, deployment, paid activity, destructive work, secret access, and production mutation require separate policy and authority.

Completion criterion: each accepted slice has one integrated validated commit or a precise terminal blocker, resource leases are released safely, and the goal map contains enough identity and evidence to enter goal validation.
