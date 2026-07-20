# Portable Routing Policy

A routing policy separates capability classification from the tool that can execute it. This reference is for creating or revising an optional durable YAML policy in a local or project configuration. It is not an instruction to generate YAML for every task, and ordinary routing should not reload this file when a policy is already in force.

When durable policy data is useful, copy [`../templates/routing-policy.yaml`](../templates/routing-policy.yaml) into the chosen local or project configuration and modify only fields evidenced by the actual runtime. The template is a starting point, not an automatically created runtime artifact.

## Identity model

A capability profile identifies model-level capability:

```yaml
profile:
  id: gpt-5.6-luna-high
  model: gpt-5.6-luna
  effort: high
  capability_tier: T1
```

An execution route identifies how that capability is reached:

```yaml
route:
  id: codex-luna-high
  profile: gpt-5.6-luna-high
  runtime: codex
  harness: codex-cli
  provider: openai-codex
  billing_mode: subscription_quota
  serving_mode: standard
```

Do not hide runtime or provider in the capability-profile ID: the same model can behave differently under another harness, and the same runtime can expose different billing paths. The execution route is the complete selectable identity.

## Required policy sections

### Defaults

- `deny_unlisted_routes`: closed-world provider access. Recommended `true`.
- `no_silent_provider_substitution`: a route outage cannot authorize a relay.
- `cross_runtime`: `explicit_only` or `allowed`; routing never prompts for permission.
- `limits`: hard cost, quota, provider, and runtime boundaries. A route outside them is unavailable.
- `telemetry`: automatic or sampled capture rules, exposed fields, and an explicit sink such as `runtime_logs` or a concrete local/project path.

### Effort policy

Declare normally allowed and denied effort labels. `fixed` means the surface exposes no selectable reasoning effort; it is an allowed immutable state, not a synonym for `max`. An exception must name the exact profile and allowed execution route. A family-wide exception is invalid.

```yaml
effort_policy:
  allowed: [fixed, low, medium, high]
  denied: [max, xhigh, extra-high, ultra]
  exceptions:
    - profile: kimi-k3-max
      routes: [moonshot-kimi-k3]
      reason: fixed_or_normal_surface_profile
```

`ultra` is a multi-agent strategy, not a child effort. Keep it denied for delegated profiles even when an orchestrator supports structural escalation.

### Profiles

Profiles assign task-role tiers and evidence. Tier membership is policy-specific and can change when telemetry changes.

Useful fields:

- canonical model and effort;
- capability tier;
- preferred task classes;
- context/tool requirements;
- benchmark references with exact metric and version;
- confidence and review date;
- serving modes that alter latency or cost without altering capability.

### Routes

Routes list only execution paths that exist and are authorized. Omission means unavailable when `deny_unlisted_routes` is true.

Useful fields:

- runtime, harness, provider, and billing mode;
- subscription pool or metered account;
- supported profile;
- enabled state;
- cost basis and quota observability;
- runtime-specific model identifier;
- availability-only fallback status.

Every subscription route must reference a `cost_disclosure` entry. The entry may contain an exact task proxy, token rates, a non-exact reference, or explicit `unknown`; it must never imply zero cost from missing telemetry.

### Provider constraints

A provider may be allowed generally but denied for specified profiles. This prevents policy laundering through a relay.

```yaml
provider_constraints:
  openrouter:
    deny_profile_patterns:
      - "gpt-5.6-*"
      - "kimi-*"
```

Apply deny rules before candidate ranking. Never reinterpret a denied path as allowed because the model itself appears in an allowlist elsewhere.

## Billing modes

Use one of these values:

| Mode | Meaning | Cost report |
| --- | --- | --- |
| `metered_api` | Direct token or request billing | Estimated and actual cash when exposed. |
| `subscription_quota` | Fixed plan with usage pool | API-equivalent proxy plus quota units or impact band. |
| `fixed_subscription` | Fixed plan without exposed quota | API-equivalent proxy and `quota_impact: unknown`. |
| `unknown` | Billing path cannot be established | No monetary claim; require policy disposition. |

Do not convert quota to dollars without a documented conversion. Keep cash, API-equivalent cost, and quota impact as separate fields.

## Preauthorization and limits

Routing never asks the user to approve a selected model. Encode the boundary before execution:

- if expected metered cost exceeds the configured ceiling, exclude the route;
- if an effort has no exact policy exception, exclude the route;
- if a provider or runtime switch is not already allowed, exclude the route;
- if unknown quota impact is forbidden for large runs, exclude the route.

An allowed route may proceed after its concise announcement. If no allowed route survives, report the blocking constraint instead of asking for an exception. Separate action-level safety controls still govern destructive, public, security-sensitive, or financially consequential operations; this routing policy neither grants nor requests that authority.

## Fallback semantics

Fallbacks must declare their cause:

- `availability_only`: preferred route is unavailable or quota-exhausted;
- `family_fit`: exact task type has stronger local evidence on another family;
- `capability_escalation`: sound attempt failed for a model-capability reason;
- `latency`: deadline justifies a faster serving mode;
- `human_choice`: user explicitly selects another runtime or paid path.

A fallback is not a generic ordered list. Apply only entries whose cause matches the observed disposition.

## Telemetry record

Telemetry is primarily for later review and improvement of the local routing policy. Prefer automatic runtime logs. Do not create a record for every small task; manually capture failures, repairs, escalations, unusual cost or risk, and occasional calibration samples. A minimum portable record, when one is warranted, is:

```yaml
timestamp: 2026-07-20T00:00:00Z
task_class: implementation
envelope:
  ambiguity: low
  verification: deterministic
  risk: low
  scope: bounded
route:
  tier: T1
  profile: gpt-5.6-luna-high
  route_id: codex-luna-high
  harness: codex-cli
estimate:
  cash_usd: unknown
  api_equivalent_proxy_usd: 0.09
  quota_impact: unknown
  confidence: medium
actual:
  cash_usd: unknown
  quota_units: unknown
  input_tokens: unknown
  cached_input_tokens: unknown
  output_tokens: unknown
  elapsed_seconds: unknown
outcome:
  verifier: targeted-tests
  accepted_first_pass: true
  repairs: 0
  escalated: false
  final_profile: gpt-5.6-luna-high
```

Use `unknown`, not zero, when the runtime does not expose a value. Store records only in the configured runtime-log sink or concrete local/project path. Telemetry may inform an explicit policy review, but collection must never mutate the policy, shared skill, or seed evidence automatically.

## Policy validation

Before using a policy:

1. Verify every route references an existing profile.
2. Verify every profile has one tier and an effort that is allowed or exactly excepted for each route.
3. Verify every denied-effort exception names exact routes.
4. Verify fast modes do not change capability tier.
5. Verify every subscription route references an existing cost disclosure with explicit cash, API-equivalent, and quota fields; unknown values must be literal `unknown`, never zero.
6. Verify provider deny rules are evaluated before fallbacks.
7. Verify every fallback has a declared cause.
8. Verify unlisted routes are denied or the policy explicitly accepts an open world.
9. Verify benchmark evidence includes metric, version or explicit `not-published`, effort match, and harness when applicable.
10. Verify no non-exact benchmark is stored as an exact score or cost proxy.
11. Verify cost, quota, provider, and runtime limits can be evaluated without prompting for routing approval.
12. Verify telemetry capture is automatic or sampled, names `runtime_logs` or a concrete local/project path, forbids automatic mutation of policy, shared skill, and seed evidence, and does not require a manual record for every task.
13. Run representative scenarios for T0, each configured tier, route outage, quota exhaustion, bad brief, tool failure, capability failure, and denied provider substitution.

Completion criterion: every possible selected route is both executable and authorized, and every disallowed route remains unreachable through fallbacks.
