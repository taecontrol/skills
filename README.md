# taecontrol/skills

Reusable agent skills maintained by Taecontrol.

## Software Factory design

- [`Software Factory v0.1`](./docs/software-factory-v0.1.md) — Harness-agnostic roles, adaptive discovery, vertical-slice delivery, quality gates, and evidence rules.
- [`Adaptive Factory flow`](./docs/software-factory-flow.html) — Visual map of Coordinator-directed discovery and delivery loops.
- [`Factory skill library`](./docs/software-factory-v0.1-skill-library.md) — Canonical capabilities, upstream provenance, adaptation boundaries, and implementation waves.
- [`Factory v0.1 skill migration`](./docs/software-factory-v0.1-skill-migration.md) — Gap analysis and migration order for the current skills.

## Skills

This branch contains the complete Factory v0.1 role and capability set. Copied installs and focused Coordinator-routing scenarios pass; treat it as pilot-ready, not production-proven.

### Factory coordination and production

- [`pursue-goal`](./skills/pursue-goal/SKILL.md) — Coordinates adaptive discovery and verified vertical-slice delivery.
- [`cleaner`](./skills/cleaner/SKILL.md) — Repairs and hardens accepted candidates before independent verification.
- [`strategic-programming`](./skills/strategic-programming/SKILL.md) — Applies deep design, invariants, and behavioral proof to non-trivial changes.
- [`implementation-review`](./skills/implementation-review/SKILL.md) — Implements the independent read-only Verifier role.
- [`use-case-qa`](./skills/use-case-qa/SKILL.md) — Implements the independent Product Validator role.
- [`tdd`](./skills/tdd/SKILL.md) — Provides an optional, empirically evaluated test-driven implementation strategy.

### Communication and discovery

- [`grilling`](./skills/grilling/SKILL.md) — Interviews the complete current decision frontier in numbered rounds.
- [`wait-what`](./skills/wait-what/SKILL.md) — Re-explains a message naturally in Spanish or English without advancing the work.
- [`unslop`](./skills/unslop/SKILL.md) — Removes AI filler from human-facing prose while preserving technical fidelity.
- [`writing-for-agents`](./skills/writing-for-agents/SKILL.md) — Authors portable skills, agent rules, profiles, and handoff contracts.
- [`research`](./skills/research/SKILL.md) — Investigates bounded questions against authoritative sources.
- [`spike`](./skills/spike/SKILL.md) — Runs bounded technical feasibility experiments with real execution evidence.
- [`prototype`](./skills/prototype/SKILL.md) — Builds disposable product, state, interaction, or UI experiments.
- [`diagnosing-bugs`](./skills/diagnosing-bugs/SKILL.md) — Produces a red loop, minimal reproduction, and supported root-cause evidence before repair.
- [`domain-modeling`](./skills/domain-modeling/SKILL.md) — Discovers terms and invariants and persists only accepted meanings.
- [`codebase-design`](./skills/codebase-design/SKILL.md) — Supplies the shared deep-module and seam vocabulary.
- [`architecture-design`](./skills/architecture-design/SKILL.md) — Develops alternatives for consequential architecture questions and returns the decision frontier.
- [`improve-codebase-architecture`](./skills/improve-codebase-architecture/SKILL.md) — Scans a bounded area for evidenced deepening opportunities.

### Operations and supporting skills

- [`wizard`](./skills/wizard/SKILL.md) — Guides authorized human-only operations without receiving secrets.
- [`adr`](./skills/adr/SKILL.md) — Preserves durable architectural rationale in minimal decision records.
- [`developer-documentation-style`](./skills/developer-documentation-style/SKILL.md) — Writes direct developer documentation without chatbot prose.
- [`ui-ux-design`](./skills/ui-ux-design/SKILL.md) — Designs and reviews task-first web, iOS, and Android interfaces.
- [`gh-stack`](./skills/gh-stack/SKILL.md) — Creates and manages stacked GitHub pull requests.

Install the pilot Factory set:

```bash
npx skills add taecontrol/skills \
  --skill pursue-goal cleaner strategic-programming implementation-review use-case-qa tdd grilling wait-what unslop writing-for-agents research spike prototype diagnosing-bugs domain-modeling codebase-design architecture-design improve-codebase-architecture wizard adr developer-documentation-style ui-ux-design gh-stack
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
  <skill-name>/
    SKILL.md
    references/   # optional branch-specific guidance
    templates/    # optional copyable artifacts
    scripts/      # optional deterministic helpers
    agents/       # optional runtime adapter metadata

docs/
  software-factory-v0.1.md
  software-factory-v0.1-skill-library.md
  software-factory-v0.1-skill-migration.md
  software-factory-flow.html
```

Each skill directory is independently installable. Required links and support files stay inside that directory.

## License

MIT

Third-party notices: [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
