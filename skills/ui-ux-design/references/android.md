# Android UI/UX

Use this branch for Android phones, tablets, foldables, ChromeOS, and desktop-windowed Android. Design from the current app window, posture, and input capabilities—not a phone/tablet Boolean.

## Platform fit and navigation

- Prefer Material 3 and platform components for expected behavior and accessibility, then apply the product's visual language. Material is not permission to make every product look identical.
- Preserve standard Back behavior and predictive-back integration. A cancelled back gesture must produce no mutation and restore the pre-gesture view state.
- Use a navigation bar for appropriate compact top-level navigation and evaluate a navigation rail or expanded rail in wider windows.
- Use list-detail or supporting-pane layouts when related content benefits from simultaneous context.
- Back may leave a running task's detail view, but it must not silently cancel the task. Provide an explicit Stop action with truthful consequences.

## Adaptive layout

- Base transformations on current window size classes and fold posture. Multi-window and desktop modes can make a large device window compact and a phone window unusually wide.
- Use the current Android window-size-class model, which may include compact, medium, expanded, large, and extra-large width or height classes depending on the API version. Compact layouts generally use one primary pane; progressively evaluate additional panes, navigation treatments, density changes, and readable-width constraints at every material product transition. Record the Android and Compose version when class names or adaptive APIs affect the rule.
- Adapt through reflow, reveal, pane changes, and navigation-component changes. Do not stretch phone-width forms, buttons, cards, and paragraphs across large screens.
- Keep essential controls and text away from fold hinges and occluding display features.
- Preserve selected item, navigation destination, unsent input, task state, approval state, and appropriate scroll intent across resize, rotation, fold/unfold, theme, density, and font-scale changes.

## Edge-to-edge, insets, and IME

- Draw backgrounds edge to edge where appropriate while keeping interactive content clear of status bars, navigation bars or taskbars, display cutouts, mandatory gesture regions, and the IME.
- Read and consume live `WindowInsets`; never hard-code notch, navigation-bar, taskbar, or keyboard sizes.
- Apply insets once at the correct ownership level. Verify nested scaffolds and panes do not double-pad or clip content.
- Keep focused fields, composer input, Send or Stop, and validation feedback visible when the IME opens and animates.
- Test both gesture and three-button navigation where the product supports current Android versions.

## Touch, keyboard, and semantics

- Give every independent touch action at least a 48 × 48 dp target. Use approximately 8 dp separation for adjacent targets where practical.
- A smaller visible icon may sit inside a larger semantic target.
- Give controls accurate TalkBack labels, roles, values, and states. Describe purpose and result, not redundant visual detail; decorative elements should not create noise.
- Keep traversal order aligned with the visual and task hierarchy.
- Support keyboard, mouse, trackpad, stylus, Switch Access, and other input modes applicable to the form factor.
- Use native dialog and sheet semantics. Verify that TalkBack, keyboard, and alternative input stay in an appropriate reading/focus context, dismissal is reachable, and context is named when needed. Do not add a visible title or custom web-style focus trap to every native sheet.
- Provide a button or menu alternative for swipe, drag, long press, and hover interactions.

## Typography and content

- Use Material typography roles and Android font scaling by default. Branded fonts must scale, localize, and remain legible.
- Avoid fixed-height text containers that clip under large font or display size.
- Keep long generated output, errors, approval rationale, citations, and action labels readable rather than forcing one-line truncation.
- Do not communicate running, needs approval, queued, offline, failed, stopped, or completed state through color or animation alone.

## Permissions, privacy, and offline work

- Request the minimum permission at the moment the user invokes the feature.
- Explain why when necessary, invoke the real system prompt, and degrade gracefully after denial. Do not repeatedly nag a user who declines.
- Check runtime permission state rather than assuming a prior grant.
- Keep local drafts, task identity, queue state, and sync state when the product promises offline or interruption resilience.
- Distinguish local, queued, sent, completed, failed, and completion-unknown states.
- Retry side effects only when idempotent or after warning about duplicate risk.

## Required native evidence

Choose cases from the changed surface, including when applicable:

- every material layout transition used by the product, including large and extra-large windows when relevant;
- portrait, landscape, split-screen, and freeform resize;
- relevant foldable postures and hinge placement;
- default and large font/display scale;
- light and dark themes;
- software keyboard visible;
- gesture and three-button navigation;
- predictive back commit and cancellation;
- TalkBack labels, order, state, and announcements;
- hardware-keyboard completion of the primary task;
- permission denial and alternative route;
- offline before submission, interruption during work, retry, and state restoration;
- loading, empty, error, stopped, success, and completion-unknown states.

Use Compose accessibility checks, lint, previews, and screenshot tests as fast feedback when available, but retain manual TalkBack, navigation, input, and running-device verification.

Completion criterion: the interface remains operable, coherent, and stateful across Android's window, input, navigation, inset, and accessibility variations without flattening them into a stretched handset layout.
