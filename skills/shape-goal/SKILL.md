---
name: shape-goal
description: Shape an ambiguous request into a human-approved Goal Contract with observable proof and explicit boundaries.
disable-model-invocation: true
---

# Shape Goal

Shape one Goal Contract that fixes the destination while leaving the route open. End when the human approves the contract.

## 1. Find the material unknown

Use facts already present in the conversation and attached project context. A lookup that expands into source comparison, experimentation, or artifact creation belongs in fresh-context discovery. Restate the intended change, then ask one material question at a time with a recommended answer and its main consequence.

A question is material only when its answer changes the outcome, proof, boundaries, protected behavior, or a decision the human must retain. Translate a proposed method into the need behind it unless the method is itself a real constraint.

Completion criterion: every user-owned material question is resolved; remaining uncertainty is executor-owned or requires fresh-context discovery.

## 2. Commission discovery in fresh context

When research, a prototype, or a technical spike is needed, commission it as a bounded discovery task in an isolated subagent or separate task. If none is needed, continue to the Goal Contract. Give discovery tasks:

- the uncertainty to reduce;
- the evidence or artifact to return;
- its boundaries and stopping condition;
- a compact return format with durable evidence pointers.

Pause shaping until discovery returns. Bring back only conclusions, evidence pointers, and residual uncertainty; leave exploration history in the discovery context. When isolation is unavailable, return the discovery contract for the user to run separately.

Completion criterion: no material discovery is needed, or every required discovery ran outside the shaping context and returned a compact result that resolves the unknown or justifies another bounded discovery goal.

## 3. Write the Goal Contract

Describe large work as an end-to-end actor journey or observable system change. Split only independent outcomes with different stopping conditions. When discovery must precede a trustworthy product outcome, make discovery the current goal.

Use only fields that carry information:

```markdown
# Goal

## Outcome
What will be true for the affected people or system.

## Observable proof
The demonstrations, behaviors, or evidence that establish completion.

## Boundaries
What the goal deliberately excludes.

## Must preserve
Existing behavior, qualities, constraints, or invariants that remain true.

## Reserved decisions
Only decisions that must return to the human.
```

Write proof as outcomes rather than implementation steps. Omit empty optional sections.

Completion criterion: a fresh executor can begin without guessing the destination, two capable executors may choose different valid routes, and the stated evidence decides completion.

## 4. Obtain approval

Present one clean contract, state the executor's remaining freedom, and ask the human to approve or amend it. After approval, return the copyable contract and end the shaping task. A separately authorized fresh task or subagent receives the contract for execution.

Completion criterion: the human has explicitly approved one contract, the shaping task has ended, and the contract is ready for a separately authorized fresh-context handoff.
