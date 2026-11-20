---
name: pr-review
description: "Review a pull request before its human reviewer does, with fresh agents that start from its full context: use the product and read the whole flow it touches, prove each concern by running or reading, trace it to its cause, and report concerns, questions, and what no test catches, with proof and file:line and without fixes. Use when asked to review a PR, yours or someone else's, or to check one again after fixes."
---

# PR review

Find what the change breaks before its human reviewer does, and report it so its author can check each point and decide what to do. You **orchestrate**: fresh agents review and confirm, and you carry their output between them as written, without your summary and without a remedy of your own. Each agent's brief is a template in `references/` with its `<placeholders>` filled in. That brief is all the agent knows.

**Trust the author's decisions, and verify the behavior.** The author knows what the reviewers do not: why a choice was made, what it traded away, what the owner decided. So every agent reads the record of those decisions before it judges a choice, and reports what it finds as **concerns**: each with proof a reader can repeat, traced to its cause, and without a fix. Whether a concern blocks the merge, and what to change, is for the author and the human reviewer.

Each agent runs on the model and effort the human names in the conversation. When they have not named one, ask at the start, once for all the agents, with a proposal in which the agents run on a model other than the one that wrote the change.

## Inputs

- **The pull request:** a URL, number, or branch; otherwise the open pull request for the current branch.
- **Focus notes**, optional: what the user knows about the change or wants looked at. They add to the scope.

## 1. Pin the target

Resolve the pull request and its base, and pin the head SHA: every finding cites code at that head. Review in the current worktree when it is at the head with no uncommitted changes; otherwise in a disposable detached checkout of the head under the system temporary directory.

Find the **stack**: the pull requests this one is based on and the ones based on it, what this change consumes from them and they from it, and whether merge or deploy order matters.

Done when the head SHA, the base, the checkout, and the stack are recorded.

## 2. Context

Write the context every agent starts from to one file in a scratch directory:

- **Decisions:** each choice the change records, and where: the pull request description, the linked issues with their comments, the spec, the ADRs it touches, commit messages, comments in the code, and review threads with the author's replies.
- **Rules:** the project's agent instructions and the files they point to, its review guidance, coding standards, and the READMEs of the packages the change touches. Run the project's gates for those packages on the head (lint, format check, type check, tests), and record each command and its result.
- **Guarantees:** what a person or system that depends on the change can rely on, stated where they act on it, each with its **path**: the links from where its data is produced to where someone acts on it, such as built, stored, sent, loaded, shown, and acted on. Take them from the spec and the description; when those state none, write them from the change's outcome. Write them in plain words.
- **Claims:** every statement the change makes about its behavior: the description, commit messages, the docstrings, comments, and documentation it adds or edits, and test names.
- **Map:** what the change does, the layers and seams it crosses, its entry points, the state it owns, the resources it shares with other work, the dependencies it calls, who controls each input, and how to run the product. Fold in the focus notes.

Done when the file holds every decision with its source, every gate result, every guarantee with its path, every claim, and the map.

## 3. Review

Start four fresh reviewers in parallel with [reviewer.md](references/reviewer.md), one per area of the [lenses](references/lenses.md): failure and concurrency, trust and record, use, and contracts and design. One reader holding every area spends its effort on the one that interests it. Skip an area only when nothing in the change reaches it, such as failure and concurrency for a change to documentation alone.

Done when every reviewer has written its report.

## 4. Confirm

Give all the reviewers' reports together to one fresh agent with [confirm.md](references/confirm.md). It checks each suspect against its own reading and runs, groups what holds by cause, and writes the report.

Done when the report is written.

## 5. Deliver

Give the user the report as written, and remove the disposable checkout.

## Re-review

When this skill reviewed the pull request before, pin the new head, update the context, and review what changed since: the fix commits, the code they reach, and their peers, with a fresh reviewer for each area the fixes touch. A fix is new code no review has seen. Review the whole head again only when the fixes changed a guarantee or the map. Give the confirming agent the earlier report too.

When a human review arrives after this one, compare them. A concern it raised that this report missed is an **escape**; a concern the author answered with a decision the context should have held is a **miss**. For each, name the step that let it through: a decision or guarantee missing from the context, a link no reviewer attacked, a flow nobody used, a link whose tests nobody mutated, or a suspect refuted on a reason nobody checked. Take them to `retro`.

## Boundaries

- The review is read-only: the reviewed branch and its pull request stay as they are.
- Post the report only when the user asks, as a comment review in the project's language, with the items the user picks. Approval and change requests belong to a person.

## Done

The context holds the decisions, gates, guarantees, claims, and map; every area that the change reaches was reviewed, or on a re-review what changed since; the confirming agent wrote the report; the user has it as written; and the checkout is removed.
