# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Install

Install the recommended set:

```bash
npx skills add taecontrol/skills \
  --skill pursue-goal cleaner strategic-programming implementation-review use-case-qa tdd grilling wait-what unslop writing-for-agents research spike prototype diagnosing-bugs domain-modeling codebase-design architecture-design improve-codebase-architecture wizard adr developer-documentation-style ui-ux-design gh-stack
```

Install every skill:

```bash
npx skills add taecontrol/skills
```

List available skills without installing:

```bash
npx skills add taecontrol/skills --list
```

Private repositories require authenticated Git access on the installing machine.

## Skills

- [`pursue-goal`](./skills/pursue-goal/SKILL.md) — Coordinates adaptive discovery and verified vertical-slice delivery.
- [`cleaner`](./skills/cleaner/SKILL.md) — Repairs and hardens accepted candidates before independent verification.
- [`strategic-programming`](./skills/strategic-programming/SKILL.md) — Applies deep design, invariants, and behavioral proof to non-trivial changes.
- [`implementation-review`](./skills/implementation-review/SKILL.md) — Independently verifies completed implementation.
- [`use-case-qa`](./skills/use-case-qa/SKILL.md) — Validates accepted journeys through observable product seams.
- [`tdd`](./skills/tdd/SKILL.md) — Provides an optional test-driven implementation strategy.
- [`grilling`](./skills/grilling/SKILL.md) — Interviews the complete current decision frontier.
- [`wait-what`](./skills/wait-what/SKILL.md) — Re-explains a message without advancing the work.
- [`unslop`](./skills/unslop/SKILL.md) — Removes AI filler while preserving technical fidelity.
- [`writing-for-agents`](./skills/writing-for-agents/SKILL.md) — Authors portable skills, agent rules, profiles, and handoffs.
- [`research`](./skills/research/SKILL.md) — Investigates bounded questions against authoritative sources.
- [`spike`](./skills/spike/SKILL.md) — Runs bounded technical feasibility experiments.
- [`prototype`](./skills/prototype/SKILL.md) — Builds disposable product, state, interaction, or UI experiments.
- [`diagnosing-bugs`](./skills/diagnosing-bugs/SKILL.md) — Establishes a reproduction and supported root cause before repair.
- [`domain-modeling`](./skills/domain-modeling/SKILL.md) — Discovers terms and invariants and persists accepted meanings.
- [`codebase-design`](./skills/codebase-design/SKILL.md) — Supplies deep-module and seam design vocabulary.
- [`architecture-design`](./skills/architecture-design/SKILL.md) — Develops alternatives for consequential architecture questions.
- [`improve-codebase-architecture`](./skills/improve-codebase-architecture/SKILL.md) — Finds evidenced opportunities to deepen a bounded area.
- [`wizard`](./skills/wizard/SKILL.md) — Guides authorized human-only operations without receiving secrets.
- [`adr`](./skills/adr/SKILL.md) — Preserves consequential architectural rationale.
- [`developer-documentation-style`](./skills/developer-documentation-style/SKILL.md) — Writes direct developer documentation.
- [`ui-ux-design`](./skills/ui-ux-design/SKILL.md) — Designs and reviews task-first web, iOS, and Android interfaces.
- [`gh-stack`](./skills/gh-stack/SKILL.md) — Creates and manages stacked GitHub pull requests.

Each skill directory is independently installable and contains its own required references, templates, and scripts.

## License

MIT. See [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md) for third-party attributions.
