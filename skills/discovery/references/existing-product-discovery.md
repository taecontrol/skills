# Existing Product Discovery

Load this branch when the input is an existing MVP, codebase, internal tool, inherited product, or working system with unclear behavior, technical debt, bugs, operational risk, or vague improvement requests.

Goal: discover what product actually exists today, how it works, where it hurts, which vices matter, and what the next responsible intervention should be.

Treat the existing system like a dungeon built by another party. Map before conquering.

## Orient from raw input

Capture what is claimed without pretending it is true:

- what the product is claimed to do
- known users or customers
- claimed pain or improvement request
- available repo, docs, demo, production URL, logs, or access
- known constraints and scary areas
- any immediate operational risk

Completion criterion: the raw input is summarized in `discovery/discovery-brief.md` under `Raw input / what we were told`.

## Map the system before recommending intervention

Start with the zones that affect the requested decision:

- Product archaeology: what the product actually does.
- Workflow tracing: how real users move through it.
- Code archaeology: architecture, seams, modules, coupling, tests.
- Data archaeology: entities, states, invariants, migrations, data quality.
- Operational reconnaissance: deployment, environments, logs, secrets, jobs, backups, alerts.
- Pain validation: whether reported pain is real, frequent, severe, and correctly diagnosed.
- Risk containment: what not to touch until understood.
- Improvement shaping: what responsible next intervention should be.

Use `templates/current-state-map.md` when the current system is unclear enough that the brief alone would become overloaded.

Use `templates/next-version-brief.md` only after current-state clarity is high enough to shape an evidence-backed next intervention.

## Vice classification

Do not refactor because code looks ugly. First classify the vice:

| Vice type | Question |
|---|---|
| User pain | Does it hurt real users? |
| Business pain | Does it block revenue, operations, compliance, or strategy? |
| Bug | Can it be reproduced or evidenced? |
| Tech debt | Does it slow or endanger known changes? |
| Architecture risk | Does it create hidden coupling, unclear ownership, or unsafe boundaries? |
| Data risk | Can it corrupt, lose, duplicate, or misinterpret important data? |
| Operational risk | Can it fail silently, deploy unsafely, or be impossible to recover? |
| Security risk | Can it expose, escalate, inject, leak, or bypass controls? |
| Taste issue | Is it merely disliked but not materially harmful? |

Only recommend implementation after the vice is tied to evidence and a product/system goal.

## Good ticket shapes

Prefer tickets that map one uncertain part of the system:

- `product-archaeology` — unclear behavior or workflows
- `code-archaeology` — unclear architecture, modules, seams, hazards
- `data-archaeology` — unclear entities, states, migrations, data risks
- `operational-recon` — unclear deployments, logs, jobs, backups, ownership
- `pain-validation` — reported pain may be anecdotal or misdiagnosed
- `risk-containment` — touching the system may break critical behavior
- `technical-spike` — integration, performance, migration, or feasibility is unknown
- `decision` — evidence is enough and a choice must be made

Load `references/ticket-types.md` when choosing among all ticket types.

## Mode-specific checkpoint

Checkpoint outcomes most common in this mode:

- `Continue discovery` — product behavior, users, risks, or constraints are still fog.
- `Create next-version brief` — current-state clarity is high enough to shape the next intervention.
- `Stabilize / harden` — operational or reliability risk is the responsible next move.
- `Refactor with scope` — technical debt blocks a known product/system goal.
- `Technical spike` — feasibility or safety is the central risk.
- `Park or kill` — the requested intervention is weak, mis-scoped, or not worth the cost.
