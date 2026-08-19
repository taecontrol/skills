# Foundation session

Run this branch only in a fresh conversation with no accepted foundation, or when the human requests material re-grounding. Confine the session to defining the goal and its initial living map.

## 1. Build the shared model

Investigate repository and external facts before asking the human. Separate facts, assumptions, and decisions. Interview the human one material decision at a time, always giving a recommendation and its principal consequence. Walk concrete actor journeys and system changes to expose hidden requirements and boundaries.

Resolve:

- outcome and final observable proof;
- actors, initial end-to-end journeys, and preserved behavior;
- initial requirements, boundaries, exclusions, and constraints;
- known unknowns and decisions reserved to the human; and
- material product, experience, technical, and validation risks.

Completion criterion: every item above is either resolved or recorded as an explicit unknown requiring a checkpoint; none remains an implicit assumption.

## 2. Build the initial living map

Create only checkpoints that reduce a real uncertainty or produce an independently useful result. Classify each as:

- **definition:** resolves what to build, how it should work, how it should be shaped, or how it will be proven through grilling, research, flows, prototypes, UI/UX, technical spikes, architecture, or validation design;
- **delivery:** implements or validates an accepted definition; or
- **closure:** proves the complete outcome and promotes durable truth.

For every checkpoint create one canonical map record containing its ID, type, question or requirement, dependencies and accepted evidence pointers, deliverable, boundaries, non-goals, observable `Done when`, human collaboration, contract-acceptance pointer, result-evidence pointer, and status. Order only what current knowledge supports. Treat additions, splits, removals, and reordering as normal when later evidence changes the route.

Completion criterion: every proposed checkpoint has a judgeable result and justified dependencies, while every known unknown has a checkpoint or an explicit human-decision disposition.

## 3. Accept, persist, commit, and stop

Read back the complete foundation and initial map as one coherent proposal. Wait for explicit human acceptance and incorporate requested changes until acceptance is unambiguous.

After acceptance, create or update the cockpit using the shape in `SKILL.md`. Persist the accepted foundation, map, evidence pointers, the first accepted checkpoint ID, and an exact next-session prompt. Treat that response as result acceptance and follow the automatic commit procedure in `SKILL.md`.

End the conversation after the cockpit and commit are verified. Product implementation, prototypes, spikes, and the first checkpoint belong to their own fresh sessions.

Completion criterion: the cockpit contains the explicitly accepted foundation and living map, names at most one accepted current checkpoint, includes its fresh-session prompt, the automatic commit procedure completes, and no checkpoint was executed during foundation work.
