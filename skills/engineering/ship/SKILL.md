---
name: ship
description: "Publish finished work as a pull request and drive its CI checks to green. Use when work is ready for review, or when asked to open a PR, make its checks pass, or answer its review."
---

# Ship

A pull request is ready when the human can merge it without asking anything. Green checks in CI, not on this machine, are the bar.

## Prepare

The branch holds only durable work: temporary artifacts such as specs, prototypes, and reports stay out of it. When the work came from a spec, check that what must outlive it is in the change, not only in the spec. Bring the branch up to date with its base, and rerun the project's gates when that changed anything.

## Open

Push the branch and open the pull request as a draft against its base, with the title and description written by `pr-description`, whatever the size of the change. It stays a draft: the human marks it ready for review once they have looked at it.

## Drive checks to green

Watch every CI check until it finishes. A review bot that runs on the pull request counts as a check. Wait for its review of the head, then fix each finding it marks blocking, or answer it with the evidence that refutes it. For each failure, find why it fails in CI when it passed locally, such as a different platform, browser, path, timeout, or concurrency, fix the cause, and push again. A check that passes only on a retry is flaky, not green: diagnose it with `diagnosing-bugs`. Make checks pass by fixing code, tests, or configuration; disabling a check or weakening a test to get green does not count. When a failure is outside the change, show that it fails on the base too, say so in the pull request, and find or open its issue so the next delivery inherits the diagnosis. When a fix changes what the description says, update the description with `pr-description`.

When a failure needs something you cannot get, such as a secret, infrastructure access, or a human decision, stop and name it.

## Answer a review

A review round adds only what closes its blocking items. Give each one the smallest fix that closes it at every site of the same mechanism. When the reviewer proposed an option, take it. Make the fix as `refine`'s Improve section says. A note the reviewer marked as not blocking, and anything the review did not ask for, stays out unless the human asks for it. List them in your report. Before the human asks for another review, review the new head with `pr-review`, which looks hardest at the fix code, drive the checks to green again, and bring the description up to date.

## Done

Every CI check is green, no review bot has an open blocking finding on the head, the description matches the final state, and the draft pull request is ready to merge once the human marks it ready for review. The human marks it ready and merges.
