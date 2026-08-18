# Source map

Use this file to check authority, scope, or a live rule. Do not fetch every source during routine UI work. Prefer the live platform or standards page when a numeric requirement, current component behavior, or release policy matters.

## Authority ladder

| Source | Status and best use | Link |
| --- | --- | --- |
| ISO 9241-210 | Human-centered design process: understand users, tasks, and context; involve users; evaluate and iterate. The public text is limited; do not invent clauses from the paywalled standard. | [ISO 9241-210:2019](https://www.iso.org/standard/77520.html) |
| WCAG 2.2 | W3C Recommendation and normative web accessibility baseline. Review the full applicable standard, including complete processes. High-frequency deep links: [reflow](https://www.w3.org/TR/WCAG22/#reflow), [text spacing](https://www.w3.org/TR/WCAG22/#text-spacing), [contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum), [focus visible](https://www.w3.org/TR/WCAG22/#focus-visible), [focus not obscured](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum), [target size](https://www.w3.org/TR/WCAG22/#target-size-minimum), [dragging](https://www.w3.org/TR/WCAG22/#dragging-movements), [status messages](https://www.w3.org/TR/WCAG22/#status-messages), [redundant entry](https://www.w3.org/TR/WCAG22/#redundant-entry), and [accessible authentication](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum). | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |
| WAI Understanding documents | Informative explanations of WCAG criteria, including contrast, reflow, target size, keyboard, text resize, focus, and status messages. | [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) |
| WAI ARIA APG | Implementation patterns and keyboard models for custom web widgets. Native HTML remains preferable when it expresses the interaction. | [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) |
| WAI tutorials | Public implementation guidance for forms, structure, images, and accessibility evaluation. | [WAI tutorials](https://www.w3.org/WAI/tutorials/) |
| Apple HIG | First-party iOS and iPadOS design, accessibility, layout, typography, navigation, feedback, and privacy guidance. Consult [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) and [UI Design Tips](https://developer.apple.com/design/tips) together for current target-size nuance. | [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) |
| Material Design 3 | First-party Android-oriented foundations and component guidance; use Android Developers for implementation and app-quality requirements. | [Material Design 3 foundations](https://m3.material.io/foundations) |
| Android Developers | First-party adaptive layout, accessibility, permissions, insets, quality, navigation, testing, and offline guidance. Review release-sensitive rules at their deep links. | [Core app quality](https://developer.android.com/docs/quality-guidelines/core-app-quality) · [Window-size classes](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes) · [Insets](https://developer.android.com/develop/ui/compose/system/insets) · [Predictive back](https://developer.android.com/design/ui/mobile/guides/patterns/predictive-back) · [Accessibility](https://developer.android.com/guide/topics/ui/accessibility/apps) |
| GOV.UK Service Manual and Design System | Strong public, research-informed defaults for task-based services, forms, content, validation, errors, confirmation, and research operations. Adapt to the product rather than copying government styling. | [Government Design Principles](https://www.gov.uk/guidance/government-design-principles) · [Design System patterns](https://design-system.service.gov.uk/patterns/) · [Validation](https://design-system.service.gov.uk/patterns/validation/) |
| Nielsen Norman Group | Expert heuristics, methods, and UX analysis. Use as structured expert judgment, not proof of user behavior. | [Ten usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) · [Usability testing 101](https://www.nngroup.com/articles/usability-testing-101/) |
| Baymard Institute | Large ecommerce-focused research base, especially checkout, forms, search, and product discovery. Qualify ecommerce findings before applying them to other domains. | [Inline validation](https://baymard.com/blog/inline-form-validation) · [Multi-column forms](https://baymard.com/blog/avoid-multi-column-forms) |
| Refactoring UI | Commercial practitioner resource translating visual craft into developer-friendly tactics. Use for hierarchy, spacing, typography, color, depth, and finishing—not as a UX or accessibility standard. Do not copy substantial proprietary text or assets into skills. | [Refactoring UI](https://www.refactoringui.com/) · [Color palette preview](https://www.refactoringui.com/previews/building-your-color-palette) |
| USWDS | Public production design-system guidance for tokens, typography, spacing, components, and accessibility. Useful as a system-design example, not a universal visual language. | [USWDS design tokens](https://designsystem.digital.gov/design-tokens/) · [Typography](https://designsystem.digital.gov/components/typography/) |
| web.dev and MDN | Strong web implementation guidance for responsive design, input, performance, HTML, CSS, and accessibility. WCAG remains the normative accessibility source. | [Learn Responsive Design](https://web.dev/learn/design/) · [Learn Accessibility](https://web.dev/learn/accessibility/) · [MDN responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) |
| OpenAI Codex frontend guidance | First-party coding-agent workflow guidance: inspect the project system, provide concrete references and states, run the interface, and iterate from screenshots. | [Build responsive front-end designs](https://developers.openai.com/codex/use-cases/frontend-designs) |
| Playwright | First-party browser and visual-regression mechanics. Screenshot baselines require a controlled environment and prove change, not quality. | [Visual comparisons](https://playwright.dev/docs/test-snapshots) |
| Agent Skills specification | Progressive disclosure and package structure for portable skills. | [Specification](https://agentskills.io/specification) · [Best practices](https://agentskills.io/skill-creation/best-practices) |
| Android agent skills | First-party example of modular, evaluation-targeted agent guidance grounded in developer.android.com. | [android/skills](https://github.com/android/skills) |

## Foundational books worth human study

These books are valuable for building design judgment but should not be paraphrased into a giant runtime skill:

- Don Norman, *The Design of Everyday Things* — affordances, signifiers, mappings, feedback, constraints, and human error.
- Steve Krug, *Don't Make Me Think* — navigation, scanning, clarity, and lightweight usability testing.
- Alan Cooper et al., *About Face* — goal-directed interaction design and behavior models.
- Jenifer Tidwell et al., *Designing Interfaces* — recurring interaction patterns and their context.
- Abby Covert, *How to Make Sense of Any Mess* — information architecture and language.
- Adam Silver, *Form Design Patterns* — practical, accessible form behavior.
- Alla Kholmatova, *Design Systems* — design-system purpose, adoption, and maintenance.
- Brad Frost, *Atomic Design* — compositional system thinking; do not mistake the taxonomy for product UX.
- Matthew Butterick, *Practical Typography* — readable typography and typesetting judgment.

## Source discipline

- Cite the live source for numeric or conformance claims.
- Separate normative requirements from informative guidance and expert opinion.
- Record platform version when behavior is release-sensitive.
- Prefer product evidence over generic recommendations when both are valid and do not conflict with accessibility or safety.
- Do not turn examples, benchmarks, or aesthetic tactics into universal laws.
