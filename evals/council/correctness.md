# Area: correctness

Find the bugs: places where the running product does not do what the spec says, or does what it says must never happen. Hunt like someone who expects the feature to be broken.

- **Drive the product** through the interfaces a person or agent uses, at the sizes the spec names. Go past the happy path: edges, failures, reloads, back and forward.
- **Use it in sessions.** A person arrives at each example from somewhere, carries on to something else, and keeps the state every step leaves behind, in this feature and in what it shares with the rest of the product. A build can pass every example from a fresh start and still break there.
- **Reproduce each bug** from a clean start before you report it.
- **Severity:** `critical` when the product crashes, loses data, or shows a wrong figure as if it were right; `major` when an example fails; `minor` for everything else that contradicts the spec.

**Done** when every example in the spec has been tried against the running product, and each bug you report reproduces from its steps.

```json
{
  "bugs": [
    { "title": "", "severity": "critical|major|minor", "example": "E3", "steps": [""], "observed": "", "expected": "", "evidence": "path or excerpt" }
  ],
  "examples_tried": ["E1"],
  "unproven": [""],
  "score": 0,
  "score_reason": ""
}
```

`score` runs from 0 to 10: 10 when you found no bug, minus what the bugs cost a user of this product.
