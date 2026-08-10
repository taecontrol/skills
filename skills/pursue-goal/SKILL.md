---
name: pursue-goal
description: Pursue a durable goal through collaborative requirements, checkpoint deliverables, autonomous execution, and project-local progress.
disable-model-invocation: true
---

# Pursue Goal

Pursue one durable goal through a shared, temporary cockpit. Shape requirements with the human, complete them through evidence-bearing checkpoints, and keep execution autonomous between material human decisions.

## 1. Orient

Inspect repository instructions, current product truth, worktree state, and `docs/goals/`. Resume the matching goal when one exists; otherwise prepare to grill a new goal. Read the cockpit and every deliverable or evidence pointer needed to understand accepted intent before proposing work.

Completion criterion: the outcome, accepted requirements, current checkpoint, open material decisions, and relevant repository state can be stated using project evidence alone.

## 2. Grill the foundation

For a new goal or material re-grounding, investigate discoverable facts and interview the human about decisions. Ask one material question at a time, give a recommended answer and its main consequence, and follow dependent decisions until the shared foundation is coherent. Use concrete actor journeys or system changes to expose missing requirements.

Resolve enough to agree on:

- the outcome and final observable proof;
- initial requirements and meaningful exclusions;
- behavior and qualities to preserve;
- decisions reserved to the human; and
- the first checkpoint or small authorized sequence.

Treat the initial requirements as a strong baseline that can evolve. Read back the complete synthesis and wait for explicit confirmation before creating the cockpit or beginning execution.

Completion criterion: the human confirms one coherent foundation, and the first checkpoint has a judgeable requirement, deliverable, and proof.

## 3. Open the cockpit

Use the repository's established equivalent when present; otherwise create `docs/goals/<goal-slug>/`. Keep `goal.md` as the resumption index and store goal-specific working deliverables beside it. Create directories and files only when a real deliverable requires them.

```text
docs/goals/<goal-slug>/
  goal.md
  <goal-specific deliverables>
  designs/
    <design files and images, when needed>
```

Keep this compact shape in `goal.md`:

```markdown
# Goal

## Outcome
## Final proof
## Boundaries
## Must preserve
## Reserved decisions

## Requirements
<accepted, completed, deferred, or excluded requirements>

## Current checkpoint
- Requirement:
- Deliverable:
- Done when:
- Human collaboration:

## Progress
<brief completed-checkpoint receipts linked to deliverables and evidence>

## Open decisions
## Likely next
```

Keep source code and tests in their normal locations. Preserve canonical product documentation as the single source of truth and link it from the cockpit. Update the cockpit after a material decision, a completed checkpoint, or before handing work to another context.

Completion criterion: a fresh agent can resume using `goal.md` and its project pointers alone.

## 4. Shape the current checkpoint

Give each checkpoint one requirement and one coherent deliverable that completes it. State `Done when` as observable evidence and state exactly how the human will participate. Select architecture, use cases, prototypes, UI design, implementation, or validation only when the deliverable completes a requirement.

Collaborate during the checkpoint when product policy, experience, risk appetite, or consequential architecture remains open. Re-enter the grilling loop, show tangible increments, and confirm the resulting synthesis. Work independently where accepted intent already determines the answer.

Treat one instruction authorizing several named checkpoints as authority to continue through the sequence. Keep reviews, QA runs, repairs, commits, and subagent work inside the checkpoint unless one produces an independently useful requirement-level outcome.

Completion criterion: every material decision is accepted or reserved, the deliverable will complete the named requirement, and its evidence can decide completion.

## 5. Execute autonomously

Perform the mechanical work, specialist dispatch, review, validation, and bounded repair needed to satisfy the checkpoint. Delegate specialist contracts to installed skills and record their delivered evidence in the cockpit. Calibrate review and validation to the accepted proof and risk.

Return to the human for a reserved decision, a material change to the goal or checkpoint, new consequential risk, missing authority, or promised collaboration. Resolve implementation details, ordinary findings, and bounded repairs autonomously.

When the checkpoint passes, update its requirement and add one compact progress receipt with the deliverable and evidence. Preserve residual uncertainty explicitly.

Completion criterion: the deliverable exists, the requirement's `Done when` evidence passes, promised collaboration occurred, and the cockpit points to the result and remaining uncertainty.

## 6. Advance the frontier

Choose the next checkpoint from accepted requirements and current evidence. Add newly discovered requirements when they fit the confirmed goal; re-enter the grilling loop when they change the outcome, final proof, boundaries, protected behavior, reserved decisions, or consequential product policy.

Continue immediately when the next checkpoint is already authorized and needs no human collaboration. Otherwise present the delivered result, explain the next requirement and recommendation in product language, and obtain the missing decision.

Completion criterion: the cockpit names one justified current checkpoint or shows that final proof is ready, and every material finding has a checkpoint or human-decision disposition.

## 7. Promote and clean up

When final proof passes, present the complete outcome, evidence, residual risk, and remaining exclusions for human acceptance. After acceptance:

1. Identify every piece of temporary work that represents durable product, architecture, design, operational, or validation truth.
2. Promote that truth into the project's canonical code, tests, documentation, ADRs, design system, or runbooks.
3. Update every durable reference that still points into the goal cockpit.
4. Verify that the final system and durable documentation resolve independently of `docs/goals/<goal-slug>/` and its temporary evidence.
5. Delete the entire goal directory and goal-specific temporary evidence.
6. Re-run the checks capable of detecting broken references or missing promoted artifacts.

Completion criterion: the human accepted the final proof, every durable truth has a canonical owner, every durable reference resolves independently of the cockpit, the goal directory and temporary evidence are absent, and the post-cleanup checks pass.
