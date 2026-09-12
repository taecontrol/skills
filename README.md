# taecontrol/skills

A deliberately small catalog of reusable agent skills maintained by Taecontrol.

The previous set was retired so each skill can be reintroduced only after it proves useful. The catalog currently contains four stable skills:

- [`grilling`](./skills/productivity/grilling/SKILL.md) — Stress-tests a plan, decision, or idea through complete rounds of independent questions.
- [`wait-what`](./skills/productivity/wait-what/SKILL.md) — Re-pitches an explanation that did not land, in English or Spanish.
- [`writing-for-agents`](./skills/productivity/writing-for-agents/SKILL.md) — Designs reliable instructions and documentation for agents.
- [`unslop`](./skills/productivity/unslop/SKILL.md) — Removes AI writing patterns from prose while preserving its meaning and tone.

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

`npm version` updates `package.json` and `package-lock.json`, creates a version commit, and tags it. Version `1.0.0` introduced `grilling`; version `1.1.0` added `wait-what` with English and Spanish recovery; version `1.2.0` added `writing-for-agents` and `unslop`; version `1.3.0` added the first public beta of `research`; version `1.4.0` added the first public beta of `how`; version `1.5.0` adds the first public beta of `why`.

## Install

Once the catalog contains a skill, list or select individual skills with:

```bash
npx skills@latest add taecontrol/skills
```

## License

MIT. See [`LICENSE`](./LICENSE) and [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
