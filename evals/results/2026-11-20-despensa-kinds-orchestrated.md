# despensa-kinds: deliver and refine as orchestrators, 2026-11-20

- **Question:** when the main thread orchestrates and every process step lives in the brief each agent gets, do the steps run, and does the build come out better than the skill and prompt builds of [2026-11-19](2026-11-19-despensa-kinds-skills-vs-prompt.md)?
- **Case:** phase 2 of `despensa-precios` (tidy kinds, issue #32) from `16488ae`, the same base as run-12 to run-15.
- **Skills:** `deliver` and `refine` at `4a62168`. The main thread (`claude-opus-5-5`) follows two short skills, writes no code, and starts each agent from a template in `references/`: builder, reviewer, cause agent, fixer.
- **Agents:** builder and fixers `gpt-6.2-sol max`, priority tier; four reviewers per round `gpt-6.2-astra high`, one or two lenses each; cause agents `claude-opus-5-5 xhigh`.
- **Owner:** answered every scope decision during the run. Earlier runs were autonomous.
- **Council:** the same as 2026-11-19, with the same briefs. Two changes: the test sentence is neutral, "judge the tests that exist; a missing test costs no points", and the verifier reads `REPRODUCE.md` where earlier builds had `proof.md`.

## Results

| | S, run-12 | S, run-13 | N, run-14 | N, run-15 | O, run-16 |
|---|---|---|---|---|---|
| Ran the cause step | no | no | every round | every round | every round, plus each fix the fixer reported back |
| Hidden checks, phases 1 and 2 | 20 / 21 | 19 / 21 | 19 / 21 | 19 / 21 | 20 / 21 |
| Real hidden-check failures | none | none | H18 | none | H18, as the owner decided |
| Bugs from the list of 20 (critical / major / minor) | 0 / 5 / 6 | 0 / 2 / 8 | 1 / 6 / 7 | 0 / 3 / 6 | 0 / 2 / 5 |
| Of those, owner decisions or improbable | 0 | 0 | 4 | 0 | 2 |
| Design score | 6 (6–7) | 6 (6–7) | 7 (7–7) | 6 (6–7) | 6 (6–7) |
| Correctness score | 7 (7–9) | 7 (6.5–10) | 6 (6–8) | 7 (7–9) | 7 (7–10) |
| Diff | 16 files, +1964 −529 | 16 files, +1902 −521 | 17 files, +1842 −527 | 17 files, +1910 −533 | 22 files, +2150 −537 |
| Commits | 4 | 3 | 1 | 1 | 18 |
| Review rounds | 3 | 3 | 3 | 3 | 3, stopped with 8 blockers |

Run-16 also wrote tests, because `deliver` asks for them: 5 acceptance tests first seen red, and 128 test lines in all. Run-12 to run-15 were told to add none.

Run-16's H18 failure is the typed kind name lost after opening a product. The owner chose to accept that loss. Its other owner decision in the list is V8: after a reload, Back to the list from before a merge clears the filter.

## What this run says

**The steps ran when each agent's brief held them.** Every round had a cause agent, and so did the one fix the fixer reported back. Each scope decision reached the owner with options and a recommendation; there were four. A round 2 cause agent proposed undoing a round 1 fix once the owner's decision made it unnecessary, and the fixer undid it. In the 2026-11-19 runs the skill builds skipped the cause step.

**The bug family that survived all four earlier builds is gone.** V1 (after a merge, the kept kind keeps a stale count and offers "Borrar" when the next read fails) and V10 (a removed kind opens with live actions) do not reproduce. The rewritten reviewer brief has a line for exactly this family: "Make a read fail while the screen still shows what an earlier step left." V9 remains: pressing Back before the merge reply arrives clears the filter.

**Refine still did not converge.** Each round fixed the cases its reviewers reproduced, and the next round found new variants of the same three families:
- a removed kind's ficha stays editable;
- the merge comparison disagrees with the server;
- the filter keeps an old name.

Round 3 confirmed 8 blockers. Four were variants of round 2 blockers left open. One was a regression from a round 2 fix, and two were gaps in other round 2 fixes. The round 3 cause agent traced them to a guarantee the spec never wrote: its state table covers the server's reply to each write, but not what the screen shows when the cached kinds contradict a read, or when the refresh fails. Without that guarantee, every fix covered one reproduced case.

**The design judges blamed the review rounds.** All three design judges named pieces the rounds added as the main cost:
- a module-level map of merged kinds outside Query, against ADR-0009, which round 1 classed as a cause fix;
- a second freshness check beside Query, from round 2;
- client copies of the server's sort order and merge count.

The cause step classified these as cause fixes because they changed only the change's own code. It did not ask whether they added a second mechanism for something the project already owns.

**The new bugs fall outside the list of 20.** The correctness judges reproduced bugs in run-16 that the list does not contain:
- a kind the app holds at 0 opens with "Sin productos" and "Borrar" after a partner gave it a product;
- after a merge, the ficha lists 3 products and says 2;
- the merge card says 4 products when the kind has 5.

The list was built from runs 12 to 15, so these were never checked there, and the 7-bug count favors run-16. V2 also missed the zero case, because it opens a kind that already has products.

## What it does not settle

- **One build,** one case, with an owner answering. An unattended run would leave the four decisions open and unbuilt.
- **Different conditions:** run-16 wrote tests, used the priority tier rather than ultrafast, and ran four reviewers per round where earlier builds ran one to three.
- **An asymmetric bug list:** a fair comparison reruns run-16's new bugs on runs 12 to 15.

## Eval findings

- **Orchestration makes the steps run;** keep it.
- **Convergence fails upstream.** `shape` should write the guarantee for what the screen shows when cached data and a fresh read disagree, before any build.
- **The cause step counted the change's own pieces as existing.** Both pieces the judges blamed grew from code the builder added in the same change: round 1 moved its merge map to module scope, and round 2 widened its kind refetch to three screens. The test "reuses what the codebase already has" let both pass, because the cause agent reads the code at the end of the change. `causes.md` now counts a piece the change added as new, so moving it, widening it, or making it last longer adds it again, and it no longer asks fixes to reuse code, which would copy old structure whether or not it is sound. Replayed with the new text at both decision points, the round 1 agent made the merge map a scope decision for the owner, and the round 2 agent dropped the three-screen rule for one Query refetch when the comparison opens. The round 1 replay's spec already held the owner's later `kindId` decision, which bears on its group G1 but not on the map.
- **Rerun the new bugs on the earlier builds** before reading the bug counts as a ranking.
