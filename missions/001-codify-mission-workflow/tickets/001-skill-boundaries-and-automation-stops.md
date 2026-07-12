# Ticket 001: Skill Boundaries and Automation Stops

Status: **Closed — Option A selected by Mission Control**  
Type: **Collaborative design decision**  
Owner: **Luis + Kratos**

## Question

What should each initial skill own, and where must automation stop so that Mission remains a collaboration rather than an autonomous document pipeline?

## Why this matters

If one skill sees the entire downstream sequence, it may rush toward completion and recreate the pilot's automatic flow. If the workflow is split too finely, Luis must remember and invoke many skills and the mission loses coherence.

This decision determines the minimum package, invocation model, and ticket protocol.

## Evidence

- Pilot 1: one coordinator drafted and repeatedly expanded a contract through reviewer feedback.
- Pilot 1 reset: narrowing and loop breakers worked, but preparation still happened largely offstage.
- Existing local `discovery`: useful human-visible navigation exists, but the skill is broad and template-heavy.
- Repository skills: small, portable `.agents/skills/<name>/SKILL.md` packages are the established convention.

## Option A — Two skills with one shared ticket protocol (recommended)

### `mission`

Owns:

- opening and closing the bounded intervention;
- keeping the human-visible map and ticket ledger current;
- selecting one active ticket with Mission Control;
- gates and human decision boundaries;
- routing a ticket to Discovery, artifact drafting, implementation, or QA;
- preventing automatic downstream progression.

It does **not** solve discovery questions, author every artifact, approve gates, or run implementation by itself.

### `discovery`

Owns:

- executing one approved uncertainty ticket;
- gathering evidence;
- updating known territory, fog, frontier, and decisions;
- returning to `mission` after the ticket closes.

It does **not** produce the complete execution contract or decide that the mission should advance.

### Shared ticket protocol

Discovery questions, product specs, technical designs, implementation plans, validation plans, implementation slices, and QA reviews are all explicit tickets. A ticket names its mode and deliverable. Initially, artifact drafting is governed by the ticket and repository standards rather than one separate skill per artifact.

**Trade-off:** smallest package and clearest collaboration boundary; artifact-specific discipline may need references or future skills after live evidence.

## Option B — Mission router plus separate lifecycle skills

Initial skills:

- `mission`
- `discovery`
- `product-spec`
- `technical-design`
- `implementation-plan`
- `validation-plan`

Each deliverable ticket routes to a specialized skill.

**Trade-off:** stronger specialization and sequence isolation, but greater context/invocation load and a high chance of prematurely codifying artifact boundaries before observing real use.

## Option C — One comprehensive mission skill

One skill owns navigation, discovery, artifacts, readiness, execution routing, and closure.

**Trade-off:** easiest invocation, but it keeps every downstream step visible and most directly reproduces the automatic-flow failure. Not recommended.

## Proposed automation stops

Regardless of package, explicit Mission Control approval is required to:

1. select or materially change mission outcome or appetite;
2. accept a scope or risk-class change;
3. activate a material ticket when alternatives exist;
4. move from exploration to execution-contract shaping;
5. approve the ticket set that will create deliverables;
6. freeze or amend the execution baseline;
7. accept QA's verdict and close/reframe/abandon the mission.

Agents may automatically perform mechanical subtasks inside an approved ticket when the scope and completion evidence are already fixed.

## Kratos recommendation

Choose **Option A** for version 0.1. It creates the plural skills we actually know we need, uses tickets to isolate later deliverables, and avoids inventing four artifact skills before observing where agents truly need stronger discipline.

If live tests show repeated quality failures in Technical Design or Validation Plan, split those into independently invokable skills using evidence rather than anticipation.

## Decision needed from Mission Control

**Decision:** Luis selected **Option A — `mission` + `discovery` with one shared ticket protocol**.

The first version will not create separate skills for Product Spec, Technical Design, Implementation Plan, or Validation Plan. Those deliverables will be authorized and isolated through tickets. A specialized skill may be split later only when live evidence shows a repeated quality or sequencing failure.

## Map updates

- Skill package boundary moved from fog to decided.
- Option B remains a future split strategy, not current scope.
- Option C is rejected because it recreates the automatic-flow failure.
- Next frontier: define the minimum shared ticket protocol.
