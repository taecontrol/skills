---
name: discovery
description: "Execute one sharp software discovery question with evidence before specification, planning, refactoring, or implementation. Use for an approved Mission Discovery ticket or when a human directly invokes discovery for a vague product idea, requirement, or existing codebase."
license: MIT
---

# Discovery

Discovery reduces one material uncertainty with evidence. It can execute an approved Discovery ticket inside a Mission or run as a standalone collaborative exploration when no Mission is active.

Discovery does not own the software lifecycle. It does not authorize product decisions, downstream deliverables, implementation, validation, or the next frontier.

## Core rules

- Convert fog into questions before requirements.
- Convert vices into evidence before refactors.
- Work one sharp unknown at a time.
- Keep discovery separate from implementation.
- Preserve durable evidence as Markdown in the repository when the result must survive the session.
- When Mission is active, use its map, authority, and ticket protocol; do not create a parallel discovery lifecycle.
- Return material answers for human review rather than silently treating them as accepted decisions.

## Progressive disclosure map

Load only the file needed for the current branch:

| Need | Load |
|---|---|
| Existing Mission Discovery ticket | Load the Mission skill's `references/ticket-protocol.md` when that sibling skill is installed; otherwise use the approved ticket fields and return contract below without inventing Mission progression. |
| Vague idea, stakeholder request, new product concept | `references/new-product-discovery.md` |
| Existing MVP, codebase, internal tool, inherited system, unclear behavior, debt, bugs, or ops risk | `references/existing-product-discovery.md` |
| Standalone ticket type selection | `references/ticket-types.md` |
| Creating or repairing a standalone artifact | The matching file in `templates/` |

Do not load both product-mode references unless the question genuinely spans a new product and an existing system.

## 1. Orient and choose the collaboration branch

Locate the repository root, inspect existing Mission and Discovery artifacts, and preserve the raw request without cleaning uncertainty into requirements.

Choose exactly one branch:

### Mission-managed Discovery

Use when Mission has provided one approved Discovery ticket.

- Load the Mission ticket protocol.
- Confirm the ticket is `Active` and contains one sharp question, scope, non-goals, dependencies, and acceptance/evidence criteria.
- Treat the Mission map and ticket as the navigation source of truth.
- Do not create `discovery/discovery-brief.md`, a second exploration map, or a parallel Discovery ticket. Put durable evidence in the active Mission ticket or an explicitly authorized supporting artifact; any durable child ticket must use the Mission ticket protocol.
- If the ticket is not ready, return the missing fields or blocker to Mission rather than inventing them.

Completion criterion: the active ticket's authority and evidence boundary are clear before investigation begins.

### Standalone collaborative Discovery

Use when no Mission is managing the work and the current request explicitly asks to reduce product or codebase uncertainty before downstream work.

- Choose **New Product Discovery** or **Existing Product Discovery**.
- Load only the matching mode reference.
- Start with a small visible map of destination, known territory, assumptions, fog, frontier, and decisions.
- Use the tracked artifact structure below only when durable evidence, multiple sessions/explorers, blockers, or handoff justify it.

Completion criterion: the human can see the question being explored, why it matters, and the current boundary.

## 2. Choose artifact weight

Artifact weight and collaboration mode are separate choices. Do not manufacture files merely because templates exist.

For a lightweight, same-session question, keep the map and evidence concise in the active Mission ticket or standalone interaction.

For tracked standalone Discovery, use:

```text
discovery/
  discovery-brief.md
  exploration-map.md
  evidence-log.md
  tickets/
  archive/
```

Existing Product Discovery may additionally use `current-state-map.md` and `next-version-brief.md`.

If creating tracked artifacts, copy only the matching files from `templates/`, replace placeholders, and update existing files instead of overwriting prior work.

Completion criterion: every artifact has an active evidence, coordination, or handoff purpose.

## 3. Frame one sharp question

For Mission-managed work, use the approved ticket as written. Do not broaden it.

For standalone work:

1. Convert one sharp unknown into a Discovery ticket when durable tracking is useful; otherwise state it directly on the visible map.
2. Leave vague unknowns as fog rather than pretending they are executable tickets.
3. Ask the human to select the material frontier when more than one defensible question exists.

A ready question identifies:

- the decision or risk it informs;
- scope and nearby non-goals;
- the evidence that would make the answer useful;
- any access, dependency, or human input required.

Completion criterion: one question can be answered in a focused pass without making an unapproved product, scope, risk, or architecture decision.

## 4. Gather evidence

Work only the selected question. Mechanical reads, searches, probes, and reproducible experiments may proceed without performative approval when they stay inside scope.

Record:

- answer supported by evidence;
- evidence paths, commands, observations, sources, or experiment output;
- confidence: Low, Medium, or High;
- remaining uncertainty;
- candidate follow-up questions or newly exposed fog.

Stop and return a blocker when required access or stakeholder input cannot be obtained. Stop and surface a Candidate ticket when the work reveals a new risk class, migration, persistent state machine, cross-store recovery concern, destructive data risk, or a second independent outcome.

Completion criterion: the answer is traceable to evidence, and uncertainty is visible rather than compressed into confidence language.

## 5. Return control

### Mission-managed return

Move the ticket to `Review` and return:

- result / proposed decision;
- evidence;
- confidence;
- remaining uncertainty;
- proposed map updates: known territory, decisions awaiting Mission Control, fog removed/added, Candidate tickets, and gate impact.

Do not close the material ticket, update a proposed answer into an accepted Mission decision, activate another ticket, or create downstream Deliverables.

Completion criterion: Mission Control can judge what was learned and how the map would change without reconstructing the work from chat.

### Standalone return

Update any tracked synthesis artifacts justified by the work, show the visible map, and ask the human which frontier to select next. A Discovery answer still does not authorize a PRD, design, plan, refactor, implementation, or validation pass.

Completion criterion: durable evidence is current, the next frontier remains a human choice, and no lifecycle phase was silently chained.

## Readiness checkpoint

When the current question resolves enough fog or progress stalls, evaluate:

- Can the product or system context be described without faking certainty?
- Are the intended outcome, affected user/workflow, scope, constraints, and success signal visible?
- Are the biggest assumptions and risks explicit?
- Could a fresh implementation agent proceed without inventing material product or architecture decisions?
- Could an independent QA agent decide pass/fail without asking the implementer what they intended?

Return one proposed outcome:

- `Continue discovery`
- `Prototype / technical spike`
- `Narrow or split mission`
- `Ready to shape`
- `Park or kill`

In Mission, this is a recommendation and proposed gate impact for Mission Control. Standalone, record it on the visible map. `Ready to shape` does not create or authorize downstream artifacts.

## Working rules for agents

- Honor the repository's existing transport, branch, artifact, and instruction conventions before writing.
- Ask for missing access or stakeholder input only when tools cannot retrieve the evidence.
- Prefer Markdown links to files, commits, screenshots, docs, logs, and reproducible commands.
- Keep raw evidence in the active ticket or evidence log; keep synthesis concise.
- Archive obsolete standalone tickets when their history matters.
- Do not bury durable evidence or accepted decisions only in chat.

## Completion checklist

A Discovery pass is complete when:

- [ ] It belongs to one bounded question and one collaboration branch.
- [ ] Raw input is distinguishable from evidence, assumptions, and decisions.
- [ ] The answer cites evidence and states confidence and remaining uncertainty.
- [ ] New sharp work is proposed as a Candidate; vague work remains fog.
- [ ] Mission-managed work is in `Review` with a proposed map delta.
- [ ] Standalone tracked artifacts, if justified, are current.
- [ ] No material decision was silently accepted.
- [ ] No downstream Deliverable, implementation, validation, or next frontier was activated automatically.
