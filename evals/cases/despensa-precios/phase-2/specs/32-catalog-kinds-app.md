# Tidy kinds from the app

Status: Accepted (owner, 2026-11-03)
Issue: https://github.com/taecontrol/despensa/issues/32 (part 2 of #16; part 1, products, is #31, merged in PR #36)

## Problem

Agents create kinds by name while recording purchases, so the kind list collects misspellings and duplicates that mean the same thing ("detergnte", "leche" next to "leche entera", "papel higienico" next to "papel higiénico") (`reported`, `docs/design/catalog.md`, "Domain meaning" and "Open risks"). Kinds drive the shopping list (#10), restock rhythm (#11) and price comparison (#9, #20), so a duplicate kind splits each of those views in two (`reported`, catalog design). #8 added `list_kinds`, `rename_kind`, `merge_kinds` and `delete_kind`, but only over MCP and HTTP. The app's Catálogo (#31) lets a member set a product's kind but not see, rename, merge or delete kinds (`observed`, `src/web/catalog/`). Today a member who spots a bad kind has to ask an agent (`observed`).

## Outcome

In the app, on a 390 px phone and on the computer, a household member sees every kind with how many products it has and which ones, filters the products by kind, renames a kind, merges two kinds knowing it cannot be undone, and deletes a kind no product has. The screens use the #8 operations as they are (issue #32; ADR-0004).

## Out of scope

- New operations, schema changes or migrations (ADR-0004).
- Undoing a kind merge (the design makes it irreversible), kind groups, aliases, icons, duplicate suggestions, bulk actions, a search field in the Tipos tab, sorting other than by name.
- Saying what a merge or delete does to the shopping list: the owner asked to leave it out (2026-11-03).
- Telling the member that a merged kind's name becomes free and is created again if something is classified under it (an accepted risk in `docs/design/catalog.md`, "Open risks"; the approved prototype does not say it).
- Offline writes (`AGENTS.md`).

## Examples

Data for the examples: the catalog of #31 plus two products, with these kinds and current product counts: arroz 2, detergnte 1 (Detergente Magistral limón 750 ml), fideos 0, lavandina 1, leche 1 (LECHE SERENISIMA ENT 1L), leche descremada 0, leche entera 1 (Leche entera La Serenísima 1 l), papel higienico 1 (Papel higiénico Higienol 4 rollos x 30 m), papel higiénico 1 (Papel higiénico Elite doble hoja 4 rollos x 30 m), queso cremoso 1, tomate 1, yerba 1 (Yerba mate Playadito 1 kg), yerba mate 1 (Yerba Taragüí 500 g). Strings in «» are the UI text; `{count}` reads "1 producto", "N productos" or "Sin productos".

Finding kinds

- **E1** `capture`: Catálogo has shadcn Tabs "Productos" and "Tipos": under the title on the phone (full width), beside it on desktop. "Productos" is #31's screen. "Tipos" lists every kind from `list_kinds`, sorted by name, one-line rows with a chevron and `{count}` on the phone; on desktop a two-column table (Tipo, Productos) with the number. A kind with none reads «Sin productos», muted. The tab is in the URL and Back returns to the other tab.
- **E2** `capture`: On desktop, a click anywhere on a row, including the count cell, opens its ficha, in the Tipos table and in the Productos table (#31's table too). The name stays a focusable button for the keyboard, and one click opens the ficha once. On the phone the whole row is tappable.
- **E3** `capture`: In "Productos", a "Tipo" chip next to "Sin tipo" and "Sin compras" opens the kind list: a Popover with a Command list on desktop, a Drawer on the phone. The list has «Buscar tipo» (ignores accents and case: "higienico" finds "papel higienico" and "papel higiénico"), «Quitar el filtro», and every kind with its count, empty ones as muted «Sin productos». Choosing "leche entera" sends `list_products { kind }`, the chip reads "leche entera", and only Leche entera La Serenísima 1 l is listed. Choosing a kind turns "Sin tipo" off and the reverse. The chosen kind is in the URL. "fideos" shows «No hay productos con estos filtros» with "Quitar filtros".

The kind ficha

- **E4** `capture`: Tapping a kind opens its ficha, a Drawer on the phone and a modal Sheet on desktop like the product ficha. The header shows the name and `{count}`. Then: "Nombre" with "Guardar" ("Descartar" appears once the name is edited); "Productos", listing the kind's products (`list_products { kind }`, with "Ver más" as the catalog has when there are more), each opening that product's ficha with a back arrow to the kind, hidden when the kind has none; and "Unir con otro tipo" plus "Borrar" (only with 0 products; otherwise «No se puede borrar porque tiene 2 productos.»).
- **E5** `test` + `capture`: Renaming "detergnte" to "detergente" and tapping "Guardar" sends one `rename_kind { kindId, name: "detergente" }`; the ficha shows «Guardado», and the Tipos list, the filter list and Detergente Magistral's kind show "detergente". "arroz" → "Arroz" (capitalization only) is a change and saves. The name is sent trimmed; an unchanged name sends nothing; an empty name blocks "Guardar" with «Escribí un nombre.». "Descartar" restores the saved name.
- **E6** `capture`: Renaming "yerba mate" to "Yerba" answers `KindNameTaken` naming "yerba": «Ya existe el tipo «yerba».» «Si son lo mismo, unilos.» with "Unir con «yerba»", which opens «¿Cuál queda?» with both kinds. The typed name stays.

Merge

- **E7** `capture`: "Unir con otro tipo" in "leche"'s ficha opens «Unir «leche» con…»: the other kinds with their counts and «Buscar tipo» (ignoring accents). Picking "leche entera" opens «¿Cuál queda?»: two cards stacked at every size, each with the name, `{count}` and up to 3 product names («y N productos más» beyond), none preselected; "Unir" reads «Elegí cuál queda» and is disabled. Choosing "leche entera" marks it "Queda" and the other "Desaparece" with its name struck through, shows an Alert titled «No se puede deshacer» with no body, and the button reads «Unir en «leche entera»». There is no further confirmation.
- **E8** `test` + `capture`: «Unir en «leche entera»» sends `merge_kinds { kindId: <leche>, intoKindId: <leche entera> }`. The ficha shows "leche entera" with «2 productos», ««leche» se unió a este tipo. Pasó 1 producto.» (from `moved`; «Pasaron N productos.» for more, nothing after the first sentence for 0), and both products under "Productos". "leche" is gone from the Tipos list and the filter list.

Delete

- **E9** `capture`: "Borrar" in "fideos"'s ficha asks in an AlertDialog «¿Borrar el tipo «fideos»?» with "Cancelar" and "Borrar". Confirming sends `delete_kind`, closes the ficha, removes the row and shows «Se borró el tipo «fideos».» on the Tipos list.

Failures and retries

- **E10** `capture`: If Ana merged or deleted "leche" meanwhile, any write from its ficha answers `KindNotFound`: the name field is disabled, the actions go away, and the ficha shows «Este tipo ya no existe. Puede haberse unido a otro tipo o eliminado.» with "Volver a los tipos", which closes the ficha and shows the refreshed list (leche entera: 2 productos). The same message answers a retried "Unir" or "Borrar" whose first response was lost (the design returns `KindNotFound` once the source kind is gone).
- **E11** `capture`: If Ana gave "fideos" a product meanwhile, "Borrar" answers `KindHasProducts`: the dialog says «No se puede borrar porque ahora tiene 1 producto.» with "Cerrar", and the ficha refreshes.
- **E12** `capture`: Saving offline keeps the typed name and shows «Sin conexión con Despensa. Revisá tu conexión a internet.» with "Reintentar"; nothing is queued. The same holds for "Unir" and "Borrar".
- **E13** `capture`: When the kind chosen in the "Tipo" filter is renamed, the chip follows the new name; when it is merged here, the filter moves to the kind that stayed; when it is deleted here, the filter clears. When it is gone for another reason (Ana, or `list_products` answers `KindNotFound`), the filter clears with «El tipo «leche» ya no existe. Se quitó el filtro.».
- **E14** `capture`: A button inside a failure Alert never submits the form around it. In the product ficha (#31), "Reintentar" after an offline save sends exactly one `update_product`, and "Volver al catálogo" or «Abrir «…»» send none; the same in the kind ficha. Reproduce the current behavior first and show the request count before and after in the pull request. The buttons get `type="button"` either way; if the double request does not reproduce in production, the pull request says so.
- **E15** `capture`: Every screen and state above works and looks right at 390 × 844 and 1440 × 900, matching the accepted prototype, with the five destinations of `main` unchanged. Only shadcn/ui controls; every string comes from `src/web/i18n.ts`.
- **E16** `capture`: README "Using the app", "Catálogo": says the catalog also lists kinds, filters products by kind, and renames, merges (no undo) and deletes kinds. The MCP tool list is unchanged.

State space for kind writes (the server's rules: `docs/design/catalog.md`, "State space"):

| Outcome \ Action | Guardar (`rename_kind`) | Unir (`merge_kinds`) | Borrar (`delete_kind`) |
|---|---|---|---|
| Success | E5 | E8 | E9 |
| Lost response, retry | same name again, same result | `KindNotFound` → E10 | `KindNotFound` → E10 |
| Partner merged or deleted it meanwhile | `KindNotFound` → E10 | `KindNotFound` (either kind) → E10 | `KindNotFound` → E10 |
| Partner renamed it meanwhile | last writer wins; `KindNameTaken` if the names now collide → E6 | merges by id, unaffected | deletes by id, unaffected |
| Partner gave it a product meanwhile | — | moved count includes it | `KindHasProducts` → E11 |
| Offline | E12 | E12 | E12 |

## Test boundary

- **Where the tests run:** `test` examples (E5, E8) run in `vp test` against the local Worker runtime and a real local D1, over HTTP (`tests/agent.ts`). As with #31's `draft.ts`, the mapping from the rename form to `rename_kind`'s input and from the «¿Cuál queda?» choice to `merge_kinds`'s input lives in a pure module under `src/web/catalog/`, and the tests import it. The operations' own behavior is already proven in `tests/catalog.test.ts`; the screens are proven by `capture`.
- **Real target for captures:** the app built and served locally with the Worker and a local D1 seeded with the data above through the operations (never the owner's data), in Chromium at 390 × 844 and 1440 × 900, with screenshots of every example in the pull request. `KindNotFound` and `KindHasProducts` are produced for real by a second HTTP call; offline by cutting the browser's network. E14 counts requests in the browser's network log.
- **Stand-ins:** none.

## Decisions

- **Prototype "pestanas" (A), chosen by the owner 2026-11-03**, with the changes the owner asked for and saw: a click anywhere on a row opens the ficha; a "Tipo" filter in Productos as in prototype C (no kind actions above the products). The kind ficha shows the kind's products (part of the approved design). Reference: the prototype's NOTES and screenshots.
- **Merge needs no extra confirmation:** the «No se puede deshacer» Alert and the explicit «¿Cuál queda?» step are enough (owner, 2026-11-03).
- **No shopping-list lines** in merge or delete (owner, 2026-11-03).
- **Search ignores accents; kinds keep them.** The pickers' search matches "higienico" to "higiénico" so duplicates that differ by an accent can be found; kind identity stays as the design says (accents kept).
- **No new operation, schema or migration.** `architect`: `No-architecture-decision`. The change adds no persisted data, write contract or security boundary; the write contracts it uses, with their retry and concurrency outcomes, are accepted in `docs/design/catalog.md`.
- **Program design: gated out.** The screens follow #31's pattern: the `/catalogo` route with search params, `readQuery` and `writeMutation` (ADR-0009), the ficha as Drawer below 1024 px and Sheet above, a pure form-to-input module.
- **Additions to the issue, for the owner to confirm with the spec:** E2's whole-row click also on #31's Productos table (the owner asked for it after trying the prototype, and the same stretched-overlay pattern is in production), E14's fix of failure buttons that submit their form (found while prototyping; `assumed` in production until reproduced), and E16's README update (the orchestrator's rule since the README rewrite, PR #37: a pull request that changes the app's screens or MCP tools updates the matching README section in the same pull request).
- **Switching tabs pushes a history entry,** so Back returns to the other tab, as in the approved prototype.
- **Reversible choices left to delivery:** search param names (for example `tab=tipos`, `tipo=<kindId>` for the filter, `ficha=<kindId>`, `producto=`), module names, whether the kind list reuses the catalog's query cache.

## Rabbit holes

- **Stretched links in table rows.** `position: relative` on a `<tr>` is not a containing block in every engine, so an `after:absolute` overlay can leave only the name clickable. Put the click on the row and keep one focusable control per row, so a click opens once.
- **Radix Tabs fire twice** (pointer down, then focus) in the prototype; switching tabs must push one history entry.
- **Three navigation levels** (kind ficha → product ficha → back) and Back: each step is one history entry, as `producto` is today.
- **Shared files:** `src/web/catalog/*`, `src/web/router.tsx`, `src/web/i18n.ts` and `README.md` change often; rebase and keep other threads' work.

## Context

- Issue #32 (this), #16 (parent), #31 / PR #36 (products screens and patterns: `draft.ts`, `product-session.ts`, `failure.tsx`), #8 (operations), ADR-0004, ADR-0009.
- `docs/design/catalog.md` (kinds, operations, state space), `docs/design/shopping-list.md` (list items that name a kind).
- `src/operations/catalog/{list-kinds,rename-kind,merge-kinds,delete-kind,list-products}.ts`, `src/worker/catalog/kinds.ts`, `src/web/catalog/*`, `src/web/router.tsx`, `src/web/i18n.ts`, `tests/catalog.test.ts`, `tests/agent.ts`, `README.md`.
- Prototype: `.work/prototypes32/pestanas/` (NOTES.md, kinds.tsx, kind-filter.tsx, shots/), build `/tmp/despensa16-proto/k-pestanas/index.html?s=<scenario>`; brief `.work/prototypes32/BRIEF.md`; judge `.work/prototypes32/judge/VERDICT.md`.

## Open questions

None.
