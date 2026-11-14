---
name: writing-for-people
description: "Decide what a person needs from a text before you write it, then write it so they understand it on the first read, and finish it with `unslop`. Use before you write any text a person reads: a message or report to the user, an issue, comment, ticket, pull request, document, README, slide, UI copy, or a message to a colleague."
---

# Writing for people

The reader is smart and was not in the room. They know their own work, not this one: not its IDs, its files, the earlier messages, or the process that produced it. You know what you meant, so you cannot see what they lack. Write from what they know, and let a cold reader find what you missed.

Once loaded, this skill stays in force for the rest of the conversation. Steps 1 to 3 apply to each text; step 4 applies to each text that leaves the conversation. When another agent writes the text for you, name this skill and `unslop` in its prompt.

## 1. Frame

Name the reader, what they already know, and what they must do after reading: decide, act, review, or understand. When several people read it, write for the one who knows least of the work.

Done when you can say in one sentence who reads it and what they do next.

## 2. Choose the content

- **Lead with what they came for.** When they asked a question, the first lines answer it. Otherwise lead with the decision, the ask, or the conclusion. A reader who comes to the message from other work, such as a user running several agents, gets the task and where it stands in the opening line.
- **Self-contained.** Everything the reader needs to act is in the text: the URL, the exact command or line, where to run or click it, which permissions it needs, where a value comes from, the questions themselves. Show a design, a list of questions, or a thread before you ask the reader to accept or answer it.
- **Context at each point.** Explain each ID, code, number, acronym, and project term in a few words where it appears, or replace it with what it means. A glossary, a context tab, or a section elsewhere adds to this; it does not replace it.
- **Evidence.** Put the proof beside each claim the reader will act on: the test, the command's output, or the exact line. A longer explanation raises their trust without making the claim more true. Say in the first person what you verified and how, what you assumed, and what you did not check.
- **The why.** Give each decision, recommendation, deferral, new piece, and request its reason, and what it changes for the reader.
- **Concrete.** Explain an idea with one example, built from the reader's own data when it exists.
- **Decisions.** When the reader must decide, give two or three options, each with its consequence in plain words, then your recommendation, marked as yours, with what would make it wrong.
- **Durable.** Text that other people read states what is true of the product, the code, or the decision. Material from how the work was made becomes one of those through [process material](#process-material), or stays out.
- **Lean.** Every sentence tells the reader something they need and do not already have. A line that repeats what a chart, table, or screen already shows, an obvious point, a note about the text itself or about who reads it, and words carried over from your own instructions all fail that test. A document states; questions for its readers go in the message that shares it.

Done when every item above holds for every part of the text.

## 3. Write

- Explanations and stories are prose. A numbered list is for steps the reader performs in order. A table is for data compared across the same columns. A diagram is for a structure the reader does not already know: parts and how they relate, a flow with branches, states, or a before and after. Put its labels inside it, use a notation the reader knows, keep it readable at phone width, and cut the prose it replaces.
- Use common words and short sentences, one idea each. In English, follow ASD-STE100 Simplified Technical English. In Spanish, follow UNE-ISO 24495-1:2024 plain language: familiar words, short direct sentences, natural Spanish instead of translated English idioms, and the reader's register, tú or usted.
- Run `unslop` on the result, and again on every later edit, including fixes from the cold read. Load the `unslop` skill when it is not already in this conversation; its rules applied from memory are not a pass.

Done when an `unslop` pass on the current text finds nothing left.

## 4. Cold read

For text that leaves the conversation, such as an issue, ticket, pull request, wiki page, README, slide, or message to a colleague, read it cold once steps 1 to 3 are done. A cold read or a check of the text's claims adds to those steps and replaces none of them.

1. Give a fresh agent only the text and one line on who reads it. It saw none of the work. It returns every term or reference it cannot resolve from the text alone, every question it would ask before acting, every sentence it could lose without acting differently, and in one sentence what it understood the text asks of its reader.
2. Resolve each term it could not, answer each question in the fewest words, and cut what it could lose. When the harness offers no fresh context, do the read yourself and tell the user.
3. Show the user the draft before you publish or send it, and again after any later edit.

`pr-description`'s verification includes this read.

Done when every cold-read finding is resolved, answered, or cut, an `unslop` pass followed the last edit, and its sentence matches what step 1 named.

## Process material

Material from how the work was made is what most often turns a text into one only its author can read. Each kind becomes a statement about the product, the code, its risk, or its verification, or it stays out:

| From the work | In the text |
|---|---|
| Spec examples, acceptance criteria, and their IDs | The behavior itself, in plain words |
| Review rounds and the fixes they produced | A risk they exposed, when the reader needs it |
| Departures from a spec or design the reader cannot open | The decision and its reason |
| Spike or experiment results | The conclusion, where it backs a decision |
| Findings only a later change needs | That change's issue, linked |
| Workflow phases and steps, and skill, agent, tool, or model names | Nothing |
| Terms coined during the work | The words the code and the team already use |
| Local paths, throwaway files, unmerged branches, links the reader cannot open | The durable thing they point to, or nothing |

What the person who ran the work needs, such as deviations from a spec, review rounds, and changed assertions, goes in your report to them.
