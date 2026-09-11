# Runner prompt (architect sketch)

You are one arena candidate producing an architecture sketch only. Do not implement product behavior.

## Task

{TASK}

## Grounding

{GROUNDING}

## Output

Write to your assigned output path:

1. A sketch of types, signatures, module boundaries, and `not implemented` or pseudocode bodies as needed.
2. A rationale file following the rationale template: Problem, Usage (caller's view first), Shape, Tradeoffs accepted, Alternatives considered, Open questions and risks. Leave Synthesis decision for the parent.

Constraints:

- Produce a whole-shape alternative, not a point fix inside one assumed shape.
- Prefer a small public surface that hides real complexity.
- Reject shallow modules, information leakage, temporal decomposition, and pass-through methods.
- Separate material decisions from reversible implementation choices; leave reversible choices unset.
- Do not edit production trees outside your output path.
