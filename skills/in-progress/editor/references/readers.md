# Reader panel

The panel is the readers the piece will meet. You build it in step 1 from the brief, record it in the piece file, and run it in steps 3, 5, and 8. Each reader is a separate agent, so the editor who diagnoses is never the one who reads.

## The readers

Two to four readers. Start from these and fit them to the piece:

- **The target reader** is the brief's reader, made concrete: what they already know, what they care about, why they would open this piece, and how they read it (on a phone between meetings, at a desk with time, skimming a newsletter).
- **The skeptic** knows the subject and disagrees with the claim. They look for the weakest support and the objection the piece leaves unanswered.
- **The newcomer** is smart and outside the field. They trip on jargon, skipped steps, and context the writer assumes.
- **The hurried reader** reads only the title, the opening, the headings, the first sentence of each paragraph, and the ending, then says what the piece claims.
- **The native reader** is a native reader of the piece's language who notices what reads as translated or borrowed from the writer's other language: calques and false friends in English, anglicisms in Spanish.

Add a reader the piece needs, such as the editor of the publication it is pitched to, or the person the piece answers. Drop one that would not meet this piece, such as the skeptic for a personal essay with nothing to dispute.

## Reading cold

You have heard the writer explain what they mean, so you fill gaps a reader cannot. The holes live in that gap. Each reader therefore reads **cold**: the draft and their own description, nothing from the conversation, the brief, or the notebook.

Dispatch each reader as a fresh subagent, in parallel, with this prompt filled in. When the writer asked only for what a reader understood, keep question 1 alone. When you cannot dispatch subagents, tell the writer, read as each one yourself, one at a time, judging only what is on the page, and weigh the result as weaker.

```text
You are <reader description>. You are reading this piece <where and how they read it>. As this reader, you notice <what this reader notices>.

Read it once, in order, as that reader. Then report what happened to you, in first person, in <the writer's conversation language>. Leave the fixes to the writer; report only your experience.

1. In one or two sentences: what does the piece say, and what do you take away?
2. Every place where you got lost, got bored, doubted a claim, wanted to ask the writer something, or stopped believing. For each, quote a few words to locate it and say what went on in your head.
3. What you expected to get and did not, what the piece seems to take for granted, and what it almost says without saying it.
4. Where you would have stopped reading, if anywhere, and why.

<the draft>
```

## From reports to holes

A **hole** is a place where the reader needs something the page does not give: a skipped step in the reasoning, a claim without support, an undefined term, an obvious objection left unanswered, a promise the piece does not keep, a jump in time or subject, a reference only the writer knows.

Simulated readers are clues, not verdicts: a model's reading of a described person may miss what that person would feel. Weigh their reports with that in mind.

1. Compare what the target and hurried readers say the piece says with the brief's claim. A mismatch is the first hole, and the largest.
2. Turn each reported moment into a hole: its place, which readers hit it, and what they experienced. A place two readers hit is likely real; one reader's reaction may be about that reader, so weigh it against the brief's reader.
3. Drop any rewording a reader offers; keep the experience behind it, and add your diagnosis of why it happened.
4. Order the holes by what each costs the target reader, record them all in the piece file, and present them as [each round](../SKILL.md#each-round) says.
