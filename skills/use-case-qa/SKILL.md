---
name: use-case-qa
description: "Use when validating accepted product use cases against a completed implementation through a project-appropriate simulator, browser, API, CLI, staging environment, or human-assisted QA method, especially inside a Mission Validation ticket."
license: MIT
---

# Use-Case QA

Use-Case QA independently exercises accepted behavior through observable product seams. It answers whether the implemented system satisfies the use cases that shaped the solution, not merely whether the code matches its technical design.

Inside Mission, this skill runs in a separate `Validation / use-case-qa` ticket after the depended-on implementation is accepted. The ticket identifies the accepted use-case source and the project-specific QA method. The validator returns evidence and a verdict; Mission Control owns acceptance.

## Preserve the design-to-QA thread

For behavior-changing work, use cases are created and accepted while product and technical behavior are designed. Early cases make ambiguous intent concrete, pressure-test the proposed solution, and later become stable QA inputs. Genuinely non-behavioral work does not require artificial use cases or a ceremonial QA ticket.

Treat the accepted use-case source as the behavioral baseline. Each case needs enough information to execute and judge:

- stable case ID and user intent;
- actors, permissions, state, and data preconditions;
- trigger or action;
- observable expected outcomes;
- forbidden outcomes or safety boundaries when relevant;
- accepted variants, ambiguity, or timing constraints.

Do not rewrite expected outcomes to match the implementation. If a case is ambiguous or materially incomplete, mark it `Unverified` and return the missing decision to Mission. New exploratory scenarios may be added as findings, but label them separately from the accepted baseline.

Completion criterion: every planned QA case traces to accepted design behavior or is explicitly labeled exploratory.

## Boundary with implementation review

Keep the controls distinct:

- `implementation-review` checks whether code, tests, concepts, and invariants faithfully implement the approved design. It runs inside the active Execution ticket.
- `use-case-qa` operates the completed system through a project-appropriate seam and judges observable outcomes. It runs in a separate Validation ticket.

Source inspection can help diagnose a failed case, but static inspection cannot turn an unexecuted use case into `Pass`. Likewise, a passing use-case run does not by itself prove that internal design quality is sound.

Completion criterion: the QA verdict is based on observed behavior, not inferred from implementation-review evidence.

## 1. Load the validation contract

Read the active Validation ticket, accepted use cases, relevant product/design decisions, depended-on implementation result, repository instructions, and environment constraints.

Confirm:

- ticket is `Active` and `Kind: Validation`;
- the use-case baseline and implementation under test are identified;
- scope and non-goals are frozen;
- destructive, external, billable, privacy-sensitive, or production effects are explicitly authorized;
- evidence expectations and required environments are clear.

If the use-case source is missing, the implementation target is ambiguous, or a required side effect lacks authorization, stop with `Inconclusive` or `Blocked` rather than inventing scope.

Completion criterion: the validator can name exactly what behavior, implementation, environment, and authority are under test.

## 2. Select the project QA method

QA method is project-specific. It is the adapter between accepted use cases and observable project behavior, not a global lifecycle choice. Inspect the repository and accepted project documentation for existing simulators, harnesses, fixtures, browser/desktop drivers, API or CLI seams, staging environments, seeded data, observability, and reset procedures.

Evaluate candidate methods by what they can actually prove:

1. **Fidelity:** does the method exercise the protocol, UI, integration, timing, identity, and persistence relevant to the case?
2. **Observability:** can it expose every required outcome and forbidden side effect?
3. **Repeatability:** can another validator run the same case and obtain comparable evidence?
4. **Isolation:** can state be reset or uniquely namespaced between cases?
5. **Safety:** can it avoid unauthorized production, privacy, billing, or destructive effects?
6. **Availability:** are the environment, credentials, fixtures, and driver usable now?
7. **Diagnostic value:** can it reveal the earliest divergence when a case fails?
8. **Cost:** what setup, build, install, startup, and per-invocation work does the method require?

Choose the narrowest available method that satisfies the material criteria. Higher fidelity is not automatically better when it sacrifices repeatability, isolation, or safety. Use more than one method only when no single method can observe every accepted outcome.

### Domain simulator or protocol harness

Use an existing simulator when it faithfully models the external platform, device, event stream, conversation, payment flow, or other domain protocol relevant to the cases. Simulators often provide deterministic reset, rich transcripts, safe failure scenarios, and fast repeated execution.

Identify which production semantics the simulator models and omits. Verify that it exercises the same boundary or adapter required by the case, capture its version, inputs, events, and final state, and never claim real-platform integration from simulator-only evidence. A collaboration-platform simulator may prove delayed replies, actions, identity, and ordering while still requiring a smaller real-client check for rendering or platform authentication.

### Browser or desktop automation

Use browser or desktop automation when rendering, interaction, accessibility, client state, navigation, or cross-surface behavior is material. Record the application build and client version, use stable selectors or accessibility roles where possible, seed identities and data, capture state or network evidence alongside screenshots, and clean up sessions and generated data.

Do not use UI automation as ceremony when an API or simulator proves the accepted behavior more directly and UI integration is outside scope.

### API, CLI, or public service driver

Use an API, CLI, or service driver when behavior is observable through a stable public boundary. Record the exact request or command, identity, environment, response, and persisted effects. Exercise authorization and failure behavior as well as successful payloads, and namespace or remove created data.

### Staging or real integration environment

Use staging or a real integration environment when third-party behavior, deployment configuration, queues, persistence, authentication, or infrastructure cannot be represented faithfully elsewhere. Pin the environment and deployed revision, use test accounts and non-production data where possible, define cleanup or rollback, and distinguish application defects from environment instability.

Production is not the default QA environment. External, billable, destructive, privacy-sensitive, or production effects require explicit authorization and a bounded reversible method.

### Human-assisted procedure

Use human assistance when CAPTCHA, hardware, subjective perception, restricted credentials, or unavailable automation blocks an agent-only method. Separate agent-executable steps from the exact human observation or action required, ask for the minimum intervention at that point, preserve evidence, and resume deterministically. Mark outcomes `Unverified` when the required observation cannot be captured reliably.

### Static or component evidence

Use static inspection, unit tests, and component tests only for setup, diagnosis, or a technical sub-claim. They cannot by themselves pass a use case that requires runtime behavior through a wider seam.

Record one concise method contract in the ticket or approved QA artifact:

- **System under test:** exact build, branch, deployment, or process;
- **Driver:** simulator, browser, API client, CLI, harness, or human procedure;
- **Environment and data:** setup, identities, fixtures, credentials, and dependencies;
- **Isolation/reset:** how cases avoid contaminating one another;
- **Oracles:** observable signals that determine Pass or Fail;
- **Evidence capture:** transcripts, screenshots, logs, responses, state snapshots, or artifact paths;
- **Cost:** setup/build/install, startup, and estimated invocation count;
- **Limits:** behavior the method cannot faithfully validate.

When no available method can observe a required outcome:

1. Mark the affected case `Unverified`.
2. State which outcome lacks an oracle or driver.
3. Identify whether an existing method can be extended mechanically.
4. If a new simulator, harness, environment, credential, or substantial artifact is required, return a proposed Task, Deliverable, or technical-spike frontier to Mission.
5. Do not build that capability inside Validation unless its frozen scope already authorizes it.

Completion criterion: a fresh validator could repeat the method, every material obligation has an observable oracle or named gap, and the method's fidelity limits and invocation costs are explicit.

## 3. Prepare the case matrix

Before writing driver steps, create the coverage matrix:

| Accepted obligation | Narrowest faithful boundary / oracle owner | Evidence contribution | Native / end-to-end gap |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

Assign each verdict-bearing assertion to one oracle owner. A case may add evidence from several layers, but those layers contribute to the owner rather than duplicating or weakening its oracle. Use native or end-to-end execution only for the gaps that narrower faithful boundaries cannot prove.

Then create a compact execution matrix from the accepted baseline without duplicating the source's full prose. For each case record:

- case ID and source link;
- method or driver step;
- required setup;
- expected observable outcomes;
- evidence destination;
- initial status `Not run`.

Include accepted happy paths, failure paths, permissions, lifecycle transitions, delayed or repeated actions, and cross-surface effects only when they belong to the approved cases. Order cases to minimize irreversible state and make reset failures visible.

Use the cost estimate to consolidate cases into coherent journeys when they share expensive setup or startup. Preserve each case ID, oracle, verdict, and evidence destination independently; a shared journey is an execution optimization, not a combined verdict.

Before execution, verify that test identities and fixtures cannot affect real users or production data unless explicitly authorized. Redact secrets and unnecessary personal data from captured evidence.

Completion criterion: every accepted obligation has one faithful oracle owner, and every in-scope case has an executable row or named gap with independently judgeable evidence.

## 4. Execute accepted cases

Run each case through the selected public or domain-observable seam. Reset or re-seed state between cases as defined by the method contract. Capture evidence at the moment of observation rather than reconstructing it from memory.

When cleanup is material, verify `zero residual` with an inventory or audit that discovers remaining state independently of the identifiers used by the cleanup routine. Exercise at least one applicable failure path through cleanup/recovery. When the harness supports durable evidence, confirm terminal verdict and evidence persist after cleanup or process restart.

Classify each case:

- `Pass`: all required observable outcomes occurred and no forbidden outcome occurred.
- `Fail`: at least one required outcome was absent, incorrect, unsafe, or contradicted by another surface.
- `Blocked`: a named environmental or access condition prevented execution and has a concrete unblock condition.
- `Unverified`: the method ran but could not observe a required outcome, or the accepted case lacks a decisive oracle.

A retry may diagnose flakiness but must not erase the first failure. Record attempt count, state differences, and timing where nondeterminism matters. Do not weaken an oracle because the current implementation behaves differently.

Completion criterion: every planned case has a status, direct evidence, and reproducible observations or a precise blocker; applicable cleanup has an independent residual audit and failure-path evidence.

## 5. Probe regressions and exploratory risks

After the accepted matrix is complete, run only the regression and exploratory checks justified by the changed surface and remaining risk. Examples include adjacent permissions, retries, stale actions, malformed inputs, recovery, ordering, concurrency, accessibility, or cross-client consistency.

Keep these results separate:

- **Baseline cases** determine whether the accepted behavior passed.
- **Regression cases** protect nearby behavior already expected to remain stable.
- **Exploratory findings** reveal new risk or fog and cannot silently amend the accepted use cases.

If a new finding requires product policy, architecture, migration, security appetite, or a new persistent behavior, return it as a proposed frontier. Do not expand the QA ticket into redesign or implementation.

Completion criterion: nearby risk is checked proportionally and new discoveries remain distinguishable from baseline failures.

## 6. Diagnose without repairing

Preserve the first case verdict and evidence before diagnosis. For failed or unverified cases, gather enough read-only evidence to make the failure actionable:

- earliest observable divergence from the expected path;
- environment, identity, fixture, and state involved;
- relevant transcript, screenshot, response, log, or persisted state;
- whether the result is reproducible;
- likely layer or boundary, clearly labeled as hypothesis.

Group related cases into the smallest defensible cause sets by shared root cause or system boundary, while retaining each case verdict. Return that bounded grouping to Mission so one coherent repair package can address coupled failures.

The validator does not patch the system under test or rewrite use cases. For a purely mechanical evidence-infrastructure defect already authorized by the frozen boundary, record the defect for a separate repair owner and commit, independent review, and fresh validator session; otherwise return the missing capability to Mission. Diagnosis supports disposition without turning Validation into product Execution or open-ended Discovery.

Completion criterion: each failure retains its first verdict, can be reproduced or has an explicit evidence limitation, and belongs to a bounded cause/boundary group without product repair.

## 7. Return the Validation verdict

Return one verdict:

- `Pass`: every required baseline case passed; remaining advisories are honest and non-blocking.
- `Fail`: one or more required baseline cases failed or a forbidden outcome occurred.
- `Inconclusive`: blocked/unverified cases prevent a defensible overall judgment.

Use this shape:

```markdown
## Verdict
Pass | Fail | Inconclusive

## Method
- System under test:
- Driver and environment:
- Isolation/reset:
- Oracles:
- Cost estimate:
- Method limits:

## Obligation coverage
| Obligation | Boundary / oracle owner | Evidence contribution | Native / end-to-end gap |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

## Accepted use cases
| Case | Status | Observation | Evidence |
| --- | --- | --- | --- |
| <ID> | Pass / Fail / Blocked / Unverified | <concise result> | <path, URL, transcript, screenshot, log> |

## Regression checks
- <case and result>

## Exploratory findings
- <new risk or fog, clearly outside the accepted baseline>

## Failures and diagnosis
1. <cause/boundary group and affected case IDs>
   - First verdicts:
   - Earliest divergence:
   - Reproduction:
   - Evidence:
   - Likely layer (hypothesis):

## Cleanup audit
- Independent inventory:
- Failure path:
- Terminal evidence persistence:

## Not verified
- <cases or outcomes the method could not prove>

## Mission return
- Validation ticket impact:
- Proposed map delta:
- Recommended disposition:
```

Move the Validation ticket to `Review` with the report and evidence. A mechanical evidence-infrastructure defect may instead keep it `Active` or `Blocked` for the authorized separate-owner repair path, while preserving the initial run and verdict. Do not accept the implementation, close the mission, or start product fixes. Mission Control decides whether to accept QA, authorize rework, change the method, group a repair package, or stop.

Completion criterion: Mission Control can judge each accepted use case and the overall verdict without trusting a green suite summary.

## Common pitfalls

1. **Cases invented after the fact:** QA writes success criteria around the shipped behavior. Use the accepted design cases as the baseline.
2. **One universal harness:** the skill assumes browser automation, a simulator, or staging exists everywhere. Discover and declare the project method.
3. **Static pass:** code inspection or unit tests are used to mark an unexecuted product scenario `Pass`. Require observable execution.
4. **Simulator overclaim:** a simulator proves behavior it does not faithfully model. Record method limits and validate integration elsewhere when required.
5. **State leakage:** one case changes data that makes later cases pass or fail. Define reset and verify isolation.
6. **Flaky retry erasure:** only the successful retry is reported. Preserve every material attempt and classify instability.
7. **QA repair loop:** the validator edits code or redesigns behavior. Return evidence and let Mission authorize the next work package.
8. **Exploration rewrites scope:** newly discovered cases become retrospective acceptance requirements. Label them exploratory and return them to the map.
9. **Evidence without an oracle:** screenshots or logs exist but do not show why the case passed. Tie every artifact to an expected observable outcome.
## Completion checklist

- [ ] Active Validation ticket, accepted use-case source, implementation target, and authority boundaries were loaded.
- [ ] Every accepted obligation maps to its narrowest faithful boundary/oracle owner, evidence contribution, and native/end-to-end gap.
- [ ] QA method was discovered from project capabilities and recorded with limits, reset, oracles, cost, and evidence capture.
- [ ] Expensive setup and invocations were consolidated into coherent journeys without combining case IDs, verdicts, or evidence.
- [ ] Every in-scope accepted case is Pass, Fail, Blocked, or Unverified with direct evidence.
- [ ] Baseline, regression, and exploratory results remain separate.
- [ ] Applicable cleanup has an independent residual audit, failure-path coverage, and durable terminal evidence when supported.
- [ ] Failures preserve the first verdict and return bounded cause/boundary groups without modifying the system under test.
- [ ] Verdict is `Pass`, `Fail`, or `Inconclusive`.
- [ ] Validation returned to Review, or remained Active/Blocked only for the authorized evidence-infrastructure repair path; it did not accept the mission or activate product rework.
