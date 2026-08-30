---
name: javascript-react-patterns
description: "Select and evaluate JavaScript and React design, composition, rendering, and performance patterns when architecture, refactoring, or review presents a recurring structural tradeoff. Do not use for routine styling or isolated syntax questions."
---

# JavaScript and React patterns

Choose a pattern only after identifying the concrete problem it solves. Treat patterns as descriptive options, not mandatory architecture.

## Select with evidence

1. Inspect the repository's framework and package versions, local conventions, accepted decisions, and the code at the affected seam. State the observed pressure: coupling, ownership, reuse, loading, rendering, data flow, or measured performance.
2. Read the [pattern catalog](references/catalog.md). Shortlist the smallest plausible set, including the direct no-pattern alternative.
3. Read only the linked reference cards for the live candidates. Do not load unrelated cards.
4. Compare interface cost, hidden complexity, runtime cost, testability, migration cost, and fit with the existing stack. Verify time-sensitive APIs against the installed version and its official documentation.
5. Apply or recommend a pattern only when its benefit is observable in the current problem. Preserve simpler code when the pattern merely renames or redistributes complexity.
6. Validate at the narrowest faithful seam. Use behavior tests for structural changes and profiler, bundle, network, or Web Vitals evidence for performance claims.

Completion criterion: the result names the problem and evidence, the direct alternative, the selected reference, applicable tradeoffs and version constraints, the authorized action taken, and its validation.

## Modern React baseline

- Write new React components as function components. Use Hooks and custom Hooks for stateful or reusable behavior.
- Do not introduce class components. Treat existing classes as legacy and migrate them only when the accepted scope requires it or the requested behavior cannot otherwise be delivered safely.
- Prefer composition and Hooks over HOCs, render props, mixins, or container wrappers in new code. Use those patterns only for a demonstrated interface or legacy interoperability need.
- For error boundaries, use the framework-provided boundary or the project's approved functional-facing library. Do not add a raw class boundary unless the project profile explicitly authorizes that exception.
- Avoid speculative memoization and effect-driven derived state. Require profiler evidence for render optimization and use the data facilities supplied by the selected framework before adding a client cache layer.

## Factory role mapping

This skill supplies specialist judgment; it does not change `pursue-goal` authority or lifecycle routing.

- Coordinator may route a bounded JavaScript or React pattern question here. It alone updates the goal map, accepted decisions, and routing state.
- Architecture Designer may use the catalog and cards as evidence while comparing costly-to-reverse alternatives. This skill cannot accept the decision.
- Implementer may choose reversible internal patterns within an accepted slice and implement the smallest coherent behavior.
- Cleaner may repair a misapplied pattern, legacy React construction, or unsupported performance claim within accepted boundaries.
- Verifier may use the relevant card to judge the immutable candidate, but cannot fail it merely for using a different pattern that satisfies the accepted contract with equal or lower complexity.
- Product Validator judges observable journeys and normally does not need these code-level references.

When a choice changes user-visible behavior, a public contract, sensitive policy, or expensive-to-reverse architecture, return the evidence and alternatives to the Coordinator instead of deciding locally.

## Reference boundaries

The cards are decision aids adapted from Patterns.dev, not frozen API manuals. Each card contains only pattern-specific selection guidance. The rules shared by every pattern live here and must not be duplicated in the cards.
