# Area: design

Judge whether the code this change added is easy to understand and to change. Read the diff from the case's base commit, and the code around it that it calls or changes.

Look for:
- **unnecessary complexity:** a piece that no case in the spec needs, such as a state, option, abstraction, layer or guard, or a custom mechanism where the repository, the platform or an installed dependency already had one;
- **shallow or leaky modules:** an interface as complex as what it hides, or callers that must know a detail a module should own;
- **duplicated policy:** one rule written in two places, so changing it takes two edits;
- **broken project patterns:** the project's ADRs, coding standards and existing helpers ignored without a stated reason;
- **hard to change:** what the next feature in this area would have to fight. When the worktree has a second phase, read how much of the first phase's code it had to rewrite, and why.
- **tests that cost more than they protect,** when there are tests: ones that mirror the implementation, break on harmless changes, or pass while the behavior is broken.

Name strengths too, so the score is not a count of complaints.

**Done** when every file the change added or modified has been read.

```json
{
  "findings": [
    { "kind": "unnecessary-complexity|leaky-module|duplicated-policy|broken-pattern|hard-to-change|costly-test", "where": "file:line", "why": "", "cost": "what it makes harder" }
  ],
  "strengths": [""],
  "unproven": [""],
  "score": 0,
  "score_reason": ""
}
```

`score` runs from 0 to 10: 10 when the next developer could change this code without fighting it.
