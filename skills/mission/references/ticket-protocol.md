# Shared Mission Ticket Protocol

This is the source of truth for ticket states, authority, and transitions used by the `mission` skill. Executors such as `discovery` must return results through this contract; they do not own mission progression.

## Common contract

Every durable ticket begins with:

```markdown
# Ticket NNN: <one outcome or one question>

Status: Candidate | Ready | Active | Blocked | Review | Closed | Abandoned
Kind: Discovery | Decision | Deliverable | Execution | Validation | Task
Mode: Collaborative | Agent | Human | Independent
Owner: <person or role>
Depends on: <tickets or none>
```

Every ticket answers:

1. **Outcome / question** — one bounded result or one sharp unknown.
2. **Why now** — decision, gate, or dependency it unlocks.
3. **Scope / non-goals** — enough to expose expansion.
4. **Method** — when the approach is not obvious.
5. **Acceptance / evidence** — observable completion criteria.
6. **Result / decision** — filled at Review or Closed.
7. **Map updates** — known territory, fog, decisions, future tickets, or gate changes.

Use [`../templates/ticket.md`](../templates/ticket.md) when a separate file is warranted. A lightweight Candidate may remain one line on the map until activated.

## States

| State | Meaning | Who may move it |
| --- | --- | --- |
| Candidate | Proposed work; not authorized. | Agent or Mission Control may propose. |
| Ready | Scope, non-goals, dependencies, and evidence are agreed. | Mission Control for material/Deliverable work; agent for non-material Task work. |
| Active | Current authorized work. | Mission Control selects a material frontier; agent may activate mechanical child tasks. |
| Blocked | Cannot proceed; blocker and unblock condition are explicit. | Active owner. |
| Review | Result exists; required authority has not accepted it. | Active owner. |
| Closed | Result/evidence accepted at the ticket's authority level. | Mission Control for material decisions/deliverables; agent for non-material Task work. |
| Abandoned | Intentionally stopped with rationale and map impact. | Mission Control for material work; owner for non-material Task work. |

Only one material ticket is Active unless Mission Control explicitly authorizes parallel frontier work.

## Kinds and authority

### Discovery

Answers one uncertainty with evidence. The executor may move it to Review, but a material answer becomes a mission decision only after Mission Control accepts it.

### Decision

Resolves a material choice. Agents verify evidence, compare defensible options, state trade-offs, and recommend. Mission Control owns activation and closure.

### Deliverable

Creates or amends exactly one named durable artifact, or an explicitly approved combined artifact for a small mission. Mission Control owns activation and acceptance when it fixes product behavior, architecture, execution obligations, validation obligations, or the frozen baseline.

### Execution

Implements one approved slice. It cannot amend its own outcome, scope, architecture, or acceptance criteria. Deviations return to Review or open a Candidate Decision ticket.

### Validation

Produces independent evidence and a verdict. The validator does not accept or close the mission.

### Task

Performs bounded setup or mechanical work with no material decision. Agents may manage its lifecycle inside an approved material ticket.

## Materiality test

A ticket is material when it can change any of:

- mission outcome, appetite, scope, no-gos, or success signal;
- public behavior, business rule, authorization, ownership, or accepted risk;
- architecture, persistence, security, migration, rollback, or operations;
- execution-contract baseline or evidence required for acceptance;
- mission verdict, reframe, abandonment, or closure.

When unsure, treat the transition as material and show it on the map.

## Collaborative frontier loop

1. Agent shows the current map and proposes one Candidate frontier.
2. Mission Control selects or amends it.
3. Ticket becomes Ready only when scope and evidence are clear, then Active.
4. Owner works mechanical subtasks without expanding the ticket.
5. Owner returns result, evidence, remaining uncertainty, and map delta; ticket becomes Review.
6. Required authority accepts, rejects, splits, blocks, or abandons it.
7. Map updates before another material ticket is activated.

A ticket result never authorizes the next lifecycle phase. Discovery does not authorize deliverables; a deliverable does not authorize the next deliverable; a plan does not authorize implementation; QA does not accept the mission.

## Durable versus lightweight tickets

Keep a Candidate as one map line when it is small, immediate, and has no independent evidence or handoff need. Create a separate file when work:

- spans sessions or owners;
- gathers durable evidence;
- can block or branch;
- creates/amends a substantial deliverable;
- carries a material decision;
- needs independent review or reproducibility.

Do not create tickets for individual reads, searches, commands, formatting steps, or other mechanical actions inside an active ticket.

## Splitting and surfacing new work

Stop and split when an active ticket develops more than one independent outcome/question, crosses its non-goals, changes risk class, or requires an unapproved artifact.

Record each new concern as:

- a Candidate ticket if sharp;
- fog if still vague;
- out of scope/future mission if consciously excluded.

Do not silently widen the active ticket to absorb it.

## Review return shape

Every material ticket returns:

```markdown
## Result / decision

<answer, artifact, implementation result, or verdict>

## Evidence

<paths, commands, tests, observations, sources>

## Remaining uncertainty

<what is still unknown; "None material" is allowed when justified>

## Map updates

- Known territory:
- Decisions awaiting/accepted:
- Fog removed/added:
- Candidate tickets:
- Gate impact:
```
