---
name: diagnosing-bugs
description: "Diagnose an observed bug or performance regression with red-loop, minimal-reproduction, and root-cause evidence before repair."
license: MIT
---

# Diagnosing Bugs

Use this discovery and repair-routing capability when an observed failure, wrong result, crash, or performance regression must be explained before a repair can be chosen. It is not a production repair procedure and does not authorize a behavior, contract, or architecture change.

## Establish the diagnostic contract

Before investigating, record the observed symptom, affected obligation or journey, relevant candidate or environment identity, known constraints, and the question: what mechanism causes this symptom? Preserve the original symptom even when a smaller reproduction is found.

Redact secrets from commands, logs, traces, and evidence. Keep credentials in environment variables rather than captured artifacts.

## Build a red loop

Create and run one unattended feedback loop that drives the actual failing path and asserts the exact symptom. Prefer, in order, a focused test, HTTP or CLI replay, browser script, captured trace replay, throwaway harness, property loop, bisection harness, or differential comparison. For a nondeterministic failure, measure and raise the reproduction rate until the loop is usable; record the rate and run count.

Tighten the loop by narrowing setup, isolating time, randomness, files, and network inputs, and asserting the symptom rather than a nearby condition. Record the exact invocation and its red result.

At the red-loop gate, take exactly one outcome branch:

- **Diagnosed:** a red-capable loop was run and the later evidence distinguishes one mechanism from the competing explanations.
- **Inconclusive:** the available attempts cannot run a usable red loop or cannot make a distinguishing observation. Return the attempts made and one exact blocker or bounded next diagnostic action that would unblock judgment, such as required access, a redacted trace, a reproducible environment, or scoped permission for temporary instrumentation. Its result contains no hypotheses or root-cause claim; use `Root cause: not established.`

## Minimize, test, and explain

1. Run the loop repeatedly enough to establish its verdict or reproduction rate.
2. Remove inputs, callers, configuration, data, and steps one at a time. Re-run the loop after each removal. Keep only load-bearing elements in the minimal reproduction.
3. Generate three to five ranked, falsifiable hypotheses. State one prediction that would distinguish each hypothesis.
4. Test one prediction at a time with a debugger, targeted tagged instrumentation, controlled input, measurement, or comparison. For performance failures, establish a baseline measurement or profile before attributing cause.
5. Keep the original symptom and minimal reproduction as regression evidence. Remove temporary instrumentation and disposable harnesses, or identify their retained-evidence location and why it remains useful.
6. If an observation distinguishes one mechanism from the competing hypotheses, take the `Diagnosed` branch. Otherwise take the `Inconclusive` branch with the attempts and exact blocker or bounded next diagnostic action; do not carry hypotheses forward as a diagnosis.

## Route, do not repair

Return exactly one of these mutually exclusive results to the Coordinator:

```text
Outcome: Diagnosed
Failure: <stable finding, journey divergence, or gate obligation>
Red loop: <exact command, environment/candidate, red observation, determinism or rate>
Minimal reproduction: <load-bearing inputs and steps; original symptom pointer>
Hypotheses and tested predictions: <rank, prediction, observation, disposition> …
Root cause: <supported mechanism and distinguishing observation>
Classification: Local defect | Incoherent design | Contract or consequential architecture gap | Capability mismatch
Route: <Cleaner or accepted implementation slice | Coordinator resynchronization | project routing policy>
Limits: <what the evidence does not establish>
```

```text
Outcome: Inconclusive
Failure: <stable finding, journey divergence, or gate obligation>
Attempts: <each attempted loop, probe, or access path and its observation> …
Blocker: <one exact missing access, evidence, environment, permission, or next bounded diagnostic action>
Root cause: not established.
Route: <Coordinator handoff for the named unblock condition>
Limits: <what cannot be established until the blocker is resolved>
```

A supported local defect routes to the Cleaner or an already accepted implementation slice. An incoherent design, contract gap, or consequential architecture question returns to the Coordinator; only the Coordinator decides whether a bounded repair remains inside accepted decisions or human synchronization is required. A demonstrated model or harness mismatch returns to Coordinator routing under project policy. The `Inconclusive` branch is a Coordinator handoff, not a classification of a diagnosis.

The eventual production repair remains subject to the accepted delivery lifecycle, including applicable Cleaner, Verifier, Product Validator, and gate evidence. This capability never declares that repair complete.

## Completion criteria

Diagnosis is complete only when all of the following are true:

- Exactly one outcome branch is returned: `Diagnosed` or `Inconclusive`.
- For `Diagnosed`, a command or equivalent automated loop was actually run and is red-capable for the reported symptom; its invocation, environment or candidate identity, observation, and determinism or reproduction rate are preserved without secrets.
- For `Diagnosed`, the minimal reproduction contains only load-bearing elements, the original symptom remains identifiable, and three to five falsifiable hypotheses have tested predictions with observations.
- For `Diagnosed`, the root cause is tied to a distinguishing observation, the classification is evidence-supported, and temporary diagnostic instrumentation and harnesses have an explicit removed or retained-evidence disposition.
- For `Inconclusive`, every attempt is recorded, one exact blocker or bounded next diagnostic action is named, `Root cause: not established.` is present, and no hypotheses or root-cause claim appears.
- The result gives an authority-correct route; it neither repairs production code nor authorizes a material change.

## Provenance

- Canonical package: `diagnosing-bugs`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/engineering/diagnosing-bugs/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates and restructures the upstream diagnostic procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: material authority and handoff adaptation.
- Taecontrol changes: separates diagnosis from production repair; requires a run red loop, minimal reproduction, falsifiable predictions, and root-cause evidence as the returned artifact; routes findings by Factory authority; makes inability to build a loop an exact unblock condition; and requires any eventual repair to re-enter the Factory delivery lifecycle.
