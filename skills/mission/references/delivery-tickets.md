# Delivery and QA Ticket Profiles

Load this reference only for Implementation, Validation, or Repair.

## Implementation

**Kind / Type:** `Execution / implementation`

Gather the accepted ticket, decisions, use cases, design, constraints, and prior evidence before changing code. Implement only the approved slice and trace relevant unit, integration, feature, or contract tests to its obligations. Return to Mission when a missing product or architecture decision would require invention.

Route non-trivial work to `strategic-implementation` when installed. Preserve a local candidate commit, then route `C0` to `implementation-review` in fresh independent context. The ticket remains Active until that review passes.

Keep bounded defects found by the reviewer inside this Implementation ticket. Return them to the same implementer context and selected profile, with `agent-routing` resolving project policy against the active launch tool, then incrementally to the same reviewer when available. Route contract and architecture gaps back to Mission.

Completion criterion: the approved behavior is implemented, traced to proportionate tests, preserved in a reviewed candidate lineage, and has an independent `Pass`.

## Validation

**Kind / Type:** `Validation / validation`

Independently verify that accepted implementation satisfies the use-case contract. Use `use-case-qa` when installed.

Before activation, map every accepted obligation to its narrowest faithful boundary and oracle, name native or end-to-end gaps, and estimate setup, startup, and invocation cost. Repeat coverage at another level only when a distinct integration boundary or user-visible behavior requires it.

Create authorized QA artifacts such as end-to-end tests, journeys, campaigns, fixtures, or runbooks. Execute every relevant test the available environment permits and record unavailable coverage honestly. Keep accepted cases separate from exploratory cases.

Return per-case evidence, failures, regressions, coverage gaps, and a verdict. Preserve product defects for Repair; preserve new product or architecture questions for Decision, Use Cases Definition, or Design.

Completion criterion: every accepted journey and branch has passing evidence, an explicit failure, or a named environment gap; no failure is hidden by duplicate lower-value testing.

## Repair

**Kind / Type:** `Execution / repair`

Use Repair for accepted defects found after Implementation, normally through Validation or production evidence. Group findings when they share a coherent root cause, affected surface, implementation strategy, and revalidation path. Keep unrelated causes in separate tickets.

Trace each change to stable finding and use-case identifiers. Implement the bounded correction, run targeted regression evidence plus affected broader suites, obtain independent implementation review, and re-exercise failed Validation branches when the environment permits.

Return a contract, product-policy, or architecture gap to the matching collaborative ticket instead of choosing behavior inside Repair.

Completion criterion: every included finding is fixed or explicitly unresolved, independent review passes, and the previously failing branches have new evidence.

## Candidate lineage and review loop

Candidate commits are formal review checkpoints, not human acceptance or push authority. Diagnostic edits and test runs before a committed review handoff do not consume candidate labels. Record actual SHAs, verify ancestry, preserve reviewed history, and keep stable finding IDs with origin and root-cause classification, contract/preflight/red-verifier answers, evidence, required outcome, candidate, and status.

- Review `C0` against the full base-to-candidate range in fresh independent context.
- Review bounded `C1` and `C2` repairs incrementally with the same reviewer while retaining access to the full range.
- Start a fresh full review when repair materially reshapes the candidate, adds a risk or architecture surface, loses reviewer continuity, has unreliable ancestry, or lacks sufficient incremental evidence.
- Before `C3`, persist a root-cause checkpoint grouped by cause and boundary. Show original defects, repair regressions, contract explicitness, preflight detectability, red-verifier availability, and crossed responsibilities. Mission Control chooses the next formal candidate disposition; read-only diagnosis may continue without creating `C3`.

Completion criterion: ancestry and review scope are defensible, every finding has a stable disposition, and no third repair candidate exists without Mission Control's root-cause decision.
