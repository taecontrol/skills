# Software Factory v0.1 skill library

## Purpose

This document defines the canonical skill capabilities that implement [`Software Factory v0.1`](./software-factory-v0.1.md). Skills are selected by the Coordinator from the current question or responsibility. They are not mandatory phases and do not determine the complete route in advance.

The canonical implementations live in `taecontrol/skills`. Upstream skills are design inputs, not runtime dependencies. Each adapted skill preserves attribution, records its source revision, and changes behavior where the Factory contract requires it.

## Upstream baselines

### Matt Pocock skills

- Repository: `https://github.com/mattpocock/skills`
- Baseline revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`
- License: MIT
- Copyright: Matt Pocock, 2026

### Unslop

- Repository: `https://github.com/cursor/plugins`
- Plugin: `pstack`
- Baseline revision: `60c641e4fad674784b30abcf9f8915dea39df38d`
- Plugin version: `0.14.1`
- License declared by plugin: MIT
- Author declared by plugin: Lauren Tan

### Package provenance map

| Canonical skill | Upstream baseline path | Baseline disposition |
| --- | --- | --- |
| `grilling` | `mattpocock/skills:skills/productivity/grilling/SKILL.md` | Material adaptation with frontier behavior preserved |
| `wait-what` | `mattpocock/skills:skills/productivity/wait-what/SKILL.md` | Material bilingual adaptation |
| `writing-for-agents` | `mattpocock/skills:skills/productivity/writing-for-agents/SKILL.md` | Existing adaptation; reconcile against pinned baseline |
| `research` | `mattpocock/skills:skills/engineering/research/SKILL.md` | Material artifact-policy adaptation |
| `prototype` | `mattpocock/skills:skills/engineering/prototype/SKILL.md` | Material Factory integration adaptation |
| `diagnosing-bugs` | `mattpocock/skills:skills/engineering/diagnosing-bugs/SKILL.md` | Material authority and handoff adaptation |
| `domain-modeling` | `mattpocock/skills:skills/engineering/domain-modeling/SKILL.md` | Material persistence and authority adaptation |
| `codebase-design` | `mattpocock/skills:skills/engineering/codebase-design/SKILL.md` | Existing adaptation; reconcile against pinned baseline |
| `improve-codebase-architecture` | `mattpocock/skills:skills/engineering/improve-codebase-architecture/SKILL.md` | Material portability and Factory routing adaptation |
| `tdd` | `mattpocock/skills:skills/engineering/tdd/SKILL.md` | Experimental strategy adaptation |
| `wizard` | `mattpocock/skills:skills/engineering/wizard/SKILL.md` | Material portability and authorization adaptation |
| `unslop` | `cursor/plugins:pstack/skills/unslop/SKILL.md` | Material language and artifact-scope adaptation |
| `spike` | No distributable upstream baseline | Taecontrol-authored from the Factory contract; no upstream text incorporated |
| `architecture-design` | No single upstream package | Taecontrol-authored composition of local Factory design and domain minimums, optionally enriched by available canonical capabilities |
| `adr` | Existing Taecontrol canonical skill | Existing package, not an adaptation in this effort |
| `cleaner` | No distributable upstream baseline | Taecontrol-authored Factory write-role capability |

Every Matt path in this table uses revision `885e2ca4d842d139e9aef4e48d366c63cb1b8013`. The Unslop path uses revision `60c641e4fad674784b30abcf9f8915dea39df38d`.

## Packaging rules

1. Keep each skill independently installable.
2. Preserve familiar upstream names unless a different name prevents a real contract collision.
3. Add a package-level provenance record naming the canonical skill, upstream repository, immutable revision, exact source paths, license disposition, whether text was copied, materially adapted, or only consulted, and the Taecontrol-specific changes.
4. Include the applicable MIT notice when the adaptation contains a substantial portion of upstream text. A consulted source with no incorporated text is recorded as design provenance without implying copied authorship.
5. Keep Factory authority and routing in `pursue-goal`; specialist skills own procedures, not global orchestration.
6. Make project locations and artifact conventions configurable or discoverable. Do not hard-code `CONTEXT.md`, ADR paths, issue trackers, or Claude-specific commands as universal requirements.
7. Return compact evidence to the Coordinator. Persist a discovery artifact only when it will remain useful after the current question is settled.
8. Use progressive disclosure for branch-specific procedures and bulky examples.

## Capability taxonomy

| Capability | Canonical skill | Factory location | Default invocation |
| --- | --- | --- | --- |
| Decision-tree interview | `grilling` | Coordinator synchronization | Coordinator-selected when material decisions are ready |
| Re-explain failed communication | `wait-what` | Human communication recovery | Human-invoked |
| Remove AI filler | `unslop` | Human-facing communication | Applied to human-facing prose |
| Write agent-facing artifacts | `writing-for-agents` | Cross-cutting authoring | Selected for skills, agent rules, and agent contracts |
| Primary-source investigation | `research` | Discovery | Coordinator-selected |
| Technical feasibility experiment | `spike` | Discovery | Coordinator-selected |
| Product, state, or UI experiment | `prototype` | Discovery | Coordinator-selected |
| Bug and performance diagnosis | `diagnosing-bugs` | Discovery and repair routing | Coordinator-selected from an observed failure |
| Domain terms and invariants | `domain-modeling` | Discovery | Coordinator-selected when the model is uncertain or changing |
| Deep-module vocabulary | `codebase-design` | Shared design reference | Loaded by design, Cleaner, and Verifier when applicable |
| Consequential architecture design | `architecture-design` | Composite discovery | Coordinator-selected for expensive-to-reverse design questions |
| Architecture opportunity scan | `improve-codebase-architecture` | Composite discovery | Human- or Coordinator-selected for demonstrated friction |
| Candidate repair and hardening | `cleaner` | Production delivery | Coordinator-selected after implementation or a repairable independent finding |
| Test-first implementation strategy | `tdd` | Production delivery experiment | Project-profile or human-selected |
| Human-only procedural assistance | `wizard` | Operations adapter | Coordinator-selected when the agent cannot perform a required step |
| Durable architecture rationale | `adr` | Optional accepted-decision recording | Coordinator-selected after rationale is accepted |

## Communication capabilities

### `grilling`

#### Preserve from upstream

- Model decisions as a design tree.
- Define the frontier as decisions whose prerequisites are settled.
- Ask the complete frontier in one numbered round.
- Include a recommended answer for every question.
- Find environmental facts through tools or delegated agents instead of asking the human.
- Recompute the frontier after every answer round.
- Do not begin production execution or act on an unresolved human-owned decision until shared understanding is confirmed. Independent discovery on other settled branches may continue.

#### Factory adaptation

Factory v0.1 tests the upstream frontier behavior without reducing it to one question per turn.

Add only the Factory integration contract:

- the Coordinator invokes `grilling` for human-owned material decisions;
- discovery may continue on independent branches while a frontier response is pending;
- the final result is a concise playback plus an agent-facing accepted-decision record;
- acceptance authorizes the applicable production slice through local commit;
- unresolved facts remain discovery prerequisites, not human questions;
- `wait-what` repairs a round that did not land.

#### Experiment measures

Record enough evidence to evaluate the behavior without creating user-visible bureaucracy:

- number of rounds;
- number of questions per round;
- corrected or rejected recommendations;
- `wait-what` activations;
- decisions reopened during delivery;
- elapsed time to accepted playback.

The Coordinator may later propose a different batching policy from observed evidence. The initial implementation must preserve Matt's frontier-round behavior.

### `wait-what`

#### Preserve from upstream

- Stop the current progression.
- Re-pitch the last message with enough context to understand where the work stands.
- Use accepted project vocabulary.

#### Factory adaptation

Make the skill bilingual and human-invoked.

1. Detect whether the active conversation is Spanish or English.
2. Re-explain in the same language unless the user requests another.
3. Start with one or two sentences of context: what was being decided or reported.
4. Use short sentences and one main idea per sentence.
5. Define technical terms and acronyms before relying on them.
6. Give one concrete example when the concept remains abstract.
7. Separate facts, decisions, recommendations, and next action.
8. Do not continue execution or introduce new decisions inside the re-pitch.

For English, ASD-STE100 can inform the plain-language pass without overriding accurate technical terminology. For Spanish, use natural plain Spanish rather than a literal translation of Simplified Technical English.

### `unslop`

#### Preserve from upstream

- Remove chatbot filler, puffery, sycophancy, vague attribution, generic conclusions, and promotional language.
- Prefer concrete words and active voice.
- Shorten sentences that require backtracking.
- Remove unnecessary jargon and repeated framing.
- Keep a human voice rather than producing sterile corporate prose.

#### Factory adaptation

Apply the principles to human-facing prose, not blindly to every byte the agent writes.

- Preserve code, quotations, identifiers, domain language, legal wording, and required artifact syntax.
- Respect the target language. Spanish punctuation and natural phrasing are not errors.
- Treat bans on parentheses, curly quotes, colons, or em dashes as signals of overuse, not absolute technical rules.
- Keep the artifact's governing style above `unslop` when exact structure matters.
- Do not add personality, opinions, or mess where the artifact requires neutral evidence.

`unslop` is the final human-communication pass. It does not decide content or replace technical verification.

### `writing-for-agents`

Use the existing information hierarchy, context-pointer, completion-criterion, leading-word, and pruning disciplines for:

- skills;
- `AGENTS.md` or equivalent project rules;
- agent-facing accepted-decision records;
- project profiles;
- dispatch and handoff contracts.

Do not apply it as the default style guide for ordinary human conversation. `unslop` and the user's language preference govern that surface.

## Discovery capabilities

### `research`

#### Preserve from upstream

- Run reading legwork in a background agent when possible.
- Prefer primary sources: official documentation, source code, specifications, and first-party APIs.
- Cite claims to the source that owns them.

#### Factory adaptation

- The dispatch names one question, why it matters, and what evidence will settle it.
- Return a compact evidence summary to the Coordinator.
- Persist a Markdown report only when the findings will remain useful after the current decision. Match the repository convention when one exists.
- Separate findings, uncertainty, and recommendation.
- Do not turn a short lookup into a durable research artifact.

### `spike`

A technical spike answers an empirical feasibility question that reading cannot settle.

Required contract:

- one observable question;
- a bounded experiment;
- representative conditions and important failure cases;
- actual execution evidence;
- verdict: `Validated`, `Partial`, or `Invalidated`;
- constraints and recommendation for production.

Spike code is disposable by default. Preserve the verdict and useful evidence. Promotion requires an explicit decision and the complete production delivery loop.

Its final canonical package must follow Factory artifact and authority rules.

### `prototype`

#### Preserve from upstream

- Build throwaway code to answer a design question.
- Choose the artifact shape from the question: logic/state exploration or UI alternatives.
- Make the result easy for the human to exercise.
- Surface relevant state after actions.
- Avoid production abstractions, persistence, and polish unless they are the subject of the experiment.

#### Factory adaptation

- State the question and verdict explicitly.
- Use the Factory's visual-artifact verification before presenting UI or diagram prototypes.
- Keep prototype code out of the production candidate by default.
- Preserve the answer and evidence; retain the prototype itself only when it remains a useful primary source.
- Promotion requires explicit human acceptance and the complete production delivery loop.

### `diagnosing-bugs`

#### Preserve from upstream

- Build a tight red-capable feedback loop before theorizing.
- Reproduce the user's exact symptom and minimize the case.
- Generate several falsifiable hypotheses.
- Instrument one prediction at a time.
- Preserve the original symptom and regression evidence.
- Remove temporary instrumentation.

#### Factory adaptation

Separate diagnosis from production repair:

1. The diagnostic agent returns the red-capable command, minimal reproduction, evidence, ranked hypotheses, tested predictions, and supported root cause.
2. The Coordinator routes a supported local defect to the Cleaner or an accepted implementation slice.
3. A contract or consequential architecture gap returns to human synchronization.
4. Missing access or an unobservable symptom returns an exact unblock condition.

Do not require the human to review hypotheses before testing. Present them concisely when domain knowledge could materially change their ranking, but continue with the supported ranking when the user is unavailable.

The final production fix still passes Cleaner, Verifier, and Product Validator as applicable.

### `domain-modeling`

#### Preserve from upstream

- Challenge conflicting or overloaded terms.
- Sharpen fuzzy language.
- Stress-test concepts with concrete edge-case scenarios.
- Cross-check stated behavior against code and evidence.
- Keep domain language free of implementation details.
- Record consequential rationale sparingly.

#### Factory adaptation

- Discover the project's domain-artifact convention. Do not require `CONTEXT.md` or `CONTEXT-MAP.md` universally.
- Propose canonical terms during grilling; persist them after the human accepts the meaning.
- Separate glossary, behavior specification, implementation design, and architecture rationale.
- Return evidence, proposed vocabulary, scenarios, and material questions to the Coordinator. Production model changes belong to an accepted delivery slice.
- When installed, invoke the canonical `adr` skill only after the rationale is accepted and when a consequential why would remain missing from code and maintained documentation. Without that optional sibling, return the accepted rationale gap and the minimum handoff needed to record it; do not make domain-modeling correctness depend on a filesystem link or automatic ADR creation.
- Do not create or rewrite ADRs inline as a side effect of unresolved discussion.

### `codebase-design`

Use the existing canonical vocabulary:

- module;
- interface;
- depth;
- seam;
- adapter;
- leverage;
- locality.

This is a shared reference, not a mandatory standalone phase. Load it when a specialist, Cleaner, or Verifier must reason about module shape, test interfaces, or deepening opportunities.

### `architecture-design`

This Taecontrol-authored composite skill handles new consequential architecture questions. It does not scan generally for cleanup opportunities.

Required contract:

1. Name the expensive-to-reverse question and why current evidence cannot settle it.
2. Establish the local minimum for the question: module and interface vocabulary, plus affected domain concepts and invariants. When independently available, load `codebase-design` and `domain-modeling` only to enrich that local minimum; correctness does not depend on either sibling skill or filesystem path.
3. Inspect existing code, accepted decisions, and project constraints before proposing shapes.
4. Dispatch research, a spike, or a prototype when an empirical uncertainty cannot be resolved on paper.
5. Compare at least two plausible shapes when the decision is consequential and alternatives are real.
6. Cover only applicable concerns: invariant ownership, interfaces, dependency direction, data ownership, persistence, failure behavior, concurrency, recovery, security, and validation path.
7. Return the currently answerable decision frontier, alternatives, trade-offs, evidence, and remaining uncertainty to the Coordinator.
8. The Coordinator invokes `grilling`, records human acceptance, and returns the accepted direction to routing.

The skill does not edit production code. Accepted realization enters a production vertical slice. After acceptance, the Coordinator may invoke the optional canonical `adr` skill when the durable why would otherwise be lost.

### `adr`

The existing canonical `adr` skill records accepted consequential rationale. It is not a discovery mechanism and does not decide architecture.

- Invoke it after the decision and rationale are accepted.
- Keep implementation plans outside the record.
- Make domain-modeling and architecture-design interoperable without requiring a sibling filesystem path.
- When `adr` is unavailable, return a compact rationale-recording handoff rather than silently dropping the why.

### `improve-codebase-architecture`

#### Preserve from upstream

- Start from demonstrated friction or changing hot spots rather than scanning mechanically.
- Use domain language and `codebase-design` vocabulary.
- Find shallow modules, scattered knowledge, leaky seams, and poor test interfaces.
- Present candidates with concrete evidence, expected leverage, locality, and recommendation strength.
- Let the human choose which candidate deserves deeper design.

#### Factory adaptation

Treat this as a composite discovery skill:

1. Inspect a bounded area selected from user direction or demonstrated change friction.
2. Dispatch a read-only explorer.
3. Produce a verified visual report outside the repository unless the user requests persistence.
4. Use `domain-modeling` and `codebase-design` only when available and useful to enrich the investigation.
5. Return the selected candidate's proposed decision frontier and evidence to the Coordinator, then stop.

After that return, the Coordinator separately owns human synchronization, invokes `grilling` when needed, and records the resulting direction or decision not to proceed.

Do not mutate production code. An accepted refactor becomes its own production vertical slice and enters the complete delivery loop.

## Production strategy capability

### `tdd`

#### Preserve from upstream

- Assert observable behavior through stable interfaces.
- Avoid implementation-coupled, tautological, and horizontally sliced tests.
- Work in small vertical behavior increments.
- Use a red-capable test or equivalent reproduction.
- Keep strategic cleanup in the Cleaner phase.

#### Factory adaptation

TDD is an optional implementation strategy, not a universal agent discipline.

- The project profile or human selects it for a slice or experiment.
- The accepted slice defines material behavior and interfaces. The agent does not ask the human to confirm every test seam separately when those decisions are already accepted.
- Compare strict red-green, small-unit test-after, and behavior-first plus hardening where practical.
- Judge the strategy from total accepted-result cost and evidence, not ritual compliance.

Candidate measures:

- elapsed time to accepted candidate;
- defects found by Cleaner, Verifier, and Product Validator;
- useful and surviving mutants;
- test sensitivity to plausible defects;
- repair rounds;
- refactor breakage caused by test coupling.

## Operations capability

### `wizard`

#### Preserve from upstream

- Use only for steps a human must perform.
- Inspect the repository and current state before asking the human.
- Produce a staged, repeatable procedure with visible progress.
- Treat secrets safely and confirm irreversible actions.
- Keep the wizard ephemeral unless the user wants a maintained setup path.

#### Factory adaptation

`wizard` is an operations adapter, not a discovery phase. The Coordinator selects it when a required dashboard, credential, physical action, or externally authorized operation cannot be completed by an agent tool.

The wizard must not bypass the Factory's authorization rules. It helps the human perform an authorized action; it does not grant authority for that action.

## Factory integration state and dependency waves

The feature branch contains the Taecontrol-authored `cleaner` and the migrations of `pursue-goal` to Coordinator, `implementation-review` to Verifier, and `use-case-qa` to Product Validator. Copied single-skill installation and focused Coordinator-routing scenarios pass for this branch. The Factory is ready for a bounded pilot, not yet proven by a real production delivery.

### Wave 1: delivery-loop prerequisites

- `cleaner`;
- Coordinator in `pursue-goal`;
- Verifier in `implementation-review`;
- Product Validator in `use-case-qa`.

### Wave 2: communication, coordination, and discovery primitives

- `grilling`;
- bilingual `wait-what`;
- adapted `unslop`;
- `writing-for-agents`;
- `research`;
- `spike`;
- `prototype`;
- `diagnosing-bugs`;
- `domain-modeling`;
- `codebase-design`;
- `architecture-design`.

### Wave 3: composite and optional capabilities

- `improve-codebase-architecture`;
- experimental `tdd`;
- `wizard`;
- existing `adr` integration.

A skill is ready for Factory routing only when its package is independently installable, linked files and notices are present, and a focused behavioral scenario shows correct Coordinator invocation and routing. This branch meets that package and routing bar. A real bounded pilot must now exercise the production role chain and reveal its actual cost and failure modes.
