# taecontrol/skills

A deliberately small catalog of reusable agent skills maintained by Taecontrol.

The previous set was retired so each skill can be reintroduced only after it proves useful. The catalog contains two stable buckets:

- [`skills/productivity`](./skills/productivity/README.md) — general workflow skills: [`grilling`](./skills/productivity/grilling/SKILL.md), [`wait-what`](./skills/productivity/wait-what/SKILL.md), [`writing-for-agents`](./skills/productivity/writing-for-agents/SKILL.md), and [`unslop`](./skills/productivity/unslop/SKILL.md).
- [`skills/engineering`](./skills/engineering/README.md) — the engineering workflow skills, promoted from public beta: [`adr`](./skills/engineering/adr/SKILL.md), [`agents-md`](./skills/engineering/agents-md/SKILL.md), [`architect`](./skills/engineering/architect/SKILL.md), [`coding-standards`](./skills/engineering/coding-standards/SKILL.md), [`diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md), [`domain-language`](./skills/engineering/domain-language/SKILL.md), [`how`](./skills/engineering/how/SKILL.md), [`prototype`](./skills/engineering/prototype/SKILL.md), [`research`](./skills/engineering/research/SKILL.md), [`retro`](./skills/engineering/retro/SKILL.md), [`skill-guide`](./skills/engineering/skill-guide/SKILL.md), [`spike`](./skills/engineering/spike/SKILL.md), [`strategic-programming`](./skills/engineering/strategic-programming/SKILL.md), and [`why`](./skills/engineering/why/SKILL.md).

## Workflow

The delivery workflow lives in [`skills/in-progress`](./skills/in-progress/README.md) while it proves itself:

1. **[`shape`](./skills/in-progress/shape/SKILL.md)**, with the human: agree on one spec that says what to build, what success means, and how to prove it. `prototype`, `spike`, `research`, and `architect` settle what it needs.
2. **[`deliver`](./skills/in-progress/deliver/SKILL.md)**, on its own: write the acceptance tests and watch them go red, make it work, then run **[`refine`](./skills/in-progress/refine/SKILL.md)** (make it right, make it fast, with fresh eyes) and **[`ship`](./skills/in-progress/ship/SKILL.md)** (a pull request with green checks). The human merges.
3. **[`garden`](./skills/in-progress/garden/SKILL.md)**, alongside feature work: fix drift at its cause and turn repeated mistakes into checks. [`prune`](./skills/in-progress/prune/SKILL.md) tends the tests, and [`setup-verification`](./skills/in-progress/setup-verification/SKILL.md) the project's ability to run and prove the real product.

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

### Version history

Newest first. "Beta" means the skill was added under `skills/in-progress`.

- `2.0.0`: replaces the delivery chain with a shorter workflow built on executable success criteria. `shape` (beta) turns a problem into one accepted spec whose examples define success and name the boundary where they are tested; it replaces `feature-brief` and `implementation-spec`, so no second document restates the first. `deliver` (beta, rewritten) writes the acceptance tests first, watches them go red, makes them pass, and hands off to `refine` (beta), a fresh review that makes the change right and fast in at most three rounds, and `ship` (beta), which opens the pull request and drives its checks to green. `delivery-review` is replaced by `refine`. `product-validation` is replaced by acceptance tests and the project's own verification method, which `setup-verification` (beta) establishes. `garden` (beta) fixes drift by cause between features. `retro` now prefers fixes in the project's environment over changes to skills. The delivery chain shrinks from about 11,000 words to about 2,300.
- `1.13.1`: generalizes instead of adding. `deliver` and `implementation-spec` share one bar for evidence: it must fail under the credible regression it guards against, which replaces the separate fixture rules. A green mutation counts as unreachable only after recorded attempts. A narrowing of an accepted input is a cut in any section of the specification. Rules copied from the skill that owns them now point to it: `strategic-programming`, which also takes state-space enumeration; `product-validation`; `feature-brief`; and `architect`'s references. Duplicated statements are merged in `diagnosing-bugs`, `product-validation`, `coding-standards`, `research`, `skill-guide`, `spike`, and `prototype`. The lifecycle, `retro`, and `delivery-review`'s escape summary now prefer generalizing an existing rule over adding one. The catalog is about 700 words shorter.
- `1.13.0`: adds `prune` (beta), a user-invoked pass that retires the tests and checks in one area that no longer earn their cost, removes the test-only production code they keep alive, and proves by mutation that every contract keeps a test that goes red. `strategic-programming` gains a shared test value reference: four questions before adding a test, junk patterns, and a retention bar. `deliver`'s test reviewer applies it.
- `1.12.3`: `deliver` loads `strategic-programming`, enumerates the state space of seams with interacting state before implementing them, and counts a pre-existing instance of a repaired mechanism as grounds for a check, including a shared component with a lint restriction. The test reviewer removes its checkout by path, never with `git worktree prune`. `research` reports stand alone without citing drafts. `feature-brief` records where each budget baseline was measured, and `implementation-spec` re-measures it at its own revision. `feature-brief` replaces the dated decision point with a pre-release threshold or a real-use trigger, and records the project's review policy in its measurement profile. It settles what evidence can settle before asking, including related issues, research, and solution options. Representative conditions now include the real target, and acceptance is re-asked when validation changes the direction.
- `1.12.2`: `deliver`'s close report names who accepted each residual risk. `delivery-review` still judges risk the delivery accepted on its own instead of treating it as known. The operability lens also checks gates that depend on a local build of a system tool or browser that differs from CI's.
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
