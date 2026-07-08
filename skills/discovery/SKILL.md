---
name: discovery
description: Manual workflow for turning vague software product ideas or poorly understood existing MVPs/codebases into Discovery Briefs through fog-of-war exploration.
license: MIT
---

# Discovery

This is a manual-first skill: invoke it explicitly when you want to turn vague product or codebase fog into repository-owned discovery artifacts.

Use this skill when a human manually invokes discovery for a software product, requirement, MVP, or existing codebase that is too vague to responsibly specify, plan, refactor, or build.

Discovery is not implementation planning. Discovery reduces uncertainty until a responsible next move is visible.

Core rules:

- Do not convert fog into requirements. Convert fog into questions first.
- Do not convert vices into refactors. Convert vices into evidence first.
- Work one unknown at a time. A discovery ticket should answer one sharp question.
- Keep discovery tickets separate from implementation tickets.
- Store discovery artifacts as Markdown in the repository so humans and other agents can continue the map.

## Default repository structure

Create this structure at the repository root when it does not already exist:

```text
discovery/
  discovery-brief.md
  exploration-map.md
  evidence-log.md
  tickets/
  archive/
```

For existing products, the same folder may also contain:

```text
discovery/
  current-state-map.md
  next-version-brief.md
```

## Two discovery modes

Choose the mode before creating or updating artifacts.

### New Product Discovery

Use when the input is a vague idea, vague requirement, stakeholder request, or new product concept.

Goal: discover what product should exist, for whom, why it matters, what V1 might be, and what must be learned before shaping/building.

### Existing Product Discovery

Use when the input is an existing MVP, codebase, internal tool, inherited product, or working system with unclear behavior, technical debt, bugs, operational risk, or vague improvement requests.

Goal: discover what product actually exists today, how it works, where it hurts, which vices matter, and what the next responsible intervention should be.

## Workflow

### 1. Orient from the raw input

Capture what the human or stakeholder said without pretending it is true.

For a new product, capture:

- requested idea or requirement
- requester / stakeholder
- perceived problem
- guessed user or customer
- urgency, deadline, or pressure
- any proposed solution already implied

For an existing product, capture:

- what the product is claimed to do
- known users or customers
- claimed pain or improvement request
- available repo, docs, demo, production URL, logs, or access
- known constraints and scary areas
- any immediate operational risk

Completion criterion: the raw input is summarized in `discovery/discovery-brief.md` under a section named `Raw input / what we were told`.

### 2. Create or update the Discovery Brief seed

If `discovery/discovery-brief.md` does not exist, create it from the template below. If it exists, read it first and update it instead of starting over.

The seed is allowed to be incomplete. It should make uncertainty visible, not hide it.

Completion criterion: `discovery/discovery-brief.md` exists and clearly marks what is known, assumed, unknown, decided, and rejected.

### 3. Build the Exploration Map

Create or update `discovery/exploration-map.md` as the index of discovery work.

The map is not a knowledge dump. It should point to tickets and summarize the frontier.

Completion criterion: the map has:

- discovery mode
- destination
- decisions so far
- open frontier tickets
- blocked tickets
- not-yet-specified fog
- out-of-scope items

### 4. Convert fog into discovery tickets

Create Markdown tickets under `discovery/tickets/`. Use one ticket per question.

Naming format:

```text
discovery/tickets/001-short-question-slug.md
```

A ticket is ready when the question is sharp enough to answer in one focused session. If the question is still too vague, leave it in `Not-yet-specified fog` inside `exploration-map.md`.

Completion criterion: every sharp unknown is represented as a ticket, and every vague unknown remains in the map as fog.

### 5. Work one ticket at a time

Pick one open, unblocked ticket. Do not work several independent tickets in one pass unless they are trivial and tightly coupled.

Before working, mark it `Status: In Progress`.

After working, record:

- answer / decision
- evidence
- confidence level
- remaining uncertainty
- new tickets surfaced
- brief/map updates made

Completion criterion: the ticket is either closed with evidence or explicitly left open with the blocker recorded.

### 6. Update synthesis artifacts after each ticket

After closing a ticket, update the synthesis documents:

- `discovery/discovery-brief.md` for product understanding
- `discovery/exploration-map.md` for frontier, fog, and decisions
- `discovery/evidence-log.md` for raw evidence pointers
- `discovery/current-state-map.md` for existing products when relevant
- `discovery/next-version-brief.md` when an improvement direction begins to emerge

Completion criterion: no important answer lives only inside a closed ticket. The brief/map contain the durable synthesis; the ticket contains detail and evidence.

### 7. Run the Fog-of-War Checkpoint

Run this checkpoint when the brief feels actionable or when progress stalls.

Ask:

- Can we describe the product or system without faking certainty?
- Do we know who feels the pain?
- Do we know the current workflow or desired workflow?
- Do we know what success would look like?
- Are the biggest assumptions visible?
- Are the biggest risks visible?
- Is the fog low enough to write requirements, shape a pitch, plan a refactor, or choose another responsible next move?

Decision outcomes:

- `Continue discovery` — fog is still too high.
- `Shape V1 / write PRD` — new product has enough clarity.
- `Create next-version brief` — existing product has enough current-state clarity.
- `Prototype` — behavior/UI needs something concrete to react to.
- `Technical spike` — feasibility is the central risk.
- `Stabilize / harden` — existing product has operational or reliability risk.
- `Refactor with scope` — technical debt blocks a known product goal.
- `Park or kill` — idea or intervention is weak, mis-scoped, or not worth the cost.

Completion criterion: the checkpoint decision is recorded in `discovery/exploration-map.md` and `discovery/discovery-brief.md`.

## Discovery ticket types

Use these ticket types. Add a custom type only when none fit.

| Type | Use when | Output |
|---|---|---|
| `grilling` | A stakeholder or human must clarify intent | Answered questions, decisions, open follow-ups |
| `research` | External/domain/market/docs knowledge is needed | Evidence summary with sources |
| `interview` | Real user/customer input is needed | Interview notes, patterns, quotes, confidence |
| `prototype` | A concrete artifact is needed to provoke feedback | Prototype link/path and reaction notes |
| `technical-spike` | Feasibility, integration, performance, or architecture is uncertain | Reproducible experiment and conclusion |
| `product-archaeology` | Existing product behavior is unclear | Product behavior map and workflows |
| `code-archaeology` | Existing code structure is unclear | Architecture notes, modules, seams, hazards |
| `data-archaeology` | Data model, states, migrations, or records are unclear | Entity/state map and data risks |
| `operational-recon` | Deployment, environments, logs, jobs, backups, or ownership are unclear | Ops map and risk list |
| `pain-validation` | Reported pain may be anecdotal or misdiagnosed | Evidence of frequency, severity, affected users |
| `risk-containment` | Touching the system may break critical behavior | Do-not-touch zones, safe probes, rollback notes |
| `decision` | Evidence is enough and a choice must be made | Decision, rationale, tradeoffs, consequences |
| `task` | Manual setup is required before discovery can continue | Completed setup or precise human checklist |

## Artifact templates

### discovery/discovery-brief.md

```markdown
# Discovery Brief: <name>

## Discovery mode

- [ ] New Product Discovery
- [ ] Existing Product Discovery

## Raw input / what we were told

<!-- Capture the meeting/request as received. Do not clean it up into fake certainty. -->

## Product sentence

<!-- What is this product/system, for whom, and what outcome does it seek? Mark as draft until validated. -->

Status: Unknown / Assumed / Known / Decided

## Problem / pain / opportunity

<!-- What pain, inefficiency, risk, or opportunity does this address? -->

Status: Unknown / Assumed / Known / Decided

## User / customer

<!-- Who feels the pain? Who uses it? Who buys or sponsors it? -->

Status: Unknown / Assumed / Known / Decided

## Current workflow

<!-- For new products: how is the problem solved today? For existing products: how does the product actually work today? -->

Status: Unknown / Assumed / Known / Decided

## Desired outcome

<!-- What should be meaningfully better after this exists or improves? -->

Status: Unknown / Assumed / Known / Decided

## Success signal

<!-- Prefer observable behavior, operational signal, or business/user metric over vibes. -->

Status: Unknown / Assumed / Known / Decided

## V1 / next-version candidate

<!-- For new products: candidate V1. For existing products: candidate next responsible intervention. -->

Status: Unknown / Assumed / Known / Decided

## In scope

<!-- What belongs in this discovery effort or candidate next move? -->

## Out of scope / no-gos

<!-- What is explicitly not being solved now? -->

## Assumptions

| Assumption | Why we believe it | Evidence needed | Status |
|---|---|---|---|

## Unknowns / fog of war

| Unknown | Why it matters | Ticket | Status |
|---|---|---|---|

## Risks / rabbit holes

| Risk | Why it matters | Evidence / mitigation | Status |
|---|---|---|---|

## Decisions so far

| Decision | Rationale | Evidence | Date |
|---|---|---|---|

## Fog-of-War Checkpoint

- [ ] Can we describe the product or system without faking certainty?
- [ ] Do we know who feels the pain?
- [ ] Do we know the current workflow or desired workflow?
- [ ] Do we know what success would look like?
- [ ] Are the biggest assumptions visible?
- [ ] Are the biggest risks visible?
- [ ] Is the fog low enough for the next responsible move?

## Current decision

- [ ] Continue discovery
- [ ] Shape V1 / write PRD
- [ ] Create next-version brief
- [ ] Prototype
- [ ] Technical spike
- [ ] Stabilize / harden
- [ ] Refactor with scope
- [ ] Park or kill

## Next action

<!-- One concrete next action, owner, expected evidence, and target ticket. -->
```

### discovery/exploration-map.md

```markdown
# Exploration Map: <name>

## Destination

<!-- What this discovery effort is trying to make clear enough to decide. -->

## Notes

<!-- Constraints, collaboration rules, repository links, access notes. -->

## Decisions so far

- <link to ticket> — <one-line decision>

## Frontier: open unblocked tickets

- [ ] `tickets/001-example.md` — <question>

## Blocked tickets

- [ ] `tickets/002-example.md` — blocked by <reason/ticket>

## Not-yet-specified fog

<!-- In-scope areas that are still too vague to ticket. -->

- <fog patch>

## Out of scope

<!-- Work consciously ruled out of this discovery effort. -->

- <out-of-scope item and reason>

## Fog-of-War Checkpoint history

| Date | Decision | Why |
|---|---|---|
```

### discovery/evidence-log.md

```markdown
# Evidence Log: <name>

Use this file for raw evidence pointers, not polished synthesis.

## Sources

| Date | Source | Link/path | Relevant tickets | Notes |
|---|---|---|---|---|

## Interviews / conversations

| Date | Person/role | Relevant tickets | Notes path / summary |
|---|---|---|---|

## Codebase observations

| Date | Area | Relevant tickets | Evidence | Notes |
|---|---|---|---|---|

## Product / workflow observations

| Date | Workflow | Relevant tickets | Evidence | Notes |
|---|---|---|---|---|

## Operational observations

| Date | Environment | Relevant tickets | Evidence | Notes |
|---|---|---|---|---|
```

### discovery/current-state-map.md

Use only for Existing Product Discovery.

```markdown
# Current-State Map: <name>

## Product as-is

<!-- What the product actually does today. -->

## Users as-is

<!-- Who actually uses/sponsors/admins it today. -->

## Workflows as-is

<!-- Main flows, edge flows, manual workarounds. -->

## System map

<!-- Components, services, modules, integrations, deployment, environments. -->

## Data / domain map

<!-- Core entities, states, invariants, ownership, migrations. -->

## Operations map

<!-- Deploy, logs, jobs, backups, alerts, secrets, ownership. -->

## Known issues

| Issue | Type | Evidence | Severity | Related ticket |
|---|---|---|---|---|

Issue types: user-pain, business, bug, tech-debt, architecture, data, security, ops, unclear.

## Constraints and do-not-touch zones

<!-- What should not be changed until better understood. -->

## Open questions

<!-- Remaining fog about the current system. -->
```

### discovery/next-version-brief.md

Use only when Existing Product Discovery has enough current-state clarity.

```markdown
# Next-Version Brief: <name>

## Improvement goal

<!-- What should be better after the next intervention? -->

## Target user / workflow / system area

<!-- What part of the product/system is targeted? -->

## Why now

<!-- Why this intervention matters now. -->

## Evidence

<!-- Link to tickets, observations, interviews, logs, code, metrics. -->

## In scope

## Out of scope / no-gos

## Proposed intervention

- [ ] Fix
- [ ] Refactor with scope
- [ ] Redesign workflow
- [ ] Add feature
- [ ] Stabilize / harden
- [ ] Migrate
- [ ] Rewrite part of system
- [ ] Remove / simplify
- [ ] Document before touching

## Quality bar

<!-- What must be true for this to count as better? -->

## Risks and rollback

## Handoff target

- [ ] PRD / requirements
- [ ] Shaped pitch
- [ ] Technical design
- [ ] Implementation plan
- [ ] Spike
- [ ] More discovery
```

### Discovery ticket template

```markdown
# Discovery Ticket <number>: <question>

## Status

Open / In Progress / Blocked / Closed / Archived

## Type

<one ticket type>

## Question

<!-- One sharp question this ticket answers. -->

## Why this matters

<!-- What decision this unlocks. -->

## Context

<!-- Relevant brief/map excerpts. -->

## Method

<!-- Grilling, research, interview, prototype, spike, code archaeology, etc. -->

## Evidence needed

<!-- What would count as a useful answer? -->

## Work log

<!-- Notes while working. Keep raw details here or in evidence-log. -->

## Answer / decision

<!-- Final answer once closed. -->

## Evidence

<!-- Links, commands, files, screenshots, interview notes, logs, code references. -->

## Confidence

Low / Medium / High

## Remaining uncertainty

<!-- What is still unknown after this ticket? -->

## New tickets surfaced

- <ticket path or fog patch>

## Brief/map updates

- [ ] discovery-brief.md updated
- [ ] exploration-map.md updated
- [ ] evidence-log.md updated
- [ ] current-state-map.md updated, if relevant
- [ ] next-version-brief.md updated, if relevant
```

## New Product Discovery guidance

Start with these common unknowns, but only ticket the ones that matter:

- Who is the primary user?
- What problem do they feel today?
- How do they solve it now?
- How painful/frequent/expensive is the problem?
- What outcome would make this worthwhile?
- What is the smallest useful V1?
- What must explicitly not be included in V1?
- What assumptions could kill the idea?
- What evidence would increase or decrease confidence?
- What prototype, interview, research, or spike should happen next?

Avoid writing requirements until the Discovery Brief can describe the problem, user, outcome, constraints, and risks without fake certainty.

## Existing Product Discovery guidance

Treat the existing system like a dungeon built by another party. Map before conquering.

Start with these zones:

- Product archaeology: what the product actually does.
- Workflow tracing: how real users move through it.
- Code archaeology: architecture, seams, modules, coupling, tests.
- Data archaeology: entities, states, invariants, migrations, data quality.
- Operational reconnaissance: deployment, environments, logs, secrets, jobs, backups, alerts.
- Pain validation: whether reported pain is real, frequent, severe, and correctly diagnosed.
- Risk containment: what not to touch until understood.
- Improvement shaping: what responsible next intervention should be.

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

## Working rules for agents

- First locate the project root. Prefer the Git repository root. If there is no Git repository yet, use the current project directory; do not require GitHub, Jira, or a remote tracker to begin discovery.
- Before writing, inspect whether `discovery/` already exists. If it exists, read the current artifacts before adding new files or tickets.
- If discovery artifacts do not exist, create the default `discovery/` structure directly when the skill is invoked.
- Do not ask for permission to create the default `discovery/` structure after the skill was manually invoked.
- Do ask for missing access or stakeholder input when the next ticket cannot be answered by available tools.
- Keep ticket names human-readable.
- Prefer Markdown links to files, commits, screenshots, docs, prototypes, logs, and commands.
- Do not bury durable decisions in chat. Write them into the repository artifacts.
- Keep raw notes in `evidence-log.md` or ticket work logs; keep `discovery-brief.md` concise.
- Archive obsolete tickets under `discovery/archive/` instead of deleting them when their history matters.

## Completion checklist

A discovery pass is complete when:

- [ ] The repository has a `discovery/` folder with the core Markdown artifacts.
- [ ] The Discovery Brief states the mode: new product or existing product.
- [ ] The raw vague input is preserved.
- [ ] Unknowns are separated into tickets or not-yet-specified fog.
- [ ] At least one frontier ticket is ready to work.
- [ ] Closed tickets have evidence and confidence levels.
- [ ] The brief/map were updated after closed tickets.
- [ ] The Fog-of-War Checkpoint records the current decision.
- [ ] No implementation plan, PRD, refactor, or build recommendation is presented as final without evidence from discovery.
