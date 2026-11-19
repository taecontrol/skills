# despensa-precios: refine's Sessions lens, arms A and C twice each, 2026-11-19

- **Configuration:** lead and implementer `gpt-6.2-sol max ultrafast`, reviewer `gpt-6.2-astra high`. Same as the [pilot](2026-11-18-despensa-precios-sol-max-ultrafast.md) and the [Sequences replay](2026-11-19-despensa-precios-refine-sequences.md).
- **Change under test:** `refine` at `90cbcd2`. Its Sequences lens, which listed the pilot's three cases, became a Sessions lens that names none: each example was verified once from a fresh start, so drive the product through the sessions people have and keep the state every step leaves behind.
- **Arms:** A (no tests) and C (current flow), two runs each. Arm B was dropped after two runs. Run-8 and run-10 were C, run-9 and run-11 were A. Judges did not know.
- **Council:** design and proof `claude-opus-5-5 high`, `claude-fable-5-2 high`, `gpt-6.2-astra high`. Correctness `claude-fable-5-2 high` and two `gpt-6.2-astra high`, in place of Opus. Hidden checks by `claude-sonnet-5-5 high`. Bugs rerun by `claude-fable-5-2 high`, each build against the same list of 15.
- **Case:** `despensa-precios` at base `7c53585`, with the accepted program design. Phase 1 below; phase 2 to follow.

## Phase 1 scores

Scores are the council's median, followed by the lowest and highest score in parentheses.

| | A, run-9 | A, run-11 | C, run-8 | C, run-10 |
|---|---|---|---|---|
| Hidden checks | 11 / 11 | 11 / 11 | 11 / 11 | 11 / 11 |
| #40, Catálogo after Precios | fixed in review | fixed in review | fixed in review | fixed in review |
| Confirmed bugs (critical / major / minor) | 0 / 0 / 9 | 0 / 0 / 8 | 0 / 0 / 11 | 0 / 1 / 7 |
| Correctness score | 7 (7–9) | 7 (7–10) | 8 (7–9) | 7 (7–9) |
| Design score | 8 (7–8) | 7 (7–8) | 7 (7–8) | 8 (8–8) |
| Proof score | 9 (9–9) | 9 (9–9) | 9 (9–9) | 9 (9–9) |
| Tests added (files / cases) | 0 / 0 | 0 / 0 | 1 / 3 | 1 / 4 |
| Diff | 13 files, +1696 | 15 files, +1537 | 18 files, +1736 | 18 files, +1584 |
| Commits / refine rounds | 1 / 2 | 2 / 2 | 5 / 3 | 6 / 3 |
| Build time, approximate | 19 min | 14 min | 34 min | 29 min |

Three hidden-check runs failed H3 because "Mejores compras" is hidden when no purchase in the period has a rate, with the explanation in the ranking. Every earlier build did the same and was counted a pass, so these are too. Read strictly, run-8, run-9 and run-11 pass 10 of 11.

## Confirmed bugs

| Bug | run-9 A | run-11 A | run-8 C | run-10 C |
|---|---|---|---|---|
| A chain name such as "Carrefour Express" runs over the ARS toggle at 390 px, and a longer one makes the screen scroll sideways. | — | — | — | major |
| Back to a kind someone changed meanwhile, with only `list_kinds` failing: the comparison updates and the header keeps the old product count, with no alert and no retry. | minor | minor | minor | — |
| The scroll offset carries into a comparison already loaded, so it opens with its header off-screen. | minor | — | minor | minor |
| When only the chain options fail to load, the chain menu says so and offers no retry. | — | minor | minor | — |
| A failed `list_kinds` hides a comparison that arrived. | minor | — | — | — |
| After one "Reintentar" with a chain selected, the offline alert or the short chain list stays. | minor | — | — | — |
| A period across the new year cuts its end date in the period button. | minor | minor | minor (phone only) | minor |
| Editing an end-only period from a hand-typed link turns its end into the start. | minor | minor | minor | — |
| A touch 1–7 px inside ARS's right edge lands on USD. | — | minor | minor | minor |
| The median of a group with no rated purchase loses its "sin cotización" marker. | — | — | minor | — |
| The picker shows only the first 20 matches, so "Té de menta" is unreachable behind 20 products whose names contain it. | minor | minor | minor | minor |
| A hand-typed `cadena=365` is dropped. | minor | minor | minor | minor |
| A 72-character name with no spaces overflows the empty state at 390 px. | minor | minor | minor | minor |
| README's introduction still lists comparing prices as agent-only. | — | — | minor | minor |

## What this run says

**The Sessions lens did what the Sequences lens did not.** Every build's review found the #40 collision between Catálogo and the Precios picker, and every build fixed it. With the Sequences lens one review in three found it; in the pilot none did. The Sessions text names no case, so this is the lens working from its general wording. #40 was known when the text was written, so phase 2 is the test of whether it generalizes.

**Sessions missed one kind of session bug.** The bugs that remain are state an earlier step left behind, combined with a read that fails. Examples are an old count kept from the cache while its read fails, a chain list that cannot be retried, an alert that outlives its retry. They showed up in three of the four builds, and no review drove a failure while the cache held older data. The Sequences lens named "each failure followed by its recovery"; the Sessions text names no failures. That is a hypothesis, and phase 2 is where it gets tested before any change to the text.

**Arms A and C still ship the same product.** Confirmed bugs are 9 and 8 for A, 11 and 8 for C; the only major is in C. Design is 8 and 7 in each arm, proof 9 in all four. What differs is cost and the kind of evidence: C took about twice as long and ran one more review round, and its scripts assert against `compare_prices`, so they fail on their own, while A's scripts record and someone reads them. The judges' replays score both 9.

**Design matched the reference in two builds.** Two of the four scored 8, the score of the [reference build](2026-11-19-despensa-precios-reference.md), and none scored below 7. The change touched verification only, so this is variation across runs, not an effect.

## Where the judges disagreed

- **Correctness severity.** The two Astras rated E7's paid amount and hand-typed links major, as Astra did before, and with two of them on the panel they set every median at 7. The verifier rated all of these minor. Correctness medians in this run are not comparable with earlier runs; compare confirmed bugs instead.
- **Who found the session bugs.** Both Astras reproduced the old-count bug on their own in run-11, and one in each of run-8 and run-9. Fable found none of them, and gave run-11 a 10. Fable found the scroll bug in run-8 and the chain overflow and cross-year label in run-10. The two models catch different bugs.
- **Arm A's missing test.** The council now says a missing test costs no points. Fable and Astra followed it; Opus in proof still named the missing E5 test as a deduction on run-11, without changing the score.
- **Half-open periods.** Two design judges called support for a period with one bound unnecessary. Hidden check H5 needs it, and E14's own rule of dropping an invalid date produces one. The spec does not say it outright.

## Eval findings

- **Correctness judges need the verifier's severity rule.** The verifier's line that hand-typed links and unlikely data shapes are minor is what makes its counts comparable. The correctness brief has no such line, so two judges of one model move the median.
- **H3 needs one reading.** Checkers disagreed on whether hiding "Mejores compras" with an explanation elsewhere passes. Either reword H3 to name where the explanation goes, or accept any explanation on screen.
- **Write the half-open period into the case's notes for design judges, or into the spec's decisions,** so a design judge can tell it is required.
- **Cost of phase 1:** 4 builds, 4 hidden-check runs, 36 judges and 4 verifiers, about 1 h 30 min from launch to the last verification.
