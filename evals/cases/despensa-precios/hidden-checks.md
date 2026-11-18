# Hidden checks

You check one build of Despensa against a fixed list. The worktree path is named at the end of this brief. Leave the worktree as you found it: notes, scripts and captures go outside it.

- **Launch** the product with `vp dev` on a port nobody else is using, and seed it the way the worktree's `.work/<phase>/proof.md` says. When that seeding does not give the spec's data, mark every check marked `data` as `blocked`.
- **Drive it** in Chromium at 390×844 and at 1440×900. A check passes only when it passes at both sizes.
- **Make a failure happen** by blocking or delaying a request in the browser, such as `/api/list_kinds`. Play a second household member by calling the HTTP API yourself.
- **Judge each check by its expected result alone.** Markup and layout may differ from build to build; the behavior is what counts.

Answer with one JSON object:

```json
{ "checks": [ { "id": "H1", "result": "pass|fail|blocked", "evidence": "what you saw, with a capture path" } ] }
```

## Phase 1: Precios

Run these after phase 1, and again after phase 2.

- **H1, Catálogo after Precios.** Open Precios with an empty search, then go to Catálogo through the navigation without reloading. Expected: Catálogo lists its products. Then reverse it: Catálogo first, then Precios. Expected: the Precios picker lists products.
- **H2, Back from another screen.** Open `/catalogo?q=arr`, go to Precios through the navigation, press Back. Expected: `/catalogo?q=arr` with "arr" in the search box. Forward then Back shows the catalog entry was not replaced.
- **H3, `data` Only unrated purchases, in ARS.** Open arroz with `desde=2026-11-03&hasta=2026-11-03&moneda=ars`. The only purchase in the period has no dollar rate. Expected: no chain carries a "cheapest in US$" badge, no caption says the order follows the USD median, and best deals explains there are no rated purchases instead of claiming one.
- **H4, Calendar draft.** Open yerba with the period 15 Oct to 3 Nov 2026, which is empty. Open the calendar from the empty state, change the end date, close it without applying, then reopen it the same way. Expected: the calendar shows the URL's period, 15 Oct to 3 Nov.
- **H5, `data` Filtered empty.** Open arroz with only `desde=2026-11-04`. Expected: the message describes the period filter. It never says arroz was never bought, because it has 12 earlier purchases.
- **H6, Phone period label.** At 390 px with the yerba period above, the period control's label reads in full ("15 oct a 3 nov"), and the period, chain and currency controls stay on one row.
- **H7, Header failure.** Open a kind and make `list_kinds` fail while `compare_prices` succeeds. Expected: no prices are shown with the currency toggle still enabled, "Cambiar" stays reachable, and "Reintentar" reads again.
- **H8, `data` No made-up dollars.** In USD mode, the arroz purchase of 3 Nov 2026 shows its ARS figure marked "sin cotización", never a dollar number or zero. In ARS mode it keeps the marker.
- **H9, Figures equal the operation.** For arroz, call `compare_prices { kindId }` over HTTP and compare it with the screen: every chain's figure, the chain order, and the median line in USD and in ARS. Expected: they are equal, and no figure has been rounded or re-sorted.
- **H10, Paid is never converted.** In USD mode, each purchase row's paid amount is the ARS amount the operation returned, or it is absent. A dollar figure for paid would have to be computed on the screen, and the spec forbids that.
- **H11, Invalid URLs.** Open `/precios` with both `tipo` and `producto`, then with a reversed period, then with an invalid date. Expected: each invalid part is dropped from the URL, the network log shows no `compare_prices` call carrying it, and no error appears.

## Phase 2: kinds

Run these after phase 2, together with phase 1's checks.

- **H12, Catálogo and Precios still share no cache.** Repeat H1, then open a kind's ficha and its products list, and the merge products dialog, after visiting Precios. Expected: each lists its products.
- **H13, Merge while the ficha closes.** In Productos, filter by kind A, open A's ficha, merge A into B, and close the ficha while the `merge_kinds` response is delayed; then let it arrive. Expected: the filter moves to B. The ficha does not reopen.
- **H14, Kinds fail on first load.** Open a Catálogo URL filtered by a kind, with no cache, while `list_kinds` fails. Expected: a failure message with "Reintentar", which loads the kinds and then the filtered products. Endless loading fails the check.
- **H15, Fresh names in the merge comparison.** In "leche"'s ficha, start "Unir con otro tipo" and pick "leche entera". Meanwhile, rename "leche entera" to "leche completa" over HTTP, refresh the kinds, and pick it again. Expected: the cards, the button and the result notice all say "leche completa".
- **H16, One tap to compare.** Create a kind over HTTP, then rename "detergnte" to that kind's name in the app, so the answer is `KindNameTaken`. Tap the merge action once. Expected: "¿Cuál queda?" opens with both kinds after one tap, and no extra `rename_kind` is sent.
- **H17, Discard cancels the comparison.** Repeat H16, but hold the `list_kinds` read, tap the merge action, tap "Descartar", then release the read. Expected: "¿Cuál queda?" does not open.
- **H18, Opening a product cancels the comparison.** Repeat H16, but hold the `list_kinds` read, tap the merge action, open a product from the kind's ficha, release the read, and go back to the kind. Expected: the edit form with the typed name and the name-taken message, as it was left.
- **H19, `data` Merge result.** Merge "leche" into "leche entera". Expected: the ficha shows "leche entera" with 2 products and the notice that "leche" joined it and 1 product moved; "leche" is gone from the Tipos list and from the filter list.
- **H20, Alert buttons do not submit.** In the product ficha and in the kind ficha, save offline, then press "Reintentar" with the network back. Expected: exactly one write request. The ficha's other alert buttons send none.
- **H21, README.** The README's "Using the app" section lists the kind actions, and no sentence still says renaming, merging or deleting kinds needs an agent.
