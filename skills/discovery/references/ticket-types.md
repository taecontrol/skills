# Discovery Ticket Types

Use exactly one Type per Discovery ticket, whether standalone or Mission-managed. Add a custom Type only when none fit, and explain its method, output, and human involvement before activation.

| Type | Use when | Output | Human involvement |
|---|---|---|---|
| `grilling` | A stakeholder or human must clarify intent | Answered questions, decisions, open follow-ups | Collaborative. Group decision-driving questions; do not ask one minor detail at a time. |
| `research` | External/domain/market/docs knowledge is needed | Evidence summary with sources | Usually autonomous until evidence creates a material choice or access blocker. |
| `interview` | Real user/customer input is needed | Interview notes, patterns, quotes, confidence | Human-led or collaborative interview; prepare a focused guide and synthesize afterward. |
| `prototype` | A concrete artifact is needed to provoke feedback | Prototype link/path and reaction notes | Build autonomously within scope, then involve the human at a named reaction checkpoint. |
| `technical-spike` | Feasibility, integration, performance, or architecture is uncertain | Reproducible experiment and conclusion | Usually autonomous; stop if the experiment requires a material risk, cost, or architecture choice. |
| `product-archaeology` | Existing product behavior is unclear | Product behavior map and workflows | Autonomous unless unavailable user context is the only evidence source. |
| `code-archaeology` | Existing code structure is unclear | Architecture notes, modules, seams, hazards | Autonomous repository investigation. |
| `data-archaeology` | Data model, states, migrations, or records are unclear | Entity/state map and data risks | Autonomous with read-only evidence; ask before risky or production data access. |
| `operational-recon` | Deployment, environments, logs, jobs, backups, or ownership are unclear | Ops map and risk list | Autonomous for available evidence; ask for unavailable access or material operational risk. |
| `pain-validation` | Reported pain may be anecdotal or misdiagnosed | Evidence of frequency, severity, affected users | Often collaborative when user/customer evidence is required; group the evidence request. |
| `risk-containment` | Touching the system may break critical behavior | Do-not-touch zones, safe probes, rollback notes | Ask only when risk appetite or permission for a probe is material. |
| `decision` | Evidence is sufficient to recommend a choice for human acceptance | Proposed decision, rationale, tradeoffs, consequences | Mission Control chooses; the agent recommends and records consequences. |
| `task` | Manual setup is required before discovery can continue | Completed setup or precise human checklist | Human only for steps tools cannot perform; keep the checklist bounded. |

The Type is a navigation signal, not a new authority level. In Mission, `Kind: Discovery` controls routing and Mission Control still owns material decisions.
