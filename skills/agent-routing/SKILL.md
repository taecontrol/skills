---
name: agent-routing
description: "Use when deciding whether to delegate work or selecting a subagent model, reasoning effort, provider, serving mode, or fallback under cost, subscription, quota, latency, verification, risk, context, and tool constraints. Routes the lowest expected-cost allowed profile likely to produce an accepted result, announces the route, and escalates only after classified evidence."
license: MIT
---

# Agent Routing

Agent Routing chooses whether delegation is useful and, when it is, selects an allowed execution route. A **capability profile** identifies the model and reasoning effort; an **execution route** adds the harness, provider, serving mode, and billing path. The selected identity is the complete route, not the model name alone.

The objective is the **lowest expected cost per accepted result**, not the lowest price per token or the highest benchmark score. Cost includes failed attempts, repairs, verifier work, tool use, latency, context consumption, quota burn, and escalation.

The core loop is:

```text
directness gate -> task envelope -> allowed routes -> capability gate -> expected-cost choice -> announce -> execute -> verify -> classify -> stop or escalate
```

## When to use

Use this skill when:

- choosing whether work belongs in the current agent or a subagent;
- choosing among model families, efforts, providers, subscriptions, harnesses, or fast modes;
- designing or applying tiered routing and fallback policy;
- estimating monetary cost or subscription-quota impact before delegation;
- deciding whether a failed attempt warrants repair, decomposition, another family, or a higher tier;
- comparing routing evidence or updating a model catalog from telemetry and benchmarks.

Do not use it to choose a deterministic shell command, ordinary tool call, or direct mechanical operation. Those remain T0.

## Non-negotiable invariants

1. **Policy before capability.** Never use an unlisted provider, bypass a denied route, or silently substitute a billing path because the same model exists elsewhere.
2. **Exact route identity.** Model, effort, harness, provider, and serving mode can change capability, cost, and quota impact. Never collapse them into one model label.
3. **Capability gate before price.** Eliminate profiles that are unlikely to satisfy the task before comparing their costs.
4. **One metric family at a time.** Do not compare scores from different benchmark indexes as if they shared a scale.
5. **Exact benchmark match.** A `max` result is evidence about `max`, not an inferred score for `high`.
6. **No free subscriptions.** Report included-in-subscription execution as quota consumption with an API-equivalent proxy when available, not as zero cost.
7. **No blind escalation.** Escalate only after a verifier or observable failure identifies a capability-relevant cause.
8. **Tier and effort are orthogonal.** T4 does not mean `max`; fast serving does not mean greater intelligence.
9. **No recursive frontier strategy.** Multi-agent or Ultra-style escalation is an orchestrator strategy, never an effort a delegated child may invoke recursively.
10. **No routing approval prompts.** A route is already authorized by policy or it is excluded. The route announcement is a notice, not a request for permission; action-level safety rules remain separate.

## 1. Apply the directness gate

Keep the work in T0 when the current agent or a deterministic tool can complete it without material loss of context, isolation, parallelism, or specialized capability. Common T0 work includes arithmetic, file reads, formatting, exact transformations, single API calls, and mechanical verification.

Delegate only when at least one benefit is material:

- context isolation protects the coordinator;
- independent review reduces correlated error;
- parallel investigation shortens a real critical path;
- a specialized harness or model fits the task;
- the work is bounded enough for a self-contained handoff.

Completion criterion: the route records either `T0` with a direct execution reason or a concrete delegation benefit. “Use an agent” is not a reason.

## 2. Build the task envelope

Describe the task before looking at model names:

- **ambiguity:** explicit, bounded, or open-ended;
- **verification:** deterministic, rubric-based, expert judgment, or absent;
- **risk:** reversibility, blast radius, security, money, data, or publication impact;
- **scope:** local edit, multi-file change, repository-wide work, or cross-system synthesis;
- **tool burden:** expected tools, terminal loops, browser work, or long-running execution;
- **context burden:** relevant input size and expected intermediate state;
- **latency value:** whether faster completion justifies higher quota burn;
- **specialization:** implementation, debugging, review, research, architecture, or synthesis.

A clear task with a cheap verifier can use a lower tier than an equally large task with ambiguous acceptance. A small irreversible security decision may need a higher tier than a large mechanical migration.

Completion criterion: every dimension that could change the route is known or explicitly marked unknown; missing material requirements are clarified rather than compensated for with a stronger model.

## 3. Load policy and available routes

When creating or changing a durable local or project policy, load [`references/policy-schema.md`](references/policy-schema.md) and begin from [`templates/routing-policy.yaml`](templates/routing-policy.yaml). These are optional authoring assets, not files to create or load for every task. During ordinary routing, inspect the policy already in force plus the actual tool, authenticated provider, model availability, effort controls, subscription pool, and quota state. Do not infer access from a generic model catalog.

Filter candidates in this order:

1. current runtime can invoke the route;
2. provider and billing path are explicitly allowed;
3. model, effort, and serving mode are allowed;
4. context and tool requirements fit;
5. remaining quota or budget can support an attempt and its verifier.

If no route survives, report the constraint. Do not fall back through an unauthorized relay or provider.

Completion criterion: every candidate considered is executable through a named allowed route, and every excluded candidate has a policy, availability, capability, context, or budget reason.

## 4. Choose the lowest sufficient tier

Use these role-based tiers. The model catalog may assign different profiles from one model family to different tiers.

| Tier | Role | Typical envelope |
| --- | --- | --- |
| T0 | Direct | Deterministic or cheaper in the coordinator; no delegation benefit. |
| T1 | Executor | Clear scope, low ambiguity, cheap verifier, bounded implementation or extraction. |
| T2 | Standard | Substantial but explicit work, moderate context, reproducible debugging or review. |
| T3 | Strong | Material ambiguity, broad codebase reasoning, difficult debugging, planning, or multi-source synthesis. |
| T4 | Frontier | High-impact architecture, security, contested synthesis, weak verifiers, or final adjudication. |

Apply a capability gate: choose the lowest tier with credible evidence that at least one allowed profile can succeed. Evidence order is:

1. accepted telemetry from analogous user tasks;
2. exact-profile task benchmarks in a matching harness;
3. exact-profile general benchmarks;
4. vendor positioning and documented features;
5. a provisional hypothesis labeled with low confidence.

Do not load [`references/model-evidence.md`](references/model-evidence.md) during normal routing when the active policy already assigns profiles and costs. Load it only to bootstrap or revise the policy, investigate disputed evidence, or perform a scheduled evidence refresh. Do not let a leaderboard override repeated local success on a narrower task class.

Completion criterion: the selected tier is justified by the task envelope and evidence, not prestige, habit, or a single aggregate score.

## 5. Choose the route by expected accepted cost

Within the selected tier, rank allowed profiles by expected cost to an accepted result:

```text
attempt cost
+ likely repair cost
+ verifier cost
+ probability-weighted escalation cost
+ latency value
+ quota opportunity cost
```

Use a calculation tool when numeric estimates are available. Do not invent a monetary conversion for subscription quota. Preserve separate fields for:

- `cash_estimate`: expected metered charge when known;
- `api_equivalent_proxy`: benchmark or token-price estimate;
- `quota_impact`: measured units, relative band, or `unknown`;
- `estimate_confidence`: high, medium, or low;
- `cost_source`: runtime telemetry, benchmark, token model, or unknown.

Serving modes such as `fast` remain attached to the same capability profile. Select fast mode only when its latency value justifies its higher cost or quota burn.

Completion criterion: the selected route is the least costly credible route after accounting for failure and verification, and unknown quota impact remains visibly unknown.

## 6. Announce before delegation

Before launching a subagent, disclose the decision in one concise line:

```text
Route: T1 · Codex → GPT-5.6 Luna/high · ChatGPT subscription · AA proxy ≈ $0.09/task · quota impact unknown · verifier: targeted tests.
```

Include:

- tier;
- runtime/provider route;
- exact model and effort;
- serving mode when nonstandard;
- billing mode;
- cost estimate or API-equivalent proxy and its basis;
- quota impact when available;
- planned verifier.

Never pause to ask for routing approval. Announce and run an allowed route. If a budget ceiling, provider rule, effort rule, runtime boundary, or quota rule excludes it, remove it from consideration and choose another allowed route or report that no route is available. Authorization for destructive or public actions belongs to the action's safety policy, not to model routing.

Completion criterion: the human can see what will run, through which paid path, why it is sufficient, and how success will be judged.

## 7. Verify and classify the result

Verification does **not** imply launching another agent. Use the cheapest adequate check:

- for T0 and routine T1 work, prefer deterministic read-back, parsing, exact comparison, targeted tests, or another local tool check;
- use the coordinator's own rubric for bounded judgment calls;
- add independent-agent review only when correlated-error risk, weak deterministic verification, or task impact justifies its extra cost.

Run that verifier before accepting the result. Then classify the disposition:

- **accepted:** verifier passes and no material uncertainty remains;
- **local defect:** bounded error repairable in the same profile;
- **brief defect:** missing or contradictory requirements; repair the handoff, not the model tier;
- **tool or harness failure:** fix or change the adapter without claiming model incapacity;
- **context failure:** retrieve, compress, or decompose before increasing capability;
- **capability failure:** reasoning or execution remains inadequate despite a sound brief, route, and verifier;
- **quota or availability failure:** choose another explicitly allowed route at the same tier when possible.

A plausible answer without an adequate check is not evidence of success. A tool outage is not evidence for a stronger model, and a second agent is not the default verifier.

Completion criterion: the attempt ends with an observable verifier result and one disposition; ambiguous failures are investigated before routing changes.

## 8. Escalate narrowly

Use the smallest response that addresses the classified failure:

1. repair a local defect once in the same profile when the correction is bounded;
2. fix the brief, tool route, context, or decomposition when that is the cause;
3. try a complementary allowed profile in the same tier when family or harness fit is suspect;
4. move up one tier only for evidenced capability failure or materially increased risk;
5. use independent review or human decision instead of forbidden effort;
6. stop at the configured ceiling.

Do not repeatedly retry a weak profile after evidence shows it is inadequate. Do not automatically increase effort after any failure. Exceptions to denied efforts apply only to the exact profiles and routes declared by policy.

Completion criterion: escalation changes the failed dimension, remains inside policy and budget, and records why the previous route was insufficient.

## 9. Learn from telemetry without per-task ceremony

Prefer telemetry the runtime already exposes. Do not create a YAML file, launch a verifier agent, or interrupt the user merely to log every small task. Add a manual record only for failed, repaired, escalated, unusually costly or risky attempts, plus occasional calibration samples. The optional record shape lives in [`references/policy-schema.md`](references/policy-schema.md).

Record token, cache, quota, duration, tool, repair, and acceptance fields only when exposed; use `unknown`, never fabricated zeroes. During an explicit policy review, compare acceptance rate and expected accepted cost by task class, exact profile, and runtime. Use relevant repeated evidence to revise the local policy. Never rewrite this shared skill or its seed tiers automatically from telemetry; a human-reviewed change should explain the sample and rationale.

Completion criterion: useful routing evidence is retained when available without adding work to every small task, and policy changes remain auditable and human-reviewed.

## Common pitfalls

1. **Leaderboard routing:** selecting the highest aggregate score without matching task, harness, effort, or verifier. Apply the capability gate and local evidence order.
2. **Subscription-is-free:** reporting no cost because the invoice is fixed. Show quota impact and API-equivalent opportunity cost.
3. **Model-name collapse:** treating standard, fast, low, high, max, and different harnesses as interchangeable. Keep the full profile identity.
4. **Policy laundering:** reaching a denied model through a relay because the model itself is allowed elsewhere. Provider and billing path are part of permission.
5. **Escalation reflex:** changing to a stronger model after a bad brief, tool failure, or context overflow. Classify first.
6. **Metric mixing:** comparing an Intelligence Index score directly with a Coding Agent Index score. Keep metric families and versions separate.
7. **Max leakage:** using a published max score to justify a high profile, or treating one max exception as a general permission.
8. **Fast inflation:** assigning a higher capability tier because serving is faster. Fast is a latency/cost modifier only.
9. **Tier absolutism:** assuming a profile belongs to one universal tier. Tier assignment is policy- and task-distribution-specific and should move with evidence.

## Verification checklist

- [ ] Directness gate applied before model selection.
- [ ] Task envelope includes ambiguity, verification, risk, scope, tools, context, and latency value.
- [ ] Runtime, harness, provider, billing path, effort, and serving mode are explicitly allowed.
- [ ] Selected tier is the lowest with credible success evidence.
- [ ] Benchmark metric, version, harness, and effort match are preserved.
- [ ] Cost disclosure distinguishes cash, API-equivalent proxy, and quota impact.
- [ ] Route and verifier are announced before delegation.
- [ ] Result is verified and disposition classified.
- [ ] Escalation addresses the failed dimension and stops at the policy ceiling.
- [ ] Telemetry records unknowns honestly and can update future routing.
