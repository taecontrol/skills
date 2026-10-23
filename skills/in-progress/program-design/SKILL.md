---
name: program-design
description: "Settle the shape of the code inside the components before agents write it: where each thing lives, the key types and signatures, the important call paths in production and tests, what each module hides, and how errors travel. Use when shaping a change that creates modules or types or spans several modules, or when the human asks for a program design."
---

# Program design

Program design sits between architecture and implementation. Architecture decides how components talk to each other; program design decides the shape of the code inside them, so the human agrees on it before agents write it, instead of meeting it in the pull request. It leaves behaviour to the spec's examples, cross-component contracts and one-way doors to `architect`, build order to `deliver`, and function bodies to the code.

Write the document in the project's language. Talk to the human in theirs.

## Process

1. **Gate.** Use it when the change creates modules or types, spans several modules, or touches code the owner guards closely. When the change follows an existing pattern, is a bug fix with an agreed reproduction, or is mechanical, say so in one line and stop. Done when the change is in or out with its reason.
2. **Ground.** Read the code where the change lands: the modules, types, patterns, and test seams it will touch or copy, plus the spec and any `architect` brief. Every name in the design either exists in the code or is marked new. Done when each piece of the design points to the code it extends or the pattern it follows.
3. **Shape.** Load `strategic-programming`. Draw module boundaries around what each module hides: a decision that is hard or likely to change, so callers never carry it. Choose types that make the spec's bad states unrepresentable, the few signatures that carry those types, and the test seams, meaning what each test fakes and what runs real. Then walk the spec's most important examples through the shape as call paths, in production and in tests, to check the interactions; a call path reviews boundaries, it does not choose them. Decide where each failure is handled and what the caller gets. Done when every module named hides something its callers would otherwise know, and each important example has a call path through it.
4. **Write.** Fill [the template](templates/program-design.md) next to the spec, as `<spec name>.program-design.md`. Keep it selective: the smallest set of trees, types, signatures, and paths that shows the decisions. Done when each section either shows a decision or is dropped.
5. **Agree.** Settle the open choices with the human one decision per round: its options as side-by-side code sketches when real alternatives exist, and a recommendation. Move a question to its owner when it is not program design: behaviour goes back to the spec, a decision that crosses components or binds the whole codebase goes to `architect`, and a rule for future code goes to `coding-standards`. The human accepts the whole design on a `walkthrough` page: the spec's page when `shape` called this skill, its own page otherwise. Done when the human accepts it; mark it `Accepted` and point to it from the spec's Decisions.
