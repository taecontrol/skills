---
name: strategic-programming
description: Strategic programming reference for Factory implementation, cleaning, and verification when invariants, boundaries, persistence, APIs, concurrency, security, or shared interfaces make green tests insufficient.
---

# Strategic Programming

Judge design quality by whether the change leaves the system easier to understand and modify.

## Factory role mapping

Use this as a shared standard; it does not replace Factory authority or lifecycle routing.

- **Coordinator** records accepted consequential decisions, protected behavior, and the validation path. It routes material uncertainty to discovery or human synchronization.
- **Implementer** creates the initial accepted vertical behavior and focused observable proof.
- **Cleaner** repairs local correctness and strategic design defects, runs applicable gates, and freezes the candidate for independent judgment.
- **Verifier** judges that immutable candidate independently and read-only against the accepted contract, gate evidence, and this design standard.
- **Product Validator** proves accepted journeys through a real product interface. It does not infer product correctness from code or technical gates.

A role that finds evidence challenging user-visible behavior, scope, sensitive policy, a public contract, or expensive-to-reverse architecture returns it to Coordinator synchronization rather than silently changing it.

## Design pressure

Before production edits, name the central invariant or policy, its authoritative source, its owner, and which callers should remain unaware of the hard detail.

For a consequential interface, boundary, ownership model, persistence model, or other expensive-to-reverse seam, **design it twice**: compare two plausible shapes and choose the one that hides more complexity with fewer caller obligations. Do not require alternatives for routine internal and reversible choices; resolve those locally.

## Interaction model

When shared mutable state, concurrency, ordering, retries, ownership transfer, lifecycle, rollback, or recovery is material, establish one coherent model covering every applicable dimension:

- owner and mutation or atomic boundary;
- correlation or fencing mechanism;
- late and repeated event behavior;
- cleanup and recovery behavior; and
- a negative probe capable of exposing a broken model.

A missing coherent model is a contract or architecture gap, not an invitation for local patches.

## Behavioral proof

Map each observable obligation to its narrowest faithful seam. Use a red-capable test or reproduction that fails on the old behavior or a plausible defect, then preserve current green evidence.

Cover failure, authorization, malformed input, migration, and fresh-versus-preserved state when they can change the result. An equivalent before/after reproduction can replace strict test-first work when necessary.

## Deep design

- **Deep modules:** hide substantial complexity behind small interfaces; make the common correct use easy.
- **Information hiding:** give each policy and design decision one implementation home.
- **Honest concepts:** keep distinct identities, sources, lifecycle states, fidelity levels, and failure modes distinct in names and types.
- **Direct invariants:** preserve authoritative facts instead of reconstructing them from weaker signals.
- **Boundary parsing:** convert unknown external or persisted data into safe application types at one boundary; let malformed optional detail degrade without breaking core behavior.

## Strategic pass

After focused proof is green, reread the diff for:

- **Change amplification:** one conceptual change requires unrelated edits.
- **Cognitive load:** callers or maintainers must know hidden detail.
- **Unknown unknowns:** policy, invariants, or failure behavior have no obvious home.

During implementation or cleaning, fix symptoms inside accepted decisions and record broader cleanup as residual risk with its concrete future cost. During verification, report each symptom with evidence and consequence while preserving the reviewed candidate unchanged.

Completion criterion: every material obligation has discriminating evidence; every applicable interaction dimension is modeled; every consequential choice received proportional design pressure; and every material complexity symptom is fixed by the write roles or reported by the Verifier with evidence and consequence.

## Provenance

- Canonical package: `strategic-programming` in `https://github.com/taecontrol/skills.git`.
- Source commit: `d7cef91264450e72ad28f396fbed28c3d2e22d2e`.
- Source basis: `docs/software-factory-v0.1.md` and `docs/software-factory-v0.1-skill-migration.md` at that commit.
- Incorporation mode: Taecontrol-authored evolution of the existing package; no external skill text copied in this migration.
- Taecontrol changes: adds explicit Coordinator, Implementer, Cleaner, Verifier, and Product Validator role mapping; scopes design-it-twice to consequential choices; and separates write-role cleanup from read-only independent judgment.
