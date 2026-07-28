---
name: agent-routing
description: Route delegated tasks through an optional project policy of ordered model profiles. Use when an orchestrator must select a model for a subagent dispatch or respond to a verified capability failure.
---

# Agent Routing

Use this skill only after deciding to delegate a bounded task.

## 1. Load the optional policy

Check `.agents/agent-routing/policy.yaml` from the project root.

When the file is absent, keep the current model/profile or the runtime default and end routing. Emit no routing record, create no policy, and add no fallback.

When the file exists, accept only this schema:

- top-level `tiers` mapping with only `T1`–`T4` keys; unused tiers may be empty;
- tier values are ordered lists of profiles;
- every profile has a non-empty `model`;
- a profile may also have `effort` and `mode` when the launcher needs them.

Treat unknown keys or invalid values as a policy error. The policy is one global preference order per tier; models from different providers may share a list. Use [`templates/routing-policy.yaml`](templates/routing-policy.yaml) only when the user asks to create project policy.

## 2. Select the route

Choose the minimum sufficient tier:

| Tier | Sufficient for |
| --- | --- |
| T1 | Clear, bounded work with deterministic verification. |
| T2 | Substantial explicit work or a verified T1 capability miss. |
| T3 | Ambiguous reasoning, difficult debugging, planning, or synthesis. |
| T4 | Critical architecture or security, weak verification, or final adjudication. |

Traverse that tier's list in order:

1. Discard a profile unless the active launch tool exposes its exact `model` and every declared optional parameter.
2. Select the first remaining profile.
3. If the launcher rejects it as unavailable, try the next profile in the same list.
4. If the list is exhausted, stop and report that the tier is unavailable.

Availability never changes the tier. Same-tier order expresses preference plus availability, not a quality ladder.

## 3. Verify before changing tier

Name an adequate verifier before dispatch. Keep the selected profile for bounded repairs.

Only a capability failure demonstrated by that verifier permits selection from the next tier. Correct a brief defect, implementation defect, tool failure, or context failure in its own dimension. A same-tier profile is not a quality or capability retry.

## 4. Record a selected route

When policy selects a launchable route, emit one line:

```text
T2 · model=preferred, effort=high · 2/3 · verifier=targeted tests · reason for change=entry 1 unavailable
```

The ordinal is the profile's 1-based position over that tier's list length; a retry that keeps the profile keeps its ordinal. Include `reason for change` only when availability fallback or verified capability escalation changed the route.
