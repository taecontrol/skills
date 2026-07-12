# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Skills

- [`mission`](./skills/mission/SKILL.md) — Human-controlled lifecycle for navigating one bounded intervention through a visible map and one active material frontier ticket.
- [`discovery`](./skills/discovery/SKILL.md) — Evidence-first executor for one sharp uncertainty, either as an approved Mission ticket or a standalone collaborative exploration.

Install the collaborative pair:

```bash
npx skills add taecontrol/skills --skill mission --skill discovery
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
```

Each `SKILL.md` stays focused on routing and process; branch-specific rules and copyable artifacts use progressive disclosure through `references/` and `templates/`.

## Local validation

From this repository:

```bash
npx skills add . --list
```

## License

MIT
