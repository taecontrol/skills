---
name: strategic-programming
description: Strategic programming reference for implementing or reviewing non-trivial software changes where invariants, boundaries, persistence, APIs, concurrency, security, or shared interfaces make green tests insufficient.
---

# Strategic Programming

Judge design quality by whether the change leaves the system easier to understand and modify.

## Design pressure

Before production edits, name the central invariant or policy, its authoritative source, its owner, and which callers should remain unaware of the hard detail.

For a new interface or boundary, **design it twice**: compare two plausible shapes and choose the one that hides more complexity with fewer caller obligations.

## Interaction model

When shared mutable state, concurrency, ordering, retries, ownership transfer, lifecycle, rollback, or recovery is material, establish one coherent model covering every applicable dimension:

- owner and mutation or atomic boundary;
- correlation or fencing mechanism;
- late and repeated event behavior;
- cleanup and recovery behavior;
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

During implementation, fix symptoms inside the accepted boundary and record broader cleanup as residual risk with its concrete future cost. During review, report each symptom with its evidence and consequence while preserving the reviewed change unchanged.

Completion criterion: every material obligation has discriminating evidence; every applicable interaction dimension is modeled; and every material complexity symptom is fixed by the implementer or reported by the reviewer with evidence and consequence.
