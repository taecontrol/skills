# Collaborative Ticket Profiles

Load this reference only for Decision, Prototype, Use Cases Definition, or Design.

## Shared interview loop

Run collaboration during the work, not as a final request to review an agent-authored answer.

1. Explain the product choice with one concrete example and consequence.
2. Ask one question at a time and wait for Mission Control.
3. Verify evidence and pressure-test trade-offs; use `grilling` when installed.
4. Read back decisions, consequences, rejected alternatives, assumptions, and intentional deferrals in plain language.
5. Let Mission Control correct or confirm the synthesis before recording durable mission truth.

Completion criterion: Mission Control has explicitly confirmed the final synthesis and no material ambiguity is hidden in the artifact.

## Decision

**Kind / Type:** `Decision / <decision-name>`

Use the shared interview loop to produce a coherent decision set. Agents provide verified options, trade-offs, and a recommendation when useful; Mission Control decides.

Keep closely coupled questions together when they form one downstream contract. Split an independently disposable decision with different evidence, authority, or risk.

## Prototype

**Kind / Type:** `Decision / prototype`

Use the installed `prototype` skill when available. Keep one ticket for the full loop:

```text
build -> show -> gather feedback -> iterate -> choose
```

Demonstrate meaningful increments to Mission Control and let feedback shape the next iteration. Close with the selected path and rationale; a second Decision ticket is unnecessary. Split only when the prototype exposes a material decision outside the approved product question, scope, or risk.

Treat prototype code as disposable evidence by default. A later Implementation ticket must deliberately adopt any reusable part.

Completion criterion: Mission Control has experienced enough functional behavior to choose, confirmed the chosen path, and identified what the prototype does not prove.

## Use Cases Definition

**Kind / Type:** `Deliverable / use-cases-definition`

Create a small set of genuinely end-to-end journeys rather than many disconnected steps. For every journey record:

- stable identifier, actor, goal, preconditions, and starting state;
- trigger, complete main flow, and observable outcome; and
- meaningful branches for alternatives, failures, permissions, retries, recovery, cancellation, concurrency, and cross-channel effects.

Nest branches under the journey they modify and give each a stable identifier for Design, Implementation, and Validation traceability. Interview Mission Control about missing policy; treat invented material behavior as an unresolved question.

Completion criterion: Mission Control confirms that every in-scope actor goal reaches an observable outcome and every material branch is accepted, deferred, or excluded explicitly.

## Design

**Kind / Type:** `Deliverable / design`

Translate accepted decisions and use cases into an implementable technical contract. Define affected concepts and interfaces, responsibility boundaries, invariants, data and state transitions, failure handling, security, compatibility, migration, rollout, observability, and rollback when relevant.

Work independently where the accepted baseline determines the answer. Re-enter the shared interview loop for product policy, risk appetite, or consequential architecture choices. Use independent design review for non-trivial or high-risk designs.

Completion criterion: a fresh implementer can trace every in-scope behavior to a design responsibility without inventing a material decision; residual risks and deferred design work are explicit.
