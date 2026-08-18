---
name: developer-documentation-style
description: "Use when drafting or substantially revising developer-facing technical prose, including README sections, API documentation, tutorials, runbooks, release notes, and substantial technical explanations."
---

# Developer Documentation Style

Write developer documentation that helps a busy reader understand or act without translating chatbot prose. This skill supplies a writing discipline, not an artifact schema; a README, runbook, ADR, and API reference keep their own required structure.

## Scope and precedence

Apply this skill automatically to durable developer-facing prose and substantial technical explanations. Do not invoke it for short conversational replies, creative writing, product marketing, source code, or documents whose audience is not technical.

Use this precedence:

1. Explicit user, audience, and language requirements.
2. Project-specific terminology, templates, and style rules.
3. The artifact's governing skill or convention.
4. This skill.

Depart from a guideline when clarity for the actual reader improves, then remain consistent within the document.

## 1. Fix the writing contract

Inspect the request and available project context. Identify:

- the reader and what they already know;
- the outcome they need;
- the document type and where it will live;
- the language and locale;
- project terms, conventions, and stronger artifact rules.

Do not ask for facts that the request, repository, or source material already supplies. When a missing choice would materially change the document, state the ambiguity and resolve it before drafting.

Completion criterion: the audience, outcome, artifact, language, and controlling conventions are known or explicitly marked as assumptions.

## 2. Lead with useful information

Start with the information the reader came for. State the purpose, result, or required action before background that only explains it.

- Put prerequisites before the procedure that needs them.
- Put conditions before the instruction they govern: "If the cache is stale, delete it" rather than "Delete the cache if it is stale."
- Introduce a concept before relying on it in a task.
- Keep background beside the decision or action it explains.
- Delete pre-announcements such as "This section explains," "Let's look at," and "The following guide will show."
- Do not repeat the introduction as a generic conclusion.

Completion criterion: the opening tells the intended reader why the document matters and what to do or learn next without a ceremonial preamble.

## 3. Make actors and actions unmistakable

Prefer active voice and name the actor when responsibility matters. Passive voice is acceptable when the actor is unknown, irrelevant, or less important than the object.

- Address the reader directly when the language and project voice support it.
- Use imperative verbs for procedures: "Run," "Select," "Verify."
- Give each procedural step one judgeable goal; use substeps only when they belong to that goal.
- State who or what performs automatic behavior. Replace "The file is generated" with "The build generates the file" when the actor matters.
- Keep pronouns close to unambiguous referents. Repeat the noun when "it," "this," or "they" could point to several things.

Completion criterion: every obligation, instruction, and automatic behavior has a clear actor, action, and condition.

## 4. Use plain, stable language

Sound like a knowledgeable colleague: conversational, respectful, direct, and focused on the reader's task.

- Use one term for one concept. Do not cycle through synonyms for variety.
- Define unfamiliar terms and abbreviations at first use; omit abbreviations used only a few times.
- Keep necessary technical terms. Explain them instead of replacing them with less accurate everyday words.
- Prefer concrete verbs and nouns over abstract phrases and nominalizations.
- Remove filler, buzzwords, clichés, hype, unsupported significance claims, and decorative metaphors.
- Avoid calling a task "easy," "simple," "obvious," or "quick." Those words do not help someone who is blocked.
- Avoid slang, pop-culture references, excessive politeness, exclamation marks, and forced humor.
- Vary sentence length naturally. Do not turn clarity into choppy, mechanical fragments.

Completion criterion: the prose uses the simplest accurate language, stable terminology, and no phrase whose main purpose is ceremony or self-display.

## 5. Structure for scanning and accessibility

- Use sentence case for titles and headings unless the project requires another convention.
- Make headings describe the content beneath them; avoid generic labels such as "Overview" when a specific heading is available.
- Use numbered lists for sequences and bulleted lists for unordered sets.
- Use tables only when readers need to compare values across consistent dimensions. Do not put a procedure in a table.
- Use descriptive link text that identifies the destination or purpose; never use "here" or expose a raw URL as prose.
- Format code, commands, filenames, paths, parameters, and literal values consistently with the project's markup conventions.
- Distinguish user-interface labels from surrounding prose consistently.
- Use unambiguous dates and include a time zone when time can affect the action.
- Give informative alt text to claim-bearing images. Do not repeat adjacent captions in the alt text.

Completion criterion: a reader can scan the headings and lists, follow links out of context, and access every claim-bearing element without relying on visual styling alone.

## 6. Preserve technical fidelity

Clarity cannot come from removing necessary distinctions.

- Keep requirements, recommendations, options, examples, and observations visibly distinct.
- Separate current behavior from proposals and future behavior.
- Identify versions, environments, identities, permissions, and state when they can change the outcome.
- Make commands and identifiers exact. Never invent output, successful execution, or product behavior.
- When a command or procedure has not been verified, label that limit instead of writing as though it worked.
- Put warnings before the step that can cause harm, not after it.
- Include expected results or verification when the reader must know whether a procedure succeeded.
- Prefer a minimal representative example over several decorative examples.

Completion criterion: the document preserves every material condition and gives the reader an observable way to distinguish success from failure where the task requires one.

## 7. Adapt the style to the language

Transfer the clarity principles, not English grammar, into other languages.

- For English, use standard American spelling and the serial comma unless project style says otherwise.
- For Spanish, use natural syntax and the project's locale. Do not force explicit second-person pronouns, English punctuation, or literal translations of English technical idioms.
- For any language, preserve established product terms and consider readers who use the language as a second language.

Completion criterion: the result reads naturally in its target language while retaining direct instructions, stable terms, and globally understandable examples.

## 8. Run the anti-Chat-lish pass

Reread the draft only for language that announces, flatters, performs, or pads instead of informing.

Delete or rewrite:

- praise and chatbot acknowledgements that leaked into the artifact;
- "here's what you need to know," "let's dive in," and other signposting;
- empty transitions, generic summaries, and repeated conclusions;
- vague authority such as "experts say" without a named source;
- mechanical triads, dramatic fragments, slogan-like endings, and needless bold labels;
- repeated sentence openings and monotonous rhythm;
- claims made stronger, broader, or more certain than the evidence.

Keep warmth and personality when they help the reader. The target is clear human technical prose, not a restricted vocabulary or a sterile specification.

Completion criterion: every remaining sentence contributes information, navigation, reasoning, or a necessary human cue.

## Final verification

Before delivery, confirm all of the following:

- The first screen gives the intended reader useful information.
- The document follows project and artifact conventions before this skill.
- Conditions precede the instructions they govern.
- Actors, actions, terms, links, commands, and expected results are unambiguous.
- No unsupported claim, invented result, or hidden prerequisite remains.
- The target language sounds natural rather than translated from English.
- Headings, lists, code formatting, dates, and images are consistent and accessible.
- The final paragraph ends with substance rather than a generic offer, recap, or slogan.

Report material assumptions or unverified technical claims separately from the finished prose. Do not narrate the style pass unless the user asks for an editorial review.

## Sources and attribution

This skill adapts principles from the [Google developer documentation style guide](https://developers.google.com/style), especially its [highlights](https://developers.google.com/style/highlights) and [voice and tone](https://developers.google.com/style/tone) guidance. Google publishes the guide under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/). Consult the live guide for strict conformance or an editorial edge case; routine use should not fetch the full guide.
