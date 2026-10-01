---
name: feature-brief
description: "Shape a user problem into an accepted, temporary feature brief: evidence of need, triage, measurement, critical journeys, representative budgets, and rollout. Invoke when the user brings a problem to solve or opens a feature's product design phase, before prototyping, specifying, or implementing a solution."
---

# Feature brief

Turn a problem into one accepted **bet**: what we believe users need, how we will know, and what done means before anyone builds it. The brief exists to lower the costs that remain when building is cheap: building the wrong thing, building what cannot be undone, and validating under conditions kinder than production.

The brief owns only what no other skill owns: the problem and its evidence, triage, measurement, critical journeys, representative budgets, and rollout. For everything else it holds a pointer to another skill's accepted result.

## Authority

The human decides the problem framing, the solution direction, the measurement profile, the success metric, the decision threshold, and every cut. Storage, public contracts, migrations, and other costly-to-reverse technical shapes belong to `architect`: record the human's preference about one as a constraint for `architect`, not as a settled design. Find facts yourself: usage data, current performance, affected code, deployment configuration, where compute and data run. Challenge the evidence you are given and label each claim `observed`, `reported`, or `assumed`, including your own: a guarantee you recommend without evidence is `assumed`.

## Process

1. **Frame the problem.** Record who has the problem, what it costs them, how they cope today, and the evidence behind it. Settle with evidence everything evidence can settle before asking: inspect the repository, the deployment and where the affected system actually runs, and the available data; search the tracker for related and duplicate open issues; run `research` when an answer depends on outside facts, such as how reference products or the platform handle it. List the solution options, including an existing tool or package and doing nothing, before validating the one the issue prescribes. Ask the human only what remains theirs to decide. If no one can name who has the problem, return `Not ready`.
2. **Triage.** Rate three risks `high` or `low`: **value uncertainty** (do we know they need it?), **visible surface** (does it change what someone sees or does?), and **irreversibility** (data, public contracts, migrations, anything costly to undo). Implementation effort is not a criterion. All three low: write the **minimal brief**, only the sections marked *minimal* in the [document contract](#document-contract), and run only the steps that produce them. Any high: write the **full brief**. High irreversibility names the question that makes it high; that question goes to `architect` in step 4 before the brief is accepted.
3. **Set the measurement profile.** Read the project's profile from its agent instructions (`AGENTS.md` or equivalent). If none exists, agree one with the human:
   - **A, personal or no users:** the author is the user. Success is sustained real use; quality is enforced by lab budgets in CI. No scheduled review after release: a failure in real use becomes an issue. Rollout is revert and release again.
   - **B, few known users:** evidence comes from observing and asking named people; adoption is counted per person; rollout goes person by person. Traffic is too small for A/B tests.
   - **C, active users with traffic:** cohort analytics, field percentiles, guardrail metrics, and percentage rollouts; experiments only when traffic supports them.

   The profile states whether accessibility is required and at what level, and its **review policy**: whether outcomes get a scheduled review after release or a failure in real use opens an issue instead. Include accessibility budgets and journeys only when accessibility is required. When the project already records a profile, take these answers from it without asking again.
4. **Validate the riskiest assumptions.** Name the assumptions whose failure would sink the bet: value, usability, feasibility. Settle each with the cheapest faithful evidence from the skill that owns it, running the validation yourself and handing the human only the steps that need them, and record the question, who saw the result, what was observed, and a pointer to the result:
   - a screen, component, or flow → `prototype`, UI mode;
   - logic, state, data shape, API, or CLI behavior → `prototype`, Logic mode;
   - technical feasibility or performance → `spike`;
   - facts outside the repository → `research`;
   - a costly-to-reverse boundary → `architect`.

   Show validation artifacts to the people who have the problem when they are reachable; otherwise the human judges as their proxy and the brief says so. Internal behavior with no user surface has no user to show: its value rests on the problem evidence, and technical doubts still go to `spike`. Finish this step before writing journeys and budgets, so they describe the validated direction.
5. **Define done.** Write the critical journeys, one to four, each with actor, starting state, action, required results, and materially forbidden results, in the shape [product validation](../../engineering/product-validation/SKILL.md) consumes. Mark any journey that needs lasting regression protection. Then declare the **representative conditions** under which journeys and budgets hold: data volume, topology (where compute and data run, or an equivalent injected latency), concurrency when it matters, and the **real target**: the actual app, compiled output, and runtime mode, such as headless, that the feature meets in use, and the variety of input shapes it must handle. A hand-written fixture stands in for the real target only where a journey also runs against the real target before release; name that journey. Express each budget as a deterministic count a CI check can **ratchet**, with its current baseline and the repository revision where it was measured: sequential round trips or queries per operation, bundle bytes, render or instruction counts. Wall-clock and field percentiles are outcomes to observe, not CI gates. Name the check that enforces each budget, existing or to be created. For UI, point to the visual reference `prototype` selected.
6. **Plan measurement and rollout.** Derive the success metric from goal to signal to metric, and name where it is measured; its instrumentation is part of the feature's work. Set the **decision point** as an observable condition with the action it leads to: a threshold the journeys or budgets must meet before release, or a trigger in real use that reopens the work. Add a review date only when the profile's review policy schedules reviews. Describe the rollout: flag type (kill switch or ramp), stages, and how to turn it off. Where the profile already settles a section, such as rollout under profile A, write one line and spend the detail on what deviates from it, such as the order of an irreversible migration. The flag is implementation work; moving it through the stages happens after delivery, outside these skills. List what is explicitly out of scope.
7. **Accept.** Present the brief in the human's language. Open with the problem and the bet in one plain paragraph, then the evidence and its gaps, triage, validation results, journeys, budgets, measurement, rollout, and cuts. Put each decision you need as its own question, a few per turn. Incorporate accepted feedback, and when a decision changes, update every section that depends on it. Mark the brief `Accepted` only after explicit acceptance of the brief as presented: a short reply accepts what was discussed, not items the human never saw. When validation changes the direction, journeys, or scope after acceptance, present the change and ask again. Then complete the promotions due at acceptance and stop; `implementation-spec` consumes the brief next.

## Document contract

Keep one Markdown document at a path the user supplies, an established repository convention for local work artifacts, or `.work/features/<feature-slug>.md`, outside version control. Sections, in order:

- **Status:** `Draft` or `Accepted`. *minimal*
- **Triage:** the three ratings with one-line reasons. *minimal*
- **Problem and evidence:** who, cost, current coping, labeled evidence. *minimal*
- **Out of scope.**
- **Measurement profile:** pointer to the project's profile, or the agreed profile pending promotion.
- **Success metric:** metric and where it is measured.
- **Decision point:** threshold or trigger, and the action it leads to.
- **Assumptions and validation:** each risky assumption, the evidence gathered, and a pointer to its result.
- **Critical journeys.** *minimal: one*
- **Representative conditions and budgets:** conditions, each budget with its baseline and measured revision, and its enforcing check.
- **Visual acceptance:** pointer to the selected prototype reference, when there is UI.
- **Rollout:** flag type, stages, off switch.
- **References:** pointers to accepted `research`, `spike`, `architect`, and `adr` results.
- **Promotion:** the destinations below that apply, each marked at acceptance or through implementation. *minimal*

## Promotion

The brief is temporary. Durable knowledge moves to its owner; the rest is deleted with the brief.

At acceptance, before stopping:

- a newly agreed measurement profile, accessibility requirement, and review policy → the project's agent instructions, through `agents-md`;
- a scheduled review, only when the review policy schedules one → an issue in the team's tracker; draft it, and create it only with the human's confirmation.

Through implementation, as slice work that `implementation-spec` plans:

- success metric and where it is measured → the project's metrics registry, default `docs/product/metrics.md`, one entry per metric, delivered with the metric's instrumentation; thresholds, dates, and issue links stay out because they go stale;
- budgets → ratcheting CI checks;
- a pre-release decision threshold → a release gate in the final validation evidence;
- journeys marked for regression protection → automated acceptance tests; every critical journey is proven by product validation regardless;
- new domain terms → `domain-language`; costly technical rationale → `adr`.

The specification's retirement contract confirms these destinations and deletes the brief with the specification.

## Outcomes

- `Not ready`: name the missing evidence or human decision and what it blocks.
- `Agree-ready`: the brief is complete and awaiting acceptance.
- `Accepted`: the human accepted one brief at the reported path, the promotions due at acceptance are done or pending the human's confirmation, and implementation has not begun.

## Completion criteria

One local brief states a problem with labeled evidence, a triage result, and every section its triage requires. In a full brief, risky assumptions were settled by the owning skills or remain explicit, journeys and budgets describe the validated direction under declared representative conditions, and each budget names its enforcing check. Every durable item has a promotion destination, and the human has accepted the brief.
