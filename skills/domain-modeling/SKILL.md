---
name: domain-modeling
description: "Discover and sharpen domain terms and invariants when the model is uncertain or changing; persist only accepted meanings."
license: MIT
---

# Domain Modeling

Use this discovery capability when domain language, concept boundaries, or invariants are uncertain or changing. It discovers the model; it does not implement production model changes, decide material meaning, or create architecture records as a side effect.

## Establish the model question

State the terms, relationship, rule, or invariant that is uncertain; why it changes the next decision; relevant accepted decisions and repository evidence; and the scenarios that would distinguish the plausible meanings. Inspect the repository's existing glossary, context map, maintained specifications, and relevant code before proposing vocabulary.

Discover the project's convention for durable domain artifacts. Do not assume `CONTEXT.md`, `CONTEXT-MAP.md`, an ADR directory, or a particular location exists.

## Discover and stress-test meaning

1. Separate observed behavior, accepted meaning, proposed meaning, implementation detail, and architecture rationale.
2. Challenge collisions, synonyms, overloaded words, and hidden distinctions. Propose one precise canonical term when it reduces ambiguity.
3. Test each material term or invariant with concrete ordinary, edge, and failure scenarios. Identify who acts, the starting state, the action, required result, and prohibited result.
4. Cross-check stated meaning against code, tests, and maintained documentation. Record contradictions as evidence, not as a silent redefinition of the model.
5. Keep glossary terms and behavior descriptions free of class names, storage choices, transport details, and other implementation design unless that detail is itself a domain fact.

## Persist accepted terms only

Return proposed terms, scenarios, contradictions, evidence, and material questions to the Coordinator. The Coordinator owns human synchronization. This skill does not invoke acceptance or treat discussion, silence, or a plausible recommendation as accepted meaning.

Persist a term or invariant only when the Coordinator supplies acceptance evidence and the repository convention is known. That evidence must identify the exact canonical term, its accepted definition, its exclusions or invariant, and the destination artifact fields. Compare all four facts against the intended write before writing. On any mismatch, make no write and return the mismatch plus a Coordinator handoff. Write only the accepted glossary or domain artifact fields; keep behavior specifications, implementation plans, and architecture rationale in their appropriate artifacts. If no durable convention exists and persistence is warranted, return the minimum proposed destination and content to the Coordinator rather than creating a universal convention.

When an accepted consequential rationale would remain missing from code and maintained documentation, the optional `adr` skill can record it after acceptance. If that skill is unavailable, return the rationale gap and the minimum recording handoff. No sibling filesystem path is required, and no ADR is created automatically.

## Return evidence

Return this compact result to the Coordinator:

```text
Question: <uncertain term, relationship, rule, or invariant>
Evidence: <repository fact, scenario result, or contradiction — pointer> …
Proposed vocabulary: <term — precise meaning — exclusions> …
Scenarios: <ordinary, edge, and failure scenario outcomes>
Material questions: <human-owned decisions, if any>
Persistence: <written: exact term — accepted definition — exclusions/invariant — artifact path and destination fields — acceptance identity | no write: mismatch or reason — Coordinator handoff and proposed destination>
Recommendation: <next decision or capability>
```

Production changes implied by the model enter an accepted vertical slice and the complete delivery lifecycle; this discovery evidence does not authorize them.

## Completion criteria

Domain modeling is complete only when all of the following are true:

- The uncertain model question, its decision relevance, and the evidence inspected are explicit.
- Proposed terms distinguish synonyms, overloads, and exclusions where ambiguity exists.
- Ordinary, edge, and failure scenarios test every material proposed invariant or relationship.
- Code and maintained-document contradictions are reported as evidence and are not silently reconciled.
- The result separates proposed and accepted meaning from behavior specification, implementation design, and architecture rationale.
- A durable domain artifact changed only when the repository convention was known and acceptance evidence identified the exact term, definition, exclusions or invariant, and destination fields.
- The intended write was compared against that acceptance evidence; any mismatch produced no write and a Coordinator handoff.
- Otherwise the result records that no term was persisted, its reason, and the minimum proposed destination where persistence is warranted.
- Any consequential rationale gap has an optional `adr` handoff or an equivalent minimum handoff, without automatic ADR creation.

## Provenance

- Canonical package: `domain-modeling`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/engineering/domain-modeling/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates and restructures the upstream domain-modeling procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: material persistence and authority adaptation.
- Taecontrol changes: makes the capability Coordinator-selected discovery; discovers rather than assumes domain-artifact conventions; requires scenario and repository-evidence cross-checking; persists only Coordinator-evidenced accepted terms; separates glossary, behavior, implementation, and rationale; and offers an optional post-acceptance ADR handoff without a sibling-path dependency or automatic ADR creation.
