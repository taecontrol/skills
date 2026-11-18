# Prototype "pestanas": kinds as a second tab of Catálogo

**Thesis.** Catálogo gets two tabs, "Productos" and "Tipos". Each kind has a
ficha built like the product ficha, with its name, its products, "Unir con
otro tipo", and "Borrar" when it has no products.

Open `file:///tmp/despensa16-proto/k-pestanas/index.html?s=tipos`. Rebuild with
`PROTO=k-pestanas npx vp build --config vite.config.ts`. Re-render every
screenshot with `./shoot-all.sh` (output goes to `shots/`).

## Structure

- **Catálogo** has shadcn `Tabs` under the title on the phone (full width) and
  beside the title on desktop. "Productos" is the approved part 1 screen,
  plus a "Tipo" filter (below). "Tipos" lists every kind from `list_kinds`, sorted by name key,
  with its count ("2 productos", or a muted "Sin productos").
  - **Phone**: one-line rows with the name, the count and a chevron.
  - **Desktop**: a two-column table (Tipo, Productos), at most 2xl wide so the
    count stays close to the name.
- **Whole row opens the ficha** in both desktop tables (Productos and Tipos).
  The `TableRow` has the `onClick` (with hover and `cursor-pointer`). The
  name's button stays in the first cell as the keyboard way in, without its
  own handler: its click bubbles to the row, so it opens once. This no longer
  relies on a stretched `after:` overlay inside a `relative` `<tr>`, which
  WebKit/Safari does not honor. On the phone, rows already are full-width
  Item buttons.
- **"Tipo" filter (Productos tab)**: a chip next to "Sin tipo" and "Sin
  compras", built like prototype C's. It opens a Popover with a Command list
  on desktop and a Drawer on the phone. The list has a search that ignores
  accents, every kind with its count ("Sin productos" muted for empty ones,
  like the Tipos table), a check on the chosen one, and "Quitar el filtro".
  Choosing a kind filters through `list_products { kind }`, and the chip shows
  its name. "Sin tipo" and a chosen kind exclude each other. The empty state
  offers "Quitar filtros". On the phone the three chips fit on one row, and
  long names truncate. There is no kind header or kind actions above the
  products; those stay in the Tipos ficha.
  - The URL holds the kind **id** (`?tipo=knd_7`), so a rename is followed
    with no extra code.
  - A merge done in this tab moves the filter to the surviving kind. A delete
    done in this tab clears it silently.
  - When the kind is gone for another reason (Ana merged or deleted it, or
    `list_products` answered `KindNotFound`), the filter is cleared with one
    line: "El tipo «leche» ya no existe. Se quitó el filtro."
- **Kind ficha**: a Drawer on the phone and a modal right Sheet on desktop,
  using the same `FichaFrame` as the product ficha. The header shows the name
  and the count. Its sections are:
  1. **Nombre** with Guardar, Descartar and "Guardado", like the product
     form. A capitalization-only change counts as a change.
  2. **Productos**: `list_products { kind }`. Each row opens that product's
     ficha in the same Drawer or Sheet, with a back arrow to the kind. The
     section is hidden when the kind has no products.
  3. **Acciones**: "Unir con otro tipo". "Borrar" shows only with 0 products.
     Otherwise a dashed row reads "No se puede borrar porque tiene 2
     productos.", the same pattern part 1 uses for purchases.
- **Merging**: same flow as products.
  1. "Unir «leche» con…" is a list of the other kinds, with a search field
     that ignores accents.
  2. «¿Cuál queda?» shows two stacked cards. Each one has the name, the
     count, and up to 3 product names.
  3. Once one is chosen, three cues show the merge cannot be undone:
     - the other card's label changes to "Desaparece" and its name is
       struck through;
     - an Alert with only the title "No se puede deshacer" (no body; the
       owner confirmed this inline Alert is enough, with no extra dialog);
     - the button names the kind that stays: "Unir en «leche entera»".
  4. The result opens the kept kind's ficha with "«leche» se unió a este
     tipo. Pasó 1 producto." (from `moved`). Its products now list 2.
- **URL**: `?tab=tipos` (Productos is the default), `&ficha=<id>` for the kind
  ficha (renamed from `tipo`, which is now the filter), and `&producto=<id>` for a product opened from it. Every step pushes
  a history entry, so Back goes product ficha → kind ficha → list → previous
  tab. Loading a URL with `ficha` puts a list entry under the ficha, as the
  real app does for `producto`. Check the `atras-*` shots.
- **Scenario selector**: on desktop, a small panel at the top right that moves
  to the left of an open Sheet. On the phone, a pill in its own 40 px row
  above the app (not floating), so scrolling never puts it over the tabs or
  the list. The row is shorter than the Drawer's top gap, so the pill stays
  reachable with a ficha open, and it is away from the bottom nav.

## Showing a kind's products (the open scope question)

This thesis shows them. Here is what that adds and costs, so the owner can
decide.

- **Adds**:
  - You can see what a kind holds before renaming, merging or deleting it.
    "detergnte" turns out to be Magistral, and "papel higienico" turns out to
    be Higienol.
  - It shows why Borrar is unavailable, and the way out: open a product and
    change its kind.
  - The «¿Cuál queda?» cards can name products, not only counts.
- **Costs**:
  - One more `list_products { kind }` call when a ficha opens, plus one per
    card on «¿Cuál queda?».
  - A third navigation level: a product ficha inside the kind ficha, with a
    back arrow and one more history entry.
  - The kind ficha has to reload after a product changes kind.
  - The issue asks only for the count.
  - The section shows the first 50 products ("Se muestran los primeros 50").
    Larger kinds have no "Ver más".
- **Without it**, the kind ficha is the name, the count and the actions. The
  cards show only counts.

## Decisions left to the owner (built one way, not settled)

1. **Show a kind's products** (above): yes, as built, or count only.
2. **Tab history**: switching tabs pushes an entry, so Back returns to the
   other tab. The alternative is replace, like the part 1 filters: the tab
   still survives a reload or leaving Catálogo, but Back leaves Catálogo.
3. **How strongly to mark that a merge is final**: settled by the owner. The
   inline cues are enough, with no AlertDialog.
4. **Shopping-list lines**: settled by the owner and removed. The merge Alert
   is the title alone, and the delete dialog has only its title "¿Borrar el
   tipo «fideos»?".
5. **Freed name**: after a merge, «leche» can be created again when an agent
   classifies something under it. Nothing in the UI says so. It could be one
   more line in the merge Alert.
6. **Name taken**: the KindNameTaken Alert ("Ya existe el tipo «yerba». Si son
   lo mismo, unilos.") has a "Unir con «yerba»" button that goes straight to
   «¿Cuál queda?» with both kinds. Alternatives: only the message, or also an
   "Abrir «yerba»" button.
7. **Search in Tipos**: not built, since 13 kinds fit on one screen. A search
   field (like the picker's) may be needed if the list grows.

## Scenarios (`?s=`)

| id | what it shows | shots |
|----|---------------|-------|
| `tipos` | the Tipos tab, how to reach it from Productos, opening a kind | `tipos*`, `atras-3-pestana` |
| `renombrar` | "detergnte" → "detergente", saved; the list and the product's kind field show the new name | `renombrar*`, `atras-1/2` |
| `nombre-tomado` | "yerba mate" → "Yerba" fails naming "yerba"; "Unir con «yerba»" goes to «¿Cuál queda?» | `nombre-tomado*` |
| `unir` | picker → cards → choice with the warning → result in the "leche entera" ficha (2 products) → the list without "leche" | `unir*` |
| `borrar` | "fideos" (0): Borrar → AlertDialog → removed, with a notice on the list | `borrar*` |
| `no-se-puede-borrar` | "arroz" (2): the dashed row explains why | `no-se-puede-borrar*` |
| `ya-no-existe` | Ana merges "leche" while the ficha is open; saving "leche común" fails with KindNotFound. The form and actions go away, leaving only "Volver a los tipos", which reloads the list (leche entera: 2) | `ya-no-existe*` |
| `filtro-tipo` | Productos filtered by "leche entera"; the open list; "Sin tipo" clears the kind; "fideos" gives the empty state with "Quitar filtros"; the filter follows a rename ("Leche entera") and a merge (to "leche") | `filtro-tipo*` |
| `fila-entera` | desktop: a click on the count cell opens the ficha, in Tipos (arroz) and in Productos (Leche entera La Serenísima). The phone shot shows the list, whose rows are already full-width buttons | `fila-entera*` |
| `sin-conexion` | the rename fails offline; the typed name stays; Reintentar saves it | `sin-conexion*` |

Every scenario is shot at 390 × 844 and 1440 × 900.

## Known limitations

- Opening a product from a kind ficha swaps one Drawer or Sheet for another.
  With animations on, there is a short close-and-open instead of a page change
  inside the same panel.
- After KindNotFound the screen cannot say where the kind went, because the
  failure carries no target. The list reloads instead.
- In «¿Cuál queda?», reached from "Unir con «yerba»", the back arrow goes to
  the picker, not to the ficha.
- Part 1's product kind field still matches kinds ignoring accents (code left
  as approved). The in-memory API now matches by name key with accents kept,
  so "papel higienico" and "papel higiénico" stay two kinds.
- Changes to part 1 files are limited to what the kinds UI needs:
  - `ficha.tsx` exports `FichaFrame` and `ActionRow` and accepts an optional
    `onBack`;
  - `data.ts` has the new data and the four kind operations;
  - `catalog.tsx` wraps the existing list in the Productos tab;
  - `main.tsx` has the real destinations and the new selector, and the
    the Productos list has the "Tipo" filter (`kind-filter.tsx`), and
    `useProductList` passes `kind` and reports the failure tag. The
    screenshot runner gains an `atras` (Back) step, an `espera` step (waits
    2 s before the shot), and fires `mousedown` for tabs.
- The action buttons in kind failure Alerts ("Volver a los tipos",
  "Reintentar", "Unir con «yerba»") are `type="button"`. They sit inside the
  rename form, and as default submit buttons they ran a second save:
  "Volver a los tipos" reopened the ficha, and "Reintentar" saved twice. Part
  1's `FailureAlert` (copied `parts.tsx`, inside the product form) has the
  same pattern. I left it as approved, but the real code should check it.
- Radix Tabs reports one click twice (mousedown, then focus). The tab change
  ignores the second call so it pushes only one history entry.
