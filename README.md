# taecontrol/skills

A small catalog of reusable agent skills maintained by Taecontrol. New skills start in beta and become stable after regular use.

## Workflow

The delivery workflow lives in [`skills/engineering`](./skills/engineering/README.md):

1. **[`shape`](./skills/engineering/shape/SKILL.md)**, with the human: agree on one spec that says what to build, what success means, and how to prove it. The human accepts it on a [`walkthrough`](./skills/engineering/walkthrough/SKILL.md) page.
2. **[`deliver`](./skills/engineering/deliver/SKILL.md)**, on its own: write the acceptance tests and watch them fail, make them pass, then run [`refine`](./skills/engineering/refine/SKILL.md) and [`ship`](./skills/engineering/ship/SKILL.md). The result is a draft pull request with green checks. The human marks it ready for review and merges.
3. **[`garden`](./skills/engineering/garden/SKILL.md)**, between features: fix drift at its cause. [`prune`](./skills/engineering/prune/SKILL.md) tends the tests, and [`bug-hunt`](./skills/engineering/bug-hunt/SKILL.md) finds bugs nobody reported.

[`adapt`](./skills/in-progress/adapt/SKILL.md) (beta) is an alternative to `shape` and `deliver` that designs a process for each task.

When a run goes wrong, fix the project first, with types, checks, scripts, or shared components, and change a skill last.

## Catalog

Skills are grouped by maturity and purpose:

- [`skills/engineering`](./skills/engineering/README.md) — stable skills used regularly for code work.
- [`skills/productivity`](./skills/productivity/README.md) — stable, general workflow skills.
- [`skills/in-progress`](./skills/in-progress/README.md) — public beta skills being evaluated before promotion.
- [`skills/misc`](./skills/misc/README.md) — useful but rarely used skills that are not promoted.
- [`skills/deprecated`](./skills/deprecated/README.md) — an intentionally empty retirement marker.

Each bucket's README separates skills you invoke by name from skills the agent loads when a task calls for them. Each skill installs on its own.

## Lifecycle

1. Add a new candidate under `skills/in-progress/<skill-name>/`.
2. Evaluate it through real use, and revise it from observed failures as [`AGENTS.md`](./AGENTS.md) says.
3. Promote it to `skills/engineering/` or `skills/productivity/` when it is stable and regularly useful.
4. Put a low-use but still useful skill in `skills/misc/`.
5. Retire a skill by deleting it. Do not keep an alias or a stale `SKILL.md` in `deprecated/`; name its replacement, or state that none exists, in the commit or release notes. Git preserves the retired implementation.

Update the destination bucket's README whenever a skill is promoted, moved, renamed, or retired.

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

What changed in each release is in [`CHANGELOG.md`](./CHANGELOG.md).

## Install

List or select individual skills with:

```bash
npx skills@latest add taecontrol/skills
```

## License

MIT. See [`LICENSE`](./LICENSE) and [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
