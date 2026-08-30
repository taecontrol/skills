# UI/UX verification

Use this reference before signoff and for review-only work. Build evidence from the accepted task and changed surface; a fixed checklist is a starting inventory, not a substitute for a faithful oracle.

## 1. Build the evidence matrix

For each material task, record:

| Case | Platform and environment | Starting state | Action | Expected observation | Evidence |
| --- | --- | --- | --- | --- | --- |

Cover the happy path, every changed rule, realistic content extremes, and applicable recovery states. Mark a state not applicable only with a product reason.

Name screenshots by route or screen, state, viewport or device, theme or text scale when relevant, and revision. Capture the state where the claim matters; a final success screen cannot prove an error, focus, or pending state.

When comparing design variants, use the same representative content, state, viewport or device, theme, text scale, and fidelity. A comparison cannot distinguish direction from execution quality when these conditions drift.

## 2. Verify independent dimensions

### Behavior

Exercise the running product:

- entry to durable success;
- back, cancel, edit, and resume;
- invalid input and correction;
- pending work and duplicate prevention;
- empty, no-results, permission, offline, server failure, partial, and completion-unknown states;
- destructive or external action scope, confirmation, result, and retry safety;
- state restoration after navigation, resize, configuration change, backgrounding, or interruption where applicable.

A component unit test can support a claim. The task passes through the observable seam that carries its real semantics.

### Semantics and accessibility

Use automated scanners, lint, and framework checks for fast coverage, then manually inspect and interact:

- accessible name, role, value, state, grouping, and reading order;
- keyboard, Full Keyboard Access, TalkBack, VoiceOver, or equivalent input path;
- visible and unobscured focus;
- web modal focus entry, containment, dismissal, and return; for native platforms, correct system presentation semantics and sensible assistive-technology context, dismissal, and return;
- labels, instructions, validation association, and status announcements;
- text scaling, zoom or reflow, contrast, non-color meaning, touch targets, and reduced motion;
- gesture alternatives and platform back behavior.

“No automated violations” is not a pass by itself. Automation cannot decide whether an alternative is useful, focus is logical, copy is understandable, or the task is coherent.

### Visual result

Inspect named renders for:

- task and action hierarchy;
- grouping, alignment, rhythm, and whitespace;
- typography roles, line length, wrapping, and localization pressure;
- color semantics, contrast, state distinction, and theme behavior;
- density and scanning efficiency;
- boundaries, depth, radius, icons, imagery, and motion consistency;
- clipping, overflow, occlusion, layout shift, and unsafe-area behavior;
- fidelity to approved designs and coherence with adjacent product surfaces.

For unresolved art direction, compare the named renders side by side when possible. State what each communicates, where hierarchy works, where it looks generic or excessive, what is missing, who it best serves, and its main trade-off. Recommend a direction without assigning a universal taste score.

Prefer viewport or device screenshots for signoff. Full-page composites can hide sticky, focus, viewport, and timing defects; use them as secondary debugging artifacts.

## 3. Critique against authority

For each issue, identify the violated authority:

- accepted requirement or design;
- existing product system;
- user evidence;
- platform convention;
- accessibility requirement;
- visual-craft principle;
- explicit assumption needing human decision.

Classify:

- **Blocking:** prevents the task, violates safety or accessibility, loses work, misrepresents state, or contradicts accepted product intent.
- **Fix-now:** avoidable UX, platform, or visual defect inside the accepted boundary that is proportionate to repair before acceptance.
- **Advisory:** useful improvement outside the accepted scope or dependent on new product evidence.

Do not use a universal visual score. Scores conceal authority, severity, and evidence and encourage optimizing pixels instead of the task.

## 4. Run the revision loop

1. Preserve the first failing evidence.
2. Fix the highest-consequence issue, not the easiest visual detail.
3. Re-run the affected case and any adjacent cases the change can influence.
4. Re-capture the exact state and environment.
5. Retain unresolved uncertainty rather than polishing around it.

Three focused visual revision loops are a useful cost boundary for an unresolved concept. At that point, surface the missing decision or reference instead of making random aesthetic changes. This is a workflow limit, not a quality standard.

## 5. Independent review

For material UI work, when the environment supports a fresh reviewer, hand them:

- accepted task and design brief;
- controlling product and platform evidence;
- annotated references, compared directions, and human acceptance when applicable;
- exact diff or changed surface;
- running target and environment;
- evidence matrix and named renders or captured artifacts;
- known limitations.

The reviewer works read-only, traces every material obligation to evidence, and returns `Pass`, `Request changes`, or `Inconclusive`. Repairs return to the implementer; accepted use-case QA remains a separate activity when the project defines it. If no independent reviewer is available, report `Independent review not performed`; self-review does not become independent evidence by relabeling it.

## Review output

```markdown
## Verdict
Pass | Request changes | Inconclusive

## Evidence reviewed
- Product/design authority:
- References and compared directions:
- Running target:
- Tasks and states:
- Screenshots:
- Accessibility and interaction evidence:

## Trace
| Obligation | Status | Evidence |

## Findings
1. <ID> — Blocking | Fix-now | Advisory — <surface>
   - Evidence:
   - User consequence:
   - Required outcome:
   - Recheck:

## Not verified
<material gaps and concrete unblock conditions>
```

When a faithful render is unavailable, use `Inconclusive` for visual claims and state `Visual quality unverified`; source validity or a successful build does not remove that limitation.

Completion criterion: the verdict is reproducible from direct running evidence, every material obligation has a disposition, and aesthetic judgment is separated from accessibility conformance, platform correctness, and user evidence.
