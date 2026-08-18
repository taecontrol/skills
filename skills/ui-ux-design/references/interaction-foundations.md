# Interaction foundations

Use this reference for flows, navigation, information architecture, forms, system states, content, and UX review. It turns broad usability principles into judgeable product behavior.

## Start from the task

A page is not the unit of UX; the user's task is. Define the actor, starting context, goal, observable success, and failure or recovery conditions. Trace the full journey across entry, branches, input, review, submission, pending work, success, failure, cancellation, back, and re-entry.

Use Nielsen's ten heuristics as an expert-risk checklist:

1. visibility of system status;
2. match with users' language and mental models;
3. user control and freedom;
4. consistency and standards;
5. error prevention;
6. recognition rather than recall;
7. flexibility and efficiency;
8. aesthetic and minimalist design;
9. error recognition, diagnosis, and recovery;
10. help and documentation.

For each finding, name the task, heuristic, observed surface, likely user consequence, and required outcome. Do not call a heuristic pass a usability test.

## Information architecture

- Organize around user goals and recognizable language, not internal teams, database entities, or implementation names.
- Make the primary task and current location understandable without relying on memory.
- Use a sequence only when order helps completion. Do not force linear navigation onto exploratory or unordered work.
- Treat a new taxonomy as a hypothesis. Use card sorting to discover grouping and tree testing or realistic findability tasks to evaluate it when information architecture is material and uncertain.
- Preserve stable labels and destinations. Consistency helps users learn; uniformity is not required when contexts differ.

## Action hierarchy and control

- Give each view a clear primary outcome. Secondary and destructive actions must remain discoverable without competing visually.
- Keep back, cancel, edit, retry, and exit behavior consistent with platform expectations and the task state.
- Never let navigation silently submit, delete, cancel a remote operation, or discard recoverable work.
- High-impact or irreversible actions need a reviewable scope, explicit confirmation, truthful result, and recovery or receipt where feasible.
- Prefer recognition over recall: expose available actions, constraints, and recent context when needed instead of requiring memorized commands or hidden gestures.

## State model

Distinguish these states when applicable:

| State | Must answer |
| --- | --- |
| Loading or pending | Was the action received? What is happening? Can it be stopped or left safely? |
| Empty first use | What belongs here, why is it empty, and how can the user begin? |
| No results | What query or filter produced none, and how can it be broadened or cleared? |
| Invalid input | Which rule failed, where, and how can it be fixed without re-entering valid work? |
| Permission or eligibility | Why is access unavailable, what remains usable, and what legitimate route exists? |
| Offline | What is local, queued, unsent, failed, or safe to retry? |
| System failure | What failed, what happened to the user's work, and what can they do next? |
| Partial or unknown completion | Which parts are known, which are uncertain, and why blind retry may be unsafe? |
| Success | What completed, what changed, what happens next, and what reference or next action matters? |

Do not reuse a blank panel or generic “Something went wrong” message for these semantically different states.

## Forms and data entry

For every field, answer:

- Why is the value needed now?
- Is it required, and can the user reasonably know it?
- Which formats are accepted and normalized?
- Which label, help, unit, example, and error variants are needed?
- Is “I don't know,” “not applicable,” or deferred entry valid?
- Is the data sensitive, and are collection and retention proportionate?

Delete fields that have no current delivery purpose.

Defaults:

- Use visible, persistent labels.
- Group related controls semantically and visually.
- Ask one coherent question or tightly related group at a time; merge only when the relationship is clear and research supports it.
- Accept harmless formatting differences and normalize before rejecting.
- Preserve valid and invalid entries after validation failure.
- Explain the specific failed rule and repair, next to the field; provide a linked summary when several errors exist.
- Separate validation, eligibility, authorization, capacity, and service failures.
- Server validation remains authoritative. Client validation may improve UX but is not a security boundary.
- Default to validating when the user attempts to progress. Use earlier inline validation only after a meaningful completed value and when the benefit outweighs interruption, including for assistive-technology users.

## Interface content

- Write from the user's side of the screen with stable product vocabulary.
- Use specific action labels: `Save draft`, `Send application`, or `Delete account`, not context-free `Submit`, `OK`, or `Continue` when the outcome is ambiguous.
- Keep the action verb consistent through the control, pending state, and confirmation.
- Front-load important information; keep one idea per sentence when stakes or complexity are high.
- Explain errors without blame, apology filler, humor, technical codes, or vague system language.
- Use descriptive links that make sense out of context.
- Do not rely on color, position, icon, hover, placeholder, or animation as the only instruction.
- Tune tone to context. Routine success can be brief; destructive, financial, legal, or privacy-sensitive moments require precise consequences and no playful language.

## Research proportionality

Model inspection and expert review are implementation evidence, not user evidence.

- For a low-risk familiar pattern, document why heuristic review, accessibility checks, and running-flow verification are proportionate.
- For material uncertainty, test a realistic prototype or running build with representative users before broad release.
- Include people with relevant access needs, limited digital confidence, or constrained usage contexts when the product serves them.
- For stable high-volume journeys, use repeatable task benchmarks such as completion, time, abandonment or false completion, confidence, and support demand.
- Separate observation (“what happened”) from interpretation (“what this pattern may mean”) and from decision (“what changes or gets tested next”).

Completion criterion: each material UX claim is either supported by accepted product evidence, verified running behavior, representative-user evidence, or explicitly labeled as an assumption or heuristic risk.
