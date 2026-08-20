---
name: strategic-programming
description: Strategic programming reference for Factory implementation, cleaning, and verification when invariants, boundaries, persistence, APIs, concurrency, security, or shared interfaces make green tests insufficient.
---

# Strategic programming

Judge a change by whether it leaves the system easier to understand and modify.

## Factory role mapping

This is a shared design standard. It does not change Factory authority or lifecycle routing.

- Coordinator records accepted consequential decisions, protected behavior, and the validation path. It routes material uncertainty to discovery or human synchronization.
- Implementer creates the accepted vertical behavior and focused observable proof.
- Cleaner repairs local correctness and design defects, freezes the candidate, then runs applicable gates against it.
- Verifier independently and read-only judges that candidate against the accepted contract, gate evidence, and this standard.
- Product Validator proves accepted journeys through a real product interface. Code and technical gates do not replace this judgment.

Evidence that challenges user-visible behavior, scope, sensitive policy, a public contract, or costly-to-reverse architecture returns to Coordinator synchronization.

## Apply design pressure

Before production edits, name the central invariant or policy, its authoritative source, its owner, and the callers that should not carry its hard detail.

For a consequential interface, boundary, ownership model, persistence model, or other costly-to-reverse seam, design it twice. Compare two plausible shapes and choose the one that hides more complexity with fewer caller obligations. Resolve routine reversible choices locally.

When shared mutable state, concurrency, ordering, retries, ownership transfer, lifecycle, rollback, or recovery matters, define the owner and mutation or atomic boundary, correlation or fencing, late and repeated events, cleanup and recovery, and a negative probe that can expose a broken model. A missing model is a contract or architecture gap.

## Prove behavior

Map every observable obligation to its narrowest faithful seam. Use a red-capable test or reproduction that fails on the old behavior or a plausible defect, then keep current green evidence. Cover failure, authorization, malformed input, migration, and fresh versus preserved state when they change the result. An equivalent before-and-after reproduction may replace strict test-first work when needed.

## Inspect the design

Treat a function, class, package, or tier-spanning slice as a module when it has an interface and implementation. Name the interface obligations and the seam where behavior can vary. Prefer deep modules: small interfaces that hide substantial behavior and give callers leverage and locality. Put seams only where variation is real; one adapter is hypothetical, while two demonstrate variation.

Run the deletion test. If deleting a module makes its complexity reappear across callers, it has depth; if the complexity disappears, it is probably a pass-through. Test through the caller-facing interface. Tests that must reach past it are evidence that the module may have the wrong shape.

Prefer one home for each policy, honest names and types for distinct identities and states, authoritative facts over reconstructed signals, and boundary parsing that turns unknown external or persisted data into safe application types.

After focused proof is green, inspect for change amplification, caller knowledge of hidden detail, and policies or failure behavior without an obvious home. Write roles fix defects within accepted decisions and record broader work as residual risk with its concrete cost. Verifier reports the evidence and consequence without changing the candidate.

Completion criterion: each material obligation has discriminating evidence, each applicable interaction dimension has a model, consequential choices received proportional design pressure, and material complexity defects are fixed or reported with evidence and consequence.
