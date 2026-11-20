<!-- COMPILED from transcripts. Sources: deliver lead <transcript> (delegate completion messages quoted at the timestamps below); implementation report section "Review round 1" (cat at 14:00:34Z in the same file); Codex sessions <transcript>, 10-18-53-*, 10-36-15-*, 10-43-19-*, 10-56-17-*, 11-00-20-*, 11-05-34-*. Findings are restated close to the reviewer's words; nothing was added. -->

# Phase 1 (#20, PR #38): what went wrong before merge

Base `7c53585`. Merged as `9c93fcd` (squash). Roles: deliver lead Claude Opus 5.5; implementer GPT-6.1 Sol; reviewer GPT-6 Astra running the `refine` review, read-only.

Timeline: Sol stopped on E7 (13:18Z) → Sol implemented (13:35Z, commits `9f283fd` E5 red, `6e3a474` E5 green, `5419a0b` shadcn controls, `cb8f869` screen, `57cac61` README) → Astra round 1: 2 blockers, 3 should-fix (13:42Z) → Sol fixed (`89fd429`, `49ff819`, `fceeaae`, `d4cd8be`) → Astra re-review 1: 1 should-fix (13:59Z) → lead fixed it (`8b400fb`) → Astra re-review 2: no findings (14:05Z) → PR opened, recapture on `a4b194e` → merged.

## S0. Spec ambiguity: E7 "paid in the selected currency"

- **What happened:** E7 says each purchase row shows "product, measure, paid and price per measure in the selected currency". `compare_prices` returns `paid` only in ARS (`Observation.paid` in `src/operations/prices/wire.ts`); the accepted prototype always formats `purchase.paid` as ARS (`prototype/proto-src/prices.tsx` lines 866 and 918); E17 forbids recomputing returned figures. The first Sol run stopped instead of choosing: see `phase-1-implementation-stop.md`.
- **Resolution:** the lead read the spec as "paid stays ARS in both modes" (operation returns only ARS, E17 forbids recomputing, the prototype shows ARS) and relaunched Sol with that reading. The final recapture agent still flagged it: "'Pagado' stays ARS in USD history, as documented by the PR but contrary to E7's literal wording."
- **Check:** in USD mode the "Pagado" figure of a purchase row is the ARS amount returned by the operation, not a converted dollar figure. No USD paid figure is computed anywhere.

## R1-1. Blocker: Precios hijacks Back from another screen

- **Where:** `src/web/prices/prices-page.tsx:41` (round-1 code). A component effect normalized the URL search ("canonicalize invalid params") by looking at the global location.
- **Reproduce:** open `/catalogo?q=arr`, click Precios in the navigation, press browser Back. Wrong: the app redirects to `/precios` and replaces the previous history entry. The effect saw the destination's raw search (`q`) while Precios was still mounted, treated it as invalid and replaced it.
- **Expected:** Back lands on `/catalogo?q=arr` with `arr` still in the search box; Forward and Back again show the catalog entry was not replaced.
- **Fix (`89fd429`):** removed the effect; the `/precios` route canonicalizes its own incoming search in `beforeLoad` (`validatePricesSearch` plus a replacing redirect), so it never runs for another route.

## R1-2. Blocker: an unrated chain is labeled cheapest in US$

- **Where:** `src/web/prices/comparison.tsx:189`, repeated in the desktop branch at line 248.
- **Reproduce (data F):** arroz with `desde=2026-11-03&hasta=2026-11-03&moneda=ars`. Only the 3 Nov purchase is in the period and it has no rate, so every USD median is null and `bestDeals` is empty. Wrong: Coto gets "Más barata en US$" and the caption says the order follows the USD median.
- **Expected:** keep the returned chain order. Show a cheapest badge only when the first chain has a USD median. With no USD median at all, the caption is "Mediana en pesos por kilo, de la cadena más barata a la más cara." "Mejores compras" explains there are no rated purchases to compare; no empty table, no USD claim.
- **Fix:** `49ff819`.

## R1-3. Should-fix: the calendar reopens with a cancelled draft

- **Where:** `src/web/prices/filters.tsx:61`. The empty state's "Cambiar el período" called `setPeriodOpen(true)` directly and skipped the draft reset that the filter button did.
- **Reproduce:** yerba, period 15 oct–3 nov 2026 (empty). Tap "Cambiar el período", change the end to 20 oct, press Escape, reopen through the same action. Wrong: the URL still ends 3 nov but the calendar shows 15–20 oct.
- **Expected:** every way of opening the calendar starts from the URL's period; closing without "Aplicar" discards the draft.
- **Fix (`fceeaae`):** the draft lives in a `PeriodPicker` mounted only while the calendar is open.

## R1-4. Should-fix: a filtered empty result says the subject was never bought

- **Where:** `src/web/prices/prices-page.tsx:212`.
- **Reproduce:** arroz with only `desde=2026-11-04`. Wrong: "Todavía no hay compras de arroz", although it has 12 earlier purchases. The same fallback ignored chain-only filters, and the bounded-period copy omitted the chosen chain.
- **Expected:** the never-purchased message only for an unfiltered empty answer. Filtered empties describe the active filters: bounded, from-only and to-only periods, each with the chain when there is one, plus a chain-only case. Period empties keep "Cambiar el período"; a chain-only empty offers "Todas las cadenas", which clears the chain. The currency toggle stays disabled.
- **Fix:** `d4cd8be`.

## R1-5. Should-fix: the phone period label is cut off

- **Where:** `src/web/prices/filters.tsx:84`. Equal flex shares for the period and chain controls.
- **Reproduce:** `E10-empty-period-390.png` shows "15 oct a 3 …"; the accepted prototype shows "15 oct a 3 nov".
- **Expected:** at 390 px the full short label "15 oct a 3 nov" fits (text width equals client width, 90 px), all filters stay on one row, touch targets are at least 44 px.
- **Fix (`fceeaae`):** the period gets a larger flex share; the chain trigger's size override matches shadcn's `data-size` specificity.

## R2-1. Should-fix: ARS/USD stays enabled when the subject header fails

- **Where:** `src/web/prices/prices-page.tsx:156`.
- **Reproduce:** `compare_prices` succeeds with measures but `list_kinds` or `list_products` (the header query) fails. Lines 170–175 replace the comparison with `ReadFailure`, yet the toggle only looked at the comparison query, so ARS/USD stayed clickable with no prices on screen. Found by reading the control flow, not reproduced live.
- **Expected:** the toggle is disabled whenever no figure is shown, including a header-only failure; "Cambiar" stays reachable and "Reintentar" refetches the failed header query (E15).
- **Fix (`8b400fb`, by the lead):** `disabled={!query.isSuccess || headerQuery.isError || …}`. Astra re-review 2: no open findings.

## Escaped to production: Catálogo crashes after Precios

PR #38's picker reads `list_products` with `readQuery("list_products", { limit: 20 })` when the search box is empty. That key equals the catalog's paged list key from #31, `["list_products", { limit: 20 }]`. No review round caught it, and no test renders two screens in sequence. Fixed after merge in #40 (`ad49f9f`); see `fix-40-catalogo-after-precios.md`.
