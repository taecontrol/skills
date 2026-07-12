# Ticket 002: Shared Mission Ticket Protocol

Status: **Closed — collaborative frontier control selected**  
Type: **Collaborative design decision**  
Owner: **Luis + Kratos**  
Depends on: **Ticket 001**

## Question

What minimum contract should every mission ticket follow, and which ticket transitions require explicit Mission Control approval?

## Why this matters

Tickets must slow the workflow at the right places without turning every mechanical action into ceremony. Too little structure recreates invisible autonomous work; too much structure makes Luis approve trivial agent steps and shifts attention from the mission to administration.

## Proposed common ticket contract

Every ticket has a compact common header:

```markdown
# Ticket NNN: <outcome or question>

Status: Candidate | Ready | Active | Blocked | Review | Closed | Abandoned
Kind: Discovery | Decision | Deliverable | Execution | Validation | Task
Mode: Collaborative | Agent | Human | Independent
Owner: <person or role>
Depends on: <tickets or none>
```

Every ticket body answers:

1. **Outcome / question** — one bounded result or one sharp unknown.
2. **Why now** — what decision, gate, or dependency it unlocks.
3. **Scope / non-goals** — enough to prevent expansion.
4. **Method** — how the work will be performed; optional when obvious.
5. **Acceptance / evidence** — observable completion criteria.
6. **Result / decision** — filled when the work reaches Review or Closed.
7. **Map updates** — known territory, fog, decisions, future tickets, or gate changes.

Type-specific templates may add fields, but cannot replace this common contract.

## Proposed state semantics

| State | Meaning |
| --- | --- |
| Candidate | Proposed work; not authorized. |
| Ready | Agreed scope and completion evidence; dependencies satisfied. |
| Active | The one current material ticket being worked. |
| Blocked | Cannot proceed; blocker is explicit. |
| Review | Work product exists; required reviewer/decision owner has not accepted it. |
| Closed | Result and evidence accepted at the ticket's required authority level. |
| Abandoned | Intentionally stopped with rationale; no silent deletion. |

A mission may have several active mechanical subtasks inside one ticket, but only one **material** mission ticket is Active unless Luis explicitly authorizes parallel frontier work.

## Proposed ticket routing

- **Discovery:** `mission` activates it; `discovery` works it; material conclusions return to Luis before becoming decisions.
- **Decision:** always collaborative or human-owned; agents present evidence and options.
- **Deliverable:** creates or amends one named artifact; cannot silently create downstream artifacts.
- **Execution:** implements an approved slice against a frozen or explicitly amendable baseline.
- **Validation:** uses an independent context where practical and returns evidence/verdict, not mission acceptance.
- **Task:** setup or mechanical work with no material decision.

## Materiality test

A ticket is material when it can change any of:

- outcome, appetite, scope, no-gos, or success signal;
- public behavior or product policy;
- architecture, persistence, security, migration, or operational risk;
- accepted risk or rollback posture;
- execution-contract baseline;
- mission verdict or closure.

## Approval policy options

### Option A — Luis activates and closes every ticket

Maximum visibility, but likely too much ceremony for research commands, formatting, validation scripts, and other mechanical work.

### Option B — Luis controls material and deliverable boundaries (recommended)

Luis explicitly approves:

- activation and closure of every material Decision ticket;
- activation of every Deliverable ticket;
- movement from a Deliverable ticket's Review state to Closed when it fixes mission behavior, architecture, plan, or validation obligations;
- every gate, freeze/amendment, accepted risk, QA acceptance, and mission closure.

Kratos may activate and close non-material Task tickets and evidence-gathering subtasks inside an already approved ticket, while keeping their results visible in the active ticket.

A Discovery ticket may reach Review autonomously after evidence gathering, but a material answer does not become a mission decision until Luis accepts it.

### Option C — Agents control ticket lifecycle; Luis approves only mission gates

Lowest ceremony, but too much work can happen offstage between gates and recreate the pilot's failure.

## Kratos recommendation

Adopt the common contract, state semantics, routing, materiality test, and **Option B** approval policy for version 0.1.

This keeps Luis at every boundary that changes what is being built or what evidence will count, while allowing mechanical work within an agreed ticket to proceed without constant permission prompts.

## Decision needed from Mission Control

**Decision:** Luis accepted a refined Option B modeled directly on Wayfinder/Discovery.

The protocol is not an approval bureaucracy. A ticket is one visible frontier, decision, or agreed deliverable. Luis and Kratos select the active material frontier together; Kratos may perform mechanical evidence-gathering subtasks inside it without separate authorization. The ticket returns to Review with evidence and a visible map delta before another material frontier opens.

Accepted rules:

1. The map remains visible: destination, known territory, fog, frontier, decisions, candidate tickets, and gates.
2. Only one material frontier is Active unless Mission Control explicitly authorizes parallel exploration.
3. A scope answer closes that question; it does not authorize downstream artifacts.
4. Every substantial deliverable starts as an agreed Deliverable ticket.
5. Kratos may execute mechanical subtasks within an approved ticket.
6. A material Discovery answer reaches Review but does not become a mission decision until Luis accepts it.
7. Every ticket returns its evidence and map delta before the next material ticket is selected.
8. No skill may automatically chain Discovery -> Spec -> Design -> Plan -> Review.
9. Mission Control owns gates, freeze/amendments, accepted risk, mission verdict, and closure.
10. Lightweight tickets may remain in the map; durable evidence, multi-session work, handoffs, and substantial deliverables get separate files.

## Map updates

- Ticket lifecycle and authority boundary moved from fog to decided.
- “Approve every ticket” was rejected as unnecessary ceremony.
- “Agents control everything between gates” was rejected because it hides the journey.
- Next proposed deliverable: draft the `mission` skill package as the source of truth for this protocol.
