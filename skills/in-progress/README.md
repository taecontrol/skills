# In Progress

Public beta skills under evaluation. They are not promoted in the top-level catalog and may change or disappear without warning.

Install a candidate explicitly when one exists:

```bash
npx skills@latest add taecontrol/skills --skill=<name>
```

## Candidates

- **[`bug-hunt`](./bug-hunt/SKILL.md)** — User-invoked. Hunt one area for bugs nobody has reported, keep only those a reproduction turns red, fix the easy ones as draft pull requests, and file the rest as issues an agent could pick up. Runs to the end on its own, so it suits a scheduled task.
- **[`deliver`](./deliver/SKILL.md)** — Take an accepted spec to a pull request with green checks: acceptance tests first, make it work, then `refine` and `ship`.
- **[`garden`](./garden/SKILL.md)** — Between features, find drift in architecture, consistency, or performance, group it by cause, fix the causes worth their cost in one behavior-preserving pull request, and file the rest. Runs to the end on its own.
- **[`prune`](./prune/SKILL.md)** — Retire the tests and checks in one area that no longer earn their cost, with the test-only production code they keep alive, and prove every contract keeps a test that goes red. Run it when suites slow down, turn intermittent, or grow faster than the code they cover; alone it ships its own pull request, inside `garden` its commits join garden's.
- **[`refine`](./refine/SKILL.md)** — Review a working change with fresh eyes against its spec, then make it right and make it fast without changing its behavior, in at most three rounds.
- **[`setup-verification`](./setup-verification/SKILL.md)** — Give agents one way to launch, drive, and observe the real product, with acceptance tests that run fast and the same locally and in CI.
- **[`shape`](./shape/SKILL.md)** — Agree with the human on one spec: what to build, what success means, and how to prove it.
- **[`ship`](./ship/SKILL.md)** — Open a pull request a reviewer can trust and drive its checks to green.
