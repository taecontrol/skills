# In Progress

Public beta skills under evaluation. They are not promoted in the top-level catalog and may change or disappear without warning.

Install a candidate explicitly when one exists:

```bash
npx skills@latest add taecontrol/skills --skill=<name>
```

## Candidates

- **[`deliver`](./deliver/SKILL.md)** — Take an accepted spec to a pull request with green checks: acceptance tests first, make it work, then `refine` and `ship`.
- **[`garden`](./garden/SKILL.md)** — Between features, find drift in architecture, consistency, or performance, group it by cause, and fix the causes in small behavior-preserving pull requests.
- **[`prune`](./prune/SKILL.md)** — User-invoked. Retire the tests and checks in one area that no longer earn their cost, with the test-only production code they keep alive, and prove every contract keeps a test that goes red. Run it when suites slow down, turn intermittent, or grow faster than the code they cover.
- **[`refine`](./refine/SKILL.md)** — Review a working change with fresh eyes against its spec, then make it right and make it fast without changing its behavior, in at most three rounds.
- **[`setup-verification`](./setup-verification/SKILL.md)** — Give agents one way to launch, drive, and observe the real product, with acceptance tests that run fast and the same locally and in CI.
- **[`shape`](./shape/SKILL.md)** — Agree with the human on one spec: what to build, what success means, and how to prove it.
- **[`ship`](./ship/SKILL.md)** — Open a pull request a reviewer can trust and drive its checks to green.
