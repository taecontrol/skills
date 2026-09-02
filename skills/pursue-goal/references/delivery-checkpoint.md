# Isolated slice delivery

Use this only after the human has accepted the complete design baseline, slice batch, concurrency limit, resource plan, and goal-validation disposition. The Coordinator schedules whole slices; a Slice Owner runs each accepted slice end to end.

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

Give one Slice Owner the current coordination envelope. Add protected behavior, design and contract pointers, gates, accepted journeys, commit boundary, and evidence destination.

Use `factory-supervision` to place and supervise the Slice Owner. The Slice Owner uses it again when an internal role crosses an agent or harness boundary. The supervision adapter executes the route defined here; it does not choose lifecycle transitions or acquire either owner's authority.

The Slice Owner owns delivery routing inside that boundary. It selects the agents, models, or fresh contexts that perform implementation, cleaning, technical verification, product validation, diagnosis, and repair. The Coordinator must not assign those internal roles or require approval between their routine transitions.

Role independence still applies:

- Implementer may not act as the independent Verifier or Product Validator for its own candidate.
- Cleaner may repair but may not approve the candidate it changed.
- Verifier is fresh, independent, and read-only.
- Product Validator is fresh and independent from Implementer, Cleaner, and Verifier. It cannot change the candidate or contract; it may mutate only validation state owned by its recorded resource lease.

The Slice Owner may report non-blocking progress asynchronously. It interrupts the Coordinator only for `Resynchronize` or `Blocked`, as defined below.

Completion criterion: the Slice Owner can run the complete lifecycle without guessing, shared mutable state, or further routing from the Coordinator.

## Run the internal lifecycle

1. **Implementer:** create the smallest coherent end-to-end behavior and focused observable proof inside the allocated workspace. When the accepted slice includes a product-control capability gap, create or reconcile the project-local verification CLI and Feature Map through `verification-adapter` in the same candidate.
2. **Cleaner:** repair local correctness and design defects, materialize an immutable reproducible candidate, and run every affected project-profile gate. Record source or patch digest, base revision, included artifacts, generated-output procedure, dependency locks, permitted configuration, fixtures, driver and environment identities, and gate ledger. Unlisted workspace state, ambient configuration, and secrets are excluded.
3. **Verifier:** independently judge the exact cleaned candidate through `implementation-review`. `Repair` returns inside the slice to Cleaner. `Pass` advances to Product Validator.
4. **Product Validator:** exercise every accepted journey through the named real product interface on the same Verifier-passed candidate through `use-case-qa`. `Fail` returns inside the slice to Cleaner. `Pass` makes that candidate eligible for commit.

A Cleaner change creates a new candidate identity, reruns affected gates, and returns to Verifier. Before commit, Product Validator reruns the complete accepted journey set against the final candidate. Diagnostic runs do not replace the final run.

Keep coordination identities at the coordination boundary. Goal-map, slice, finding, branch, and disposable-workspace identifiers may identify handoffs and evidence, but must not become names or dependencies in production code, retained tests, fixtures, or maintained documentation unless the project defines them as durable product vocabulary.

Completion criterion: the final immutable candidate has satisfied gates, an independent Verifier pass, and a Product Validator pass for every accepted slice journey.

## Repair autonomously

Keep stable ledgers for gates, Verifier findings, and Product Validator failures. A stable failure is one gate ID and unmet obligation, one Verifier finding ID, or one Product Validator journey and earliest divergence, all tied to a candidate lineage. Route repairable implementation, test, and local design defects between Cleaner, Verifier, and Product Validator without asking the Coordinator or human for permission.

After two unsuccessful repairs of the same stable failure, invoke `diagnosing-bugs` in a fresh context with a project-profile time or scope bound. If no bound exists, set the smallest bound that can distinguish the recorded hypotheses. Route a diagnosed local defect or reversible implementation-design defect to Cleaner. Route a contract gap, invalid accepted decision, or costly-to-reverse architecture gap to `Resynchronize`. Route a missing environment or harness capability to `Blocked` after the diagnosis reaches its bound and every accepted safe resource or substitute has been attempted. A demonstrated capability mismatch follows the project-profile escalation policy; without an authorized alternative it is `Blocked`.

Return only one terminal outcome:

- `Validated commit`: the final candidate passes the lifecycle and the focused local commit exactly matches its validated surface.
- `Resynchronize`: evidence challenges user-visible behavior, scope, sensitive policy, a public contract, costly-to-reverse architecture, the accepted slice boundary, or another human-owned material decision. Name the decision, evidence, affected slices, and safe resume condition.
- `Blocked`: required access, authorization, tool, environment, dependency, isolation, or materialization is unavailable after safe alternatives are exhausted. Name the owner and exact unblock condition.

Failing tests, ordinary implementation choices, Cleaner repairs, Verifier findings, Product Validator failures, and routine diagnostic work are not Coordinator interruptions while they remain repairable within the accepted contract.

## Commit and integrate

After the final Product Validator pass, the Slice Owner inspects the staged diff and creates one focused local commit that exactly matches the validated candidate, except permitted coordination-only bookkeeping that cannot affect behavior. It reports the commit, candidate, evidence, resource cleanup, and residual advisory risks to the Coordinator. It does not push or publish.

The Coordinator records the result and integrates validated slice commits in accepted dependency order. It may perform only a clean mechanical integration that does not edit the validated patch. That integration retains slice evidence only when an explicit impact check confirms that no accepted obligation or resource identity changed.

On any conflict, the Coordinator stops without resolving or editing code and dispatches the affected accepted slice to a Slice Owner on the integrated base. The Slice Owner resolves the conflict inside the accepted contract and reruns the complete internal lifecycle. If the conflict exposes a contract or material design gap, it returns `Resynchronize`.

Pause only a resynchronizing or blocked slice and its dependents. Continue unrelated slices when their design, base assumptions, and resource isolation remain valid.

Push, pull-request publication, merge, deployment, paid activity, destructive work, secret access, and production mutation require separate policy and authority.

Completion criterion: each accepted slice has one integrated validated commit or a precise terminal blocker, resource leases are released safely, and the goal map contains enough identity and evidence to enter goal validation.
