# taecontrol/skills

A deliberately small catalog of reusable agent skills maintained by Taecontrol.

The previous set was retired so each skill can be reintroduced only after it proves useful. The catalog contains two stable buckets:

- [`skills/productivity`](./skills/productivity/README.md) — general workflow skills: [`grilling`](./skills/productivity/grilling/SKILL.md), [`wait-what`](./skills/productivity/wait-what/SKILL.md), [`writing-for-agents`](./skills/productivity/writing-for-agents/SKILL.md), and [`unslop`](./skills/productivity/unslop/SKILL.md).
- [`skills/engineering`](./skills/engineering/README.md) — the engineering workflow skills, promoted from public beta: [`adr`](./skills/engineering/adr/SKILL.md), [`agents-md`](./skills/engineering/agents-md/SKILL.md), [`architect`](./skills/engineering/architect/SKILL.md), [`coding-standards`](./skills/engineering/coding-standards/SKILL.md), [`deliver`](./skills/engineering/deliver/SKILL.md), [`diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md), [`domain-language`](./skills/engineering/domain-language/SKILL.md), [`how`](./skills/engineering/how/SKILL.md), [`implementation-spec`](./skills/engineering/implementation-spec/SKILL.md), [`product-validation`](./skills/engineering/product-validation/SKILL.md), [`prototype`](./skills/engineering/prototype/SKILL.md), [`research`](./skills/engineering/research/SKILL.md), [`retro`](./skills/engineering/retro/SKILL.md), [`skill-guide`](./skills/engineering/skill-guide/SKILL.md), [`spike`](./skills/engineering/spike/SKILL.md), [`strategic-programming`](./skills/engineering/strategic-programming/SKILL.md), and [`why`](./skills/engineering/why/SKILL.md).

## Catalog

Skills are grouped by maturity and purpose, following the conventions used by [mattpocock/skills](https://github.com/mattpocock/skills):

- [`skills/engineering`](./skills/engineering/README.md) — stable skills used regularly for code work.
- [`skills/productivity`](./skills/productivity/README.md) — stable, general workflow skills.
- [`skills/in-progress`](./skills/in-progress/README.md) — public beta skills being evaluated before promotion.
- [`skills/misc`](./skills/misc/README.md) — useful but rarely used skills that are not promoted.
- [`skills/deprecated`](./skills/deprecated/README.md) — an intentionally empty retirement marker.

Within each stable bucket, its README separates user-invoked skills from model-invoked skills. Each skill remains independently installable and owns its references, scripts, templates, and agent metadata.

## Lifecycle

1. Add a new candidate under `skills/in-progress/<skill-name>/`.
2. Evaluate it through real use and revise it narrowly from observed failures.
3. Promote it to `skills/engineering/` or `skills/productivity/` when it is stable and regularly useful.
4. Put a low-use but still useful skill in `skills/misc/`.
5. Retire a skill by deleting it. Do not keep an alias or a stale `SKILL.md` in `deprecated/`; name its replacement, or state that none exists, in the commit or release notes. Git preserves the retired implementation.

Update this README and the destination bucket README whenever a skill is promoted, moved, renamed, or retired.

## Versioning

This repository uses Semantic Versioning through `package.json` and Git tags.

- `patch` — compatible fixes or instruction refinements.
- `minor` — a new skill or a meaningful compatible capability.
- `major` — removals, renames without aliases, or incompatible behavior changes.

Create a release with npm's built-in version command:

```bash
npm version patch  # or minor / major
git push --follow-tags
```

`npm version` updates `package.json` and `package-lock.json`, creates a version commit, and tags it.

### Version history

Newest first. "Beta" means the skill was added under `skills/in-progress`.

- `1.12.1`: `delivery-review` now repairs the findings you select through `deliver`'s full repair loop, including a fresh re-review. `deliver` saves its close report next to the specification. The test reviewer puts a time limit on each mutation.
- `1.12.0`: adds `delivery-review` (beta). `deliver` and `delivery-review` share one review contract, with a separate test reviewer that runs mutations. `feature-brief` and `implementation-spec` hand costly technical decisions to `architect`.
- `1.11.0`: promotes the engineering skills to stable and adds `feature-brief` (beta). `deliver` implements each slice with the full design context, then reviews, repairs, and validates the whole result on its own.
- `1.10.0`: adds `prototype` (beta).
- `1.9.0`: adds `spike` (beta).
- `1.8.0`: adds `adr` (beta).
- `1.7.1`: the accepted architecture brief is temporary by default; ADRs are only for rationale that must last.
- `1.7.0`: adds `domain-language` (beta).
- `1.6.0`: adds `architect` (beta).
- `1.5.0`: adds `why` (beta).
- `1.4.0`: adds `how` (beta).
- `1.3.0`: adds `research` (beta).
- `1.2.0`: adds `writing-for-agents` and `unslop`.
- `1.1.0`: adds `wait-what`, which re-explains in English or Spanish.
- `1.0.0`: adds `grilling`.

## Install

Once the catalog contains a skill, list or select individual skills with:

```bash
npx skills@latest add taecontrol/skills
```

## License

MIT. See [`LICENSE`](./LICENSE) and [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
