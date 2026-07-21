---
name: implementation-review
description: "Use when a completed implementation candidate needs an independent fresh-context review against its approved design, execution contract, non-goals, tests, and strategic design quality before it is ready for human review."
license: MIT
---

# Implementation Review

Implementation Review is the independent completion check inside a software implementation work package. It verifies that the implementation agent built the approved design honestly and coherently; it does not replace later QA of real use cases.

For Mission-managed work, the implementation ticket remains `Active` while this review runs. The reviewer uses fresh agent context, returns a verdict to the Mission owner, and never accepts the ticket on Mission Control's behalf.

## Boundary with use-case QA

Keep these controls distinct:

- **Implementation review:** inspect the candidate against the approved design, contract, scope, non-goals, diff, code paths, and technical tests. It belongs inside the active Execution ticket.
- **Use-case QA:** exercise accepted scenarios through an observable project-specific method such as a simulator, browser harness, API driver, staging environment, or human-assisted procedure. It belongs in a later, separate Validation ticket and should use `use-case-qa` when installed.

Focused tests may be run during implementation review to verify a code claim. That evidence does not prove the full product use cases have passed QA.

Completion criterion: the reviewer can state which control is being performed and does not claim evidence from one as evidence for the other.

## When to use

Use this skill for:

- a candidate returned by `strategic-implementation` inside an active Mission Execution ticket;
- pre-human or pre-merge review of a completed feature, bug fix, hardening slice, or rework candidate;
- changes involving APIs, routes, serializers, read models, persistence, attribution, identity, ordering, lifecycle, security-sensitive data, or shared UI;
- suspicious implementations where tests pass but the model, naming, completeness label, invariant, or source of truth may be wrong.

Do not use it to implement fixes, perform open-ended Discovery, rewrite the accepted design, or execute the later use-case QA phase. If the review exposes a missing product or architecture decision, return a finding and Mission checkpoint rather than silently deciding it.

## Review stance

- **Independent:** inspect primary evidence rather than trusting the implementer's summary.
- **Design-traceable:** compare the code to the accepted design decisions, interfaces, invariants, and non-goals.
- **Evidence-led:** cite paths, lines, tests, commands, outputs, and runtime observations.
- **APoSD-specific:** name the concrete complexity mechanism instead of saying “clean code” or “best practice.”
- **Severity-calibrated:** block only contract, correctness, safety, or material maintainability failures.
- **Read-only:** do not modify the candidate. Findings return to the implementer; the first review is fresh and full, while corrected candidates normally return to the same independent reviewer for incremental verification.

Completion criterion: every material verdict is backed by independently inspected evidence, not taste or implementer claims.

## 1. Load the frozen contract and candidate

Read the active Execution ticket, accepted product and technical design, relevant decisions, repository instructions, implementation candidate handoff, candidate ledger, and intended base. Inspect staged, unstaged, and untracked files. Verify that the named candidate commit exists and derive the changed surface from the actual commit range rather than timestamps or summaries.

Identify:

- required design decisions, interfaces, invariants, and acceptance evidence;
- scope and non-goals;
- modified files and public seams;
- security, authorization, persistence, migration, or data sensitivity;
- tests added or changed;
- implementer-reported deviations, residual risks, and environmental limits.
- candidate label, base, previous candidate when any, full ticket range, and incremental range.

Do not begin from only the implementer summary. If the accepted design or intended diff base cannot be identified, return `Inconclusive` with the missing input.

Completion criterion: every changed public seam is mapped to a frozen design or contract expectation before judgment begins.

### Select the review mode

- **Initial review:** start in fresh agent context and inspect the full `<base>..<C0>` range, contract, relevant surrounding code, tests, and high-interaction preflight. Independence means deriving the verdict from primary evidence rather than trusting the implementer.
- **Incremental re-review:** use the same independent reviewer context when available. Inspect the open ledger findings, the complete current candidate, and primarily `<Cprevious>..<Ccurrent>` plus the focused evidence for each repair. Retain access to `<base>..<Ccurrent>` and widen inspection when the repair interacts with another obligation or risk surface.
- **Fresh full re-review:** restart from `<base>..<Ccurrent>` only when the repair materially reshapes the candidate, introduces a new architecture or risk surface, the prior reviewer is unavailable, the candidate lineage is unreliable, or incremental evidence cannot support a defensible verdict. Record the trigger.

Fresh context separates implementer and reviewer. It does not require reviewer amnesia between repair rounds.

Completion criterion: the review records `initial-full`, `incremental`, or `fresh-full`, the exact commit range, and any fresh-full trigger.

## 2. Trace implementation to design

Check whether the code represents the approved solution rather than a nearby behavior that happens to satisfy selected tests.

For each material design obligation, classify it as `Pass`, `Fail`, or `Unverified` and inspect:

- whether the intended concepts exist with honest names and boundaries;
- whether important invariants are represented directly;
- whether authoritative facts remain authoritative across persistence and adapters;
- whether state transitions and lifecycle ownership match the design;
- whether policy has one implementation home;
- whether errors, fallback behavior, and degraded states follow the contract;
- whether non-goals remained unchanged;
- whether any deviation changes product behavior, architecture, risk, or acceptance.

A local omission inside the frozen contract can be `Request changes`. A missing decision or scope expansion returns to Mission; the reviewer must not manufacture a new design.

Completion criterion: every material design obligation has a disposition and evidence, with deviations separated from ordinary implementation defects.

## 3. Verify technical behavior and tests

Inspect whether the implementation's tests prove the intended technical semantics:

- assertions target public seams, domain transitions, or boundaries that matter;
- new tests would fail against the previous behavior or a plausible broken implementation;
- failure, authorization, malformed-input, and persistence behavior are covered when relevant;
- mocks and test-only helpers do not bypass the policy being claimed;
- test names and fixtures use the accepted domain concepts;
- broad green suites are not treated as proof of an untested design obligation.

Run the narrowest focused tests needed to verify reviewer claims. Reuse trustworthy CI evidence for broad suites where appropriate, but record what was inspected versus rerun. A focused runtime reproduction may verify a technical implementation claim, but it must not be classified as accepted-use-case QA or substitute for the later Validation ticket.

Completion criterion: each required technical behavior is supported by meaningful evidence or explicitly marked `Unverified`.

## 4. Review strategic design quality

Apply the APoSD checks to the changed surface.

### Concepts and interfaces are honest

- One name does not collapse distinct domain concepts.
- Authoritative IDs, source/read-model IDs, actor IDs, tenant IDs, and provider IDs remain distinguishable.
- Labels such as `complete`, `verified`, `safe`, or `authoritative` match the weakest evidence.
- Caller-facing APIs make the common correct use easy and exceptional behavior explicit.

### Invariants and policy have one home

- Important invariants are represented in domain and persistence models rather than inferred from order, naming, or ambient context.
- Ordering, filtering, lifecycle, fidelity, fallback, retries, sanitization, and boundary validation are not redefined across handlers, adapters, serializers, tests, and UI.
- Adapters format and serialize without redefining domain truth.

### Modules hide complexity

- New modules hide meaningful complexity behind a small interface.
- Shallow wrappers and pass-through layers have a real responsibility or are removed.
- Added implementation complexity substantially simplifies callers or future changes.

### Unknown boundaries are validated

- Unknown JSON, metadata, provider payloads, and legacy persisted shapes are parsed into safe types at a clear boundary.
- Malformed optional diagnostics or enrichment degrade safely unless the contract requires hard failure.
- Exception surfaces do not grow without a contract reason.

Completion criterion: every APoSD finding names the complexity mechanism and the future change, debugging, safety, or correctness cost it creates.

## 5. Classify and calibrate findings

Maintain a compact durable ledger in the Execution ticket or a linked artifact. Give each finding a stable ID and classify its origin before deciding the repair path:

- `implementation-defect`: an explicit frozen obligation was implemented incorrectly;
- `contract-gap`: required behavior or evidence is not sufficiently specified by the frozen contract;
- `architecture-gap`: the accepted system model cannot represent or safely own the required invariant;
- `repair-regression`: a correction introduced a new defect;
- `stale-or-invalid`: the claim does not apply to the current candidate or is not supported by primary evidence.

For each prior finding, record `Open`, `Resolved`, `Superseded`, or `Rejected with evidence`. For each new finding during re-review, record whether it existed in `C0` but was detected late, was introduced by the repair, or became visible because the repair changed the inspected surface. Contract and architecture gaps return to Mission; they are not implementation patch instructions.

Completion criterion: every finding has a stable ID, origin, evidence, required outcome, candidate of origin, and current status.

Use three finding classes.

### Blocking

Return `Request changes` when a finding:

- violates the approved design, contract, non-goal, authorization boundary, or data-safety rule;
- makes an API, UI, artifact, or diagnostic claim misleading;
- can attribute data to the wrong entity, source, user, tenant, or lifecycle state;
- stores or exports incorrect truth because an invariant is inferred;
- duplicates core policy where drift can change behavior;
- lets malformed optional boundary data abort a required core workflow;
- has tests that ratify the wrong semantics.

### Fix-now

Request bounded cleanup before human Review when a finding:

- creates a shallow wrapper or pass-through layer in the new code;
- spreads a naming, fallback, formatting, or validation rule;
- adds vague names around a central concept;
- adds unnecessary configuration, exceptions, or caller-managed sequencing;
- is inside the frozen scope, cheap to fix, and would otherwise leave avoidable complexity.

### Advisory

Record without blocking when a finding:

- improves maintainability but would widen the approved ticket;
- concerns rare behavior that is honest, visible, and non-destructive;
- suggests later consolidation after the safe slice lands;
- depends on a product decision Mission Control has not made.

Completion criterion: severity explains why the issue blocks completion, should be fixed before human Review, or belongs outside the ticket.

## 6. Return the in-ticket verdict

Return one verdict:

- `Pass`: every material design and contract obligation is `Pass`, so the candidate is eligible to make the Execution ticket human-ready.
- `Request changes`: bounded implementation defects or repair regressions remain; the same Execution ticket stays Active for correction and incremental re-review by the same independent reviewer when available.
- `Inconclusive`: any material obligation is `Unverified`, or missing evidence, access, base, design input, or environment prevents a defensible verdict; the ticket stays Active or becomes Blocked.

Use this return shape:

```markdown
## Verdict
Pass | Request changes | Inconclusive

## Review lineage
- Mode: initial-full | incremental | fresh-full
- Base / candidate:
- Previous candidate / incremental range: <when applicable>
- Fresh-full trigger: <when applicable>

## Design and contract trace
- <obligation>: Pass | Fail | Unverified — <evidence>

## Blocking findings
1. <stable ID> — <issue>
   - Origin: implementation-defect | contract-gap | architecture-gap | repair-regression | stale-or-invalid
   - Introduced/detected: <candidate and round>
   - Status: Open | Resolved | Superseded | Rejected with evidence
   - Evidence: <paths/lines/tests/commands>
   - Principle: <contract, design, or APoSD rule>
   - Required outcome: <what must become true>

## Fix-now findings
...

## Advisories
...

## Strengths
- <design choices worth preserving>

## Verification
- <diff/status inspected, tests inspected or run, runtime observations>

## Not verified
- <limits; explicitly exclude later use-case QA>

## Execution ticket disposition
- Keep Active for rework | Keep Active/Block for missing evidence | Eligible for Mission Review
```

The reviewer does not modify code, change the ticket to Review, close it, activate QA, or accept the mission. The Mission owner applies the disposition, updates durable evidence, and presents a human Review brief only after `Pass`.

Completion criterion: Mission can apply the verdict without interpreting ambiguity, and no later QA claim is implied.

## Common pitfalls

1. **Human Review too early:** the implementer finishes and the ticket moves to Review before this independent verdict. Keep it Active.
2. **QA substitution:** focused tests and design inspection are reported as proof that accepted use cases work end to end. Reserve that claim for `use-case-qa`.
3. **Style review disguised as design review:** only block issues with concrete contract, debugging, complexity, or safety consequences.
4. **Reviewer discovery loop:** new product or architecture questions become findings and map proposals, not silently appended requirements.
5. **Patch-plan overreach:** state required outcomes without prescribing every edit unless one design outcome is forced.
6. **Trusting tests blindly:** inspect whether names, fixtures, and assertions encode the accepted truth.
7. **Reviewer self-fix:** changing code destroys the independent read-only checkpoint and hides whether the implementer contract was sufficient.
8. **Independence as amnesia:** recreating a full context for every repair loses the finding history and repays discovery cost. Keep the reviewer independent from the implementer, but preserve reviewer continuity.
9. **Unclassified patch loop:** returning every blocker as an implementation edit hides contract and architecture gaps. Classify origin before choosing disposition.

## Completion checklist

- [ ] Active Execution ticket, accepted design, non-goals, candidate lineage, exact commit range, tests, and relevant paths were inspected.
- [ ] Review mode and any fresh-full trigger were recorded.
- [ ] Every material design obligation is Pass, Fail, or Unverified with evidence.
- [ ] Tests were reviewed for semantic correctness, not only pass/fail status.
- [ ] Every finding has a stable ID, origin, candidate/round, evidence, required outcome, and status in the ledger.
- [ ] Findings identify contract, design, or APoSD consequences and calibrated severity.
- [ ] Strengths and residual risks are recorded.
- [ ] Verdict is `Pass`, `Request changes`, or `Inconclusive`.
- [ ] The return keeps implementation review inside Execution and makes no use-case QA claim.
