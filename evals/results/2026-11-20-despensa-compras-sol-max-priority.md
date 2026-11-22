# despensa-compras: Sol max on the priority tier, 2026-11-20

- **Question:** do acceptance tests written first pay for themselves by protecting phase 1's code when phase 2 has to change it?
- **Configuration:** leads `gpt-6.2-sol`, reasoning effort max, priority service tier; reviewers `gpt-6.2-astra high`. Arm A gets the same flow without tests; arm C runs `deliver`, which writes failing acceptance tests first.
- **Skills:** installed from `taecontrol/skills` at `fc94480`.
- **Case:** `despensa-compras`, on the private repository `taecontrol/despensa` at base `fa3ac39`. Phase 1 records, corrects, deletes and finds purchases (real PRs #14 and #15). Phase 2 adds the product catalog with merges and their undo (real PR #22, merged as `ccca311`), which moves purchase lines that phase 1's code records and corrects.
- **Council:** hidden checks by `claude-sonnet-5-5 high`. Design and proof judges: `claude-opus-5-5 high`, `gemini-4-neon high` and `gpt-6.2-astra high`. Correctness judges: `gemini-4-neon high` and two `gpt-6.2-astra high`. Bug verifier: `gemini-4-neon xhigh`. Neon sits in the seats that the 2026-11-18 and 2026-11-19 runs gave to Fable, so the scores do not compare with those files.
- **Calibration:** the real build `ccca311` passes all 23 scored hidden checks. It fails the unscored H11, which expects same-day purchases without a time to list the one recorded last first. The real history agrees. The owner chose that order in issue #29, after the feature shipped, and the spec leaves it open.

## Scores

Scores are the council's median, followed by the lowest and highest score in parentheses. Hidden checks count the scored ones.

| | A, run-2 | A, run-3 | C, run-1 | C, run-4 |
|---|---|---|---|---|
| Hidden checks, phase 1 | 12 / 12 | 12 / 12 | 12 / 12 | 11 / 12 |
| Hidden checks, phase 2 (phase 1's included) | 23 / 23 | 23 / 23 | 23 / 23 | 22 / 23 |
| Confirmed bugs, phase 1 (critical / major / minor) | 0 / 4 / 6 | 0 / 5 / 4 | 0 / 5 / 5 | 0 / 5 / 4 |
| Confirmed catalog bugs, phase 2 (and design gaps) | 0 / 4 / 4 (+1) | 0 / 4 / 3 (+1) | 0 / 5 / 2 (+1) | 0 / 4 / 3 (+1) |
| False proof claims, phase 1 / phase 2 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| Correctness, phase 1 / phase 2 | 6 (6–7) / 8 (7–10) | 7 (7–9) / 7 (7–10) | 7 (6–8) / 7 (7–10) | 7 (7–9) / 7 (7–10) |
| Design, phase 1 / phase 2 | 7 (7–7) / 7 (6–8) | 8 (7–8) / 8 (8–8) | 7 (7–7) / 7 (7–8) | 8 (8–8) / 8 (8–8) |
| Proof, phase 1 / phase 2 | 9 (8–9) / 9 (9–9) | 9 (9–9) / 9 (9–9) | 9 (9–9) / 9 (9–10) | 8 (8–9) / 9 (9–9) |
| Tests added, phase 1 (new files / cases) | 0 / 0 | 0 / 0 | 1 / 27 | 3 / 23 |
| Tests added, phase 2 (new files / cases) | 0 / 0 | 0 / 0 | 1 / 26 | 1 / 28 |
| Phase 2: phase 1 lines it deleted or rewrote (src and migrations) | 145 | 185 | 150 | 86 |
| Lead time, phase 1 / phase 2 | 30 min, stopped / 33 min | 30 min / 36 min | 56 min, stopped / 41 min | 2 h / 46 min, stopped |

The base has 12 test cases. Arm A kept them; arm C ended phase 2 with 65 (run-1) and 63 (run-4). "Stopped" means the lead ended with open items instead of a green handoff: run-2 phase 1 with two blockers after the third review round, run-1 phase 1 with two open failures (B1 among them), run-4 phase 2 with one decision for the owner. A stopped run's time is shorter than a finished one would be.

The bug counts come from a common list the verifier ran on every build twice from an empty database: 14 bugs for phase 1 (B1–B14), checked on the phase 1 builds, and 10 catalog bugs for phase 2 (V1–V10), checked on the phase 2 builds. The verifier did not run the phase 1 list again after phase 2.

## Confirmed bugs

### Phase 1

| Bug | run-2 (A) | run-3 (A) | run-1 (C) | run-4 (C) |
|---|---|---|---|---|
| B1: a retry that got `already_recorded` records a second purchase once the first purchase's receipt number is corrected | major | major | major | major |
| B2: a correction's `requestId` replayed on another or a missing purchase answers success with the first purchase | major | major | major | major |
| B3: two identical new lines without a stable barcode create two products, and a later receipt a third | – | major | major | major |
| B4: two lines with the same new barcode and drafts that differ only in brand create two products | – | major | major | major |
| B5: a branch correction answers `corrected` and changes nothing; variants: (a) a new branch code, (b) a new address at a shared branch, (c) a respelled address at a branch without a code | major (c) | major (b, c) | major (a, b, c) | major (a, b, c) |
| B6: a branch code learned on a later receipt is lost, and an abbreviated address makes a second branch | major | – | – | – |
| B7: an address and a branch code that name two branches record at the code's branch with no error | minor | minor | minor | minor |
| B8: a new line whose codes point to two products links to one of them instead of a new product | minor | minor | minor | minor |
| B9: the order of two lines decides between `ProductMismatch` and `recorded` | minor | – | – | – |
| B10: an explicit pick of an unrelated product wins over two code candidates | – | minor | minor | – |
| B11: a nonexistent `productId` on a barcoded line answers `ProductMismatch`, not `ProductNotFound` | minor | minor | minor | minor |
| B12: adding a branch code to a branch two purchases share is refused | minor | – | – | – |
| B13: a correction rewrites the address of an unrelated branch with no purchases | minor | – | – | – |
| B14: spaces around a receipt's point of sale defeat the duplicate check | – | – | minor | minor |

Arm A's run-2 avoids the product duplicates (B3, B4) and has the branch bugs (B6, B12, B13) instead.

Run-4 also fails hidden check H10: it treats a 14-digit case code with packaging indicator 2 as a store-restricted code, so the same case code makes two products. The real #14 review found the same bug (commit `53130c9`). Run-4 carried it unfixed into phase 2.

### Phase 2

| Bug | run-2 (A) | run-3 (A) | run-1 (C) | run-4 (C) |
|---|---|---|---|---|
| V1: in one receipt during a merge, a line linked through another line's new barcode stays on the target after undo | minor | minor | minor | minor |
| V2: the order of two lines decides which product each returns to after undo | minor | – | – | – |
| V3: chain A→B→C where A and B share a barcode; a line recorded after B→C stays on C when B→C is undone | design gap | design gap | design gap | design gap |
| V4: a line whose codes matched both A and B goes back to A on undo; the design says it stays on B | major | major | major | major |
| V5: a correction that picks B, the only current match for A's barcode, stays on B after undo | major | major | major | major |
| V6: a correction sent from a purchase read before a second merge is accepted silently and ends on the wrong product after undo | major | major | major | major |
| V7: after undo, a line picked explicitly says `linkedBy` `barcode` | minor | minor | – | minor |
| V8: after undo, a corrected line that kept its barcode has no `linkedBy`; spec example E13 requires it | – | – | major | – |
| V9: renaming products while paging `list_products` repeats one and skips another | major | major | major | major |
| V10: `ProductAlreadyMerged` in a chain gives A→B's merge id and time with C as the target, never naming B | minor | minor | minor | minor |

`linkedBy` is the evidence a line was linked by: `barcode`, `store_code`, or an explicit pick. Run-1 never stores it and never returns it from `get_purchase`, so V7 is absent there only because the value does not exist, and V8 is present for the same reason.

V3 is a gap in the accepted design, not in the builds. The design's origin rule takes R, the current product the evidence resolves to, and L, the origins of the matching lines: "The origin is R if R is in L, else the single origin when L has one, else R". In V3, R is C and L holds A and B, so the line's origin is C and the undo leaves it there. That breaks the design's own promise, "Undo a merge = as if it had never been merged". All four builds follow the rule as written. The real delivery received the same design.

The tables leave out reports about writes from the previous Worker during a deploy rollback (run-1, run-2, run-4), because the design accepts that window as a residual risk.

## Where the judges disagreed

- **Neon found no catalog bugs.** It gave correctness 10 with 0 bugs to all four phase 2 builds. The two Astra judges reproduced critical or major undo bugs in each, and the verifier confirmed 4 or 5 major bugs per build.
- **Severity drifted between judges.** B1 was critical for both Astras on run-2 and run-1, major for Astra on run-3 and run-4, and minor for Neon. The verifier's brief had fixed severity rules and put it at major everywhere; the judges' briefs had none.
- **One report was disputed and dropped.** An Astra judge on run-3 called it a bug that 14-digit codes with indicator 2 link across chains by barcode. That is H10's expected behavior and the real build's.
- **One contested report.** On run-2 phase 2, a nonexistent `productId` on a barcoded line moved from `ProductMismatch` to `ProductNotFound`. The judge called it a regression; the phase 1 list (B11) expects `ProductNotFound`, so phase 2 fixed B11 in run-2.

## What this run says

**No build shipped a phase 1 regression, and no phase 1 test caught one along the way.** No build failed a phase 1 hidden check after phase 2 that it had passed after phase 1, although each deleted or rewrote 86 to 185 lines of phase 1's code. A transcript read of both C builds' phase 2 sessions (`claude-opus-5-5 xhigh`) found no phase 1 test that went red on real code. Phase 1 tests changed only where phase 2 meant to change behavior: the tool list (run-1 loosened the exact list to "contains"; run-4 kept it exact) and kind cases in run-4.

Run-4 had the one phase 1 regression during the work. Phase 2 added the product's kind to phase 1's rule that identical new-product drafts in one receipt share a product, and compared the kind as typed, without normalizing it. A reviewer in `refine` found it before handoff; no phase 1 test covered that rule, and the lead then wrote one, red first. In arm A, a reviewer found the one other change to phase 1 code worth reporting, an extra D1 query in run-3. In this run, reviewers caught the only phase 1 regression, and no test was in a position to.

**The arms ended with the same bugs.** Both arms share the phase 1 bug profile, apart from run-2's different trade, and the same four major catalog bugs. Proof scores are equal in phase 2 and within one point in phase 1. What C's tests added was something the proof judges could test. The Astra proof judge broke the behavior behind each acceptance test, one mutation per test. In phase 1, 27 of 30 tests went red in run-1 and 21 of 24 in run-4; in phase 2, 30 of 31 and 31 of 33. The tests that stayed green show what the suites miss: F10 (the products of a deleted purchase stay findable), author attribution on corrections, parity between HTTP and MCP, and assertions on description wording. Arm A has no new tests to mutate, so the judges checked its proof by replaying its captured sessions.

**C took longer, and little of it went to writing tests.** The transcripts put writing the acceptance tests at 3 to 4 minutes per phase. The rest of the gap falls in `refine`, where C's reviewers ran mutation checks of their own; this run did not measure a finer breakdown. Phase 2, where every build but run-4 finished, took 41 and 46 minutes in C against 33 and 36 in A.

**What it does not settle:**

- **Two builds per arm** on one case.
- **This phase 2 did not break phase 1's contract.** Its catalog bugs sit in new behavior that phase 1's tests cannot cover. A case whose real history has a phase 1 regression introduced by the second feature would test the question directly.
- **The arms read the same specs,** which already name the hard cases in phase 1's examples. Builds without tests had the same contract in front of them.

## Eval findings

- **Run-4's lead never loaded `deliver` or `refine`,** and its reviewer briefs forbade opening the skills, so arm C's second build followed its own process. Run-1's lead paraphrased the reviewer template instead of passing it, which `refine` forbids. A transcript read found the template's text in neither run's reviewer briefs.
- **B1 was found once and left open.** In run-1, a reviewer that drove a household session reproduced B1 step by step. The cause agent classed it as a decision for the owner, because the fix needs a new stored link from request to purchase, and the unattended run stopped with it open. Run-4's phase 2 reviewer found V6 and ended the same way. With nobody to answer, a gap found in review counts as a bug.
- **The phase 1 spec does not list B1.** Its state space marks the cells B1 crosses "—", and the program design describes the retry's `already_recorded` as intended; only the outcome sentence forbids a second purchase. Where reviewers read the sessions bullet, they kept state across calls but chose their steps from the state space, one table per operation, so none reached B1.
- **Give the judges the verifier's severity rules.** With them, the verifier rated each bug the same on every build; without them, the judges rated B1 from critical to minor.
- **H11 should stay unscored.** It fails on every build and on the real one, because the spec leaves the order open.
- **H15 to H17 cannot read `linkedBy` on run-1.** They correct a merged line, undo the merge, and expect the line back on A with its old `linkedBy`. Run-1 passed them on the product alone. The checks should fail when `linkedBy` is missing, since E13 requires it; run-1 would then score 20 of 23 in phase 2.
- **F10 contradicts phase 2's spec and the design.** F10 says the products a deleted purchase created stay findable with `find_products`; the design keeps that evidence only on purchase lines, and phase 2's spec starts from the products being unreachable. The case documents it, and the proof judges scored F10 as written. A later version of the case could settle it in `phase-1/spec.md`, the file that joins the two phase 1 specs.
- **Slice 1's spec and the design disagree** on a new `requestId` for a known receipt with wrong totals: the spec's state table answers `TotalsMismatch`, the design `already_recorded`. No check depends on it, but a lead can lose time on it.
- **Twenty-six concurrent agents overloaded the machine.** Staggering the council in waves fixed it.
- **One arm wrote to a server it did not start** (run-2, port 5184). Briefs now ask for a free port and calls only to the agent's own server.
