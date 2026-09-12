---
name: implementation-spec
description: "Create an accepted, temporary implementation specification from settled software design before implementation begins. Use explicitly when the work needs a strictly ordered sequence of vertical slices and concrete validation evidence."
disable-model-invocation: true
---

# Implementation spec

Turn accepted software design into one temporary contract that an implementer can execute slice by slice. Constrain outcomes, consequential boundaries, and proof; leave reversible coding choices to implementation.

## Process

1. **Establish readiness.** Identify the intended outcome, accepted product and design inputs, protected behavior, repository revision, applicable project instructions, and coding standards. Inspect the current repository rather than relying on conversation alone. If a missing decision could change user-visible behavior, a public contract, important data or security behavior, or costly-to-reverse architecture, return `Not ready` with the exact gap. Do not redesign it inside the specification.
2. **Choose one temporary location.** Use a path supplied by the user, then an established repository convention for local work artifacts, otherwise `.work/implementation/<change-slug>.md`. Keep the document local and outside version control. Work in the current worktree; do not create or manage worktrees, branches, commits, tracker items, goal directories, or execution state.
3. **Write the validation contract.** Define the evidence that slices and the completed product must produce, using commands and thresholds from the project's coding standards or other accepted project configuration. Include the rules under [Validation](#validation). Define evidence here; do not run implementation gates or record their later results in the specification.
4. **Derive one linear slice sequence.** Number slices in their only permitted execution order. Slice `N` consumes the integrated result of slices `1..N-1`; never define parallel waves, dependency graphs, or alternate execution orders. Map every accepted requirement and protected risk to a slice or final validation, and expose anything intentionally cut.
5. **Keep each slice vertical and bounded.** A slice should deliver one narrow end-to-end behavior or operational capability, fit a fresh implementation context and one focused commit, and leave the repository coherent and verifiable. Put setup, schema, service, interface, tests, and documentation inside the slice whose outcome needs them. Allow a non-user-visible enabling slice only when later vertical work genuinely cannot proceed without it and the slice is independently green. For a wide mechanical change that cannot stay green vertically, use an explicit expand–migrate–contract sequence and justify the exception.
6. **Run an independent preflight.** Give one fresh read-only reviewer the complete draft and its accepted inputs. The reviewer checks coverage, fidelity, verticality, sequential coherence, handoffs, observable evidence, hidden decisions, unjustified work, overlap, and stale implementation prescription. It returns findings, not a replacement specification. Repair supported findings and rerun only affected checks. Return `Inconclusive` if independent review cannot establish that the bounded specification is safe to execute.
7. **Ask for one acceptance.** Explain in the human's language what will exist, what will not, the ordered slices, validation, material risks, assumptions, and cuts. Incorporate accepted feedback and ask for explicit acceptance of the whole specification. Mark the document `Accepted` only after that response, then stop without implementing a slice.

## Document contract

Keep one Markdown document with:

- **Status:** `Draft` or `Accepted`.
- **Outcome and boundary:** observable result, scope, exclusions, and protected behavior.
- **Accepted inputs:** concise pointers to authoritative designs, ADRs, glossary entries, contracts, prototypes, standards, and repository revision. Do not duplicate them.
- **Shared constraints:** only obligations every affected slice must preserve.
- **Validation contract:** slice evidence and final product evidence, including explicit omissions.
- **Ordered slices:** the linear sequence defined below.
- **Assumptions, risks, and cuts:** non-blocking uncertainty, known risk, and intentionally excluded work with reasons.
- **Retirement:** durable knowledge that must move to code, tests, maintained documentation, an ADR, or the domain glossary before this file is deleted.

For each slice record:

- **Outcome:** behavior or operational capability made real.
- **Scope:** included and excluded behavior, plus protected behavior at risk.
- **Accepted obligations:** exact accepted inputs the slice realizes.
- **Touchpoints:** likely boundaries or code areas only when they orient implementation; avoid speculative file inventories, line-level edits, and code written in prose.
- **Acceptance evidence:** observable pass/fail criteria and available commands or procedures.
- **Handoff:** integrated capability the next slice may assume.

Do not add progress checkboxes, owners, current-slice markers, timestamps beyond acceptance, execution logs, findings ledgers, retry history, branch or worktree details, or result fields. Execution does not write back into this document.

## Validation

- **Unit tests:** every slice must leave its applicable unit-test suite passing. Require new or changed tests when needed to prove the slice, not merely to satisfy a per-slice test quota. Missing unit-test capability that the accepted work requires is a readiness gap or a justified enabling slice.
- **CRAP index during slices:** when the project defines the tool and command, require a maximum CRAP score of `8` for new or modified production code in that slice.
- **CRAP index at completion:** with that project configuration, require one full-project CRAP check after the final slice, also with a maximum score of `8`.
- **Missing CRAP configuration:** if the project defines no CRAP tool or command, state that both checks are omitted and why. This absence alone does not make the specification `Not ready`. Do not invent or install a calculator. An explicit project exception must include its accepted rationale.
- **Project gates:** carry any additional applicable commands, thresholds, environments, and dispositions from accepted project standards without weakening them.
- **Product validation:** define the final representative journey, environment, data, actions, and observable result. It runs only after all slices are integrated; slice-level technical evidence does not replace it.

## Lifecycle

Treat an accepted specification as immutable implementation input. Discovery may change reversible local details without revising it. If implementation evidence invalidates an outcome, boundary, consequential obligation, slice handoff, or success criterion, revise only the affected contract and obtain fresh human acceptance before continuing.

After every slice and final validation passes, preserve only knowledge that remains useful beyond implementation in its maintained owner, then delete the temporary specification. Do not turn it into permanent documentation by default.

## Outcomes

- `Not ready`: name the missing accepted decision and the work it blocks.
- `Agree-ready`: the reviewed draft is complete and awaiting human acceptance.
- `Accepted`: the human accepted one local specification at the reported path; implementation has not begun.
- `Inconclusive`: name the unavailable evidence or independent review and the exact unblock condition.

## Completion criteria

One locally available Markdown specification traces accepted design to a strictly sequential set of context-sized vertical slices and observable validation. The human has accepted its boundaries, sequence, evidence, risks, and cuts; no material design choice was invented, no execution state or parallel orchestration was introduced, and implementation has not begun.
