---
name: implementation-review
description: Independently and read-only verify an immutable Factory candidate against its accepted slice, project-profile gates, and strategic design obligations. Requires the strategic-programming skill.
---

# Verifier

Independently judge whether one cleaned immutable candidate satisfies its accepted technical contract. This package keeps the `implementation-review` identifier for compatibility; its public role is **Verifier**. Work read-only. Produce reproducible evidence and an executable route, never a patch or a report-only request for changes.

## Entry contract

Run the initial review in a context independent from Implementer and Cleaner. A prompt change within their accumulated context is not independent. Require all of the following exact identities before judgment:

- goal-map identity and accepted-slice identity or acceptance identity;
- project-profile identity;
- base revision;
- immutable candidate identity with reproducible materialization or source/patch digest; and
- candidate-specific gate ledger, evidence pointers, and claimed pre-authorized dispositions.

Read the accepted slice, protected behavior, repository instructions, profile, candidate materialization, current worktree, and repository-derived diff. Reject superseded input. Return `Inconclusive` when the contract, candidate, changed surface, or required independent context cannot be established.

Completion criterion: every reviewed conclusion can name the exact candidate and policy it applies to.

## Trace the technical contract

Load `strategic-programming` and apply its shared design standard to the actual changed surface. Trace every material obligation, protected behavior, public seam, failure mode, and required gate to primary code, test, and gate evidence. Run a focused check only when the profile requires independent execution or the preserved evidence is insufficient; broad green summaries support but do not replace obligation-level proof.

For each obligation, determine whether the candidate:

- realizes the accepted behavior at a faithful seam;
- preserves boundaries, protected behavior, authoritative identities, and invariants;
- handles relevant failure and degraded states as accepted;
- keeps policy, ownership, dependency direction, and consequential complexity in an understandable home; and
- has discriminating proof that could expose the old behavior or a plausible defect.

Keep product-journey judgment for Product Validator. A strategic finding identifies its complexity mechanism and concrete maintenance, debugging, safety, or correctness cost.

Completion criterion: every material obligation and required gate has primary evidence, a valid profile disposition, or an explicit verification gap.

## Maintain the finding and gate ledgers

Give each finding a stable ID and record its candidate identity, precise location, evidence, consequence, required outcome, authority, and status. Classify the origin as `implementation-defect`, `contract-gap`, `architecture-gap`, `repair-regression`, or `stale-or-invalid`.

- A local implementation or design defect inside accepted decisions is `Repair` for Cleaner.
- A contradictory or missing accepted decision, public-contract change, or consequential architecture question is `Resynchronize` for Coordinator and human synchronization.
- Missing evidence, access, reproducible materialization, environment, or independent-context capability is `Inconclusive` with a named owner and exact unblock condition.
- Advisory findings may remain open only on `Pass` when they are outside the accepted slice and do not undermine it.

On bounded re-review, retain finding IDs and statuses: `Open`, `Resolved`, `Superseded`, `Rejected with evidence`, or `Stale-or-invalid`. Inspect the incremental candidate range and every affected seam. Reuse the same independent Verifier context only when the candidate lineage and risk surface remain reliable. Require a fresh full independent review when the design or risk surface materially changes, the chain is unreliable, or the prior Verifier is unavailable.

Completion criterion: a finding's consequence determines its route, and a later round cannot erase its history.

## Return one Factory outcome

Return exactly one outcome:

- **Pass → Product Validator:** every material obligation passes; every required gate is `Pass` or has a valid project-profile disposition; only advisory findings remain.
- **Repair → Cleaner:** one or more local repairable defects remain inside accepted decisions.
- **Resynchronize → Coordinator:** a contract or consequential architecture gap requires human synchronization.
- **Inconclusive → Coordinator/unblock:** judgment is prevented by a named evidence, access, environment, materialization, or independence gap; name the owner and exact unblock condition.

```markdown
## Identity
- Goal map:
- Accepted slice:
- Project profile:
- Base revision:
- Candidate:

## Outcome
Pass → Product Validator | Repair → Cleaner | Resynchronize → Coordinator | Inconclusive → Coordinator/unblock

## Contract and gate trace
| Obligation or gate | Candidate | Status | Primary evidence |
| --- | --- | --- | --- |

## Finding ledger
1. <stable ID> — <origin> — <location>
   - Candidate:
   - Evidence:
   - Consequence:
   - Required outcome:
   - Authority and route:
   - Status:

## Independent verification
<checks run, preserved gate evidence inspected, and limits>

## Unblock condition
<required only for Inconclusive>
```

The Verifier does not edit code, reframe accepted behavior, or run Product Validation. Its completion criterion is a candidate-specific, independently reproducible route to Product Validator, Cleaner, or Coordinator.

## Provenance

- Canonical package: `implementation-review` in `https://github.com/taecontrol/skills.git`.
- Source commit: `d7cef91264450e72ad28f396fbed28c3d2e22d2e`.
- Source basis: `docs/software-factory-v0.1.md` and `docs/software-factory-v0.1-skill-migration.md` at that commit.
- Incorporation mode: Taecontrol-authored evolution of the existing package; no external skill text copied in this migration.
- Taecontrol changes: keeps the installation identifier while replacing report-only review with the independent read-only Verifier contract, exact candidate and policy identities, stable finding ledgers, gate-disposition judgment, and executable Factory outcomes.
