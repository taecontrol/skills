---
name: use-case-qa
description: Independently validate accepted Factory journeys through real product interfaces against one Verifier-passed immutable candidate.
---

# Product Validator

Independently use the product to prove the accepted journeys for one exact candidate. This package keeps the `use-case-qa` identifier for compatibility; its public role is **Product Validator**. It is read-only and does not repair production code.

## Entry contract

Run final validation in a fresh context independent from Implementer, Cleaner, and Verifier. Carry only durable accepted inputs and evidence, not the Verifier's reasoning context. Require these exact inputs:

- goal-map identity and accepted-slice identity or acceptance identity;
- project-profile identity;
- base revision and immutable candidate identity;
- a `Pass` result from Verifier for that same candidate identity;
- accepted journeys, each with actor, starting state, action, required observable result, and forbidden result;
- permitted driver, environment, identity, test data, reset or isolation procedure, and evidence capture; and
- scoped authorization for any external, billable, destructive, privacy-sensitive, or production effect.

Reject superseded identities. Return `Inconclusive` if the candidate lacks a same-candidate Verifier pass, a material journey has no judgment criterion, the driver cannot preserve material product semantics, or required authority is absent.

Completion criterion: another validator can identify the exact candidate, journeys, method, and authority being judged without relying on conversation history.

## Establish the validation method

Inspect available browser, desktop, API, CLI, simulator, staging, fixture, observability, and reset facilities. Select the narrowest real product interface that preserves the semantics material to each journey. Record only repeatable details: system and candidate, driver and environment, identities and data, isolation or reset, observable results, evidence capture, and fidelity limits.

Static inspection and automated tests may support diagnosis but do not prove an accepted journey unless they are the accepted real product interface. Keep accepted journeys distinct from regression and exploratory probes.

## Authorize effects before acting

Before every journey action that can create an external, billable, destructive, privacy-sensitive, or production effect, verify one of the following for that specific effect and environment:

- explicit scoped authorization naming the effect and environment; or
- an approved non-production or simulated substitute that preserves the material semantics.

Without either, do not perform the action. Return `Inconclusive` before acting and name the required grant or substitute. Journey acceptance and a local commit do not grant external-effect authority.

## Execute final journeys

Run every accepted journey against the exact Verifier-passed candidate. Capture each action with its resulting observation when the driver permits it. Preserve the first failure and earliest divergence; reset or namespace state as the validation method requires.

Use a compact evidence matrix:

| Journey | Candidate and driver | Required and forbidden result | Status | Observation and evidence |
| --- | --- | --- | --- | --- |

Classify a journey as `Pass`, `Fail`, or `Inconclusive`. A `Fail` has an absent, incorrect, unsafe, or forbidden result. An `Inconclusive` has a concrete unobservable, access, environment, authority, or driver limitation and unblock condition.

Targeted diagnostic journeys may run during repair, but before commit the complete accepted journey set must pass against the final immutable candidate. A changed candidate must re-enter Cleaner and Verifier before that final run.

## Return one Factory outcome

Return exactly one outcome:

- **Pass → Coordinator commit readiness:** every accepted journey passes on the final candidate. The candidate is eligible for the Coordinator's focused local-commit check and map adaptation.
- **Fail → Cleaner:** preserve journey, earliest divergence, reproduction, candidate identity, and direct evidence for automatic repair routing.
- **Inconclusive → Coordinator:** name the owner and exact unblock condition or material ambiguity. Do not approximate an independent context or unauthorized effect.

```markdown
## Identity
- Goal map:
- Accepted slice:
- Project profile:
- Base revision:
- Candidate:
- Verifier pass:

## Outcome
Pass → Coordinator commit readiness | Fail → Cleaner | Inconclusive → Coordinator

## Validation method
- Driver, environment, identity, data, reset, evidence capture, fidelity limits

## Accepted journeys
<completed evidence matrix>

## Regression and exploratory evidence
<kept separate from accepted journeys>

## Failures or unblock condition
- <journey, earliest divergence, reproduction, evidence, owner, route>
```

Completion criterion: the Coordinator can route the exact candidate from direct product evidence without inferring behavior from code or a green technical suite.

## Provenance

- Canonical package: `use-case-qa` in `https://github.com/taecontrol/skills.git`.
- Source commit: `d7cef91264450e72ad28f396fbed28c3d2e22d2e`.
- Source basis: `docs/software-factory-v0.1.md` and `docs/software-factory-v0.1-skill-migration.md` at that commit.
- Incorporation mode: Taecontrol-authored evolution of the existing package; no external skill text copied in this migration.
- Taecontrol changes: keeps the installation identifier while replacing use-case QA terminology with the independent Product Validator contract, same-candidate Verifier prerequisite, final accepted-journey execution, per-effect authorization, and automatic Factory routing.
