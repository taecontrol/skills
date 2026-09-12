# Implementation-spec skill landscape

## Question and scope

What minimum skill should turn accepted software design into a temporary, worktree-local implementation specification whose vertical slices execute strictly one at a time, without reviving goal mode, a goal map, parallel scheduling, or an external tracker?

This review is bounded to Taecontrol's last two `pursue-goal` designs, Matt Pocock's current `to-spec` and `to-tickets`, OpenAI's vendored Superpowers `writing-plans`, Test Double's Han `plan-work-items`, and Git's official worktree model. Sources were inspected on 2026-09-12 at the revisions linked below. Execution and verification skills are out of scope; this report defines only the artifact and the process that makes it safe to consume later. The work is assumed to begin and finish in one already-created worktree on one machine.

## Direct answer

Create one user-invoked skill named `implementation-spec`. It consumes already accepted product, domain, architecture, UI, and validation decisions; inspects the current repository; derives one ordered sequence of vertical slices; obtains an independent read-only review; explains the package to the human; and stops for one explicit acceptance. It never enters a harness plan mode, creates a goal, executes a slice, schedules parallel work, or manages worktrees.

Produce one temporary local Markdown artifact, not separate SPEC, SLICES, goal-map, ticket, and execution-plan records. Resolve its path from a user choice or repository convention, with `.work/implementation/<change-slug>.md` as the fallback, and keep it outside version control. Delete it after implementation and final verification once every still-relevant fact has moved to code, tests, maintained documentation, an ADR, or the domain glossary. Because design and implementation occur in the same worktree, the artifact needs no transport or worktree orchestration.

## What to retain and remove from `pursue-goal`

Taecontrol's first adaptive `pursue-goal` already separated facts, assumptions, accepted decisions, open questions, slices, candidates, and evidence. Its later form improved the implementation inputs with a concise product/technical SPEC, a validation table, vertical slices, explicit protected behavior, and an acceptance gate. [Initial coordinator](https://github.com/taecontrol/skills/blob/d8c53df75c4de46720e8701b11de6e7fdcf9b142/skills/pursue-goal/SKILL.md) [later coordinator](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/pursue-goal/SKILL.md) [later design procedure](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/pursue-goal/references/foundation-session.md)

The later design also explains the observed operational burden: it maintains separate `SPEC.md` and `SLICES.md`, project-profile and goal-map identities, digests, phases, candidate lineage, dependency/conflict graphs, parallel waves, concurrency limits, resource leases, workspaces, validation dispositions, coordination envelopes, and completion ledgers. Much of that exists to make concurrent scheduling and multi-role delivery recoverable. Once slices are strictly sequential and execution is a separate concern, those structures no longer earn their cost.

Retain:

- accepted outcome, boundaries, no-goals, and protected behavior;
- pointers to accepted design and durable decisions without copying them;
- exact observable success and regression evidence;
- narrow vertical slices that can be implemented and verified independently;
- one human acceptance before implementation begins;
- explicit retirement of temporary implementation material.

Remove:

- goal identity, goal mode, goal directory, goal map, and project profile;
- parallel waves, concurrency settings, dependency/conflict graph, resource allocation, and one worktree per slice;
- candidate lineage, coordination envelopes, mutable phase/status history, and duplicated evidence tables;
- execution routing, worker roles, repair loops, commit integration, and closure orchestration.

## Comparable skills

### Matt Pocock: `to-spec` and `to-tickets`

Matt separates synthesis from slicing. `to-spec` turns the conversation and codebase understanding into a tracker-published spec containing the user problem, solution, an intentionally extensive user-story list, implementation decisions, test decisions, exclusions, and notes. It checks testing seams with the user and avoids specific paths or code because they become stale. [Matt `to-spec`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/to-spec/SKILL.md)

`to-tickets` converts a plan or spec into tracer-bullet vertical slices. Each slice crosses the necessary layers, is demoable or independently verifiable, fits one fresh context window, declares blocking edges, and records acceptance criteria. It also handles the legitimate exception of a wide mechanical refactor through an expand–migrate–contract sequence. [Matt `to-tickets`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/to-tickets/SKILL.md)

For Taecontrol, the separation into a product spec and tracker tickets is unnecessary because design has already produced accepted source artifacts and execution is strictly linear. Keep the verticality, context-size bound, observable acceptance, stale-detail warning, and expand–contract exception. Reject the mandatory issue tracker, label vocabulary, one file per ticket, blocking graph, frontier scheduling, exhaustive user-story restatement, and a second user approval solely for ticket granularity.

### Superpowers: `writing-plans`

Superpowers writes a committed plan with global constraints and independently testable tasks, but it expands every task into exact paths, line ranges, interfaces, test code, implementation code, two-to-five-minute actions, and commit commands. Its executor is expected to follow those steps almost literally. [Superpowers `writing-plans`](https://github.com/openai/plugins/blob/1dc195897af4161d039b80d8471ec0a10c9bbc89/plugins/superpowers/skills/writing-plans/SKILL.md)

The useful principle is that each unit carries enough context and observable proof for a fresh implementer. The prescribed microsteps are the wrong abstraction for this Factory: they duplicate implementation, become stale, prevent the implementer from responding to current code, and produce horizontal red/green actions rather than user-meaningful vertical outcomes.

### Test Double Han: `plan-work-items`

Han produces one `work-items.md` and strongly distinguishes vertical slices from layers or stubs. It writes the outcome and acceptance criteria before implementation detail, requires every work item to justify its scope, exposes cut work, keeps test expectations inside acceptance criteria, and discourages line-level prescriptions. These are good controls against invented work and plan bloat. [Han `plan-work-items`](https://github.com/testdouble/han/blob/a86259a348dd0ec8a04b0357dd33753a36f38c2d/han-planning/skills/plan-work-items/SKILL.md)

Its full workflow adds a boundary record, artifact inventories, visual-material folders, multiple dependent skills, a synthesis agent, symbolic cross-reference machinery, HITL/AFK classification, incremental file writes, and extensive formatting rules. The single-artifact and acceptance-first ideas transfer; the surrounding protocol does not.

## Recommended contract

### Invocation and readiness

Keep invocation explicit. Generating an implementation contract and starting its acceptance boundary should be a deliberate human action, not an automatic consequence of discussing code or entering a harness plan mode.

Read the current repository and every accepted artifact relevant to the change. Distinguish accepted product behavior, domain meaning, architecture, UI direction, durable rationale, constraints, assumptions, and unresolved questions. Do not redesign them or silently fill a material gap. If a missing decision would change user-visible behavior, a public contract, important data or security behavior, or costly-to-reverse architecture, return `Not ready` with the exact gap and stop before slicing.

Reversible implementation choices may remain with the future implementer. The specification should constrain outcomes and consequential boundaries, not simulate writing the code in advance.

### One local temporary artifact

Resolve the path in this order:

1. a path supplied by the user;
2. an established repository convention for temporary implementation design;
3. `.work/implementation/<change-slug>.md`.

Use one untracked file in the current worktree. Do not create a goal directory, status file, issue set, execution ledger, index, or external tracker record. Mark the document `Draft` until acceptance and `Accepted` only after the human agrees. The document does not need hashes, a version ledger, or a separate identity record.

The artifact should contain only:

1. **Outcome and boundary:** observable result, in scope, out of scope, and protected behavior.
2. **Accepted inputs:** concise pointers to authoritative designs, ADRs, glossary entries, contracts, prototypes, and repository revision. Do not duplicate their content.
3. **Shared implementation constraints:** only decisions every slice must preserve.
4. **Completion evidence:** the smallest commands or concrete procedures and observable criteria that prove the overall result and protect material regressions.
5. **Ordered slices:** the linear sequence described below.
6. **Assumptions, risks, and retirement:** non-blocking uncertainty, known risk, and where durable knowledge must land before this file is deleted.

Do not include progress checkboxes, current slice, owners, timestamps beyond acceptance, branch/worktree names, commit results, transcripts, retries, review findings, or running status. Those are execution state, not implementation specification.

### Validation contract

Read the project's accepted coding standards rather than inventing commands or policy. Every slice must leave its applicable unit-test suite passing, with new or changed tests only where they provide necessary evidence. When the project defines a CRAP calculator and command, require a maximum score of `8` for production code added or modified by each slice, then run one full-project check with the same maximum after the final slice. When the project provides no CRAP configuration, record both checks as omitted and do not install or invent tooling; that absence alone does not make the specification unready. Any explicit project exception needs accepted rationale.

Define final product validation in the specification: representative journey, environment, data, actions, and observable result. It executes only after all slices are integrated. The specification owns what counts as evidence; later execution owns running the checks and must not turn the specification into a result ledger.

The specification only consumes coding standards. Creating and maintaining the durable standards file is a separate responsibility that warrants its own investigation. The current `implementation-review` skill contains an explicit standards-seeding mode; a future dedicated owner could remove that mixed responsibility while leaving review and specification skills as read-only consumers of accepted project policy.

### Linear vertical slices

Number slices in their only permitted execution order. Every slice should fit one fresh implementation context and one focused commit, leave the integrated repository in a coherent verifiable state, and deliver a narrow end-to-end behavior or operational capability. Do not create dependency edges or parallel-ready labels: slice `N` consumes the accepted result of slices `1..N-1`.

For each slice record:

- **Outcome:** the behavior or operational capability that becomes real.
- **Scope:** included and excluded behavior plus protected behavior at risk.
- **Accepted obligations:** the specific product, domain, architecture, UI, contract, and rationale inputs it realizes, by pointer where possible.
- **Touchpoints:** likely boundaries or code areas only when they orient the implementer; avoid line-level edits and speculative file inventories.
- **Acceptance evidence:** observable pass/fail criteria and the commands or procedures available to prove them.
- **Handoff:** the exact integrated capability the next slice may assume.

Setup, schema, backend, frontend, tests, and documentation normally belong inside the slice whose outcome needs them, not in horizontal layer slices. Allow a non-user-visible enabling slice only when it is independently green, necessary for later vertical work, and explicitly justified. For a wide mechanical migration that cannot remain green as a vertical slice, use an ordered expand–migrate–contract sequence and say why the exception applies.

Each accepted requirement and protected risk must map to at least one slice or overall completion check. Each slice must descend from an accepted input or a demonstrated implementation necessity. Put anything else in a short visible cut list with its reason; do not smuggle speculative cleanup into the sequence.

### Independent preflight and one acceptance

Because implementation is intended to proceed automatically after acceptance, use one fresh read-only reviewer rather than multiple competing planners. Give it the complete draft and its accepted inputs. It checks:

- coverage of outcome, boundaries, protected behavior, and completion evidence;
- fidelity to accepted domain, architecture, UI, contracts, and rationale;
- verticality, context-sized scope, sequential coherence, and clean handoffs;
- missing work, overlap, unjustified work, hidden material decisions, and stale implementation prescription;
- whether every criterion is observable and every slice can leave the repository integrated and verifiable.

The reviewer returns findings, not a replacement plan. Repair the draft once and rerun only the affected checks. If a material design gap remains, return `Not ready`; if the draft remains unsafe to execute within the bound, return `Inconclusive`.

Explain the reviewed specification to the human in their language: what will exist, what will not, the slice sequence, how success will be observed, material risks, and what was cut. Ask for one explicit acceptance. On acceptance, mark and materialize the local file, then stop without executing, committing, or creating a worktree.

### Lifecycle

Treat the accepted specification as immutable input for the implementation run. Discoverable local details may change without revising it when outcomes and consequential obligations remain intact. If execution evidence invalidates a material decision, boundary, slice outcome, or success criterion, revise only the affected content and obtain fresh acceptance before continuing.

After all slices and overall checks pass, migrate only still-relevant knowledge to its maintained owner and delete the implementation specification. GitHub or Linear become appropriate only when humans already use them as the repository's canonical work system or execution must cross clones or machines—neither condition applies to the stated workflow.

## Recommended first version

Implement `implementation-spec` as one self-contained skill plus normal agent metadata. It should be explicitly invoked, create exactly one temporary local document, use one author and one independent preflight reviewer, obtain one human acceptance, and stop. It should contain no dependency on another workflow, goal maps, external trackers, worktree creation, parallelism, or execution-state storage.

## Evidence limits

The public skills demonstrate instruction contracts, not comparative outcome data. The recommendation that one file, one reviewer, and one linear sequence will reduce operational failure is an inference from the user's observed problems and from removing machinery whose stated purpose is concurrency, routing, or tracker publication. Its adequacy still needs validation through real implementation runs after the first version exists.
