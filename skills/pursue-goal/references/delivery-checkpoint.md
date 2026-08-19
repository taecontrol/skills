# Delivery checkpoint

Use this branch to inspect and present the start of a delivery checkpoint, then to implement or validate its already-defined scope after the human accepts the single combined start proposal.

## 1. Accept one combined start gate

Create a readiness record for the exact delivery scope. For every dimension below, link accepted evidence or mark it inapplicable with a rationale:

- **requirements and boundaries:** actors, outcome, included and excluded behavior, constraints, and acceptance criteria;
- **functional flow:** happy path, relevant alternatives, errors, edge cases, permissions, and meaningful system states;
- **UI/UX:** interaction, information hierarchy, content, visual states, responsiveness, and accessibility;
- **code architecture:** responsibilities, boundaries, interfaces, dependencies, data flow and ownership, persistence or migration, failure behavior, and material tradeoffs; and
- **validation:** mapping from accepted flows and important risks to observable proof, with required environment and test data.

Readiness passes only when every dimension has accepted evidence or an accepted inapplicability rationale and zero open material design questions can change the delivery.

When ready, present one concise start proposal that combines the complete checkpoint contract required by `SKILL.md` with the readiness verdict. Cite the readiness record and mention only caveats material to the human's decision. Wait once for explicit human acceptance; that response accepts both contract and readiness and authorizes delivery. Record the response beside both records. Do not present the exhaustive readiness record or ask for a second readiness approval unless the human requests the detail.

When readiness fails, update the living map with the human to add or reprioritize the required definition checkpoint, write the next-session prompt, and end this conversation. Resolve the gap and delivery in separate fresh sessions.

Completion criterion: the cockpit links the exhaustive readiness record, the combined start proposal, and one explicit human acceptance covering both; or it records the blocking definition checkpoint and ends delivery before production changes.

## 2. Deliver the accepted scope

Perform the mechanical coding, specialist work, review, and bounded repair required by the accepted deliverable. Preserve unrelated user changes and keep adjacent checkpoints outside this session.

If execution reveals an unknown that can materially change requirements, boundaries, flow, UI/UX, architecture, contracts, risk, or validation, stop at a safe point. Record the evidence, update the living map with the human, and hand off to a fresh definition session. Resolve ordinary implementation details that are already determined by accepted design autonomously.

Run the proof named by the current checkpoint. Keep separately planned integrated QA, user validation, and review in their own checkpoints.

Completion criterion: the one accepted deliverable exists, every `Done when` item passes, evidence is linked from its map entry, and no later checkpoint was executed.

## 3. Accept, record, commit, and stop

Present the complete delivered result and its named proof. Wait for explicit human acceptance; requested corrections remain inside this checkpoint and require the affected proof to be rerun.

After acceptance, record the response, update the checkpoint status, complete the handoff, and follow the automatic commit procedure in `SKILL.md` without requesting separate commit permission. End the conversation after reporting the one checkpoint disposition and commit.

Completion criterion: the cockpit records accepted delivered evidence, validation, residual risk, and the next fresh-session prompt without relying on conversation memory, and the accepted session-owned changes are committed.
