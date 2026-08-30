---
name: agents-md
description: "Interview a human to create or revise portable project agent instructions. Use only through an explicit human invocation."
disable-model-invocation: true
---

## Process

1. Locate the project root, identify the target harnesses, and read their existing instruction files. Default to `AGENTS.md`; do not assume common filenames, nesting, or precedence.
2. Inspect maintained project evidence: README and contributor docs, manifests and scripts, CI, code layout, focused tests, and applicable parent or nested instructions. Do not ask the human for facts the repository can settle.
3. Require the installed `writing-for-agents` and `unslop` skills. If either is unavailable, stop before drafting. Apply `writing-for-agents` before revising instructions.
4. Identify only unresolved decisions that would materially change agent behavior. Ask them in short numbered rounds of at most four questions, in the human's language. For each question, give an evidence-based recommendation and its main consequence. Accept “use your recommendation” and “skip” as answers. Keep a candidate draft that reflects confirmed answers.
5. For multiple harnesses, keep one canonical source and propose only the smallest supported adapters, imports, or links. Verify current discovery behavior from local help or official documentation. Do not duplicate rules when an adapter can reference the source.
6. When no material gap remains, review the draft, apply `unslop` without changing requirements, commands, or terminology, then play back the files, rules, boundaries, and portability limits for acceptance.
7. Write only after the human accepts the draft and target paths. Preserve unrelated existing instructions, then reread the files and check the diff.

## Content standard

Include only durable, project-specific guidance that changes decisions. Prefer, when relevant:

- project purpose, priorities, and non-negotiable behavior;
- concrete hazards and safe alternatives;
- affected surfaces, adapters, and architecture boundaries;
- exact setup and focused verification commands confirmed by the repository;
- terms or approval gates that prevent real ambiguity.

Use harness-neutral terms such as “agent”, “human”, and “project”. Distinguish defaults from prohibitions, preferences from enforced configuration, and shared rules from harness-specific behavior. Avoid vendor tool names or permission mechanics unless intentionally scoped.

Put shared guidance in the most portable accepted project-level file. Put directory-specific rules in the narrowest mechanism supported by every target that must receive them; do not assume nested `AGENTS.md` files work everywhere. Do not add compatibility files for harnesses outside the human's requested scope.

Exclude generic advice, agent capability descriptions, duplicated documentation, speculative edge cases, exhaustive inventories, and style preferences that do not affect correctness. Do not invent commands or preserve stale instructions.

## Completion criteria

- Every rule is supported by repository evidence or an accepted human decision.
- Each requested harness receives the intended instructions through a verified path, without contradictory copies.
- The human accepted the final content, target paths, and disclosed portability limits.
- `writing-for-agents` and `unslop` were applied in that order.
- The saved diff is concise, scoped, and free of unrelated changes.
