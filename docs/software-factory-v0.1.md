# Software Factory v0.1

## Purpose

This document defines a harness-agnostic protocol for delivering software through collaborating AI agents. It specifies responsibilities, authority, evidence, synchronization, and phase transitions. Skills and harness integrations implement this protocol; they are not the protocol itself.

The factory optimizes for verified vertical progress without making the human manage routine agent handoffs.

## Status

Version 0.1 records the currently accepted operating model. It is a design baseline, not an implementation claim. A harness adapter may claim conformance only for the guarantees it can actually provide.

## Core rules

1. **Interview over document review.** The Coordinator models material decisions as a design tree and asks the complete currently answerable frontier in numbered rounds. Each question includes a recommendation. The human confirms a short final playback. Detailed contracts exist for agents and durable recovery; the factory does not require the human to read them.
2. **Autonomy inside accepted decisions.** Acceptance authorizes the factory to finish the slice, repair local defects, run gates, and create a focused local commit. The factory returns to the human only when evidence challenges a material decision or exposes a real blocker.
3. **Discover before delivery when needed.** The factory is not a fixed phase sequence. The Coordinator chooses the next uncertainty-reducing action and may dispatch research, a technical spike, a prototype, architecture design, debugging, or another specialist before proposing a delivery slice.
4. **Vertical slices are the unit of production delivery.** A production delivery crosses the necessary layers to produce behavior that the Product Validator can exercise through a real product interface. Horizontal layer completion is not a production delivery unit.
5. **Evidence changes the route.** Plans are provisional. Discovery or delivery evidence may add, remove, split, or reorder future work when it changes the best route.
6. **Logical roles, portable execution.** Roles are defined by responsibility, authority, input, output, and independence. Harness adapters decide how to realize them.
7. **Repair over report.** The Cleaner fixes implementation and local design defects within accepted decisions. It does not stop after writing a review report.
8. **Independent judgment.** The Verifier and Product Validator run in contexts independent from implementation and cleaning. Product Validator is also independent from Verifier and receives only durable candidate, pass, journey, and evidence records. Prompt changes inside the same accumulated context do not satisfy this requirement.
9. **Deterministic rules become gates.** If a property can be checked reliably, the project should encode it as an executable gate instead of repeating it as prompt guidance.
10. **Risk pays for rigor.** Expensive gates target decision-dense or high-consequence code and run at a cadence proportionate to their cost and value.
11. **External effects have separate authority.** Local completion does not authorize push, pull request publication, merge, deployment, paid operations, destructive operations, or production mutation unless a separate policy grants that authority.

## Material decisions

The factory must interview the human when new evidence may change any of these decisions:

- user-visible behavior;
- scope, boundaries, or exclusions;
- data handling, security, privacy, authorization, or sensitive effects;
- a public interface or externally relied-on contract;
- architecture that is expensive to reverse.

The factory resolves internal and reversible choices autonomously, including names, local decomposition, equivalent algorithms, test organization, implementation order, and tool selection.

A written plan is not material merely because it was written. The consequence of changing a decision determines its authority.

## Adaptive discovery

The factory operates under incomplete knowledge. The Coordinator does not need a complete route before work begins; it needs the current frontier of uncertainty and the next action most likely to reduce it.

### Route by the open question

The Coordinator inspects current evidence and dispatches a specialist only when its capability matches a live question. Examples include:

- repository or external research when the answer is discoverable without building;
- a technical spike when feasibility, integration, performance, or tool behavior must be exercised;
- a product, interaction, or state-model prototype when the intended behavior must be felt or compared;
- architecture design when an expensive-to-reverse interface, dependency, ownership, persistence, or failure model remains open;
- debugging when an observed failure must be explained before repair;
- security, data, performance, migration, or other domain analysis when the risk requires specialist evidence.

Skills supply these procedures. They are capabilities selected by the Coordinator, not mandatory permanent roles or fixed stages.

### Discovery dispatch

Every discovery dispatch states only what is needed to keep the work bounded and judgeable:

- the question or uncertainty;
- why it blocks or materially changes the next decision;
- the relevant constraints and evidence already known;
- the observable evidence or verdict that will answer it;
- the cost, time, or scope bound when exploration could expand indefinitely.

The specialist returns evidence, limits, surprises, and a recommendation. The Coordinator updates the goal map, decides whether another question is now at the frontier, and interviews the human only when the evidence makes a material decision ready or challenges an accepted one.

Discovery may iterate several times. It does not need to predict the remaining sequence.

### Human decision rounds

Factory v0.1 deliberately tests Matt Pocock's `grilling` flow without changing its frontier behavior:

1. Model the decision space as a design tree.
2. Define the frontier as every unresolved decision whose prerequisites are already settled.
3. Ask the complete frontier in one numbered round, with a recommended answer for each question.
4. Find environmental and repository facts through tools or delegated research instead of asking the human.
5. Use the human's answers to reshape the tree and compute the next frontier.
6. When the frontier is empty, present one short complete playback for acceptance.

A question whose answer depends on another open decision stays out of the current round. The Coordinator may continue independent discovery while waiting, but does not silently decide a question reserved to the human.

This is an experiment, not an unquestionable permanent rule. Evaluate it from observed comprehension, correction rate, number of re-explanations, and time to accepted decisions. The bilingual `wait-what` skill provides the recovery path when a round or message does not land.

### Discovery artifacts

Research notes, spikes, and prototypes are not production deliveries and do not automatically run the production Cleaner, Verifier, and Product Validator lifecycle. Their proof matches the question they were created to answer.

Code created during discovery is disposable by default. Preserve its question, evidence, verdict, and useful constraints; do not silently treat exploratory code as production. Promoting any discovery code requires an explicit decision and re-entry through the complete production delivery lifecycle. Prior discovery evidence may inform that delivery but does not replace production gates or independent validation.

A durable architecture decision is recorded only after its rationale is accepted and only when code and maintained documentation would not preserve the consequential why.

## Protocol layers

The factory separates four sources of truth.

### Factory protocol

The factory protocol defines universal roles, authority boundaries, lifecycle transitions, independence requirements, and evidence rules. This document is the protocol baseline.

### Project profile

The project profile records repository-specific facts and jointly accepted policy:

- build, test, static analysis, and packaging commands;
- protected behavior and high-consequence surfaces;
- architecture rules and executable dependency constraints;
- quality gates, targets, thresholds, cadence, and cost limits;
- faithful product drivers and environments;
- Git and external-effect policy;
- known harness or environment limitations.

The Coordinator and human define this profile together after the agent inspects the repository. A slice activates additional gates through accepted risk rules. Weakening the accepted baseline requires human synchronization.

The profile also defines risk triggers that activate additional gates automatically. An agent may run a low-cost diagnostic check without changing policy. Adding a gate or stricter cadence that materially changes cost, delivery time, or external policy requires a concise Coordinator playback and human acceptance.

Every accepted project-profile state has an identity, such as a version or content digest. Role dispatches and preserved evidence name the profile identity they used. A profile change invalidates only evidence affected by the changed policy.

### Goal map

The goal map preserves compact durable continuity:

- intended outcome and final observable proof;
- accepted material decisions and their rationale;
- boundaries and preserved behavior;
- ordered vertical slices and current status;
- current slice contract;
- evidence pointers, open risks, and blockers;
- changes to the route and why they occurred.

The map is the durable authority between sessions. Conversation history is not.

The harness adapter persists the map in a repository artifact or another durable store. Every map state has an identity, such as a version or content digest. Only the Coordinator updates accepted decisions and routing state. Every temporary role receives the exact map identity it must follow and rejects superseded input. After interruption, the Coordinator reloads the latest durable map before dispatching work.

The map records the current delivery-candidate identity separately from its own identity. If the map lives in the repository, post-validation bookkeeping may join the final commit only when the staged delivery surface still matches the validated candidate exactly. A coordination artifact that can affect product behavior is part of the delivery candidate and must be validated with it.

### Harness adapter

A harness adapter maps logical roles and protocol operations to runtime capabilities. It records whether the harness can provide:

- fresh independent contexts;
- scoped tool and write permissions;
- command execution and deterministic result capture;
- exact repository identity and immutable pre-commit candidate snapshots;
- browser, desktop, API, or CLI product interaction;
- durable artifact updates;
- focused local commits;
- external-effect authorization gates.

An adapter reports unsupported guarantees explicitly. It must not silently approximate an independent context, a write boundary, or an evidence-producing action.

## Roles

### Coordinator

The Coordinator owns synchronization and continuity.

Responsibilities:

- inspect available facts before questioning the human;
- run Matt-style design-tree grilling: ask the complete current frontier in numbered rounds with a recommendation and principal consequence for each question;
- present a short complete playback for acceptance;
- persist the detailed agent-facing contract and goal map;
- identify the current frontier of uncertainty and dispatch the specialist skill or agent that can reduce it;
- keep discovery bounded by a question and judgeable evidence instead of a predicted end-to-end plan;
- select the next vertical slice and dispatch temporary roles;
- route findings according to authority;
- adapt the future slice map from evidence;
- report completed work concisely.

Authority:

- may update coordination artifacts;
- may resolve routing and reversible process details;
- may not silently decide material product or architecture questions;
- should not absorb implementation work merely because it has repository access.

### Implementer

The Implementer produces the accepted vertical slice.

Responsibilities:

- implement the smallest coherent vertical behavior;
- preserve accepted boundaries and protected behavior;
- create discriminating automated proof of observable behavior, invariants, or stable interface effects; a narrow code seam is valid only when it preserves those semantics;
- run the tight feedback loop from the project profile;
- record evidence and unexpected facts for the Cleaner and Coordinator.

Authority:

- may change production code and tests inside the accepted slice;
- may make internal and reversible design choices;
- must stop at a safe point when evidence challenges a material decision.

### Cleaner

The Cleaner turns a working candidate into a maintainable and hardened candidate. This is a write role, not a report-only review role.

Responsibilities:

- inspect the accepted contract, candidate diff, tests, and project profile;
- fix local correctness defects, incomplete error handling, and avoidable complexity;
- improve module depth, information hiding, locality, and dependency direction;
- remove accidental duplication and dead implementation debris;
- run the applicable complexity, coverage, mutation, architecture, and regression gates;
- leave the candidate and its proof green.

Authority:

- may edit code and tests within accepted decisions;
- may refactor beyond the lines originally changed when required to remove the demonstrated local cause;
- may not redefine accepted behavior, public interfaces, sensitive policy, or consequential architecture.

### Verifier

The Verifier independently judges the cleaned candidate against the accepted contract and strategic design standard. Its initial dispatch uses a context fresh from implementation and cleaning, and it does not edit the candidate.

Responsibilities:

- derive the review surface from the exact base and immutable candidate identities;
- trace every material obligation to primary code and test evidence;
- inspect independently captured gate evidence and rerun a gate only when the project profile requires independent execution or the evidence is insufficient;
- examine the architecture that exists after implementation, including module depth, information hiding, invariants, dependency direction, failure behavior, and change amplification;
- classify each problem by authority and return reproducible evidence.

Outcomes:

- `Pass`: the candidate satisfies the technical contract and only optional advice remains;
- `Repair`: a local implementation or design defect returns automatically to the Cleaner;
- `Resynchronize`: a contract or consequential architecture gap returns to the Coordinator for human interview;
- `Inconclusive`: missing evidence, access, or environment has a concrete unblock condition.

### Product Validator

The Product Validator independently uses the product as a user and proves the accepted journeys through real product interfaces. It uses a fresh context and does not edit production code.

For every accepted journey, it receives plain-language facts:

- who acts;
- the starting state;
- the action;
- the result that must be observable;
- any result that must not occur.

Responsibilities:

- choose the narrowest driver that preserves the material user semantics;
- verify before acting that every journey step with an external effect has explicit scoped authorization or runs in an approved non-production or simulated environment that preserves the material semantics;
- execute the journey against the exact candidate under test;
- capture the action and resulting observation together when the driver supports it;
- preserve reproducible evidence and the first observed failure;
- distinguish accepted journeys from exploratory probes.

Outcomes:

- `Pass`: every accepted journey produced its required observations and avoided forbidden outcomes;
- `Fail`: evidence returns automatically to the repair loop;
- `Inconclusive`: the environment, authority, driver, or observable result is insufficient, with a concrete unblock condition.

An accepted slice or journey does not authorize its external effects. Before each effectful action, the Product Validator and driver require either a scoped grant naming the effect and environment or an approved non-production substitute. Without one, the Product Validator returns `Inconclusive` before performing the action and names the authorization or environment required to proceed.

A product driver may implement browser, desktop, API, or CLI actions and return the resulting observation with each action. The driver is an adapter; the Product Validator remains responsible for selecting actions and judging product behavior.

### Root-cause diagnostician

The Coordinator dispatches a fresh Root-cause Diagnostician after two unsuccessful repair attempts for the same stable failure.

The diagnostician determines whether the repeated failure is:

- a local implementation defect;
- an incoherent design that requires reshaping or splitting the slice;
- a contract gap;
- a harness, tool, access, or environment blocker;
- a demonstrated model capability failure.

The diagnosis routes the work; it does not automatically authorize a material decision change or arbitrary model escalation.

A stable failure is a Verifier finding ID, Product Validator journey and earliest divergence, or gate ID tied to the same unmet obligation. One repair attempt is a new immutable candidate submitted as resolving that failure and shown not to resolve it. The counter resets only when the obligation passes, accepted evidence supersedes it, or diagnosis demonstrates a different root cause.

The Coordinator may authorize another bounded repair or a different execution route when both remain inside accepted material decisions and project policy. Reducing accepted behavior, splitting the current accepted outcome, changing consequential architecture, materially increasing approved cost, or changing external-effect policy requires human synchronization. Model or harness rerouting requires evidence of a capability or environment mismatch and must follow project routing policy.

## Production delivery lifecycle

This lifecycle is entered only when discovery and synchronization have made the next vertical slice judgeable. It is not the mandatory route for research, spikes, prototypes, or other disposable discovery work.

### 1. Synchronize the slice

The Coordinator derives known facts from the repository, project profile, goal map, and relevant discovery evidence before asking questions. It uses frontier rounds only for unresolved material decisions. If the slice cannot yet be judged, the Coordinator returns to adaptive discovery instead of forcing an acceptance contract.

The Coordinator then presents a short playback containing:

- the slice identity;
- the user-visible outcome;
- included and excluded behavior;
- protected data and behavior;
- accepted material interface or architecture choices;
- how the Product Validator will prove the slice.

Before the playback, the frontier rounds also resolve every applicable consequential design choice that is expensive to reverse or necessary to make the slice judgeable. New evidence may later reopen one of those decisions, but the factory does not schedule a second planned human design checkpoint.

The Coordinator records the playback, the human response, and the resulting acceptance identity. Human acceptance authorizes the remaining lifecycle through local commit. Agent-facing detail may expand the accepted decisions but may not add material assumptions.

### 2. Record the minimum consequential shape

The Coordinator records the consequential design accepted during synchronization. For each applicable decision, the record identifies the central policy or invariant, its owner, the intended interfaces, dependency direction, data ownership, failure behavior, or faithful validation path. Inapplicable items do not require ceremony.

The factory does not attempt to design the entire future system. Internal and reversible implementation choices remain with the Implementer and Cleaner.

### 3. Implement the vertical behavior

The Implementer produces end-to-end behavior and focused proof. Production-enabling work remains inside an accepted vertical slice. When uncertainty must be reduced before production delivery, the Coordinator dispatches bounded discovery rather than disguising a horizontal layer as a delivery slice.

### 4. Clean and harden

The Cleaner repairs and restructures the candidate, then freezes an immutable candidate identity and runs the applicable slice gates from the project profile against that identity. A gate failure remains in the cleaning phase until it passes, receives a pre-authorized disposition, exposes a material decision, or reaches the repeated-repair limit.

### 5. Verify independently

The Verifier reviews the exact cleaned candidate identity. A repairable defect returns directly to the Cleaner without human mediation. Every changed candidate re-enters clean and harden, reruns affected gates, receives a new identity, and passes the Verifier again. The Cleaner records why any expensive unaffected gate remains valid.

### 6. Validate through the product

After technical verification passes, the Product Validator executes every accepted journey through the real product interface against the same candidate identity. A product failure returns to the Cleaner with evidence. The repaired candidate then re-enters clean and harden, reruns affected gates, and passes technical verification. The Product Validator must execute the complete accepted journey set once against the final immutable candidate before commit; targeted journeys may run earlier during diagnosis.

### 7. Diagnose repeated failure

After two unsuccessful repairs for the same stable failure, the Coordinator dispatches a fresh root-cause diagnosis. The Coordinator may authorize another bounded repair or non-material route change inside the accepted slice. A change to accepted behavior, a split that defers part of the accepted outcome, consequential redesign, or material cost change requires human resynchronization. A demonstrated capability mismatch follows project routing policy. A blocker records the exact unblock condition.

### 8. Commit and adapt

When the Verifier and Product Validator pass and every required gate is satisfied, the factory:

1. records the validated candidate identity and evidence pointers;
2. updates the goal map and its identity;
3. inspects the final staged diff and repository state;
4. proves that the staged delivery surface exactly matches the validated candidate and that only permitted coordination bookkeeping was added;
5. creates one focused local commit containing only slice-owned changes;
6. verifies and records the exact commit revision and its validated candidate identity;
7. adapts future slices from the evidence;
8. reports the outcome, proof, residual risk, and next slice concisely.

If the staged delivery surface differs from the validated candidate, the changed surface re-enters the applicable gates, Verifier, and Product Validator before commit.

The factory does not wait for another human acceptance before the local commit. Push, pull request publication, merge, and deployment follow separate project policy.

## Quality profile

### Joint definition

The Coordinator first inspects the project and proposes a quality profile. The human and Coordinator then agree on the value, cost, scope, and cadence of each gate. The profile should be executable where the repository permits it and remain versioned with the project.

A gate definition records:

- the property it protects;
- its command or tool adapter;
- included and excluded surfaces;
- pass criteria and allowed dispositions;
- cadence;
- expected cost;
- evidence to preserve.

### Universal minimum

Every project must define how the factory proves:

- the changed artifact builds, parses, or loads as applicable;
- focused automated proof can fail on the old behavior or a plausible defect;
- accepted product behavior is exercised through a faithful interface;
- protected existing behavior remains intact in the affected surface;
- the final diff contains only intended changes;
- the exact immutable candidate identity and executed evidence are identifiable.

The protocol does not impose one language-specific command, coverage percentage, complexity threshold, or mutation score on every project.

### Gate status

Every required gate ends in one of four states:

- `Pass`: the candidate meets the gate's pass criteria;
- `Pre-authorized disposition`: the project profile already permits a named outcome, such as an equivalent mutant, excluded generated surface, or approved timeout budget, and the Cleaner records matching evidence;
- `Resynchronize`: satisfying or bypassing the gate would change material behavior, risk, cost, or policy and therefore requires a human decision;
- `Blocked`: a named tool, access, environment, or adapter condition prevents judgment and has a concrete unblock condition.

The Cleaner records the status and evidence. The Verifier judges whether a claimed pre-authorized disposition matches the project profile. Only `Pass` and a valid `Pre-authorized disposition` satisfy a required gate. `Resynchronize` and `Blocked` cannot authorize commit.

### Gate cadence

#### Tight loop

Run cheap feedback after small implementation steps:

- focused tests;
- build, parse, or type checks;
- formatting and static analysis;
- cheap local invariant and architecture checks.

#### Slice gate

Run targeted, more expensive evidence before independent verification:

- tests for the affected behavior and adjacent regression surface;
- complexity or CRAP analysis on changed or implicated code;
- mutation testing on decision-dense or high-consequence logic;
- integration checks across affected interfaces;
- declared architecture constraints.

#### Milestone or release gate

Run broad checks when the accumulated risk and release policy justify their cost:

- full test suites;
- global architecture checks;
- wider mutation campaigns;
- broader product regression journeys;
- security, performance, migration, compatibility, or recovery checks.

### Coverage

Coverage is evidence about test reach, not a standalone definition of quality. The profile may require changed-code or module coverage, but every accepted behavior still needs a discriminating test or product observation. The Cleaner must not add implementation-coupled tests solely to increase a percentage.

### CRAP and complexity

CRAP and cyclomatic complexity identify code that combines branching with weak test protection. Apply them to changed or implicated modules, not automatically to generated code or an entire repository.

The project profile sets thresholds from observed project costs. Crossing a threshold requires cleanup or an evidence-backed disposition; it does not prove a defect by itself. The Cleaner must address the complexity mechanism rather than game the score through superficial splitting.

### Mutation testing

Mutation testing measures whether tests detect plausible semantic changes. Target code where a surviving change could alter a meaningful decision or invariant, such as:

- domain rules and calculations;
- permissions and authorization;
- money and high-consequence data transformations;
- parsers and validators;
- state machines, retries, ordering, and concurrency;
- security and recovery behavior.

Exclude or deprioritize code whose mutants usually add cost without useful confidence, such as generated code, framework wiring, trivial accessors, thin translation adapters, and declarative configuration.

A surviving mutant receives one recorded outcome:

- missing behavioral proof;
- equivalent or unobservable mutation;
- excluded low-value surface with rationale;
- material contract ambiguity requiring synchronization.

Only an outcome pre-authorized by the project profile counts as a satisfied gate without human interruption. Missing proof returns to the Cleaner. Material ambiguity returns to the Coordinator.

The protocol does not require a global 100% mutation score. The project profile defines target score, timeout budget, sampling strategy, and cadence where mutation testing is useful.

### Architecture tests

Architecture tests enforce declared structural facts, including allowed dependencies, layering, cycles, ownership, public interface constraints, and forbidden imports. Run cheap global rules in the tight loop; run costly rules at the slice or release cadence.

Architecture tests cannot prove module depth, information hiding, conceptual integrity, or an appropriate seam by themselves. The independent Verifier judges those strategic properties from the implemented design and concrete change cost.

## Repair and evidence rules

- Before independent judgment, the Cleaner freezes an immutable pre-commit candidate materialization. It records the base revision, exact source tree or patch digest, included tracked and untracked artifacts, behavior-affecting generated outputs or their reproducible build procedure, dependency locks, permitted configuration classes, fixtures and test data, and validation driver and environment identity. Unlisted workspace state is excluded by default.
- Every adapter must materialize that candidate without relying on undeclared ignored files, local outputs, or ambient configuration. An adapter that cannot create or identify the required snapshot returns an unsupported-guarantee blocker.
- The factory creates the focused local commit only after all required gates and independent judgments pass. The committed source must match the validated materialized delivery surface; generated behavior must be reproducible from that source and the recorded procedure.
- Every gate, Verifier result, and Product Validator result names the exact candidate identity it judged.
- The final local commit must contain the validated delivery surface exactly. Any mismatch invalidates affected evidence and returns the change to the lifecycle.
- Every finding has stable identity, evidence, consequence, authority, and status.
- A changed candidate invalidates affected gate, verification, and product evidence. The Cleaner records why any expensive unaffected evidence remains valid.
- A bounded repair may return to the same independent Verifier or Product Validator context with the stable finding ledger and new candidate identity. A materially reshaped design or risk surface, an unreliable candidate chain, or an unavailable prior validator requires a fresh full independent context.
- The Cleaner owns repairable implementation and local design defects.
- The Coordinator owns routing and human synchronization.
- The human owns material decision changes.
- The Verifier and Product Validator own only judgment and evidence, not production repair.
- The first failure remains recorded when retries investigate nondeterminism.
- Green summaries support evidence but do not replace obligation-level proof.

### Inconclusive evidence

An inconclusive required gate, Verifier obligation, or accepted product journey cannot authorize commit. The Coordinator routes it by cause:

- a repairable local environment or setup problem goes to a temporary execution role, then the affected judgment repeats;
- an unavailable required harness capability becomes a recorded blocker with the exact capability and human decision needed;
- an unobservable or contradictory accepted outcome returns to human synchronization;
- an alternative validation path may be used only when the project profile pre-authorizes its limits and the path still preserves the material user semantics through a real product interface.

The Coordinator records the owner, next transition, and unblock condition. `Inconclusive` is a routing state, not a final report.

## Completion contract

A vertical slice is complete when all of the following are true:

- the accepted user-visible behavior exists;
- focused automated proof passes;
- applicable project gates pass or have valid pre-authorized dispositions;
- the independent Verifier passes the exact final candidate;
- the independent Product Validator passes every accepted journey against that candidate;
- the goal map links the evidence and records route changes;
- a focused local commit identifies the completed candidate;
- no unresolved material decision or hidden blocker remains.

## Non-goals

Version 0.1 does not define:

- a specific harness, model provider, or agent launcher;
- a universal project configuration schema;
- mandatory numeric thresholds across languages;
- automatic push, pull request, merge, or deployment policy;
- a replacement for project-specific engineering judgment;
- a permanent agent persona for every tool or gate.
