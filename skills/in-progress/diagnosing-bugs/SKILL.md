---
name: diagnosing-bugs
description: "Establish the mechanism behind a hard, intermittent, recurring, or performance failure from a faithful reproduction or distinguishing runtime evidence. Use when the user asks to diagnose or debug, or when an authorized repair remains causally uncertain after direct inspection; do not use for simple factual questions, obvious local failures, proactive audits, or routine test fixes."
---

# Diagnosing bugs

Establish the mechanism behind an observed failure before repairing it. This skill owns diagnosis, not the production fix.

Begin lightly. Read the error, stack, existing reproduction or captured artifact, and recent relevant changes. If that evidence already distinguishes the mechanism, report it without manufacturing a longer process. Escalate only as uncertainty requires.

When the surrounding assignment already authorizes repair, establish the diagnostic outcome first, then continue as the same actor under the implementation or repair contract and include it in the final handoff. Do not end the pass or create another handoff merely because diagnosis was needed.

## Bound the symptom

Record the exact observed symptom, affected user or system path, revision and environment, known trigger, determinism or observed failure rate, and material constraints. Separate what was observed from what was reported or inferred.

Keep secrets, private data, credentials, and unrelated payloads out of commands, notes, and returned evidence. Retain raw artifacts locally only when authorized; expose the minimum sanitized evidence needed to support the result.

## Establish a diagnostic signal

Choose the narrowest faithful evidence path available:

- an executable reproduction on the same material surface as the failure;
- live runtime observation through logs, traces, profiles, debuggers, or temporary instrumentation; or
- an existing fixed artifact such as a trace, profile, core dump, HAR, or structured log whose provenance and revision can be established.

Prefer a sharp, repeatable, and reasonably fast red-capable reproduction when one can preserve the symptom's semantics. For an intermittent failure, measure its baseline rate and improve observability or repetition without changing what the failure means. Do not build a low-fidelity mock merely to claim a reproduction loop.

For fixed artifacts, reduce the relevant interval or path, map observations back to the matching source and revision, and seek a comparison artifact only when it would distinguish a material alternative. A trustworthy artifact can establish the mechanism without recreating the failure live.

Temporary local instrumentation or a disposable harness is allowed only when it is necessary to distinguish causes. Tag it uniquely, avoid consequential live-system changes without explicit authority, and remove it before returning.

If no faithful signal can be obtained, establish `Inconclusive` with the exact missing artifact, access, environment, authority, or observation capability.

## Discriminate the mechanism

Minimize only to reduce the hypothesis space: remove one input, dependency, timing condition, process boundary, or state dimension at a time while preserving the symptom. Stop when further reduction would lower fidelity or no longer change the decision.

Form only hypotheses supported by current evidence. For each plausible cause, state an observation that would distinguish it from the material alternatives, then run one probe or change one variable at a time. Depending on the failure, useful probes include working-versus-broken comparison, history or bisection, boundary instrumentation, dependency substitution, concurrency control, and trace or profile comparison.

Read-only parallel investigators are optional when hypotheses are genuinely independent and do not contend for mutable state. One owner must reconcile their claims against the actual evidence. Do not fan out by default.

Establish `Diagnosed` only when the evidence distinguishes the proposed mechanism from the material alternatives. A plausible story, correlation, disappearing symptom, or successful restart is not a root cause.

## Conclude and clean up

Remove uniquely tagged instrumentation and disposable diagnostic artifacts, restore any state owned by the investigation, and preserve only accepted source artifacts and sanitized evidence. Do not commit, create an ADR or plan, route work, or edit production code as the fix while operating under this skill.

Establish exactly one diagnostic outcome. When diagnosis is the whole assignment, return it directly. When repair is already authorized, record it before editing and include it in the pass's final handoff:

- `Diagnosed`: identify the symptom, evidence, root cause, and distinguishing observation. Include the revision and environment, exact reproduction and result, determinism or measured rate, minimal faithful scenario or artifact, tested or refuted hypotheses, evidence limits, and a faithful regression seam only when material.
- `Inconclusive`: identify the symptom, available evidence, exact blocker, and smallest bounded next action. Include the revision and environment, attempts and results, refuted hypotheses, and remaining possibilities only when material; label every remaining possibility as a hypothesis and state `Root cause: not established.`

If repair was already authorized, leave this skill after establishing the diagnostic outcome and continue under the caller's implementation contract. Use `strategic-programming` for the repair, convert the reproduction into a regression test only when it is a faithful maintained seam, and run the applicable project gates there.

## Completion criteria

The failure mechanism is established by distinguishing evidence, or the investigation ends honestly with a precise unblock condition. Observations remain separate from inference, sensitive data is not exposed, temporary changes are removed, and diagnosis has not been mistaken for repair.
