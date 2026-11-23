# Area: proof

Judge whether the agent's evidence can be trusted. The agent wrote `.work/<phase>/proof.md`, with one claim per example of the spec and one per session its review drove.

- **Check every claim against the running product:** repeat its steps and compare what you see with what it says it observed. A claim is **false** when the product does not do what it says, or when its evidence does not show what it says happened.
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

`score` rates the evidence of the claims that are not false; the runner caps proof at 4 when the verifier confirms a false claim. Pick the highest anchor the whole proof meets, and the odd number between two anchors when it sits between them:
- **10:** every piece of evidence would have shown a failure, and every added test goes red when its behavior breaks.
- **8:** some evidence would look the same if the example were broken (`weak_evidence`), or an added test stays green when its behavior breaks.
- **6:** more than half the claims have weak evidence, or a claim is `not verified` or `unprovable`.
- **0:** no proof, or most claims are `not verified` or `unprovable`.
