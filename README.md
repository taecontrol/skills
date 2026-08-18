# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Skills

- [`pursue-goal`](./skills/pursue-goal/SKILL.md) — Defines goals collaboratively, keeps a living checkpoint plan, and gates one-checkpoint sessions on accepted requirements, boundaries, design, architecture, and validation.
- [`strategic-programming`](./skills/strategic-programming/SKILL.md) — Implements non-trivial changes with deep modules, information hiding, honest concepts, and behavioral proof.
- [`implementation-review`](./skills/implementation-review/SKILL.md) — Independently judges a completed change against its accepted outcome and the `strategic-programming` standard.
- [`use-case-qa`](./skills/use-case-qa/SKILL.md) — Validates accepted user journeys through observable product seams.
- [`adr`](./skills/adr/SKILL.md) — Preserves durable architectural rationale in minimal decision records.
- [`developer-documentation-style`](./skills/developer-documentation-style/SKILL.md) — Writes clear, direct developer documentation without chatbot prose.
- [`ui-ux-design`](./skills/ui-ux-design/SKILL.md) — Designs and reviews task-first web, iOS, and Android interfaces with platform-native behavior, visual craft, accessibility, and rendered evidence.
- [`gh-stack`](./skills/gh-stack/SKILL.md) — Creates and manages stacked GitHub pull requests with agent-safe `gh stack` workflows.

Install the active set:

```bash
npx skills add taecontrol/skills --skill pursue-goal --skill strategic-programming --skill implementation-review --skill use-case-qa --skill adr --skill developer-documentation-style --skill ui-ux-design --skill gh-stack
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
  pursue-goal/
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
  developer-documentation-style/
    SKILL.md
  ui-ux-design/
    SKILL.md
    references/
      interaction-foundations.md
      visual-craft.md
      web.md
      ios.md
      android.md
      verification.md
      sources.md
    templates/
      design-brief.md
  gh-stack/
    SKILL.md
    references/
      stack-design.md
      commands.md
      troubleshooting.md
```

## Local validation

From this repository:

```bash
npx skills add . --list
```

## License

MIT
