---
name: pr-description
description: "Write or rewrite a pull request's title and description, then have a fresh agent verify every claim and what it reveals before publishing. Use when opening a pull request, or when asked to write, review, or improve a PR description."
---

# PR description

The reader is the **decider**, the teammate who decides whether the change merges. They know the product and the architecture, not the code, and took no part in the work or the request behind it. The diff and code review carry the code. The description gives what you understood the goal to be, the solution and why it beat the alternatives, and **evidence** that it works. They read it first to check that you are **in sync** on the goal; when you are not, nothing else in it matters. Every claim in it is one the decider could check. Before you publish it, a fresh agent that saw none of the work verifies it.

## 1. Gather

Work from what outlives the work: the final diff against the base, the commits, the issue the change closes, the design it follows, and verification you ran on the final state. Read the whole diff. Notes from the work supply facts; the structure and the words come from step 2.

Collect what the diff cannot show:

- **Alternatives.** The options considered, and why each was set aside. When the work left no record of them, weigh them now and list them as inferences.
- **Cause**, for a fix: what made the failure happen, which change introduced it (`git log -S`, `git blame`), and whether the fix closes the cause or only this instance.
- **Evidence.** Whatever shows the change working on its final state: before-and-after screenshots or a video, a real run's output, performance numbers, or the strategy that proves a refactor kept its behavior.

Keep a **claims list**: each fact you may state, with its source.

- **Diff:** the file and lines that show it.
- **Run:** a command or action you ran on the final state, with its output.
- **Said:** a person told you, such as a decision or a bug report. The description attributes it to them by role, such as "the maintainer" or "a user".
- **Document:** a page or file you read, with where it lives and its [visibility](#visibility).
- **Inference:** your own conclusion. The description states it as one, or leaves it out.

A claim from an earlier run, from the change's own documents such as an ADR, or from an agent's report is a **lead** until the diff or a new run backs it. A description written before the change last moved is a lead too: gather again from the final diff and rewrite it whole.

Done when you can say in one sentence, in the product's terms, what the change is for and why this solution beats each alternative you name, and every claim you mean to make is on the list with its source.

## 2. Write

Title: imperative, specific, and readable on its own, in the project's convention.

The description answers the decider's questions, in the order they ask them. They are questions, not a template: give each the heading and space this change needs, merge them, or leave one out. A small fix can answer all of them in three short paragraphs.

1. **What you understood.** The problem or goal as you understood it, who it affects, and the issue it closes, summarized so the decider need not open it. State the goal, not the work done for it.
2. **The solution.** What changes for users, operators, or the rest of the system, in a few lines, with before and after. Add anything someone must do, such as a migration, and what merging sets off, such as a deploy. Link to where the full design lives instead of restating it.
3. **Why this solution.** The alternatives and why each was set aside, the known costs and limits with numbers where they exist, and for a fix, the cause and where it came from. This is what shows the decider that you looked for the best solution.
4. **Evidence it works.** Show the change working the way the decider would see it. Upload images and video where the platform allows, and tell a strategy in a sentence or two. Name what was not verified and why. Checks that passed get one line after that evidence; CI shows each one's result. A failing check outside the change gets one line that says where else it fails. Long output goes in a collapsed `<details>` block, with the decisive lines outside it.
5. **Left out and why.** What the decider would expect this change to cover and it does not, each with its reason and its follow-up issue.

Name things the way the product and the architecture name them: screens, commands, tools, components, and data. A function, file, or type name enters only when the decider needs it to decide, and then with what it does.

A claim enters the description only when, without it, the decider would decide or trust differently. A detail the diff shows stays in the diff. A detail a document already states gets a link. How the change came to be, such as the review rounds, goes in your report to whoever asked for the work. A large change reads in about three minutes, 500 to 700 words.

Write each part with `writing-for-people`, and keep within the repository's [Visibility](#visibility). Write in the language the project's team reads. When the project has a pull request template or written conventions, answer these questions inside them. Earlier descriptions show what the project discusses, not a structure to follow.

Done when every claim passes the test above, the description fits its length, and it answers each question the change has an answer to.

## 3. Verify

Give a fresh agent only the title, the description, the diff, the claims list with its sources, the visibility of the repository and of each source, and this skill's first two sentences, on the decider. It returns:

1. **Each claim, traced.** Every factual statement in the description, with its source checked by opening it, or by rerunning the check when that is cheap. It marks each claim **supported**, **attributed** to the person who said it, **inference** stated as one, or **unsupported**. A claim is unsupported when its source does not show it, when the diff contradicts it, when it states an inference as fact, when it rests on a lead, or when it generalizes from one case.
2. **Exposure.** Every name, link, path, address, or detail that reveals more than the repository's visibility allows.
3. **Cold read.** In one sentence each, what it understood the change is for and why this solution beat each alternative the description names. Then the questions the decider would ask before deciding, and each term, code name, or reference the decider could not resolve from the pull request alone.
4. **Cut.** Every sentence the decider could lose without deciding or trusting differently, every sentence that repeats the diff or a document the change updates, and the description's word count.

For each unsupported claim, remove it, attribute it, mark it as not verified, or back it with a new run. Remove each exposure. Judge the cold read, the cut, and its two sentences as `writing-for-people`'s cold read says. A claim you add or change afterwards goes on the claims list with a source that shows all of it. When the harness offers no fresh context, verify it yourself and say so in your report, not in the pull request.

Done when each unsupported claim and exposure is handled, each cold-read and cut observation is judged, and each claim added or changed since is on the claims list with its source.

## 4. Publish

Create the pull request with the verified description, or replace the description of an existing one, from a file, such as `gh pr create --body-file`, so the formatting survives. Add an AI attribution line only when the project or the harness asks for one. A published description keeps its earlier versions in the platform's edit history, so an exposure caught after publishing needs that revision deleted, not only the text edited.

Done when the pull request shows the verified description.

## Visibility

The description is exactly as visible as its repository. Check the visibility of the repository and of each source, such as with `gh repo view --json visibility`. When the repository reaches more people than a source does, as a public repository citing a private one, describe what came from that source in general terms: a private project, an internal system, a customer, a colleague, a host, an address, or data, with no names, links, or details that identify it.
