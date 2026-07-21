# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Skills

- [`mission`](./skills/mission/SKILL.md) — Human-controlled lifecycle with a visible map, provisional route, one active typed frontier, and concise activation/checkpoint/Review briefings.
- [`strategic-implementation`](./skills/strategic-implementation/SKILL.md) — Executes approved implementation tickets with strategic programming, APoSD refactor evidence, direct invariant representation, and a fresh-reviewer handoff.
- [`implementation-review`](./skills/implementation-review/SKILL.md) — Independently checks an implementation candidate against its accepted design, contract, tests, and APoSD quality inside the same Execution ticket.
- [`use-case-qa`](./skills/use-case-qa/SKILL.md) — Validates accepted use cases in a separate Mission Validation ticket through the simulator, browser, API, CLI, staging, or assisted method available in each project.
- [`adr`](./skills/adr/SKILL.md) — Qualifies, investigates, creates, and edits minimal Architecture Decision Records centered on durable rationale rather than implementation detail.
- [`agent-routing`](./skills/agent-routing/SKILL.md) — Selects direct execution or the lowest expected-cost allowed model/effort/runtime profile likely to produce a verified accepted result.

Install the software-factory set:

```bash
npx skills add taecontrol/skills --skill mission --skill strategic-implementation --skill implementation-review --skill use-case-qa --skill adr --skill agent-routing
```

## Install with skills.sh / npx skills

Install all skills from this repository:

```bash
npx skills add taecontrol/skills
```

List available skills without installing:

```bash
npx skills add taecontrol/skills --list
```

> Note: the skills.sh website indexes public GitHub repositories. The `npx skills` CLI can install from local paths and git URLs, but private GitHub repository installs may require authenticated git access from the machine running the command.

## Repository layout

```text
skills/
  mission/
    SKILL.md
    references/
      lean-mission-interface.md
      ticket-protocol.md
    templates/
      exploration-map.md
      mission-brief.md
      ticket.md
  strategic-implementation/
    SKILL.md
  implementation-review/
    SKILL.md
  use-case-qa/
    SKILL.md
  adr/
    SKILL.md
    templates/
      adr.md
  agent-routing/
    SKILL.md
    references/
      model-evidence.md
    templates/
      routing-policy.yaml
```

Each `SKILL.md` stays focused on routing and process; branch-specific rules and copyable artifacts use progressive disclosure through `references/` and `templates/`.

## Local validation

From this repository:

```bash
npx skills add . --list
```

## License

MIT
