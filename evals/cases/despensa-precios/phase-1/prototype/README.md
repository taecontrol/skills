# Final prototype: Precios

Direction A ("Dónde conviene") with the owner's requested changes: the product picker and the currency toggle from prototype B, a visual pass guided by Refactoring UI, and rewritten Spanish copy.

Open `index.html?escenario=<id>`. The dark strip above the app frame selects any of the 12 scenarios and resets it to its start. The scenario lives in the URL, so the browser back button works after a pick.

## What changed from A

- **The answer stays on screen.** A sent the phone to a separate picker step with a "‹ Precios" back button and kept a left column from 1280 px. Now the header shows a small uppercase label ("TIPO · 5 PRODUCTOS", "PRODUCTO · ARROZ", "PRODUCTO · SIN TIPO") above the name, and an outline "Cambiar" button with a search icon. The button opens the kind and product picker in a Popover, at every width. The current item is checked in the list. The `elegir` scenario is the picker as a page: title, one line of guidance, the search box and both groups.
- **One currency leads.** A showed USD large and ARS small on every figure. Now a ToggleGroup (outline, two segments, the selected one filled dark) chooses ARS or USD, default USD, and every figure shows the chosen currency only. See the design call below.
- **The rate-less purchase is marked in both modes.** Any price whose purchase has no rate shows its peso figure with "sin cotización" beside it, whichever currency is selected. The summary under the ranking names the dates of those purchases and says they are left out of the USD figures.
- **No duplicate empty state for desodorante.** A showed an Empty ("no comparable price") and then the "Sin tamaño ni peso" section with the same explanation. Now that section carries one caption that says why there is nothing to compare.
- **Controls follow the app's sizes.** Phone controls are 40 px tall with the repo's `hit-area` utility for 44 px touch targets, as Reposición does. A used 44 px controls.
- **Captions explain the order in ARS mode** and the "Más barata" badge becomes "Más barata en US$", so no label contradicts an order that is always by USD median.
- **No source name.** The USD note says only what the rate is: "Los US$ usan el dólar MEP compra del último cierre antes de cada compra."

## Currency toggle: the design call

The selected currency is the only one on each row. The other currency appears in exactly one place per measure group, the median line under the ranking ("US$ 1,38/kg · $ 2.120,00/kg", with the selected currency first).

Reasons:

- A row in A carried six numbers per chain (median, lowest, latest, each in two currencies). With one currency it carries three, and the eye lands on the big median without competing figures. This is the point of the toggle; if both currencies stayed on every row, the toggle would only swap font sizes.
- In the aisle a shelf price is in pesos, so one tap on ARS puts every figure in the same unit as the shelf. At home the owner reads USD by default.
- The median line keeps a conversion anchor on screen in both modes, so a reader never loses the scale of the other currency.

Order and labels never change. Chains and best deals stay exactly as `compare_prices` returns them, ordered by USD. In ARS mode the ranking caption says "El orden sigue a la mediana en US$", the badge reads "Más barata en US$", and the deals caption says the order and the percentage follow the USD price. In the arroz data the ARS order happens to match, but the labels stay true when it does not.

A purchase without a rate has no USD figure. In USD mode its peso figure appears with "sin cotización"; in ARS mode the same marker stays, because the summary says that purchase is left out of the USD figures and the reader should be able to find it.

## Refactoring UI principles applied

- **Hierarchy with weight and color, not size.** The rank number is a plain muted figure instead of a filled circle. The cheapest chain is bold plus a badge; the others are medium weight. Section titles are 16 px semibold; the name is the only large text.
- **De-emphasize the secondary instead of emphasizing the primary.** Purchase counts, dates, "/kg" suffixes, branches and the USD note are 12 px muted text. The big median is 16 px semibold, no larger.
- **Labels only when the value does not explain itself.** "US$ 1,13/kg" needs no label; the two small rows under it ("Más baja", "Última, 3 nov 2026") keep theirs because the figures alone would be ambiguous. The eyebrow "TIPO" replaces the sentence "Tipo · 5 productos" under the title.
- **Fewer borders.** Phone lists have no row borders; blocks are separated by spacing, with the name and the big figure starting each block. The one tinted box is the summary under the ranking. Tables keep their row rules because a 5 column grid needs them.
- **Tabular, right-aligned numbers.** Every figure uses `tabular-nums` and sits in a right-aligned column, on phone and in the tables.
- **Consistent type and spacing scale.** Only 12, 14, 16, 24 and 30 px text; A used 13 and 15 px as well. Sections are 32 px apart, headings 12 px from their content, rows 12 px of vertical padding.
- **Not everything is a card.** The ranking, deals and history are plain lists and tables. The summary is the single tinted block, and the error state keeps the app's Alert.
- **No gray text on a colored background.** The selected toggle segment and the "Más barata" badge use the primary foreground on primary; the secondary badge uses its own foreground.
- **Empty states guide the next action.** `sin-compras` names the period and offers "Cambiar el período", which opens the period calendar. `elegir` is the picker itself, so the search box and both lists are the page. `desodorante` says why there is nothing to compare and shows what was paid.
- **Remove, then add back.** The duplicate desodorante explanation, the circle markers, the "Precios" back button and the second currency on every row are gone. Nothing was added except the toggle and the eyebrow.

## Spanish copy

Every string was rewritten under the unslop rules: no em dashes, no colon as a connector, short active sentences, plain words. Examples:

- "1 compra sin cotización del dólar (3 nov 2026): figura solo en pesos y no cuenta en ninguna cifra en US$." became "La compra del 3 nov 2026 no tiene cotización del dólar. Figura solo en pesos y queda fuera de las cifras en US$."
- "Estas compras no entran en la comparación: el producto no tiene tamaño y no se pesó. Esto es lo que se pagó." became "Estas compras quedan fuera de la comparación. El producto no tiene tamaño y no se pesó, así que no hay precio por kilo, litro ni unidad. Figura lo que se pagó."
- "Nada coincide con esa búsqueda." became "No hay tipos ni productos con ese nombre."
- "Entre el 15 oct 2026 y el 3 nov 2026 no hay compras registradas." became "No hay compras de yerba entre el 15 oct 2026 y el 3 nov 2026."

The voice stays rioplatense ("Elegí", "Buscá", "Revisá"). Formats stay es-AR: `$ 1.598,69`, `US$ 1,02`, "3 nov 2026". Phone filter labels are short ("Historial", "Todas", "15 oct a 3 nov"); from 1024 px they are the full ones ("Todo el historial", "Todas las cadenas", "15 oct a 3 nov 2026").

## shadcn/ui components

- **Used:** Sidebar, Button, Command, Popover, Calendar, Select, ToggleGroup, Tabs, Table, Badge, Collapsible, Empty, Alert, Skeleton, Spinner, Tooltip (provider).
- **Added with `vp exec shadcn add` in this worktree:** `select`, `tabs` (both from A). `toggle-group` was already in the repo, used by Reposición.
- **Custom visuals:** none. A's styled rank circle is gone; the rank is a plain `span` with text.

## Known limitations (prototype only)

- **Filters resolve only to the provided data.** Cadena: only arroz → Coto (and back to "Todas las cadenas") is wired; other chains are listed but disabled. Período: the calendar opens and selects, but "Aplicar" works only for the range already shown.
- **Picker:** kinds and products without scenario data are listed but disabled.
- **Currency resets to USD** when a new kind or product is picked, because the answer remounts per scenario. The real screen should keep the choice.
- **Unwired controls:** Compras and Reposición in the shell do not navigate. Reintentar shows its pending state and then stays on the error.
- **The toggle is disabled** in `sin-compras` and `desodorante`, where no figure has a currency to switch, and while loading or in error.

## Evidence

`evidence/<scenario>-390.png` and `-1440.png` cover all 12 scenarios. Also:

- `arroz-1024`, `arroz-1280`, `elegir-1024`, `elegir-1280`
- `arroz-ars-*`: ARS mode
- `arroz-ars-historial-*`: ARS mode with the purchases open
- `arroz-cambiar-*`: the picker open from "Cambiar"
- `arroz-cambiar-elegido-*`: after picking "Arroz largo fino Lucchetti 1 kg" from it
- `arroz-historial-*` and `arroz-historial-final-*`: the purchases open, top and bottom
- `arroz-coto-ars-*`: the chain filter plus ARS mode
- `jabon-litro-*`: the second measure tab

Captured in headless Chromium by `proto-src/capture.mjs` with no console errors or warnings and no element wider than the viewport.

Source: `proto-src/` (copied from `proto/` in the worktree). Build it with `vp build --config proto/vite.config.ts`.
