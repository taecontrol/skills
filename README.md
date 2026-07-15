# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Skills

- [`mission`](./skills/mission/SKILL.md) — Human-controlled lifecycle with a visible map, provisional route, one active typed frontier, and concise activation/checkpoint/Review briefings.
- [`discovery`](./skills/discovery/SKILL.md) — Evidence-first executor for one typed discovery work package, either as an approved Mission ticket or a standalone collaborative exploration.
- [`strategic-implementation`](./skills/strategic-implementation/SKILL.md) — Executes approved implementation tickets with strategic programming, APoSD refactor evidence, direct invariant representation, and Mission-compatible Review returns.
- [`implementation-review`](./skills/implementation-review/SKILL.md) — Independently validates implementation against both the accepted contract and APoSD design quality: honest interfaces, hidden policy, deep modules, boundary validation, and semantic tests.

Install the software-factory set:

```bash
npx skills add taecontrol/skills --skill mission --skill discovery --skill strategic-implementation --skill implementation-review
```

## Install with skills.sh / npx skills

Install all skills from this repository:

```bash
npx skills add taecontrol/skills
```

Install only the discovery skill:

```bash
npx skills add taecontrol/skills --skill discovery
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
      ticket-protocol.md
    templates/
      exploration-map.md
      mission-brief.md
      ticket.md
  discovery/
    SKILL.md
    references/
      existing-product-discovery.md
      new-product-discovery.md
      ticket-types.md
    templates/
      current-state-map.md
      discovery-brief.md
      discovery-ticket.md
      evidence-log.md
      exploration-map.md
      next-version-brief.md
  strategic-implementation/
    SKILL.md
  implementation-review/
    SKILL.md
```

Each `SKILL.md` stays focused on routing and process; branch-specific rules and copyable artifacts use progressive disclosure through `references/` and `templates/`.

## Local validation

From this repository:

```bash
npx skills add . --list
```

## License

MIT
