# Vertical-slice lifecycle

Use this only for one accepted, judgeable production slice. Its acceptance authorizes the lifecycle through a focused local commit, not any external effect.

## Preserve identity and independence

Every handoff names the exact goal-map, accepted-slice, and project-profile identities, base revision, immutable candidate identity when one exists, protected behavior, applicable gates, and evidence pointers. Cleaner materializes each candidate reproducibly and records its digest, included artifacts, generated-output procedure, permitted configuration, fixtures, driver and environment identities, and gate ledger. Unlisted workspace artifacts, ambient configuration, and secrets are outside the candidate.

Use fresh contexts for the independent read-only Verifier and Product Validator. Product Validator is independent from Verifier and receives the candidate identity, same-candidate Verifier pass, accepted journeys, and evidence ledger, not the Verifier's reasoning context.

## Run the slice

1. Implementer writes the smallest coherent end-to-end behavior and focused observable proof. Material evidence returns to Coordinator.
2. Cleaner repairs local correctness and design defects, handles errors, freezes a new candidate, and runs every affected profile gate against that identity. A gate passes only with `Pass` or its matching pre-authorized disposition. `Resynchronize` and `Blocked` return to Coordinator or the named owner.
3. Verifier judges the exact cleaned candidate. `Pass` goes to Product Validator. `Repair` goes automatically to Cleaner. `Resynchronize` goes to Coordinator. `Inconclusive` goes to Coordinator with an owner and exact unblock condition.
4. Product Validator exercises every accepted journey through a real product interface on the same Verifier-passed candidate. Before an external, billable, destructive, privacy-sensitive, or production effect, it requires scoped authorization or an approved non-production substitute that preserves material semantics. `Pass` makes the candidate eligible for commit. `Fail` goes automatically to Cleaner. `Inconclusive` goes to Coordinator with an unblock condition.

A Cleaner change creates a new candidate identity, reruns affected gates, and returns to Verifier. Before commit, Product Validator reruns the complete accepted journey set against the final candidate. Diagnostic journeys do not replace that final run.

## Repair without automatic escalation

Keep a stable ledger for each gate, Verifier finding, and Product Validator failure with its identity, candidate, evidence, consequence, authority, status, and disposition. A bounded repair may return to the same independent reviewer or validator while lineage and risk remain reliable.

After two unsuccessful repairs of the same stable failure, use a fresh Root-cause Diagnostician. A stable failure is a Verifier finding ID, a Product Validator journey plus earliest divergence, or a gate ID tied to the unmet obligation. Classify it as a local defect, incoherent design, contract gap, environment or harness blocker, or demonstrated capability mismatch. The diagnosis routes work but cannot change a material decision. Model or harness escalation is never automatic. It needs capability-mismatch evidence and follows project-profile routing policy.

## Commit the validated surface

When gates are satisfied, Verifier passes, and Product Validator passes every accepted journey, record final evidence in the map. Inspect the staged diff. Create one focused local commit only when it exactly matches the validated delivery surface, except permitted coordination-only bookkeeping that cannot affect behavior. Record the commit revision and update future slices from the evidence. Do not ask for a second human acceptance of the result before this local commit.

Push, pull-request publication, merge, deployment, paid activity, destructive work, and production mutation each need separate policy and authority.

Completion criterion: the local commit identifies the final candidate, satisfied gates, independent Verifier and Product Validator evidence, and no unresolved material decision or hidden blocker.
