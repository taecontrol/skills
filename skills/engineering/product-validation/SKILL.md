---
name: product-validation
description: "Independently validate an accepted product journey through a real product interface and return Pass, Fail, or Inconclusive with direct evidence. Use after integrated implementation or whenever observable product behavior must be proven; do not use for code review, technical gates, or repair."
---

# Product validation

Use the product to judge whether one accepted journey works. Treat the implementation, acceptance contract, and verification tooling as read-only. Mutate only authorized validation state, and never repair the product while judging it.

For final delivery acceptance, run in a fresh context independent from the agents that implemented and finished the code. Slice passes may use the method below within their existing roles; they do not claim independent final acceptance. Trust direct observations, not summaries or a green technical suite.

## Establish the judgment

Read the accepted journey from an implementation specification or another explicitly accepted source. Require enough information to name, when material:

- the commit, build, deployed revision, or exact working-tree state under judgment;
- the actor and starting state;
- the user action;
- the required observable result and any materially forbidden result;
- the environment, identity, and test data;
- isolation or reset and cleanup boundaries;
- the evidence that can distinguish success from failure.

Return `Inconclusive` with the exact missing decision when a material criterion is absent or ambiguous. Do not invent criteria, weaken them, or rewrite them around current behavior.

## Choose a faithful method

For a product whose accepted interface is an API or CLI, exercise that interface directly. For a graphical product, operate and observe the actual app in its target runtime with the first usable controller in this order, keeping the reason each earlier one was skipped:

1. **Manuvra.** Run `manuvra version`. When it succeeds, load the `manuvra` skill, confirm its run prerequisites, and run the journey as a Manuvra job.
2. **Native browser or computer use** provided by your harness.
3. **A disposable driver:** an uncommitted script using a browser library the project already depends on, run for this validation only, with its reason and fidelity limit recorded. Fixing its own selectors or waits is part of driving the journey; once making it run requires new fixtures, shared helpers, or other reusable harness work, return `Inconclusive` instead.

Inspect the project's launch and data procedures before driving the journey. An absent automated driver alone is not a blocker.

Existing required automated gates remain applicable, but do not replace direct UI and visual checks. Propose new E2E automation only after direct use establishes the behavior and a concrete repeated regression need justifies its maintenance cost. Building or extending reusable automation or a harness is separately scoped implementation work, outside validation.

Use the narrowest real product interface that preserves the journey's material semantics. Confirm that the instance, revision, configuration, identity, and data under control are the intended ones; run an existing health or `doctor` check when available. Reject ambiguous or stale targets.

The control tool reports actions and observations; the Product Validator derives the verdict from the accepted journey. Never convert a tool's aggregate success or `Pass` label into product acceptance without inspecting the evidence against the accepted criteria.

Source inspection and technical tests may orient or diagnose, but they cannot produce `Pass` for an unexecuted journey unless that technical surface is itself the accepted public product interface. Record any fidelity limit of a simulator or substitute.

If no available method can faithfully drive or observe the journey, return `Inconclusive` with the missing launch, control, observation, isolation, or evidence capability. Do not expand the validation into infrastructure work.

## Protect effects and state

Before an external, production, billable, destructive, privacy-sensitive, or otherwise consequential action, require scoped authority for the specific effect and environment or an accepted safe substitute that preserves the material semantics. Without it, do not act.

Use only validation state created for or explicitly assigned to this run. Never reset, clean, or reuse another run's or a user's mutable state by convention. Clean up only what this run owns, and preserve the evidence needed for the verdict. Keep secrets and unnecessary personal data out of evidence.

## Exercise the journey

Perform the accepted action through the chosen product surface and capture the action and resulting state, not merely a final screenshot or self-report. When persistence or an external side effect matters, confirm it through a separate faithful read-only observation seam.

Preserve the first failure and earliest observable divergence for the product revision under test. A retry may distinguish nondeterminism or an environment problem, but a later success on that revision does not erase the original result. After a repair or other revision change, retain the earlier failure as evidence about its original revision and calculate a new verdict from fresh applicable evidence. Do not add exploratory cases or adjacent regression requirements to the acceptance verdict unless the accepted contract includes them.

After a relevant change, identify which observations it invalidates and rerun those paths, including downstream behavior that depends on them. Reuse evidence whose applicability can be established directly; repeat the whole journey only when the change invalidates it as a whole.

## Return the verdict

Return exactly one overall verdict:

- `Pass`: every required observation occurred and no materially forbidden result occurred.
- `Fail`: a required result was absent, incorrect, unsafe, or contradicted by another faithful observation.
- `Inconclusive`: a missing criterion, authority, driver, environment, isolation boundary, or observable oracle prevents a defensible judgment.

Report the revision, journey, controller used and fidelity limits, environment and data, observations, evidence locations, cleanup result, and verdict. For a browser journey, include the Manuvra probe result and the concrete reason each earlier controller was skipped. For `Fail`, include the earliest divergence and shortest faithful reproduction. For `Inconclusive`, name the exact capability, decision, or authority that would unblock judgment.

Return findings to the caller without editing product code, the accepted contract, or verification tooling. Under `deliver`, a `Fail` becomes a bounded integrated repair by a Finisher; changed code invalidates affected evidence and must be validated again.

## Completion criteria

The accepted journey has a direct, reproducible verdict against the identified product revision, or an exact unblock condition explains why no honest verdict is possible. The implementation and acceptance contract remain unchanged, owned validation state is cleaned, and verdict evidence remains available without exposing sensitive data.
