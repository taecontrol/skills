---
name: implementation-review
description: Review a completed software change independently against its accepted outcome, boundaries, tests, strategic design quality, and primary code evidence before merge or human acceptance. Requires the strategic-programming skill.
---

# Implementation Review

Judge whether a completed change fulfills its contract honestly and coherently. Work read-only and derive the verdict from primary evidence.

Entry condition: run the initial review in a fresh subagent or task containing the contract, repository location, and exact review target. When invoked in the implementer's context, dispatch that handoff and end the local review attempt. Bounded repairs return to the same independent reviewer context; a materially reshaped design or risk surface starts another fresh full review.

## 1. Establish the review surface

Read the Goal Contract or accepted request, repository instructions, relevant decisions, intended base and diff, current worktree, and reported verification. Derive the changed surface from the repository rather than the implementer's summary.

Map every changed public seam to an outcome, proof obligation, boundary, or protected behavior. Return `Inconclusive` when the contract or changed surface cannot be identified.

Completion criterion: every changed public seam has a contract disposition before judgment begins.

## 2. Trace code to the contract

Load `$strategic-programming` before tracing the code and apply its complete design standard to the changed surface. Return `Inconclusive` when that required reference is unavailable.

For each material obligation, record `Pass`, `Fail`, or `Unverified` and inspect whether:

- the intended behavior exists at the faithful seam;
- boundaries and reserved decisions remain intact;
- protected behavior and data remain safe;
- authoritative facts, identities, and invariants survive persistence and adapters;
- errors and degraded states match the accepted behavior;
- tests would catch the old behavior or a plausible defect rather than merely ratify the implementation.

Run focused checks needed to verify reviewer claims. Treat broad green suites as supporting evidence. Keep product use-case execution for `use-case-qa`.

A design finding names the complexity mechanism and its concrete maintenance, debugging, safety, or correctness cost.

Completion criterion: every material obligation has primary evidence or an explicit verification gap.

## 3. Calibrate findings

Give each finding a stable ID, precise location, evidence, consequence, and required outcome. State the outcome a repair must achieve while leaving implementation choices open.

- **Blocking:** violates the accepted outcome, boundary, authorization, safety, data truth, or a material invariant.
- **Fix-now:** leaves avoidable design complexity inside the accepted boundary and is proportionate to correct before acceptance.
- **Advisory:** useful improvement whose cost or scope belongs outside the current goal.

Classify missing or contradictory intent as a `contract gap`, an unrepresentable invariant as an `architecture gap`, and incorrect realization of clear intent as an `implementation defect`. Contract and architecture gaps require a human decision rather than a patch prescription.

On re-review, retain finding IDs and mark each `Resolved`, `Open`, `Superseded`, or `Rejected with evidence`. Inspect the repair and any surface it can affect.

Completion criterion: severity follows demonstrated consequence, and every non-pass finding identifies the authority needed next.

## 4. Return the verdict

Return one verdict:

- `Pass`: every material obligation passed; open findings are Advisory only.
- `Request changes`: an open Blocking or Fix-now implementation finding is repairable inside the contract.
- `Inconclusive`: a contract, architecture, evidence, access, environment, or review-surface gap prevents judgment or requires a human decision.

Use this compact shape:

```markdown
## Verdict
Pass | Request changes | Inconclusive

## Contract trace
| Obligation | Status | Evidence |
| --- | --- | --- |

## Findings
1. <ID> — Blocking | Fix-now | Advisory — <location>
   - Evidence:
   - Consequence:
   - Required outcome:
   - Authority: executor | human decision

## Verification
<inspected and executed evidence>

## Not verified
<material limits>
```

Return findings to the caller; repairs and use-case QA run in their own contexts.

Completion criterion: the caller can act on every finding and reproduce the verdict without trusting the reviewer summary.
