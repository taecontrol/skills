# In Progress

Public beta skills under evaluation. They are not promoted in the top-level catalog and may change or disappear without warning.

Install a candidate explicitly when one exists:

```bash
npx skills@latest add taecontrol/skills --skill=<name>
```

## Candidates

- **[`bug-hunt`](./bug-hunt/SKILL.md)** — User-invoked. Hunt the project, or the area named, for bugs nobody has reported, keep only those a reproduction turns red, fix the easy ones in one draft pull request, and file the rest as issues an agent could pick up. Runs to the end on its own, so it suits a scheduled task.
- **[`editor`](./editor/SKILL.md)** — Model-invoked. Be the user's editor while they write an article or essay themselves, in Spanish or English: from the idea through structure, draft, and edits to the final version. It diagnoses and the writer writes; its own words reach the piece only as the correct form of a sentence the writer tried and could not fix. Separate reader agents, each reading the draft cold, find the holes, and a notebook of the writer's recurring patterns carries what each piece teaches into the next.
- **[`program-design`](./program-design/SKILL.md)** — Model-invoked. Agree the shape of the code inside the components before agents write it: where each thing lives, the key types and signatures, the important call paths in production and tests, what each module hides, and how errors travel. `shape` runs it when a change creates modules or types or spans several.
- **[`walkthrough`](./walkthrough/SKILL.md)** — Model-invoked. Render a design (a spec, an architecture brief, a program design, or a comparison of options) as a self-contained visual page built from its Markdown sources, so a human understands it before accepting it and can talk it through with others. Agents keep reading the Markdown.
