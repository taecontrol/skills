# In Progress

Public beta skills under evaluation. They are not promoted in the top-level catalog and may change or disappear without warning.

Install a candidate explicitly when one exists:

```bash
npx skills@latest add taecontrol/skills --skill=<name>
```

## Candidates

- **[`bug-hunt`](./bug-hunt/SKILL.md)** — User-invoked. Hunt one area for bugs nobody has reported, keep only those a reproduction turns red, fix the easy ones as draft pull requests, and file the rest as issues an agent could pick up. Runs to the end on its own, so it suits a scheduled task.
