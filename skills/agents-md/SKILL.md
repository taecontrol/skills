---
name: agents-md
description: "Interview a human to create or revise portable project agent instructions. Use only through an explicit human invocation."
disable-model-invocation: true
---

## Process

1. Locate the project root, determine whether this is a creation or revision, identify the target harnesses, and read their existing instruction files. Default to `AGENTS.md`; do not assume common filenames, nesting, or precedence. Determine the artifact's target language separately from the conversation language; ask before drafting when it is not explicit.
2. Inspect maintained project evidence: README and contributor docs, manifests and scripts, CI, code layout, focused tests, and applicable parent or nested instructions. Separate what the repository proves about the current system from decisions about what the project should become. Use implementation evidence to discover mechanics, costs, conflicts, and stale guidance; never treat the current architecture, process, or complexity as desired merely because it exists.
3. Require the installed `writing-for-agents` and `unslop` skills. If either is unavailable, stop before drafting. Apply `writing-for-agents` before revising instructions.
4. Keep a decision ledger while interviewing. Classify each candidate rule as an observed fact, an existing instruction being preserved, an accepted human decision, a rejected proposal, or unresolved. A repository fact may support an exact command or explain a consequence, but it does not settle product direction, acceptable complexity, authority, or workflow preferences.
5. Before presenting a new instruction file, conduct at least one substantive interview round unless the human's request already supplies the project's intended direction. Cover only material gaps such as purpose, intended operators and audiences, priorities and tradeoffs, desired relationship to the current architecture, verification philosophy, and authority over real data or external systems. Confirm the target language before the full draft.
6. Ask in short numbered rounds of at most four questions, in the human's language. Make each question decide one issue. Give a recommendation and its main consequence when useful, but label it as optional; repository evidence may explain the cost of a choice, not choose the desired outcome. An answer applies only to the decision asked. “Use your recommendation” accepts that recommendation; “skip” leaves it out rather than silently accepting a default.
7. Build the candidate only from preserved existing instructions, accepted human decisions, and relevant observed facts. Human statements about the desired project override inferences from the implementation. If the human rejects a recommendation, remove it and any rules that depend on it; do not reintroduce it as a prerequisite, gate, inverse policy, or generic best practice. Do not present a content draft merely because the filename or harness was confirmed.
8. For multiple harnesses, keep one canonical source and propose only the smallest supported adapters, imports, or links. Verify current discovery behavior from local help or official documentation. Do not duplicate rules when an adapter can reference the source.
9. When no material gap remains, audit every normative rule against the decision ledger, apply `unslop` without changing requirements, commands, terminology, or target language, then play back the files, rules, boundaries, and portability limits for acceptance.
10. Write only after the human accepts the draft and target paths. Treat approval with a correction as approval only after applying that exact correction; replay the affected part if it changes meaning. Preserve unrelated existing instructions, then reread the files and check the diff.

## Content standard

Include only durable, project-specific guidance that changes decisions. Prefer, when relevant:

- project purpose, priorities, and non-negotiable behavior;
- concrete hazards and safe alternatives;
- affected surfaces, adapters, and architecture boundaries;
- exact setup and focused verification commands confirmed by the repository;
- terms or approval gates that prevent real ambiguity.

Use harness-neutral terms such as “agent”, “human”, and “project”. Distinguish defaults from prohibitions, preferences from enforced configuration, and shared rules from harness-specific behavior. Avoid vendor tool names or permission mechanics unless intentionally scoped.

Describe the project the human intends, not a frozen inventory of the repository. When current implementation and accepted direction differ, record the intended direction and only the current constraints needed to change it safely. Do not elevate observed mechanisms or generic best practices into policy unless preserved instructions or the human explicitly require them.

Put shared guidance in the most portable accepted project-level file. Put directory-specific rules in the narrowest mechanism supported by every target that must receive them; do not assume nested `AGENTS.md` files work everywhere. Do not add compatibility files for harnesses outside the human's requested scope.

Exclude generic advice, agent capability descriptions, duplicated documentation, speculative edge cases, exhaustive inventories, and style preferences that do not affect correctness. Do not invent commands or preserve stale instructions.

## Completion criteria

- Every observed fact is supported by repository evidence, and every accepted decision is represented accurately.
- Every normative rule is preserved from existing instructions or traceable to an accepted human decision; current implementation alone never establishes desired policy.
- A newly created instruction file reflects a substantive interview or intent already supplied by the human, not only repository inspection and path confirmation.
- Rejected and skipped proposals are absent, including disguised prerequisites or generic best-practice equivalents.
- Each requested harness receives the intended instructions through a verified path, without contradictory copies.
- The human accepted the final content, target paths, target language, and disclosed portability limits.
- `writing-for-agents` and `unslop` were applied in that order.
- The saved diff is concise, scoped, and free of unrelated changes.
