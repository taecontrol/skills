# despensa-precios: Sol max ultrafast, 2026-11-18 (pilot, phase 1 only)

- **Configuration:** lead and implementer `gpt-6.2-sol max ultrafast`, reviewer `gpt-6.2-astra high`.
- **Council:** `claude-opus-5-5 high`, `claude-fable-5-2 high`, `gpt-6.2-astra high` per area. Hidden checks by `claude-sonnet-5-5 high`. Disputed bugs rerun by `claude-fable-5-2 high`.
- **Skills:** installed copy identical to `taecontrol/skills` at `d4db062` (deliver, refine and strategic-programming checked).
- **Case:** `despensa-precios` at base `7c53585`, phase 1 only. One run per arm.
- **Arms:** run-1 was A, run-2 was B, run-3 was C. Judges did not know.

## Scores

Scores are the council's median, followed by the lowest and highest score in parentheses.

| | A, no tests | B, expect tests | C, current flow |
|---|---|---|---|
| Hidden checks, phase 1 | 10 / 11 | 10 / 11 | 10 / 11 |
| Confirmed bugs (critical / major / minor) | 1 / 2 / 2 | 1 / 2 / 2 | 1 / 1 / 2 |
| False proof claims | 0 of 17 | 0 of 17 | 0 of 17 |
| Correctness score | 9 (8–10) | 9 (8–10) | 8 (4–9) |
| Design score | 7 (6–7) | 7 (6–7) | 7 (7–8) |
| Proof score | 9 (8–9) | 9 (9–9) | 9 (9–9) |
| Tests added (files / cases) | 0 / 0 | 1 / 4, inline snapshots | 1 / 4 |
| A judge's deliberate break of the null-USD rule | all 318 tests stay green | a test goes red | a test goes red |
| Diff | 12 files, +1614 | 17 files, +1606 | 17 files, +1698 |
| Commits | 1 | 1 | 7 |
| Build time, approximate | 13 min | 22 min | 18 min |

Phase 2 was not run in the pilot.

## Confirmed bugs

Every bug below was rerun from a fresh seed at 390×844 and 1440×900 by the verifier.

**In all three arms**
- **Critical: Catálogo crashes after Precios.** The Precios picker caches `list_products {limit: 20}` under the same query key as Catálogo's paged list, so opening Catálogo after Precios replaces the app with "Something went wrong!", and in the reverse order the picker lists no products. This is the bug that reached production in the real delivery (#40). Found by hidden check H1 in all three arms. Among the judges, Astra found it in design for A and B, and Fable in correctness for C; the other seven correctness and design judges missed it.
- **Minor: a hand-typed `cadena=365` is dropped.** The router parses the value as a number and the validator accepts only strings. The app's own links (`cadena=%22365%22`) work.

**A, no tests**
- **Major: one "Reintentar" leaves a false offline alert** and a disabled chain Select after a failure on a chain-filtered page; a second press recovers.
- **Major: a long unbroken product name overflows the empty state at 390 px** (`main.scrollWidth` 512). The verifier rated it major because the calendar reaches it; the name it needs, 70 characters with no space, is contrived.
- **Minor: ARS cannot be chosen when every purchase in the period lacks a rate.** The proof records it as a deliberate choice; the spec disables the toggle only when no figure has a currency.

**B, expect tests**
- **Major: changing an applied period applies the wrong range.** With 1–7 Oct applied, picking 15 and 20 Oct applies 1–20 Oct. Reachable through the app.
- **Major: a chain name of about 12 characters or more overlaps the currency toggle at 390 px.**
- **Minor: the no-rate line repeats a date** when two unrated purchases share a day.

**C, current flow**
- **Major: one "Reintentar" leaves a false offline alert** and an incomplete chain Select, the same bug as A's.
- **Minor: a chain-filtered empty state says the subject had no purchases** in the period, although other chains had some.

## Where the judges disagreed

- **Correctness spread.** Opus gave 10, 10 and 9 and found one minor bug in total. Astra gave 8, 8 and 8 and found most of the edge cases. Fable gave 9, 9 and 4; its 4 is the only correctness judgment that found the critical crash.
- **Run-2's calendar.** Astra reproduced the wrong-range bug and Opus reported the calendar working; the verifier reproduced Astra's steps at both sizes.
- **E7, paid in the selected currency.** One proof judge marked run-2's E7 claim false because paid stays in ARS. All three arms made the same choice and disclosed it, the operation returns paid only in ARS, and the accepted prototype shows ARS. It is the spec ambiguity the real delivery also hit, so it is not counted as a false claim.

## What this run says

On the first build, the three ways of verifying shipped the same product: the same 10 of 11 hidden checks, the same critical crash, two or three other real bugs each, the same design score, and proofs that were all honest. Writing tests first did not stop the bug that reached production, and neither did snapshots, because nothing in any arm rendered two screens in sequence. The bugs the council found are interaction and layout edges that a unit-level test would not have reached either.

The tests showed their value as protection, not as discovery. In A a judge broke the null-USD rule and all 318 tests stayed green; in B and C the same break turned a test red. That difference only pays off when someone changes the code later, which is phase 2.

What it does not settle: one run per arm, so a difference of one bug is noise; phase 2 did not run; and only one configuration was tried.

## Eval findings

- The case is not saturated: every arm missed a real critical bug, so it still separates good from perfect.
- Correctness judges vary a lot by model. The hidden checks caught what seven of nine judges missed, and the verifier step was needed to settle disagreements.
- Fixed during the run: judges and checkers now work in their own copy of the worktree, because the product keeps its database in the checkout; hidden check H7's wording was ambiguous and was rewritten; the brief now asks the proof to say how to seed the data.
- Cost: 3 builds, 3 hidden-check runs, 27 judges and 3 verifiers, about 50 minutes from launch to the last verification.
