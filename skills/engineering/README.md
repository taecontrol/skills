# Engineering

Stable skills used regularly for code work.

## User-invoked

- **[`bug-hunt`](./bug-hunt/SKILL.md)** — Hunt the project, or the area named, for bugs nobody has reported, keep only those a reproduction turns red, fix the easy ones in one draft pull request, and file the rest as issues an agent could pick up. Runs to the end on its own, so it suits a scheduled task.
- **[`retro`](./retro/SKILL.md)** — Preserve evidence-backed lessons from agent runs, preferring fixes in the project's environment, without changing the workflow.

## Model-invoked

- **[`adr`](./adr/SKILL.md)** — Preserve the rationale of consequential architecture decisions without duplicating implementation design.
- **[`agents-md`](./agents-md/SKILL.md)** — Maintain a project's durable intent and proven operational guidance for coding agents.
- **[`architect`](./architect/SKILL.md)** — Settle one-way doors, such as schemas, contracts that write, and security boundaries, through grounded alternatives and human agreement.
- **[`coding-standards`](./coding-standards/SKILL.md)** — Maintain accepted project-specific rules that require judgment during code review.
- **[`deliver`](./deliver/SKILL.md)** — Take an accepted spec to a pull request with green checks: acceptance tests first, make it work, then `refine` and `ship`.
- **[`diagnosing-bugs`](./diagnosing-bugs/SKILL.md)** — Establish root causes from faithful reproductions or distinguishing runtime evidence.
- **[`garden`](./garden/SKILL.md)** — Between features, find drift in architecture, consistency, or performance, or every answer to a question you ask of the code, group it by cause, fix the causes worth their cost in one behavior-preserving pull request, and file the rest. Runs to the end on its own.
- **[`program-design`](./program-design/SKILL.md)** — Agree the shape of the code inside the components before agents write it: where each thing lives, the key types and signatures, the important call paths, what each module hides, and how errors travel. `shape` runs it when a change creates modules or types or spans several.
- **[`prototype`](./prototype/SKILL.md)** — Compare production-representative UI directions, or drive a logic model through a shareable HTML demo, before committing to a design.
- **[`prune`](./prune/SKILL.md)** — Retire the tests and checks in one area that no longer earn their cost, with the test-only production code they keep alive, and prove every contract keeps a test that goes red. Run it when suites slow down, turn intermittent, or grow faster than the code they cover; alone it ships its own pull request, inside `garden` its commits join garden's.
- **[`refine`](./refine/SKILL.md)** — Review a working change with fresh eyes against its spec, then make it right and make it fast without changing its behavior, in at most three rounds.
- **[`research`](./research/SKILL.md)** — Investigate a bounded question through parallel independent research and publish one cross-checked Markdown report.
- **[`setup-verification`](./setup-verification/SKILL.md)** — Give agents one way to launch, drive, and observe the real product, with acceptance tests that run fast and the same locally and in CI.
- **[`shape`](./shape/SKILL.md)** — Agree with the human on one spec: what to build, what success means, and how to prove it. Work too big for one pull request becomes slices, with a plan the team can follow.
- **[`ship`](./ship/SKILL.md)** — Open a pull request described for its reviewer by [`pr-description`](../in-progress/pr-description/SKILL.md) (beta) and drive its checks to green.
- **[`skill-guide`](./skill-guide/SKILL.md)** — Explain the available skills and recommend what the user should invoke next.
- **[`spike`](./spike/SKILL.md)** — Settle one empirical technical uncertainty through a bounded disposable experiment.
- **[`strategic-programming`](./strategic-programming/SKILL.md)** — Build maintainable code through grounded design, independent proof, and minimal custom machinery.
- **[`walkthrough`](./walkthrough/SKILL.md)** — Render a design as a self-contained visual page built from its Markdown sources, so a human understands it before accepting it and can talk it through with others.
