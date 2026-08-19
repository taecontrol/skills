# Delivery checkpoint

Use this branch to accept and execute one already-defined delivery checkpoint.

## 1. Accept one delivery start

Create a readiness record for the exact delivery scope. For every dimension below, link accepted evidence or mark it inapplicable with a rationale:

- **requirements and boundaries:** actors, outcome, included and excluded behavior, constraints, and acceptance criteria;
- **functional flow:** happy path, relevant alternatives, errors, edge cases, permissions, and meaningful system states;
- **UI/UX:** interaction, information hierarchy, content, visual states, responsiveness, and accessibility;
- **code architecture:** responsibilities, boundaries, interfaces, dependencies, data flow and ownership, persistence or migration, failure behavior, and material tradeoffs; and
- **validation:** mapping from accepted flows and important risks to observable proof, with required environment and test data.

Readiness passes only when every dimension has accepted evidence or an accepted inapplicability rationale and zero open material design questions can change the delivery.

When ready, add the readiness verdict, evidence pointer, and material caveats to the checkpoint-start proposal defined in `SKILL.md`. Present that concise proposal once. The human's response accepts the contract and readiness and authorizes delivery. Link the response from both records. Keep the exhaustive readiness record in the cockpit and show it when the human requests the detail.

When readiness fails, update the living map with the human to add or reprioritize the required definition checkpoint, write the next-session prompt, and end this conversation. Resolve the gap and delivery in separate fresh sessions.

Completion criterion: the cockpit links the exhaustive readiness record, the combined start proposal, and one explicit human acceptance covering both; or it records the blocking definition checkpoint and ends delivery before production changes.

## 2. Deliver the accepted scope

Perform the mechanical coding, specialist work, review, and bounded repair required by the accepted deliverable. Preserve unrelated user changes and keep adjacent checkpoints outside this session.

If execution reveals an unknown that can materially change requirements, boundaries, flow, UI/UX, architecture, contracts, risk, or validation, stop at a safe point. Record the evidence, update the living map with the human, and hand off to a fresh definition session. Resolve ordinary implementation details that are already determined by accepted design autonomously.

Run the proof named by the current checkpoint. Keep separately planned integrated QA, user validation, and review in their own checkpoints.

Completion criterion: the one accepted deliverable exists, every `Done when` item passes, evidence is linked from its map entry, and no later checkpoint was executed.

## 3. Accept, record, commit, and stop

Present the complete delivered result and its named proof. Wait for explicit human acceptance; requested corrections remain inside this checkpoint and require the affected proof to be rerun.

After acceptance, record the response, update the checkpoint status, complete the handoff, and follow the automatic commit procedure in `SKILL.md`. End the conversation after reporting the one checkpoint disposition and commit.

Completion criterion: the cockpit records accepted delivered evidence, validation, residual risk, and the next fresh-session prompt without relying on conversation memory, and the automatic commit procedure completes.
