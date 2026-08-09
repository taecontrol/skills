# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Skills

- [`shape-goal`](./skills/shape-goal/SKILL.md) — Turns an ambiguous request or large initiative into one human-approved goal with observable proof, explicit boundaries, and freedom over implementation.
- [`strategic-programming`](./skills/strategic-programming/SKILL.md) — Implements non-trivial changes with deep modules, information hiding, honest concepts, and behavioral proof.
- [`implementation-review`](./skills/implementation-review/SKILL.md) — Independently judges a completed change against its accepted outcome and the `strategic-programming` standard.
- [`use-case-qa`](./skills/use-case-qa/SKILL.md) — Validates accepted user journeys through observable product seams.
- [`adr`](./skills/adr/SKILL.md) — Preserves durable architectural rationale in minimal decision records.

Deprecated:

- [`mission`](./skills/mission/SKILL.md) — Migrates an existing Mission cockpit into the goal-based workflow; it no longer manages new work.

Install the active set:

```bash
npx skills add taecontrol/skills --skill shape-goal --skill strategic-programming --skill implementation-review --skill use-case-qa --skill adr
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
  shape-goal/
    SKILL.md
    agents/
      openai.yaml
  mission/
    SKILL.md
    agents/
      openai.yaml
  strategic-programming/
    SKILL.md
  implementation-review/
    SKILL.md
  use-case-qa/
    SKILL.md
  adr/
    SKILL.md
    templates/
      adr.md
```

## Local validation

From this repository:

```bash
npx skills add . --list
```

## License

MIT
