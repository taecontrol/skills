# Mission 001: Codify the Mission Workflow as Skills

Status: **Open — collaborative discovery**  
Mission Control: **Luis**  
Co-navigator: **Kratos**  
Implementation authorized: **No**

## Raw input

The manual pilots are too unconstrained and have drifted into an automatic contract-production flow. Mission work should happen between Luis and Kratos. Deliverables should also be proposed, selected, and produced through tickets. The objective is not to move quickly; it is to do the work well.

## Destination

Create a small, portable set of agent skills that makes mission work predictable without automating Mission Control out of the process.

The skills should be used in real missions immediately and improved from observed friction, omissions, and failure modes.

## Success signals

- Luis can always see the mission state, current frontier, active ticket, and next decision.
- Scope, appetite, risk acceptance, and material product decisions remain with Luis.
- No agent silently moves from a scope answer to a complete Spec, Design, Plan, review, and freeze.
- Every substantial deliverable is first represented by an agreed ticket with purpose, owner/mode, dependencies, completion evidence, and review gate.
- Discovery tickets and deliverable tickets are distinguishable but live in one mission map.
- Skills are portable, installable, concise, and tested in at least one real mission before being treated as stable.

## Non-negotiable working agreements

1. Mission is a collaboration between Luis and Kratos, not an autonomous agent pipeline.
2. The map stays visible: destination, known territory, fog, frontier, decisions, tickets, and gates.
3. Work proceeds through one active material ticket at a time.
4. Agents may investigate and draft, but may not approve scope, appetite, risk, freeze, acceptance, or mission closure.
5. Creating downstream deliverables requires an agreed ticket; their existence is not implied by a template.
6. Quality and shared understanding take precedence over throughput.
7. The skills evolve through use; they are not declared final after the first draft.

## Initial scope

- Define skill boundaries and invocation behavior.
- Define a unified mission ticket model.
- Create the minimum useful portable package in the shared `taecontrol/skills` repository; product repositories such as Flaurence are testbeds and consumers, not the canonical skill source.
- Add only the references/templates required for the first live test.
- Validate packaging and exercise the skills on a real mission.

## Out of scope for the first version

- A fully autonomous software factory.
- Automatic progression through gates.
- One skill per document merely because the canonical model names five artifacts.
- GitHub Issues as a mandatory backend; repository Markdown must work first.
- Encoding every mission type or every possible lifecycle.
- Declaring the workflow finished before live use.

## Current gate

**Mission Ready.** The intent and working agreements are clear enough to investigate one material design question: skill boundaries and automation stops.

## Repository ownership correction

Mission Control clarified that reusable skills belong in the shared `taecontrol/skills` repository so multiple projects can install them. Flaurence remains the pilot/test project and may later consume a released version; it is not the canonical skill source.
