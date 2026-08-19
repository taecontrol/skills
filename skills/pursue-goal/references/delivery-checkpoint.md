# Vertical-slice lifecycle

Use this procedure only for one accepted, judgeable production vertical slice. Acceptance of its concise playback authorizes the full lifecycle through a focused local commit. It does not authorize external effects and does not require result acceptance before commit.

```text
Accepted slice
→ Implementer
→ Cleaner and gates
→ independent Verifier
→ independent Product Validator
→ focused local commit and map adaptation
```

## Inputs and candidate lineage

Every handoff names the goal-map identity, accepted-slice identity, project-profile identity, base revision, immutable candidate identity, protected behavior, applicable gates, and evidence pointers. The Cleaner materializes each candidate reproducibly and records its source or patch digest, included artifacts, generated-output procedure, locks, permitted configuration, fixtures, driver and environment identities, and gate ledger.

An unlisted workspace artifact, ambient configuration, or secret is outside the candidate. A role rejects superseded identities or an unverifiable materialization.

## Produce and harden

1. **Implementer:** implement the smallest coherent end-to-end behavior and focused observable proof. Stop safely and return to Coordinator when evidence challenges a material decision.
2. **Cleaner:** repair local correctness and design defects, harden error behavior, run every profile-activated affected gate, and freeze a new candidate identity. A required gate is satisfied only by `Pass` or a matching `Pre-authorized disposition`; `Resynchronize` and `Blocked` return to Coordinator or the named owner.
3. **Verifier:** independently and read-only judges the exact cleaned candidate. `Pass` goes to Product Validator. `Repair` returns automatically to Cleaner with stable findings. `Resynchronize` goes to Coordinator. `Inconclusive` goes to Coordinator with an owner and exact unblock condition.
4. **Product Validator:** independently validates the same Verifier-passed candidate through real product interfaces. Before every effectful action, it verifies scoped authorization or an approved non-production substitute. `Pass` makes the candidate eligible for commit. `Fail` returns automatically to Cleaner. `Inconclusive` returns to Coordinator with an unblock condition.

A candidate changed by Cleaner gets a new identity, reruns affected gates, and returns to Verifier before final product validation. The final Product Validator run executes the complete accepted journey set against the final immutable candidate. Targeted journeys may be used during diagnosis but do not replace that final run.

## Repair and diagnosis

Keep a stable ledger for each gate, Verifier finding, and Product Validator failure: identity, candidate, evidence, consequence, authority, status, and disposition. A bounded repair returns to the same independent reviewer or validator when the candidate lineage and risk surface remain reliable.

After two unsuccessful repairs for the same stable failure, dispatch a fresh Root-cause Diagnostician. It returns evidence-backed classification: local implementation defect, incoherent design, contract gap, environment or harness blocker, or demonstrated capability mismatch. The Coordinator may authorize another bounded repair only inside accepted decisions and project policy. Model or harness escalation is never automatic; it requires demonstrated capability-mismatch evidence and follows the project profile's routing policy. Reshaping the accepted outcome, changing consequential architecture, increasing material cost, or changing external-effect policy requires re-synchronization.

## Commit and adapt

When Cleaner gates are satisfied, Verifier passes, and Product Validator passes the complete accepted journeys, record the final candidate and evidence in the goal map. Inspect the staged diff and prove it exactly matches the validated delivery surface, apart from permitted coordination-only bookkeeping that cannot affect behavior. Create one focused local commit containing only slice-owned changes, record its revision, and adapt future slices from evidence.

Do not wait for a second human result acceptance. Push, pull-request publication, merge, deployment, and every other external effect require separate policy and authority.

Completion criterion: the local commit identifies a final candidate with satisfied gates, a Verifier pass, Product Validator pass for every accepted journey, durable evidence, and no unresolved material decision or hidden blocker.
