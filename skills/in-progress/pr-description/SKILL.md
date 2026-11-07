---
name: pr-description
description: "Write or rewrite a pull request's title and description, then have a fresh agent verify every claim and what it reveals before publishing. Use when opening a pull request, or when asked to write, review, or improve a PR description."
---

# PR description

The reader is the **reviewer**: someone who knows the codebase, not how this change was made, and has no reason to care how it was made. They read the description to decide whether the change should exist, where to look, and whether they can trust that it works, and then they read the diff. So the description is a **map** of the diff. It gives what the diff cannot show and points to the rest. Every sentence answers one of those questions with something the diff and the documents the change updates do not already say, and every claim is one the reviewer could check. The job ends when a fresh agent that saw none of the work has verified it.

## 1. Gather

Work from what outlives the work: the final diff against the base, the commits, the issue the change closes, the documentation and ADRs it adds, and verification you ran on the final state. Read the whole diff. Notes from how the change was made, such as a spec, a plan, a review, a spike, or a report to whoever asked for the work, supply facts; the structure and the words come from the reviewer's questions.

Keep a **claims list**: each fact you may state, with its source.

- **Diff:** the file and lines that show it.
- **Run:** a command or action you ran on the final state, with its output.
- **Said:** a person told you, such as the owner's decision or report. The description attributes it to them.
- **Document:** a page or file you read, with where it lives and its [visibility](#visibility).
- **Inference:** your own conclusion. The description states it as one, or leaves it out.

A claim from an earlier run, from the change's own documents such as an ADR, or from an agent's report is a **lead** until the diff or a new run backs it. When the change moved after its description was written, such as after a review round, the old description is a lead too, so gather again from the final diff and write the description whole.

Done when you can say in one sentence why the change exists, and every claim you mean to make is on the list with its source.

## 2. Write

Title: imperative, specific, and readable on its own, in the project's convention.

Choose what goes in before you write. A claim from the list enters the description only when, without it, the reviewer would decide, look, or trust differently. The rest stays where it already lives. A detail the diff shows, such as a limit's value, a lock clause, or the error each endpoint returns, stays in the diff. A detail that a document the change updates already states gets a link to that section. An edge case lives in the test that names it.

Then the sections below, in this order. Each one answers a question the reviewer brings. Length follows what the reviewer must take in before the diff, not the diff's size. A one-line fix gets a title and a sentence of why. A large change reads in about three minutes, about 500 to 700 words. A section with nothing to say is left out.

1. **Why**, without a heading: one to three sentences on the problem or goal, who it affects, and the issue it closes, with that issue's point summarized so the reviewer need not open it. Name the problem as a whole. Its cases belong to What changes or to the tests.
2. **What changes:** one bullet per behavior that users, operators, or other code notice, each in one or two sentences with before and after. Add anything someone must do, such as a migration, a config change, or a flag, and what merging sets off, such as a deploy. The mechanism behind a behavior goes under Decisions when it was a choice, or under How to review when the risk sits in it.
3. **Decisions:** the choices a reviewer would otherwise question: the approach, the alternatives set aside and why, and known costs and limits, with numbers where they exist. When an ADR carries the reasoning, give its conclusion here and link it.
4. **How to review:** when the change spans several areas or many files. Name where to start, the reading order, where the risk sits, what to skim (generated code, lockfiles, fixtures, mechanical moves), and the question you want the reviewer's judgment on. When a change this large could have been split, say why it was not.
5. **Try it and what was tested:** the shortest way for the reviewer to see it work, then one line per kind of check with its result, such as a suite's test count, or a mutation score and what its survivors are. Use before-and-after screenshots for UI, uploaded where the platform allows, and numbers for performance. Name what was not verified and why. A failing check outside the change gets one line that says where else it fails. How the tests came to be, such as which ones failed first, the review rounds, and the score of each run, goes in your report to whoever asked for the work. Put long output and extra screenshots in a collapsed `<details>` block, with the decisive lines outside it. The pull request's own CI checks already show their results.
6. **Not included:** what a reviewer would expect this change to cover and it leaves out, each with its follow-up issue, or the reason it has none.

Turn material from the work into the reviewer's terms through `writing-for-people`'s process material, putting each statement under the section whose question it answers, and keep within the repository's [Visibility](#visibility). Write in the language the project's team reads. When the project has a pull request template or conventions, fit these sections into them instead of adding a second structure.

Done when every claim in the description passes the test above, the description fits its length, and every section with something to say is written with `writing-for-people`.

## 3. Verify

Give a fresh agent only the title, the description, the diff, the claims list with its sources, and the visibility of the repository and of each source. It saw nothing of the work and has nothing to defend. It returns:

1. **Each claim, traced.** Every factual statement in the description, with its source checked by opening it, or by rerunning the check when that is cheap. It marks each claim **supported**, **attributed** to the person who said it, **inference** stated as one, or **unsupported**. A claim is unsupported when its source does not show it, when the diff contradicts it, when it states an inference as fact, when it rests on a lead, or when it generalizes from one case.
2. **Exposure.** Every name, link, path, address, or detail that reveals more than the repository's visibility allows.
3. **Cold read.** The questions it would ask the author before reviewing, and each term or reference it cannot resolve from the pull request alone.
4. **Cut.** Every sentence the reviewer could lose without deciding, looking, or trusting differently, every sentence that repeats the diff or a document the change updates, and the description's word count.

For each unsupported claim, remove it, attribute it, mark it as not verified, or back it with a new run. Cut what it lists under Cut. Answer each cold-read question in the fewest words, or with a link to where the answer lives. Fix everything else it reports. When the fixes add or change claims, verify those again with a fresh agent. When the harness offers no fresh context, verify it yourself and say so in your report, not in the pull request.

Done when the latest verification finds no unsupported claim, no exposure, and nothing to cut, and the verifier can say why the change exists, where to start reading, and how it was verified.

## 4. Publish

Create the pull request with the verified description, or replace the description of an existing one, from a file, such as `gh pr create --body-file`, so the formatting survives. Add an AI attribution line only when the project or the harness asks for one. A published description keeps its earlier versions in the platform's edit history, so an exposure caught after publishing needs that revision deleted, not only the text edited.

Done when the pull request shows the verified description.

## Visibility

The description is exactly as visible as its repository. Check the visibility of the repository and of each source, such as with `gh repo view --json visibility`. When the repository reaches more people than a source does, as a public repository citing a private one, describe what came from that source in general terms: a private project, an internal system, a customer, a colleague, a host, an address, or data, with no names, links, or details that identify it.
