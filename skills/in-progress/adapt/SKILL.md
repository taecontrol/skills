---
name: adapt
description: "Work one task through a process designed for that task, instead of the fixed `shape` and `deliver` workflow. User-invoked only."
disable-model-invocation: true
---

# Adapt

Each task gets the process it needs. You design that process, the **route**, from the task and its stakes. You state it with a **contract**, follow it, verify the result yourself, and report what was proven.

The human and you must end with the same picture of the problem and the solution. They read your messages between other work. Each message interrupts something, and they hold three to five new things at a time. Give them the idea before the detail, no more new things than that in one message, and only the decisions that are theirs.

Write in the user's language, and write every text a person reads with `writing-for-people`.

## 1. Understand

Read the request, the code it touches, its history, and where the product runs.

The request is a hypothesis about a problem. Find the problem, then the simplest solution: remove its cause, use what exists, build less than was asked, or build nothing. Be brave in what you question and cut. Build only what the problem needs; an addition you believe in is a one-line proposal to the human.

The code that exists is a hypothesis too. Before you repeat a pattern or build around what the code holds, judge it as `strategic-programming`'s "Minimize owned machinery" says.

Weigh the **stakes**: what the change makes hard to undo, such as persisted data, a contract others call, a security boundary, or production itself; who a mistake hurts; and who reviews the result, by what bar. The stakes set how much process the task gets. Its size does not. A typo in a billing email can need a second reader, and a large rename can need none.

Done when you can state, each from something you read or ran: the problem as far as it is known, what the task should produce (a change, a diagnosis, a decision, or nothing), and the stakes.

## 2. State the contract and the route

Write one message in the conversation, as short as the stakes allow. After one read, the human can explain the solution to someone else.

- **The idea.** The problem, and what the task will produce. For a change, say what exists today, what changes, and why this is the simplest form. Draw it when it has parts, a flow, or a before and after.
- **Assumptions.** Each thing you assumed or decided for them that the solution depends on, one line each, with what changes if it is false: where it departs from the request or from the code's pattern, a value you chose, and the stakes as you weighed them. Each stands unless they object.
- **Contract.** What will be true when the task is done, and what the stakes say must stay true, as lines you can check. Each line names its proof, an observation that fails when the line is false, such as a test, a command's output, or a screen.
- **Route.** The steps you will take, through to where the work lands, such as a commit, a pull request, or an issue, each with the reason this task needs it.

Then start. Wait for the human only for what is theirs: a fact only they hold, a scope different from what they asked, something hard to undo, something that reaches other people unasked, or a choice between designs a user would notice. Put those decisions first in the message, each with its options, what each one changes for them, and your recommendation, so one word answers it. Continue with the work that does not depend on the answer.

The catalog's other skills are tools for a step. Take one when the step's reason calls for what it does, and give it the contract where it asks for a spec. `shape` and `deliver` are a whole fixed route, so they stay out of this one. When evidence changes the route, the contract, or an assumption, tell the human then, in one line with its reason.

When the stakes are high, a fresh reviewer that gets the request and the contract, never your reasoning, reads the contract before the work starts.

When the contract is long, or the work will outlast your context or goes to an implementer, write the contract to a file outside version control and verify against that file. The message then says what it covers in plain words.

Done when every assumption the solution depends on is in the message, every contract line names its proof, and every step of the route has its reason.

## 3. Do the work

Do it yourself, or hand it to the implementer the user names, such as a cheaper model; when the harness cannot start it, do it yourself and say so. Before you hand it over, read [the handoff](references/handoff.md): what the brief holds, how to name the cause of each finding, and what the report adds.

## 4. Verify

A report that the work is done is a claim, whoever wrote it. Run each contract line's proof yourself on the final state. A proof someone else wrote must fail when its line is false, so read it against the line before you trust it. Read the whole change for what the contract did not ask for.

When the stakes are high, the fresh reviewer from step 2, or a new one with the same inputs, reads the change. When the harness cannot start one, say so in the report.

After a handoff, [the handoff](references/handoff.md) adds to this step and to the report.

Done when every contract line's proof passes in your own run on the final state, and every finding is fixed or in the report.

## 5. Report

End with a report the human can take in at one read. Lead with what is true now and how it works, drawn again when the picture changed, and with what they still have to do. Then give each contract line with its proof, what you could not prove and why, and what you decided alone since the opening message.
