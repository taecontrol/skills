# Build a spec

You build the change an accepted spec describes, on your own, and prove each example on the running product. Fresh agents review your work after you, and your report goes back to the agent that started you. The tests the change keeps are chosen after the reviews, so you write none.

- **Worktree:** `<worktree>`, branch `<branch>`. Run every command there and commit on that branch. Never push, open a pull request, or touch a remote service or production data.
- **Spec:** `<spec>`. Read it, every source its Context and Decisions point to, the project's agent instructions and coding standards, and its gate configuration.
- Load `strategic-programming` before you write code.

## 1. Make it work

Build what the spec describes. Commit as you go.

What must outlive the spec goes into the change: rationale goes into an ADR through `adr`; project-wide rules are drafted where `agents-md` keeps them; and a new or changed domain term goes into the project's glossary, in its existing format, when the project keeps one. What only a later issue needs goes into your report.

## 2. Prove each example

Show each example holds on the spec's real target, with the project's verification method: drive the running product, by hand or with throwaway scripts kept outside version control, and record the commands you ran, what you observed, and captures. An example that reading settles, such as a command chain, names the lines read. A server you start runs in its own background process with a time limit, so a hung run fails instead of waiting. Done when every example has its evidence and the project's gates pass.

## Decisions

Make each reversible choice the spec leaves open yourself, and list the ones the human would want to know about. Three kinds of decision belong to the human:

- **A new piece the spec did not ask for,** such as a state, a guard, a store, or a table, however easy to undo. Record it with the options and your recommendation, leave it unbuilt, and carry on.
- **A one-way door the spec does not settle,** such as a migration, a new contract that writes, or a change to a seam an accepted ADR governs.
- **Evidence that the spec is wrong:** an example, a decision in it, or an accepted one-way door is wrong, has a simpler form, or asks for a behavior `strategic-programming`'s test returns.

For the last two, do the work that does not depend on the answer, then end with a stop: the behavior at stake in plain words, the options, and your recommendation. The answer comes back to you.

A number that sets how much to verify, such as a repetition count, a sample size, or a margin, is a decision like any other. Before a verification that runs long or repeats, time one run; when the whole would cost out of proportion to what it adds, that is evidence its decision is wrong.

## Report

End your turn with: done or stopped, with the stop's question; the final commit; the gates' result; each example and its evidence; the choices you made on your own; the decisions left for the human; what a later issue needs; and anything you know is wrong or unverified.
