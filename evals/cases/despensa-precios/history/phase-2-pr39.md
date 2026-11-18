<!-- COMPILED from transcripts. Sources: deliver lead <transcript> (delegate completion messages quoted at the timestamps below, plus the lead's own fixes); shaping thread f7afe096-56fe-4066-b1a6-e58eaf91c9c1.jsonl in the same folder; Codex sessions <transcript> (Sol implementation), 12-39-42-*, 12-47-22-*, 12-57-16-*, 13-04-00-*, 13-10-48-*, 13-15-26-* (reviews and fixes). Findings are restated close to the reviewer's words; nothing was added. -->

# Phase 2 (#32, PR #39): what went wrong before merge

Base: `9c93fcd` (phase 1 merged). Merged as `51c98fe` (squash). Roles: deliver lead Claude Opus 5.5; implementer GPT-6.1 Sol; reviewer GPT-6 Astra, read-only.

Timeline: lead committed the E5/E8 acceptance tests red (`tests/catalog-kinds-app.test.ts`, `src/web/catalog/kind-draft.ts`) → Sol implemented (`5301bbe`, `e82476d`; 162 PNGs) → Astra round 1: 1 blocker, 3 should-fix (15:46Z) → lead fixed the README, Sol the rest (`0ec3d86`, `244dc86`, `69501c6`) → Astra round 2: 1 should-fix (16:01Z) → lead fixed (`f2587b0`) → Astra round 3: 1 should-fix (16:08Z) → lead fixed (`b3df8b3`) → Astra re-check: 1 should-fix (16:12Z) → lead fixed (`44645a5`) → Astra re-check: no open findings (16:16Z) → PR #39 → merged.

Found while prototyping and written into the spec as E14: in #31's product ficha the failure Alert's buttons («Reintentar», «Volver al catálogo», «Abrir «…»») sat inside the `<form>` without `type="button"`. The pestanas prototype showed the bug for real: «Volver a los tipos» submitted the rename form again. In production Sol could not reproduce a double write (Reintentar sent 1 `update_product` before and after; Volver and Abrir sent 0). The buttons got `type="button"` anyway.

## R1-1. Blocker: closing the ficha mid-merge drops the filter instead of moving it (E13)

- **Where:** `src/web/catalog/kind-sheet.tsx:198` (round-1 code).
- **Reproduce:** in Productos, filter by kind A → open A's ficha → merge A into B → close the ficha while the `merge_kinds` response is in flight → let the real `200` arrive. Wrong: because `mounted.current` is false, `onMerged` never runs; invalidation removes A and the screen shows «Se quitó el filtro».
- **Expected (E13):** when the filtered kind is merged here, the filter moves to the kind that stayed (B), even if the ficha was closed before the answer arrived. A late answer must not reopen the ficha. The same holds for rename (the chip follows the new name) and delete (the filter clears without the "ya no existe" notice).
- **Fix (`0ec3d86`):** the catalog page records the outcome of pending kind writes whether or not the ficha is still open; only the ficha's own update and navigation stay behind the mount guard.

## R1-2. Should-fix: a failed first `list_kinds` leaves a filtered catalog loading forever

- **Where:** `src/web/catalog/catalog-page.tsx:77`.
- **Reproduce:** open a URL with `tipo=<kindId>` and no cache, and make `list_kinds` fail. `list_products` stays disabled and pending (`list_kinds: error/idle`, `list_products: pending/idle`), and the screen shows «Cargando el catálogo…» with no error and no retry.
- **Expected:** the existing failure Alert with «Reintentar», which reads the kinds again and then resolves the filter and its products.
- **Fix:** `244dc86`.

## R1-3. Should-fix: the merge comparison mixes a fresh name with a stale one

- **Where:** `src/web/catalog/kind-sheet.tsx:280`.
- **Reproduce:** open "leche" → "Unir con otro tipo" → pick "leche entera"; meanwhile Ana renames the target to "leche completa"; refresh the kinds and pick it. Wrong: the card says «Queda / leche completa» but the button says «Unir en «leche entera»». The cards read from `kinds` while `keep` kept `view.other`.
- **Expected:** both candidates are resolved by id from one fresh source, used by the cards, the button and the result notice.
- **Fix:** `69501c6`.

## R1-4. Should-fix: the README still says kind actions are agent-only

- **Where:** `README.md:114`. "Using the app" announced the new kind actions and the next sentence still said "renaming, merging or deleting kinds are only available through an agent".
- **Expected (E16):** the sentence keeps only the purchase restriction: "For now, correcting or deleting a recorded purchase is only available through an agent."
- **Fix:** by the lead (sed on that sentence).

## R2-1. Should-fix: «Unir con «…»» needs two taps when the taken name is a kind not yet loaded

- **Where:** `src/web/catalog/kind-sheet.tsx:255`.
- **Reproduce:** open «detergnte»; Ana creates a new kind through another `update_product` call; rename «detergnte» to that name → the server correctly answers `KindNameTaken`. Tap «Unir con «…»». Wrong: `compare()` calls `retryKinds()` and returns; even after the read completes the form is still shown, and only a second tap opens «¿Cuál queda?». Phone and desktop.
- **Expected (E6):** one tap waits for the needed read, resolves the candidate by id and opens «¿Cuál queda?» with both kinds. If the read fails, keep the typed name and show the failure. No extra `rename_kind`.
- **Fix:** `f2587b0` ("Open the kind comparison on the first tap when the taken name is new here").

## R3-1. Should-fix: the pending comparison opens after the member pressed «Descartar»

- **Where:** `src/web/catalog/kind-sheet.tsx:262`.
- **Reproduce:** «detergnte» ficha; create a kind through another HTTP call; rename to it → `KindNameTaken`. Hold the `list_kinds` read, tap «Unir con…», then «Descartar» (the field returns to «detergnte» and the conflict goes away), then release the read. Wrong: «¿Cuál queda?» opens with the discarded kind. `mounted.current` is still true; nothing checks that the intent is still current.
- **Expected:** typing, «Descartar», or switching flow cancels the pending comparison; the continuation checks it still matches the current intent before applying.
- **Fix (`b3df8b3`, by the lead):** a ref to the current `failure`, updated in a layout effect, checked before continuing. The lead extended `.work/evidence32/r2-capture.mjs` with this variant and confirmed it fails on the previous code.

## R3b-1. Should-fix: opening a product does not cancel the pending comparison

- **Where:** `src/web/catalog/kind-sheet.tsx:269`.
- **Reproduce:** trigger the conflict with an uncached `limpieza` → tap «Unir con «limpieza»» while holding `list_kinds` → open Detergente Magistral from the kind ficha → release the read → go back to the kind. Wrong: «¿Cuál queda?» shows instead of the edit form that was left. `onOpen` does not clear `failure`; the product sheet keeps `KindSession` mounted, and `key={ficha}` does not change.
- **Expected:** back on the kind you see the typed name and «Ya existe el tipo «limpieza».», as you left it.
- **Fix (`44645a5`, by the lead):** a counter that increments each time a product opens; the continuation compares against the captured value. The browser script reproduces it at both sizes, fails on `b3df8b3` and passes with the fix. Final Astra re-check: no open findings.

## Not caught: Catálogo still shares the product-list cache key with Precios

PR #39 kept `catalogListQuery`'s key `["list_products", { ...input, limit: 20 }]` and reused the paged list for the kind ficha's "Productos" with "Ver más". The collision with Precios' picker (introduced in phase 1) survived this PR and was fixed in #40; see `fix-40-catalogo-after-precios.md`.
