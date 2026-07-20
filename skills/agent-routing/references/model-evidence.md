# Seed Model Evidence

This is a progressive-disclosure reference, not part of the frequent routing path. Do not load it when an existing policy already names the allowed routes, tiers, and cost disclosures. Use it only to bootstrap or revise that policy, investigate disputed evidence, or perform a scheduled refresh.

It is a dated evidence snapshot for the default routing examples, not a permanent leaderboard or a runtime availability claim.

- Snapshot date: 2026-07-20
- Primary benchmark source: [Artificial Analysis](https://artificialanalysis.ai/)
- Runtime and pricing sources: official OpenAI, Moonshot, Anthropic, and Cursor documentation
- Refresh trigger: model release, benchmark methodology change, price change, subscription-policy change, or enough local telemetry to supersede a seed assumption

Always preserve model, effort, harness, benchmark metric, benchmark version, provider route, and serving mode. `Unknown` means no exact comparable measurement was found; do not impute it from another effort.

## General Intelligence Index

Artificial Analysis reports a weighted API-equivalent cost per task across its Intelligence Index evaluations. These values estimate benchmark execution, not a user's subscription invoice.

| Exact evaluated profile | Intelligence Index | AA cost/task (USD) | Routing note |
| --- | ---: | ---: | --- |
| Claude Fable 5/max with fallback | 60 | 2.75 | Reference only when policy ceiling is high; not evidence for Fable/high. |
| GPT-5.6 Sol/max | 59 | 1.04 | Denied by the default policy. |
| Kimi K3, effort unreported by the benchmark page | 57 | 0.95 | Model-level reference only. Do not claim exact `max` benchmark evidence; allow max only by route-policy exception. |
| GPT-5.6 Sol/high | 56 | 0.45 | Default frontier GPT profile. |
| Claude Opus 4.8/max | 56 | 1.80 | Reference only; not evidence for Opus/high. |
| GPT-5.6 Sol/medium | 54 | 0.31 | Strong GPT profile. |
| Grok 4.5/high | 54 | 0.31 | Strong profile; fast serving is not a separate capability score. |
| Claude Sonnet 5/max | 53 | 1.53 | Reference only; not evidence for Sonnet/high. |
| GPT-5.6 Luna/max | 51 | 0.21 | Denied by the default policy; competes economically with Sol/low rather than T1. |
| GPT-5.6 Sol/low | 49 | 0.20 | Standard GPT profile. |
| GPT-5.6 Luna/high | 46 | 0.09 | Executor GPT profile. |
| Kimi K2.7 Code | 42 | unknown | Coding specialist; AA lists a blended price of about USD 0.70/MTok but no comparable task cost. |

Known exact-profile gaps:

- Fable 5/high: no exact Artificial Analysis Intelligence Index score found.
- Opus 4.8/high: no exact score found.
- Sonnet 5/high: no exact score found.
- Composer 2.5: not evaluated on the general Intelligence Index.

Do not transfer the max scores above to high. Treat the Claude high profiles as policy candidates supported by vendor positioning and local telemetry until an exact public evaluation exists.

## Coding Agent Index

The Coding Agent Index is harness-specific and must not be compared numerically with the general Intelligence Index. Current public leaderboard values use Coding Agent Index v1.2.

| Evaluated agent profile | Coding Agent Index v1.2 | API-equivalent cost/task (USD) |
| --- | ---: | ---: |
| Codex + GPT-5.6 Sol/max | 61 | 7.08 |
| Claude Code + Fable 5/max with fallback | 59 | 11.70 |
| Grok Build + Grok 4.5/high | 58 | 2.59 |
| Kimi Code CLI + Kimi K3 | 57 | 3.18 |
| Claude Code + Opus 4.8/max | 55 | 7.70 |
| Cursor CLI + Composer 2.5 Fast | 34 | 0.56 |

The costs are higher than general-model benchmark costs because coding agents run long tool loops with large context and cache behavior. They are evidence about the exact harness-profile pair, not the base model in isolation.

### Composer methodology break

Artificial Analysis's May 2026 article reported Composer 2.5 at 62 on an earlier Coding Agent Index, with approximately USD 0.07 per task for standard and USD 0.44 for Fast. The current v1.2 leaderboard reports Composer 2.5 Fast at 34 and USD 0.56. Store both with their metric versions; do not present the difference as model regression without methodology-controlled evidence.

Cursor states that Composer 2.5 standard and Fast use the same model. Fast reduces latency but changes pricing and quota burn; it does not warrant a higher capability tier.

## Cursor serving prices

Published per-million-token prices provide an API-equivalent quota proxy for Cursor subscription pools.

| Profile | Input/MTok | Output/MTok | Capability treatment |
| --- | ---: | ---: | --- |
| Composer 2.5 standard | USD 0.50 | USD 2.50 | T1 executor seed. |
| Composer 2.5 Fast | USD 3.00 | USD 15.00 | Same T1 capability; faster, higher quota burn. |
| Grok 4.5 standard | USD 2.00 | USD 6.00 | T3 strong seed. |
| Grok 4.5 Fast | USD 4.00 | USD 18.00 | Same T3 capability; faster, higher quota burn. |

## Seed tier hypotheses

These are routing hypotheses for the supplied policy template, not universal model rankings.

| Tier | Seed profiles | Evidence and caveats |
| --- | --- | --- |
| T1 | Composer 2.5; Kimi K2.7 Code; GPT-5.6 Luna/high | Clear, well-specified work with cheap verification. Composer's evidence is coding-harness-specific. |
| T2 | GPT-5.6 Sol/low | Substantial explicit work. Add other profiles only with policy-specific evidence. |
| T3 | GPT-5.6 Sol/medium; Grok 4.5/high | Both score 54 and approximately USD 0.31/task on the general index. |
| T4 | GPT-5.6 Sol/high; Kimi K3 exact route-policy max exception; Claude Fable 5/high; Claude Opus 4.8/high | Sol/high has an exact general score. Kimi K3's score is model-level with benchmark effort unreported. Claude high assignments are provisional because public scores are max-only. |

Terra is not a preferred seed route: the available GPT-5.6 comparison placed Sol and Luna, but not Terra, on the observed cost-intelligence frontier. A policy may retain Terra as a disabled or availability-only fallback; do not select it merely to fill a tier.

## Evidence precedence

For a concrete route, use evidence in this order:

1. accepted local telemetry for the same task class and exact route;
2. exact harness-profile benchmark on a matching workload;
3. exact model-effort general benchmark;
4. documented model positioning and features;
5. explicit provisional judgment.

Do not average unlike indexes into a synthetic score. If a custom score is needed, normalize within each metric family, publish the weights, and retain the original measurements.

## Sources

- [Artificial Analysis model leaderboard](https://artificialanalysis.ai/models)
- [Artificial Analysis Coding Agent Index](https://artificialanalysis.ai/agents/coding-agents)
- [GPT-5.6 Intelligence vs. cost across Sol, Terra, and Luna](https://artificialanalysis.ai/articles/gpt-5-6-intelligence-vs-cost-across-sol-terra-luna)
- [Composer 2.5 Coding Agent Index article](https://artificialanalysis.ai/articles/cursor-composer-2-5-coding-agent-index)
- [Moonshot thinking effort](https://platform.kimi.ai/docs/guide/use-thinking-effort)
- [Kimi K3 quickstart](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart)
- [Cursor model and pricing documentation](https://cursor.com/docs/models-and-pricing)
