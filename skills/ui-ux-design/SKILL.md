---
name: ui-ux-design
description: "Design or review task-first web, iOS, and Android interfaces with grounded art direction, platform-native behavior, accessibility, and rendered evidence."
---

# UI/UX Design

Design, implement, or review interfaces as complete user experiences. Treat visual craft, interaction behavior, content, accessibility, responsive or adaptive behavior, and system states as one design surface.

This skill does not prove usability through model judgment. Heuristic review and rendered evidence can find risks and implementation defects; material uncertainty still requires proportionate evidence from representative users.

## Core contract

- Design for a named user, context, task, and outcome—not for a component category or fashionable style.
- Preserve accepted product requirements, approved designs, existing tokens, canonical components, and established interaction language before applying generic guidance.
- Use target-platform conventions. Shared product semantics do not require identical web, iOS, and Android shells.
- Treat accessibility as a quality floor. Use WCAG 2.2 AA for web; use the native platform accessibility APIs and conventions for iOS and Android.
- Review the running interface. Source inspection, a green build, a component story, or one happy-path screenshot is not UI/UX completion.
- Treat references as vocabulary, not authority. Extract applicable grammar without copying branded composition, assets, copy, or trade dress.
- Label assumptions. Do not present an expert critique as user research or an aesthetic preference as a usability fact.

## 1. Fix the design authority and scope

Inspect the request, repository instructions, accepted product evidence, existing UI, tokens, component library, typography, icons, content conventions, target stack, and available browser or device tooling.

Choose the mode:

- **Create or materially redesign:** establish the experience and visual direction before implementation.
- **Implement an approved design:** preserve its observable intent and record any necessary deviation.
- **Review:** inspect the changed or named surface without silently redesigning the product.

Record the visual-authority state separately:

- **Approved language controls:** preserve it; visual exploration is not permitted unless the user explicitly reopens the direction.
- **References exist, direction unresolved:** analyze their applicable grammar, then compare materially different directions.
- **No direction exists:** ground and compare new directions from product evidence rather than a fashionable default.
- **Review only:** critique against the controlling evidence without manufacturing a replacement direction.

Choose the track separately from the mode:

- **Design-only:** complete Steps 1–4, return an accepted design contract and an implementation handoff, then stop. A running implementation is not part of this track.
- **Implementation:** complete Steps 1–6 against accepted design evidence.
- **Completed-change review:** establish the accepted authority, exact revision or base/diff, running target, and reported evidence before judgment.
- **Named-surface audit:** bound the named current surface and authority explicitly; report risks and recommendations, but do not present it as change acceptance.

For either review track, return `Inconclusive` with concrete unblock conditions when material authority, target, access, or environment evidence is missing.

Resolve conflicting guidance in this order:

1. Explicit user requirements and approved product/design evidence.
2. Existing repository design system, components, and interaction conventions.
3. Validated user evidence and domain constraints.
4. Target-platform conventions and accessibility standards.
5. Annotated external references.
6. This skill's defaults.

Use [`templates/design-brief.md`](templates/design-brief.md) as a working checklist. Do not create a durable brief file unless the user or repository workflow requests one.

Completion criterion: the mode, track, target surfaces, affected user tasks, controlling design evidence, whether exploration is permitted, exact review target when applicable, existing system to preserve, and material unknowns are explicit.

## 2. Specify the experience before styling

For every affected task, define:

- user and use context;
- job, entry point, and judgeable success outcome;
- product category, desired character, information density, and trust or risk level;
- information hierarchy and primary, secondary, and destructive actions;
- navigation, back, cancel, edit, retry, and resume behavior;
- required content and realistic extremes;
- applicable states: initial, ready, loading or pending, empty, no results, invalid input, permission or eligibility constraint, offline, system failure, partial completion, success, stopped, and disabled;
- accessibility and input modes;
- responsive or adaptive transformations;
- external, sensitive, irreversible, or high-impact effects.

Read [`references/interaction-foundations.md`](references/interaction-foundations.md) for new flows, forms, navigation, states, content, or UX review.

Scale research to uncertainty and harm:

- Familiar, low-risk, reversible changes can proceed with explicit assumptions, heuristic review, observable-flow checks, and accessibility verification.
- Novel, materially changed, high-volume, sensitive, financial, legal, safety-related, or irreversible flows require representative-user evidence and a release strategy proportionate to the risk.
- Never turn a fixed participant count into a universal certification rule.

Completion criterion: every affected task has a complete state and recovery model, observable acceptance behavior, and an honest research disposition.

## 3. Select only the relevant design references

- Read [`references/visual-craft.md`](references/visual-craft.md) when creating or materially changing hierarchy, layout, typography, color, density, depth, imagery, or motion.
- Read [`references/art-direction.md`](references/art-direction.md) when a new or materially changed visual direction is unresolved. It contains the self-contained reference, variant, rendering, and comparison method.
- Read [`references/web.md`](references/web.md) for websites and web applications.
- Read [`references/ios.md`](references/ios.md) for iOS or iPadOS.
- Read [`references/android.md`](references/android.md) for Android phones, tablets, foldables, or desktop-windowed Android.
- For React Native, Flutter, Kotlin Multiplatform, or another shared UI stack, read every native target branch. Shared code does not erase platform differences.
- Read [`references/verification.md`](references/verification.md) before signoff or when reviewing an existing implementation.
- Use [`references/sources.md`](references/sources.md) to inspect the authority or live version of a rule; do not load every external source by default.

Completion criterion: every target surface has one applicable platform branch, unresolved art direction has relevant annotated references, and no irrelevant branch or fashionable reference is shaping the design.

## 4. Commit to one coherent direction

For a new visual language, state a compact direction before code:

- product-specific personality in concrete terms;
- hierarchy and layout concept;
- typography roles;
- semantic color and surface strategy;
- density and spacing logic;
- icon, imagery, and motion treatment;
- one justified signature element, if the product benefits from one;
- three likely generic defaults to reject and what replaces them.

The signature and rejected-defaults exercise applies only when establishing a new visual direction. `None justified` is a valid result for a quiet, conventional, task-dense interface.

For an existing product, derive the direction from its accepted system rather than inventing a parallel one. Use representative content immediately; placeholder copy conceals wrapping, density, empty-state, and localization failures.

When material visual uncertainty remains, follow [`references/art-direction.md`](references/art-direction.md): create two or three variants with different design positions, render them with the same representative content, state, and viewport or device, compare their visible trade-offs, and recommend one. Different accent colors are not different directions. Do not create variants for an approved direction, a review-only task, or a small bounded change.

Present the direction for human acceptance before production implementation when the direction was unresolved or it changes brand expression, navigation, information architecture, a high-risk flow, or another consequential product decision. When this condition applies, stop and wait for explicit acceptance or point to existing accepted repository evidence; silence is not acceptance. Do not add ceremony for a bounded implementation of an already approved design.

Completion criterion: every material visual choice traces to product evidence, platform fit, or a stated and reviewable rationale; when exploration was required, the accepted direction wins through inspected comparative evidence rather than generation order.

## 5. Build the complete surface

This step applies only to the implementation track. For design-only work, return the accepted task, state, platform, accessibility, and visual contract plus a bounded implementation handoff; execute no build work.

- Start with semantic structure, content order, navigation, and state transitions.
- Reuse canonical components and semantic tokens. Add the smallest coherent extension needed; a framework or component library is not itself a product design system.
- Make primary actions clear without making every element loud.
- Preserve user input and task state through correctable errors, back navigation, resize or configuration changes, and recoverable failures where the product semantics require it.
- Use plain, consistent interface language. Name controls by the user-visible action and keep the same verb through confirmation and status messages.
- Give loading, empty, error, offline, permission, success, and destructive states distinct behavior and copy.
- Use motion to explain causality, continuity, or feedback; provide an equivalent reduced-motion experience.
- Keep external-reference use original: extract principles or interaction grammar, not proprietary assets, copy, or branded composition.

Completion criterion: the running implementation covers every applicable state and interaction from Step 2 on every target surface.

## 6. Verify behavior, semantics, and pixels

This step applies to implementation and review tracks. For design-only work that proposes a visual direction, inspect a faithful rendered mockup as required by Step 4; a design contract without a render can establish decisions but cannot establish visual quality.

Use the narrowest faithful running environment. Build an evidence matrix from the affected tasks and states; do not apply a ceremonial fixed device list when it adds no coverage.

Verify three independent dimensions:

1. **Behavior:** complete the primary and recovery paths; test validation, back/cancel, retry, destructive safeguards, state preservation, slow or failed operations, and input methods.
2. **Semantics and accessibility:** inspect the DOM/accessibility tree or native accessibility representation; test keyboard or switch-style navigation, focus, labels, announcements, text scaling, contrast, touch targets, and reduced motion as applicable.
3. **Visual result:** capture named screenshots at the viewport, window, device, theme, text scale, and state where each visual claim matters; inspect hierarchy, grouping, alignment, typography, overflow, density, and platform fit.

A screenshot cannot prove semantics or usability. An automated accessibility scan cannot prove useful labels, logical focus, or a coherent task. Use both deterministic and judgment-based evidence. If faithful rendering is unavailable, state `Visual quality unverified` and do not describe the result as polished, refined, or visually complete.

For a material UI change, when the environment supports a fresh independent reviewer, send that reviewer the accepted brief, controlling references, compared variants when applicable, exact changed surface, named renders, and running target before signoff. When no independent reviewer is available, report `Independent review not performed` and do not imply independent verification. Keep end-to-end use-case acceptance separate when the project has a dedicated QA workflow.

Completion criterion: every acceptance behavior has direct running evidence, every material visual claim has a reviewed render, accessibility checks include manual interaction, and unresolved gaps are named.

## 7. Return an evidence-backed disposition

For design-only work, report:

- accepted task, state, platform, accessibility, and visual decisions;
- reference rationale, compared directions, recommendation, and acceptance when exploration applied;
- rendered evidence or the explicit `Visual quality unverified` limitation;
- assumptions and human acceptance evidence;
- judgeable implementation acceptance criteria;
- exact implementation handoff and boundaries.

For implementation, report:

- design authority and direction followed;
- affected tasks and states completed;
- platform-specific decisions;
- rendered, behavioral, and accessibility evidence;
- assumptions, deviations, and remaining uncertainty.

For completed-change review or a named-surface audit, state which review track applies, then use the canonical [`references/verification.md`](references/verification.md) review output.

`Pass` requires direct evidence for every material obligation. Use `Request changes` for demonstrated defects inside the accepted design boundary. Use `Inconclusive` when missing product intent, user evidence, access, or a faithful environment prevents judgment.

## Pitfalls

- **Refactoring UI as the whole discipline:** it is an excellent visual-craft layer, not a substitute for UX research, accessibility, content, platform behavior, or state design.
- **Mobile as narrow web:** redesign navigation, action placement, input, system integration, and adaptive behavior for the platform and available window.
- **Generated design-system cargo cult:** do not persist large token sets, palettes, or component inventories before the product demonstrates a need.
- **Brand-catalog cloning:** a famous product's exact palette, type scale, radii, composition, or assets are its identity, not a shortcut to taste. Extract only justified grammar and keep product-specific expression original.
- **Screenshot worship:** pixel fidelity can coexist with broken focus, semantics, recovery, performance, and task flow.
- **Heuristic certainty:** Nielsen-style critique identifies plausible risks; it does not prove how representative users behave.
- **Anti-pattern absolutism:** gradients, cards, serif type, dark themes, glass, dense tables, and animation are not inherently wrong. They are wrong when they are ungrounded, inconsistent, inaccessible, or harmful to the task.
- **Happy-path polish:** a beautiful populated screen with missing error, empty, permission, offline, or long-content behavior is unfinished.
