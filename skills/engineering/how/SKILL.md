---
name: how
description: "Build an evidence-grounded mental model of how a system, problem, or solution works."
disable-model-invocation: true
---

# How

Help the user understand a system, problem, or solution well enough to reason about it. Explain current or supplied behavior; do not design a replacement, diagnose an unknown cause, or invent historical intent.

## Process

1. **Orient.** Infer what the user already knows and what they need to understand from the conversation. State the subject and boundary in plain language. If the request is ambiguous, state your interpretation and proceed so the user can redirect.
2. **Ground.** Inspect the relevant code, configuration, tests, documentation, accepted proposal, or other available evidence. For a narrow subject, inspect it directly. For a cross-cutting subject, dispatch independent read-only explorers across distinct concerns such as entry points, ownership, state and data flow, dependencies, and failure paths, then synthesize their findings. Separate observed behavior, documented behavior, proposed behavior, inference, and unknowns.
3. **Build the causal model.** Choose one representative case and trace it from the condition or input that starts it to the outcome. Adapt the trace to the subject without announcing a mode or forcing a template: follow actors, state, and transitions for a system; condition, mechanism, and consequence for a problem; previous behavior, changed mechanism, result, and limitations for a solution.
4. **Explain.** Give the smallest complete explanation first. Show the concrete mechanism before naming its abstraction. Pair plain language with exact terms, symbols, paths, or interfaces so the user can connect the model to its implementation. Include only details that change understanding, and explain the causal link between steps instead of narrating source code.
5. **Make the model honest.** Include the boundary, exception, or failure most likely to make a simpler explanation misleading. Use a small diagram only when a relationship or sequence is easier to see than read, and label connections with the actions they perform. Use a metaphor only when it preserves the mechanism, and state where it stops matching.
6. **Present.** Use the user's active language and keep the explanation conversational. Do not report the exploration process or impose fixed headings. Stop after the smallest useful layer; deepen or repair the specific confusing link when the user responds.

## Boundaries

- Read and explain; do not modify the system or proposal being explained.
- State the purpose a mechanism demonstrably serves, but do not infer why people historically chose it without evidence.
- Explain a known problem or proposed solution without silently turning the task into diagnosis, evaluation, or redesign.
- When evidence does not establish a causal link, name the gap instead of completing the story from plausibility.

## Completion criteria

The user has a compact causal model: they can follow the representative case, see why each important transition occurs, distinguish what is observed from what is proposed or inferred, and know the main boundary and any material gap.
