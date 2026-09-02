# Goal validation and closure

Use this after every accepted slice commit has been integrated in dependency order. The phase is mandatory; additional combined execution depends on the accepted goal-validation disposition.

## Establish the integrated candidate

Inspect the accepted design baseline and slice batch, integrated commit set, dependency and conflict graph, slice candidates and evidence, integration impact checks, residual risks, and current worktree. Materialize one immutable integrated-candidate identity with its exact revisions, build inputs, configuration, fixtures, drivers, environment, and evidence ledger.

If an accepted slice is missing, a validated commit was altered without rerunning its lifecycle, or integration invalidated slice evidence, return the affected work to slice delivery. Do not compensate with a broad final test.

Completion criterion: the integrated candidate is reproducible, contains exactly the accepted slice set, and has a traceable evidence chain for every slice.

## Apply the accepted disposition

### Required

The Coordinator dispatches one Goal Validation Owner with the current coordination envelope, accepted combined obligations and journeys, integration gates, isolated validation workspace and resources, and evidence destination. That owner selects the fresh Verifier and Product Validator contexts and runs the validation assignment without changing the candidate or accepted contract.

Run the accepted integration gates against the integrated candidate. Have an independent Verifier judge the combined obligations and interactions that motivated goal validation. After that same candidate passes, have an independent Product Validator run every accepted cross-slice journey through its named real interface and environment. Product validation may mutate only state owned by its recorded resource lease and authorized journey.

Record each gate, obligation, and journey with direct evidence. The Goal Validation Owner returns exactly one result to the Coordinator:

- `Pass`: every accepted combined check passes on the integrated candidate.
- `Slice failure`: name the failed obligation or journey, evidence, and affected accepted slice or slices.
- `Resynchronize`: name the missing or contradictory contract, consequential architecture gap, changed user-visible decision, or validation ambiguity.
- `Blocked`: name the missing access, authorization, isolation, environment, or other capability, its owner, and exact unblock condition.

The Goal Validation Owner does not modify code, dispatch Cleaner, or dispatch a Slice Owner. The Coordinator routes `Slice failure` back through a complete affected Slice Owner lifecycle and routes `Resynchronize` to collaborative design.

### Per-slice evidence sufficient

Confirm that every accepted commit is integrated, every integration impact check remains valid, no combined state or interaction was introduced, and delivery evidence did not invalidate the accepted rationale. Record that no additional cross-slice journey was run and cite the accepted reason.

If those conditions no longer hold, do not silently keep the disposition. Return to collaborative design to accept a revised validation contract.

Completion criterion: either the exact integrated candidate passes every accepted combined check, or the durable record shows why no additional execution was required and why that rationale remains valid.

## Prove and close the goal

Compare the accepted goal outcome and final observable proof with the integrated evidence. Report one result:

- `Goal proven`: every accepted slice is integrated and the accepted validation disposition is satisfied.
- `Return to slice delivery`: accepted behavior failed or validated code changed; name the affected slice and evidence.
- `Return to collaborative design`: a material decision, contract, slice boundary, or validation disposition must change.
- `Blocked`: name the owner and exact unblock condition.

For `Goal proven`, update the goal map with the integrated candidate, validation evidence, residual risks, and result. Keep product, architecture, domain, operations, UI/UX, and validation truth in their canonical maintained locations. Move a fact out of the map only when the map is its sole useful owner.

Any cleanup or documentation change that affects runtime behavior, a public contract, protected configuration, generated behavior, or validation semantics is new production work and requires an accepted slice. Coordination-only archival may follow repository convention without altering the validated surface or deleting recoverable evidence.

A local commit does not authorize external effects. Apply project policy and obtain authority for each push, pull request, merge, deployment, paid activity, destructive cleanup, secret access, or production mutation.

Completion criterion: the goal has one evidence-backed disposition, canonical truth has one owner, coordination evidence remains recoverable, and every behavior-affecting or external action follows its own authority path.
