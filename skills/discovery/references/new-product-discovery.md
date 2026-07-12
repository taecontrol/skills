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

Completion criterion: the raw input is preserved in the active Mission ticket or visible standalone map; when tracked standalone artifacts are justified, summarize it in `discovery/discovery-brief.md` under `Raw input / what we were told`.

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
- `decision` — evidence is sufficient to recommend a choice for human acceptance

Load `ticket-types.md` when choosing among all ticket types.

## Mode-specific checkpoint

Avoid writing requirements until the visible synthesis can describe the problem, user, outcome, constraints, and risks without fake certainty.

Propose one of these checkpoint outcomes; none authorizes downstream work:

- `Continue discovery` — key user/problem/outcome assumptions are still fog.
- `Prototype / technical spike` — behavior, UI, or feasibility needs concrete evidence.
- `Narrow or split mission` — the candidate intervention is not bounded.
- `Ready to shape` — enough clarity exists to propose separately authorized deliverables.
- `Park or kill` — the idea is weak, mis-scoped, or not worth the cost.
