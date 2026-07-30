# Mission Ticket Lifecycle

This is the single source of truth for ticket authority, states, transitions, successors, and parallel work.

## Contents

- [Ticket contract](#ticket-contract)
- [Authority and states](#authority-and-states)
- [Work-package boundary](#work-package-boundary)
- [Planning successors](#planning-successors)
- [Parallel groups](#parallel-groups)
- [Activation and execution context](#activation-and-execution-context)
- [Contract freeze](#contract-freeze)
- [Review and acceptance handoff](#review-and-acceptance-handoff)
- [Gates and closure](#gates-and-closure)
- [Review return](#review-return)

## Ticket contract

Create the index card from [`../templates/ticket.md`](../templates/ticket.md); that template is the field-level source of truth. Complete `Result`, `Evidence`, `Remaining uncertainty`, `Next tickets`, and `Map delta` before Review. Add Method, Questions, Authorized outputs, implementation constraints, or a runbook only when they change execution or acceptance.

## Authority and states

Mission Control selects, amends, accepts, abandons, or closes every material ticket. Agents may manage non-material Tasks inside approved work.

| State | Meaning |
| --- | --- |
| Planned | Clear future contract preserved while context is fresh; no execution authority. |
| Ready | Objective, boundaries, dependencies, collaboration, and evidence are agreed. |
| Active | Approved work currently executing. |
| Blocked | The blocker and unblock condition are explicit. |
| Review | Required evidence and in-ticket reviews are complete; human disposition remains. |
| Closed | Accepted at the ticket's authority level. |
| Abandoned | Intentionally stopped with rationale and map impact. |

Keep one material ticket in Ready, Active, or Review by default. Several Active material tickets must belong to one approved parallel group and remain independently reviewable.

## Work-package boundary

Group questions, decisions, and artifacts when they combine into one useful result, share evidence and authority, constrain one another, and cannot be accepted sensibly in isolation.

Split when a part can be scheduled, assigned, accepted, deferred, or implemented independently; requires a different risk or authority treatment; or can branch without preventing the rest from being useful. Ticket count follows independent value, not file, command, question, or artifact count.

Treat a ticket as material when it can change mission outcome, scope, public behavior, business rules, authorization, architecture, persistence, security, migration, rollback, accepted risk, the execution baseline, or acceptance evidence.

A finding inside Active work may update evidence and proposed successors. It does not authorize an unlisted artifact, implementation, validation, or descendant ticket.

## Planning successors

End every material ticket with the next ticket or tickets supported by evidence:

- Keep only one next ticket when fog remains.
- Shape several Planned tickets when their objectives and dependencies are already clear and preserving the current context prevents loss.
- Record a sequence when one result feeds another.
- Record a parallel candidate only when the independence test below passes.

Planned tickets may be refined until selected. Creating one is documentation, not activation.

## Parallel groups

Activate a parallel group only when every member:

- has an independently useful objective and acceptance decision;
- has no unresolved input or policy dependency on another member;
- can isolate repository edits, environments, data, credentials, and external side effects;
- owns a distinct evidence surface rather than rereading the same corpus;
- names dependencies and the eventual synthesis or integration owner; and
- provides enough latency or coverage benefit to justify coordination and token cost.

Before authorization, explain the members, dependencies, Mission Control involvement, isolation, and synthesis point. A Review brief may state that acceptance will activate and dispatch the exact group. That acceptance supplies authority without another confirmation; it does not authorize descendants.

Dispatch each member in fresh isolated context. Keep its contract and Review independent. Give each worktree one material writer; concurrent writers use separate worktrees and reconcile through explicit commits. Surface a shared material decision before any affected member continues.

## Activation and execution context

Keep three transitions distinct:

1. **Selection** chooses the material contract.
2. **Activation** makes the selected ticket current authorized work.
3. **Execution authorization** permits mutation in the current or named fresh session.

Mission Control may grant any or all three in one contextual instruction.

- A bare `yes`, `activate it`, or equivalent selects and activates the immediately proposed Ready contract. Persist its handoff and stop for a fresh session.
- An explicit session directive such as `continue the active ticket` or `work on the next item here` authorizes execution of the unambiguous target in that session. Brief and begin; do not request another fresh session.
- A predeclared parallel acceptance selects, activates, and dispatches the named group into fresh isolated contexts.
- A question such as `what is next?` requests orientation only.
- A compound instruction such as `accept this, commit the handoff, and continue the next item in a new task` authorizes that whole unambiguous transition. Close, activate, persist and commit the handoff, then execute in the fresh session.

Same-session continuation applies to one named successor and expires at its next disposition. Parallel authorization applies only to the named group. When work resumes in another session on the same repository, commit the durable result and self-contained handoff unless Mission Control requests another disposition.

## Contract freeze

Before Active, shape Objective, Kind/Type, Scope, Authorized outputs, Non-goals, dependencies, Collaboration, and Acceptance/evidence. Freeze them on activation.

While Active, evolve Result, Evidence, confidence, Remaining uncertainty, work logs, Next tickets, and Map delta. Permit editorial clarification only when it does not change authority, risk, output, or pass/fail meaning.

Return a material change to Mission Control for explicit amendment or replacement. Keep the current ticket Active or Blocked until disposition; never absorb a new risk class, migration, persistent state machine, destructive data action, cross-store recovery problem, or independently useful objective silently.

## Review and acceptance handoff

Move to Review only when the selected profile's evidence and required in-ticket review are complete. Explain what was produced, why it matters, what remains uncertain, and exactly what acceptance will do.

Use an acceptance handoff when:

- the Review brief names the exact successor or successor set;
- every contract and dependency follows from accepted evidence;
- no competing frontier or material scope, policy, risk, or acceptance choice remains; and
- any parallel group passes the independence test.

On acceptance:

1. Close the reviewed ticket and update the map.
2. Create or transition the predeclared successors.
3. Activate dependency-free work; leave later sequential work Planned.
4. For one successor, persist its fresh-session handoff and stop unless the same instruction authorized execution elsewhere.
5. For a predeclared parallel group, brief and dispatch its members immediately.

Use close-only when the mission ends, Mission Control requests a pause, frontiers compete, evidence supports no clear successor set, or a named material decision blocks shaping it.

## Gates and closure

Gates are Mission Control decisions recorded on the map:

- **Mission Ready:** intent is clear enough to identify the uncertainty that matters.
- **Ready to Shape:** fog is low enough to shape useful deliverables.
- **Ready for Implementation:** accepted behavior and design are sufficient for a fresh implementer and independent QA.
- **Mission Accepted:** Validation evidence has a human-owned verdict and durable learning is promoted.

At a gate, present evidence, unresolved fog, defensible options, and a recommendation. Advance only on Mission Control's decision.

Keep the open map dashboard-sized: one current frontier or approved parallel group, 3–7 known-now facts, the smallest justified successor set, and accepted history as one-line receipts linked to durable sources.

Close as Accepted, Rejected, Rework Required, Inconclusive, Reframed, Abandoned, or another explicit verdict. Promote durable current truth and give every temporary resource an explicit disposition.

## Review return

Verification must match the changed surface. For non-executable decisions or documents, check structure, links, traceability, internal consistency, and review findings. Run product suites only when executable code, configuration, schema, dependencies, generated artifacts, build-consumed documentation, or an explicit baseline obligation can be affected. Report unavailable or irrelevant suites honestly.

```markdown
## Result

<coherent answer, confirmed decision, artifact, reviewed candidate, or verdict>

## Evidence

<paths, commands, tests, observations, or sources>

## Remaining uncertainty

<what remains unresolved; "None material" when justified>

## Next tickets

<one ticket while fog remains, or a dependency-aware sequence/parallel set>

## Map delta

- Known:
- Decisions:
- Fog:
- Proposed or Planned:
- Gate:
```

Keep detailed logs in the ticket or supporting artifact. In chat, return only the product meaning, decision, and predeclared handoff.
