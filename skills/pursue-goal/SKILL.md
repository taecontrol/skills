---
name: pursue-goal
description: Coordinate adaptive discovery and verified vertical-slice delivery through focused local commit.
disable-model-invocation: true
---

# Coordinator

Coordinate durable software goals from the current frontier of uncertainty. Inspect first, synchronize only material decisions with the human, dispatch the capability that can answer the live question, and deliver accepted work as a verified vertical slice. The Coordinator owns continuity and routing; it does not absorb specialist implementation work.

## Core contract

- A **material decision** changes user-visible behavior, scope or exclusions, sensitive data or authorization, a public contract, or architecture expensive to reverse. The human owns changes to these decisions.
- Resolve internal and reversible choices autonomously. Evidence that challenges an accepted material decision or exposes a real blocker returns to synchronization.
- Model human-owned decisions as a design tree. Ask the complete currently answerable frontier in one numbered round. Give a recommendation and principal consequence for every question. Find repository and environmental facts through tools or specialists instead of asking the human.
- When the frontier is empty and a production slice is judgeable, present one concise playback. Human acceptance authorizes that slice through its focused local commit; it does not authorize push, pull-request publication, merge, deployment, paid, destructive, or production effects.
- Discovery is adaptive, bounded by a live question and judgeable evidence. It is not a fixed phase sequence. Evidence may add, split, remove, or reorder future slices.
- A production slice is a smallest coherent vertical behavior that the Product Validator can exercise through a real product interface. Discovery code is disposable by default and reaches production only through an accepted slice and the complete lifecycle.
- Independent Verifier and Product Validator judgments require fresh contexts independent from Implementer and Cleaner. Product Validator must also be independent from Verifier; it receives the candidate identity, Verifier pass, accepted journeys, and evidence ledger rather than the Verifier's reasoning context. A prompt change inside one accumulated context is not independence.

## 1. Orient and recover

Inspect repository instructions, canonical product truth, current worktree, available harness guarantees, and existing coordination artifacts. Reload the latest project-profile and goal-map identities before dispatching work. Distinguish accepted decisions from facts, assumptions, evidence, open questions, and superseded input.

Completion criterion: the current outcome, accepted boundaries, protected behavior, current candidate and slice, profile and map identities, live frontier, and blockers are recoverable from durable artifacts rather than conversation history.

## 2. Route the current frontier

Choose the branch that answers the live need. Read only its linked reference; these are routing procedures, not mandatory stages.

- For initial orientation, material re-synchronization, or a human-owned frontier, read [Coordinator synchronization](references/foundation-session.md).
- For a discoverable uncertainty that prevents a decision or a judgeable slice, read [adaptive discovery](references/definition-checkpoint.md).
- For an accepted, judgeable production slice, read [vertical-slice lifecycle](references/delivery-checkpoint.md).
- For optional post-goal promotion, archival, or cleanup, read [closure guidance](references/closure-checkpoint.md).

Discovery can repeat, and independent discovery may continue while a human frontier response is pending. Do not force a delivery route while a material question remains open. Do not require a human-started fresh conversation at a routing boundary; use fresh independent role contexts whenever the harness can provide them.

## 3. Synchronize one judgeable slice

Before asking the human, inspect the repository, profile, goal map, and discovery evidence. Run Matt-style frontier rounds only for unresolved material decisions. When the relevant frontier is empty, play back only what the human needs to judge:

- slice identity and user-visible outcome;
- included and excluded behavior;
- protected data and behavior;
- accepted consequential interface or architecture choices; and
- the Product Validator journey or other observable proof.

Persist the detailed agent-facing contract, the playback, and its acceptance identity. Agent-facing detail may clarify accepted decisions but may not introduce material assumptions. Acceptance authorizes Implementer → Cleaner → Verifier → Product Validator, automatic local repairs, and a focused local commit. There is no second result-acceptance wait before that commit.

If the slice is not yet judgeable, record why and return to adaptive discovery. If new evidence later challenges a material decision, stop at a safe point, preserve the evidence, and re-synchronize only that decision.

Completion criterion: the map links one accepted, judgeable slice to its playback and accepted decisions, protected behavior, validation path, profile identity, and map identity.

## Durable coordination artifacts

Use the repository's established coordination location. When none exists, use a compact durable project-local location such as `docs/goals/<goal-slug>/`; do not duplicate canonical product, code, test, or architecture truth there.

### Project profile

Keep a versioned profile identity with repository-specific policy: build, test, static-analysis, packaging, and gate commands; protected and high-consequence surfaces; architecture constraints; faithful product drivers and environments; Git policy; external-effect policy; harness limits; and gate cadence, cost, pass criteria, and pre-authorized dispositions. A profile change invalidates only evidence affected by that policy change.

### Goal map

Keep one compact durable map with an identity. It records the outcome and final observable proof; accepted material decisions and rationale; boundaries and preserved behavior; current accepted slice; ordered future slices only as current evidence supports; evidence pointers; open risks and blockers; route changes and why; and the current immutable candidate identity separately from the map identity. Only the Coordinator updates accepted decisions and routing state.

Every role dispatch and result names the exact goal-map identity, accepted-slice identity, project-profile identity, base revision, and immutable candidate identity it follows. Roles reject superseded input. If a coordination artifact affects product behavior, it is part of the candidate and must be validated with it.

## Production role dispatch and repair routing

Dispatch temporary roles with the accepted slice, identities, protected behavior, evidence, and their exact authority boundary.

- **Implementer** writes the smallest coherent vertical behavior and behavior-oriented proof. It returns unexpected material evidence to the Coordinator and a candidate to Cleaner.
- **Cleaner** is the write role for local correctness, error handling, strategic cleanup, affected gates, and immutable candidate materialization. It may repair inside accepted decisions, not redefine material behavior or consequential policy.
- **Verifier** is a fresh, read-only independent technical judgment of the cleaned candidate. `Pass` routes to Product Validator; `Repair` routes automatically to Cleaner; `Resynchronize` routes to Coordinator; `Inconclusive` routes to Coordinator with an owner and exact unblock condition.
- **Product Validator** is a fresh, read-only product judgment after a Verifier pass for the same candidate. It exercises every accepted journey through a real product interface. `Pass` makes the candidate eligible for local commit; `Fail` routes automatically to Cleaner; `Inconclusive` routes to Coordinator with an unblock condition.
- After two unsuccessful repairs of the same stable failure, dispatch a fresh Root-cause Diagnostician. A stable failure is a Verifier finding ID, Product Validator journey plus earliest divergence, or gate ID tied to the same unmet obligation. The diagnosis distinguishes local defect, incoherent design, contract gap, harness or environment blocker, and demonstrated capability mismatch. It routes work; it does not authorize a material decision change. Model or harness escalation is never automatic: it requires evidence of a capability mismatch and follows the project profile's routing policy.

A changed candidate receives a new immutable identity, re-enters Cleaner, reruns affected gates, and passes Verifier again before final Product Validation. A bounded repair may return to the same independent reviewer or validator with its stable ledger. Start a fresh full independent review when the design or risk surface materially changes, the candidate chain is unreliable, or the prior role is unavailable.

## Local completion and external authority

After all required gates pass or have valid profile-authorized dispositions, the Verifier passes, and the Product Validator passes the complete accepted journey set against the final candidate, record evidence and inspect the final staged surface. Create one focused local commit only when that surface exactly matches the validated candidate, except permitted coordination-only bookkeeping that cannot affect behavior. Record the commit revision and adapt the future map from evidence.

Do not wait for a human result acceptance before local commit. Do not push, publish a pull request, merge, deploy, pay, destroy data, or mutate production merely because the slice is locally complete. Each external effect needs separate project policy and explicit applicable authority.

Completion criterion: every completed slice has a traceable accepted playback, exact candidate identity, gate ledger, independent technical and product evidence, focused local commit, route changes, residual risk, and separate external-effect disposition.

## Provenance

- Canonical package: `pursue-goal` in `https://github.com/taecontrol/skills.git`.
- Source commit: `d7cef91264450e72ad28f396fbed28c3d2e22d2e`.
- Source basis: `docs/software-factory-v0.1.md` and `docs/software-factory-v0.1-skill-migration.md` at that commit.
- Incorporation mode: Taecontrol-authored evolution of the existing package; no external skill text copied in this migration.
- Taecontrol changes: replaces checkpoint-per-session orchestration with adaptive discovery, Matt-style scoped frontier synchronization, verified vertical-slice delivery, automatic repair routing, independent Verifier and Product Validator contexts, local commit without result-acceptance wait, and separate external-effect authority.
