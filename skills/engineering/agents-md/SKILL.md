---
name: agents-md
description: "Create, audit, or update portable project instructions that give coding agents durable project intent and proven operational guidance. Use explicitly for AGENTS.md or equivalent agent instruction files, not coding standards or task plans."
disable-model-invocation: true
---

# Agents.md

Maintain one concise project brief that helps an agent understand what the project is trying to become, how its authors think, and which recurring mistakes it must avoid while working.

## Process

1. **Set the scope.** Identify the project root, creation, audit, or update intent, target language, and actual harnesses in scope. Read their applicable instruction files and resolve discovery and precedence from local behavior or current official documentation. Use root `AGENTS.md` as the canonical default, but preserve an established portable source. Do not assume filenames, nesting, imports, or symlink support across harnesses.
2. **Inspect maintained evidence.** Read only enough README, product vision, glossary, ADRs, contributor guidance, configuration, code, and existing instructions to find authoritative owners, contradictions, and facts the human should not have to supply. Current implementation proves what exists; it does not establish what the project should become.
3. **Resolve the project compass.** Obtain concise accepted meaning for the project's purpose, intended users, desired direction, protected qualities, material tensions, and the author's decision heuristics or desired relationship with agents. Prefer an authoritative maintained source or intent already supplied by the user. When material human-owned gaps remain, use `grilling` if available, bounded to only those gaps; otherwise ask the minimum focused questions directly. Do not interview again when the compass is already sufficient, and do not invoke `grilling` for an ordinary focused audit or update.
4. **Identify operational scars.** Retain only concrete guidance supported by an existing accepted instruction, an explicit human decision, or a demonstrated recurring agent failure. Inspect conversation or harness history only when the user authorizes that source and scope. A one-off mistake or hypothetical risk is not enough.
5. **Choose the right owner.** Keep project-compass prose and operational guidance here only when they should shape an agent during active work. Route without modifying other material:
   - machine-checkable behavior belongs in executable configuration or CI;
   - reviewer-judged project rules belong in the canonical coding-standards source;
   - feature requirements and implementation state belong in temporary work artifacts;
   - architecture, domain meaning, and durable decision rationale belong in their maintained sources, with a short conditional pointer here only when an agent must consult them.
6. **Propose the smallest artifact or delta.** Explain what each retained passage changes in agent behavior and why this file is its best owner. Prefer a short natural project letter for the compass and direct instructions with safe alternatives for operational scars. Delete stale, duplicated, generic, speculative, or now-enforced guidance. Do not imitate another author's voice or force a template.
7. **Obtain acceptance.** Present the complete proposed content or exact delta, canonical path, target language, harness coverage, and portability limits. Write only after explicit human acceptance. A correction is accepted only after its effect on the draft is clear.
8. **Write and verify.** Preserve unrelated instructions and apply only the accepted change. Create the smallest verified adapter, import, or link only for a named target harness that cannot consume the canonical source directly. Reread every resulting file, resolve its pointers, and verify that the diff contains no contradictory copies or unrelated changes.

## Content filter

Useful content can include:

- a compact explanation of what the project exists to accomplish, for whom, and why that should affect implementation choices;
- product qualities and tensions the agent must preserve when several solutions appear valid;
- the author's durable decision heuristics and expectations for collaboration;
- recurring hazards with the condition that activates them and a concrete safe path;
- cross-surface obligations or vocabulary needed on nearly every relevant task;
- conditional pointers that name both the maintained source and when to read it.

Exclude:

- script, dependency, framework, directory, or file inventories that repository inspection can recover;
- development commands already discoverable from package, build, task, or CI configuration;
- formatter, linter, type, test, or review rules owned by executable tooling or coding standards;
- feature specifications, implementation slices, current progress, temporary exceptions, and exhaustive architecture summaries;
- a duplicated glossary or ADR history when a conditional pointer is sufficient;
- generic engineering advice, agent capability descriptions, personal preferences unrelated to this project, and instructions added without accepted authority;
- compatibility files for harnesses the user did not place in scope.

## Outcomes

- `No instructions needed`: no durable project compass or operational delta earns always-loaded context, so no file is created.
- `No changes needed`: the existing instruction chain is current, concise, correctly owned, and portable for the requested harnesses.
- `Agree-ready`: one complete artifact or minimal delta is ready for human acceptance; no file has changed.
- `Updated`: the accepted change was written and verified at the reported paths.
- `Inconclusive`: name the exact intent, authority, ownership, or harness-discovery conflict and its unblock condition.

## Completion criteria

Every resulting instruction either communicates accepted project intent that implementation cannot determine or prevents a demonstrated recurring operational failure. The human accepted its meaning, language, path, and harness scope; stronger owners were not duplicated; and every named harness receives one consistent canonical instruction set through verified discovery.
