---
name: strategic-implementation
description: "Use when executing an approved software implementation ticket, especially inside Mission, where the change affects APIs, modules, persistence, read models, serialization, domain rules, security-sensitive behavior, or shared UI. Applies strategic programming and A Philosophy of Software Design during implementation so the result is not merely test-green tactical code."
license: MIT
---

# Strategic Implementation

Strategic Implementation executes one approved software change while actively reducing long-term complexity. It operates inside Mission's lifecycle: Mission controls the frontier, Discovery tickets reduce fog, and this skill turns an accepted contract into code without becoming a tactical tornado.

The core loop is to orient to the approved ticket, name the design pressure, model high-interaction state when present, prove behavior, implement, perform the APoSD refactor, verify C0 eligibility, and preserve a reviewable implementation candidate.

The goal is not architectural ceremony. The goal is code that is easier to understand and modify after the ticket than before it.

## When to use

Use this skill for a Mission `Execution` ticket or standalone implementation when the work changes any of:

- public behavior, APIs, routes, adapters, serializers, read models, file naming, downloads, reports, or generated artifacts;
- persistence, attribution, identity, ordering, lifecycle, authorization, or security boundaries;
- domain language, invariants, state transitions, error handling, or fidelity/completeness labels;
- shared modules, components, hooks, helpers, or test seams that future work will reuse.

Do not use it for tiny mechanical edits with no design surface, formatting-only changes, throwaway spikes, or Discovery work. If the active Mission ticket is not `Kind: Execution`, return to Mission instead of implementing.

## Core principles

- **Strategic over tactical:** passing tests is necessary but not enough. The implementation must avoid leaving avoidable complexity for the next developer.
- **Deep modules:** prefer interfaces that hide meaningful complexity over shallow wrappers and pass-through layers.
- **Information hiding:** each important policy or design decision should have one home.
- **Honest interfaces:** names, IDs, fidelity labels, errors, and comments must not overpromise or hide limitations.
- **Represent invariants directly:** do not drop authoritative facts and re-derive them later from weaker signals.
- **Define errors out of existence:** validate unknown data at boundaries so optional malformed detail does not break the core use case.

These principles are grounded in John Ousterhout's *A Philosophy of Software Design*, but the skill applies the ideas as operational checks rather than book commentary.

## 1. Orient to the execution contract

Read the active ticket, accepted product/technical contract, repository instructions, current branch, worktree status, and changed-surface context. Identify the exact behavior to implement and the surfaces that must not change.

For Mission-managed work:

- confirm the ticket is `Active` and `Kind: Execution`;
- treat Objective, Scope, Non-goals, dependencies, and Acceptance/evidence as frozen;
- if a required product, security, data, or architecture decision is missing, stop and return a Mission checkpoint rather than inventing it;
- do not activate downstream validation or another ticket.

Completion criterion: the implementation boundary is clear enough that a fresh reviewer could tell whether a change is inside or outside scope.

## 2. Name the design pressure

Before writing production code, state the main design pressure in one short paragraph or ticket note. Use only the bullets that matter:

- What concept, policy, or invariant must remain true?
- What future change should become easier?
- Which callers/users should not need to know the hard detail?
- Which existing convention should be followed rather than improved ad hoc?
- Which data is authoritative, and which data is only a derived/read-model view?

If the ticket introduces a new interface or boundary, do a lightweight **design-it-twice** pass: compare two plausible placements or interfaces, choose one, and record the reason. Do not expand this into a separate design document unless Mission Control approved a Deliverable ticket.

### High-interaction preflight

Before production code, perform a compact state-and-interaction preflight when the change involves concurrency, lifecycle transitions, shared mutable state, ownership transfer, queues or ordering, retries, rollback or recovery, late events, several sources of truth, or a module whose responsibilities must change together. File length alone is not a trigger; hidden interaction and change coupling are.

Record a compact, falsifiable preflight for each applicable state or resource:

| State/resource and invariant | Single owner | Mutation entry point / atomic boundary | Fencing or correlation | Late-event behavior | Cleanup / recovery |
| --- | --- | --- | --- | --- | --- |
| ... | ... | ... | ... | ... | ... |

For every applicable concurrency, retry, ownership, late-event, or cleanup risk, name the negative test or reproducible probe that would expose a broken model. Mark a column `N/A — <reason>` rather than leaving uncertainty implicit.

If the accepted contract and current code do not support one coherent model, stop before implementation and return a `contract-gap` or `architecture-gap` checkpoint. Do not compensate for a missing model by adding local patches or buying a stronger route.

Completion criterion: the implementation has a named complexity target and, when interaction risk is present, every applicable preflight column and negative probe has a falsifiable entry.

## 3. Build with behavioral proof

Use the repository's test discipline. When feasible, drive behavior test-first: write the smallest failing test or reproducible check, watch it fail for the expected reason, implement the smallest coherent slice, and watch it pass. If strict TDD is impractical, state why and create equivalent before/after evidence.

Prefer tests at public seams:

- routes, commands, adapters, serializers, exports, generated artifacts, or user-visible UI;
- domain transitions and invariant enforcement;
- boundary validation for unknown external/persisted data;
- failure behavior, not only happy paths.

For bootstrap, migration, time-dependent, or persistent-state changes, add both fresh-state and preserved-state evidence when either path can behave differently. State why one path is immaterial when only one applies.

Completion criterion: the new behavior has executable or reproducible evidence that would fail against the old behavior or a plausible broken design, including applicable negative and fresh/preserved-state paths.

## 4. Perform the APoSD refactor pass

After the code is green, do not stop. Re-read the diff and apply the strategic checkpoint below. Fix local design problems inside the ticket scope before broad verification.

### Complexity symptoms

- **Change amplification:** would the next similar change require edits in several unrelated places?
- **Cognitive load:** does a caller or future maintainer need to know details that could be hidden?
- **Unknown unknowns:** is it obvious where policy, invariants, identifiers, and failure behavior live?

### Module depth and boundaries

- New modules should hide meaningful complexity, not merely forward parameters.
- Route/handler code should parse, authorize, call the use case, and format the response; business rules and policy should not be trapped there.
- Shared UI/actions should remove caller burden, not expose rare configuration on the common path.

### Information hiding

- Centralize policy for ordering, completeness/fidelity labels, naming, lifecycle, filtering, retries, file-name safety, redaction/allowlisting, and fallback rules.
- Do not duplicate a read model or serializer policy in a second file unless the ticket explicitly accepts the residual risk.
- Adapters may format, truncate, or serialize; they should not redefine domain truth, diagnostic truth, or business policy.

### Honest concepts and interfaces

- Use different names for different concepts. Distinguish authoritative entity IDs, source/read-model IDs, actor IDs, tenant/context IDs, and external-provider IDs instead of collapsing them into a generic `id`.
- Conservative labels beat misleading labels. If any part is approximate, legacy, mixed, inferred, partial, stale, or externally sourced, the interface must say so.
- Comments should describe invariants, intent, units, ordering, limitations, or side effects; delete comments that merely repeat code.

### Boundary validation and errors

- Parse unknown JSON, metadata, external payloads, and legacy persisted shapes at one boundary into safe domain/application types.
- Optional diagnostics, telemetry, or enrichment should be omitted or degraded when malformed; they should not abort the core operation unless the contract says so.
- Prefer APIs that do the right thing by default and avoid unnecessary flags, exceptions, and caller-managed sequencing.

Completion criterion: every material APoSD issue is either fixed, recorded as a justified residual risk, or returned to Mission as a scope/risk checkpoint.

## 5. Verify proportionally

Run the narrowest meaningful tests first, then the broader project gate required by the ticket or changed surface. Include static checks, typecheck, lint, formatting, migration checks, or manual/browser verification only when relevant to the change.

Before returning, inspect the diff and status:

- staged, unstaged, and untracked files;
- generated files or lockfiles;
- accidental debug logs, commented-out code, unused helpers, or unrelated edits;
- whether tests ratify the intended design or merely bless the current implementation.

Completion criterion: verification evidence matches the changed surface, and the worktree disposition is known.

## 6. Pass the C0 eligibility gate

Before creating the first formal candidate, map every material Acceptance obligation:

| Obligation | Faithful boundary / oracle | Red-capable or adversarial evidence | Green evidence | State |
| --- | --- | --- | --- | --- |
| ... | ... | ... | ... | Pass / Fail / Unverified |

The narrowest faithful boundary owns the oracle; broader suites may contribute evidence without replacing it. `Red-capable` means the check failed against the old behavior or can distinguish a plausible broken implementation; use adversarial evidence when authorization, malformed input, ordering, concurrency, recovery, or another hostile condition is material. A broad green suite is supporting evidence, never a substitute for an obligation row.

`Fail` returns to implementation. `Unverified` returns a checkpoint naming the missing oracle, environment, authority, or contract decision; it is not eligible for C0.

Completion criterion: every material Acceptance obligation is `Pass` with a faithful oracle, applicable red/adversarial evidence, and current green evidence.

## 7. Preserve and return an implementation candidate

For Mission-managed work, keep the Execution ticket `Active` and create a local candidate commit after the implementation and proportional verification are complete. The first candidate is `C0`; bounded repairs may create `C1` and `C2`. Before any `C3`, stop for the Mission root-cause checkpoint described below. A candidate commit is a review checkpoint, not human acceptance.

- Commit one coherent candidate or repair, not every mechanical edit.
- Treat local edits and test runs before a committed handoff as diagnostic iterations. Candidate labels count only formal, review-eligible commits; do not spend `C1` or `C2` on an incomplete diagnosis.
- Keep candidate commits local; never push them before Mission Control accepts the worktree disposition.
- Include only the active ticket's authorized implementation, evidence, and mechanically required mission updates.
- Record actual SHAs and preserve the sequence during review. Verify that the base is an ancestor of `C0` and, before each repair handoff, that the previous candidate is an ancestor of the current candidate. Do not amend, rebase away, or silently replace a reviewed candidate. If lineage becomes unreliable, preserve the known SHAs and report it; incremental review is no longer eligible.
- After acceptance, Mission Control decides whether to keep, reorder, or squash the sequence.

When implementation review returns bounded `implementation-defect` or `repair-regression` findings, resume the same implementer context and canonical profile when available, let `agent-routing` resolve the currently available harness adapter, fix only the valid findings, rerun their red-capable evidence, and create `C1` or `C2`. Before another formal candidate would become `C3`, persist a root-cause section that groups open findings by cause or boundary and records which existed in `C0`, which repairs regressed, whether the contract and preflight exposed each obligation, and which responsibilities were crossed. Another formal candidate requires Mission Control's explicit recorded disposition; diagnostic read-only work may continue without consuming a candidate label. Change canonical profile only after `agent-routing` classifies the failed dimension; a round count alone is not capability evidence.

Return a compact candidate handoff. The Mission owner routes `C0` to `implementation-review` in fresh independent context inside the same ticket. Do not mark the ticket `Review`, close it, push, start use-case QA, or activate the next frontier.

Include:

```markdown
## Result
<implemented behavior and any material deviations>

## Evidence
<tests, commands, inspected files, screenshots/logs as relevant>

## C0 eligibility
<completed obligation matrix from the C0 eligibility gate>

## Design quality evidence
- Complexity impact:
- Concepts/interfaces changed:
- Invariants represented directly:
- Policy homes / duplicated policy removed or deferred:
- APoSD residual risks:

## Remaining uncertainty
<unknowns and deferred advisories>

## Reviewer handoff
- Approved design and contract:
- Base commit:
- Candidate commit and kind: C0 initial | C<n> repair
- Candidate SHA and verified ancestor:
- Canonical implementer profile and optional execution-route provenance:
- Full ticket range: <base>..<candidate>
- Previous candidate SHA, verified ancestry, and incremental range: <when this is a repair>
- Highest-risk claims to verify:
- High-interaction preflight: <path/section or not triggered>
- Known pre-existing failures or environmental limits:
```

Completion criterion: the candidate is a local commit whose eligibility matrix is entirely `Pass`, with an unambiguous base and review range; a fresh independent reviewer can verify it without trusting the implementer's summary, and the Execution ticket remains Active.

## Common pitfalls

1. **Green tactical code:** tests pass, but policy is duplicated, concepts are vague, and the next change is harder. Fix during the APoSD pass before returning the implementation candidate.
2. **Review-as-design:** waiting for an independent reviewer to discover obvious design issues. The implementer owns the first strategic pass.
3. **Concept overloading:** one label means two things. Split the model or rename the artifact before tests fossilize the confusion.
4. **Re-derived truth:** authoritative IDs or invariants are available upstream but dropped and guessed later. Preserve the fact directly.
5. **Interface optimism:** labels such as `faithful`, `complete`, `safe`, or `verified` hide partial or approximate evidence. Use conservative names and explicit caveats.
6. **Boundary casting:** casting unknown metadata into trusted types. Validate centrally and degrade optional detail.
7. **Refactor expansion:** using design cleanup to widen the ticket. Stop and return a Mission checkpoint when cleanup changes scope, risk, or acceptance.
8. **Premature human handoff:** moving the ticket to Review when only the implementation agent has finished. Return a candidate and let the independent implementation review complete the Active ticket.
9. **QA substitution:** claiming the implementation review proves real use cases end to end. Focused implementation tests support this candidate; a later `use-case-qa` Validation ticket exercises accepted scenarios through the project's QA method.
10. **Unmodeled interaction:** editing concurrency, lifecycle, rollback, or shared state before identifying ownership, atomicity, cleanup, and late-event behavior. Stop and perform the high-interaction preflight.
11. **Commit means accepted:** avoiding useful candidate commits or treating them as permission to push. Candidate commits are local review checkpoints; Mission Control still owns acceptance and final history.
## Completion checklist

- [ ] Active work belongs to one approved Execution boundary.
- [ ] Main design pressure and affected concepts are named.
- [ ] High-interaction state/resources, ownership, atomicity, fencing/correlation, cleanup/recovery, late events, and applicable negative probes were modeled.
- [ ] Behavior is proven at faithful seams, including applicable fresh-state and preserved-state paths.
- [ ] APoSD pass checked complexity, module depth, information hiding, honest interfaces, and boundary validation.
- [ ] Authoritative invariants are represented directly rather than re-derived.
- [ ] Duplicated policy is removed or recorded as accepted residual risk.
- [ ] Every material Acceptance obligation is `Pass` in the C0 eligibility matrix; none is `Unverified`.
- [ ] Verification matches the changed surface and worktree status is known.
- [ ] Mission return identifies a local candidate commit, base, full range, and any incremental range; the ticket is still `Active`, and the reviewer handoff is self-contained.
