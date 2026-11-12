# Second opinion

Get one whenever the work chooses between designs: `shape`'s options for the problem, a program design's choices, or a fix with more than one way to make it, including a fix for a blocker a review found. A choice with one obvious form skips it; say so in one line.

The agent that wrote a proposal is anchored on it. It treats what it built, and what the code already holds, as fixed, and solves each new problem by adding a piece. A reviewer that gets the author's reasoning and recommendation anchors too. A reviewer asked to find holes closes each hole with another piece. A second opinion knows the case and the options on the table, and forms its own judgment of them. Ask an agent that did not write the proposal, such as a new subagent. When the harness offers none, add an option yourself, answer the questions and write the count for every option, and say so in your report.

## Brief

Give the second opinion:

- the problem in plain words (the blocker, the failing example, or the outcome) and the evidence that it is real;
- the code it touches, and each constraint with its source, such as an accepted decision, an ADR, or a one-way door already crossed;
- each option on the table in one line, always including removing the cause and doing nothing, without the reasoning behind any option or which one the author prefers;
- this file's Questions and The count.

Ask it to add at least one option of its own, and to answer the questions and write the count for every option. When it finds a hole that only a new piece closes, it first answers questions 3 and 4 for the earlier choice that left the hole. When that choice was a default, it proposes undoing the choice. When it has a recorded reason, it proposes the piece, and undoing the choice as another option.

## Questions

1. **Cause.** What lets the problem exist? An option that removes the cause beats one that compensates for it further along the path.
2. **Premise.** Does the problem happen today, in the product as it runs, and does each premise of the problem as stated hold? Observe it in the code, the configuration, or a run. A problem that cannot happen needs no code, only the evidence.
3. **Existing mechanism.** Where does the system already model this concept? Extend that mechanism rather than add one beside it. Better still, let it absorb another mechanism that does the same job, and delete that one.
4. **Why each piece exists.** For each piece the option adds or works around, such as a column type, a check, a list, or a library default, find why it exists: a recorded decision, or a default nobody chose. Look in the history with `why`, the ADRs, and the code that depends on it. A default is a candidate for deletion, not a constraint. A recorded decision says who chose it: count the option that drops it too.
5. **Scope.** What code does the option touch that the problem does not need touched?
6. **Tests.** Which tests become unnecessary, and which single test per contract goes red without the option's change?

## The count

For each option, write its count: how many mechanisms express each concept it touches, the special cases and documented exceptions, what is deleted, what is added, the code touched beyond the problem, and the one-way doors crossed, such as a schema change, a contract that writes, or a security boundary. Lines are a diagnostic, not the count.

## Compare

The author compares the counts part by part. Where another option has fewer mechanisms, special cases, one-way doors, or code touched beyond the problem, or deletes more, the author adopts it or names the evidence for the difference. When options trade off, such as fewer mechanisms against one more one-way door, name the part that decides and its evidence. Where the option with the better count breaks an accepted decision, that difference goes to the human with both counts. Each one-way door the chosen option crosses goes to `architect` while shaping; during delivery, stop and ask the human, as `deliver` says.

Done when every option has its count, each difference is adopted, answered with evidence, or brought to the human because the better count breaks an accepted decision, and each one-way door the chosen option crosses has an `architect` result or the human's answer.
