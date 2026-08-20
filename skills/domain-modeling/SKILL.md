---
name: domain-modeling
description: "Discover uncertain domain terms and invariants; persist only exact accepted meaning."
---

# Domain modeling

Clarify uncertain domain language, concept boundaries, and invariants. This skill discovers meaning. It does not implement production changes or decide material meaning.

## Process

1. State the uncertain term, relationship, rule, or invariant; why it affects the next decision; relevant accepted decisions and repository evidence; and scenarios that distinguish plausible meanings. Inspect existing glossaries, context maps, specifications, and code. Discover the repository's convention for durable domain artifacts.
2. Separate observed behavior, accepted meaning, proposed meaning, implementation detail, and architecture rationale. Resolve collisions, synonyms, overloaded words, and hidden distinctions with precise proposed terms.
3. Test each material term or invariant with ordinary, edge, and failure scenarios. Name the actor, starting state, action, required result, and prohibited result. Cross-check code, tests, and maintained documents. Treat contradictions as evidence, never as a silent redefinition.
4. Return proposed vocabulary, scenarios, contradictions, evidence, and material questions to the Coordinator.
5. Persist only on explicit Coordinator delegation tied to the current goal-map identity and human-acceptance identity, naming the exact canonical term, accepted definition, exclusions or invariant, artifact path, and destination fields. Compare every fact with the intended write before writing. A mismatch means no write and a Coordinator handoff. If no durable convention exists, return the smallest proposed destination and content instead of creating one.

Keep glossary and domain artifacts free of class names, storage, transport, implementation plans, and architecture rationale unless they are domain facts. An accepted consequential rationale may be handed to `adr` for recording after acceptance; this skill does not create an ADR.

## Return

Give the Coordinator the question, evidence, proposed vocabulary with exclusions, scenario outcomes, material questions, recommendation, and persistence result. The persistence result says either what exact accepted meaning was written and where, or why no write occurred and the next handoff.

Done means the evidence separates proposed from accepted meaning, every material rule has scenario evidence, contradictions remain explicit, and any persistence exactly matches accepted meaning and the repository convention.
