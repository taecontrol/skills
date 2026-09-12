---
name: prototype
description: "Explore and compare materially different, production-representative UI directions for one screen, component, or short flow through isolated parallel prototypes and an independent judge. Use before committing to a visual or interaction design; do not use for logic-only experiments or production implementation."
---

# Prototype

Produce disposable UI alternatives that a human can compare and select. Prototype code may be temporary; every presented interface must be credible in its intended product context. This skill explores visual and interaction design, not standalone business logic or state models.

## Process

1. **Frame the design question.** State what the prototype must help decide, the intended user, product moment, primary task and action, target platform or viewport, relevant states, protected behavior, and a time, cost, or scope bound. If the direction is already accepted or the request is only a local implementation detail, explain why comparison would add no value and stop.
2. **Ground the shared truth.** Inspect the current product, rendered baseline, repository, design system, components, terminology, real data shape, and platform conventions that apply. Prefer the real surrounding shell, density, content, and runtime. For a new product, use the product brief and a small number of relevant references without imitating them. Separate observed facts, user choices, assumptions, and freedoms.
3. **Freeze one neutral brief.** Give every designer the same user, task, exact content, capabilities, representative data and states, viewport, invariants, allowed changes, forbidden inventions, and evaluation conditions. Keep product truth fixed so the comparison measures design rather than different interpretations of the problem.
4. **Create independent directions.** Default to three fresh designer agents, preferably from different model families, and never exceed five. Give each an isolated workspace and a non-overlapping exploration territory. Require each designer to state one named thesis, then build, run, render, inspect, and evidence its direction without seeing the other candidates. Each thesis must differ in organizing structure or interaction model and at least one other material axis such as hierarchy, primary affordance, density, disclosure, navigation, reading path, or spatial composition.
5. **Judge before presentation.** After all candidates finish, dispatch a fresh judge that authored none of them. Give it the shared brief, baseline, complete candidates, and rendered evidence. The judge checks every invariant, forbids invented content or behavior, verifies representative states and runtime fidelity, and compares candidates pairwise for material divergence. Color, typography, radius, shadow, illustration, or copy changes alone do not constitute a distinct direction; if two candidates remain equivalent as rough silhouettes, one must fail.
6. **Repair once.** The judge marks each candidate `Pass`, `Rebuild`, or `Reject` and gives checkable reasons. Allow at most one bounded rebuild of a failed candidate, by its original designer, without exposing the other implementations. Rejudge the result. Do not include filler to reach the requested count; if fewer than two candidates pass, return `Incomplete` with the missing evidence or capability instead of presenting a false comparison.
7. **Present for selection.** Show only passing candidates under equivalent viewing conditions. For each, provide its name, thesis, material tradeoffs, rendered evidence, run location or command, and known limitations. The judge may explain compliance and differences but must not select the aesthetic winner. Ask the human to choose one direction, request a specific hybrid, or reject the set.
8. **Close the prototype.** Record the selected principles and unresolved questions briefly. Delete each candidate after preserving the decision evidence, or retain it only in its declared isolated discovery location. Stop without implementing the production solution.

## Fidelity rules

- Disposable describes lifecycle, not visual quality. Do not present rough, generic, broken, or visibly unfinished UI as an option.
- Use plausible domain-specific content, including the difficult data ranges and empty, loading, error, long-content, or responsive states material to the question.
- Preserve the real app shell, components, tokens, terminology, behavior, and platform conventions unless the brief explicitly allows changing them.
- Include only interactions needed to judge the design. Use stubs for mutations and never invent features, controls, metrics, customers, or claims to make a candidate look complete.
- Render and inspect every candidate in its intended runtime and at target sizes. Correct clipping, overflow, illegible hierarchy, broken interaction, placeholder content, and other visible defects before judging it.
- Share product primitives when useful, but do not impose a common layout that predetermines the alternatives. Build each candidate from its own thesis rather than restyling a base candidate.

## Production boundary

Selection accepts a direction, not its prototype code. Reusing, copying, or adapting a candidate is separate production work that must be explicitly undertaken through the project's normal design, implementation, review, and verification practices. It inherits no production status or quality claim from the prototype.

## Completion criteria

- One shared, evidence-grounded brief made the design question and comparison conditions explicit.
- At least three independent candidates were attempted in isolated workspaces and a fresh judge evaluated their rendered results.
- Every presented candidate passed both fidelity and pairwise divergence checks; omissions and failed rebuilds remain explicit.
- The human received comparable evidence and retained authority to select, hybridize, or reject the directions.
- Candidate disposition and the prototype-to-production boundary are explicit, and no production implementation began.
