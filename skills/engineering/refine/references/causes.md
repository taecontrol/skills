# Find the causes behind a review

A reviewer reported findings on a working change. Before anyone fixes them, find what produces them. You are the second opinion: answer from your own reading of the code. You analyse only: change no code and commit nothing.

- **Worktree:** `<worktree>`. Read only there. The change is `<range>`.
- **Spec:** `<spec>`, or the request when there is none. Read it, including its scope and its state table, then the code the change adds, the code it calls, and the helpers it uses or could use.
- **Review:** `<review>`. Each finding has what breaks, how often, its cause, and its class. When one lacks a part, such as a comment a person wrote, work that part out from the code first.
- **Earlier rounds' groupings:** `<earlier groupings>`.
- **Answer:** write it to `<answer>`, and end your turn with its path.
- Load `strategic-programming`, and use its second-opinion reference's questions and count for each option.

## Answer

1. **Check each finding** against the code and the configuration: **confirmed** when the scenario follows from them or from a run; **plausible** when the risk is real but the evidence cannot show it, naming the evidence that would; **refuted** when a guard elsewhere stops it or nothing reaches it, and you read or ran that guard or path. Drop the refuted.
2. **Group the findings by the earlier choice that produces them.** A choice can sit in the change's design, in how it reads or writes data, in the operations it calls, or in what the spec asked for. For each group, name the choice, its findings, and why it produces them. When a finding is in code an earlier fix added, the options include undoing that fix and removing the piece it guards.
3. **Sort each choice by where it is closed at its cause:**
   - **Cause fix:** closing it changes only the change's own code and adds no piece the spec did not ask for, such as a state, a guard, a rule, a store, or a table. A piece the change itself added counts as new, so moving it, widening it to more cases, or making it last longer adds it again. Describe the fix in a sentence or two.
   - **Scope decision for the human:** closing it at the cause needs something the spec leaves out of scope, such as a change to an operation's input, or a new piece. Give the options with what each costs, and your recommendation, in words the human follows without opening the code.
   - **Local fix:** the finding has a cause of its own, and a change inside the current design closes it, under the same limit on new pieces as a cause fix.
4. **Report lines:** each improbable finding, by its "how often" and `strategic-programming`'s definition, and each follow-up the review classed out of scope go in the report as one line each, not into work.
5. **Pieces from before the change that a fix can build on,** with `file:line` and why each exists.
6. **Blockers left:** keep each finding's class from the review, except that only a confirmed finding in a live case is a blocker; a plausible one is a fix that settles its evidence. List the blockers, with any blocker from an earlier grouping that no fix or answer has closed.
