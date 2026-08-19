---
name: tdd
description: "Use an optional, empirically evaluated test-driven strategy for an accepted production slice while preserving behavior-oriented proof and vertical progress."
license: MIT
---

# Test-Driven Development

Use this optional production strategy only when the project profile or human selects it for an accepted slice or an explicitly bounded experiment. TDD is a means of producing credible behavior and learning quickly, not a universal ritual or a separate authority boundary. The slice contract already defines material behavior and interfaces; do not seek repeated human approval for each test seam unless new evidence raises a material decision.

## Set the experiment boundary

Start from the accepted slice, protected behavior, project-profile identity, and faithful validation path. Choose the narrowest stable interface that exposes the required observable behavior. A narrow internal seam is acceptable only when it preserves those semantics.

Keep each increment vertical: establish or improve one observable behavior, implement only the necessary change, and retain its proof. Avoid horizontal campaigns that write speculative tests before behavior is understood.

A useful test can disagree with a plausible defect. It derives expected results from the accepted contract, a worked example, or another independent source of truth. It does not couple to private collaborators, reimplement the production algorithm in the assertion, or observe behavior only through an incidental side channel.

## Run and compare strategies

For the selected work, use the least costly strategy that produces a trustworthy accepted candidate. Where practical, compare:

- **Strict red-green** — make an observable behavior test fail, implement the smallest change that makes it pass, then continue with the next behavior.
- **Small-unit test-after** — implement one small vertical increment, then add or strengthen a discriminating behavior test before expanding the slice.
- **Behavior-first plus hardening** — establish a behavior-oriented reproduction or test, complete a coherent vertical increment, then use Cleaner hardening and project gates to strengthen the candidate.

A red-capable test or equivalent reproduction is required when feasible and required by the project profile. When it is infeasible, record why, use the strongest faithful alternative, and do not represent the result as strict red-green evidence. Refactoring and broader design cleanup remain part of the Cleaner phase, though small local changes needed to keep the current increment coherent are allowed.

After each increment, run the profile's tight feedback checks. Record enough evidence to compare strategy outcomes without claiming that one sequence is always superior:

- elapsed time to an accepted candidate;
- defects found by Cleaner, Verifier, and Product Validator;
- test sensitivity to plausible defects, including useful and surviving mutants when measured;
- repair rounds; and
- refactor breakage attributable to test coupling.

The Cleaner still owns strategic cleanup, applicable gates, candidate materialization, and the handoff to independent verification. This strategy does not waive the rest of the Factory delivery lifecycle.

## Return record

Return a compact implementation-strategy record with the candidate evidence:

```text
Slice and profile: <accepted slice identity; project-profile identity>
Strategy: <strict red-green | small-unit test-after | behavior-first plus hardening; why selected>
Increments: <observable behavior; stable interface; red-capable test or equivalent; evidence> …
Measures: <elapsed time; defects; sensitivity/mutants when measured; repair rounds; coupling breakage>
Limits: <unmeasured comparisons or unavailable red evidence>
Next route: <Cleaner>
```

## Completion criteria

TDD work is complete only when all of the following are true:

- The strategy was selected by the project profile or human for a named accepted slice or bounded experiment.
- Each implemented increment is a vertical, observable behavior with proof through a stable interface.
- Tests can detect the old behavior or a plausible defect when feasible; otherwise the faithful alternative and its limit are recorded.
- Expected results come from an independent source of truth, and retained tests avoid implementation coupling, tautological assertions, and incidental side channels.
- No repeated human seam approval was requested for decisions already accepted; new material questions are routed to the Coordinator.
- Strategy measures and their limits are recorded without a universal superiority or ritual-compliance claim.
- The candidate and strategy record route to Cleaner for applicable gates, materialization, and independent verification; this capability does not declare delivery complete.

## Provenance

- Canonical package: `tdd`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/engineering/tdd/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates and restructures the upstream test-driven development procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: experimental strategy adaptation.
- Taecontrol changes: makes TDD project-profile or human selected; removes repeated human seam approvals and universal red-green ritual claims; preserves behavior-oriented stable-interface tests and vertical increments; adds practical strategy comparison and outcome measures; and routes hardening, gates, materialization, and independent judgment through the Factory lifecycle.
