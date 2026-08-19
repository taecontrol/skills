---
name: unslop
description: "Edit human-facing prose to remove AI filler while preserving the artifact's technical and language fidelity."
license: MIT
---

# Unslop

Use this as a final editing pass for prose written for people: messages, documentation, reports, explanations, release notes, and similar communication. It is not a default rewrite for code, structured data, agent instructions, quotations, legal text, or artifacts whose exact syntax is material. The artifact's governing style and required structure take precedence.

This skill improves expression. It does not decide content, invent evidence, or replace technical review.

## Edit pass

1. Identify the audience, purpose, target language, and any governing style or required structure.
2. Preserve material content before editing: facts, uncertainty, claims with sources, code, commands, identifiers, domain terms, quotations, legal wording, and required syntax.
3. Replace filler and vague claims with concrete information. Remove chatbot acknowledgements, praise, puffery, promotional language, generic conclusions, unsupported attribution, repeated framing, and excessive hedging.
4. Prefer direct verbs, active voice when the actor matters, plain words, stable terminology, and sentences that do not require backtracking. Keep passive voice when the actor is unknown or irrelevant.
5. Remove unnecessary jargon and decorative structure. Treat frequent em dashes, parentheses, colons, bold labels, title case, emojis, and curly quotes as cues to review for overuse, not absolute bans. Retain any form that is correct for the language, style, quotation, or technical content.
6. Keep a natural human voice appropriate to the artifact. Add personality or opinion only when the authorial voice calls for it; neutral evidence remains neutral.
7. Read the result in its target language. Preserve natural Spanish punctuation and phrasing. Do not force English rhythm or idioms onto Spanish or another language.
8. Verify that the revised prose says the same thing, retains every material qualifier and technical distinction, and makes no claim stronger than its evidence.

## Completion criteria

The pass is complete only when all of the following are true:

- The artifact is human-facing prose, and its governing style or structure was identified.
- All material code, identifiers, quotations, legal wording, required syntax, domain language, and technical distinctions remain faithful.
- Unsupported attribution, puffery, chatbot filler, generic conclusions, and repeated framing were removed or replaced with concrete supported content.
- The prose has clear actors and actions where they matter, stable terminology, and no sentence that requires avoidable backtracking.
- The result reads naturally in its target language and preserves language-specific punctuation and phrasing.
- The edit neither invents evidence nor changes the artifact's intended meaning, decision, or required format.

## Provenance

- Canonical package: `unslop`.
- Upstream repository: `https://github.com/cursor/plugins`.
- Upstream revision: `60c641e4fad674784b30abcf9f8915dea39df38d`.
- Upstream path: `pstack/skills/unslop/SKILL.md`.
- MIT disposition: the upstream `pstack` plugin declares MIT; this material adaptation incorporates substantial editing guidance. Author declared by the plugin: Lauren Tan. The adapted package remains distributed under MIT.
- Incorporation mode: material language and artifact-scope adaptation.
- Taecontrol changes: limits the pass to human-facing prose; protects code, quotations, identifiers, domain language, legal wording, and required syntax; preserves technical and language fidelity; treats punctuation restrictions as overuse signals rather than absolute rules; leaves neutral evidence neutral; makes the pass final communication editing rather than content or technical verification.
