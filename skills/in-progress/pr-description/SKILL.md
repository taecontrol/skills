---
name: pr-description
description: "Write or rewrite a pull request's title and description for a reviewer who knows the codebase but not how the change was made. Use when opening a pull request, or when asked to write, review, or improve a PR description."
---

# PR description

The reader is the **reviewer**: someone who knows the codebase, not how this change was made, and has no reason to care how it was made. They read the description to decide whether the change should exist, where to look, and whether they can trust that it works. Every sentence answers one of those questions.

## 1. Gather

Work from what outlives the work: the final diff against the base, the commits, the issue the change closes, the documentation and ADRs it adds, and verification you ran on the final state. Read the whole diff. Notes from how the change was made, such as a spec, a plan, a review, a spike, or a report to whoever asked for the work, supply facts only. They never supply the structure or the words.

Done when you can say in one sentence why the change exists, and every claim you mean to make points to a line in the diff or a run you saw.

## 2. Write

Title: imperative, specific, and readable on its own, in the project's convention.

Then the sections below, in this order. Each one answers a question the reviewer brings. Length follows the change: a one-line fix gets a title and a sentence of why, and a section with nothing to say is left out.

1. **Why**, without a heading: one to three sentences on the problem or goal, who it affects, and the issue it closes, with that issue's point summarized so the reviewer need not open it.
2. **What changes:** behavior before and after, the impact on users, operators, or other code, anything someone must do, such as a migration, a config change, or a flag, and what merging sets off, such as a deploy. Summarize; the diff already lists the files.
3. **Decisions:** the choices a reviewer would otherwise question: the approach, the alternatives set aside and why, and known costs and limits, with numbers where they exist. When an ADR carries the reasoning, give its conclusion here and link it.
4. **How to review:** when the change spans several areas or many files. Name where to start, the reading order, where the risk sits, what to skim (generated code, lockfiles, fixtures, mechanical moves), and the question you want the reviewer's judgment on. When a change this large could have been split, say why it was not.
5. **Try it and what was tested:** the shortest way for the reviewer to see it work, then one line per check: the command or action and its result. Use before-and-after screenshots for UI and numbers for performance. Name what was not verified and why. Put long output and extra screenshots in a collapsed `<details>` block, with the decisive lines outside it. The pull request's own CI checks already show their results.
6. **Not included:** what is real but left out, each with its follow-up issue.

## 3. Translate the process

Material from how the change was made is what most often turns a description into something only its author can read. Each kind either becomes a statement about the code, its risk, or its verification, or goes to its own home:

| From the work | In the description |
|---|---|
| Spec examples, acceptance criteria, and their IDs | The behavior itself, in plain words |
| Review rounds and the fixes they produced | A risk they exposed, under Decisions or How to review |
| Departures from a spec or design the reviewer cannot open | The decision and its reason, under Decisions |
| Spike or experiment results | The conclusion, where it backs a decision |
| Findings only a later change needs | That change's issue, linked from Not included |
| Workflow phases, and skill, agent, tool, or model names | Nothing |
| Terms coined during the work | The words the code and the team already use |
| Local paths, unmerged branches, private links | The durable thing they point to, or nothing |

What the person who ran the work needs, such as deviations from a spec, review rounds, and changed assertions, goes in your report to them.

## 4. Check

1. **Against the diff.** Every claim is true of the final diff, above all claims about tests, scope, and behavior, and claims carried over from the change's own documents, such as an ADR, get the same check. A description that claims changes or tests the diff lacks costs the reviewer's trust in everything else.
2. **Cold read.** Give a fresh agent only the title, the description, and the diff, with no conversation, spec, or notes. It plays the reviewer and returns the questions it would ask the author before reviewing, each term or reference it cannot resolve from the pull request alone, and each claim it cannot find in the diff. Fix what it finds and repeat once if the fixes were large. When the harness offers no fresh context, do the cold read yourself and say so.
3. **`unslop`** the prose.

Done when the cold reader can say why the change exists, where to start reading, and how it was verified, and has no question the description could have answered.

## 5. Publish

Write in the language the project's team reads. When the project has a pull request template or conventions, fit these sections into them instead of adding a second structure. Add an AI attribution line only when the project or the harness asks for one. Images and links must open for the reviewer: upload screenshots where the platform allows, and never point to a local path. Create the pull request with the description, or replace the description of an existing one, from a file, such as `gh pr create --body-file`, so the formatting survives.
