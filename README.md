# taecontrol/skills

A deliberately small catalog of reusable agent skills maintained by Taecontrol.

The previous set was retired so each skill can be reintroduced only after it proves useful. The catalog contains two stable buckets:

- [`skills/productivity`](./skills/productivity/README.md) — general workflow skills: [`grilling`](./skills/productivity/grilling/SKILL.md), [`wait-what`](./skills/productivity/wait-what/SKILL.md), [`writing-for-agents`](./skills/productivity/writing-for-agents/SKILL.md), and [`unslop`](./skills/productivity/unslop/SKILL.md).
- [`skills/engineering`](./skills/engineering/README.md) — the engineering workflow skills, promoted from public beta: [`adr`](./skills/engineering/adr/SKILL.md), [`agents-md`](./skills/engineering/agents-md/SKILL.md), [`architect`](./skills/engineering/architect/SKILL.md), [`coding-standards`](./skills/engineering/coding-standards/SKILL.md), [`deliver`](./skills/engineering/deliver/SKILL.md), [`diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md), [`domain-language`](./skills/engineering/domain-language/SKILL.md), [`garden`](./skills/engineering/garden/SKILL.md), [`how`](./skills/engineering/how/SKILL.md), [`prototype`](./skills/engineering/prototype/SKILL.md), [`prune`](./skills/engineering/prune/SKILL.md), [`refine`](./skills/engineering/refine/SKILL.md), [`research`](./skills/engineering/research/SKILL.md), [`retro`](./skills/engineering/retro/SKILL.md), [`setup-verification`](./skills/engineering/setup-verification/SKILL.md), [`shape`](./skills/engineering/shape/SKILL.md), [`ship`](./skills/engineering/ship/SKILL.md), [`skill-guide`](./skills/engineering/skill-guide/SKILL.md), [`spike`](./skills/engineering/spike/SKILL.md), [`strategic-programming`](./skills/engineering/strategic-programming/SKILL.md), and [`why`](./skills/engineering/why/SKILL.md).

## Workflow

The delivery workflow, in [`skills/engineering`](./skills/engineering/README.md):

1. **[`shape`](./skills/engineering/shape/SKILL.md)**, with the human: agree on one spec that says what to build, what success means, and how to prove it. `prototype`, `spike`, `research`, and `architect` settle what it needs, [`program-design`](./skills/in-progress/program-design/SKILL.md) (beta) settles the shape of the code when the change warrants it, and the human accepts it on a [`walkthrough`](./skills/in-progress/walkthrough/SKILL.md) (beta) page.
2. **[`deliver`](./skills/engineering/deliver/SKILL.md)**, on its own: write the acceptance tests and watch them go red, make it work, then run **[`refine`](./skills/engineering/refine/SKILL.md)** (make it right, make it fast, with fresh eyes) and **[`ship`](./skills/engineering/ship/SKILL.md)** (a pull request with green checks). The human merges.
3. **[`garden`](./skills/engineering/garden/SKILL.md)**, alongside feature work: fix drift at its cause and turn repeated mistakes into checks. [`prune`](./skills/engineering/prune/SKILL.md) tends the tests, [`bug-hunt`](./skills/in-progress/bug-hunt/SKILL.md) (beta) finds the bugs nobody reported, and [`setup-verification`](./skills/engineering/setup-verification/SKILL.md) the project's ability to run and prove the real product.

Lessons from a run go into the project's environment first, as types, checks, scripts, and shared components, and into skills last.

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
2. Evaluate it through real use. Revise it from observed failures by sharpening or generalizing the rule that should have caught them; add a rule only when none covers the cause, and remove what the change makes redundant.
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

Each release and the reasons behind it are in [`CHANGELOG.md`](./CHANGELOG.md).

## Install

Once the catalog contains a skill, list or select individual skills with:

```bash
npx skills@latest add taecontrol/skills
```

## License

MIT. See [`LICENSE`](./LICENSE) and [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
