# taecontrol/skills

A deliberately small catalog of reusable agent skills maintained by Taecontrol.

The previous set was retired so each skill can be reintroduced only after it proves useful. The catalog contains two stable buckets:

- [`skills/productivity`](./skills/productivity/README.md) — general workflow skills: [`grilling`](./skills/productivity/grilling/SKILL.md), [`wait-what`](./skills/productivity/wait-what/SKILL.md), [`writing-for-agents`](./skills/productivity/writing-for-agents/SKILL.md), and [`unslop`](./skills/productivity/unslop/SKILL.md).
- [`skills/engineering`](./skills/engineering/README.md) — the engineering workflow skills, promoted from public beta: [`adr`](./skills/engineering/adr/SKILL.md), [`agents-md`](./skills/engineering/agents-md/SKILL.md), [`architect`](./skills/engineering/architect/SKILL.md), [`coding-standards`](./skills/engineering/coding-standards/SKILL.md), [`deliver`](./skills/engineering/deliver/SKILL.md), [`diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md), [`domain-language`](./skills/engineering/domain-language/SKILL.md), [`garden`](./skills/engineering/garden/SKILL.md), [`how`](./skills/engineering/how/SKILL.md), [`prototype`](./skills/engineering/prototype/SKILL.md), [`prune`](./skills/engineering/prune/SKILL.md), [`refine`](./skills/engineering/refine/SKILL.md), [`research`](./skills/engineering/research/SKILL.md), [`retro`](./skills/engineering/retro/SKILL.md), [`setup-verification`](./skills/engineering/setup-verification/SKILL.md), [`shape`](./skills/engineering/shape/SKILL.md), [`ship`](./skills/engineering/ship/SKILL.md), [`skill-guide`](./skills/engineering/skill-guide/SKILL.md), [`spike`](./skills/engineering/spike/SKILL.md), [`strategic-programming`](./skills/engineering/strategic-programming/SKILL.md), and [`why`](./skills/engineering/why/SKILL.md).

## Workflow

The delivery workflow, in [`skills/engineering`](./skills/engineering/README.md):

1. **[`shape`](./skills/engineering/shape/SKILL.md)**, with the human: agree on one spec that says what to build, what success means, and how to prove it. `prototype`, `spike`, `research`, and `architect` settle what it needs.
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

### Version history

Newest first. "Beta" means the skill was added under `skills/in-progress`.

- `2.1.2`: a shape deferred a fact it could observe. `architect` presented a design with "verify the platform's constraint errors at implementation", and `shape` carried it into the spec as a known risk that would send the work back to design if it failed. A spike run only after the owner asked for it changed the accepted design: two constraints instead of one, and a new rule for detecting retries. `architect` now spikes every platform behavior its package relies on before presenting it, and keeps as open risks only what no observation within the bound can settle and no answer would reopen. `shape` is done only when every fact the spec depends on is observed: a risk whose failure would reopen design is an open question, and a spike settles it. A rabbit hole that could reopen a decision is an open question too.
- `2.1.1`: `bug-hunt` (beta) follows the evidence of its first run. Invoked without an area, it hunts the whole project in lanes along owner boundaries instead of picking one area, which had confirmed nothing where the whole project held eight bugs. It fixes every easy cause unless the user sets a limit, instead of at most three, so easy bugs no longer become issues. Every fix lands in one draft pull request with each cause in its own commits, as in `garden`, and the full gates run once on that branch. An unclaimed open issue for an easy cause is fixed and closed by the pull request instead of left alone.
- `2.1.0`: promotes the delivery workflow to stable: `shape`, `deliver`, `refine`, `ship`, `garden`, `prune`, and `setup-verification` move from `skills/in-progress` to `skills/engineering`. Adds `bug-hunt` (beta), a user-invoked hunt for bugs nobody has reported. It reads one area as a skeptic, keeps only the bugs a reproduction turns red, and groups them by cause. Each easy cause, local to one owner, settled by the code's own contract, and free of one-way doors, becomes a draft pull request with its regression test committed before the fix; the rest become issues an agent could pick up, or comments on the issues and pull requests that already cover them. It runs to the end without asking, so it can run from a scheduled task. `garden` and `prune`, which mostly run that way too, now finish on their own as well. `garden` picks the causes worth their cost instead of waiting for the human, fixes them in one pull request with each cause in its own commits, runs `prune` on its own worktree when the tests lens leads or the user asks and brings its commits onto the branch, and files every other cause after checking for an existing issue, marking apparent defects as suspected bugs for `bug-hunt`. `prune` can now be invoked by other skills, ships its own pull request when run alone, and hands its commits to the calling skill otherwise. Issues and pull requests from `garden` and `bug-hunt` carry their skill's label, so the next run can prefer an area the last ones did not cover.
- `2.0.4`: closes the gap where costly-to-reverse decisions went unowned. `shape` now settles every **one-way door** the change would make: persisted data or its schema, a contract that writes, a security boundary, or a seam an accepted ADR governs. It sizes each for the open issues that will share it and runs `architect` on each, whose gate, not the agent's own sense of reversibility, decides when no design is needed. Its state space for a write covers a lost response and its retry, every order of concurrent writers, and the data, queued work, and previous version that exist when the change lands; its real target is always isolated from the owner's own data, credentials, and session. `deliver` stops on a one-way door the spec does not settle instead of deciding it. `architect` is invoked when shaping or delivering meets a one-way door, checks a retry that meets a different outcome than the first attempt, and keeps a brief that constrains later issues where they can reach it. `adr` writes new records as `Accepted`, since merging is acceptance. `prototype` stops what it started, and `ship` files a failure that also happens on the base so the next delivery inherits the diagnosis.
- `2.0.3`: sharpens rules a week of deliveries showed were too loose. `deliver` puts any question or stop, including `refine`'s blockers, so the human can answer without opening the spec: the behavior in plain words, the options, and a recommendation. `shape` sets a budget that can only be a time from its measured spread on the real target, with explicit margin, and its test boundary uses data shaped like the real data, including its extremes. In `refine`, missing or flawed evidence is a fix, not a blocker, unless it hides a defect. `prototype`'s judge moves between states as a user would and checks transitions for layout shift, and its link to `shape` no longer breaks when skills are installed side by side.
- `2.0.2`: a `writing-for-agents` pass over the delivery workflow. `shape` settles every decision the examples depend on in one step that ends when `grilling`'s frontier is empty: a question whose options differ in what someone sees or does is a UI question, even when it also changes a rule or an API, and the human answers it while looking at a `prototype` of the options; the remaining decisions go to the human in `grilling` rounds instead of one at a time. The example mark `evidence` becomes `capture`, and the state table becomes the state space, matching `strategic-programming`. The structural-fix order for a shared cause moves into `strategic-programming`, which `refine` and `garden` now point to. `refine`'s mutation protocol moves to `refine/references/mutations.md`, its round limit lives in one section, and its test value pointer no longer breaks when skills are installed side by side. `ship` names CI checks explicitly. Descriptions of `deliver`, `ship`, `garden`, and `shape` drop what their bodies already say, and duplicated rules leave `shape` and `prune`.
- `2.0.1`: `prototype` ships every UI candidate with a scenario selector. It sits outside the product UI, loads any scenario the brief names, resets the current one, and keeps it in the URL so reload and sharing land on it. The judge drives every scenario through it, and each candidate is presented with one link that opens it live.
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
