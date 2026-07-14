# Lean Mission Interface

Session-derived lesson: Mission can preserve strong safety invariants while exposing a much lighter interface to Mission Control. The protocol should feel like a cockpit, not a legal contract.

## Core principle

Use **strong internal invariants, lean human interface**.

Keep the guardrails that prevent agent drift:

- one material frontier at a time;
- no silent chaining between discovery, deliverables, execution, and validation;
- Mission Control owns material scope, risk, gates, and acceptance;
- evidence before closure;
- map reflects reality;
- scope/risk changes return to the map.

But do not surface every invariant as ceremony. Mission Control should usually see only:

```md
Where are we?
What changed?
What evidence exists?
What decision is needed?
What is the recommended next frontier?
```

## When to expand

Expand tickets, maps, and chat briefs only when the work has real material complexity:

- external side effects or irreversible actions;
- credentials, permissions, security, persistence, migration, recovery, or rollback risk;
- cross-session or cross-owner handoff;
- disputed product behavior or architectural trade-off;
- independent QA or acceptance evidence;
- repeated review findings or scope drift.

Otherwise keep the artifact index-card sized.

## Map guidance

The exploration map is a dashboard, not a ledger. Keep current orientation short. Move historical detail to tickets, decision logs, ADRs, or accepted product artifacts.

Default map shape:

```md
# Mission Map: <name>

Destination: <one sentence>
Gate: <current gate and blocker/evidence>
Current frontier: <one active/review/proposed material work package>
Decision needed: <one grouped question or none>
Recommended next: <one inactive next frontier>

## Known now
- <3-7 evidence-backed facts that matter now>

## Open fog
- <uncertainties still affecting navigation>

## Closed / accepted
- <ticket>: <one-line result and evidence pointer>
```

Do not keep reprinting full accepted decisions in the active map. Summarize them and link to the source artifact.

## Ticket guidance

Use index-card tickets by default:

```md
# Ticket NNN: <title>

Status:
Kind / Type:
Owner:
Depends on:

Objective:
Scope:
Non-goals:
Acceptance / evidence:

## Result
## Evidence
## Remaining uncertainty
## Map delta
```

Add `Why now`, `Method`, `Questions / decisions`, `Authorized outputs`, or detailed runbooks only when they change behavior, prevent real ambiguity, or support handoff/review.

## Route and gates

Prefer one recommended next frontier. Add a 2-5 item provisional route only when evidence genuinely supports that itinerary and it helps Mission Control orient.

Prefer a one-line gate statement:

```md
Gate: Mission Accepted blocked — independent QA active.
```

Use a gate table only for large or disputed missions.

## Review brief

Default review shape:

```md
**Outcome:** <plain result>
**Evidence:** <commands, artifacts, observations, links>
**Consequences:** <material behavior/risk decisions>
**Decision for Mission Control:** accept / revise / split / pause
**Recommended next:** <one inactive frontier>
```

Long artifacts may exist, but chat should lead with the decision brief, not a demand to read files.
