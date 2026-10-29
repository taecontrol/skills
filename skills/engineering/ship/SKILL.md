---
name: ship
description: "Publish finished work as a pull request and drive its CI checks to green. Use when work is ready for review, or when asked to open a PR or make its checks pass."
---

# Ship

A pull request is ready when the human can merge it without asking anything. Green checks in CI, not on this machine, are the bar.

## Prepare

The branch holds only durable work: temporary artifacts such as specs, prototypes, and reports stay out of it. When the work came from a spec, check that what must outlive it is in the change, not only in the spec. Bring the branch up to date with its base, and rerun the project's gates when that changed anything.

## Open

Push the branch and open the pull request against its base, following the project's conventions for titles and descriptions, in the language its team reads. Write the description for the **reviewer**: someone who knows the codebase but not how this change was made, and who wants to understand it and review it quickly.

- **What and why:** the problem in a few sentences, the issue it closes, and the plan when there is one.
- **How to review:** where to start, the order to read the change in, where the risk sits, and what can be skimmed, such as generated code, mechanical moves, or fixtures.
- **How to try it:** the steps to see it work, with screenshots or recordings where a person must look, attached where the platform allows.
- **Decisions worth knowing:** choices made while building it that a reviewer would otherwise question, in the product's terms.
- **Not included:** what is real but was left out, with its follow-up.

Leave out empty sections. Describe the change, not how it was made, and cite only what the reviewer can open: the spec's example IDs, review rounds, deviations from the spec, and working files belong in the delivery's report to the human. Run `unslop` on the description before publishing it.

## Drive checks to green

Watch every CI check until it finishes. For each failure, find why it fails in CI when it passed locally, such as a different platform, browser, path, timeout, or concurrency, fix the cause, and push again. A check that passes only on a retry is flaky, not green: diagnose it with `diagnosing-bugs`. Make checks pass by fixing code, tests, or configuration; disabling a check or weakening a test to get green does not count. When a failure is outside the change, show that it fails on the base too, say so in the pull request, and find or open its issue so the next delivery inherits the diagnosis.

When a failure needs something you cannot get, such as a secret, infrastructure access, or a human decision, stop and name it.

## Done

Every CI check is green, the description matches the final state, and the pull request is ready to merge. The human merges.
