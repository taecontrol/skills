---
name: implementation-review
description: "Use when independently reviewing a completed software implementation, especially a Mission Validation ticket, for both contract correctness and strategic design quality. Applies A Philosophy of Software Design to find misleading interfaces, leaked policy, shallow modules, hidden invariants, boundary-validation failures, and tests that ratify the wrong design."
license: MIT
---

# Implementation Review

Implementation Review is an independent validation pass for completed implementation work. It asks two questions at the same time:

1. **Contract:** does the implementation satisfy the approved ticket, product contract, and non-goals?
2. **Strategic design:** did the implementation reduce or preserve long-term understandability, or did it merely make tests pass?

Use this skill as the review counterpart to `strategic-implementation`. The implementer owns the first design pass; this reviewer verifies it from fresh context and returns a verdict to Mission Control.

## When to use

Use this skill for:

- a Mission `Validation / independent-qa`, `Validation / implementation-review`, or similar ticket;
- pre-merge review of a completed feature, bug fix, hardening slice, or rework ticket;
- changes involving APIs, routes, serializers, read models, persistence, attribution, identity, ordering, lifecycle, security-sensitive data, or shared UI;
- suspicious implementations where tests pass but the model, naming, completeness/fidelity label, or source of truth may be wrong.

Do not use it to implement fixes, perform open-ended Discovery, rewrite the contract, or review purely mechanical formatting. If review exposes a missing product or architecture decision, return a finding and proposed frontier on the map; do not silently decide it or create its ticket.

## Review stance

- Be independent: inspect the diff, tests, contract, and relevant code paths rather than trusting the implementer summary.
- Be evidence-led: cite file paths, lines, tests, commands, outputs, docs, or runtime observations.
- Be APoSD-specific: do not say “clean code” or “best practice” without naming the complexity mechanism.
- Be severity-calibrated: block only issues that can mislead users, violate the contract, leak policy, corrupt data, bypass security, or make future changes unsafe.
- Do not fix code during review unless the active ticket explicitly authorizes reviewer fixes.

Completion criterion: every material verdict is backed by inspected evidence, not taste.

## 1. Load the contract and changed surface

Read the active Mission ticket or review request, accepted decisions, relevant specs, implementation summary, and repository instructions. Inspect the worktree and diff against the intended base.

Identify:

- modified files and public seams;
- expected behavior and non-goals;
- security/data sensitivity;
- tests added or changed;
- any design quality evidence returned by the implementer.

Completion criterion: the review has a concrete contract and file surface before judging design.

## 2. Verify contract correctness

Check whether the implementation does what was approved and avoids what was excluded.

Review:

- public behavior at routes/UI/commands/adapters/serializers;
- error and failure behavior;
- authorization and data exposure boundaries;
- file names, generated artifacts, wire formats, migrations, or persistence changes;
- whether tests actually fail against the old behavior or could ratify the wrong design.

Run or inspect relevant focused tests when practical. If broad CI already passed, still inspect whether focused tests cover the risky semantics.

Completion criterion: each required behavior is Pass, Fail, or Unverified with a concrete reason.

## 3. Review strategic design quality

Apply this APoSD checklist to the changed surface.

### Concepts and names are honest

- One name should not mean two concepts.
- IDs should reveal their domain. Authoritative entity IDs, source/read-model IDs, actor IDs, tenant/context IDs, and external-provider IDs must not be collapsed for convenience.
- If a name is hard to pick or explain simply, inspect whether the abstraction is confused.

### Interfaces do not overpromise

- Labels such as `faithful`, `complete`, `verified`, `safe`, `authoritative`, or `source of truth` must match the weakest part of the evidence.
- Diagnostic artifacts, reports, and generated outputs must surface limitations rather than hiding them behind optimistic wording.
- Caller-facing APIs should make the common correct use easy and rare cases explicit.

### Invariants are represented directly

- If an authoritative fact exists upstream, the implementation should propagate it rather than drop and re-query or infer it later.
- Persistence and domain models should represent important invariants instead of relying on coincidence, ordering, naming, or ambient context.

### Policy has one home

- Ordering, filtering, lifecycle, fidelity, naming, fallback, allowlisting, sanitization, retries, and boundary validation should not be duplicated across read models, routes, serializers, tests, and UI.
- Duplication is especially serious when two copies can drift silently or already differ.
- Adapters may format, truncate, or serialize; they should not redefine core policy.

### Modules are deep enough

- New modules should hide complexity behind a small interface.
- Shallow wrappers, pass-through methods, and layer stacks that forward the same parameters usually indicate weak responsibility boundaries.
- A more complex implementation can be acceptable if it substantially simplifies callers.

### Boundaries validate unknown data

- Unknown JSON, metadata, external payloads, and legacy persisted shapes must be parsed into safe types at the boundary.
- Optional diagnostics or enrichment should degrade or be omitted when malformed unless the contract explicitly says the whole operation must fail.
- Exception surfaces are part of the interface; avoid needless failure modes.

Completion criterion: APoSD findings name the concrete complexity mechanism and affected future change or debugging risk.

## 4. Calibrate severity

Use these categories.

### Blocking

Request changes when a finding:

- makes the artifact, API, UI, or generated output misleading;
- violates an accepted contract, non-goal, authorization boundary, or data-safety rule;
- can attribute data to the wrong entity, source, session, user, tenant, or lifecycle state;
- stores or exports incorrect truth because an invariant is inferred rather than represented;
- duplicates core policy where drift can change behavior or already has changed behavior;
- lets malformed optional boundary data abort a required core workflow;
- has tests that explicitly ratify the wrong semantics.

### Fix-now

Request local cleanup before acceptance when a finding:

- creates shallow wrappers or pass-through layers around new code;
- spreads a naming, formatting, fallback, or validation rule into multiple places;
- adds vague names or comments around central concepts;
- adds unnecessary configuration, exceptions, or caller-managed sequencing;
- leaves a small APoSD issue that is inside the ticket scope and cheap to fix.

### Advisory

Record but do not block when a finding:

- improves maintainability but would widen the approved ticket;
- concerns rare edge behavior that is honest, visible, and non-destructive;
- suggests consolidation after the current safe slice lands;
- depends on a product decision Mission Control has not made.

Completion criterion: severity explains why the issue blocks, should be fixed now, or can safely become a future frontier proposal.

## 5. Return a Mission-compatible verdict

For Mission-managed validation, move the validation ticket to `Review` and return the verdict. Do not close the implementation ticket or mission; Mission Control owns acceptance.

Use this shape:

```markdown
## Verdict
Pass | Request changes | Inconclusive

## Blocking findings
1. <issue>
   - Evidence: <paths/lines/tests/commands>
   - Principle: <APoSD or contract rule>
   - Required fix: <behavioral/design outcome, not a full patch plan>

## Fix-now findings
...

## Advisories
...

## Strengths
- <important good design choices worth preserving>

## Verification
- <commands run, tests inspected, CI evidence, diff/status inspected>

## Not verified
- <limits of review>

## Mission return
- Implementation ticket impact:
- Proposed map delta:
- Recommended next frontier:
```

Completion criterion: Mission Control can decide accept, rework, split, pause, or close from the review brief alone.

## Common pitfalls

1. **Style review disguised as design review:** only block issues with concrete contract, debugging, complexity, or safety consequences.
2. **Reviewer discovery loop:** do not keep expanding requirements. Classify new material questions as frontier proposals or fog; do not create tickets before selection.
3. **Patch plan overreach:** state required design outcomes, but do not prescribe every edit unless the evidence demands a specific fix.
4. **Ignoring strengths:** preserve good deep modules, centralized policy, and safe boundaries; do not flatten them into generic architecture advice.
5. **Trusting tests blindly:** tests can encode misleading concepts. Inspect whether the test names and assertions model the right truth.
6. **Late APoSD only:** if findings are basic implementation design issues, recommend strengthening the upstream `strategic-implementation` pass.

## Completion checklist

- [ ] Contract, non-goals, diff, tests, and relevant code paths were inspected.
- [ ] Findings are labeled Contract, APoSD, or Both in substance, even if not in a table.
- [ ] Every blocking finding cites evidence and a principle.
- [ ] Tests are reviewed for semantic correctness, not only pass/fail status.
- [ ] Strengths and residual risks are recorded.
- [ ] Verdict is Pass, Request changes, or Inconclusive.
- [ ] Mission return does not accept the mission or activate the next frontier.
