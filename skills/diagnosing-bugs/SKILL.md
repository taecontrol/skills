---
name: diagnosing-bugs
description: "Diagnose an observed failure or performance regression with a red loop and distinguishing evidence before routing repair."
---

# Diagnose bugs

Find the mechanism behind an observed failure before anyone chooses a repair. This skill does not change production code, contracts, or architecture.

## Process

1. Record the symptom, affected journey or obligation, candidate and environment, constraints, and the diagnostic question. Keep the original symptom visible. Redact secrets from commands and evidence.
2. Build and run an unattended red loop through the failing path. Prefer a focused test, replay, browser script, trace replay, disposable harness, property loop, bisection, or differential comparison. Assert the symptom itself. For nondeterministic failures, record runs and reproduction rate.
3. Minimize the reproduction by removing one input, caller, configuration, data item, or step at a time and rerunning the loop. Keep only load-bearing parts.
4. Form three to five falsifiable hypotheses. Test one distinguishing prediction at a time. For a performance regression, establish a baseline measurement or profile first. Remove temporary instrumentation and disposable harnesses, or record why and where retained evidence remains.
5. Take one branch:
   - `Diagnosed` requires a run red loop and an observation that distinguishes one mechanism from competing explanations.
   - `Inconclusive` applies when no usable red loop or distinguishing observation is available. Return every attempt and one exact blocker or bounded next diagnostic action. State `Root cause: not established.` Do not return hypotheses as a diagnosis.

## Return

Return one outcome to the Coordinator.

For `Diagnosed`, give the failure, exact red-loop invocation and result, candidate or environment, determinism or rate, minimal reproduction, tested hypotheses and observations, supported root cause and distinguishing observation, classification, limits, and route.

For `Inconclusive`, give the failure, attempts and observations, exact blocker or next action, `Root cause: not established.`, limits, and Coordinator handoff.

Recommend a supported local defect to the Cleaner or an accepted implementation slice. Return every recommendation and its evidence to the Coordinator for routing. A later production repair follows its delivery lifecycle; this skill never declares it complete.

Done means exactly one branch is returned with evidence sufficient for its branch, a route within the skill's authority, and no production repair.
