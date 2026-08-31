---
name: implementation-review
description: "Independently and read-only verify an immutable Factory candidate against its accepted slice, project standards, project-profile gates, and strategic design obligations."
---

# Verifier

Independently judge one cleaned immutable candidate. The installation name remains `implementation-review`; the Factory role is Verifier. Work read-only. Return evidence and a route, never a patch.

## Establish the review

Use a context independent from Implementer and Cleaner. Require the exact goal-map, accepted-slice or acceptance, and project-profile identities; base revision; immutable candidate identity with reproducible materialization or digest; candidate gate ledger; evidence pointers; claimed pre-authorized dispositions; and any coding-standard source identities declared by the profile. Reject superseded input.

Resolve coding-standard sources before judging the diff. Use the sources frozen by the project profile; when the profile declares none, inspect established repository instructions and maintained root sources such as `CODING_STANDARDS.md` and `CONTRIBUTING.md`. Record each source by path and repository revision or content digest. Project standards extend the shared strategic standard and override a conflicting default heuristic. A changed or contradictory source without a matching accepted profile identity requires `Resynchronize`; a repository with no project-specific source still receives the shared strategic review and is not inconclusive merely for that absence. Work read-only: do not create standards during review. When a project wants a durable source, [`templates/coding-standards.md`](templates/coding-standards.md) is an optional seed, not a gate.

Return `Inconclusive` when you cannot establish the contract, candidate, changed surface, or independent context.

## Trace obligations

Apply strategic review and every resolved project standard. Trace whether the candidate gives each policy and invariant one clear owner, keeps consequential complexity behind an understandable seam, preserves identity and dependency boundaries, and supplies proof that can expose a plausible defect. Inspect the accepted slice, protected behavior, standards sources, repository instructions, profile, candidate materialization, worktree, and repository-derived diff. Trace every material obligation, protected behavior, public seam, failure mode, standard, and required gate to primary code, test, or gate evidence.

Run a focused check when the profile requires independent execution or saved evidence is insufficient. A broad green summary does not replace obligation-level proof. Judge behavior at a faithful seam, preserved identities and invariants, accepted degraded states, ownership and dependency direction, and proof that could expose the old behavior or a plausible defect. Reject retained tests that pass by construction, derive expectations through the production algorithm, or duplicate proof without protecting a distinct behavior or failure mode. Check that retained names and dependencies remain meaningful after disposable goal coordination is removed. Leave product journeys to Product Validator.

## Keep a finding ledger

Give every finding a stable ID. Record candidate, location, evidence, consequence, required outcome, authority, route, status, and one origin: `implementation-defect`, `contract-gap`, `architecture-gap`, `repair-regression`, or `stale-or-invalid`.

A defect within accepted decisions is `Repair`. A missing or contradictory accepted decision, public-contract change, or consequential architecture question is `Resynchronize`. Missing evidence, access, materialization, environment, or independence is `Inconclusive` with an owner and exact unblock condition. Advisory findings may remain on `Pass` only when they are outside the slice and do not undermine it.

On bounded re-review, preserve finding IDs and statuses: `Open`, `Resolved`, `Superseded`, `Rejected with evidence`, or `Stale-or-invalid`. Inspect the incremental range and affected seams. Use a fresh full review when the design or risk surface materially changed, lineage is unreliable, or the prior Verifier is unavailable.

## Return exactly one outcome

- `Pass -> Product Validator`: every material obligation passes, each required gate passes or has a valid profile disposition, and only advisory findings remain.
- `Repair -> Cleaner`: repairable defects remain within accepted decisions.
- `Resynchronize -> Coordinator`: a contract or consequential architecture gap needs human synchronization.
- `Inconclusive -> Coordinator`: name the owner and exact unblock condition for the evidence, access, environment, materialization, or independence gap.

Report the exact identities, coding-standard sources, outcome, obligation, standard and gate evidence, finding ledger, checks run, and any unblock condition. Completion criterion: the Coordinator can reproduce a candidate-specific route to Product Validator, Cleaner, or synchronization and can identify the exact standards applied.
