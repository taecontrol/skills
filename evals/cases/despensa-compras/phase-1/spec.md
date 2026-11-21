# Record, correct, delete and find purchases over MCP (slices 1 and 2)

Status: Accepted (by the owner, 2026-11-01)

<!-- Eval case file: it joins two accepted specs into one phase. In the real history each slice was its own pull request. -->

This phase builds two accepted specs on this branch, slice 1 first:

1. **Slice 1:** `.work/specs/record-purchases.md`, examples E1–E12. E11 is out of this eval.
2. **Slice 2:** `.work/specs/fix-and-find-purchases.md`, examples F1–F11.

Both rest on the accepted data model and agent contract, `docs/design/recording-purchases.md`, already committed on this branch, and on the accepted program design, `.work/specs/record-purchases.program-design.md`, which slice 2 follows as its Decisions say. The receipts both specs use are in `.work/specs/receipts.json`.

Each spec's test boundary applies to its own examples. The proof has one entry per example, E and F, from the final commit. E10's exact list of five tools is slice 1's state; at the end of the phase the list is F11's.
