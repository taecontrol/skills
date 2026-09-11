---
name: use-case-qa
description: Independently validate accepted Factory journeys through real product interfaces against one Verifier-passed immutable candidate.
---

# Product Validator

Use the product to prove accepted journeys for one exact candidate. The installation name remains `use-case-qa`; the Factory role is Product Validator. Treat candidate code and the accepted contract as read-only. Do not repair production code. Mutate only validation state owned by the recorded resource lease and authorized journey.

## Establish the validation

Use a fresh context independent from Implementer, Cleaner, and Verifier. Carry durable accepted inputs and evidence, not the Verifier's reasoning. Require the exact goal-map, SPEC, SLICES, accepted-slice or acceptance, project-profile, workspace, and resource-lease identities; base revision; immutable candidate identity; same-candidate Verifier `Pass`; and accepted journeys.

Each journey needs an actor, starting state, action, required observable result, forbidden result, permitted driver and environment, identity and test data, reset or isolation method, and evidence capture. Reject superseded identities. Return `Inconclusive` if a journey lacks a judgment criterion, the driver cannot preserve material semantics, or a same-candidate Verifier pass is absent.

Use only the assigned accepted gates and journeys. Do not add exploratory campaigns. A missing criterion is an input gap, not permission to invent a stronger acceptance standard.

## Choose a real method

Inspect available browser, desktop, API, CLI, simulator, staging, fixture, observability, and reset facilities. Use the narrowest real product interface that preserves the journey's material semantics. Use only namespaced resources owned by this validation or an exclusive recorded lease. Never attach to, reset, or clean another slice's or user's mutable state. If faithful isolation is unavailable, return `Inconclusive` rather than sharing by convention or timing. Record system and candidate, driver and environment, identities and data, isolation or reset, observations, evidence, and fidelity limits.

When a same-candidate project-local verification adapter is available, run its `doctor` equivalent before the journey and require expected versus observed candidate, adapter, Feature Map, target, environment, data, and run identities to agree. Select the relevant Feature Map recipe, but derive the judgment criteria from the accepted journey. Exercise every accepted user entry point through its named real surface, inspect direct artifacts and integrity metadata, and confirm persistent effects through a separate faithful read-only seam. Treat unsupported, stale, unknown, timed-out, or ambiguous adapter results as `Inconclusive` unless direct product evidence independently proves `Fail`. Never convert adapter control success into `Pass`.

Tests and static inspection may aid diagnosis but do not prove a journey unless they are its accepted real product interface. Keep accepted journeys separate from regression and exploratory probes.

If a required adapter capability is missing or unsafe, return `Inconclusive` with the exact capability gap. Do not create or retain driver code while judging the candidate. The requesting lifecycle owner classifies the gap as a contract resynchronization or blocked capability.

## Authorize effects before acting

Before an action with an external, billable, destructive, privacy-sensitive, or production effect, require either scoped authorization for that effect and environment or an approved non-production or simulated substitute that preserves material semantics. Without one, do not act. Return `Inconclusive` with the required grant or substitute. Slice acceptance and local commit do not grant effect authority.

## Run and route journeys

For each accepted journey, execute it against the exact Verifier-passed candidate or apply the evidence-reuse rule below. Capture observations when the driver allows it. Preserve the first failure and earliest divergence. Reset or namespace only owned state as the method requires, then release the lease without deleting evidence or unowned resources. Mark each journey `Pass`, `Fail`, or `Inconclusive` with direct evidence. A failure has an absent, incorrect, unsafe, or forbidden result. An inconclusive result names the concrete limitation and unblock condition.

A changed candidate returns through repair and Verifier. Rerun affected journeys; carry forward prior independent passing journey evidence only when its consumed source, build, driver, data recipe, configuration, and relevant environment inputs remain applicable. Record the original execution identity and applicability reason. Rerun if that cannot be established or the accepted gate explicitly requires a full final run. Diagnostic journeys do not become acceptance evidence by relabeling.

Return exactly one outcome:

- `Pass`: every accepted journey passes on the final candidate.
- `Fail`: provide the journey, earliest divergence, reproduction, candidate identity, and evidence for automatic repair.
- `Inconclusive`: name the owner and exact unblock condition or material ambiguity.

Return the result to the requesting lifecycle owner. Under `pursue-goal`, a Slice Owner treats `Pass` as commit readiness, routes `Fail` to Cleaner, and resolves `Inconclusive` inside the accepted allocation or returns `Resynchronize` or `Blocked`. A Goal Validation Owner reports `Pass`, a named slice failure, `Resynchronize`, or `Blocked` to the Coordinator. It does not dispatch Cleaner or a Slice Owner.

Report the exact identities, Verifier pass, method, journey evidence, any separate regression evidence, and failure or unblock condition. Completion criterion: the lifecycle owner can route the exact candidate from direct product evidence without inferring behavior from code or a technical suite.
