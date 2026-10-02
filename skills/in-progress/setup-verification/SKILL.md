---
name: setup-verification
description: "Give agents hands and eyes on a project: one way to launch, drive, and observe the real product, and acceptance tests that run fast and the same locally and in CI. Use when a project has no method that can prove a spec's examples, when acceptance tests are slow, flaky, or differ from CI, or when asked to set up end-to-end testing."
---

# Setup verification

An agent can only prove what it can run and see. Verification is a faithful, fast, repeatable way to exercise the real product, written down once so every agent uses it instead of rebuilding it.

Make the mechanical parts deterministic, as scripts and commands in the repository; prose keeps only the judgment.

## Process

1. **Take inventory.** How the product launches, its interfaces, the existing test layers and tools, the CI configuration and platforms, suite durations, and flaky or skipped tests. Note where local runs differ from CI: platform, browser build, paths, ports, data.
2. **Choose how each interface is proven.** An API or CLI is driven directly. For a UI, prefer what the project already uses; otherwise, an agent-capable driver such as Manuvra, or an end-to-end framework whose steps state intent rather than selectors, so tests survive markup changes. A new tool or dependency is the human's decision: propose it with its cost.
3. **Make launch and control deterministic.** One command starts an isolated instance with known data and a health check, on ports and paths that cannot collide with another worktree, and cleans up after itself.
4. **Match CI.** Acceptance tests run in CI on the same runtime, browser, and platforms as locally. Where they cannot match, say how the difference is covered.
5. **Keep it fast.** Measure the suites; parallelize, share setup, and test below the UI what does not need the UI. A slow suite is a cost every delivery pays.
6. **Write it down.** Through `agents-md`, point the project's agent instructions to the verification scripts and when to use each, where acceptance tests live, how to drive and observe the UI, and what a ready pull request means for this project when it differs from `ship`.
7. **Prove it.** Run one real journey end to end locally, then in CI through `ship`, and show the result.

## Done

An agent new to the project can launch, drive, and observe the real product and run its acceptance tests with the commands in its agent instructions, the same way CI does; one journey has run end to end in both places.
