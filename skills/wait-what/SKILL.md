---
name: wait-what
description: "User-invoked recovery when the last explanation did not land; re-explain naturally in Spanish or English."
license: MIT
---

# Wait, what?

Use this skill only when the user asks for a re-explanation or clearly says the previous message was not understood. Pause only the communication or decision thread that depends on the misunderstood message. Re-pitch the last message; do not introduce a new decision or advance that paused thread in the recovery response. Independent discovery may continue only when it neither depends on the clarification nor changes an unaccepted decision.

## Re-pitch

1. Detect the active conversation language from the user's current and recent messages. Use Spanish for a Spanish conversation and English for an English conversation, unless the user asks for the other language.
2. Start with one or two sentences that say what was being decided or reported and where the work stands.
3. Re-explain the prior message in short sentences, with one main idea per sentence.
4. Define each technical term or acronym before relying on it. Use the project's accepted vocabulary when it is known; otherwise use ordinary, accurate language.
5. Give one concrete example when the point remains abstract after the explanation.
6. Separate these parts when they apply: facts, decision, recommendation, and already-planned next action. Do not turn an explanation into a new question round or a new proposal.
7. End at the same decision or progress boundary where the original message stopped. Wait for the user before resuming the paused thread.

For English, use plain technical English. ASD-STE100 may guide wording but does not replace necessary domain terms. For Spanish, write natural plain Spanish; do not translate English technical idioms literally. Preserve exact names, commands, identifiers, quotations, and legal or technical wording when they are material.

## Completion criteria

The recovery is complete only when all of the following are true:

- It was triggered by the user, not selected automatically.
- It identifies the prior message's context and current boundary in one or two opening sentences.
- It uses the user's active language or the language the user requested.
- Each necessary technical term is defined before use, and an example appears when the concept would otherwise remain abstract.
- Facts, decisions, recommendations, and next actions are distinguishable.
- It introduces no new decision and does not advance the paused communication or decision thread beyond the re-explanation.
- Any continuing discovery is independent of the clarification and cannot change an unaccepted decision.

## Provenance

- Canonical package: `wait-what`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/productivity/wait-what/SKILL.md`.
- MIT disposition: MIT upstream; the upstream recovery concept and limited wording are materially adapted. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: material bilingual adaptation.
- Taecontrol changes: makes invocation human-only; detects Spanish or English and responds naturally in that language; replaces repository-specific vocabulary-file requirements with discovered accepted vocabulary; adds context, plain-language, example, separation, and no-progression rules; keeps technical terminology accurate.
