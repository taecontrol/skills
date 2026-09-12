# Deep-module design quality

A deep module offers a small, stable interface that hides substantial, relevant complexity. Depth is leverage, not minimal symbol count: combining unrelated knowledge into a god module fails just as surely as exposing every internal step.

Apply these tests to every consequential boundary:

1. **Caller operation.** Show one normal operation and one meaningful failure from the caller's view. The caller should express intent rather than coordinate internal stages.
2. **Surface inventory.** Justify every public operation, option, and type with a stable caller need. Encapsulate framework objects, storage schemas, wire formats, protocol stages, and volatile policy when callers do not own them.
3. **Hidden-complexity ledger.** Name the policy, invariants, persistence, concurrency, retries, recovery, or protocol decisions completed behind the interface. A large surface with little hidden work is shallow.
4. **Information ownership.** Give each material rule or representation one owner. Shared knowledge of an internal decision is information leakage, even when code is not duplicated.
5. **Change locality.** Test a plausible future change. Prefer the shape that contains the change in its owner and preserves callers. If multiple callers must learn the same new rule, the boundary is weak.
6. **Failure ownership.** State where failures are detected, translated, recovered, or exposed. A simple happy path that exports recovery coordination is not deep.

Reject or revise a candidate when callers orchestrate `load → validate → transform → save`, public methods merely pass through the same arguments, several modules know one hidden policy, configuration exposes internal stages, or escape hatches require callers to understand the implementation. Prefer fewer concepts for callers only when the design still preserves distinct domain ownership and observable failure behavior.
