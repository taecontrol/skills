# In Progress

Public beta skills under evaluation. They are not promoted in the top-level catalog and may change or disappear without warning.

Install a candidate explicitly when one exists:

```bash
npx skills@latest add taecontrol/skills --skill=<name>
```

## Candidates

- **[`editor`](./editor/SKILL.md)** — Model-invoked. Be the user's editor while they write an article or essay themselves, in Spanish or English: from the idea through structure, draft, and edits to the final version. It diagnoses and the writer writes; its own words reach the piece only as the correct form of a sentence the writer tried and could not fix. Separate reader agents, each reading the draft cold, find the holes, and a notebook of the writer's recurring patterns carries what each piece teaches into the next.
- **[`pr-description`](./pr-description/SKILL.md)** — Model-invoked. Write or rewrite a pull request's title and description for a reviewer who knows the codebase but not how the change was made: why it exists, what changes, the decisions worth questioning, how to review it, and what was tested. Material from how the change was made becomes a statement about the code or goes to its own home. Before it is published, a fresh agent traces every claim to its source, flags anything the repository's visibility should not reveal, and reads it cold against the diff. `ship` uses it, and it works on its own for any pull request.
- **[`writing-for-people`](./writing-for-people/SKILL.md)** — Model-invoked. Decide what a person needs from a text before writing it: a message where the user must decide or act, or text other people read, such as an issue, ticket, pull request, wiki page, README, slide, UI copy, or a message to a colleague. It leads with what the reader came for, explains every ID and term where it appears, gives the reason behind each decision, keeps process material out, and ends with `unslop`. Before text leaves the conversation, a fresh agent reads it cold and reports every term it cannot resolve and every question it would ask. `wait-what`, `shape`, `deliver`, `grilling`, `walkthrough`, and `pr-description` write through it.
