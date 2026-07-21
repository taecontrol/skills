# Project QA Method Selection

Load this reference when a `use-case-qa` ticket must select, justify, or repair its execution method. The method is an adapter between accepted use cases and observable project behavior; it is not a global lifecycle choice.

## Selection criteria

Score candidate methods by the behavior they can actually prove:

1. **Fidelity:** does the method exercise the protocol, UI, integration, timing, identity, and persistence relevant to the case?
2. **Observability:** can it expose every required outcome and forbidden side effect?
3. **Repeatability:** can another validator run the same case and obtain comparable evidence?
4. **Isolation:** can state be reset or uniquely namespaced between cases?
5. **Safety:** can it avoid unauthorized production, privacy, billing, or destructive effects?
6. **Availability:** are the environment, credentials, fixtures, and driver usable now?
7. **Diagnostic value:** when a case fails, can the method reveal the earliest divergence?

Choose the narrowest method that satisfies the material criteria. Higher fidelity is not automatically better when it destroys repeatability or safety. Use more than one method only when no single method can observe the accepted outcomes.

## Common method families

### Domain simulator or protocol harness

Use when the project provides a faithful simulator for an external platform, device, event stream, conversation, payment flow, or other domain protocol.

Strengths:

- deterministic setup and reset;
- rich transcript or event evidence;
- safe failure and timing scenarios;
- fast repeated execution.

Required checks:

- identify which real protocol semantics it models and which it omits;
- verify the implementation under test uses the same production boundary or adapter expected by the case;
- avoid claiming real-platform integration from simulator-only evidence;
- capture simulator version, scenario inputs, transcript/events, and final state.

A collaboration-platform simulator, for example, may be the best driver for delayed replies, button actions, activity identity, and conversation ordering, while still requiring a smaller real-client check for rendering or platform authentication.

### Browser or desktop automation

Use when rendering, interaction, accessibility, client state, navigation, or cross-surface UI behavior is material.

Required checks:

- exact application build and browser/desktop version;
- stable selectors or accessibility roles rather than fragile coordinates where possible;
- seeded identities and data;
- screenshots plus state/network/log evidence when visual appearance alone is not the oracle;
- cleanup of sessions and generated data.

Do not use browser automation as ceremony when an API or simulator proves the accepted behavior more directly and UI integration is not in scope.

### API, CLI, or public service driver

Use when accepted behavior is observable through stable commands or service boundaries.

Required checks:

- exercise the public contract rather than an internal helper;
- record exact request/command, identity, environment, response, and persisted side effects;
- validate authorization and failure behavior, not only successful payloads;
- namespace or remove created data.

### Staging or real integration environment

Use when third-party behavior, deployment configuration, queues, persistence, authentication, or infrastructure integration cannot be represented faithfully elsewhere.

Required checks:

- explicit authorization for external, billable, destructive, or privacy-sensitive effects;
- environment identity and deployed revision;
- test accounts and non-production data where possible;
- rollback or cleanup plan;
- evidence that distinguishes application defects from environment instability.

Production is not the default QA environment. Use it only with explicit authority and a bounded, reversible method.

### Human-assisted procedure

Use when CAPTCHA, hardware, subjective perception, unavailable automation, or restricted credentials require a person.

Required checks:

- separate the steps the agent can execute from the observation or action only a human can provide;
- ask for the minimum human intervention at the exact blocked step;
- preserve evidence and resume deterministically afterward;
- mark outcomes `Unverified` when the required observation cannot be captured reliably.

### Static or component test evidence

Use only as supporting evidence for setup, diagnosis, or a technical sub-claim. Static inspection, unit tests, and component tests cannot by themselves pass a use case that requires runtime behavior through a wider seam.

## Method gaps

When no available method can observe a required outcome:

1. Mark the affected case `Unverified`.
2. State exactly which outcome lacks an oracle or driver.
3. Identify whether an existing method can be extended mechanically.
4. If a new simulator, harness, environment, credential, or substantial artifact is required, return a proposed Task, Deliverable, or technical-spike frontier to Mission.
5. Do not build that capability inside the Validation ticket unless its frozen scope already authorizes it.

## Method contract checklist

- [ ] System under test is pinned to a build, branch, deployment, or process.
- [ ] Driver exercises a seam capable of proving the accepted outcomes.
- [ ] Environment, identities, fixtures, and dependencies are named.
- [ ] Isolation and reset are executable and verified.
- [ ] Every case has observable pass/fail oracles.
- [ ] Evidence capture is reproducible and avoids unnecessary secrets or personal data.
- [ ] Fidelity limits and unverified integration layers are explicit.
- [ ] External effects and production access are authorized.
