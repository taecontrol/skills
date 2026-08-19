---
name: wizard
description: "Guide a human through a truly required, authorized manual operation with staged evidence, secure secret boundaries, and reversible progress where possible."
license: MIT
---

# Wizard

Use this operations adapter only when a required step cannot be completed by available agent tools and genuinely requires a human: a third-party dashboard action, credential entry, physical action, identity-bound approval, or separately authorized external operation. It guides the human through that operation; it does not grant authority, perform an unapproved effect, or become a discovery phase.

## Establish necessity and authority

Before asking the human to act, inspect available repository state, configuration, prior evidence, and tool capabilities. State:

- the required outcome and the exact human-only step;
- why available tools cannot perform it;
- the current state, target state, and dependencies;
- the authorization already granted, including actor, effect, environment, scope, and expiry when applicable; and
- the observable confirmation that proves the step succeeded.

If the operation lacks a scoped authorization, stop before the effect and return the exact grant required. A wizard can explain an authorized action but can never create, broaden, infer, or renew that authorization. Before an irreversible, destructive, paid, production, or access-changing action, display its consequence and require the authorized human to confirm that specific action immediately before it occurs.

## Protect secrets and sensitive data

Never ask the human to paste a secret into chat, a command line, a generated artifact, source control, logs, screenshots, or a generic form. Never print, echo, retain, transmit, or infer a secret.

Direct the human to enter a secret only into the named approved secure destination, such as the provider's secret field, an approved local secret manager, or an existing project-approved secure store. Refer to secret names and presence checks only. Treat values, recovery codes, private keys, tokens, and personally sensitive data as secret unless the project profile explicitly classifies them otherwise.

If a proposed procedure would expose a secret or the approved destination is unknown, stop and return a security blocker with the safe destination or policy decision needed.

## Guide the operation

1. Present a numbered, dependency-ordered stage list. For each stage, name the actor, starting state, action, authorized effect if any, expected observation, and rollback or recovery path when one exists.
2. Give only current, evidenced instructions. If a dashboard path, command, permission, or result is unknown, inspect authoritative documentation or ask the human for that fact; do not invent UI steps.
3. Execute one stage at a time. Ask the human to report a non-sensitive observable confirmation, such as a status label, resource identifier safe to share, or a redacted success result.
4. Record each stage as `Complete`, `Blocked`, `Failed`, or `Skipped by authorized decision`, with its non-sensitive evidence. On a failure, preserve the first observation and route to the owner or recovery step; do not silently continue.
5. Stop after the required human-only steps are complete. Keep the wizard ephemeral unless the human requests a maintained, repeatable operations path. A maintained path must use the repository convention and retain the same authority and secret boundaries.

## Return record

Return a compact non-sensitive operations handoff:

```text
Operation: <outcome; current state; target state>
Effect grant: operator role; scoped effect; environment; evidence or missing grant
Stages: <number; actor; action; expected observation; Complete | Blocked | Failed | Skipped by authorized decision; evidence> …
Secret boundary: <secret names/destinations only; no values>
Outcome and route: <confirmed result | owner and exact unblock or recovery condition>
```

## Completion criteria

Wizard assistance is complete only when all of the following are true:

- A required human-only action, the unavailable agent capability, current and target state, and observable success condition are explicit.
- Every effectful stage has a pre-existing scoped authorization, or the wizard stopped before the effect with the exact grant required.
- The procedure never received, displayed, stored, logged, generated, or transmitted secret values; it identified only approved secure destinations and non-sensitive presence checks.
- Each stage has an actor, action, expected observation, and recorded non-sensitive disposition; irreversible, destructive, paid, production, or access-changing actions have immediate authorized-human confirmation.
- Unknown dashboard paths, commands, permissions, and outcomes were verified or surfaced as blockers rather than invented.
- The return record provides reproducible non-sensitive evidence and an authority-correct next route, without claiming authority or completion of unrelated delivery work.
- Any retained repeatable operations artifact was explicitly requested and follows the same secret and authorization boundaries; otherwise the wizard remains ephemeral.

## Provenance

- Canonical package: `wizard`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/engineering/wizard/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates and restructures the upstream wizard procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: material portability and authorization adaptation.
- Taecontrol changes: makes Wizard an operations adapter selected only for truly human-required work; requires scoped pre-existing authority for each effect; replaces secret capture and generated secret-writing behavior with secure-destination-only guidance; adds stage evidence and recovery routing; and keeps maintained operation paths opt-in and portable.
