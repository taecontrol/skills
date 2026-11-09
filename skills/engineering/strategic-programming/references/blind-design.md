# Blind design

Use it whenever the work chooses between designs: an option in `shape`, a program design, or a fix with more than one way to make it, including a fix for a blocker a review found. A fix with one obvious form skips it.

The agent that wrote a proposal is anchored on it. It treats what it built, and what the code already holds, as fixed, and solves each new problem by adding a piece. An agent handed that proposal anchors on it too, and when it looks for holes, each hole it finds adds another piece. So an agent that has not seen the proposal, such as a new subagent, writes its own design first. When the harness offers no such agent, write your blind design before you reread the proposal, and say so.

## Brief

Give the blind designer the problem in plain words (the blocker, the failing example, or the outcome), the evidence that it is real, the code it touches, and each constraint with its source, such as an accepted decision, an ADR, or a one-way door already crossed. Point it at this file's Questions and The count. Leave out the proposal, its options, and the reasoning behind them.

## Questions

The blind designer answers these for its own design. The author answers them for the proposal before seeing the blind design.

1. **Cause.** What lets the problem exist? A design that removes the cause beats one that compensates for it further along the path.
2. **Premise.** Does the problem happen today, in the product as it runs, and does each premise of the problem as stated hold? Observe it in the code, the configuration, or a run. A problem that cannot happen needs no code, only the evidence.
3. **Existing mechanism.** Where does the system already model this concept? Extend that mechanism rather than add one beside it. Better still, let it absorb another mechanism that does the same job, and delete that one.
4. **Why each piece exists.** For each piece the design adds or works around, such as a column type, a check, a list, or a library default, find why it exists: a recorded decision, or a default nobody chose. Look in the history with `why`, the ADRs, and the code that depends on it. A default is a candidate for deletion, not a constraint.
5. **Scope.** What code does the design touch that the problem does not need touched?
6. **Tests.** Which tests become unnecessary, and which single test per contract goes red without the fix?

## The count

For each design, write its count: how many mechanisms express each concept it touches, the special cases and documented exceptions, what is deleted, what is added, the code touched beyond the problem, and the one-way doors crossed, such as a schema change, a contract that writes, or a security boundary. Lines are a diagnostic, not the count.

## Compare

Then give the blind designer the proposal, and compare the two counts part by part. Where the blind design has fewer mechanisms, special cases, one-way doors, or code touched beyond the problem, or deletes more, the author adopts it or names the evidence for the difference. When either of them finds a hole and only a new piece closes it, answer questions 3 and 4 for the earlier choice that left the hole before you add the piece. Each one-way door the chosen design crosses goes to `architect` while shaping; during delivery, stop and ask the human, as `deliver` says.

Done when each design has its count, each difference is adopted or answered with evidence, and each one-way door the chosen design crosses has an `architect` result or the human's answer.
