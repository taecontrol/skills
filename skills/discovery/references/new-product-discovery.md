# New Product Discovery

Load this branch when the input is a vague idea, vague requirement, stakeholder request, or new product concept.

Goal: discover what product should exist, for whom, why it matters, what V1 might be, and what must be learned before shaping or building.

## Orient from raw input

Capture what the human or stakeholder said without pretending it is true:

- requested idea or requirement
- requester / stakeholder
- perceived problem
- guessed user or customer
- urgency, deadline, or pressure
- any proposed solution already implied

Completion criterion: the raw input is summarized in `discovery/discovery-brief.md` under `Raw input / what we were told`.

## Common fog patches

Ticket only the unknowns that matter for the next decision:

- Who is the primary user?
- What problem do they feel today?
- How do they solve it now?
- How painful, frequent, or expensive is the problem?
- What outcome would make this worthwhile?
- What is the smallest useful V1?
- What must explicitly not be included in V1?
- What assumptions could kill the idea?
- What evidence would increase or decrease confidence?
- What prototype, interview, research, or spike should happen next?

## Good ticket shapes

Prefer tickets that answer one decision-making question:

- `grilling` — stakeholder intent, constraints, and no-gos
- `research` — domain, market, regulation, or comparable products
- `interview` — user/customer pain and workflow evidence
- `prototype` — concrete artifact to provoke reaction
- `technical-spike` — feasibility is the central risk
- `decision` — evidence is enough and a choice must be made

Load `references/ticket-types.md` when choosing among all ticket types.

## Mode-specific checkpoint

Avoid writing requirements until the Discovery Brief can describe the problem, user, outcome, constraints, and risks without fake certainty.

Checkpoint outcomes most common in this mode:

- `Continue discovery` — key user/problem/outcome assumptions are still fog.
- `Shape V1 / write PRD` — enough clarity exists for requirements or shaping.
- `Prototype` — behavior or UI needs something concrete to react to.
- `Technical spike` — feasibility is the central risk.
- `Park or kill` — the idea is weak, mis-scoped, or not worth the cost.
