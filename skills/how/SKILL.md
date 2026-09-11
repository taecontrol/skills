---
name: how
description: "Explain how a subsystem works: architecture, runtime flow, and where things live. Use before changing code or when Design needs a working mental model. Use why for motivation."
disable-model-invocation: true
---

# How

Answer "how does X work?" with an architectural explanation a senior engineer could use to start work. Enough for a mental model; not annotated source.

Authority: read-only exploration. Does not edit production code, accept decisions, or update the goal map.

## Process

1. **Assess.** If scope is ambiguous, state your interpretation and explore. **Simple** (one module or narrow question): one explainer pass. **Complex** (multi-file subsystem, cross-cutting feature): parallel explorers, then one explainer. When in doubt, take the simple path.
2. **Explore (complex only).** Decompose into 2–4 distinct angles. Spawn readonly explorer agents (prefer configured `how explorer` model when present). Each traces its angle: entry points, ownership, data flow, failure paths.
3. **Explain.** One explainer (prefer configured `how explainer` model when present) synthesizes into: Overview; Key Concepts; How It Works (with a diagram when multiple parts move); Where Things Live; Gotchas. Drop sections that do not apply. Use concrete names (`UserService` calls `AuthClient.refresh()`), not abstraction-about-abstraction.
4. **Present.** Give the explanation to the caller. Light edits for conversation context are fine; do not rewrite into a different structure.

## Return

Return the explanation plus any open gaps. When used under Design, also note constraints the SPEC or architect sketch must honor.

Completion criterion: a reader unfamiliar with the area can describe the flow and know which files to open first.
