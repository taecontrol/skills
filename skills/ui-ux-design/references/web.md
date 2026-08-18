# Web UI/UX

Use this branch for websites and browser applications. WCAG 2.2 AA is the default accessibility floor; WAI tutorials and the ARIA Authoring Practices Guide are implementation guidance, not additional conformance standards.

Trace every applicable WCAG 2.2 AA criterion across the changed full page and complete process. The checks below are a working inventory, not the whole standard. Do not call a component, screenshot, or clean automated scan “WCAG conformant.”

## Semantic, native-first structure

- Use `<a href>` for navigation, `<button>` for actions, native form controls before custom widgets, and `<table>` for tabular relationships rather than layout.
- Provide a meaningful page title, document language, one main region, appropriate landmarks, and headings that express the content hierarchy.
- Keep source order logical without CSS. Visual rearrangement must not create a contradictory reading or keyboard order.
- Give meaningful images appropriate alternatives and mark decorative images intentionally.
- Every control needs an accessible name; the name of a visibly labeled control must include its visible label.
- Use ARIA only when native HTML cannot express the interaction. A role does not implement focus, keyboard behavior, state, or announcements.

## Keyboard and focus

- Make the full task operable with keyboard input without timing-dependent gestures.
- Keep Tab and Shift+Tab order logical; never use positive `tabindex`.
- Meet the AA requirements separately: [focus is visible](https://www.w3.org/TR/WCAG22/#focus-visible); the [focused component is not entirely hidden](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) by author-created content; and applicable component or state indicators meet [non-text contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast). As a stronger design practice, keep the full indicator clearly distinguishable and unobscured.
- Provide a skip mechanism when repeated navigation precedes substantial content.
- For modal dialogs: move focus inside, contain it while modal, support appropriate Escape dismissal, make background content inert, and restore focus to the logical invoker on close.
- Keep essential actions available without hover. Hover may supplement, not gate, information or control.
- Provide non-drag and single-pointer alternatives for gestures when the action does not inherently require a path.

## Responsive behavior, zoom, and text

- Start from one logical content order and add columns or panes only when the content fits.
- Use intrinsic Grid/Flexbox sizing, fluid constraints, and content-driven breakpoints. Use container queries when a reusable component must adapt to its container rather than the viewport.
- Do not disable browser or pinch zoom.
- Meet WCAG reflow at an effective 320 CSS-pixel viewport without loss of content, functionality, or unintended two-dimensional page scrolling. Document essential exceptions such as maps, diagrams, wide data tables, and spatial workspaces.
- Support text resize to at least 200% and WCAG text-spacing overrides without clipping, overlap, or lost controls.
- Do not infer mouse, touch, or keyboard capability from viewport width. A narrow device may have a keyboard; a wide device may use touch.
- Apply [WCAG 2.2 SC 2.5.8](https://www.w3.org/TR/WCAG22/#target-size-minimum) exactly: a pointer target is at least 24 × 24 CSS pixels, or meets the criterion's spacing route or another explicit exception. Separately, prefer approximately 44 × 44 CSS pixels as a stronger product default for ordinary touch-facing actions where density and platform conventions permit. Document deliberate product-level deviations from that preferred default; do not mislabel them as WCAG exceptions.

## Forms, status, and dynamic UI

- Use real forms, persistent labels, appropriate input types, autocomplete, input mode, fieldsets, and legends.
- Explain requiredness, units, constraints, and expected format before submission when users need them.
- Preserve entered values after validation failure.
- In multi-step processes, apply [SC 3.3.7 Redundant Entry](https://www.w3.org/TR/WCAG22/#redundant-entry): retain, prefill, or offer information the user already entered during the same process, except when re-entry is essential, security-required, or the prior value is no longer valid.
- Connect field errors programmatically, provide specific repair guidance, summarize multiple errors, and move focus deliberately.
- Announce asynchronous loading, result counts, saves, errors, and completion through an appropriate status mechanism without unnecessary focus movement.
- Prevent duplicate commitment while an action is pending when duplication would matter.
- Confirm success and distinguish “saved locally,” “queued,” “sent,” and “completed” when those states differ.

For authentication, apply [SC 3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum):

- support password managers, user-agent autofill, and paste into password and one-time-code fields;
- do not make manual transcription of a verification code the only path;
- do not require a cognitive-function test as the only authentication path;
- provide a conforming alternative when CAPTCHA, memorized knowledge, puzzles, or transcription would otherwise block completion.

## Color, motion, and preferences

- Meet WCAG AA contrast: 4.5:1 for normal text and 3:1 for large text; meet applicable 3:1 non-text contrast for controls, states, and meaningful graphics.
- Do not use color as the only signal.
- Respect `prefers-reduced-motion: reduce`; preserve the same task, content, and feedback without large or non-essential motion.
- Avoid autoplay or movement that users cannot pause when it interferes with reading or operation.
- Test light, dark, and forced-colors or high-contrast contexts when the product supports them.

## Performance as UX

- Reserve media space to avoid layout shift.
- Serve responsive images appropriate to their rendered slot.
- Avoid long synchronous work, layout thrashing, and effects that block interaction.
- Give immediate truthful feedback after user input; do not lazy-load the primary content in a way that delays task understanding.
- For production field data, use current Core Web Vitals at the 75th percentile, segmented by mobile and desktop. At the time this reference was written, the “good” thresholds were LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1; consult the live web.dev source before treating them as current policy.

## Required browser evidence

Choose cases from the changed surface, including when applicable:

- narrow 320 CSS-pixel reflow;
- one intermediate or component-container transition;
- representative wide layout;
- 200% text and 400% browser zoom;
- WCAG text-spacing overrides;
- keyboard-only primary and recovery paths;
- visible focus, open dialog or overlay, and focus restoration;
- loading, empty, invalid, server failure, offline, success, selected, disabled, and long-content states;
- reduced motion and supported themes;
- automated accessibility scan plus manual DOM/accessibility-tree review.
- changed login, MFA, CAPTCHA, and multi-step redundant-entry behavior when those complete processes are in scope.

Screenshots may prove layout, hierarchy, and visible state. They do not prove accessible names, announcements, focus order, keyboard behavior, or useful alternatives.

Completion criterion: the running browser surface preserves task behavior, semantics, and visual hierarchy across applicable input modes, states, zoom, and content-driven layout changes, with every exception documented.
