---
name: mission
description: "Open or continue a bounded software mission with a human Mission Control, a visible exploration map, and one active material work package at the frontier. Use only when the human explicitly invokes Mission or asks to start, resume, navigate, or close a mission; never auto-chain discovery, deliverables, implementation, review, or gates."
disable-model-invocation: true
license: MIT
---

# Mission

Mission is the collaborative lifecycle container for one bounded intervention on a persistent product. Mission Control and the agent navigate it together; the skill does not run an autonomous software factory.

The default operating rhythm is:

```text
show map + provisional route -> brief one ticket -> activate -> fresh execution session -> Review brief -> disposition checkpoint -> stop
```

The goal is shared understanding and a well-evidenced outcome, not throughput. Mission is a **navigation interface**, not only a repository state machine: Mission Control should understand where the mission is, what kind of work is happening, why it is next, when they will be involved, and what likely follows without opening a ticket file. A ticket owns one coherent, independently reviewable work package. It has one objective, one governing Kind, and a human-readable Type, and may resolve multiple coupled questions or decisions inside that boundary. Material work packages are session-isolated by default; continuing into another ticket in the same session requires an explicit Mission Control instruction.

## Authority boundary

**Mission Control owns:** outcome, appetite, scope, no-gos, material product policy, accepted risk, gates, deliverable authorization, freeze/amendments, mission verdict, and closure.

**The agent owns:** repository/evidence inspection, exposing fog, proposing tickets and options, executing mechanical subtasks inside an approved ticket, keeping artifacts current, and stopping when a material boundary is reached.

A human answer authorizes only the decision or scope explicitly addressed inside the active work package. Never interpret it as permission to expand the package, draft downstream artifacts, summon every role, freeze a baseline, or begin implementation.

## Start or resume

1. Locate the repository root and inspect current branch/worktree state, repository instructions, existing mission directories, and persistent product context before writing. Resume an existing matching mission instead of opening a duplicate.
2. If opening a mission, preserve the raw request in a small Mission Brief. Do not clean uncertainty into requirements. Use [`templates/mission-brief.md`](templates/mission-brief.md) selectively.
3. Create or update one visible map using [`templates/exploration-map.md`](templates/exploration-map.md). Keep destination, known territory, assumptions, fog, frontier, decisions, out-of-scope work, current gate, and a **provisional route** of likely inactive work packages visible. The route is an itinerary, not authorization. Reorder, split, extend, or remove it as evidence changes.
4. Show the map to Mission Control, summarize the provisional route, and propose exactly one material frontier. Do not activate it implicitly.

Completion criterion: Mission Control can explain the destination, current fog, proposed frontier, its Kind/Type, the likely route after it, and the next material decision before work begins.

## Keep Mission Control oriented

Use the human-visible briefing, checkpoint, and Review-brief shapes in [`references/ticket-protocol.md`](references/ticket-protocol.md). The ticket file is durable state; it is never the sole user interface.

- Before the first substantive tool call for an activated material ticket, state where the mission is, the ticket's Kind/Type and objective, why it is next, the expected acceptance evidence, what the agent will do autonomously, what would require Mission Control, the return checkpoint, and the likely next frontier if successful.
- During execution, communicate only at material checkpoints: a scope/risk/architecture change, a genuine human decision, a blocker, or transition to Review. Do not narrate routine reads, commands, or formatting.
- When Mission Control makes a material choice, acknowledge the decision and state its immediate consequence before entering a long autonomous run.
- At Review, present a compact decision brief before pointing to a long artifact. Never tell Mission Control merely to “review the file.”
- End every navigation response with one explicit immediate next action and one recommended next frontier, clearly marked inactive until selected.

Completion criterion: Mission Control can follow the journey from chat without reading long artifacts, while the repository remains sufficient for a fresh executor.

## Navigate by tickets

Load [`references/ticket-protocol.md`](references/ticket-protocol.md) before creating, activating, reviewing, or closing a ticket.

1. Shape a Candidate ticket only when work forms a coherent, independently reviewable package: a discovery objective, decision set, durable deliverable, execution slice, validation assignment, or blocking setup outcome. Give it one governing Kind and a Type that tells Mission Control the operational shape at a glance. Keep related questions and decisions inside that package. Vague fog and sharp questions without an independent handoff, evidence, or acceptance need remain on the map or inside the active ticket.
2. Select the next material work package with Mission Control. Mark its ticket Ready only when the objective, scope, non-goals, dependencies, and acceptance/evidence are clear; then mark it Active.
3. Treat ticket selection and session choice as distinct decisions that Mission Control may grant together. By default, record the Active ticket and a self-contained handoff, give the activation briefing, then stop so the ticket is executed in a fresh session. A bare confirmation such as “yes,” “activate it,” or “go ahead” authorizes the ticket, not same-session execution. At a disposition checkpoint, contextual instructions such as “continue here” or “do the next one in this session” both select the unambiguous proposed frontier and authorize same-session execution; do not demand a second procedural confirmation, but still give the briefing before substantive work.
4. Work only the active work package in its execution session. Mechanical evidence-gathering subtasks and related questions may proceed without performative approval, but cannot change the ticket's objective, scope, risk, or authority. Once Active, freeze Objective, Kind/Type, Scope, Authorized outputs, Non-goals, dependencies, and Acceptance. Result, Evidence, Confidence, Remaining uncertainty, and Map updates may evolve. A material contract change requires an explicit Mission Control amendment or a new Candidate ticket.
5. Return the ticket to Review with its result, evidence, remaining uncertainty, explicit map delta, and worktree disposition. Stop at the ticket checkpoint; do not create, activate, or begin another ticket.
6. Close the ticket only at its required authority level and update the map and provisional route. Mission Control then chooses whether to review/revise, commit the ticket changes, pause, start the next ticket in a fresh session, or explicitly continue in the current session. When the choice is unambiguous, act on it without restating the menu or asking Mission Control to approve agent-authored ticket wording.

Completion criterion: every material result is visible on the map, the repository can resume from durable artifacts, and no downstream work or same-session ticket began without an explicit, contextual Mission Control choice.

## Route without taking over

| Kind | Route | Return to Mission |
| --- | --- | --- |
| Discovery | Require a Discovery Type, then invoke the `discovery` skill for one approved ticket. If unavailable, leave the ticket Ready and report the missing executor. | Evidence, confidence, remaining fog, proposed map delta; material answers remain Review until Mission Control decides. |
| Decision | Work collaboratively; agents provide verified options and trade-offs. | Mission Control decision and consequences. |
| Deliverable | Create or amend the named artifact or explicitly bounded, tightly related artifact set after activation. | Artifact set, changed-surface evidence against acceptance criteria, unresolved decisions; status Review. Do not run unrelated product suites for a documentation-only deliverable. |
| Execution | Route to the applicable implementation/TDD skill against the approved baseline. | Code/evidence/deviations; never self-amend scope. |
| Validation | Use an independent context when practical. | Evidence and verdict; Mission Control accepts or rejects it. |
| Task | Perform bounded setup or mechanical work. | Observable completion or blocker. |

Routing is not progression. After any route returns, stop at the ticket checkpoint; a new executor or route does not inherit authority to continue the mission.

Do not load or claim to execute Discovery for a Deliverable, Execution, or Validation ticket. Evidence gathering inside those tickets remains a bounded subtask; if it exposes a material unknown needing independent disposition, stop and propose a typed Discovery ticket.

## Shape deliverables deliberately

The Mission Brief, Product/Behavior Spec, Technical Design, Implementation Plan, and Validation Plan are conceptually distinct, but none is mandatory merely because a template or lifecycle names it.

- Put every substantial artifact inside an approved work package and agree its purpose, readers, dependencies, non-goals, and acceptance evidence before activation. Name each artifact or explicitly bound the approved set.
- Create a separate Deliverable ticket when the artifact has independent use, ownership, review, or acceptance. A work package may produce multiple tightly related artifacts when they are named or bounded, useful, and accepted together.
- Split or combine work by independent value and disposition, not by the number of artifacts or questions.
- Never create the full execution contract automatically after Discovery.

Completion criterion: every artifact exists because an approved ticket required it, not because the agent anticipated a later phase.

## Gates

Gates are Mission Control decisions recorded on the map, not agent status labels.

- **Mission Ready:** intent is clear enough to know which uncertainty matters.
- **Ready to Shape:** the material frontier is low enough to propose deliverable tickets.
- **Ready for Implementation:** the approved execution baseline is sufficient for a fresh implementer and independent QA; content readiness is distinct from Git freeze and authorization.
- **Mission Accepted:** QA evidence has a human-owned verdict and durable learning is promoted.

At each gate, present evidence, unresolved fog, options, and a recommendation. Wait for Mission Control; do not auto-advance.

## Scope drift and loop breakers

Stop the active ticket and return to the map when work reveals a new risk class, migration, persistent state machine, cross-store recovery, staged cutover, destructive data risk, several hidden lifecycle variants, or a deliverable that no active ticket authorized.

A reviewer confirms a shaped result; it is not the discovery engine. Classify findings as local omission, new material question, risk/appetite change, or incomplete system map. Repeated blocking review findings reopen the frontier instead of causing an automatic patch loop.

Completion criterion: scope or risk changes are visible Candidate tickets or Mission Control decisions, never silent additions to the active ticket.

## Close or pause

A mission closes as Accepted, Rejected, Rework Required, Inconclusive, Reframed, Abandoned, or another explicit Mission Control verdict.

Before closure:

- record outcome and evidence;
- record residual risk and follow-up candidates;
- promote durable current truth to persistent product/architecture documentation;
- leave future opportunities as new mission candidates, not extensions;
- ensure temporary branches, worktrees, servers, and artifacts have an explicit disposition.

For a pause, leave the map with one clear next frontier and no ambiguous Active ticket.

Completion criterion: a fresh session can resume or understand closure from repository artifacts without reconstructing intent from chat.

## Failure modes

- **Contract theatre:** role labels and polished documents hide that Mission Control never navigated the fog.
- **Silent chaining:** Discovery completion triggers Spec, Design, Plan, reviewers, or implementation without a new ticket.
- **Session bleed:** approval or completion of one ticket is treated as permission to execute the next ticket in the same context; use a fresh session unless Mission Control explicitly overrides the boundary.
- **Ticket bureaucracy:** each question, decision, artifact, or command becomes its own ticket instead of belonging to a coherent work package.
- **Premature completion:** attention moves to downstream phases before the active ticket has evidence and map updates.
- **Map drift:** decisions live only in chat or ticket details while the visible map remains stale.
- **Reviewer discovery:** repeated audits append requirements instead of reopening the frontier.
