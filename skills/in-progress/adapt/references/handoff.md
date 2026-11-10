# Handoff

The implementer knows only the repository and your **brief**. The brief holds what you will verify and what the implementer cannot find in the repository. Leave everything else to it.

- The contract, in the same lines you will check, each with its proof.
- Each decision where two competent implementers would diverge and someone would feel the difference: an interface other code calls, a data shape, a text a person reads, where a rule lives.
- Pointers to the files to read, and to the existing code you judged worth following. An implementer copies what it finds nearby, so where the new code departs from a nearby pattern, name the pattern and give the form to use.
- The scope, which is what the contract needs. Anything else worth doing goes in its report as a suggestion.
- What to send back: what it ran, with the output; each departure from the brief, with its reason; and each **guess**, a choice the brief left open that someone could feel.
- When something the brief says about the code is false, it stops and reports it.

A failing test is the most exact form of a contract line. Where a wrong guess would cost the most, write that test yourself and hand it over red.

## Findings

Verify as the skill's step 4 says, and read the change for a nearby pattern it copied that the brief did not name. Name each finding's cause, and quote the brief's line for Ignored and Misled:

- **Guessed.** The brief was silent and the implementer chose wrong.
- **Ignored.** The brief said it and the result differs.
- **Misled.** The brief or the contract said it, and it was wrong.

Send the findings to the same implementer, then run every proof again. When a contract line is still broken after that, fix it yourself or stop, and tell the human which cause kept failing.

## Report

Add to the report: the implementer, the brief's size beside the change's size, the findings by cause, and the guesses that turned out right. They show whether the next brief needs more detail or less. Many wrong guesses mean the brief was too thin. A brief close to the change in size did the implementer's work.
