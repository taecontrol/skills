# Agents-md skill landscape

## Question and bound

What durable information actually earns space in `AGENTS.md`, and what should a recovered `agents-md` skill create, revise, or remove so the file changes agent decisions without duplicating facts already owned by the repository?

This review covers Taecontrol's last two `agents-md` revisions, the open `AGENTS.md` convention, official Codex behavior and model guidance, current GitHub and VS Code instruction guidance, and representative repository usage. Sources were inspected on 2026-09-12. It does not define personal global preferences or a workflow for configuring linters, test runners, CI, or quality tools.

## Verdict

Recover `agents-md`, but do not use `AGENTS.md` for everything. It is automatically loaded and should carry two compact kinds of project guidance: a **project compass** that tells the agent what the project is trying to become and how its authors think, and a **decision delta** of navigation, non-obvious choices, recurring hazards, and authority boundaries that the repository cannot express or agents cannot reliably infer.

A separate `CODING_STANDARDS.md` is justified when it contains project-specific rules that require judgment during independent review. Loading those rules only for the reviewer avoids spending the implementation agent's already constrained context on a review checklist. This is the reason Matt Pocock now proposes the separation in his experimental `retro` skill. The proposal is explicitly a stub, so it is useful design evidence rather than a stable contract. [Matt `retro`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/in-progress/retro/SKILL.md)

The file should not be an onboarding document or repository summary. Every line consumes context on every applicable task. Keep a line only when all of these are true:

1. it is durable across many tasks;
2. it changes a material agent decision;
3. a capable agent cannot reliably derive its intended meaning from the current repository;
4. no executable configuration or maintained document is a better owner;
5. its scope and authority are clear.

If removing a line would not create a plausible recurring mistake, remove it. If no candidate survives, return `No instructions needed` and do not create a file.

## Why restraint matters

Codex reads applicable `AGENTS.md` files before doing any work, combines them from the project root toward the current directory, and applies a default total size limit. This makes the instructions powerful but always-on. [Official Codex `AGENTS.md` documentation](https://developers.openai.com/codex/agent-configuration/agents-md)

OpenAI's current model guidance warns that unclear or conflicting instructions in skills and files such as `AGENTS.md` can make a model pause or block work unnecessarily and recommends auditing every accessible instruction source. This directly supports the user's observed failure mode: more instruction is not automatically more guidance. [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model#instruction-following)

VS Code likewise says customizations consume model context, recommends concise focused instructions, tells authors to focus on non-obvious rules, and says to skip conventions already enforced by linters or formatters. It also recommends references over duplicated instruction copies. [VS Code customization concepts](https://code.visualstudio.com/docs/agents/concepts/customization) [VS Code custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions#_tips-for-writing-effective-instructions)

The open `AGENTS.md` site lists setup commands, testing, style, and security as possible content, not required sections. Its lack of a required schema is useful: an effective file may be short or absent. [AGENTS.md](https://agents.md/)

Matt's context model sharpens the boundary. The implementation agent accumulates exploration, editing, and debugging context, while an independent review agent can begin with little more than the finished diff. His experimental `retro` skill therefore recommends imposing prose coding standards during review and keeping `CLAUDE.md` or `AGENTS.md` extremely sparse because those files are pushed into every applicable agent context. His `writing-for-agents` skill makes the complementary point: repository files and executable configuration are sources of truth; instruction prose should preserve only expensive-to-discover context, conventions, and gotchas. [Matt `retro`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/in-progress/retro/SKILL.md) [Matt `writing-for-agents`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/productivity/writing-for-agents/SKILL.md)

## Theo Browne's project-compass model

Theo Browne supplies direct evidence for a second category that repository inspection cannot recover: the author's intended direction. His Lakebed `agent.md` begins with the project's goal and current status, then addresses the agent as a collaborator. It explains who the product serves, why the project must be unusually ambitious, the tension between rebuilding foundational infrastructure and resisting feature creep, and the preference for solutions that feel obvious. Its few rules are consequences of that philosophy rather than a codebase inventory. [Theo's Lakebed `agent.md`](https://gist.github.com/t3dotgg/cbe978269b4c7258c4d20164aece7087)

In his May 2026 workflow explanation, Theo describes this artifact as a letter about how he thinks, what the team is building, and why. He emphasizes that it was written by him rather than inferred by an agent and that it intentionally contained no file paths or technical enforcement. [Theo's May 2026 explanation](https://www.youtube.com/watch?v=xJaMTo2YgO8)

His August 2026 breakdown and current T3 Code file show that the idea evolved into a hybrid rather than a pure philosophy letter. T3 Code's `AGENTS.md` includes project identity, product properties that must not be compromised, a note about Theo's design instincts, a small glossary, and concrete hazards and cross-surface checks derived from recurring real failures. Theo explains that it should differ from a README: some project description belongs there only because it changes how an agent modifies the project and communicates with its developers. He also describes auditing real agent histories to find recurring failure modes instead of adding speculative rules. [Theo's August 2026 breakdown](https://www.youtube.com/watch?v=e1snsuY4lTI) [Current T3 Code `AGENTS.md`](https://github.com/pingdotgg/t3code/blob/main/AGENTS.md)

This evidence supports the old skill's interview premise, with a narrower purpose. Code can reveal current mechanisms and README material can describe the product, but neither can decide the authors' ambition, intended users, protected qualities, preferred tradeoffs, or desired relationship with the agent. Those are human-owned decisions. A creation flow must obtain them from an existing authoritative vision source or from the human; it must not manufacture them from implementation patterns.

## Development commands

The user's objection is correct. A script name and implementation already visible in `package.json`, a `Makefile`, `justfile`, or equivalent should not be copied into `AGENTS.md`. Copying it adds no decision and can drift when the executable owner changes.

A command earns an instruction only when the repository does not reveal the choice that the agent must make. Useful cases include:

- the command must run from a non-obvious directory;
- several plausible commands exist but only one is authoritative or safe;
- a command needs a non-obvious prerequisite, environment, ordering, or bounded scope;
- the full suite is unusually expensive or unsafe and a focused command should run first;
- a particular change condition requires a generated artifact or secondary check that ordinary tooling does not connect visibly.

Write the decision, not an inventory. For example, “For changes under `payments/`, run the isolated contract suite before the repository suite because the full suite mutates the shared sandbox” may be useful. “Run `pnpm test`” is not useful when `package.json` already makes that obvious.

The official Codex guide reflects this distinction in its review guidance: keep rules concise and reserve formatting and lint checks for CI. Its own repository uses `AGENTS.md` most effectively for conditional choices and hazards—for example, which test command to choose, when a full suite is too costly, what generated lock must accompany a dependency change, and which sensitive surfaces must not be modified—not merely for listing available scripts. [Official Codex guide](https://developers.openai.com/codex/agent-configuration/agents-md#add-code-review-rules) [OpenAI Codex repository instructions](https://github.com/openai/codex/blob/main/AGENTS.md)

## What belongs

Retain only project-specific guidance in these categories when it passes the decision-delta test:

- **Project compass:** concise purpose, intended users, desired direction, protected product qualities, and decision heuristics that should shape otherwise ambiguous work.
- **Non-obvious intent or priority:** an accepted tradeoff that should change how agents choose between otherwise valid implementations.
- **Concrete hazard and safe path:** a recurring failure that repository structure or tooling will not prevent, with the condition that activates it.
- **Choice among plausible workflows:** which command, environment, fixture, or sequence is correct when discovery presents several credible options.
- **Human authority boundary:** a project-specific external system, real-data action, or irreversible operation whose ownership is not already enforced by the harness.
- **Conditional maintained-source pointer:** what document to consult and the exact condition that makes it relevant.
- **Scoped exception:** a local rule that intentionally differs from the parent instruction and cannot be expressed more reliably in executable configuration.

Prefer positive safe paths over naked prohibitions. Explain rationale only when it helps the agent handle an edge case; do not turn the file into decision history.

## What does not belong

- Lists of scripts, dependencies, frameworks, directories, or repository files that inspection can recover.
- Formatter, linter, compiler, or type-system rules already enforced by configuration.
- Generic software-engineering advice or an imported style guide.
- Feature requirements, current implementation plans, slice state, or task-specific acceptance criteria.
- Architecture summaries, domain glossaries, or ADR rationale; link to their maintained owner only under a precise trigger.
- Agent capability descriptions, generic permission rules, or harness behavior the harness already supplies.
- Current architecture or repeated code patterns promoted to desired direction merely because they exist.
- Aspirational rules without human acceptance, obsolete workarounds, and instructions added for a one-off mistake with no plausible recurrence.
- Duplicate compatibility files created before a real target harness requires them.

## Review of the previous skill

The previous `agents-md` skill got several difficult things right: explicit invocation, human acceptance before writing, one canonical source, no generic advice, separation of observed facts from intended direction, an interview for intent the repository cannot supply, and verification of harness discovery rather than assuming it. [Previous `agents-md`](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/agents-md/SKILL.md)

It also contains the seeds of the problem it tries to prevent:

- It requires a substantive interview even for a focused audit or revision where no project-intent gap is demonstrated.
- Its preferred content combines the valuable project compass with architecture boundaries, setup commands, verification commands, and approval gates. That broad menu invites an onboarding document rather than a focused agent brief.
- A decision ledger and locally implemented fixed interview rounds duplicate a general interviewing capability and add process to small updates.
- Hard dependencies on `writing-for-agents` and `unslop` can block a simple edit. `AGENTS.md` is agent-facing, so natural human prose is secondary to precise execution semantics.
- It has no explicit `No instructions needed` outcome.
- Multi-harness adapters receive too much prominence for a capability that should activate only when the user names actual target harnesses with incompatible discovery.

The core distinction between repository fact and accepted direction should remain, but as a lightweight test applied to proposed lines rather than a maintained ledger.

## Recommended skill contract

### Invocation

Keep `agents-md` explicitly invoked. It mutates always-on instructions and should not grow the file opportunistically during ordinary work. Support three intents: create, revise, and audit. An audit is read-only unless the user accepts a proposed delta.

### Inspect and filter

Read the applicable instruction chain and verify discovery rules only for the harnesses actually in scope. Inspect maintained files only to locate the real owner of candidate facts, detect contradictions, and understand consequences. Do not inventory the repository for content to paste.

For every proposed line, answer:

1. **Decision:** what would the agent choose differently because of this line?
2. **Failure:** what plausible recurring mistake does it prevent?
3. **Owner:** why is `AGENTS.md` better than code, configuration, CI, README, an ADR, the glossary, a product-vision source, or a task-specific skill? For project-compass prose, what agent decision or interaction does it steer beyond merely describing the product?
4. **Scope:** which tasks or paths need it?
5. **Authority:** is it an existing accepted instruction or an explicit human decision?

Omit the line if any answer is missing. Ask the human only about a material unresolved decision; never ask for repository facts.

For creation or a substantive rewrite, resolve the project compass before drafting. If an accepted source or the user's request already supplies it, do not interview again. Otherwise use `grilling` with one bounded scope covering only purpose, intended users, desired direction, protected qualities, material tensions, and the author's preferred decision heuristics. Do not reproduce another interview protocol inside this skill. Focused audits and updates do not invoke `grilling` unless they expose a material gap in that compass.

### Draft and write

Prefer deleting or tightening stale guidance over adding another qualification. Show one concise delta with additions, removals, conflicts, and portability limits. Obtain explicit human acceptance, then preserve unrelated content and apply only that delta.

Use root `AGENTS.md` by default. Add a nested file only when a real scoped rule exists and every target harness that needs it has verified compatible behavior. Codex walks from root toward the working directory and gives closer guidance precedence; VS Code currently marks nested `AGENTS.md` support experimental, so nesting is not uniformly portable. [Codex discovery](https://developers.openai.com/codex/agent-configuration/agents-md#how-codex-discovers-guidance) [VS Code `AGENTS.md` support](https://code.visualstudio.com/docs/agent-customization/custom-instructions#_use-multiple-agentsmd-files)

Do not create `CLAUDE.md`, `.github/copilot-instructions.md`, Cursor rules, symlinks, or adapters unless the user explicitly includes that harness and verified discovery shows the canonical `AGENTS.md` is insufficient.

### Outcomes

- `No instructions needed`: the repository and existing instruction chain already settle the relevant decisions.
- `Agree-ready`: a minimal reviewed delta is ready for human acceptance.
- `Updated`: the accepted delta is written and verified.
- `Inconclusive`: a named harness's discovery or a material authority conflict could not be settled.

## Relationship to coding standards

The artifacts have distinct owners and loading times:

- Executable configuration, package scripts, and CI own rules a machine can enforce.
- `AGENTS.md` owns a minimal set of always-needed routing, hazards, choices, and conditional pointers.
- `CODING_STANDARDS.md` owns accepted project-specific rules that a reviewer must judge in a diff and tooling cannot enforce reliably.
- Skills own task workflows; they may discover the relevant source but should not duplicate its contents.

Matt's stable `code-review` already discovers `CODING_STANDARDS.md`, `CONTRIBUTING.md`, or any equivalent repository source, gives documented project policy precedence over its heuristic baseline, and skips checks that tooling enforces. It does not require a file named `CODING_STANDARDS.md` or prescribe how to maintain it. [Matt `code-review`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/code-review/SKILL.md)

For the CRAP gate, prefer a project script or tool configuration that enforces the maximum of `8`. `implementation-spec` already owns the cross-project policy and the missing-configuration escape. `AGENTS.md` needs a CRAP instruction only when the agent must make a non-obvious project-specific choice that the command and its configuration do not encode.

## Recommended first version

Create one explicit-only `agents-md` skill. Preserve the previous skill's authority, portability, acceptance, intended-direction boundary, and creation-time elicitation. Replace its local interview protocol with conditional, bounded use of `grilling`; remove the decision ledger, hard dependencies on prose-polishing skills, broad operational-content prompts, and automatic compatibility adapters. Add the project-compass and decision-delta filters, deletion-first audit, `No instructions needed` outcome, and an explicit rule that review-only standards belong in the project's review-standard source rather than its always-loaded instructions.

Do not ship a template for the resulting `AGENTS.md`; a template would encourage empty headings and generic filler. The skill itself needs only `SKILL.md` and agent metadata.

## Evidence limits

Official documentation explains discovery, scope, and recommended authoring patterns but does not provide comparative outcome data for sparse versus comprehensive `AGENTS.md` files. Theo reports strong personal results and exposes the resulting artifacts, but his workflow is not a controlled comparison and his current T3 Code file is materially larger than the original Lakebed letter. Matt's separation is currently documented in an in-progress stub, not a promoted skill. The project-compass, decision-delta, and review-time standards boundaries are therefore grounded design hypotheses that should be validated on real Factory work by checking recurring misunderstandings, implementation mistakes, and review findings.
