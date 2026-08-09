---
name: use-case-qa
description: Validate accepted user journeys against a completed system through observable product seams and return reproducible per-case evidence.
---

# Use-Case QA

Exercise accepted behavior through the product seam that can actually prove it.

Entry condition: run QA in a fresh subagent or task containing a compact contract, accepted cases, repository location, and exact system under test. When invoked from implementation or review context, dispatch that handoff and end the local QA attempt.

## 1. Fix the baseline

Read the Goal Contract or accepted use cases, build or revision under test, environment constraints, and authorization for external, billable, destructive, privacy-sensitive, or production effects.

Each baseline case needs an actor, starting state, action, observable outcome, and relevant forbidden outcome. Preserve accepted meaning; label newly discovered scenarios `Exploratory`.

Return `Inconclusive` when the target is ambiguous, a material case lacks an oracle, or a required side effect lacks authority.

Completion criterion: every planned case traces to accepted behavior and has a judgeable expected outcome.

## 2. Choose the narrowest faithful oracle

Inspect the project's existing simulator, browser or desktop driver, API, CLI, harness, staging environment, fixtures, observability, and reset procedures. Choose the cheapest method that preserves the semantics material to the case.

Record a compact method contract:

- exact system under test;
- driver and environment;
- identities and data;
- isolation or reset;
- verdict-bearing oracles;
- evidence capture;
- fidelity limits.

Use several methods only when one cannot observe all accepted outcomes. Static inspection and component tests may diagnose or support a sub-claim; a use case passes through its required observable seam.

When a faithful driver or environment requires substantial research, prototyping, or a technical spike, commission a separate fresh-context discovery goal. Its durable artifact returns conclusions, evidence pointers, and limits; the validator reads that compact artifact rather than its exploration history. When dispatch is unavailable, return `Inconclusive` with the bounded discovery goal.

Completion criterion: another validator can repeat the method, and every material outcome has an oracle or named gap.

## 3. Execute the cases

Create one compact matrix without copying the source prose:

| Case | Driver | Expected observation | Status | Observation | Evidence |
| --- | --- | --- | --- | --- | --- |

Run cases through the selected seam. Capture evidence at observation time and reset or namespace state as the method contract requires. Consolidate cases into journeys when they share expensive setup while preserving independent oracles and verdicts.

Classify each case:

- `Pass`: every required outcome occurred and no forbidden outcome occurred.
- `Fail`: a required outcome was absent, incorrect, unsafe, or contradicted.
- `Blocked`: a named access or environment condition prevented execution and has a concrete unblock condition.
- `Unverified`: execution could not expose a required outcome.

Preserve the first failure when retries diagnose instability. Record attempts, timing, and state differences when they matter. When cleanup matters, verify residual state with an independent inventory rather than the cleanup routine's own identifiers.

Completion criterion: every baseline case has a status, direct evidence, and a reproducible observation or precise blocker.

## 4. Probe and diagnose

After the baseline, run only regression and exploratory checks justified by the changed surface and residual risk. Keep three evidence sets distinct:

- **Baseline:** decides acceptance.
- **Regression:** protects adjacent established behavior.
- **Exploratory:** exposes new uncertainty without rewriting the baseline.

For failures, preserve the verdict and gather the earliest divergence, environment, identity, state, reproduction, evidence, and likely boundary. Label causal explanations as hypotheses. Preserve the system under test; return repairs to a separate execution context.

Completion criterion: each failure is actionable without turning validation into implementation or product redesign.

## 5. Return the verdict

Return `Fail` when any baseline case demonstrates failure, even when other cases are blocked or unverified. Otherwise return `Pass` when all baseline cases pass, or `Inconclusive` when blocked or unverified cases prevent a pass.

```markdown
## Verdict
Pass | Fail | Inconclusive

## Method
- System, driver, environment, reset, oracles, limits

## Baseline cases
<completed baseline matrix from Step 3>

## Regression and exploratory evidence
<kept separate>

## Failures
- <case, earliest divergence, reproduction, evidence, likely boundary>

## Not verified
<gaps and concrete unblock conditions>
```

Completion criterion: the human can judge every accepted case from direct evidence without inferring behavior from code or a green-suite summary.
