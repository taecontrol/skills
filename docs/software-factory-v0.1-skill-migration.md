# Factory v0.1 skill migration analysis

## Authority

[`software-factory-v0.1.md`](./software-factory-v0.1.md) is the operating model. Existing skills are partial implementations and should migrate toward it. They must not redefine the Factory by accident.

This analysis recommends migration work; it does not claim that the current skills implement Factory v0.1.

## Migration decisions

| Current artifact | Factory role | Decision |
| --- | --- | --- |
| `pursue-goal` | Coordinator and vertical-slice lifecycle | Major rewrite |
| `cleaner` | Cleaner | Current Taecontrol-authored role; integrate it with the migrated Coordinator, Verifier, and Product Validator |
| `implementation-review` | Verifier | Keep the package identifier; rewrite its role contract |
| `use-case-qa` | Product Validator | Keep the package identifier; simplify and rewrite its role contract |
| `strategic-programming` | Shared Implementer, Cleaner, and Verifier standard | Small role-boundary revision |
| Harness-specific integrations | Factory adapter | Document separately from portable role skills |

Stable package identifiers avoid an unnecessary breaking migration. Public role names should follow Factory terminology even when a skill keeps its existing installation name.

## `pursue-goal`

### Preserve

- Investigate repository and external facts before questioning the human.
- Preserve Matt's design-tree grilling flow: ask the complete currently answerable frontier in numbered rounds, with a recommendation for each question.
- Preserve accepted decisions, boundaries, evidence, risks, and route changes in durable artifacts.
- Treat the plan as living and allow evidence to add, split, remove, or reorder future work.
- Stop safely when new evidence challenges a material decision.
- Keep push and other external effects outside local-commit authority.
- Preserve focused commits, unrelated user changes, and observable completion evidence.

### Replace

The current skill organizes work around human-started foundation, definition, delivery, and closure sessions. Each checkpoint has a start-acceptance gate, and every completed result waits for another human acceptance before commit. This conflicts with Factory v0.1.

Replace these behaviors:

- contract documents presented for human approval;
- repeated checkpoint-start approvals;
- result acceptance before local commit;
- separate review, integrated QA, and user-validation checkpoints;
- human approval for every non-material route change;
- exhaustive readiness records for dimensions that do not matter to the active slice;
- the assumption that every phase boundary requires a new human-started conversation.

With these behaviors:

1. The Coordinator inspects facts and runs frontier-round grilling for unresolved material decisions.
2. When uncertainty remains, the Coordinator dispatches the specialist skill or agent most likely to reduce the current open question.
3. Discovery evidence updates the map and may trigger another discovery action without predicting the complete route.
4. Once the next production slice is judgeable, the Coordinator presents one short slice playback.
5. Human acceptance authorizes the entire vertical-slice lifecycle through focused local commit.
6. Temporary role contexts implement, clean, verify, and validate the accepted slice.
7. Repairable defects route automatically without human mediation.
8. The Coordinator adapts future work autonomously while accepted material decisions remain intact.
9. The Coordinator resynchronizes only when evidence challenges a material decision or exposes a real blocker.

### Change the unit of work

A vertical slice replaces a generic checkpoint as the production delivery unit. Each slice must produce behavior that the Product Validator can exercise through a real product interface.

Research, prototypes, architecture design, and technical spikes belong to an adaptive discovery loop, not a generic mandatory definition phase. Each discovery dispatch answers one live question with bounded, judgeable evidence. Discovery may iterate until the next production slice becomes judgeable.

Discovery code is disposable by default. Promoting it requires an explicit decision and the complete production delivery lifecycle; discovery evidence informs production but does not replace its gates or independent validation.

Cleaner, Verifier, and Product Validator own required production transitions and judgments for a judgeable slice. They are not optional future checkpoints, but their skills remain capabilities rather than a universal discovery sequence.

### Simplify durable artifacts

Replace the fixed checkpoint record and exhaustive readiness artifact with:

- a versioned project profile;
- a compact goal map;
- one accepted current-slice record;
- evidence pointers and immutable identities.

The human interacts through the interview and short playback. The detailed agent-facing contract supports dispatch and recovery without adding material assumptions.

### File changes

#### `skills/pursue-goal/SKILL.md`

Rewrite the main skill as the Coordinator protocol:

- define material decisions and human synchronization triggers;
- identify the current frontier of uncertainty and select a matching specialist skill or agent;
- distinguish adaptive discovery from production delivery;
- bound discovery by a question, required evidence, and cost or scope when necessary;
- define the project profile, goal map, slice acceptance, and identity requirements;
- dispatch Implementer, Cleaner, Verifier, Product Validator, and Root-cause Diagnostician roles;
- route findings by authority;
- authorize focused local commit after successful final validation;
- preserve separate policy for push, pull request publication, merge, and deployment.

#### `skills/pursue-goal/references/foundation-session.md`

Replace the mandatory foundation ceremony with initial Coordinator synchronization:

- inspect first;
- run Matt-style frontier rounds for material decisions and finish with one short playback;
- dispatch research, spikes, prototypes, architecture design, or other specialists when evidence is insufficient for a decision;
- define the initial project profile and goal map;
- accept the first vertical slice when it is judgeable;
- proceed without a forced fresh-session stop when the harness can dispatch the required independent contexts.

#### `skills/pursue-goal/references/delivery-checkpoint.md`

Replace or rename it as a vertical-slice lifecycle reference:

```text
Synchronize and accept
→ Implement
→ Clean and harden
→ Verify independently
→ Validate through the product
→ Diagnose repeated failure when required
→ Commit and adapt
```

#### `skills/pursue-goal/references/definition-checkpoint.md`

Retire it as a default phase boundary. Preserve useful investigation procedures in a material-decision synchronization or risk-reduction reference.

Replace its fixed sequence with an adaptive-discovery reference that routes by the open question. It should define specialist dispatch inputs, evidence and verdict outputs, iteration, disposal by default, and explicit promotion through production delivery.

#### `skills/pursue-goal/references/closure-checkpoint.md`

Make closure optional promotion and cleanup guidance. Remove result acceptance as a prerequisite for commit. Any behavior-affecting cleanup belongs to a validated candidate; coordination-only bookkeeping must preserve the validated delivery surface exactly.

#### New focused references

Add references for:

- adaptive discovery and specialist skill routing;
- project profile, gate policy, and evidence identity;
- role dispatch and independent judgment;
- candidate lineage and repeated-failure routing.

Keep these details behind pointers so the Coordinator skill remains legible.

## `cleaner`

`skills/cleaner/SKILL.md` is the write-capable role that owns post-implementation repair and strategic cleanup. The remaining delivery-loop migrations must route to it under the contract below.

### Inputs

- accepted slice and goal-map identity;
- project-profile identity;
- base revision and current candidate identity;
- candidate diff and existing proof;
- applicable gate definitions;
- Verifier or Product Validator findings when repairing.

### Responsibilities

- repair local correctness and error-handling defects;
- improve tests without coupling them to implementation detail;
- remove accidental complexity, duplication, and dead debris;
- improve module depth, information hiding, locality, and dependency direction;
- run affected build, test, complexity, CRAP, mutation, architecture, and regression gates;
- record gate status and evidence;
- freeze the next immutable pre-commit candidate identity.

### Authority

The Cleaner may edit code and tests inside accepted material decisions. It may not change user-visible behavior, scope, sensitive policy, public interfaces, or expensive-to-reverse architecture.

### Outputs

- **Candidate ready for Verifier** only when every required gate is `Pass` or has a valid `Pre-authorized disposition`;
- **Resynchronize to Coordinator** with the material decision and evidence; or
- **Blocked to owner** with the owner and exact unblock condition.

These outcomes are mutually exclusive. A `Resynchronize` or `Blocked` gate never dispatches a candidate to the Verifier.

The completion criterion is a repaired, hardened, identifiable candidate with satisfied gates—not a cleanup report.

## `implementation-review` as Verifier

Keep the `implementation-review` package identifier for compatibility, but present its public responsibility as **Verifier**.

### Preserve

- independent read-only judgment;
- a context initially fresh from implementation and cleaning;
- deriving the changed surface from repository evidence;
- tracing accepted obligations to primary code and test evidence;
- strategic design review through `strategic-programming`;
- stable finding IDs, evidence, consequence, and required outcome;
- separation from product-level validation.

### Change

Replace the current verdicts:

- `Pass`;
- `Request changes`;
- `Inconclusive`.

With Factory outcomes:

- `Pass` → Product Validator;
- `Repair` → Cleaner automatically;
- `Resynchronize` → Coordinator and human interview;
- `Inconclusive` → Coordinator with a named owner and unblock condition.

`Request changes` describes a report workflow. `Repair` describes an executable transition.

Require every dispatch and result to name:

- goal-map and accepted-slice identity;
- project-profile identity;
- base revision;
- immutable candidate identity;
- gate evidence and claimed dispositions.

The Verifier inspects independently captured expensive-gate evidence and reruns a gate only when the project profile requires independent execution or the evidence is insufficient.

A bounded repair may return to the same independent Verifier context with the stable finding ledger and new candidate identity. Use a fresh full Verifier context when the design or risk surface changes materially, the candidate chain is unreliable, or the prior Verifier is unavailable.

Verification happens before Product Validation and the focused local commit, not before a second human result-acceptance gate.

## `use-case-qa` as Product Validator

Keep the `use-case-qa` package identifier and installation command. Change its public heading and description to **Product Validator**.

### Preserve

- independent product interaction;
- accepted journeys defined by actor, starting state, action, required observation, and forbidden observation;
- the narrowest driver that preserves material user semantics;
- direct reproducible evidence;
- first-failure and earliest-divergence preservation;
- separation of accepted, regression, and exploratory journeys;
- no production-code repair.

### Simplify language

Use Factory terms consistently:

- “real product interface” instead of “observable product seam”;
- “accepted journey” instead of “baseline case”;
- “observable result” or “judgment criterion” instead of “oracle”;
- “validation method” instead of “method contract.”

The evidence table remains useful, but it should contain only what another validator needs to repeat and judge the journey.

### Add Factory inputs and routing

Require:

- goal-map and accepted-slice identity;
- project-profile identity;
- exact immutable candidate identity;
- a passing Verifier result for that candidate before final validation;
- accepted journeys;
- permitted driver, environment, identity, data, reset, and external-effect authority.

Before any journey action with an external effect, the Product Validator must verify an explicit scoped authorization or an approved non-production substitute that preserves the material semantics. If neither exists, it returns `Inconclusive` before acting and names the required grant or environment.

Return only:

- `Pass` → candidate becomes eligible for commit and adaptation;
- `Fail` → Coordinator routes evidence to Cleaner;
- `Inconclusive` → Coordinator routes the named unblock or material ambiguity.

Targeted diagnostic journeys may run during repairs. Before commit, the complete accepted journey set must run against the final immutable candidate.

If the harness cannot provide an independent Product Validator context, the role returns an explicit capability blocker rather than approximating independence through a prompt change.

## `strategic-programming`

Keep this skill as the shared design standard. Add a small Factory role-mapping section:

- Coordinator records accepted consequential decisions.
- Implementer creates initial vertical behavior and focused proof.
- Cleaner repairs local correctness and strategic design defects.
- Verifier judges the immutable candidate independently and read-only.
- Product Validator proves accepted journeys through the product.

Scope “design it twice” to consequential interfaces and expensive-to-reverse seams. Requiring alternatives for every internal interface would recreate design ceremony that Factory v0.1 rejects.

## Quality-gate ownership

| Gate or evidence | Implementer | Cleaner | Verifier | Product Validator |
| --- | --- | --- | --- | --- |
| Focused behavioral tests | Creates and runs | Repairs and reruns | Judges evidence | Does not use as product proof |
| Build, types, lint, static analysis | Tight loop | Final affected run | Inspects evidence | Not responsible |
| CRAP and complexity | May inspect | Owns targeted cleanup and status | Judges mechanism and disposition | Not responsible |
| Mutation testing | May run diagnostically | Owns profile-selected campaign | Judges evidence and surviving-mutant disposition | Not responsible |
| Architecture tests | Runs cheap rules | Fixes violations and runs affected rules | Judges evidence and implemented architecture | Not responsible |
| Product journeys | May run diagnostically | Uses failures for repair | Confirms readiness only | Owns final execution and verdict |

The Verifier does not rerun every expensive gate by default. The Product Validator does not infer product correctness from code or technical gates.

## Harness adapters and product drivers

Factory roles remain portable. A harness adapter declares whether it can provide:

- temporary role dispatch;
- context independence;
- scoped write permissions;
- immutable candidate snapshots;
- reproducible candidate materialization, including declared generated or untracked inputs and validation environment identity;
- command and evidence capture;
- product drivers;
- durable maps and profile identities;
- focused local commits;
- separate authorization for external effects.

Manuvra belongs at this adapter layer. Its action-plus-observation response can reduce round trips for browser, desktop, and CLI validation without appearing as a normative dependency in portable role skills.

## Recommended migration order

1. Accept Factory v0.1 as the source of truth.
2. Integrate the existing Cleaner contract with the migrated delivery roles.
3. Rewrite `implementation-review` as the Verifier role while keeping its identifier.
4. Rewrite `use-case-qa` as the Product Validator role while keeping its identifier.
5. Add Factory role mapping to `strategic-programming`.
6. Create the discovery primitives and the `architecture-design` composition needed by Coordinator routing.
7. Rewrite `pursue-goal` as the Coordinator and vertical-slice orchestrator using the completed role contracts.
8. Update the README terminology and installation descriptions.
9. Add harness-adapter conformance tests and one pilot project profile.
10. Exercise both loops on Manuvra: use a bounded technical spike or prototype for a real uncertainty, then deliver one small vertical slice from the resulting evidence.
11. Revise the protocol from observed discovery cost, delivery failures, and human interruptions.

This order prevents `pursue-goal` from dispatching roles whose contracts are still undefined and gives the first pilot an executable end-to-end path.
