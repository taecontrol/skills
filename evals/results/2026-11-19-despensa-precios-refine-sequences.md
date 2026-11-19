# despensa-precios: Sol max ultrafast with refine's Sequences lens, 2026-11-19 (phase 1 only)

- **Configuration:** lead and implementer `gpt-6.2-sol max ultrafast`, reviewer `gpt-6.2-astra high`. Same as the [pilot](2026-11-18-despensa-precios-sol-max-ultrafast.md).
- **Change under test:** `refine` at `d4db062` plus a **Sequences** lens and a wider rule for shared names and state (word count 1254 → 1319). The brief's proof of work also asks for one entry per sequence the review drove. Everything else is the pilot's.
- **Why:** every bug the pilot's builds shipped was a sequence: screen after screen (#40), an action changed after it took effect, a failure and then its retry. Each build verified every example once, from a fresh start.
- **Council:** `claude-opus-5-5 high`, `claude-fable-5-2 high`, `gpt-6.2-astra high` per area. Hidden checks by `claude-sonnet-5-5 high`. Bugs rerun by `claude-fable-5-2 high`.
- **Case:** `despensa-precios` at base `7c53585`, phase 1 only, with the accepted program design. One run per arm.
- **Arms:** run-4 was B, run-5 was A, run-6 was C. Judges did not know.

## Scores

Scores are the council's median, followed by the lowest and highest score in parentheses. The pilot's value for the same arm follows the arrow.

| | A, no tests | B, expect tests | C, current flow |
|---|---|---|---|
| Hidden checks, phase 1 | **11 / 11** ← 10 | 10 / 11 ← 10 | 10 / 11 ← 10 |
| #40, Catálogo after Precios | **fixed** | ships | ships |
| Confirmed bugs (critical / major / minor) | 0 / 0 / 6 | 1 / 0 / 7 | 1 / 0 / 5 |
| False proof claims | 0 | 0 | 0 |
| Correctness score | 10 (8–10) ← 9 | 7 (4–9) ← 9 | 7 (4–10) ← 8 |
| Design score | 7 (7–7) ← 7 | 7 (6–7) ← 7 | 7 (6–7) ← 7 |
| Proof score | 9 (8–9) ← 9 | 9 (9–9) ← 9 | 9 (9–9) ← 9 |
| Sequences the review drove | 15 | 10 | 15 |
| Tests added (files / cases) | 0 / 0 | 1 / 3, inline snapshots | 1 / 3 |
| Diff | 15 files, +1743 | 15 files, +1726 | 17 files, +1561 |
| Commits | 8 | 4 | 6 |
| Build time, approximate | 21 min ← 13 | 30 min ← 22 | 20 min ← 18 |

## Confirmed bugs

Each verifier reran a common list on its build, so a bug one judge saw on one build was checked on all three.

| Bug | A | B | C |
|---|---|---|---|
| Catálogo and the Precios picker share a cache entry: Catálogo crashes after Precios, the picker lists no products or crashes after Catálogo (#40). Found by hidden check H1, Fable in correctness and Astra in design. | — | critical | critical |
| The picker shows only the first 20 search results, so "Reserva" is unreachable when 20 products named "Aceite Reserva N" match first. Found by Astra in correctness. | minor | minor | minor |
| A failed `list_kinds` or `list_products` read for the header hides a comparison `compare_prices` already returned. Found by Astra in correctness and design. Hidden check H7 passes it, because the currency toggle is disabled. | minor | minor | minor |
| A hand-typed `cadena=365` is dropped. Same as the pilot. | minor | minor | minor |
| After one "Reintentar", the offline alert stays and the chain options are incomplete. | — | minor, both paths | minor, one path |
| The no-rate line repeats a date when one receipt has two unrated lines. | — | minor | — |
| A hand-typed numeric `producto=123` opens the picker with no notice. | minor | | |
| The picker reuses Catálogo's paged list, so it refetches pages Catálogo loaded; when that request fails, the offline alert shows beside the 20 products. A cost of A's fix for #40. | minor | | |
| "Reintentar" stays disabled while another read is pending. | minor | | |
| README's intro still lists comparing prices as agent-only. | | minor | |
| With a chain filter, the without-size caption says no purchase of the subject has a size. | | minor | |
| A 69-character chain name with no spaces overflows at 390 px. | | | minor |

The verifier brief rated minor what needs "data shapes a household is unlikely to have". The pilot's verifier had no such line, and rated the long-name overflow major. So compare criticals and hidden checks with the pilot; majors and minors are not on the same scale.

## Where the judges disagreed

- **Correctness spread, again.** Opus gave 10, 10 and 9. It missed #40 on both builds that had it, as it did on all three pilot builds. Fable found #40 on both builds that had it and gave each 4. Astra found most of the edge cases and gave 7 or 8. Run-6's median of 7 rests on Fable alone; without Fable it would be 10, the same as A's, which has no crash.
- **Design found #40 by reading.** Astra in design found it on both builds that had it, as on two of the three pilot builds.
- **Arm A paid for having no test in design and proof.** Two design judges and two proof judges counted the missing E5 test against A. The arm's brief replaced the spec's test boundary; the judges were not told. The scores above are as the judges gave them.
- **Hand-typed URLs.** Correctness judges counted `cadena=365` as a bug, and design judges counted the code that handles other hand-typed URLs, such as `cadena=coto` or one-sided periods, as unnecessary. The spec does not settle whether hand-typed URLs are in scope.

## What this run says

The Sequences lens changed what the review does. Every review drove 10 to 15 sequences; in the pilot none drove any. A's review found and fixed the #40 collision, the first build in either run to pass all 11 hidden checks, with no tests. B's and C's reviews crossed between Precios and Catálogo too, but only with a search typed or a subject chosen, and the collision only shows when a screen opens from its initial state, with an empty search. The lens says where to cross and not from which state.

Tests again made no difference to what shipped. The one build that caught the crash had none. B's inline snapshots pin a private shape (`_tag`, `note`, `text`), and one of its tests passes when the guard it names is removed. C's three tests go red under every mutation the judges tried.

Design stayed at 7 in every arm, as expected: the change touched verification only. With 18 design scores across the two runs, the number is stable, so a design change that moves it will show.

What it does not settle: one run per arm, so one build out of three finding #40 could be chance; the proof judges did not check the review sequences unless they chose to; and the program design that prescribed the colliding query was still in the inputs.

## Eval findings

- **The lens needs the starting state.** Proposed wording: "into and out of every screen or entry point that shares state with the change, starting from each one's initial state". It needs another replay before it counts.
- **Correctness judges need the same lens.** Opus has now missed #40 in five of five builds that had it, while checking every example carefully. Give `council/correctness.md` the sequences rule instead of swapping the model.
- **Judges must not score the arm's test policy.** `council/design.md` and `council/proof.md` should say the test policy comes from the arm and is not judged as design or as missing evidence.
- **Proof judges should check the sequences** the proof lists, not only the examples.
- **Hidden check H7 misses the header failure.** It passes a build that hides a returned comparison behind a header read. Consider rewording it, or adding a check that a header failure leaves the answer visible.
- **The reference build (run-7, Fable high, without the program design) is still running.** It will settle the hand-typed URL scope and anchor the design scale.
- **Cost:** 3 builds, 3 hidden-check runs, 27 judges and 3 verifiers, about 1 h 20 min from launch to the last verification, longer than the pilot because the builds drove sequences and the machine was shared with the reference build.
