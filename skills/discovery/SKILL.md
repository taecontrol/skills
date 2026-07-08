---
name: discovery
description: "Discovery: turn vague product ideas, requirements, or existing codebase fog into evidence-backed repository artifacts before planning, refactoring, or implementation."
license: MIT
---

# Discovery

Manual-first skill for turning product or codebase fog into repository-owned discovery artifacts.

Discovery is not implementation planning. Discovery reduces uncertainty until a responsible next move is visible.

## Core rules

- Convert fog into questions before requirements.
- Convert vices into evidence before refactors.
- Work one unknown at a time; one discovery ticket should answer one sharp question.
- Keep discovery tickets separate from implementation tickets.
- Store durable discovery knowledge as Markdown in the project repository.

## Progressive disclosure map

Load only the file needed for the current branch:

| Need | Load |
|---|---|
| Vague idea, stakeholder request, new product concept | `references/new-product-discovery.md` |
| Existing MVP, codebase, internal tool, inherited system, unclear behavior, debt, bugs, ops risk | `references/existing-product-discovery.md` |
| Creating a ticket and choosing its type | `references/ticket-types.md` |
| Creating or repairing an artifact | The matching file in `templates/` |

Do not load both mode references unless the work genuinely spans both a new product and an existing system.

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

Existing Product Discovery may also use:

```text
discovery/
  current-state-map.md
  next-version-brief.md
```

Template source files live in this skill under `templates/`. Target artifacts live in the project under `discovery/`.

## Workflow

### 1. Locate the project root and existing discovery state

Prefer the Git repository root. If there is no Git repository, use the current project directory.

Before writing, inspect whether `discovery/` already exists. If it exists, read the current artifacts before adding files or tickets.

Completion criterion: the project root is known, and existing discovery artifacts have either been read or confirmed absent.

### 2. Choose exactly one discovery mode

Choose the branch before creating or updating artifacts:

- **New Product Discovery** — the input is a vague idea, requirement, stakeholder request, or product concept.
- **Existing Product Discovery** — the input is an existing MVP, codebase, internal tool, inherited product, or working system with unclear behavior, debt, bugs, operational risk, or vague improvement requests.

After choosing, load only the matching mode file from `references/` and follow it for mode-specific questions, artifacts, and checkpoints.

Completion criterion: the selected mode is recorded in `discovery/discovery-brief.md` and `discovery/exploration-map.md`.

### 3. Seed or update the core artifacts

If an artifact is missing, copy the matching template from `templates/` into the project and replace placeholders. If it exists, update it instead of overwriting human or agent work.

Core templates:

- `templates/discovery-brief.md` -> `discovery/discovery-brief.md`
- `templates/exploration-map.md` -> `discovery/exploration-map.md`
- `templates/evidence-log.md` -> `discovery/evidence-log.md`

Existing-product templates, loaded only when that mode needs them:

- `templates/current-state-map.md` -> `discovery/current-state-map.md`
- `templates/next-version-brief.md` -> `discovery/next-version-brief.md`

Completion criterion: the core artifacts exist, preserve raw input, and clearly mark known, assumed, unknown, decided, and rejected items.

### 4. Convert fog into discovery tickets

Create Markdown tickets under `discovery/tickets/` using `templates/discovery-ticket.md`.

Naming format:

```text
discovery/tickets/001-short-question-slug.md
```

A ticket is ready when the question is sharp enough to answer in one focused session. If the question is still too vague, leave it in `Not-yet-specified fog` inside `exploration-map.md`.

Completion criterion: every sharp unknown is represented as a ticket, and every vague unknown remains in the map as fog.

### 5. Work one ticket at a time

Pick one open, unblocked ticket. Do not work several independent tickets in one pass unless they are trivial and tightly coupled.

Before working, mark it `Status: In Progress`.

After working, record in the ticket:

- answer or decision
- evidence
- confidence level
- remaining uncertainty
- new tickets surfaced
- brief/map updates made

Completion criterion: the ticket is either closed with evidence or explicitly left open with the blocker recorded.

### 6. Update synthesis after every closed ticket

After closing a ticket, update the durable synthesis artifacts:

- `discovery/discovery-brief.md` for product understanding
- `discovery/exploration-map.md` for frontier, fog, and decisions
- `discovery/evidence-log.md` for raw evidence pointers
- `discovery/current-state-map.md` for existing products when relevant
- `discovery/next-version-brief.md` only when an improvement direction has enough evidence

Completion criterion: no important answer lives only inside a closed ticket.

### 7. Run the Fog-of-War checkpoint

Run this checkpoint when the brief feels actionable or progress stalls:

- Can we describe the product or system without faking certainty?
- Do we know who feels the pain?
- Do we know the current workflow or desired workflow?
- Do we know what success would look like?
- Are the biggest assumptions visible?
- Are the biggest risks visible?
- Is the fog low enough for the next responsible move?

Record one current decision:

- `Continue discovery`
- `Shape V1 / write PRD`
- `Create next-version brief`
- `Prototype`
- `Technical spike`
- `Stabilize / harden`
- `Refactor with scope`
- `Park or kill`

Completion criterion: the checkpoint decision is recorded in `discovery/exploration-map.md` and `discovery/discovery-brief.md`.

## Working rules for agents

- If discovery artifacts do not exist, create the default `discovery/` structure directly when this skill is invoked.
- Do not ask for permission to create the default structure after the skill was manually invoked.
- Ask for missing access or stakeholder input only when the next ticket cannot be answered by available tools.
- Keep ticket names human-readable.
- Prefer Markdown links to files, commits, screenshots, docs, prototypes, logs, and commands.
- Do not bury durable decisions in chat; write them into repository artifacts.
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
- [ ] The Fog-of-War checkpoint records the current decision.
- [ ] No implementation plan, PRD, refactor, or build recommendation is presented as final without evidence from discovery.
