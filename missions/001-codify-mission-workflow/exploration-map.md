# Exploration Map: Mission Workflow Skills

## Destination

A portable skill set that keeps Luis and Kratos jointly navigating each mission, while tickets authorize discovery and deliverable creation one piece at a time.

## Known territory

- The canonical operating model already separates Mission, Discovery, Execution Contract, Implementation, and independent QA.
- The first pilot showed that a contract drafted too early becomes the discovery surface and grows uncontrollably.
- The reset showed that context-separated agents can still produce contract theatre when one coordinator does all navigation offstage.
- The existing local `discovery` skill contains useful wayfinding mechanics, but it also mixes navigation, contract shaping, audit rules, lifecycle traps, and large templates.
- `taecontrol/skills` is the canonical portable skill repository; product repositories such as Flaurence are testbeds and consumers.

## Decisions from Mission Control

1. Create skills now and improve them through real use rather than continuing unstructured pilots.
2. Mission work is a collaboration between Luis and Kratos.
3. Deliverables are defined and authorized through tickets.
4. Optimize for correctness and shared understanding, not speed.
5. Version 0.1 will use two skills—`mission` and `discovery`—with one shared ticket protocol. Artifact-specific skills will be split only after live evidence justifies them.
6. Ticket lifecycle uses collaborative frontier control: Luis and Kratos select material frontiers together; Kratos executes mechanical subtasks inside the active ticket; material answers and deliverables return to Review with a visible map delta.

## Frontier

- [ ] Propose the `discovery` interoperability/refactor ticket; do not activate it implicitly.

## Closed tickets

- [x] [`tickets/001-skill-boundaries-and-automation-stops.md`](tickets/001-skill-boundaries-and-automation-stops.md) — Selected `mission` + `discovery` with a shared ticket protocol.
- [x] [`tickets/002-shared-ticket-protocol.md`](tickets/002-shared-ticket-protocol.md) — Selected collaborative frontier control, shared ticket states, and explicit automation stops.
- [x] [`tickets/003-draft-mission-skill.md`](tickets/003-draft-mission-skill.md) — Accepted the portable `mission` package after mechanical verification and human review.

## Fog — not ticketed yet

- Exact packaging relationship between `mission` and `discovery` without duplicating the shared protocol.
- How artifact review and amendments are represented.
- How implementation and QA skills plug into the mission without controlling its gates.
- Which parts of the current local `discovery` skill should be retained, moved behind references, or deleted.
- The smallest real mission suitable for the first live test.

## Candidate deliverable tickets after the frontier decision

These are candidates, not authorized work:

- Draft the `mission` skill.
- Refactor/package the `discovery` skill.
- Define the mission ticket template and mission ledger/map template.
- Validate local installation and invocation behavior.
- Run one collaborative mission test and record friction.

## Explicitly out of scope

- Automatically generating all five execution-contract artifacts.
- Automatically spawning architect/reviewer/implementer/QA roles.
- Automatically freezing, accepting, or closing a mission.
- Requiring a remote issue tracker for basic operation.

## Current checkpoint

**Accepted `mission` deliverable relocated.** The package and mission record now live in `taecontrol/skills`. Propose the `discovery` interoperability/refactor ticket next; no other material ticket is Active.
