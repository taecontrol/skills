---
name: domain-language
description: Use the project's accepted domain vocabulary consistently across conversation, code, tests, documentation, design, and plans. Resolve and record only material vocabulary conflicts encountered during active work.
---

# Domain language

Treat the project's glossary as shared working memory, secondary to the active task.

## Work

1. **Read.** When a canonical domain glossary exists, read the entries relevant to the active work. Otherwise, continue without creating one merely because this skill was invoked.
2. **Use.** Reuse accepted terms and meanings consistently in conversation, code identifiers, tests, documentation, design, and plans. When the user uses another word, preserve their intent and connect it briefly to the accepted term when that aids understanding.
3. **Resolve.** Intervene only when a missing, ambiguous, overloaded, or contradictory term would make the active work inconsistent or confusing. Ask one concise question or propose one plain definition. Use an example only when it is the shortest way to distinguish meanings.
4. **Record.** When the user explicitly settles a term, update the canonical glossary in its existing format with the smallest exact change. A normal entry is a term and a one- or two-sentence definition. Add an avoided term only for a real collision, and qualify context only when the same word actually has different meanings. If no glossary exists, create one only after the user accepts both the need and its location.
5. **Resume.** Return immediately to the original task. Mention the vocabulary change only when it affects the result or the user needs its location.

## Boundaries

- Reading and following an established term requires neither a glossary edit nor a separate report.
- Keep requirements, workflows, architecture, implementation decisions, and rationale in their own artifacts; the glossary only stabilizes language.
- Leave stylistic naming preferences and generic programming terms outside the domain glossary.
- When sources conflict, surface the conflict instead of silently choosing a new canonical meaning.

## Completion criteria

The active work uses the accepted vocabulary consistently, any material ambiguity is explicit, and any glossary edit is minimal, accepted, and secondary to the original task.
