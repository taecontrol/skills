---
name: pr-review
description: "Review a pull request as untrusted work before its human reviewer does: attack what it guarantees through the whole flow it touches, confirm each finding by reading or running, and report Blocking, Should fix, and Considered with file:line. Use when asked to review a PR, yours or someone else's, or to check one again after fixes."
---

# PR review

Review the pull request as a **stranger** would: the author is unknown, the work is untrusted, the description is a set of claims to check, and the job is to find what is wrong before the human reviewer does. The review is **preliminary**: it flags findings for a person to judge. Approving or requesting changes stays with that person.

The bar is the strictest reviewer the change will meet. Their blockers come from knowing what the change guarantees and tracing, through the whole flow, a mechanism that breaks a guarantee: a step that throws after another has committed, a resource no exit path releases, one hung dependency that stalls the shared process, a claim in the description the code does not keep, a test that stays green with its guard deleted. Review the whole flow, settle each finding by evidence, and rank it by its consequence.

Write the report in the user's active language; code identifiers, paths, and the opening line stay as they are. Write the report and any comment you post with `writing-for-people`.

## Inputs

- **The pull request:** a URL, number, or branch; otherwise the open pull request for the current branch.
- **Focus notes**, optional: what the user knows about the change or wants looked at. They add to the scope.

## 1. Pin the target

Resolve the pull request and its base, and pin the head SHA: every finding cites code at that head. Review in the current worktree when it is at the head with no uncommitted changes; otherwise in a disposable detached checkout of the head under the system temporary directory.

Find the **stack**: the pull requests this one is based on and the ones based on it. Read enough of their descriptions and diffs to know what this change consumes from them, what they consume from it, and whether merge or deploy order matters.

Done when the head SHA, the base, and the stack are recorded.

## 2. Rules, guarantees, claims, and map

**Rules.** Read the project's conventions: its agent instructions and the files they point to, the READMEs of the packages the change touches, its coding standards and contributing guide, the ADRs the change touches, and its linter and type-checker configuration. When the instructions point to the review guidance the project's reviewers work from, read it too: its blocking rules add to step 5's. When the instructions say which files are authoritative and which are only context, follow them. Run the project's gates for the touched packages on the head (lint, format check, type check, tests) and record each command and its result.

**Guarantees.** Before you read the description, issue, or spec, derive the change's guarantees from the diff and the code it reaches, as a stranger would. A guarantee is what a person or system that depends on the change can rely on, stated where they act on it, such as an approver who approves only what they saw and understood, or a caller that gets an error rather than a silent default. For each guarantee, write its **path**: the links from where its data is produced to where someone acts on it, such as built, stored, sent, loaded, shown, explained, and acted on, across every layer the change touches. Step 3 attacks every link.

**Claims ledger.** List every statement the change makes about its behavior: the pull request description, the linked issue and spec, commit messages, docstrings and comments it adds or edits, documentation it adds or edits, and test names. Step 3 gives each claim a verdict. Then add, with its path, each guarantee these sources state that your derivation missed, and keep every guarantee you derived. Write each guarantee in plain words, without the spec's identifiers, because the stranger reviewer gets them too.

**Map.** Write the change in a few lines: what it does, the layers and seams it crosses, its entry points, the state it owns, the process and resources it shares with other work, the external dependencies it calls, and who controls each input. Fold in the user's focus notes. The map is what every reviewer starts from.

Done when every gate has a recorded result, every guarantee has its path, every claim is in the ledger, and the map names entry points, state, shared resources, dependencies, and inputs.

## 3. Review

The scope is the diff, the code it newly reaches, every caller and consumer of a name, value, or seam whose meaning changed, and the change's **siblings**: existing code in the repository that does the same job, such as another worker, client, or route. A sibling is the reference for what the new code should do; where they differ, one of them is wrong.

Dispatch one fresh reviewer per **area** of the [lenses](references/lenses.md), at most three, in parallel: failure and concurrency, trust and record, and contracts and design. One reader holding every lens spends its effort on the area that interests it and covers the others less. A reviewer with one area asks each of its questions of the whole change. Each area also owns the [tests](references/lenses.md#tests-in-every-area) for its guards. Skip an area only when nothing in the change can reach it, such as failure and concurrency for a change to documentation alone, and give each area its own reviewer.

Brief each reviewer with the head SHA, the checkout, the guarantees and their paths, the map, the rules and gate results, the scope above, and its area's section of the lenses; the failure and trust reviewers also get the claims ledger. The contracts and design reviewer reads as the **stranger**. Brief it without the spec, plan, or delivery notes, so vocabulary from the work that made the change stands out instead of reading as normal. Each reviewer attacks every link of every guarantee: how the link can be missing, wrong, forged by an input someone else controls, or stale, and whether whoever acts then fails closed. Its area's lenses are ways to break a link, and a way no lens names counts as well.

Each reviewer is read-only, runs code only in the checkout, and returns each **suspect** with a scenario (the input or event, the steps through `file:line`, and the consequence), each piece in its area whose case is improbable or that nothing needs, and for each link of each guarantee, what it tried and found fine.

When they return, read the suspects side by side and follow the ones that cross areas, such as a retry that writes a second audit record or a fixture that hides a race. Give each claim in the ledger its verdict from what came back.

Done when every dispatched area has reported what it tried on every link of every guarantee and covered the whole change, and every claim in the ledger is kept, broken (a suspect), or unverifiable.

## 4. Confirm

Confirm every suspect yourself. You found none of them, so you check the reviewers' reading rather than repeat it. Each suspect becomes:

- **confirmed** when the scenario follows from the code and configuration, or from a run;
- **plausible** when the risk is real but the evidence cannot show it, naming the evidence that would settle it;
- **refuted** when a guard elsewhere stops it or nothing reaches it. Read or run the guard, or trace the path that shows nothing reaches it. A refutation needs evidence like any finding. Drop it, or list it under Considered when the reason is not obvious.

Run code when reading cannot settle a suspect: a regex's time on a long input, what a redaction returns for a secret under an ordinary key, a parser on a hostile value, a test with its guard removed. Run only in the checkout and the local test environment.

Settle each condition where it is decided. A suspect that reads "if the load balancer admits other callers" is settled by reading the infrastructure configuration, the router, or the deployment manifest; a finding that still says "if" when the answer can be looked up is unfinished.

For each confirmed finding, search the repository for every other instance of the same mechanism and list them in that finding. A fix that closes one site leaves the rest for the next round.

Done when every suspect is confirmed, plausible with its missing evidence named, or refuted, and every confirmed finding lists its sibling sites.

## 5. Rank

- **Blocking:** a confirmed defect in scope that breaks a guarantee; breaks a safety, security, or tenant invariant or a claim the change makes about one; loses or corrupts data or a secret that cannot be recovered; lets one input, dependency, or tenant stall or crash the shared process; records the wrong outcome in an audit, or shows an approver something other than what runs; breaks a contract a consumer in the repository or the stack depends on; breaks a rule the project's instructions make mandatory, such as a documentation table updated in the same change; fails a gate; or a link of a guarantee's path, or a guard on a security, tenant, or privilege boundary, whose removal leaves every test green. A merge-order condition is blocking when the stack can merge or deploy out of order. Rank by the consequence. A finding whose case is improbable, as `strategic-programming` defines it, is never Blocking: it goes under Considered with its line.
- **Should fix:** a plausible risk with the evidence that would settle it; a real defect that breaks no guarantee and whose worst case is bounded or corrects itself; an item already tracked elsewhere, naming the ticket; cost, conformance, and consistency with siblings; text in the change only its makers can read, listing every site; a design problem the change introduces; a piece the change adds for an improbable case, or that nothing needs, which can go; a defect that predates the change, marked pre-existing.
- **Tests to fix or add:** each named by the scenario that goes unasserted or fails today, with the assertion that would catch it.
- **Considered:** what you checked and decided is fine, one line each with the reason you confirmed, including claims you verified that a reader would doubt.

## 6. Report

Open with the literal line `This is a preliminary automated review.` Then one line with the pull request, the head SHA, and each gate with its result. Then the sections in this order, leaving out an empty one: `### Blocking`, `### Should fix`, `### Tests to fix or add`, `### Considered`, and `### Not reviewed`, which names what you did not read or run and why.

Each finding is one bullet:

- **The defect, stated as its consequence.** [`short/path.ts:69`](repo/relative/path.ts#L69) — the mechanism, with identifiers in backticks; what triggers it; its blast radius; the sibling sites with the same gap; the claim it contradicts; the test that is missing.

Mark a plausible finding `(plausible)` and name the evidence that would settle it. Keep prose tight: state findings and evidence, and name a name only when it misleads. Write for the author's teammates, who have the repository and not the spec. State each behavior in plain words rather than by the spec's example or question number.

## Re-review

When this skill reviewed the pull request before, pin the new head, rerun step 2, and review what changed since: the fix commits, the code they reach, and their siblings, with a fresh reviewer for each area the fixes touch. A fix is new code no review has seen, and siblings of a fixed blocker are where the next round's blockers come from. Review the whole head through every step again only when the fixes changed a guarantee or the map. For each earlier Blocking and Should fix item, report it as closed at every site, closed at some (naming the sites left), or open, and repeat open Should fix items.

When a human review arrives after this one, compare them: each blocker it found that this report missed is an **escape**. Name the guarantee it breaks and the step that let it through: a guarantee never derived, a link missing from its path, a link no reviewer attacked, a link whose tests nobody mutated, or a suspect refuted or ranked on a reason nobody checked. Fix that step. A new lens question catches only the escape it was written for, and the next escape comes in another form. Take the escapes to `retro`.

## Boundaries

- The review is read-only: the reviewed branch and its pull request stay as they are.
- Post the report only when the user asks, as a comment review in the project's language; approval and change requests belong to a person.
- Remove the disposable checkout before you report.

## Done

Every dispatched area attacked every link of every guarantee and covered the whole change, or on a re-review what changed since, every claim has a verdict, every suspect is confirmed, plausible, or refuted, every confirmed finding lists its sibling sites, the report is delivered, and the checkout is removed.
