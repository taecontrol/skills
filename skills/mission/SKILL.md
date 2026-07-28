---
name: mission
description: "Open or continue a bounded software mission with a human Mission Control, a visible exploration map, and one active material work package at the frontier. Use only when the human explicitly invokes Mission or asks to start, resume, navigate, or close a mission; never auto-chain material tickets or gates."
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

For an Execution ticket, “independently reviewable” includes an independent implementation review. The implementation agent preserves a local candidate commit; the first review starts in fresh agent context, while repairs normally return incrementally to the same independent reviewer. The ticket remains Active until that review passes. This is acceptance evidence inside the Execution ticket, not the later use-case QA phase.

## Authority boundary

**Mission Control owns:** outcome, appetite, scope, no-gos, material product policy, accepted risk, gates, deliverable authorization, freeze/amendments, mission verdict, and closure.

**The agent owns:** repository/evidence inspection, exposing fog, proposing the next frontier and route options on the map, creating a ticket after Mission Control selects that work package (including through a predeclared acceptance handoff), executing mechanical subtasks inside an approved ticket, keeping artifacts current, and stopping when a material boundary is reached.

A human answer authorizes only the decision or scope explicitly addressed in context. A Review acceptance may also select the one successor whose activation was explicitly predeclared in that Review brief, but never authorizes its execution. Do not otherwise interpret an answer as permission to expand the package, draft downstream artifacts, summon every role, freeze a baseline, or begin implementation.

Keep three transitions distinct: **selection** chooses the ticket contract, **activation** makes it the current authorized work, and **execution** performs its mutations. Mission Control may grant any or all of them in one unambiguous contextual instruction.

## Start or resume

1. Locate the repository root and inspect current branch/worktree state, repository instructions, existing mission directories, and persistent product context before writing. Resume an existing matching mission instead of opening a duplicate.
2. If the repository vendors Mission or related executor skills, verify which copy the current runtime actually loaded and compare it with the project copy. Do not infer provenance from file presence. If a version mismatch changes ticket fields, routing, authority, or return behavior, report it and synchronize through the canonical skill package before activating material work; leave unrelated dirty mission/product files untouched.
3. When resuming artifacts from the older inactive-ticket protocol, preserve any material context as map proposals and remove the unselected ticket files. Do not reserve a ticket or ID until Mission Control selects that frontier.
4. If opening a mission, preserve the raw request in a small Mission Brief. Do not clean uncertainty into requirements. Use [`templates/mission-brief.md`](templates/mission-brief.md) selectively.
5. Create or update one visible map using [`templates/exploration-map.md`](templates/exploration-map.md). Keep exactly one current frontier, 3–7 facts that matter now, open fog, and one recommended next frontier. Represent accepted history only as one-line receipts linked to tickets, ADRs, or accepted artifacts.
6. Show the lean map to Mission Control and propose exactly one material frontier for selection. Keep unselected work as concise map proposals, even when asked to “create all”; materialize only the selected frontier unless each package has already been individually selected and is stable enough to freeze.

Completion criterion: Mission Control can explain the destination, current fog, proposed frontier, its Kind/Type, likely route, and next material decision; the map has exactly one current frontier and every accepted-history entry resolves to a durable source.

## Keep Mission Control oriented

Use the natural-conversation rules in [`references/ticket-protocol.md`](references/ticket-protocol.md). Durable tickets and maps hold protocol detail; chat gives only the **minimum sufficient context**.

- Default to 2–5 short sentences with no headings, status blocks, or labeled fields. Use up to three bullets only when a real list is easier to scan.
- Start with the concrete product behavior, consequence, or choice. Omit ticket IDs, Kind/Type, gates, file names, counts, and verification details unless they change the human decision or are requested.
- Use familiar words. When a genuinely complex term is necessary, define it immediately in one short clause. If Mission Control is confused, restart with a concrete example rather than paraphrasing the jargon.
- Before work, say what will be done and why. During work, speak only for a material decision, blocker, scope/risk change, or Review. At Review, say what was produced, why it matters, and what accepting it will do.
- End naturally with the one decision or next action. Do not print labels such as `Immediate next action`, `Recommended next frontier`, `Evidence`, or `If accepted` in normal chat.
- Before sending, remove every sentence that does not change Mission Control's understanding, decision, or next action.

Completion criterion: Mission Control can understand and act from the brief without skipping a block of protocol text, while durable artifacts remain sufficient for a fresh executor.

## Navigate by tickets

Load [`references/ticket-protocol.md`](references/ticket-protocol.md) before creating, activating, reviewing, or closing a ticket.

1. Shape concise frontier proposals on the map when work forms a coherent, independently reviewable package: a discovery objective, decision set, durable deliverable, execution slice, validation assignment, or blocking setup outcome. A proposal states enough Kind/Type, objective, rationale, dependency, and acceptance outline for Mission Control to choose, but it is not a ticket. Keep related questions and decisions inside the proposed package. Vague fog and sharp questions without an independent handoff, evidence, or acceptance need remain as fog or inside the active ticket.
2. Select the next material work package with Mission Control. Selection may be direct or may occur when Mission Control accepts a Review brief that explicitly predeclared one eligible successor. Only then create its index-card ticket. Mark it Ready when the objective, scope, non-goals, dependencies, and acceptance/evidence are clear; then mark it Active. Add sections such as Method, Why now, Questions, or detailed Authorized outputs only when they change behavior, prevent ambiguity, or support handoff/review.
3. Treat ticket selection, activation, and execution-session choice as distinct decisions that Mission Control may grant together. By default, record the Active ticket and self-contained handoff, brief it, then stop for a fresh execution session. A bare confirmation after a proposal selects and activates the ticket but does not authorize same-session execution. An explicit work directive at session start/resume grants execution too; create or activate the unambiguous ticket, brief it, and work in that session. At a disposition checkpoint, “continue here” grants same-session execution of the unambiguous successor. A contextual instruction to accept/close/commit and continue the unambiguous successor in a new session authorizes the whole transition: close, select and activate the successor, persist and commit that handoff, then create or use the fresh session and execute there. Ask only when a material choice is actually missing.
4. Work only the active work package in its execution session. Mechanical evidence-gathering subtasks and related questions may proceed without performative approval, but cannot change the ticket's objective, scope, risk, or authority. Once Active, freeze Objective, Kind/Type, Scope, Authorized outputs, Non-goals, dependencies, and Acceptance. Result, Evidence, Confidence, Remaining uncertainty, and Map updates may evolve. A material contract change requires an explicit Mission Control amendment or a return to the map with a new frontier proposal. For Execution, keep the ticket Active after the implementer preserves a local candidate commit and route `C0` to `implementation-review` in fresh context; this in-ticket review needs no new frontier or additional human authorization.
5. Return the ticket to Review only when its required evidence is complete, with result, remaining uncertainty, explicit map delta, candidate disposition, and worktree disposition. An Execution ticket is not human-ready until its independent implementation review passes. `Request changes` keeps it Active for bounded rework by the same implementer context and incremental re-review by the same independent reviewer when available; `Inconclusive` keeps it Active or Blocked with the missing evidence named. Candidate commits remain local and do not imply acceptance or push authority. Do not activate or begin another ticket before acceptance. When exactly one next work package is evident and no material blocker or competing frontier exists, record it on the map and predeclare that acceptance will activate it for a fresh session. The agent owns mechanically shaping its ticket contract from accepted artifacts.
6. Close the ticket only at its required authority level and update the map and provisional route. Acceptance after a predeclared handoff closes the ticket and activates the successor without another confirmation. Stop for the fresh session unless the same instruction also authorized creating/using it; in that case continue there, never by mutating the successor in the closing session.

Completion criterion: every material result is visible on the map, the repository can resume from durable artifacts, and no downstream execution or same-session ticket began without an explicit, contextual Mission Control choice.

## Route without taking over

| Kind | Route | Return to Mission |
| --- | --- | --- |
| Discovery | Investigate one approved decision-driving uncertainty or tightly coupled set. Use a human-readable Type that names the method, such as `research`, `grilling`, `prototype`, `technical-spike`, or `code-archaeology`. Keep investigation separate from implementation and record sources, commands, observations, confidence, and remaining fog. | Evidence, confidence, remaining fog, proposed map delta; material answers remain Review until Mission Control decides. |
| Decision | Work collaboratively; agents provide verified options and trade-offs. | Mission Control decision and consequences. |
| Deliverable | Create or amend the named artifact or explicitly bounded, tightly related artifact set after activation. | Artifact set, changed-surface evidence against acceptance criteria, unresolved decisions; status Review. Do not run unrelated product suites for a documentation-only deliverable. |
| Execution | Route implementation to `strategic-implementation` when installed, preserve a local candidate commit, then route `C0` to `implementation-review` in fresh context inside the same Active ticket. Repaired candidates normally return incrementally to the same independent reviewer. Non-trivial code changes need both implementer evidence and an independent verdict against the approved design and contract. | Candidate lineage/ledger, code/evidence, then `Pass`, `Request changes`, or `Inconclusive`; only `Pass` makes the ticket eligible for human Review. |
| Validation | Before activation, map each accepted obligation to its narrowest faithful boundary/oracle, name any native/end-to-end gap, and estimate setup, startup, and invocation cost. Then use a separate ticket and fresh context with `use-case-qa` when installed. | Per-use-case evidence and QA verdict; Mission Control accepts or rejects it. |
| Task | Perform bounded setup or mechanical work. | Observable completion or blocker. |

Routing is not progression. After a route returns, stop at the ticket checkpoint unless the still-Active Execution contract requires `C0`'s fresh independent full `implementation-review` or a repair's incremental return to the same reviewer; either review is in-ticket completion evidence, not progression, and Mission routes it without another human authorization. After the reviewer returns, apply its verdict without activating another ticket or advancing a gate. No executor inherits authority beyond its bounded route.

When Validation fails, preserve its first verdict and allow read-only diagnosis to bound failures by shared cause or boundary. Shape one coherent Execution repair proposal per coupled cause set, not one ticket per finding; a fresh Validation ticket judges the accepted repair. A purely mechanical defect in evidence infrastructure may be corrected proportionally inside the authorized Validation boundary only when it does not change the system under test or oracle semantics: preserve separate repair commit, independent review, and fresh revalidation, and keep the validator out of the approval role.

Discovery is a Mission ticket Kind, not a separate lifecycle or generic evidence helper. Do not relabel a Deliverable, Execution, or Validation ticket as Discovery merely because it requires evidence gathering. If that work exposes a material unknown needing independent disposition, stop and propose a typed Discovery frontier. Create its ticket only if Mission Control selects it.

## Shape deliverables deliberately

The Mission Brief, Product/Behavior Spec, Technical Design, Implementation Plan, and Validation Plan are conceptually distinct, but none is mandatory merely because a template or lifecycle names it.

- Put every substantial artifact inside an approved work package and agree its purpose, readers, dependencies, non-goals, and acceptance evidence before activation. Name each artifact or explicitly bound the approved set.
- Create a separate Deliverable ticket when the artifact has independent use, ownership, review, or acceptance. A work package may produce multiple tightly related artifacts when they are named or bounded, useful, and accepted together.
- For behavior-changing design, concrete use cases and observable outcomes are required acceptance evidence rather than something invented during QA. Those accepted cases guide implementation and become the baseline for a later Validation ticket; genuinely non-behavioral work does not need artificial cases, and the QA execution method remains project-specific.
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

A reviewer confirms a shaped result; it is not the discovery engine. Record findings in the Execution ledger as `implementation-defect`, `contract-gap`, `architecture-gap`, `repair-regression`, or `stale-or-invalid`. Contract or architecture gaps return to the map immediately instead of becoming patch instructions. Bounded implementation defects and repair regressions may return to the same implementer and reviewer contexts.

Before a third repair candidate, stop for a mandatory root-cause checkpoint even if the remaining findings appear local. Show which findings existed in `C0`, which repairs introduced regressions, whether the frozen contract made each obligation explicit, and whether repairs cross new responsibilities. Mission Control decides whether to authorize one more bounded repair, reopen Shape/Decision, split the ticket, change the architecture or canonical profile for demonstrated capability failure, block, or abandon. Never create `C3` automatically.

Completion criterion: scope or risk changes are visible frontier proposals or Mission Control decisions, never silent additions to the active ticket.

## Close or pause

A mission closes as Accepted, Rejected, Rework Required, Inconclusive, Reframed, Abandoned, or another explicit Mission Control verdict.

Before closure:

- record outcome and evidence;
- record residual risk and follow-up proposals;
- promote durable current truth to persistent product/architecture documentation;
- leave future opportunities as new mission proposals, not extensions;
- ensure temporary branches, worktrees, servers, and artifacts have an explicit disposition.
- when another session will continue in the repository, intentionally commit the closure/handoff unless Mission Control says otherwise, leaving no shared worktree dirty;
- keep one writer per worktree during material mutation; concurrent writers use separate worktrees.

For a pause, leave the map with one clear next frontier and no ambiguous Active ticket.

Completion criterion: a fresh session can resume or understand closure from committed repository artifacts without reconstructing intent from chat, or the ticket records Mission Control's explicit exception; every material writer has an unambiguous worktree.

## Failure modes

- **Contract theatre:** role labels, polished documents, or long templates hide that Mission Control never navigated the fog. Prefer lean cockpit summaries over exposing the whole protocol.
- **Silent chaining:** Discovery completion triggers Spec, Design, Plan, reviewers, or implementation without an accepted, bounded successor ticket. Creating and activating one predeclared successor after acceptance is a handoff, not permission to execute it.
- **Session bleed:** approval or completion of one ticket is treated as permission to execute the next ticket in the same context; use a fresh session unless Mission Control explicitly overrides the boundary.
- **Fresh-session bounce:** Mission Control opens a session to work on the next or Active ticket, but the agent only activates it and asks for another fresh session. The explicit work directive already consumed the isolation boundary; brief and execute in the current session.
- **Ticket bureaucracy:** each question, decision, artifact, or command becomes its own ticket instead of belonging to a coherent work package.
- **Premature completion:** attention moves to downstream phases before the active ticket has evidence and map updates.
- **Map drift:** decisions live only in chat or ticket details while the visible map remains stale.
- **Reviewer discovery:** repeated audits append requirements instead of reopening the frontier.
- **Premature human Review:** the implementer finishes and the Execution ticket moves to Review before an independent implementation verdict exists. Keep it Active until that verdict passes.
- **Implementation-review / QA collapse:** code fidelity review is treated as use-case QA, or use-case QA is absorbed into the Execution ticket. Keep the former inside Execution and the latter in a separate Validation ticket.
- **Reviewer amnesia:** every repair starts another full fresh-context audit. Use fresh independent context for `C0`, then preserve reviewer continuity and review repairs incrementally unless risk or lineage requires a fresh full review.
- **Candidate commit confusion:** a local review checkpoint is treated as human acceptance or permission to push. Mission Control still owns acceptance and final history disposition.
