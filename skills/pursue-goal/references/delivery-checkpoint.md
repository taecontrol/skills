# Delivery checkpoint

Run this branch only after the human explicitly accepts the current checkpoint contract in `SKILL.md`. Use it to implement or validate one already-defined scope.

## 1. Pass the readiness gate

Create a readiness record for the exact delivery scope. For every dimension below, link accepted evidence or mark it inapplicable with a rationale:

- **requirements and boundaries:** actors, outcome, included and excluded behavior, constraints, and acceptance criteria;
- **functional flow:** happy path, relevant alternatives, errors, edge cases, permissions, and meaningful system states;
- **UI/UX:** interaction, information hierarchy, content, visual states, responsiveness, and accessibility;
- **code architecture:** responsibilities, boundaries, interfaces, dependencies, data flow and ownership, persistence or migration, failure behavior, and material tradeoffs; and
- **validation:** mapping from accepted flows and important risks to observable proof, with required environment and test data.

Present the complete readiness record and wait for the human to accept that exact record. Readiness passes only when every dimension has accepted evidence or an accepted inapplicability rationale and zero open material design questions can change the delivery.

When readiness fails, update the living map with the human to add or reprioritize the required definition checkpoint, write the next-session prompt, and end this conversation. Resolve the gap and delivery in separate fresh sessions.

Completion criterion: the cockpit links the exhaustive readiness record and explicit human acceptance, or records the blocking definition checkpoint and ends delivery before production changes.

## 2. Deliver the accepted scope

Perform the mechanical coding, specialist work, review, and bounded repair required by the accepted deliverable. Preserve unrelated user changes and keep adjacent checkpoints outside this session.

If execution reveals an unknown that can materially change requirements, boundaries, flow, UI/UX, architecture, contracts, risk, or validation, stop at a safe point. Record the evidence, update the living map with the human, and hand off to a fresh definition session. Resolve ordinary implementation details that are already determined by accepted design autonomously.

Run the proof named by the current checkpoint. Keep separately planned integrated QA, user validation, and review in their own checkpoints.

Completion criterion: the one accepted deliverable exists, every `Done when` item passes, evidence is linked from its map entry, and no later checkpoint was executed.

## 3. Record and stop

Update the checkpoint status and follow the handoff in `SKILL.md`. End the conversation after one checkpoint disposition.

Completion criterion: the cockpit records delivered evidence, validation, residual risk, and the next fresh-session prompt without relying on conversation memory.
