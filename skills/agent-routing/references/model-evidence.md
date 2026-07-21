# Seed Model Evidence

Load this dated snapshot only when creating or revising routing policy. It is evidence for the example template, not a live availability claim or a universal leaderboard.

- Snapshot: 2026-07-21
- General metric: Artificial Analysis Intelligence Index v4.1
- Costs: API-equivalent benchmark cost per task, not subscription cash

## Active profile evidence

| Exact profile or reference | Score | Proxy USD/task | Note |
| --- | ---: | ---: | --- |
| GPT-5.6 Sol/high | 56 | 0.45 | Frontier GPT route. |
| GPT-5.6 Sol/medium | 54 | 0.31 | Strong reasoning route. |
| Grok 4.5/high | 54 | 0.31 | Fast Cursor serving changes quota, not capability. |
| GPT-5.6 Luna/max | 51 | 0.21 | Exact exception to the normal max ban. |
| GPT-5.6 Luna/high | 46 | 0.09 | Cheap GPT executor. |
| Kimi K3, effort unreported | 57 | 0.95 reference | Max allowed only by exact policy exception. |
| Claude Fable 5/high | unknown | unknown | Max evidence is not evidence for high; use as a provisional taste specialist. |
| Kimi K2.7 Code | unknown | unknown | Coding specialist; no comparable task cost. |
| Composer 2.5 Fast | 34 coding index | 0.56 coding task | Harness-specific; not comparable with the general index. |

## CursorBench 3.2 coding-agent evidence

Checked 2026-07-21. CursorBench 3.2 runs real coding tasks in Cursor's production agent harness. Cost is API-equivalent USD per task; small score differences may be benchmark variance.

| Exact profile | Score | USD/task | Tokens/task | Steps/task |
| --- | ---: | ---: | ---: | ---: |
| Claude Sonnet 5/low | 47.7 | 1.30 | 16,269 | 33 |
| Claude Sonnet 5/medium | 52.4 | 2.16 | 26,200 | 46 |
| Claude Sonnet 5/high | 56.9 | 3.19 | 39,483 | 57 |
| Claude Sonnet 5/xhigh | 58.7 | 4.16 | 52,871 | 67 |
| Claude Sonnet 5/max | 61.5 | 6.45 | 92,882 | 86 |
| Claude Opus 4.8/low | 53.1 | 2.02 | 19,624 | 27 |
| Claude Opus 4.8/medium | 56.1 | 2.81 | 28,384 | 32 |
| Claude Opus 4.8/high | 58.0 | 3.15 | 33,548 | 33 |
| Claude Opus 4.8/xhigh | 59.4 | 4.50 | 51,121 | 40 |
| Claude Opus 4.8/max | 62.3 | 5.77 | 71,411 | 44 |
| GPT-5.6 Luna/high | 56.8 | 0.82 | 15,141 | 40 |
| GPT-5.6 Terra/high | 54.2 | 0.89 | 9,468 | 23 |
| GPT-5.6 Terra/xhigh | 59.2 | 1.44 | 16,089 | 29 |
| GPT-5.6 Sol/low | 52.6 | 1.01 | 5,104 | 19 |
| GPT-5.6 Sol/medium | 60.0 | 1.95 | 9,747 | 27 |
| GPT-5.6 Sol/high | 63.5 | 2.79 | 13,867 | 32 |
| GPT-5.5/medium | 53.8 | 1.51 | 8,522 | 25 |
| Composer 2.5 | 56.1 | 0.44 | 14,286 | 33 |

Sonnet 5/high gained 4.5 score points over medium while using about 51% more tokens, 24% more steps, and 48% more cost. It tied Luna/high within 0.1 point at 3.9x the cost, and Opus 4.8/high exceeded it while costing slightly less and taking 24 fewer steps. Sonnet 5/medium was also dominated by several alternatives, including Opus 4.8/low, GPT-5.6 Sol/low, GPT-5.5/medium, and Composer 2.5.

Artificial Analysis independently found the same efficiency risk at Sonnet 5/max: about 40% more output tokens than Sonnet 4.6, roughly 3x the agentic turns on its knowledge-work evaluations, and around 6x as many turns at max as low effort on GDPval-AA. Its max result is not evidence for medium or high, but it corroborates the long-loop cost failure seen in CursorBench.

## Routing implications

- Luna/high is T1; Luna/max is T2; Sol/medium and Sol/high provide the meaningful GPT escalation.
- Terra is omitted because observed Luna and Sol profiles dominate it on intelligence versus cost. Add it only after relevant local evidence.
- Sol/low is omitted because Luna/max scores higher at nearly the same general benchmark cost.
- For Cursor coding-agent routes, deny Claude Sonnet 5 automatic selection and fallback. Its effort curve is off the observed cost-quality frontier, and lowering effort does not recover competitiveness.
- If a human explicitly wants Claude in Cursor, prefer tuning Claude Opus 4.8 at medium or high effort. Keep that profile human-only when the subagent launch surface cannot set effort; UI availability is not agent availability.
- Treat this as a Cursor coding-route decision, not a universal claim that Sonnet 5 is incapable. Reconsider only after relevant local acceptance/cost evidence or a materially changed harness/model snapshot.
- Keep model, effort, harness, provider, and serving mode attached to every observation.
- Prefer accepted local outcomes for the same task class over this seed snapshot.
- Never compare scores from different metric families directly.

## Sources

- [Artificial Analysis models](https://artificialanalysis.ai/models)
- [GPT-5.6 intelligence versus cost](https://artificialanalysis.ai/articles/gpt-5-6-intelligence-vs-cost-across-sol-terra-luna)
- [Artificial Analysis Coding Agent Index](https://artificialanalysis.ai/agents/coding-agents)
- [Artificial Analysis: Claude Sonnet 5 agentic cost](https://artificialanalysis.ai/articles/claude-sonnet-5-agentic-cost)
- [CursorBench 3.2](https://cursor.com/cursorbench)
- [Claude Sonnet 5 system card](https://www.anthropic.com/claude-sonnet-5-system-card)
- [OpenAI GPT-5.6](https://openai.com/index/gpt-5-6/)
- [Cursor models and pricing](https://cursor.com/docs/models-and-pricing)
- [Kimi thinking effort](https://platform.kimi.ai/docs/guide/use-thinking-effort)
