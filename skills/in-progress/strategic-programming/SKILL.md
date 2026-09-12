---
name: strategic-programming
description: "Apply strategic programming to non-trivial implementation and repair work when green tests alone cannot establish a maintainable design. Use for changes involving invariants, boundaries, persistence, APIs, concurrency, security, shared policy, or consequential interfaces; skip routine mechanical edits."
---

# Strategic programming

Leave the system easier to understand and modify. Satisfy the accepted behavior with the least custom machinery that preserves its important design, safety, and operational properties.

Apply the following lenses proportionally. They are quality criteria, not a fixed delivery protocol. Understanding precedes simplification, and every write pass proves its own final result.

## Ground the change

Read the accepted implementation input—the user's bounded request or an accepted implementation specification—plus applicable project instructions, coding standards, and executable gate configuration. Trace the real caller, state, and data flow through the affected seam rather than reasoning from the named file alone.

Identify the governing invariant or policy, its authoritative source, its owner, and the callers that should not carry its hard detail. Fix a defect at the shared cause when that is the narrowest correct seam; inspect sibling callers before assuming the reported path is the whole problem.

Resolve reversible implementation choices locally. If evidence invalidates accepted behavior, a public contract, sensitive policy, or costly-to-reverse architecture, return that exact gap instead of silently redesigning the work.

## Minimize owned machinery

After understanding the flow, stop at the first option that fully satisfies the accepted behavior:

1. Avoid a new mechanism through deletion, direct composition, or an existing capability.
2. Reuse the repository's established implementation or pattern.
3. Use the standard library.
4. Use a native platform capability.
5. Use an already-installed dependency.
6. Add the minimum custom implementation the behavior actually requires.

Prefer boring code and demonstrated variation. Do not add speculative abstractions, configuration, extensibility, scaffolding, or dependencies for hypothetical future work.

The shortest diff is not automatically the best design. More internal implementation can be justified when it creates a substantially smaller, safer caller-facing interface. Never minimize away accepted behavior, discriminating evidence, trust-boundary validation, security, data-loss protection, accessibility, or necessary operational controls.

## Hide complexity

Give each policy one clear home. Prefer deep modules: small, honest interfaces that hide substantial implementation detail and keep callers free of change-prone knowledge. Use the deletion test: if removing the module spreads its complexity across callers, it has depth; if the complexity simply disappears, the module may be a pass-through.

Use names and types that preserve distinctions the system depends on. Parse and validate unknown external or persisted data at the boundary, then operate on safe application types. Keep authoritative facts instead of reconstructing them from incidental signals.

When shared mutable state, concurrency, ordering, retries, ownership transfer, rollback, migration, or recovery can change correctness, make the owner and atomic boundary explicit and cover late, repeated, partial, or failed behavior. Do not add machinery for interaction dimensions the change does not have.

## Prove the behavior

Map each material obligation to its narrowest faithful seam. Keep a test or reproduction capable of failing on the previous behavior or a plausible defect, and derive expected results from an accepted contract, worked example, known-good fixture, external oracle, or another source that can disagree with the implementation.

Reject tautological proof that copies the production algorithm, asserts a value against itself, or accepts current output merely because it is current. Add tests for distinct behavior and failure modes, not to meet a quota, and avoid repeating the same proof at multiple layers without a separate risk.

Every pass that claims code is ready owns validation of the state it hands off. After its final edit—or after review when no edit was needed—run the applicable focused tests and affected project gates, including any changed-code complexity check defined by the accepted specification or executable project configuration. Do not substitute another actor's earlier green evidence or defer a known failure to a later review. Do not invent a missing project tool or threshold.

## Finish strategically

Once focused proof is green, inspect the result for change amplification, caller knowledge of hidden detail, duplicated policy, dishonest names or types, avoidable custom machinery, and failure behavior without an obvious home. Repair supported defects within the accepted scope, then rerun affected evidence.

Report an unresolved risk only when fixing it would cross the accepted boundary. Name the evidence, consequence, and decision needed; do not create a speculative follow-up ledger.

## Boundaries

- This skill defines programming quality, not slice order, roles, commits, or delivery state.
- It does not replace project coding standards, executable gates, an accepted implementation specification, or final product validation.
- It does not create or update an ADR, glossary, standards file, or agent instructions as a side effect.
- Line count, file count, abstraction count, and test count are diagnostic signals, never standalone gates.

## Completion criteria

The accepted behavior exists at the correct seam; material invariants have independent, discriminating proof; applicable gates pass against the actor's final state; important complexity is hidden behind honest interfaces; and no avoidable machinery or known in-scope defect remains.
