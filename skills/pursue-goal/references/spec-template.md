# SPEC template

Agent-facing durable design record. Write in English under `.goals/<goal-slug>/SPEC.md`. Keep it concise. The Coordinator explains this to the human in plain language; do not treat the file as the human interface.

## Outcome

- Goal outcome:
- Observable proof of success:
- Boundaries / in scope:
- No-goals / out of scope:
- Protected behavior:

## Functional design

- Users and contexts:
- Primary flows:
- Important states and edge cases:
- Domain terms and invariants (or pointer to accepted domain record):

## Architecture

- System / module shape:
- Ownership and seams:
- Data and persistence:
- Public contracts:
- Security, concurrency, recovery (as applicable):
- Alternatives rejected and why:
- Pointer to architect sketch or rationale artifact, if any:

## UI

- Applicable: yes / not applicable (reason):
- Tasks, navigation, and critical states:
- Visual direction and references:
- Evidence (prototype path, renders, or show-me artifacts):

## Validation table

| ID and goal requirement or protected risk | Command or concrete user procedure | Observable pass/fail criterion | Environment, data, and fidelity limits | Execution owner and stage | Expected cost, prerequisites, and rerun inputs |
| --- | --- | --- | --- | --- | --- |

- Outcome proof vs regression gates (separate rows):
- Gaps / deferred gates / unblock owners:

## Decisions, assumptions, risks

- Accepted material decisions and rationale:
- Assumptions:
- Risks and open non-blocking items:
- Explicit non-applicability notes:
