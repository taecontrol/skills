---
name: strategic-programming
description: "Apply strategic programming to non-trivial design, implementation, and repair work when green tests alone cannot establish a maintainable design. Use for changes involving invariants, boundaries, persistence, APIs, concurrency, security, shared policy, or consequential interfaces; skip routine mechanical edits."
---

# Strategic programming

Leave the system easier to understand and modify. Satisfy the accepted behavior with the least custom machinery that preserves its important design, safety, and operational properties.

Apply the following lenses proportionally. They are quality criteria, not a fixed delivery protocol. Understanding precedes simplification, and every write pass proves its own final result.

## Ground the change

Read the accepted implementation input—the user's bounded request or an accepted spec—plus applicable project instructions, coding standards, and executable gate configuration. Trace the real caller, state, and data flow through the affected seam rather than reasoning from the named file alone.

Before editing, make each accepted requirement and protected behavior explicit and map it to planned verification evidence, including obligations that automated gates cannot establish. Reuse an accepted spec's examples; for bounded work, a short outline in the conversation is sufficient. Update the mapping as discovery reveals affected obligations.

Identify the governing invariant or policy, its authoritative source, its owner, and the callers that should not carry its hard detail. Fix a defect at its root cause. Find why the failure can occur, then change the design so it cannot. Handle a failure only when its cause lies outside the system. Inspect sibling callers before assuming the reported path is the whole problem.

Resolve reversible implementation choices locally. If evidence invalidates accepted behavior, a public contract, sensitive policy, or costly-to-reverse architecture, return that exact gap instead of silently redesigning the work.

## Minimize owned machinery

After understanding the flow, stop at the first option that fully satisfies the accepted behavior:

1. Avoid a new mechanism through deletion, direct composition, or an existing capability.
2. Reuse an implementation the repository already has, by calling or extending it.
3. Use the standard library.
4. Use a native platform capability.
5. Use an already-installed dependency.
6. Add the minimum custom implementation the behavior actually requires.

Check the option you stop at, and the design within it, with a [second opinion](references/second-opinion.md); its first paragraph says when to skip it.

A pattern the repository repeats is an option to judge like any other, and existing code is no proof that its design is right. Before you repeat a pattern or build around what the code holds, such as a column's type or a wrapper every caller goes through, ask the second opinion's question 4 of it: why each piece exists. A reason is a recorded decision, such as a coding standard or an ADR, or the behavior lost without the piece. Follow a pattern that has one, or return the gap when the change shows its reason wrong. A pattern with no reason competes with the simplest form that does the job. The comparison counts the old sites, because a better form beside them is a second mechanism, as question 3 says. Take the better form when it wins with the old sites left as they are. When it wins only if they change, or it crosses a one-way door, follow the pattern and return the gap.

Every **piece** earns its place. A piece is anything someone builds, tests, and keeps: a state, a column, a guard, a rule, a limit, a setting, an abstraction, a test. A case is **live** when ordinary use of the product meets it, or when someone the product does not trust can cause it, to their gain or another's harm. Ordinary use includes what a network does to a request: a duplicate, a retry, a slow or lost response. Any other case is **improbable**: it needs unrelated deliberate acts to coincide, only a trusted person acting against themselves can cause it, it belongs to a later issue, or nobody has it. A live case gets the smallest piece that handles it. An improbable case gets no piece. It gets **its line** where this work reports to the human: the case, what happens when it occurs, and what a piece for it would cost. The human can ask for that piece, and nobody adds it for them. A behavior that an earlier issue or design handed down is a piece too. Its record says who decided it, not that it is needed. When the behavior alone needs a mechanism or a special case nothing else in the product uses, a one-way door, or a decision for the human, return that gap before you plan or build on it: the form without it, what each costs, and what the behavior does that the other form loses. This holds wherever pieces enter: a plan, a design, a fix for a review finding, and the code.

Prefer boring code and demonstrated variation.

The shortest diff is not automatically the best design. More internal implementation can be justified when it creates a substantially smaller, safer caller-facing interface. Never minimize away accepted behavior, discriminating evidence, trust-boundary validation, security, data-loss protection, accessibility, or necessary operational controls. They protect live cases, and none of them makes an improbable case live.

## Hide complexity

Give each policy one clear home. Prefer deep modules: small, honest interfaces that hide substantial implementation detail and keep callers free of change-prone knowledge. Use the deletion test: if removing the module spreads its complexity across callers, it has depth; if the complexity simply disappears, the module may be a pass-through.

Use names and types that preserve distinctions the system depends on. Parse and validate unknown external or persisted data at the boundary, then operate on safe application types. Keep authoritative facts instead of reconstructing them from incidental signals.

When shared mutable state, concurrency, ordering, retries, ownership transfer, rollback, migration, recovery, or fields that reshape other fields can change correctness, enumerate the **state space** before implementing: each operation outcome, ordering, or change against each state it can meet, including late, repeated, partial, and failed behavior, with its accepted result. Derive the tests from it, and make the owner and atomic boundary explicit. Do not add machinery for interaction dimensions the change does not have.

## Prove the behavior

Map each material obligation to its narrowest faithful seam. Keep a test or reproduction capable of failing on the previous behavior or a plausible defect, and derive expected results from an accepted contract, worked example, known-good fixture, external oracle, or another source that can disagree with the implementation.

Before writing or keeping a test, apply [test value](references/test-value.md): its four questions, junk patterns, and retention bar.

Every pass that claims code is ready owns validation of the state it hands off. After its final edit—or after review when no edit was needed—run the applicable focused tests and affected project gates, including any changed-code complexity check the executable project configuration defines. Do not substitute another actor's earlier green evidence or defer a known failure to a later review. Do not invent a missing project tool or threshold.

## Finish strategically

Once focused proof is green, inspect the result for change amplification, caller knowledge of hidden detail, duplicated policy, dishonest names or types, avoidable custom machinery, a pattern repeated unexamined, and failure behavior without an obvious home. Repair supported defects within the accepted scope, then rerun affected evidence.

When several defects share a cause, fix the cause with the strongest structural fix: a type that makes the bad state unrepresentable, then a lint or architecture rule, then a shared component that owns the mechanism, then a coding standard for what needs judgment. Prefer sharpening an existing check over adding one. Fix or name the existing violations a new check reports, and prove it goes red on a planted violation.

Reconcile the final result against the obligation mapping from grounding. Account for each obligation with observed evidence or an explicit limitation, including those outside automated gate coverage. Resolve known in-scope omissions before claiming completion.

Report an unresolved risk only when fixing it would cross the accepted boundary, naming the evidence, consequence, and decision needed. An improbable case is reported in its line.

## Boundaries

- This skill defines programming quality, not delivery order, roles, commits, or delivery state.
- It does not replace project coding standards, executable gates, an accepted spec, or its acceptance tests.
- It does not create or update an ADR, glossary, standards file, or agent instructions as a side effect.
- Line count, file count, abstraction count, and test count are diagnostic signals, never standalone gates.

## Completion criteria

The accepted behavior exists at the correct seam; material invariants have independent, discriminating proof; applicable gates pass against the actor's final state; important complexity is hidden behind honest interfaces; and no avoidable machinery or known in-scope defect remains.
