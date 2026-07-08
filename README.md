# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Skills

- [`discovery`](./skills/discovery/SKILL.md) — Manual-first workflow for turning vague software product ideas or poorly understood MVPs/codebases into Discovery Briefs through fog-of-war exploration.

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
  discovery/
    SKILL.md
```

Each skill is a folder containing a `SKILL.md` file with YAML frontmatter and Markdown instructions.

## Local validation

From this repository:

```bash
npx skills add . --list
```

## License

MIT
