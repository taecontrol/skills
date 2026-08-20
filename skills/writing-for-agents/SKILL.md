---
name: writing-for-agents
description: "Write or revise skills and other artifacts that agents consume."
---

# Writing for agents

Use for skills, agent rules, decision records, profiles, dispatches, and handoffs. Write a repeatable process, not a script that forces identical output.

Only the Coordinator or an explicit delegate may update the goal map, accepted decisions, routing, or project profile. Without an authorized owner and durable destination, produce an ephemeral draft or handoff.

## Process

1. Identify the reader, outcome, invocation condition, authority, inputs, outputs, language, and durable location. Inspect project facts before adding conventions.
2. Put actions needed on every invocation first, in execution order. Put a rule beside the action it governs.
3. Keep branch-specific or bulky material behind a pointer that names its target and trigger. Keep required support files inside the same independently installable package. If no local target exists, state the required rule in the artifact.
4. Give each step a checkable completion criterion. Keep one source of truth for each rule. Remove stale environment caches, duplication, exposition, and no-op instructions.
5. For a skill, include conservative frontmatter with `name` and a quoted `description`. Make the description state its capability and invocation condition.
6. Review every invocation path, authority boundary, pointer, and criterion as the reader. Persist or apply the result only with explicit authority and destination.

## Completion criteria

- The artifact states its reader, outcome, invocation, authority, inputs, outputs, and durable location or ephemeral status.
- Its required behavior is locally available after independent installation.
- Its steps, pointers, and completion criteria are sufficient to complete every intended path without guessing.
- It assigns no Factory authority to an unauthorized agent and contains no duplicate, stale, or irrelevant instruction.
