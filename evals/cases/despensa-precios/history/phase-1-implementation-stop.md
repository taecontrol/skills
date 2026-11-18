<!-- VERBATIM: .work/20-compare-prices-app/implementation-stop.md, written by the first Sol implementation delegate, printed by cat in <transcript> at 2026-11-03T13:18:25Z. -->
# Implementation stop: paid currency

The implementation brief requires stopping if an example conflicts with the code or raises an unanswered product question.

E7 asks for the purchase's paid total and price per measure in the selected currency. `Observation` in `src/operations/prices/wire.ts` exposes `paid` as an ARS number, `rate` as nullable cents internally, and `price` with ARS and USD per measure. There is no returned paid USD total.

The accepted prototype (`proto-src/prices.tsx`, lines 866 and 918) always formats `purchase.paid` as ARS, including in USD mode. The spec's outcome also says every figure is returned by `compare_prices`; E17 prohibits recomputing returned figures, and backend changes are out of scope.

The owner must decide whether E7 should preserve paid ARS as in the prototype, or whether conversion of this total is an explicit exception (or a separately approved backend contract change). No choice was made by the implementer.

E5 was observed red because the figure module was absent, committed separately, and made green. Unfinished implementation code is preserved in `implementation-draft/`; it is not shipped or registered. The draft is incomplete and has not passed gates. In particular its temporary paid-ARS rendering is not an accepted resolution of E7.

No development server, browser, remote D1, push, PR, or merge was started.
