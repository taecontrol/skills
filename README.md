# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Install

Install the Factory core:

```bash
npx skills add taecontrol/skills \
  --skill pursue-goal cleaner strategic-programming implementation-review use-case-qa verification-adapter grilling wait-what unslop research spike prototype diagnosing-bugs adr
```

Install every skill:

```bash
npx skills add taecontrol/skills
```

Add the progressively disclosed JavaScript and React pattern specialist to a Factory installation:

```bash
npx skills add taecontrol/skills --skill javascript-react-patterns
```

List available skills without installing:

```bash
npx skills add taecontrol/skills --list
```

Private repositories require authenticated Git access on the installing machine.

## Factory core

- [`pursue-goal`](./skills/pursue-goal/SKILL.md) — Coordinates mandatory collaborative design, isolated slice delivery, and goal validation.
- [`cleaner`](./skills/cleaner/SKILL.md) — Repairs and hardens accepted candidates before independent verification.
- [`strategic-programming`](./skills/strategic-programming/SKILL.md) — Applies deep design, invariants, and behavioral proof to non-trivial changes.
- [`implementation-review`](./skills/implementation-review/SKILL.md) — Independently verifies completed implementation.
- [`use-case-qa`](./skills/use-case-qa/SKILL.md) — Validates accepted journeys through observable product seams.
- [`verification-adapter`](./skills/verification-adapter/SKILL.md) — Creates or reconciles a project's local verification CLI and Feature Map for independent product validation.
- [`grilling`](./skills/grilling/SKILL.md) — Interviews and accepts a complete scoped decision frontier.
- [`wait-what`](./skills/wait-what/SKILL.md) — Re-explains a message without advancing the work.
- [`unslop`](./skills/unslop/SKILL.md) — Removes AI filler while preserving technical fidelity.
- [`research`](./skills/research/SKILL.md) — Investigates bounded questions against authoritative sources.
- [`spike`](./skills/spike/SKILL.md) — Runs bounded technical feasibility experiments.
- [`prototype`](./skills/prototype/SKILL.md) — Builds disposable product, state, interaction, or UI experiments.
- [`diagnosing-bugs`](./skills/diagnosing-bugs/SKILL.md) — Establishes a reproduction and supported root cause before repair.
- [`adr`](./skills/adr/SKILL.md) — Preserves consequential architectural rationale.

## Optional strategies and specialists

- [`tdd`](./skills/tdd/SKILL.md) — Provides an optional test-driven implementation strategy.
- [`writing-for-agents`](./skills/writing-for-agents/SKILL.md) — Authors portable skills, agent rules, profiles, and handoffs.
- [`agents-md`](./skills/agents-md/SKILL.md) — Interviews a human to create portable project instructions across coding harnesses.
- [`domain-modeling`](./skills/domain-modeling/SKILL.md) — Discovers terms and invariants and persists accepted meanings.
- [`architecture-design`](./skills/architecture-design/SKILL.md) — Develops alternatives for consequential architecture questions.
- [`wizard`](./skills/wizard/SKILL.md) — Guides authorized human-only operations without receiving secrets.
- [`developer-documentation-style`](./skills/developer-documentation-style/SKILL.md) — Writes direct developer documentation.
- [`ui-ux-design`](./skills/ui-ux-design/SKILL.md) — Designs and reviews task-first web, iOS, and Android interfaces.
- [`javascript-react-patterns`](./skills/javascript-react-patterns/SKILL.md) — Selects JavaScript and modern function-component React patterns through references loaded on demand.
- [`gh-stack`](./skills/gh-stack/SKILL.md) — Creates and manages stacked GitHub pull requests.

Each skill directory is independently installable and contains its own required references, templates, and scripts.

## License

MIT. See [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md) for third-party attributions.
