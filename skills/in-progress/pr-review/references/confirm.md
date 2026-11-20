# Confirm a review and write its report

Reviewers reported suspects on a pull request. You are the second opinion: check each suspect against your own reading and runs, find the causes behind what holds, and write the report that the author and the human reviewer read. You analyse only: change nothing in the checkout, commit nothing, and post nothing.

- **Checkout:** `<checkout>`, at head `<head>`. The change is `<base>..<head>`.
- **Context:** `<context>`: the decisions the change records and where, the rules and gate results, the guarantees and their paths, the claims, and the map.
- **Reviews:** `<reviews>`.
- **Earlier report**, on a re-review: `<earlier report>`.
- **Ports:** `<ports>`. Stop every server you start before you finish.
- **Report:** write it in `<language>` to `<report>`, and end your turn with its path. Code identifiers, paths, and the opening line stay as they are.
- Load `strategic-programming` and `writing-for-people`.

## 1. Check each suspect

Each suspect becomes:

- **confirmed** when the scenario follows from the code and configuration, or from a run;
- **plausible** when the risk is real but the evidence cannot show it, naming the evidence that would settle it;
- **refuted** when a guard elsewhere stops it, nothing reaches it, or the context records the choice as decided and nothing contradicts what that decision assumes. Read or run the guard, trace the path, or quote the decision.

Settle each condition where it is decided: a suspect that reads "if the load balancer admits other callers" is settled by reading the infrastructure configuration or the deployment manifest. Run code when reading cannot settle a suspect. Record whether each confirmed one shows **on the head**, or **only after an edit** you made, such as a deleted guard, which proves that no test catches it rather than that it breaks.

## 2. Find the causes

Group the confirmed and plausible suspects by the choice in the change that produces them. A cause with several symptoms is one concern that lists each symptom. When the symptoms vary around a case that neither the spec nor the description decided, such as what a screen shows when cached data and a fresh read disagree, the cause is that missing decision, and it goes under Questions with its symptoms. For each cause, search the repository for every other site of the same mechanism.

Then decide, from each cause's **how often** and who must act, whether its case is live or improbable, as `strategic-programming` defines them.

## 3. Sort

Put each cause in the first section that fits:

- **Concerns:** a cause on the head, in scope, in a live case, that is wrong whatever the author meant. Order them by consequence for the people who use the product, worst first. When a concern breaks a guarantee, a claim, or a rule the project makes mandatory, loses or corrupts data, crosses a security or tenant boundary, stalls a shared process, or fails a gate, its first sentence says so. Mark a plausible one `(plausible)` with the evidence that would settle it, one that predates the change `pre-existing`, and one a ticket tracks with the ticket.
- **Questions:** a choice that would be fine had the author meant it, with no decision recorded: a behavior that differs from the base or from a policy its peers apply, a design that departs from the system's, a piece nothing reads, or a case the spec never decided.
- **Untested:** a behavior no test asserts, or that an edit changes while every test stays green, stated as what can then happen in the product.
- **Checked:** what was checked, how, and what it showed, one line each: decisions taken as recorded, suspects refuted for a reason a reader would doubt, and each improbable case, as `strategic-programming` defines it, with its line.

On a re-review, also report each earlier item as closed at every site, closed at some (naming the sites left), open, or answered.

## 4. Write the report

Open with the literal line `This is a preliminary automated review.` Then one line with the pull request, the head SHA, and each gate with its result. Then `### Concerns`, `### Questions`, `### Untested`, `### Checked`, and `### Not reviewed`, which names what nobody read or ran and why. Leave out an empty section.

Each concern is one bullet:

- **What happens, stated as its consequence.** [`short/path.ts:69`](repo/relative/path.ts#L69). Then how it happens, in the words of someone who uses the product or calls the code; how often; the cause; the proof a reader can repeat, such as steps, a command and its output, or a screenshot; the other sites; and what it contradicts. Its symptoms go in sub-bullets when there are several.

A question states what was seen and ends with the question. Every sentence is something you or a reviewer read, ran, or saw, or a question. State each cause and leave the fix to the author, who knows the decisions behind the code.
