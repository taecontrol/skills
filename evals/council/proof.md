# Area: proof

Judge whether the agent's evidence can be trusted. The agent wrote `.work/<phase>/proof.md`, with one claim per example of the spec and one per session its review drove.

- **Check every claim against the running product:** repeat its steps and compare what you see with what it says it observed. A claim is **false** when the product does not do what it says.
- **Judge the evidence itself:** a capture or output that would look the same if the example were broken proves nothing, even when the claim happens to be true.
- **Judge the tests the change added, when it added any:** for each, would it go red if the behavior it names broke? Try it when you can, by breaking the behavior locally and restoring it.

**Done** when every claim in the proof has been checked, and every test the change added has been judged.

```json
{
  "claims": [
    { "example": "E3", "claimed": "works|does not work|not verified", "verdict": "true|false|unprovable", "why": "" }
  ],
  "weak_evidence": [{ "example": "", "why": "" }],
  "tests": [{ "test": "file:name", "goes_red_when_broken": "yes|no|untried", "why": "" }],
  "unproven": [""],
  "score": 0,
  "score_reason": ""
}
```

`score` runs from 0 to 10: 10 when every claim is true and its evidence would have shown a failure.
