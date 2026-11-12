# In progress

Public beta skills under evaluation. They are not yet stable and may change or disappear without warning.

Install a candidate explicitly:

```bash
npx skills@latest add taecontrol/skills --skill=<name>
```

## Candidates

- **[`adapt`](./adapt/SKILL.md)**: user-invoked. Work one task through a process designed for it, as an alternative to `shape` and `deliver`. The agent stops whenever a decision is the human's, and uses the skill that owns each kind of work.
- **[`editor`](./editor/SKILL.md)**: be the user's editor for an article or essay they write themselves, in Spanish or English. It never writes the text for them.
- **[`pr-description`](./pr-description/SKILL.md)**: write a pull request's title and description for its reviewer, and check each claim before publishing.
- **[`pr-review`](./pr-review/SKILL.md)**: review a pull request as untrusted work before its human reviewer does, and report Blocking, Should fix, and Considered findings with `file:line`.
- **[`writing-for-people`](./writing-for-people/SKILL.md)**: decide what a reader needs before writing any text a person reads, and finish it with `unslop`.
