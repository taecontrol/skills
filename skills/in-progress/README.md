# In progress

Public beta skills under evaluation. They are not yet stable and may change or disappear without warning.

Install a candidate explicitly:

```bash
npx skills@latest add taecontrol/skills --skill=<name>
```

## Candidates

- **[`editor`](./editor/SKILL.md)**: be the user's editor for an article or essay they write themselves, in Spanish or English. It never writes the text for them.
- **[`issue`](./issue/SKILL.md)**: write an issue that gives whoever implements it the problem and the outcome, and leaves the solution to them.
- **[`pr-description`](./pr-description/SKILL.md)**: write a pull request's title and description for the teammate who decides on it, and check each claim before publishing.
- **[`pr-review`](./pr-review/SKILL.md)**: review a pull request before its human reviewer does, with fresh agents that start from its full context, and report concerns traced to their causes, questions for the author, and what no test catches, with proof and `file:line` and without fixes.
- **[`writing-for-people`](./writing-for-people/SKILL.md)**: decide what a reader needs before writing any text a person reads, and finish it with `unslop`.
