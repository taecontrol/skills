---
name: mission
description: Migrate an existing Mission cockpit into the goal-based workflow.
disable-model-invocation: true
---

# Mission — deprecated

Mission's ticket lifecycle is retired. Use this skill only to migrate an existing mission without losing accepted intent or evidence.

1. Read the mission brief, current frontier, accepted receipts, and durable evidence. Ignore speculative successors and lifecycle bookkeeping.
2. Return a compact migration note containing the current outcome, observable evidence, boundaries, protected behavior, unresolved human decisions, and durable evidence pointers.
3. Ask the user to install and invoke `$shape-goal` with that note in a fresh task. When it is unavailable, the note can seed any fresh goal-shaping task. Leave legacy mission artifacts unchanged for historical reference.

Completion criterion: the user has one compact migration note and knows that new work continues through `$shape-goal` or an equivalent fresh goal-shaping task.
