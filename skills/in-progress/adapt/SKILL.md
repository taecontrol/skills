---
name: adapt
description: "Work one task through a process designed for that task, instead of the fixed `shape` and `deliver` workflow. User-invoked only."
disable-model-invocation: true
---

# Adapt

Each task gets the process it needs. You design that process, the **route**, from the task and its stakes, state it with a **contract**, follow it, verify the result yourself, and report what was proven.

The **mode** is the kind of work in front of you: **build** behavior that does not exist, **fix** a failure someone met, **plan** work with the human, or **answer** a question. These steps are written for build; when you name another mode, read its file: [fix](references/fix.md), [plan](references/plan.md), or [answer](references/answer.md).

The route picks which work the task needs. How each kind of work is done belongs to the catalog skill that **owns** it: load that skill when the route reaches its work, and follow its process, with the contract where it asks for a spec. Its own gate, not you, says when the task can go without it. `shape` and `deliver` are a whole fixed route, so they stay out of this one.

The human sees a message only when you **stop**, which is to end your turn on it; what you write between tool calls are notes they do not read. A stop interrupts their other work, so stop where a decision is theirs and at the end with the report. Whatever ended the turn, its last message stands alone. It opens with the task and where it stands, then gives the idea before the detail, and no more than three to five new things. Write in the user's language, and write each message that ends a turn with `writing-for-people`.

## 1. Understand

Read the request, the code it touches, its history, and where the product runs. Treat the request as a hypothesis about a problem. Find the problem, then the simplest solution, which can be removing its cause, using what exists, building less than was asked, or building nothing. Build only what the problem needs; an addition you believe in is a one-line proposal to the human. When the task plans, designs, or changes code beyond a mechanical edit, load `strategic-programming`: its test for a piece decides what gets built, in every step and for every finding.

Every fact the solution rests on is a **premise**: how a client, library, runtime, or service behaves, what a setting does, what the code allows. Check each one in the code or system it is about before you rely on it or offer it to the human; documentation and issues are claims until you observe them. A check counts when it would have come out differently were the premise false, and it holds only for the setup it ran in: its client, runtime, mode, and version. The check is yours, with the access you hold, such as the project's secret store, its CLIs, and the deploy. A check that changes or sends something, shows data the product keeps private, or goes around one of its controls needs the human's word: ask once, saying how you will run it. A premise you cannot check becomes a question for step 2.

When the task changes code beyond a mechanical edit, run `program-design`'s gate, and `architect`'s for each kind of one-way door `architect` names that the change touches, before your first stop, because what they keep changes what you ask.

Weigh the **stakes** of each part of the change: what it makes hard to undo and who a mistake hurts. A part that crosses a one-way door or a boundary the product guards, such as a permission, an approval, or a message sent on someone's behalf, is high stakes and gets the fresh reviews in steps 3 and 5. Every other part gets the proof its contract lines name. A part is not high stakes because the product is.

Done when you can state, each from something you read or ran: the problem, what the task should produce (a change, a diagnosis, a decision, or nothing), the mode, each premise with its check or its question, the high-stakes parts, and each gate's result.

## 2. Stop for what is theirs

A decision is the human's when the solutions that would work differ in what someone uses or sees, or in what the project owns afterwards; when the solution changes something they decided and recorded; when it rests on a fact only they hold or a premise you could not check; when the scope or the mode differs from what they asked; when it is hard to undo or reaches other people; when it keeps a behavior an earlier issue handed down that `strategic-programming`'s test returns; and when the implementation is costly and nobody named who implements it. `architect`'s gate decides whether a one-way door is still open, and when it is, this stop is where its result is agreed. When the options differ in what people see, `prototype` makes them tangible first.

The message holds, after its opening line:

- **The decisions**, each with its options, what each changes for them, and your recommendation, so one word answers it. Who implements a costly change is one of them: you, or an implementer you confirmed the harness can start. When an option needs an act only they can do, such as an approval or a sign-in, run whatever waits on it in the background and stop with the request; every other step, checks included, is yours.
- **The problem**, its cause, and what you read or ran that shows it.
- **The solution** they get with your recommendation: what exists, what changes, why this is the simplest form, drawn when it has parts or a flow, and the other solutions in one line each.
- **The route**, one line per step to where the work lands, with each gate result and what they will receive.

Until they answer, the question is the work owed; when they reply about something else, answer it and ask again. When they tell you to go on without stopping, their decisions still stop: gather them into one message and keep working on what does not depend on them. A decision they made stays made; reopen it only when a check contradicts a premise it rested on, and show that check. When none of this applies, everything you chose is a detail: go on without a message. When you doubt which case this is, stop.

Done when every decision that is the human's has their answer.

## 3. Write the contract and the route

Write them as notes, as short as the stakes allow.

- **Contract.** What will be true when the task is done, as lines you can check, each naming its proof: an observation that fails when the line is false, such as a test, a command's output, or a screen. A line someone relies on is a **guarantee**: state it where they act on it, and prove each link of its path from where its data is produced to there.
- **Route.** The steps to where this project's work lands for review, each with the reason this task needs it.
- **Decided for them.** Each detail you chose that the solution depends on, with what changes if it is wrong. A premise, a one-way door, and a step of an owner skill's process are never details. One that is costly to reverse is a decision for step 2.

When `program-design`'s gate kept a part, run the rest of its process here with the contract as its spec; nothing is built until the human accepts the design. For a high-stakes part, a fresh reviewer reads the contract and each design before the human accepts them, briefed with what the work must do and what is under review, without your reasoning or what you prefer. It returns what is missing and what the work can lose; handle its findings as step 5 says.

A change to a route step the human saw in a stop goes back to them first.

When the work is a list taken over several turns, outlasts your context, or goes to an implementer, keep a [tracking file](references/tracking.md).

Done when every contract line names its proof, every route step has its reason, and the human has accepted each design a gate kept.

## 4. Do the work

Do it yourself, or hand it to the implementer the human named; when the harness cannot start that implementer, stop and offer the ones it can. Before you hand it over, read [the handoff](references/handoff.md).

## 5. Verify

A report that the work is done is a claim, whoever wrote it. Run each contract line's proof yourself on the final state, and read each proof someone else wrote against its line: it must fail when the line is false. Read the whole change for what the contract did not ask for.

When the change has a high-stakes part, a fresh agent runs `pr-review` on the committed change, given the branch, the request, and the high-stakes parts as its focus notes, and nothing of yours. When the harness cannot start a fresh agent, say so in the report.

Fix each finding in a live case that the reviewer ranks blocking, or does not rank, with the smallest piece that closes it, and put the others in the report, each improbable one as its line. Adopt each simpler form the reviewer gives, or answer it with evidence. A review gets at most three rounds, as `refine`'s Next round says. A third finding of the same class means a premise is wrong. Stop fixing, check whether the case is live and whether a simpler form removes the whole class, and stop with what you found.

Done when every contract line's proof passes in your own run on the final state, and every finding is fixed or in the report.

## 6. Report

The report is the last stop. Lead with what is true now and how it works, and what the human still has to do. Then the problem, the premises with their checks, each gate's result, why this solution, each contract line with its proof, what you could not prove, what you decided for them, each improbable case with its line, and what surfaced off the path.

## When other work surfaces

- **In the path**: it blocks the task, shares its cause, or would make a contract line false. Do it inside the task and say so in the next stop.
- **Off the path**: leave it, and give it one line at the end of the next stop: what you saw, and whether to do it here, write it up, or drop it. Nothing is written outside the task until the human chooses.
- **A decision or another mode**: a new mechanism, a fix that needs a design, or a failure that turns out to be decided behavior goes to step 2 before work depends on it.
