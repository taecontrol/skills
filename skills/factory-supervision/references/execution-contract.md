# Execution contract

Use this reference before crossing an agent, process, workspace, or harness boundary.

## Authority

The initiating owner keeps its Factory authority:

- The goal Coordinator owns accepted decisions, the project profile, goal map, phase, slice schedule, integration, and cross-slice routing.
- A Slice Owner owns routine transitions inside one accepted slice, including repair and reverification loops. It cannot change the accepted contract.
- A Goal Validation Owner owns one accepted read-only validation assignment. It cannot repair the candidate or change the validation contract.
- Implementer, Cleaner, Verifier, Product Validator, and Diagnostician have only the authority declared by their role skills.

Supervision transfers work, not authority. A target may report evidence or a prescribed outcome; it may not settle a decision reserved for the initiating owner.

## Required input

Every assignment names:

- initiating owner and target role;
- goal-map, project-profile, phase, design-baseline, slice-batch, execution-plan, and human-acceptance identities that apply;
- accepted slice or goal-validation assignment;
- dependency outputs, base revision, workspace identity, resource lease, and candidate identity when one exists;
- protected behavior, gates, journeys, allowed and forbidden effects, evidence destination, and commit boundary;
- selected harness and model when prescribed;
- progress, question, terminal-result, timeout, cancellation, retention, and cleanup routes.

Use `not applicable` for an identity that does not exist at that phase. Do not omit an existing identity or replace a durable identity with a terminal, task, conversation, or process identifier.

## Placement

Use the smallest topology that preserves isolation and independence:

1. Reuse the current workspace when it is already the exclusive mutable workspace for the assigned slice.
2. Allocate one isolated workspace for each concurrently active slice. Record its exact base independently from its parent or display lineage.
3. Keep all internal roles for one slice in that slice workspace. Run mutating roles sequentially against one candidate lineage.
4. Start Verifier and Product Validator in separate fresh contexts. Freshness means no inherited reasoning from Implementer, Cleaner, or each other; it does not require another checkout.
5. Serialize assignments that cannot obtain exclusive mutable resources.

Never create a workspace solely because the target agent is fresh. Never let two active slices share a mutable checkout, database namespace, service instance, port, account, fixture namespace, device, browser profile, or build output.

## Harness capability check

A harness is eligible only when the adapter can establish the capabilities required by the role:

- start or address a fresh session in the exact workspace;
- deliver the complete assignment once and confirm readiness when delivery can race startup;
- preserve a stable result or readable transcript;
- carry questions and answers without changing their recipient;
- distinguish liveness, completion, failure, and cancellation;
- identify workspace mutations and keep Verifier and Product Validator read-only with respect to the candidate;
- release only resources owned by the attempt;
- make the required Factory and role skills available to the target.

Additional role capabilities may include repository writes, product-interface control, network or environment access, secrets, paid effects, or destructive cleanup. Require the accepted authorization before selecting a harness that can perform those effects.

If no available harness satisfies the contract, return `Blocked` with the missing capability, owner, and exact unblock condition. Do not weaken independence, isolation, or evidence requirements to keep work moving.

## Harness selection

An accepted execution plan or explicit human instruction wins. Otherwise select by capability, locality, availability, and authorized cost. Treat model, effort, and provider as execution choices unless the project profile makes one evidence-bearing.

The initiating owner and target may use different harnesses. Do not hardcode the initiating harness as the worker default. Record the requested and effective harness when they differ.

## Attempt identity

One assignment may have several attempts, but only one may be active unless the prior attempt is proven stopped or abandoned with its residual resources recorded. A retry receives a new attempt identity and names the prior attempt and reason.

Backend task, dispatch, terminal, process, session, and conversation identifiers are routing metadata. Keep them in execution receipts; do not place them in production names or use them as goal-map, slice, candidate, finding, or acceptance identities.
