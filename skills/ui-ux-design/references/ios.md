# iOS and iPadOS UI/UX

Use this branch for native Apple mobile and tablet interfaces. Preserve shared product semantics, but express navigation, controls, typography, permissions, and system integration through Apple conventions.

## Platform fit

- Prefer system controls and established patterns before custom replacements.
- Use navigation stacks for hierarchical movement and tab bars for persistent top-level destinations when the information architecture warrants them.
- On wide iPad windows, evaluate sidebar or split-view structures instead of stretching a phone screen. History plus detail, or primary content plus supporting context, often benefits from multiple panes.
- Preserve the interactive back gesture and system edge behavior. Do not add custom horizontal gestures that conflict with navigation or sidebar interactions.
- Treat the current window and traits as the layout context; do not assume full-screen iPad or branch only on a device-name check.

## Layout, safe areas, and keyboard

- Backgrounds and full-screen media may extend edge to edge. Keep readable content and interactive controls inside live safe-area constraints.
- Account for bars, camera housings, Dynamic Island where present, multitasking windows, and changing orientations through system layout guides rather than hard-coded padding.
- Make composers, forms, focused fields, and primary controls move or resize with the virtual keyboard. Do not reserve a guessed keyboard height.
- Use readable-content constraints on wide windows; do not let paragraphs, form fields, or compact controls span the entire width without purpose.
- Preserve selected destination, unsent input, active task, approval state, and appropriate scroll intent through resize, rotation, scene changes, and return from background.

## Touch, input, and focus

- Prefer the 44 × 44 point default hit area for ordinary independent touch controls. Current Apple guidance also documents smaller minimum native control sizes in some contexts, so review any smaller independent target deliberately for task frequency, spacing, dexterity, and accessibility instead of labelling 44 points a universal minimum. The visible icon may be smaller than its semantic target.
- Keep destructive actions separated and explicitly labeled.
- Support VoiceOver, Full Keyboard Access, Switch Control, AssistiveTouch, and pointer input as applicable to the product.
- Use platform focus and keyboard behavior instead of ad hoc Tab ordering for native controls.
- Use native modal and presentation semantics. Verify that VoiceOver, Full Keyboard Access, and other assistive input stay in a sensible reading/focus context, dismissal is reachable, and context is named when needed. Do not add a visible title or custom web-style focus trap to every native sheet.
- Provide a visible control or menu alternative for swipe, drag, long press, and hover actions.
- Configure the appropriate virtual keyboard and return-key action for the field, but never assume all keyboards honor every hint.

## Typography and content

- Use Dynamic Type text styles and the system font by default. Brand fonts must scale, localize, and remain legible at accessibility sizes.
- Let essential text reflow. Do not truncate generated content, errors, approval scope, citations, or primary action labels to preserve a fragile layout.
- Keep running, queued, needs-approval, offline, failed, stopped, and completed states understandable through text or accessibility state, not color or animation alone.
- Use system symbols consistently and label unfamiliar or consequential icon-only controls.

## Permissions and privacy

- Request only the capability and data required for the current user-initiated feature.
- Ask in context, when the user attempts the feature—not at launch merely because the app may need it later.
- Explain the concrete benefit and use in concise product language. A pre-permission explanation must not imitate or manipulate the system prompt.
- Respect denial. Keep the rest of the task usable through alternatives such as typing instead of voice or selecting a file manually.
- Before a sensitive external or AI action, show what data, target, and scope are involved and whether the effect is reversible.

## iPadOS adaptation

- Compact windows should present one primary pane with reachable navigation and actions.
- Wide windows should evaluate list-detail or supporting-pane layouts for history, context, sources, approvals, and artifacts.
- Support physical keyboard and trackpad without reducing touch usability.
- Verify narrow and wide multitasking windows, not only canonical portrait and landscape device screenshots.
- Do not place required controls in a floating popover or secondary pane that disappears without a discoverable route back.

## Required native evidence

Choose cases from the changed surface, including when applicable:

- compact iPhone portrait and landscape;
- narrow and wide iPad multitasking windows;
- default and large accessibility Dynamic Type;
- light and dark appearance;
- software keyboard visible with the focused field and primary action reachable;
- VoiceOver order, labels, traits, values, and status announcements;
- Full Keyboard Access or hardware-keyboard completion of the primary task;
- safe-area behavior around system bars and display features;
- denied permissions and alternative path;
- loading, offline, error, stopped, success, background/foreground, and resize state preservation.

Completion criterion: the interface feels native because its behavior, accessibility, layout adaptation, and system integration follow Apple conventions—not because it imitates a visual fashion associated with iOS.
