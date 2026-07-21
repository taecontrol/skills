---
name: agent-routing
description: "Use when deciding whether to delegate or choosing a subagent model, effort, provider, or fallback under capability, taste, cost, quota, latency, and verification constraints."
license: MIT
---

# Agent Routing

Choose the cheapest allowed route likely to produce an accepted result. A route is the complete combination of model, effort, runtime, harness, provider, serving mode, and billing path—not the model name alone.

```text
direct or delegate -> choose lowest sufficient tier -> announce -> execute -> verify -> stop or escalate
```

## Rules

1. **Stay direct when delegation adds no material value.** Deterministic tools, single API calls, exact transformations, and small local checks are T0.
2. **Policy comes before capability.** Use only routes explicitly allowed by the active policy and actually available in the runtime. Never substitute a provider or billing path silently.
3. **Choose the lowest sufficient tier.** Optimize expected cost per accepted result, including likely repairs, verification, latency, and quota—not token price alone.
4. **Pass the route explicitly.** Every subagent launch must set the model and any selectable effort/provider/mode. Do not rely on inheritance or resume. If the tool cannot select the route explicitly, use another harness or keep the work in the parent.
5. **Announce; do not ask.** An allowed route needs a concise notice, not approval. Safety approval for the underlying action remains separate.
6. **Verify before escalating.** A failed brief, tool, harness, or context is not evidence that the model is too weak.
7. **Subscriptions are not free.** Report quota impact and an API-equivalent proxy when known; keep unknown values unknown.

## 1. Decide whether to delegate

Delegate only when at least one benefit is material:

- context isolation;
- independent judgment;
- parallel work on a real critical path;
- a specialized model or harness;
- a bounded handoff that frees the coordinator.

Otherwise execute directly as T0.

Completion criterion: delegation has a concrete benefit, or the task stays direct.

## 2. Shape the task

Judge only the dimensions that can change the route:

- **intelligence:** unsupervised difficulty and ambiguity;
- **taste:** design, API, writing, or product judgment;
- **risk:** reversibility and impact;
- **verification:** deterministic check, rubric, expert judgment, or none;
- **burden:** context size, tools, and expected loop length;
- **latency:** whether faster output justifies extra quota.

Missing requirements are a brief problem, not a reason to buy a stronger model.

Completion criterion: the route-relevant requirements are known or marked unknown.

## 3. Resolve allowed routes

For project policy, check only `.agents/agent-routing/policy.yaml` relative to the project root. If it exists, validate and use it. If it does not, use the explicit constraints and routes already available in the active runtime. Do not create a policy or treat this skill's template as active merely because the skill was invoked.

When the user explicitly asks to save a project policy, start from [`templates/routing-policy.yaml`](templates/routing-policy.yaml), adapt it to verified runtime access, write the canonical path, validate it, read it back, and report the path.

Load [`references/model-evidence.md`](references/model-evidence.md) only when creating or revising policy, not during ordinary routing.

Completion criterion: every candidate is both executable and allowed.

## 4. Choose the lowest sufficient tier

| Tier | Use when |
| --- | --- |
| T0 | Direct execution is cheaper or safer. |
| T1 | Clear, bounded work with cheap verification. |
| T2 | Substantial explicit work or a T1 capability miss. |
| T3 | Ambiguous reasoning, difficult debugging, planning, or synthesis. |
| T4 | Architecture, security, weak verifiers, final adjudication, or exceptional taste. |

Within the tier, choose the route with the lowest expected accepted cost. Prefer local outcomes from analogous tasks over generic benchmarks. Use a specialist only when its specialization matters.

Completion criterion: the selected route is the cheapest credible route, not the most prestigious one.

## 5. Announce and execute

Before delegation, state one concise line:

```text
Route: T2 · Codex → Luna/max · ChatGPT subscription · proxy ≈ $0.21/task · quota unknown · verifier: targeted tests.
```

Include tier, exact route, billing path, known cost/quota, and verifier. Then launch immediately with complete task context and explicit route parameters.

Completion criterion: the human can see what runs, through which paid path, and how it will be judged.

## 6. Verify and classify

Use the cheapest adequate verifier. Classify the result:

- **accepted:** verifier passes;
- **local defect:** bounded repair in the same route;
- **brief defect:** requirements are missing or contradictory;
- **tool/harness failure:** execution path failed;
- **context failure:** retrieve, compress, or decompose;
- **capability failure:** sound brief and tools, inadequate result;
- **quota/availability failure:** route unavailable.

Completion criterion: every attempt ends with an observable verifier result and one classification.

## 7. Escalate narrowly

1. Repair one bounded local defect in the same route.
2. Fix the brief, tool, or context when that caused the failure.
3. Try an allowed complementary route in the same tier when family or harness fit is suspect.
4. Move up one tier only for capability failure or materially increased risk.
5. Stop at the policy ceiling.

Do not retry a route already shown inadequate. Record useful outcomes through existing runtime telemetry when available; do not add logging ceremony or mutate shared policy automatically.

Completion criterion: escalation changes the failed dimension and stays inside policy.
