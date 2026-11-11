---
name: adapt
description: "Work one task through a process designed for that task, instead of the fixed `shape` and `deliver` workflow. User-invoked only."
disable-model-invocation: true
---

# Adapt

Each task gets the process it needs. You design that process, the **route**, from the task and its stakes. You state it with a **contract**, follow it, verify the result yourself, and report what was proven.

The route chooses which work the task needs. How each kind of work is done belongs to the catalog skill that **owns** it, because that skill holds what earlier tasks taught about it. The steps below name each owner. When the route reaches its work, load the skill and follow it, with the contract where it asks for a spec. Its description only says when it applies: its text says what it asks, and its own gate is what says this task can go without it. The catalog's other skills are tools for a step: take one when the step's reason calls for what it does. `shape` and `deliver` are a whole fixed route, so they stay out of this one.

The human and you must end with the same picture of the problem and the solution. Count on them seeing a message only when you **stop**, which is to end your turn on it. Many interfaces fold what you write before more work among your tool calls, and a human busy with other work reads the message a turn ends on. So the text before it is **notes**: it serves you, and they do not read it. Whatever they must see is the last message of a turn.

A stop interrupts their other work, and the task waits until they answer. Choose to stop in two places: where a decision is theirs, and at the end with the report. A turn can also end for another reason, such as a long command still running. Whatever ended the turn, its last message stands alone, because it may be the first thing they see since their request. It opens with the task and where it stands, and gives the idea before the detail and no more than the three to five new things a person holds at a time.

Write in the user's language. Write every message that ends a turn with `writing-for-people`, and keep notes plain and short.

## 1. Understand

Read the request, the code it touches, its history, and where the product runs.

The request is a hypothesis about a problem. Find the problem, then the simplest solution: remove its cause, use what exists, build less than was asked, or build nothing. Be brave in what you question and cut. Build only what the problem needs; an addition you believe in is a one-line proposal to the human, in the message you stop on or in the report.

When the request reports something the human saw, establish how they met it: what ran, where, and what it showed. Reproduce it that way when you can. A reproduction in a different setup checks your setup, not theirs, and what you cannot establish is a fact only they hold.

When the task designs or changes code beyond a mechanical edit, load `strategic-programming`, which owns how code is designed, written, and proven. Its test for a piece decides what gets built, in this step and every later one. The code that exists is a hypothesis too, and so is what an earlier issue or design handed down: judge both as its "Minimize owned machinery" says.

Every fact the problem or the solution rests on is a **premise**: how a client, a library, a runtime, or a service behaves, what a setting does, what the code allows. Check each premise before you rely on it, recommend from it, or give it to the human as what an option changes. A premise is checked when you read it in the code or system it is about, or observed it, and the check would have come out differently if the premise were false. A test that sidesteps the premise checks a neighbor of it. Documentation, issues, and reports are claims: run the thing to see whether they hold, and cite them as claims where you cannot. A feature the documentation leaves out is unknown, so observe it. Seek evidence against each premise, and give the human what you find, including what you already read. An observation holds for the setup it ran in: its client, server runtime, network path, mode, version, configuration, and the instructions the model ran with. It holds for another setup only once you run it there. A conclusion you draw from premises is reasoning: give it as reasoning, beside the premises it stands on. Each premise ends checked or asked: when checking it needs access, an account, or a fact only the human has, or costs more than the stakes justify, it is a question for step 2.

Weigh the **stakes**: what the change makes hard to undo, which is production itself and each **one-way door** of the kinds `architect`'s description names; who a mistake hurts; and who reviews the result, by what bar. The stakes set how much process the task gets. Its size does not. A typo in a billing email can need a second reader, and a large rename can need none.

Done when you can state, each from something you read or ran: the problem as far as it is known, what the task should produce (a change, a diagnosis, a decision, or nothing), and the stakes. Your notes list each premise the problem and the solution rest on, with how you checked it or the question it became.

## 2. Stop for what is theirs

A decision is the human's when:

- more than one solution would solve the problem, and they differ in what someone uses or sees, or in the mechanisms the project owns afterwards;
- the solution changes something the human decided and recorded, such as an ADR, an accepted spec, or an instruction;
- the problem or the solution rests on a fact only they hold, so that if it is false the problem or the solution is another;
- a premise could not be checked, as step 1 says;
- the scope differs from what they asked;
- something is hard to undo, or reaches other people unasked.

`architect` owns each one-way door the solution passes through. Its gate, not the request or your own sense of the choice, decides whether a door is already settled or safely reversible. For a door the gate keeps open, the step where `architect` agrees its result with the human is this stop.

When a decision is theirs, check the premises its options rest on, then stop before you build. A human who chooses between options built on unchecked premises chooses blind. After one read of the message, the human can explain the problem and the solution to someone else, and can tell what you observed from what a source only claims. After its opening line, it holds, in this order:

- **The decisions.** Each with its options, what each one changes for them, and your recommendation, so one word answers it. A premise you could not check is one question: the fact only they hold, the access you need from them, or whether to go on without the check.
- **The problem.** What is wrong or missing, and its cause. Beside it, what you read or ran that shows it.
- **The solution.** What the task will produce if they take your recommendation. For a change, say what exists today, what changes, and why this is the simplest form. Draw it when it has parts, a flow, or a before and after. Then give the other solutions you weighed, one line each with why it loses.
- **Where it lands.** One line: what they will receive, such as a commit, a pull request, or an issue, and what will be left for them to do.

Until they answer, the question is the work that is owed, and this holds over any general instruction to keep working. Only an answer to the question settles it. When they reply about something else, answer that and ask again in the same message.

An answer holds while the premises its options rested on hold. When a check contradicts one, the decision is open again: give what you found and ask again.

When none applies, one solution fits the problem and everything you chose is a detail. Go on to step 3 without a message. When you doubt which case this is, stop. A stop that was not needed costs the human one word. Work built on a decision they did not make costs them a review of all of it.

Done when every decision that is the human's has their answer, and every one-way door has `architect`'s result.

## 3. Write the contract and the route

Write them as notes, as short as the stakes allow.

- **Contract.** What will be true when the task is done, and what the stakes say must stay true, as lines you can check. A line someone relies on is a **guarantee**: state it where they act on it, such as the page an approver reads or the entry point the runtime calls, with its **path**, the links from where its data is produced to there. Each line names its proof: an observation that fails when the line is false, and for a guarantee when any link of its path breaks, such as a test, a command's output, or a screen.
- **Route.** The steps you will take, through to where this project's work lands for review, such as a commit, a pull request, or an issue, each with the reason this task needs it.
- **Decided for them.** Each detail you chose that the solution depends on, one line each, with what changes if it is wrong: a value you chose, where it departs from the code's pattern, and the stakes as you weighed them. A premise or a one-way door is never one of these: step 1 checks or asks the first, and step 2 settles the second. The human first sees these in the report, so each must be cheap to reverse there. One that is not is a decision of theirs, and step 2 applies.

When evidence changes the route, the contract, or something you decided for them, note the change and its reason for the report. A premise that surfaces later in the work is checked or asked as step 1 says, before anything relies on it. When evidence or the work itself raises a decision of step 2's kinds, settle it as step 2 says before any work depends on the answer.

When the stakes are high and the task changes code, `program-design` owns the shape of that code, with the contract as its spec. Its gate decides whether the change needs a design.

When the stakes are high, the work follows only what a fresh reviewer has read: the contract, each design, and after a handoff the brief and the tests you hand over. It gets those and the request, never your reasoning. It reports each case nothing covers and each piece the work could lose. Send what you change for it back to it.

When the contract is long, or the work will outlast your context or goes to an implementer, write the contract to a file outside version control and verify against that file.

Done when every contract line names its proof, every step of the route has its reason, and every detail the solution depends on is noted with what changes if it is false.

## 4. Do the work

Do it yourself, or hand it to the implementer the user names, such as a cheaper model; when the harness cannot start it, do it yourself and say so in the report. Before you hand it over, read [the handoff](references/handoff.md): what the brief holds, how to name the cause of each finding, and what the report adds.

## 5. Verify

A report that the work is done is a claim, whoever wrote it. Run each contract line's proof yourself on the final state. A proof someone else wrote must fail when its line is false, so read it against the line before you trust it. Read the whole change for what the contract did not ask for.

When the stakes are high, `pr-review` owns the review of the change. A fresh agent runs it on the committed change, given the branch and the request and nothing of yours, because a reviewer that has the contract checks the change inside the contract's frame. Fix its blocking findings in live cases. The rest go in the report, each improbable one with its line. When the harness cannot start a fresh agent, say so in the report.

After a handoff, [the handoff](references/handoff.md) adds to this step and to the report.

Done when every contract line's proof passes in your own run on the final state, and every finding is fixed or in the report.

## 6. Report

The report is the last stop. When step 2 needed none, the human has seen no plan, so the report carries the whole picture in one read.

Lead with what is true now and how it works, drawn when it has parts, a flow, or a before and after, and with what they still have to do. Then give the problem, each premise the problem and the solution rest on with how you checked it, why this solution over the others you weighed, each contract line with its proof, what you could not prove and why, what you decided for them, each with what changes if it is wrong, and each improbable case with its line.
