# despensa-compras from shape: with and without a program design, 2026-11-22

- **Question:** does a program design help or hurt when the whole flow runs from `shape`, with an owner to answer and a second feature that has to change the first? A second question: does `shape`'s new step 5 (PR #99) bring into the spec the session that caused bug B1 in the previous run?
- **Arms:** D follows the skills as written, `program-design` included. N skips `shape`'s step 7 and never loads `program-design`. Both run `shape`, then `deliver` with acceptance tests first. Briefs: [`arms/flow-common.md`](../arms/flow-common.md), [`arms/d-with-design.md`](../arms/d-with-design.md), [`arms/n-without-design.md`](../arms/n-without-design.md).
- **Configuration:** leads `claude-opus-5-5 high`. Builders `gpt-6.2-sol`, reasoning effort max, priority tier. Reviewers `gpt-6.2-astra high`. Owner `claude-opus-5-5 high`, answering through a command from the owner's November decisions and words ([`from-shape/owner.md`](../cases/despensa-compras/from-shape/owner.md)).
- **Skills:** installed from `taecontrol/skills` at `d000834` (3.20.1, with PR #99's `shape`).
- **Case:** `despensa-compras` from shape, on the private repository `taecontrol/despensa` at base `fa3ac39`. No spec, design or data model is given. Phase 1 starts from the brief the real shaping thread received ([`opening-1.md`](../cases/despensa-compras/from-shape/opening-1.md)), with synthetic printed receipts. Phase 2 starts from issue #8 ([`opening-2.md`](../cases/despensa-compras/from-shape/opening-2.md)).
- **Council:** hidden sessions by `claude-sonnet-5-5 high`. Design and proof judges: `claude-opus-5-5 high`, `gemini-4-neon high` and `gpt-6.2-astra high`. Correctness judges: `gemini-4-neon high` and two `gpt-6.2-astra high`. Bug verifier: `claude-opus-5-5 xhigh`, chosen because it judged no correctness; the previous run used `gemini-4-neon xhigh`.
- **Calibration:** the real build `ccca311` passes 31 of the 32 scored steps of [`hidden-sessions.md`](../cases/despensa-compras/from-shape/hidden-sessions.md) as first written. The one failure was a flaw in the step, fixed before any arm was checked, with two other fixes the calibration found.

The scores do not compare with the 2026-11-20 file: there every arm built the same accepted spec, and here each arm wrote its own.

## Scores

Scores are the council's median, followed by the lowest and highest score in parentheses.

| | D, run-1 | D, run-2 | N, run-3 | N, run-4 |
|---|---|---|---|---|
| Hidden sessions, phase 1 (scored) | 12 / 13 | 12 / 13 | 10 / 11 | 9 / 10 |
| Hidden sessions, phase 2, both sessions (scored) | 25 / 26 | 25 / 26 | 25 / 26 | 25 / 26 |
| Steps the build did not offer, phase 1 / phase 2 | 1 / 3 | 1 / 1 | 5 / 5 | 5 / 3 |
| Confirmed bugs, phase 1 (critical / major / minor) | 0 / 0 / 3 | 1 / 0 / 2 | 0 / 0 / 3 | 1 / 0 / 2 |
| Confirmed bugs new in phase 2 | 0 / 0 / 1 | 1 / 0 / 1 | 0 / 0 / 2 | 1 / 0 / 1 |
| False proof claims, phase 1 / phase 2 | 1 / 0 | 0 / 0 | 0 / 1 | 1 / 0 |
| Correctness, phase 1 / phase 2 | 9 (9–10) / 9 (9–10) | 8 (8–10) / 9 (8–10) | 9 (9–10) / 9 (9–10) | 8 (8–10) / 8 (8–10) |
| Design, phase 1 / phase 2 | 8 (8–8) / 8 (7–8) | 7 (6–8) / 8 (8–8) | 8 (8–8) / 8 (7–8) | 8 (7–8) / 8 (6–8) |
| Proof, phase 1 / phase 2 | 9 (8–9) / 9 (8–9) | 8 (8–8) / 8 (8–8) | 9 (9–9) / 9 (8–9) | 8 (8–8) / 9 (8–9) |
| Product identity built in | phase 1 | phase 1 | phase 2 | phase 2 |
| Test cases at the end of phase 1 / phase 2 (base 12) | 37 / 82 | 45 / 88 | 35 / 68 | 21 / 85 |
| Phase 2: phase 1 lines it deleted (src and migrations) | 58 | 18 | 37 | 102 |
| Owner calls, phase 1 / phase 2 | 9 / 12 | 9 / 11 | 9 / 5 | 6 / 24 |
| Lead time, phase 1 / phase 2 | 6 h 45 / 12 h 30 | 3 h 13, stopped, then 1 h 45 / 3 h 02 | 2 h 13 / 5 h 29 | 2 h 20 / 6 h 26 |

A scored step is one that passed or failed on a confirmed defect. Steps the build did not offer, failures its accepted spec names as accepted risks, and steps the verifier classed as flaws of the check are left out of the count and listed below. Phase 2 counts session 1 rerun on the phase 2 build plus session 2, the catalog.

"Stopped" means run-2's lead ended phase 1 after `refine`'s third round left two blockers, and put the decision to the runner instead of the owner. The runner told it the brief sends delivery decisions to the owner; the owner chose "when in doubt, split, never join", and the lead finished both slices. The stop point is tagged `p1-stop`. Run-1's phase 2 time is not explained; nothing in its report says it waited.

## Confirmed bugs

The verifier reran each finding from an empty database at the phase it was reported in.

| Bug | Run | First seen | Severity | Household likelihood |
|---|---|---|---|---|
| An 8- or 12-digit restricted code starting with 2 is taken as a global barcode, so articles from two chains become one product; in phase 2 the catalog shows the joined count | run-2 | phase 1 | critical | low |
| Undoing a merge clears a kind someone set on the kept product through the previous Worker during a rollback | run-2 | phase 2 | critical | near zero |
| A new store code printed beside only one of two connected barcodes goes to the group's owner, so after an undo a later receipt lands on the wrong product (comes from how the catalog groups a receipt's lines, merge or not) | run-4 | phase 2 | critical | very unlikely |
| Amounts above about 10 trillion pesos lose a centavo, and two amounts a centavo apart pass the check as equal, inside the build's own range | run-4 | phase 1 | critical | never in practice |
| `get_purchase` reads ticket numbers without leading zeros and its description does not say so; an agent comparing with the ticket asks to fix a number that is right, then reports the fix failed | run-1 | phase 1 | minor | high |
| A purchase can be stored with a chain or branch of spaces, and then a chain search misses it | run-1 | phase 1 | minor | low |
| The first call after migrating a long purchase history takes over a minute (quadratic in unlinked lines: 400 receipts, 75 s) | run-3 | phase 2 | minor | low |
| Valid two-decimal amounts above about 85.9 million pesos are refused | run-3 | phase 1 | minor | practically never |
| A purchase search padded with spaces (`"  coto "`) finds nothing | all four | phase 1 | minor | very low |
| Searches miss Unicode-equivalent spellings: a decomposed accent, ß against SS or ẞ, a Greek final sigma; in run-3 two kinds spelled that way stay separate | all four, in different searches | phase 1 or 2 | minor | practically never |

**False proof claims.** run-1 E28 says the agent used "the ids it had shown"; it never showed ids. run-4 E4 offers a search for "Zorro" as proof of name search, but ZORRO is printed on the ticket. run-3 K9 reports that re-recorded lines joined their earlier products at recording; one line made a new product, and the result quoted was computed after a later correction. Each product behavior holds on a rerun.

**Not counted as build defects:**
- **Accepted in the build's spec:** S7 in run-1, run-2 and run-4 (B1, below); S6 in run-1 (last correction wins); T14 in run-2; sub-centavo rounding in run-3.
- **Agent behavior:** in run-1's catalog capture the agent left the brand Ramo empty, and in run-4's E10 capture the agent shortened the owner's answers ("garbanzos de 400 g" stored as "Garbanzos"). The server stored what it was sent.
- **Not offered:** run-3 and run-4 have no time on a purchase or no correction of its header; run-1 and run-3 have no way to pick a line's product in a correction (T5, T14).
- **Flaws of the check:** S9 asks for amounts no JSON number carries exactly; T9 expects search by a merged product's old name, which run-2's specs never promised; T14 assumes a correction can move a line off its barcode, which the owner's rule "a product is the exact article, recognized by its barcode" forbids.

## B1, the session `shape`'s step 5 now covers

In the 2026-11-20 run every build recorded a second purchase when the first recording's lost retry arrived after a correction changed the receipt number, and no spec named it. Here:

| Run | Where its spec puts the case | Behavior |
|---|---|---|
| run-1 | a row of slice 2's state table, "recorded, then its ticket number corrected": improbable, out of scope | records a second purchase |
| run-2 | out of scope: a late retry with a corrected number records both, the agent deletes the wrong one | records a second purchase |
| run-4 | out of scope: "a retry after its receipt number was corrected: it records the receipt again" | records a second purchase |
| run-3 | no correction of the number exists; the documented route is delete and record again | the late retry records a second purchase |

Three of four specs named the case, and the owner saw it on the acceptance page. The real build `ccca311` answers the retry with the first purchase, so a guard was possible; the simulated owner accepted each "rare case" the arm listed, so no arm built one.

## Where the judges disagreed

- **Correctness:** `gemini-4-neon` gave 10 with no bugs on all eight results. In run-2 and run-4 it missed bugs that both Astra judges reproduced on their own and the verifier confirmed as critical. Each median here rests on the two Astra judges.
- **Design:** the widest gaps are run-2 phase 1 (6 to 8) and run-4 phase 2 (6 to 8). In both, Opus judged that a rule written in two places, which had already drifted, makes every later change fragile; Neon and Astra counted the same findings as local.
- **Proof:** each false claim above was reported by one judge (Astra, or Opus for run-1 phase 2, whose claim the verifier did not confirm). The other two passed it.

## What this run says

**The program design changed what phase 1 built, not how good it was.** Both D arms built product identity in phase 1, and both N arms left it for the catalog. The D arms took longer in phase 1, and run-2 is the one whose program design underestimated product recognition: its recognition query was rewritten in 8 commits, it stopped at `refine`'s third round, and its restricted-code bug lives there. Design scores are 8 in seven of eight results, and correctness and hidden sessions do not separate the arms. Phase 2 deleted 18 to 102 lines of phase 1's code in every arm, so neither arm's phase 1 had to be rebuilt. With two runs per arm, the answer is that this case shows no benefit and no harm from the program design.

**The new step 5 did what it targeted.** The B1 session reached three specs as an explicit case, one of them as a row of the state table, and became a decision on the owner's page instead of a bug nobody saw. It did not reach the code, because the simulated owner accepted every rare case.

**The simulated owner shaped the products.** Of the points it logged as anything other than a plain "ok" it had also given in November, 46% to 72% per phase had no November answer. On those it took the arm's recommendation, as its brief says to when nothing it said conflicts: dropping concurrency guards, deferring products, keeping B1. In run-3 and run-4 it also made up what four receipt lines were, before it was given the names. A real owner may have answered those points differently.

**What this run does not settle:**
- Two runs per arm, one case.
- Each arm wrote its own spec, so a score measures the spec's ambition as well as the build: a build that offered less had fewer steps to fail.
- Whether the leads passed `refine`'s reviewer template to their reviewers was not checked; the children's Codex sessions were not under `~/.codex/sessions`.

## Findings about the eval

- **Replace Neon in the correctness seats.** It missed every bug the Astra judges confirmed in this run, as in the previous one.
- **The hidden sessions barely separate builds.** The only scored failure is the padded search, the same in all four builds. Rewrite S9, T9 and T14, and add steps for the bugs this run confirmed, such as a restricted code and a new code beside two barcodes after an undo.
- **The owner needs the receipts' names and the November decisions it must hold.** It was given the names mid-run. It did not hold "a product is the exact article" when an arm proposed deferring products, because the decision table has no row for timing.
- **The lead should ask the owner, not the runner.** run-2's lead ended its turn with the owner's decisions put to the runner.
- **No run touched the owner's production data.** Every session had the owner's real Despensa tools loaded. The production purchases after the run are the owner's two real receipts of 2026-11-01, unchanged.
