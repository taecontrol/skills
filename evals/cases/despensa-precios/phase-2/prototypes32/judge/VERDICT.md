# Verdict: kinds prototypes for #32

Judged against `.work/prototypes32/BRIEF.md` and `docs/design/catalog.md` ("Domain meaning", "Operations", "State space"). For each prototype I read the code and NOTES and looked at every shipped shot. I also drove the builds in headless Chromium at 390 × 844 and 1440 × 900 for anything I doubted. My own evidence is in this folder (`judge/*.png`).

Summary:

| Prototype | Verdict | Blocking defect |
|---|---|---|
| pestanas | **Pass** | none (two small fixes before showing) |
| filas | **Rebuild (bounded, one fix)** | merge picker search can't find the accented duplicate |
| filtro | **Rebuild (bounded, one fix)** | merge warning claims the item is on the shopping list |

Each rebuild is a small fix, not a redesign. Both theses are otherwise faithful and worth showing. The tradeoffs below compare all three, assuming the listed fixes land.

Checks that hold for all three, so I don't repeat them below:

- **Scenarios.** All eight are reachable from the selector, kept in `?s=`, and have a reset.
- **Allowed operations.** Only `list_kinds`, `rename_kind`, `merge_kinds`, `delete_kind` and `list_products` are used.
- **Forbidden inventions.** None: no groups, icons per kind, aliases, duplicate suggestions, bulk actions, merge undo, swipe, drag, toasts, or reading the shopping list.
- **Delete.** Only possible at 0 products. `KindHasProducts` is handled if the partner assigned the kind in between.
- **Accents.** They distinguish kinds in the in-memory API. Renaming "papel higienico" to "papel higiénico" fails with `KindNameTaken` naming «papel higiénico» (`judge/pestanas-accent-rename-taken-phone.png`). A capitalization-only rename ("arroz" → "Arroz") saves (`judge/pestanas-case-only-rename-phone.png`).
- **Merge.** The kept kind keeps its name, and the result reports `moved` ("Pasó 1 producto.").
- **Controls.** Only shadcn/ui. No native select, dialog or confirm, and no bare buttons. The only plain `<a>` elements are the hoja shell's `SidebarMenuButton asChild` links, unchanged from part 1.
- **Part 1 list and ficha.** Unchanged except for each thesis's way in (tabs, a "Tipos" pill, or a "Tipo" chip). The four real destinations are in place, with no kinds destination.
- **Offline.** The typed name is kept and Reintentar works. `KindNotFound` shows the brief's exact copy.

---

## pestanas: Pass

Thesis: Catálogo gets "Productos | Tipos" tabs. Each kind has a ficha (Drawer/Sheet, part 1's `FichaFrame`) with the name form, its products, "Unir con otro tipo", and Borrar only at 0 products.

What holds:

- **Merge is clearly final.** The gone card reads "Desaparece" with its name struck through. An Alert titled "No se puede deshacer" appears, and the button names the survivor: "Unir en «leche entera»" (`shots/unir-4-elegido-*.png`).
- **Result.** The `leche entera` ficha shows 2 products, and "leche" is gone from the list (`unir-5`, `unir-6`).
- **Shopping-list copy is conditional and true.** Merge: "Si está en la lista de compras, pasa a ser «leche entera»." (`kinds.tsx:878`). Delete: "Si está en la lista de compras, queda como texto." (`kinds.tsx:674`).
- **Back/URL.** It goes product ficha → kind ficha → list → previous tab (`atras-*` shots, `catalog.tsx:33-82`).
- **ya-no-existe recovers.** In a live run, "Volver a los tipos" closes the ficha and reloads the list ("leche" gone, "leche entera 2") (`judge/pestanas-ya-no-existe-recupera-desktop.png`).

Non-blocking defects (fix before showing):

1. **Misleading evidence shot.** `shots/ya-no-existe-3-recupera-{phone,desktop}.png` was captured mid-close. It shows a ghost "leche" ficha with the form re-enabled (Guardar/Descartar) and no products or actions. The real behavior is correct (see above). Re-shoot after the close animation.
2. **The phone selector pill covers the "Tipos" tab after a small scroll.** The pill is `fixed top-2.5 right-3` (`main.tsx:89`) and the tabs scroll up under it (`judge/pestanas-scrolled-pill-phone.png`). The brief asks that the selector cover none of the product UI.
3. **Minor: Guardar stays enabled after `KindNameTaken`.** It is gated on `disabled={!dirty || saving}` (`kinds.tsx:524`), so a second tap just fails again. filas disables it until the name changes.

Copy noise:

- **The merge Alert body restates the cards.** "«leche» desaparece y su producto pasa a «leche entera»." (`kinds.tsx:875-877`) repeats the "Desaparece" label, the strikethrough and the button "Unir en «leche entera»". That makes four cues for one fact. The Alert title "No se puede deshacer" plus the list line would be enough, if the owner wants it shorter.
- **The Borrar reason row is always visible.** "No se puede borrar porque tiene 1 producto." (`kinds.tsx:661-668`) shows on every kind with products, right under a header that already says "1 producto". It is the same pattern part 1 uses for purchases, which the owner approved, so it isn't a defect. It is the most repeated line in this design.

## filas: Rebuild (bounded)

Thesis: a dense list (name, count, "…" menu per row) where each action opens one small surface (Dialog ≥ 1024 px, Drawer below). No kind ficha, count only.

What holds:

- **Merge is final.** "No se puede deshacer." sits above "Unir". The consequence line reads "«leche» desaparece y su producto pasa a «leche entera». Si «leche» está en la Lista, pasa a «leche entera»." (`kinds.tsx:768-785`). It is conditional and true.
- **Delete copy is true.** "Si está en la Lista, queda anotado igual." (`kinds.tsx:841`): the item stays with the same name as text.
- **Borrar with products.** It is disabled in the menu with "No se puede: tiene 2 productos." (`no-se-puede-borrar-*`).
- **Failures.** `KindNotFound` disables the field and reloads the list behind it. Offline turns the main button into "Reintentar" (`sin-conexion-*`).

Blocking defect:

1. **The merge picker can't find the accented duplicate.** "Unir «x» con…" uses cmdk's default filter on `value={k.name}` (`kinds.tsx:681-690`, no `shouldFilter={false}`), and that filter does not ignore accents. From «papel higienico», typing "higienico" shows "Ningún tipo coincide" while «papel higiénico» exists (`judge/filas-merge-search-higienico-phone.png`). The representative data has this exact duplicate. The same prototype's product search, from hoja's `fold`, does ignore accents, and pestanas and filtro search with `fold`. Fix: filter with `fold` as the other two do. Whether search should ignore accents at all is the owner's call (see the questions below). Within one prototype the two searches must agree.

Non-blocking:

2. **Phone Back with a surface open leaves Tipos and discards the typed name.** Only `?v=tipos` is pushed (`catalog.tsx:53-58`), so Back with "Renombrar" open lands on Catálogo › Productos (`judge/filas-back-with-rename-open-phone.png`). The hoja base never modeled Back for surfaces either, so this is a tradeoff, not a defect. The owner should know it.
3. **Desktop uses a centered Dialog** (`kinds.tsx:482-490`). Part 1's pattern is a right Sheet ≥ 1024 px. The Dialog is defensible for one-field surfaces and it's allowed, but it is a second desktop pattern in the same screen family.

Copy noise:

- **The ¿Cuál queda? consequence line names the survivor twice.** "…pasa a «leche entera». Si «leche» está en la Lista, pasa a «leche entera»." (`kinds.tsx:768-774`). It is the only place the consequence is stated, so it isn't redundant with other UI, but it reads long at 390 px (`unir-3-elegido-phone`).
- Otherwise the copy is the shortest of the three.

## filtro: Rebuild (bounded)

Thesis: no kinds view. A "Tipo" chip beside "Sin tipo" and "Sin compras" lists every kind with its count (Popover on desktop, Drawer on phone). Choosing one filters the products and shows a kind header with Renombrar, Unir con otro tipo and Borrar.

What holds:

- **Merge.** The cards show up to three product names. The result switches the filter to the survivor ("leche entera", 2 products), and the list no longer has "leche" (`unir-5`, `unir-6`).
- **Rename.** It updates the chip, the URL, the row badges and the ficha's Tipo field (`renombrar-3`, `renombrar-4-ficha`).
- **Search ignores accents.** "higienico" finds both kinds (`tipos-2-buscar-*`).
- **`KindNotFound`.** It replaces the header with the brief's copy plus "Ver los tipos" and "Quitar el filtro" (`ya-no-existe-*`).
- **The part 1 ficha change is justified.** `ficha.tsx:619` now matches the kind field with `nameKey`, an edit to a part 1 file. It aligns the prototype with production: `src/web/catalog/draft.ts:16` `fold` keeps accents, while hoja's prototype `fold` strips them. I don't count it as a defect.

Blocking defect:

1. **The merge warning states something these screens can't know, and states it wrongly.** "«leche» desaparece y su producto pasa a «leche entera», también en la Lista." (`kinds.tsx:750`; `shots/unir-4-elegido-{phone,desktop}.png`).
   - It is unconditional: the screen can't read the list.
   - It says the product moves "in the Lista", but what changes is a list item that names the kind.
   - It contradicts the prototype's own NOTES ("the copy is conditional").
   - Fix: make it conditional and about the item, as the delete dialog already is ("Si está en la Lista, queda como texto.", `kinds.tsx:540`), or drop the list clause.

Non-blocking:

2. **Offline rename shows two retry controls:** "Reintentar" inside the Alert and "Guardar" below it (`kinds.tsx:420-427`; `sin-conexion-phone`).
3. **The empty count reads "0 productos"** (`kinds.tsx:54`; `borrar-phone`). The other two use "Sin productos", matching part 1's "Sin compras".
4. **Phone Back with the merge Sheet open leaves Catálogo.** `?tipo=` is only replaced (`catalog.tsx:61`) and the Sheet isn't in history. This is the same tradeoff as filas #2. The NOTES state it.

Copy noise:

- **"Si no, elegí otro nombre."** (`kinds.tsx:407`) tells the member what the open field already invites.
- **"No se puede borrar porque tiene 1 producto."** (`kinds.tsx:530-533`) sits directly under the header's "1 producto", next to a disabled Borrar. It shows on every kind with products. The NOTES list it as possible noise.
- **The "13 tipos" heading** in the kinds list (`kinds.tsx:117`) counts rows the member can see.

---

## Neutral tradeoffs (all three, assuming the fixes above)

| | pestanas | filas | filtro |
|---|---|---|---|
| Way in | A "Tipos" tab under or next to the title, always visible | A "Tipos" pill after the title; its own view with "← Catálogo" | The "Tipo" chip in the filter row; no separate view |
| Change to the part 1 header | Adds a tab row (about 45 px on the phone) | Adds one small button | Adds a fourth control to the filter row |
| Shows a kind's products | Yes, in the ficha (one more read per open) and on the merge cards | No, only counts. Deciding "leche" vs "leche entera" needs a trip to Catálogo | Yes, by construction (the filtered list is the products) and on the merge cards |
| Taps to rename from Catálogo | Tab → kind → edit field → Guardar | Pill → "…" → Renombrar → Guardar | Chip → kind → Renombrar → Guardar |
| Acting on a kind from the list | Open its ficha | Directly, from the row menu | You must choose it first; the list is a filter, so no per-row actions |
| Surfaces | Part 1's Drawer/Sheet with three navigation levels (kind → product) | Small Dialog/Drawer per action; desktop differs from part 1 (Dialog) | Inline rename in the header, plus part 1's Drawer/Sheet for merge |
| Merge-final cues | Strongest: "Desaparece", strikethrough, Alert, survivor-named button | A line plus "No se puede deshacer."; button just "Unir" | Red-bordered Alert after choosing; button just "Unir" |
| Back/URL | Every step is a history entry; Back unwinds them | `?v=tipos` is pushed; surfaces aren't in history | `?tipo=` is replaced and survives a reload; Back leaves Catálogo |
| Cost to build | Highest: the kind ficha, products section, nested product ficha, history depth | Lowest: one list, three small surfaces | Medium: filter state, kind header, gone-filter path |
| Phone space | A full-height Drawer per kind | 48 px rows; surfaces are short | The header adds about 170 px above the list |

## Product questions each design forces on the owner

Common to all three:

1. **Show a kind's products, or only the count?** pestanas and filtro show them; filas doesn't. The issue asks only for the count. The products are what tells "leche" (LECHE SERENISIMA ENT 1L) from "leche entera".
2. **How final should a merge feel?** The options are an inline warning only (all three today), an extra AlertDialog after "Unir", a destructive-red button, and whether the button names the survivor (only pestanas does).
3. **Shopping-list wording.**
   - Keep a conditional line in merge and delete, or drop it to shorten the copy.
   - Wording differs today: "pasa a ser «x»" vs "pasa a «x»", "queda como texto" vs "queda anotado igual".
   - None mentions that two listed items become one.
4. **Mention the freed name?** After a merge, «leche» is created again if something is classified under it. No design says so.
5. **Should kind search ignore accents?** filtro and pestanas do; filas doesn't (defect above). Production product search (`fold` in `src/web/catalog/draft.ts`) currently keeps accents.
6. **Show "No se puede borrar porque tiene N productos" always, or only when Borrar is tried?** It is always visible in pestanas and filtro and inside the menu in filas.
7. **The label for the kind that goes away.** "Desaparece" with a strikethrough (pestanas), or part 1's "Se une" (filas, filtro).
8. **Search in the kinds list itself.** Only filtro has it, because its list is the picker. The others rely on 13 kinds fitting on one screen.

pestanas only:

9. **Tab history.** Switching tabs pushes an entry (Back returns to the other tab), or replaces it like part 1's filters.
10. **The nested product ficha inside a kind ficha.** It is a third navigation level with a back arrow.
11. **The name field is always editable at the top of the ficha.** The alternative is an explicit "Renombrar" action, as filas and filtro have.

filas only:

12. **A desktop Dialog instead of part 1's Sheet** for its small surfaces.
13. **Where the "Tipos" pill lives:** after the title, in the filter row, or as a row at the end of the catalog.
14. **Count only, or make the count a link** to Catálogo filtered by that kind. That needs a "Tipo" filter in Catálogo, which is filtro's idea.
15. **Should phone Back close a surface first** instead of leaving Tipos?

filtro only:

16. **The phone kinds list:** a Drawer (built) or a Popover under the chip.
17. **Borrar with products:** disabled with a reason (built), hidden, or enabled with the reason shown on tap.
18. **After a merge:** filter by the survivor (built) or return to the unfiltered list.
19. **After `KindNotFound`:** keep the dead filter with "Ver los tipos" / "Quitar el filtro" (built), or clear it automatically with a notice.
20. **Phone actions:** the 3-button row (built) or one "…" menu, which saves about 70 px.
21. **`?tipo=` history:** replace (built; Back leaves Catálogo) or push.

Side note, outside this judgment: the hoja-based prototypes' product kind field matches kinds ignoring accents (prototype `fold`). Production's `edit-product.tsx:247` uses `src/web/catalog/draft.ts` `fold`, which keeps accents, so production already behaves as the domain says. pestanas' NOTES "known limitation" about this is prototype-only.
