---
name: agent-routing
description: "Use when an orchestrator is dispatching one or more subagents and must choose ordered model and effort profiles under capability, cost, quota, availability, and verification constraints."
license: MIT
---

# Agent Routing

Select a canonical model/effort profile for each subagent dispatch. Policy is harness-agnostic: it defines disabled models, profiles, strict tier order, and escalation semantics; the active harness supplies its own executable identifiers.

```text
shape task -> choose tier -> first available profile -> announce -> dispatch -> verify -> stop or escalate
```

## Rules

1. **Scope is subagent dispatch.** Invoke this skill only after the orchestrator has decided to delegate. For several subagents, route each bounded task independently.
2. **Policy comes before capability.** Remove disabled models and forbidden providers before considering a tier. Never substitute a denied profile or provider.
3. **Tier order is strict.** Select the first available profile in the lowest sufficient tier. A later same-tier profile is an availability fallback only.
4. **Canonical policy, local adapter.** Match each canonical model/effort/mode profile to the exact options exposed by the active harness. Harness identifiers do not belong in portable policy. Do not rely on inheritance.
5. **Announce; do not ask.** An allowed dispatch needs a concise notice, not approval. Safety approval for the underlying action remains separate.
6. **Verify before escalating.** A failed brief, tool, harness, or context is not evidence that the model lacks capability.
7. **Subscriptions are not free.** Report quota impact and an API-equivalent proxy when known; keep unknown values unknown.

## 1. Shape each delegated task

Judge only dimensions that can change the tier:

- **intelligence:** unsupervised difficulty and ambiguity;
- **taste:** design, API, writing, or product judgment;
- **risk:** reversibility and impact;
- **verification:** deterministic check, rubric, expert judgment, or none;
- **burden:** context size, tools, and expected loop length.

Missing requirements are a brief defect, not a reason to buy a stronger model. When dispatching several subagents, classify each handoff separately rather than routing the batch at its highest difficulty.

Completion criterion: every delegated task has a bounded brief and one lowest sufficient tier.

## 2. Load policy and resolve availability

Check only `.agents/agent-routing/policy.yaml` relative to the project root. If it exists, validate and use it. If it does not, use the explicit constraints and profiles exposed by the active harness. Do not create a policy or treat this skill's template as active merely because the skill was invoked.

When the user explicitly asks to save project policy, start from [`templates/routing-policy.yaml`](templates/routing-policy.yaml), adapt its canonical profiles and order, write the canonical path, validate it, read it back, and report the path. Load [`references/model-evidence.md`](references/model-evidence.md) only when creating or revising policy.

Resolve a canonical profile against the current launch tool. It is unavailable when the exact model/effort/mode combination is absent, denied, quota-exhausted, or rejected by the launcher. Different harness identifiers may map to the same canonical profile; never store those identifiers in portable policy.

Completion criterion: disabled models are excluded and availability is known for every profile considered in the selected tier.

## 3. Select the first available profile

| Tier | Use when |
| --- | --- |
| T1 | Clear, bounded work with cheap verification. |
| T2 | Substantial explicit work or a T1 capability miss. |
| T3 | Ambiguous reasoning, difficult debugging, planning, or synthesis. |
| T4 | Architecture, security, weak verifiers, final adjudication, or exceptional taste. |

Apply the policy literally:

1. Start at the lowest sufficient tier.
2. Traverse that tier's profiles in declared order.
3. Select the first available profile; do not skip it for family preference or prestige.
4. Try the next same-tier profile only when the preceding profile is unavailable.
5. If the entire tier is unavailable, continue at the first profile of the next tier.
6. After a verified capability failure, move directly to the first available profile in the next tier; do not try another profile in the failed tier.

Completion criterion: the selected profile is the first available entry allowed by the strict tier order.

## 4. Announce and dispatch

Before delegation, state one concise line:

```text
Route: T2 · Terra/high · Cursor subscription · proxy ≈ $0.89/task · quota unknown · verifier: targeted tests.
```

Include tier, canonical profile, active harness/billing path, known cost or quota, and verifier. Then launch immediately with the complete task context and the harness's exact parameter for that canonical profile.

Completion criterion: the human can see which profile runs, through which paid path, and how the result will be judged.

## 5. Verify and classify

Use the cheapest adequate verifier. Classify the result:

- **accepted:** verifier passes;
- **local defect:** bounded repair in the same profile;
- **brief defect:** requirements are missing or contradictory;
- **tool/harness failure:** execution path failed;
- **context failure:** retrieve, compress, or decompose;
- **capability failure:** sound brief and tools, inadequate result;
- **availability failure:** profile cannot be launched or quota is exhausted.

For an implementation candidate that fails independent review, do not infer `capability failure` from the number of findings or review rounds. Use the review ledger to check whether the missed obligation was explicit, the high-interaction preflight modeled it when applicable, a red-capable verifier existed, and the context, tools, and harness worked. A `contract-gap` or `architecture-gap` is not repaired by buying a stronger profile.

Completion criterion: every attempt ends with an observable verifier result and one classification.

## 6. Escalate narrowly

1. Return bounded `implementation-defect` or `repair-regression` findings to the same implementer context and profile when available, but never create a third repair candidate without Mission Control's root-cause disposition.
2. Fix the brief, tool, or context when that caused the failure.
3. For availability failure, continue to the next profile in the same tier; if none is available, move up one tier.
4. For capability failure, move up one tier and begin at its first available profile.
5. Stop at the policy ceiling.

Treat capability failure as demonstrated only when the contract, relevant interaction model, context, tools, and verifier were adequate and a bounded repair did not resolve the explicit-obligation failure. Do not retry a profile already shown incapable, use same-tier availability fallback as a hidden capability retry, or change profiles merely to reset context. Record useful outcomes through existing runtime telemetry when available; do not add logging ceremony or mutate shared policy automatically.

Completion criterion: every fallback or escalation follows the declared order and changes the failed dimension.
