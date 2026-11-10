---
name: adapt
description: "Work one task through a process designed for that task, instead of the fixed `shape` and `deliver` workflow. User-invoked only."
disable-model-invocation: true
---

# Adapt

Each task gets the process it needs. You design that process, the **route**, from the task and its stakes. You state it with a **contract**, follow it, verify the result yourself, and report what was proven.

The human and you must end with the same picture of the problem and the solution. Count on them seeing a message only when you **stop**, which is to end your turn on it. Many interfaces fold what you write before more work among your tool calls, and a human busy with other work reads the message a turn ends on. So the text before it is **notes**: it serves you, and they do not read it. Whatever they must see is the last message of a turn.

A stop interrupts their other work, and the task waits until they answer. Choose to stop in two places: where a decision is theirs, and at the end with the report. A turn can also end for another reason, such as a long command still running. Whatever ended the turn, its last message stands alone, because it may be the first thing they see since their request. It opens with the task and where it stands, and gives the idea before the detail and no more than the three to five new things a person holds at a time.

Write in the user's language. Write every message that ends a turn with `writing-for-people`, and keep notes plain and short.

## 1. Understand

Read the request, the code it touches, its history, and where the product runs.

The request is a hypothesis about a problem. Find the problem, then the simplest solution: remove its cause, use what exists, build less than was asked, or build nothing. Be brave in what you question and cut. Build only what the problem needs; an addition you believe in is a one-line proposal to the human, in the message you stop on or in the report.

When the request reports something the human saw, establish how they met it: what ran, where, and what it showed. Reproduce it that way when you can. A reproduction in a different setup is an assumption about theirs, and what you cannot establish is a fact only they hold.

The code that exists is a hypothesis too. Before you repeat a pattern or build around what the code holds, judge it as `strategic-programming`'s "Minimize owned machinery" says.

Weigh the **stakes**: what the change makes hard to undo, such as persisted data, a contract others call, a security boundary, or production itself; who a mistake hurts; and who reviews the result, by what bar. The stakes set how much process the task gets. Its size does not. A typo in a billing email can need a second reader, and a large rename can need none.

Done when you can state, each from something you read or ran: the problem as far as it is known, what the task should produce (a change, a diagnosis, a decision, or nothing), and the stakes. You can also name what about the problem you still assume.

## 2. Stop for what is theirs

A decision is the human's when:

- more than one solution would solve the problem, and they differ in what someone uses or sees, or in the mechanisms the project owns afterwards;
- the solution changes something the human decided and recorded, such as an ADR, an accepted spec, or an instruction;
- the problem or the solution rests on a fact only they hold, so that if it is false the problem or the solution is another;
- the scope differs from what they asked;
- something is hard to undo, or reaches other people unasked.

When one applies, stop before you build. After one read of the message, the human can explain the problem and the solution to someone else, and can tell what you checked from what you assumed. After its opening line, it holds, in this order:

- **The decisions.** Each with its options, what each one changes for them, and your recommendation, so one word answers it. A fact only they hold is one question.
- **The problem.** What is wrong or missing, and its cause. Beside it, what you read or ran that shows it, and what about it you still assume.
- **The solution.** What the task will produce if they take your recommendation. For a change, say what exists today, what changes, and why this is the simplest form. Draw it when it has parts, a flow, or a before and after. Then give the other solutions you weighed, one line each with why it loses.
- **Where it lands.** One line: what they will receive, such as a commit, a pull request, or an issue, and what will be left for them to do.

Until they answer, the question is the work that is owed, and this holds over any general instruction to keep working. Only an answer to the question settles it. When they reply about something else, answer that and ask again in the same message.

When none applies, one solution fits the problem and everything you chose is a detail. Go on to step 3 without a message. When you doubt which case this is, stop. A stop that was not needed costs the human one word. Work built on a decision they did not make costs them a review of all of it.

Done when every decision that is the human's has their answer.

## 3. Write the contract and the route

Write them as notes, as short as the stakes allow.

- **Contract.** What will be true when the task is done, and what the stakes say must stay true, as lines you can check. Each line names its proof, an observation that fails when the line is false, such as a test, a command's output, or a screen.
- **Route.** The steps you will take, through to where this project's work lands for review, such as a commit, a pull request, or an issue, each with the reason this task needs it.
- **Decided for them.** Each detail you assumed or chose that the solution depends on, one line each, with what changes if it is false: a value you chose, where it departs from the code's pattern, and the stakes as you weighed them. The human first sees these in the report, so each must be cheap to reverse there. One that is not is a decision of theirs, and step 2 applies.

The catalog's other skills are tools for a step. Take one when the step's reason calls for what it does, and give it the contract where it asks for a spec. `shape` and `deliver` are a whole fixed route, so they stay out of this one.

When evidence changes the route, the contract, or something you decided for them, note the change and its reason for the report. When it raises a decision that is theirs, stop as step 2 says, before any work that depends on the answer.

When the stakes are high, a fresh reviewer that gets the request and the contract, never your reasoning, reads the contract before the work starts.

When the contract is long, or the work will outlast your context or goes to an implementer, write the contract to a file outside version control and verify against that file.

Done when every contract line names its proof, every step of the route has its reason, and every detail the solution depends on is noted with what changes if it is false.

## 4. Do the work

Do it yourself, or hand it to the implementer the user names, such as a cheaper model; when the harness cannot start it, do it yourself and say so in the report. Before you hand it over, read [the handoff](references/handoff.md): what the brief holds, how to name the cause of each finding, and what the report adds.

## 5. Verify

A report that the work is done is a claim, whoever wrote it. Run each contract line's proof yourself on the final state. A proof someone else wrote must fail when its line is false, so read it against the line before you trust it. Read the whole change for what the contract did not ask for.

When the stakes are high, the fresh reviewer from step 3, or a new one with the same inputs, reads the change. When the harness cannot start one, say so in the report.

After a handoff, [the handoff](references/handoff.md) adds to this step and to the report.

Done when every contract line's proof passes in your own run on the final state, and every finding is fixed or in the report.

## 6. Report

The report is the last stop. When step 2 needed none, the human has seen no plan, so the report carries the whole picture in one read.

Lead with what is true now and how it works, drawn when it has parts, a flow, or a before and after, and with what they still have to do. Then give the problem with what you checked and what you assumed, why this solution over the others you weighed, each contract line with its proof, what you could not prove and why, and what you decided for them, each with what changes if it is false.
