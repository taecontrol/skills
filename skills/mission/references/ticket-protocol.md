# Shared Mission Ticket Protocol

This is the source of truth for ticket states, authority, and transitions used by the `mission` skill. Executors such as `discovery` must return results through this contract; they do not own mission progression.

## Common contract

Each ticket owns one coherent, independently reviewable work package that advances the mission. The ticket has one objective and one governing Kind, but it may resolve multiple coupled questions or decisions when they establish the same downstream contract and are useful and accepted together. Related work may support that Kind; material outputs that require a different route or authority belong in another ticket.

Every durable ticket begins with:

```markdown
# Ticket NNN: <one coherent work package>

Status: Candidate | Ready | Active | Blocked | Review | Closed | Abandoned
Kind: Discovery | Decision | Deliverable | Execution | Validation | Task
Type: <human-readable operational type>
Mode: Collaborative | Agent | Human | Independent
Owner: <person or role>
Depends on: <tickets or none>
```

Every ticket answers:

1. **Objective** — the coherent result this work package must produce.
2. **Questions / decisions** — the coupled matters it must resolve, when useful.
3. **Why now** — decision, gate, or dependency it unlocks.
4. **Scope / authorized outputs / non-goals** — enough to expose expansion; name each substantial artifact or bound the approved artifact set.
5. **Method** — when the approach is not obvious.
6. **Acceptance / evidence** — observable completion criteria.
7. **Result / decision set** — filled at Review or Closed.
8. **Map updates** — known territory, fog, decisions, future tickets, or gate changes.

`Type` makes the route legible without opening the ticket body:

- Discovery: use exactly one type from the installed Discovery skill's `references/ticket-types.md`, such as `research`, `grilling`, `prototype`, `technical-spike`, or `code-archaeology`.
- Other Kinds: use a concise kebab-case label that names the operational shape, such as `technical-design`, `risk-decision`, `schema-migration`, `independent-qa`, or `access-setup`.

Kind controls authority and routing; Type explains what the work is. Type never changes a ticket's authority.

Use [`../templates/ticket.md`](../templates/ticket.md) when a separate file is warranted. A lightweight Candidate may remain one line on the map until activated.

## States

| State | Meaning | Who may move it |
| --- | --- | --- |
| Candidate | Proposed work; not authorized. | Agent or Mission Control may propose. |
| Ready | Scope, non-goals, dependencies, and evidence are agreed. | Mission Control for material/Deliverable work; agent for non-material Task work. |
| Active | Current authorized work. | Mission Control selects a material frontier; agent may activate mechanical child tasks. |
| Blocked | Cannot proceed; blocker and unblock condition are explicit. | Active owner. |
| Review | Result exists; required authority has not accepted it. | Active owner. |
| Closed | Result/evidence accepted at the ticket's authority level. | Mission Control for every material ticket; agent for non-material Task work. |
| Abandoned | Intentionally stopped with rationale and map impact. | Mission Control for material work; owner for non-material Task work. |

Exactly one material ticket is current in `Ready`, `Active`, or `Review`. Parallel mechanical child tasks may run inside that ticket, but Mission Control cannot authorize a second material frontier without first returning the current ticket to a non-current disposition.

## Human-visible navigation contract

The map and ticket are durable state, not a substitute for conversation. Use these compact shapes rather than reading ticket prose aloud.

### Activation briefing

Before substantive execution of an Active material ticket, tell Mission Control:

```markdown
**Mission position:** <current gate and frontier>
**Ticket:** <number/title> — <Kind> / <Type>
**Why now:** <decision, dependency, or risk this unlocks>
**Expected evidence:** <observable acceptance evidence or artifact>
**I will handle:** <autonomous evidence/work inside scope>
**I will return early if:** <material decisions, scope/risk change, or blocker>
**Return checkpoint:** <observable result and status>
**Likely next frontier:** <one inactive recommendation, conditional when appropriate>
```

This is an explanation, not a second approval ceremony. If Mission Control already authorized same-session execution, give the briefing and proceed.

### Material checkpoint

Do not narrate mechanical work. When something materially changes, report:

```markdown
**Checkpoint**
- Learned:
- Mission impact:
- Decision needed: none | <one grouped material question>
- Next action:
```

Group coupled human questions. Ask only about scope, appetite, policy, risk, product intent, access that tools cannot obtain, or competing frontiers—not implementation details the ticket already delegates.

### Review brief

When returning a material ticket to Review, lead with:

```markdown
**Ticket returned:** <number> — <Kind> / <Type> — Review
**Outcome:** <plain-language result>
**Important consequences:** <3–7 decisions, behaviors, or risks>
**Evidence:** <compact pointers and verification>
**What needs Mission Control:** <accept/revise/choose, with recommendation>
**Immediate next action:** <one action>
**Recommended next frontier:** <one inactive Candidate and why>
```

Link long artifacts after this brief. Never make “review this file” the only instruction.

## Kinds and authority

### Discovery

Produces evidence that resolves one decision-driving uncertainty or a tightly related set that must be understood together. The executor may move it to Review, but Mission Control accepts and closes material Discovery work; its findings become mission decisions only after that acceptance.

### Decision

Produces a coherent decision set or accepted contract. Agents verify evidence, compare defensible options, state trade-offs, and recommend. Mission Control owns activation and closure.

### Deliverable

Creates or amends one independently useful durable artifact or a tightly related set named or explicitly bounded in the Ready ticket and reviewed and accepted together. Mission Control owns activation and acceptance when it fixes product behavior, architecture, execution obligations, validation obligations, or the frozen baseline.

### Execution

Implements one approved slice. It cannot amend its own objective, scope, architecture, or acceptance criteria. Deviations return to Review or open a Candidate Decision ticket. Mission Control accepts and closes material Execution work after reviewing its evidence and any independent validation required by the ticket.

### Validation

Produces independent evidence and a verdict. The validator moves the ticket to Review; Mission Control accepts and closes material Validation work. The validator does not accept or close the mission.

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

Materiality determines authority and visibility, not ticket granularity. Several material decisions may belong to one work package when they are coupled.

## Work-package test

Group questions, decisions, and artifacts in one ticket when they:

- combine into the same downstream contract or independently useful result;
- depend on substantially the same evidence;
- constrain one another;
- share a governing Kind, route, owner, and authority level; and
- have little value or cannot be accepted sensibly in isolation.

Split work into separate tickets when a part can be scheduled, assigned, accepted, deferred, or implemented independently; requires a different authority or risk treatment; or can block or branch without preventing the rest from being useful.

The number of questions, decisions, artifacts, commands, or files does not determine ticket count.

A finding or decision inside an active ticket never authorizes an unlisted artifact, implementation, validation, or other downstream action. Surface that work as fog or a Candidate ticket unless Mission Control explicitly amends the active ticket before the new work begins.

Examples:

- **Group:** one Decision ticket resolves coupled authentication timeout and refresh-policy choices that form one accepted policy contract.
- **Group:** one Deliverable ticket updates a named specification and companion rationale when they share one purpose and acceptance decision.
- **Split:** a Discovery ticket identifies an implementation change; record a Candidate Execution ticket instead of implementing it inside Discovery.

## Collaborative frontier loop

1. Agent shows the current map and proposes one Candidate frontier.
2. Mission Control selects or amends it.
3. Ticket becomes Ready only when scope and evidence are clear, then Active.
4. Agent writes enough durable ticket/map context for a fresh executor, gives the activation briefing, and stops. The material ticket runs in a fresh session by default.
5. Owner works mechanical subtasks without expanding the ticket; communicate only at material checkpoints.
6. Owner returns result, evidence, remaining uncertainty, map delta, and worktree disposition; ticket becomes Review and the session stops at the ticket checkpoint.
7. Required authority accepts, rejects, splits, blocks, or abandons it.
8. Map updates before another material ticket is activated.

A ticket result never authorizes the next lifecycle phase. Discovery does not authorize deliverables; a deliverable does not authorize the next deliverable; a plan does not authorize implementation; QA does not accept the mission.

## Session isolation and ticket disposition

Each material work package is an independently resumable unit and uses a fresh execution session by default. Session isolation limits context bleed, makes the ticket contract testable by a fresh agent, and gives Mission Control a deliberate repository checkpoint.

Progression has two dimensions:

1. **Ticket authorization** moves the selected ticket to Active.
2. **Session-continuation authorization** permits working that ticket—or a following ticket—in the current session.

Mission Control may grant both dimensions in one contextual instruction. Do not infer same-session execution from ticket approval alone: once the immediately preceding proposal satisfies the Ready contract, “yes,” “activate it,” “approved,” or “go ahead” authorizes only the ticket transition. After default activation, persist the Active ticket and handoff, state that execution should resume in a fresh session, and stop.

At a ticket disposition checkpoint, interpret ordinary language semantically rather than requiring a formula. “Continue here,” “let's do the next one here,” or equivalent language selects the one unambiguous proposed frontier and authorizes its execution in the current session. If its Ready contract can be completed mechanically from accepted mission artifacts and the visible proposal, write it, mark it Active, and work it without asking again. If a material scope, risk, dependency, or acceptance choice is genuinely missing, ask only that substantive question; do not ask Mission Control to approve agent-authored ticket prose or repeat a permission already given.

When a material ticket reaches Review or is Closed, do not create a durable next-ticket artifact, activate a next ticket, or start its work. Give the Review brief and report:

- ticket status and acceptance decision required;
- result/evidence and map delta;
- changed/untracked files, tests, and whether the work is committed;
- one proposed next frontier as an existing Candidate or a lightweight inactive provisional-route entry.

Then stop at a **ticket disposition checkpoint**. Mission Control chooses among review/revision, committing the ticket changes, pausing, starting the unambiguous proposed next ticket in a fresh session, or explicitly continuing it in the current session. If Mission Control requests a commit, commit only the accepted ticket scope and return to the checkpoint; committing does not activate the next ticket. A later “continue here” acts on the still-visible proposed frontier without another activation ceremony.

Same-session continuation is an exception, not a sticky mission setting. It applies only to the unambiguous next frontier selected at that checkpoint and must be granted again at the following checkpoint.

## Contract freeze and amendments

Candidate and Ready tickets may be shaped. Once a ticket becomes Active, its Objective, Kind, Type, Scope, Authorized outputs, Non-goals, dependencies, and Acceptance/evidence are frozen.

- The owner may fill Result, Evidence, Confidence, Remaining uncertainty, Work log, and Map updates as work proceeds.
- Editorial clarification that does not change authority, output, risk, or pass/fail meaning is allowed and must be visible in the diff.
- A material change requires Mission Control to amend the Active ticket explicitly or to stop it and create an inactive Candidate.
- Reviewer findings classified as a new material question, risk/appetite change, incomplete system map, or independently useful objective cannot be silently absorbed through patching.

## Provisional route

The exploration map must show two to five likely inactive work packages beyond the frontier when the mission is understandable enough to anticipate them. Each entry states Kind/Type, objective, dependency or condition, and confidence (`likely`, `conditional`, or `tentative`). If evidence does not support that depth, write `Route depth: unknown — <fog preventing a reliable itinerary>` and show only the justified candidate entries.

This route is orientation, not a promise or authorization. Add, remove, reorder, split, or merge entries when evidence changes. Do not manufacture a lifecycle tree merely to reach a count.

## Durable versus lightweight tickets

Keep a Candidate as one map line until its work package needs a durable contract. Create a separate file when work:

- spans sessions or owners;
- gathers durable evidence;
- can block or branch;
- creates/amends a substantial deliverable;
- carries a material objective or decision set needing durable acceptance;
- needs independent review or reproducibility.

Do not create tickets for individual reads, searches, commands, formatting steps, or other mechanical actions inside an active ticket.

## Splitting and surfacing new work

Stop and split when an active ticket develops an independently useful objective that can be disposed of separately, crosses its non-goals, changes risk class or authority, or requires an unapproved artifact.

Record each new concern as:

- a Candidate ticket if it forms an independently useful work package;
- a related question or decision inside the active ticket if it contributes to the same objective;
- fog if still vague;
- out of scope/future mission if consciously excluded.

Do not silently widen the active ticket to absorb it.

## Review return shape

Verification must be proportional to the active ticket and changed surface:

- Before classifying the change, inspect staged, unstaged, and untracked files. Check whether documentation contains executable examples or feeds a docs/build/release pipeline.
- For a decision, specification, plan, or Markdown-only deliverable, verify artifact structure, links, traceability to accepted decisions/evidence, internal consistency, and review findings.
- Do not run the full product test, typecheck, lint, or build suites merely to produce a green verification line when no executable code, configuration, schema, test, dependency, generated artifact, or build-consumed documentation changed.
- Run an executable suite only when the ticket explicitly requires baseline evidence, an executable example/generated artifact can affect it, or the changed surface can plausibly break it. State that reason with the result.
- When suites are not relevant, report `Not run — no executable changes` rather than treating an unchanged baseline as evidence that a proposed contract is correct.

A passing unchanged suite proves only that the pre-existing implementation baseline is green; it does not validate new behavior described solely in a proposed artifact.

Every material ticket returns:

```markdown
## Result / decision set

<coherent answer, accepted contract, artifact set, implementation result, or verdict>

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
