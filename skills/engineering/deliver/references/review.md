# Delivery review

The contract for judging a delivered change against its accepted inputs. `deliver` dispatches it on its own integrated result; `delivery-review` runs it on a finished delivery or pull request. Both rank findings under [Rank](#rank).

The dispatcher gives each reviewer the specification path, the paths of every accepted input, the diff range from the revision where delivery began, its assigned area, every scope change and human decision made during delivery, the commands that run the project's gates in this environment, and any material current-state fact it cannot discover locally, such as a control-tool limitation already observed. A dispatched reviewer is a new agent, not a fork of the dispatcher's conversation. After the test reviewer returns, confirm with `git worktree list` that its checkout is gone, and remove it if not.

## Partition

Partition by the design's areas so each reviewer holds one area's code and accepted inputs. Add one **test reviewer** that alone owns the Tests lens across the whole project under [executed test review](#executed-test-review); area reviewers report a suspected test gap as uncertain. Assign structure and operability across the whole project to exactly one named reviewer, dedicated or an area reviewer. Size the area partition to the change; the test reviewer stays separate at any size.

## Reviewer

Start in a fresh context. The delivery's author is not independent; this review exists for what crosses slices and what the author could not see. Keep the reviewed worktree read-only: no edits, commits, stashes, or resets. Run a gate that writes files, such as snapshot updates or autofixing linters, only in a disposable checkout, and confirm `git status` is unchanged before returning.

Your oracle is the full set of accepted inputs: the brief's journeys, forbidden results, guarantees, and budgets; the design; the specification; project instructions and coding standards. The specification is derived from its sources. When it contradicts a cited source without naming the difference as a cut, report the contradiction as a defect with the scenario that exposes it.

Your scope is your assigned area across the whole project. Code no slice changed is in scope when it realizes or depends on an invariant of your area. Apply every lens assigned to you that bears on the area:

- **Outcomes:** each accepted journey, forbidden result, and guarantee the area realizes. Construct the input that would violate each one and trace whether the code allows it.
- **Invariants:** every shared constraint and protected behavior. Enumerate every code path that realizes or depends on it and trace where its inputs come from.
- **Beyond the diff:** new behavior against the policy existing code applies to comparable behavior; each semantic change across slices against every consumer, and whether each consumer's behavior is still proven.
- **Failure and recovery:** each dependency's complete outcome set plus transport failure; process restart or crash while in-memory state gates a user action, a retry, or a recovery; retries, replays, queues, and schedulers that can loop forever, duplicate an effect, or leave work stuck in an intermediate state.
- **Tests:** tests that stay green when the branch they claim to cover is neutralized; tests and fixtures that pin behavior contradicting the accepted inputs; fixtures too simplified to reproduce the failure they stand for; real sleeps and wall-clock dependence; intermittent tests; assertions weaker than the test name; accepted obligations no test proves; oversized, duplicated, or redundant tests. Classify each as fix, delete, or add.
- **Structure:** one concept owned in several places, duplicated policy, dead code and leftovers of intermediate slices, code placed against the design's module boundaries, violations of project instructions or coding standards, temporary-document identifiers in versioned files.
- **Operability:** gates that pass only in this checkout, such as a dependency on ignored or local-only paths, or on a system tool or browser whose build differs from the one CI runs; CI configuration that does not run the new code; documentation that no longer matches behavior; brief budgets without a measurement; authorization gaps, secrets in logs or evidence, and unvalidated input at the trust boundaries the delivery touches.

## Executed test review

The test reviewer proves the Tests lens by running mutations, not by reading. Reading finds weak names; only execution shows a test that stays green.

Create a disposable checkout of the reviewed revision outside the reviewed worktree, such as `git worktree add --detach` under the system temporary directory, and prepare its dependencies. Mutate two kinds of target:

- each guard, policy branch, and failure path the delivery added or changed;
- each assertion or production value that realizes an accepted obligation: a journey's required or forbidden result, a guarantee, an error code, a success-metric field or label.

For each mutation, run the narrowest suite that claims to cover it under a time limit of a few times its unmutated duration, record whether a test goes red, then restore the mutation before the next one. A run that hits the limit counts as red; record it as a timeout. A mutation that stays green is a finding: the claiming test is vacuous, or the obligation has no test. Name the suites you could not run and why. Return every mutation with its target and result alongside the findings. Remove the checkout before returning.

## Findings

Report each finding with its lens, file and line, the violated source section or rule, a concrete trace, reproduction, or mutation result that can disagree with the implementation, and whether a deterministic check could have caught its class. Report separately:

- a suspicion without that evidence, as uncertain;
- a defect that predates the delivery, as pre-existing;
- a finding that holds only under one reading of a guarantee whose scope the accepted inputs leave open, as an ambiguity with both readings and the scenario each one allows.

Return findings; do not repair them.

## Rank

1. data loss, security exposure, or a blocked critical journey;
2. a violated forbidden result, guarantee, or protected behavior;
3. other incorrect behavior, including failure and recovery paths;
4. tests to fix, delete, or add;
5. structure and standards.
