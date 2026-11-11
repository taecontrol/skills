# Fix

The task starts from a failure someone met.

- **How they met it.** Establish what ran, where, and what it showed, and reproduce it that way when you can. A reproduction in a different setup checks your setup, not theirs, and what you cannot establish is a fact only they hold.
- **The cause.** The cause is a premise, checked when you can name the mechanism and turn the failure on and off through it. A symptom that goes away is not yet a cause. `diagnosing-bugs` owns the search when the failure is intermittent or the cause is still uncertain after you read the code.
- **What was decided.** Before you design a fix, read the decisions recorded about that behavior: ADRs, specs, documentation. A failure that is decided behavior has no fix. Changing it is the human's decision, and the mode becomes build.
- **Ends without a fix.** Each is a result to stop on, with what you ran and what you could not observe: the cause sits outside the repository, so you give the diagnosis and who can act on it; the failure did not reproduce, so you give what would catch it next time; the behavior was decided.
- **The contract.** Its first line is that the failure they met no longer occurs. Its proof is the reproduction, failing before the change and passing after. Other symptoms of the same cause are in the path.
- **A fix that grows.** One that adds a module or replaces a mechanism has become build work, and the mechanism is the human's choice.
