---
name: writing-for-agents
description: "Write or revise artifacts that agents consume, including skills, agent rules, decision records, profiles, and handoff contracts."
license: MIT
---

# Writing for agents

Use this skill to format or draft artifacts that direct an agent: skills, repository agent rules, accepted-decision records, project profiles, dispatches, and handoff contracts. Do not use it as the default style guide for ordinary human-facing prose.

This skill supplies writing mechanics, not persistence or Factory authority. Only the Coordinator or an explicit delegate may update the goal map, accepted decisions, routing, or project profile. When either an authorized owner or durable destination is absent, produce an ephemeral draft or handoff; do not persist or apply it.

Write for repeatable process, not identical output. The document should tell an agent what to do, what to consult, and how to tell that the work is done.

## Build the document

1. Identify the artifact's reader, outcome, invocation condition, authorized owner, inputs, outputs, language, and durable location when one exists. Inspect available project facts before adding a new convention. If the authorized owner or durable destination is absent, label the result as an ephemeral draft or handoff.
2. Put the always-needed process first. State ordered actions in the order the agent must perform them. Keep a rule beside the decision or action it governs.
3. Use the information hierarchy:
   - **In-file steps** for actions needed on every invocation.
   - **In-file reference** for rules the agent may need while taking those actions.
   - **Disclosed reference** for branch-specific or bulky material loaded only when an explicit pointer condition applies.
4. Make every pointer name both its target and its trigger. Front-load a clear leading word, use one trigger for each genuinely distinct branch, and keep the target inside the same independently installable package when it is required for correctness. If no packaged local target exists, write the necessary rule in this artifact instead of creating a dependency on an absent or sibling file.
5. Co-locate a concept's definition, rules, and caveats. Split a document only when a distinct invocation branch or a sequence boundary materially reduces attention cost. Avoid splitting merely to make more files.
6. Give each procedural step a checkable completion criterion. Make it clear enough to distinguish done from not done, and demanding enough to cover the complete required surface.
7. Use compact leading words for recurring concepts when they genuinely steer behavior. State the positive target. Use a prohibition only for a necessary guardrail, paired with the desired behavior.
8. Prune. Keep one source of truth for each meaning. Do not cache facts that the environment can reveal cheaply. Remove stale, irrelevant, duplicated, or no-op instructions.
9. For a skill, use conservative frontmatter with at least `name` and a quoted `description`. The description is a context pointer: state the capability and the conditions that should invoke it. Keep support files within that skill directory, and ensure the skill can be followed after being installed alone.
10. Review the final artifact as its reader: trace each invocation path, authority boundary, pointer, and completion criterion. Confirm that every required path has enough local information to finish without guessing. Deliver it to its authorized owner; persist or apply it only when that owner has explicit authority and destination.

## Completion criteria

An agent-consumed artifact is complete only when all of the following are true:

- Its reader, outcome, invocation condition, authorized owner, inputs, outputs, and durable location or explicit ephemeral status are clear.
- It does not claim persistence or Factory authority. Goal-map, accepted-decision, routing, and project-profile updates are owned by the Coordinator or an explicit delegate.
- Every always-needed action is in the main process, and each action has a checkable completion criterion.
- Branch-specific material is either behind a pointer with an explicit trigger or intentionally kept local because every path needs it.
- Every required pointer resolves inside the independently installable package; no required behavior depends on a missing file or a sibling package.
- Definitions, rules, and caveats for each concept are co-located; each meaning has one authoritative source.
- The artifact contains no stale environment cache, duplicated rule, irrelevant exposition, or instruction that does not change agent behavior.
- A skill's frontmatter has a name and quoted description, and its description accurately selects the skill's intended invocation.

## Provenance

- Canonical package: `writing-for-agents`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/productivity/writing-for-agents/SKILL.md`.
- MIT disposition: MIT upstream; this existing adaptation is reconciled against the pinned baseline and incorporates substantial concepts and adapted wording. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: existing adaptation, reconciled against pinned baseline.
- Taecontrol changes: scopes the discipline to skills, agent rules, accepted-decision records, project profiles, dispatches, and handoffs; makes all mechanics self-contained; removes the missing `SKILL-MECHANICS.md` dependency and any cross-package dependency; adds portable independent-install requirements, authority and handoff inputs, local pointer rules, and completion checks.
