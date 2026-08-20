---
name: wizard
description: "Guide an authorized human through a required manual operation that available tools cannot perform."
---

# Wizard

## Process

1. Confirm that the step requires a human and cannot be completed with available tools. Identify the current state, target state, dependency, exact human action, and observable success condition.
2. Confirm a pre-existing authorization before any effect. It must name the authorized actor, effect, environment, scope, and expiry when relevant. If it is missing or too broad, stop and return the exact grant required.
3. Give the human one numbered stage at a time. Each stage states its starting state, action, expected observation, and recovery path when one exists. For irreversible, destructive, paid, production, or access-changing actions, show the consequence and obtain the authorized human's confirmation immediately before that action.
4. Ask only for non-sensitive confirmation, such as a status label, safe resource identifier, or redacted result. Record each stage as `Complete`, `Blocked`, `Failed`, or `Skipped by authorized decision`, with its non-sensitive evidence. Preserve the first failure observation and route it to recovery or its owner.
5. Keep secrets out of the wizard. Direct the human to enter a secret only in a named approved secure destination. Refer only to a secret name and a non-sensitive presence check. If the secure destination is unknown or the procedure would expose a secret, stop with the required security decision.
6. Verify unknown dashboard paths, commands, permissions, and outcomes from authoritative documentation or the human. Stop on an unknown fact instead of inventing instructions.
7. End after the required human steps. Create a maintained operations path only when the human explicitly requests one, using the repository convention and the same authorization and secret rules.

## Completion criteria

Wizard assistance is complete when:

- The human-only need, unavailable capability, states, authorized action, and success observation are explicit.
- Every effectful action has scoped prior authorization, or the wizard stopped before the action with the exact grant required.
- The wizard received no secrets and recorded no secret values in chat, commands, artifacts, source control, logs, or screenshots.
- Every stage has non-sensitive evidence and an outcome. High-consequence actions have immediate confirmation from the authorized human.
- Unknown facts are verified or returned as blockers.
- The final handoff records the confirmed result or the owner and exact recovery or unblock condition, without claiming authority over unrelated work.
