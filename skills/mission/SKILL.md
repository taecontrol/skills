---
name: mission
description: "Open or continue a bounded software mission with a human Mission Control, a visible exploration map, and one active material work package at the frontier. Use only when the human explicitly invokes Mission or asks to start, resume, navigate, or close a mission; never auto-chain investigation, deliverables, implementation, review, or gates."
disable-model-invocation: true
license: MIT
---

# Mission

Mission is the collaborative lifecycle container for one bounded intervention on a persistent product. Mission Control and the agent navigate it together; the skill does not run an autonomous software factory.

The default operating rhythm is:

```text
show lean map -> brief one frontier -> activate -> fresh execution session -> lean Review brief -> accept -> optionally activate the predeclared successor -> stop
```

The goal is shared understanding and a well-evidenced outcome, not throughput. Mission is a **navigation interface**, not only a repository state machine: Mission Control should understand in ordinary language where the mission is, what kind of work is happening, why it is next, when they will be involved, and what likely follows without opening a ticket file. Product meaning comes before Mission vocabulary: every material question must be understandable without knowing terms such as `frontier`, `gate`, `semantic fallback`, or a ticket Type. Use **strong internal invariants, plain-language human interface**: keep the guardrails that prevent agent drift, but guide the human with a cockpit rather than exposing the whole protocol. See [`references/lean-mission-interface.md`](references/lean-mission-interface.md) for the lean default.

A ticket owns one coherent, independently reviewable work package. It has one objective, one governing Kind, and a human-readable Type, and may resolve multiple coupled questions or decisions inside that boundary. Material work packages are session-isolated by default; continuing into another ticket in the same session requires an explicit Mission Control instruction.

## Authority boundary

**Mission Control owns:** outcome, appetite, scope, no-gos, material product policy, accepted risk, gates, deliverable authorization, freeze/amendments, mission verdict, and closure.

**The agent owns:** repository/evidence inspection, exposing fog, proposing the next frontier and route options on the map, creating a ticket after Mission Control selects that work package (including through a predeclared acceptance handoff), executing mechanical subtasks inside an approved ticket, keeping artifacts current, and stopping when a material boundary is reached.

A human answer authorizes only the decision or scope explicitly addressed in context. A Review acceptance may also select the one successor whose activation was explicitly predeclared in that Review brief, but never authorizes its execution. Do not otherwise interpret an answer as permission to expand the package, draft downstream artifacts, summon every role, freeze a baseline, or begin implementation.

## Start or resume

1. Locate the repository root and inspect current branch/worktree state, repository instructions, existing mission directories, and persistent product context before writing. Resume an existing matching mission instead of opening a duplicate.
2. If the repository vendors Mission or related executor skills, verify which copy the current runtime actually loaded and compare it with the project copy. Do not infer provenance from file presence. If a version mismatch changes ticket fields, routing, authority, or return behavior, report it and synchronize through the canonical skill package before activating material work; leave unrelated dirty mission/product files untouched.
3. When resuming artifacts from the older inactive-ticket protocol, preserve any material context as map proposals and remove the unselected ticket files. Do not reserve a ticket or ID until Mission Control selects that frontier.
4. If opening a mission, preserve the raw request in a small Mission Brief. Do not clean uncertainty into requirements. Use [`templates/mission-brief.md`](templates/mission-brief.md) selectively.
5. Create or update one visible map using [`templates/exploration-map.md`](templates/exploration-map.md). Keep it dashboard-sized by default: destination, current gate, current/proposed frontier, decision needed, known-now facts, open fog, accepted closures, and one recommended next frontier. Expand history or route depth only when it materially improves orientation.
6. Show the lean map to Mission Control and propose exactly one material frontier for selection. Keep unselected work as a concise map proposal, not a ticket. Create the ticket only after Mission Control selects the work package; do not activate it implicitly.

Completion criterion: Mission Control can explain the destination, current fog, proposed frontier, its Kind/Type, the likely route after it, and the next material decision before work begins.

## Keep Mission Control oriented

Use the human-visible briefing, checkpoint, and Review-brief shapes in [`references/ticket-protocol.md`](references/ticket-protocol.md), but keep chat lean and understandable. The ticket file is durable state; it is never the sole user interface. Mission Control should see a cockpit: where we are, what changed, what evidence exists, what decision is needed, and the recommended next frontier.

- Begin every material explanation and question with the concrete product behavior, consequence, or choice in ordinary language. The opening must still make sense if every ticket ID, Kind/Type, gate, and Mission label is removed. Do this before confusion appears, not only after Mission Control asks for simpler terms.
- Define an unfamiliar technical or Mission term before using it to ask for a decision. If Mission Control says they do not understand, reset the explanation with a concrete example and the product consequence; do not merely restate the term or defend the protocol.
- Put ticket IDs, Kind/Type labels, gate names, ADR names, and other process metadata after the explanation and only when they improve orientation. Never make Mission Control infer the product meaning from phrases such as "canonical docs are synced," `shadow mode`, or `semantic model call`.

- Before the first substantive tool call for an activated material ticket, explain the product objective and why it is next, then give only the status, evidence, autonomy boundary, return condition, and likely next frontier that materially aid orientation. Do not mechanically emit every protocol field.
- During execution, communicate only at material checkpoints: a scope/risk/architecture change, a genuine human decision, a blocker, or transition to Review. Do not narrate routine reads, commands, or formatting.
- When Mission Control makes a material choice, acknowledge the decision and state its immediate consequence before entering a long autonomous run.
- At Review, present a compact decision brief before pointing to a long artifact. Never tell Mission Control merely to “review the file.” When one successor is unambiguous and ready to shape mechanically, state that accepting the current ticket will also activate that successor for a fresh session; acceptance then selects it without a second `agree` ceremony.
- End every navigation response with one explicit immediate next action and one recommended next-frontier proposal. A proposal is orientation only until Mission Control selects it, either directly or through the predeclared acceptance handoff in [`references/ticket-protocol.md`](references/ticket-protocol.md).

Completion criterion: Mission Control can follow the journey from chat without reading long artifacts, while the repository remains sufficient for a fresh executor.

## Navigate by tickets

Load [`references/ticket-protocol.md`](references/ticket-protocol.md) before creating, activating, reviewing, or closing a ticket.

1. Shape concise frontier proposals on the map when work forms a coherent, independently reviewable package: a discovery objective, decision set, durable deliverable, execution slice, validation assignment, or blocking setup outcome. A proposal states enough Kind/Type, objective, rationale, dependency, and acceptance outline for Mission Control to choose, but it is not a ticket. Keep related questions and decisions inside the proposed package. Vague fog and sharp questions without an independent handoff, evidence, or acceptance need remain as fog or inside the active ticket.
2. Select the next material work package with Mission Control. Selection may be direct or may occur when Mission Control accepts a Review brief that explicitly predeclared one eligible successor. Only then create its index-card ticket. Mark it Ready when the objective, scope, non-goals, dependencies, and acceptance/evidence are clear; then mark it Active. Add sections such as Method, Why now, Questions, or detailed Authorized outputs only when they change behavior, prevent ambiguity, or support handoff/review.
3. Treat ticket selection and session choice as distinct decisions that Mission Control may grant together. By default, record the Active ticket and a self-contained handoff, give the activation briefing, then stop so the ticket is executed in a fresh session. A bare confirmation such as “yes,” “activate it,” or “go ahead” authorizes the ticket, not same-session execution. At a disposition checkpoint, contextual instructions such as “continue here” or “do the next one in this session” both select the unambiguous proposed frontier and authorize same-session execution; do not demand a second procedural confirmation, but still give the briefing before substantive work.
4. Work only the active work package in its execution session. Mechanical evidence-gathering subtasks and related questions may proceed without performative approval, but cannot change the ticket's objective, scope, risk, or authority. Once Active, freeze Objective, Kind/Type, Scope, Authorized outputs, Non-goals, dependencies, and Acceptance. Result, Evidence, Confidence, Remaining uncertainty, and Map updates may evolve. A material contract change requires an explicit Mission Control amendment or a return to the map with a new frontier proposal.
5. Return the ticket to Review with its result, evidence, remaining uncertainty, explicit map delta, and worktree disposition. Do not activate or begin another ticket before acceptance. When exactly one next work package is evident and its contract can be completed mechanically, record it on the map and predeclare that acceptance will activate it for a fresh session.
6. Close the ticket only at its required authority level and update the map and provisional route. If Mission Control accepts a ticket after that predeclaration, close it, create and activate the successor, persist a self-contained handoff, and stop; do not ask for `agree` and do not execute the successor in the current session. Otherwise Mission Control chooses whether to revise, commit, pause, select another frontier, or explicitly continue in the current session. When the choice is unambiguous, act without restating a menu or asking Mission Control to approve agent-authored ticket wording.

Completion criterion: every material result is visible on the map, the repository can resume from durable artifacts, and no downstream execution or same-session ticket began without an explicit, contextual Mission Control choice.

## Route without taking over

| Kind | Route | Return to Mission |
| --- | --- | --- |
| Discovery | Investigate one approved decision-driving uncertainty or tightly coupled set. Use a human-readable Type that names the method, such as `research`, `grilling`, `prototype`, `technical-spike`, or `code-archaeology`. Keep investigation separate from implementation and record sources, commands, observations, confidence, and remaining fog. | Evidence, confidence, remaining fog, proposed map delta; material answers remain Review until Mission Control decides. |
| Decision | Work collaboratively; agents provide verified options and trade-offs. | Mission Control decision and consequences. |
| Deliverable | Create or amend the named artifact or explicitly bounded, tightly related artifact set after activation. | Artifact set, changed-surface evidence against acceptance criteria, unresolved decisions; status Review. Do not run unrelated product suites for a documentation-only deliverable. |
| Execution | Route to `strategic-implementation` when installed, or to the applicable implementation/TDD skill against the approved baseline. Non-trivial code changes must return compact design-quality evidence, not only green tests. | Code/evidence/deviations/design-quality evidence; never self-amend scope. |
| Validation | Use an independent context when practical. For completed implementation, route to `implementation-review` when installed to check both contract correctness and strategic design quality. | Evidence and verdict; Mission Control accepts or rejects it. |
| Task | Perform bounded setup or mechanical work. | Observable completion or blocker. |

Routing is not progression. After any route returns, stop at the ticket checkpoint; a new executor or route does not inherit authority to continue the mission.

Discovery is a Mission ticket Kind, not a separate lifecycle or generic evidence helper. Do not relabel a Deliverable, Execution, or Validation ticket as Discovery merely because it requires evidence gathering. If that work exposes a material unknown needing independent disposition, stop and propose a typed Discovery frontier. Create its ticket only if Mission Control selects it.

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

For implementation-heavy missions, Ready for Implementation should make the expected design-quality evidence visible: the concepts/interfaces affected, invariants that must be represented directly, policy that must have one home, and any APoSD risks that independent validation should check. Keep the details in the Execution ticket or `strategic-implementation`; Mission only records the checkpoint.

At each gate, present evidence, unresolved fog, options, and a recommendation. Wait for Mission Control; do not auto-advance. Prefer a one-line gate statement unless the gate is disputed or the mission is large enough to need a table.

## Scope drift and loop breakers

Stop the active ticket and return to the map when work reveals a new risk class, migration, persistent state machine, cross-store recovery, staged cutover, destructive data risk, several hidden lifecycle variants, or a deliverable that no active ticket authorized.

A reviewer confirms a shaped result; it is not the discovery engine. Classify findings as local omission, new material question, risk/appetite change, or incomplete system map. Repeated blocking review findings reopen the frontier instead of causing an automatic patch loop.

Completion criterion: scope or risk changes are visible frontier proposals or Mission Control decisions, never silent additions to the active ticket.

## Close or pause

A mission closes as Accepted, Rejected, Rework Required, Inconclusive, Reframed, Abandoned, or another explicit Mission Control verdict.

Before closure:

- record outcome and evidence;
- record residual risk and follow-up proposals;
- promote durable current truth to persistent product/architecture documentation;
- leave future opportunities as new mission proposals, not extensions;
- ensure temporary branches, worktrees, servers, and artifacts have an explicit disposition.

For a pause, leave the map with one clear next frontier and no ambiguous Active ticket.

Completion criterion: a fresh session can resume or understand closure from repository artifacts without reconstructing intent from chat.

## Failure modes

- **Contract theatre:** role labels, polished documents, or long templates hide that Mission Control never navigated the fog. Prefer lean cockpit summaries over exposing the whole protocol.
- **Silent chaining:** Discovery completion triggers Spec, Design, Plan, reviewers, or implementation without an accepted, bounded successor ticket. Creating and activating one predeclared successor after acceptance is a handoff, not permission to execute it.
- **Session bleed:** approval or completion of one ticket is treated as permission to execute the next ticket in the same context; use a fresh session unless Mission Control explicitly overrides the boundary.
- **Ticket bureaucracy:** each question, decision, artifact, or command becomes its own ticket instead of belonging to a coherent work package.
- **Premature completion:** attention moves to downstream phases before the active ticket has evidence and map updates.
- **Map drift:** decisions live only in chat or ticket details while the visible map remains stale.
- **Reviewer discovery:** repeated audits append requirements instead of reopening the frontier.
