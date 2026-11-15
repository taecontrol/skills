---
name: issue
description: "Write an issue or ticket that leaves the solution to whoever picks it up, then have a fresh agent check that it decides nothing nobody decided before publishing. Use when filing, writing, or rewriting an issue or ticket, including a plan's slices and work found and left for later."
---

# Issue

The reader is the **implementer**, the person or agent who picks the issue up later, and the teammates who follow the work. They know the product, not the conversation that produced the issue. The implementer investigates and chooses the solution, so the issue gives them the whole problem: what we want and why, what we expect once it is done, and what is already known. Whatever the issue states, they take as settled and build on without questioning it, so it states only what is settled: facts with their source, and decisions a person made.

## 1. Gather

Collect what the implementer cannot recover alone, each item with its source:

- **Observed:** a reproduction, a run, a spike, or code you read, with where it shows the fact.
- **Decided:** a choice a person made, with who made it by role, such as "the maintainer", when, and why.
- **Reported:** what someone told you, such as a bug report, attributed by role.

Everything else you think about the work is your **opinion**: the fix you would try, the cause you suspect, a rule, a limit, a number, the shape of the code. That is the implementer's to decide after they investigate, so it stays out of the issue. When the issue comes from a spec or a plan, take from it only the problem, the outcome, and the human's decisions; the rest is that design's, and the implementer makes their own.

Done when every item you mean to state is observed, decided, or reported, with its source.

## 2. Write

Title: the outcome or the symptom, readable on its own.

The issue answers the implementer's questions, in this order. They are questions, not a template: give each the heading and space this issue needs, or none. A small issue answers them in a few short paragraphs, and most read in about a minute.

1. **What we want and why.** The problem or goal, who has it, and what it costs them, in a few lines a reader new to the work understands.
2. **What we expect once it is done.** What the person with the problem can do, or no longer suffers, in their terms. The outcome is what the implementer must deliver; the behavior that produces it is theirs to design.
3. **Out of scope, and why.**
4. **What is known.** The facts and the decisions from step 1. A decision carries its reason, so the implementer can see why it holds.

A fact or decision enters only when, without it, the implementer would build something else or spend long finding it. One that another document already states, such as the plan, gets a link instead of a copy.

Name things the way the product names them. A file or function name enters only as a fact, such as where a failure shows, never as the place a change should go.

When the project has an issue template or written conventions, answer these questions inside them. Earlier issues show what the project discusses, not a structure to follow. Write in the language the team reads, with `writing-for-people`, and within the repository's visibility, as `pr-description` describes it.

Done when the issue answers each question it has an answer to, and every statement beyond the problem, the outcome, and the scope is a fact or a decision from step 1.

## 3. Verify

Give a fresh agent only the title, the issue, the items from step 1 with their sources, and this skill's first paragraph. Its review includes `writing-for-people`'s cold read and also returns:

1. **What it understood.** In one sentence each, what we want and what we expect once it is done.
2. **Decisions nobody made.** Every sentence that settles something no person decided and no source shows: a solution, a rule, a limit, a number, a behavior, an example, a design.
3. **Each fact, traced** to its source by opening it.

Cut each sentence under 2, and each fact its source does not show. A cold-read question whose answer would be a decision stays open for the implementer to settle; it is not a gap to fill. When its sentences differ from yours, rewrite the parts that misled it. When the harness offers no fresh context, do the review yourself and say so in your report.

Done when the latest review finds no decision nobody made, no unsupported fact, and its sentences match yours.

## 4. Publish

Show the human the draft, then create the issue from a file, such as `gh issue create --body-file`, with the project's labels.

Done when the issue shows the verified text.
