# Judge verdict: Precios prototypes (issue #20)

I drove all three builds in headless Chromium (Playwright 1.63) against the live URLs. Each of the 12 scenarios ran at 390×844 and 1440×900, and elegir, arroz, jabon and error also ran at 1024×800. I then drove each candidate's interactions at 390 and 1440. Screenshots are in `/tmp/despensa-20-judge/shots/` (`<cand>-<scenario>-<w>.png` for the sweep, `i<cand>-*` for interactions, `sc-*` for scrolled frames), and page text is in `/tmp/despensa-20-judge/text/`.

**Checks every candidate passed.** No candidate logged a console error or warning in any scenario or interaction. No page overflowed horizontally (`scrollWidth == innerWidth` everywhere). A's selector strip at 390 scrolls inside itself. No candidate uses a native `select`, date, number or checkbox input, or a `dialog`. Every `<button>` carries a shadcn `data-slot`. All three use the real shell: the Sidebar with "Despensa" from 1024, the bottom bar below it, and Compras, Reposición, Precios in that order. All three keep the scenario in `?escenario=` with the selector outside the frame. The loading and error states follow the Reposición pattern (WifiOff Alert, `error.offline` text, Reintentar).

## A "Dónde conviene": **Pass**

**Structure.** A Command picker (Tipos and Productos, searchable) is a separate step below 1280 px, with "‹ Precios" back and browser Back working. From 1280 px it is a persistent left column. The answer reads top to bottom: the chain ranking (a list on phone, a Table on desktop), the group median, the withoutRate note, the USD source, "Mejores compras", the "Ver las N compras" Collapsible, then "Sin tamaño ni peso". Tabs split groups (jabón: Por kilo / Por litro). There is no chart. USD is primary and ARS sits beside it in every figure.

**Figures checked against data.json, all exact:**
- arroz chain medians: Coto US$ 1,13 / $ 1.890,00, Carrefour 1,25 / 1.915,00, Jumbo 1,43 / 2.195,00, Día 1,44 / 2.200,00.
- Coto's latest: "$ 2.200,00 · sin US$".
- Group median US$ 1,38 / $ 2.120,00.
- withoutRate: "1 compra sin cotización (3 nov 2026)".
- Deals 45/27/26/10/5 % "bajo la mediana".
- arroz-coto: 33 % bajo, 10 % bajo, **10 % sobre**, **22 % sobre**.
- lucchetti-1kg: 0 shows as "en la mediana", −11 and −18 as "sobre".
- jabon: kg US$ 8,71 / $ 13.333,33; l median 6,93 / 10.768,32, Carrefour 6,80 / 10.500,00, Coto 7,05 / 11.036,63, ±2 %.
- withoutSize $ 1.800,00; desodorante $ 2.506,49 and $ 3.190,00; queso 9,01 / 13.911,89; analgésico 0,38 / 587,94 per unit.
- History rows show paid, measure and MEP rate, e.g. "2 kg · pagado $ 3.197,38 · MEP $ 1.565,40" and "sin cotización".

**Filters.** The chain Select offers Coto and swaps to the exact arrozCoto response. Carrefour, Jumbo and Día are disabled. The period Popover+Calendar opens. Picking an unmapped range disables "Aplicar", so it invents no result. Products without data are disabled in the picker. Reintentar shows its pending state and stays on the error. Clicking a strip link resets state: the history was collapsed again after switching jabon → arroz.

**Minor notes, not blocking:**
- "Mediana de las 12 compras: US$ 1,38" counts 12 although the USD median uses 11. The withoutRate line directly below discloses this.
- "Aplicar" disables silently, with no reason given.

## B "El precio en el tiempo": **Pass**

**Structure.** The page opens on the Command picker; afterwards "Cambiar" opens it in a Popover. A ToggleGroup switches ARS/USD (USD by default). The primary element is a shadcn Chart with one series per chain and a dashed median line. Tapping, hovering or keyboard-focusing a point fills a fixed "Compra seleccionada" inspector, and the "Por cadena" heading did not move on hover (y = 898.6 before and after). Below the chart: chain Cards, "Mejores compras" (clicking a deal selects its point), then "Sin medida para comparar". The USD source and its attribution (ArgentinaDatos · DolarHoy / Ámbito, true per ADR-0011) sit at the foot.

**Figures, all exact:**
- Chain medians and lows as in A.
- In USD, Coto's latest shows "—"; in ARS it shows $ 2.200,00.
- Median US$ 1,38 / $ 2.120,00.
- The USD chart has 11 points and the ARS chart has 12, so the unrated purchase appears only in ARS, as the contract requires.
- Deals 45/27/26/10/5 "% por debajo de la mediana USD"; arroz-coto 10 and 22 "por encima"; lucchetti 0 "Igual a la mediana USD".
- jabon l median 6,93, Carrefour 6,80, Coto 7,05, ±2 %; queso 8,81/9,20, ±2 %.
- withoutSize $ 1.800,00.
- In ARS mode the page says "En orden de mediana en USD" and keeps the returned order. That is honest.

**Filters.** The chain Select works for Coto ↔ Todas, and the other chains are disabled. The period is a Select of fixed presets: only "Todo el historial" for arroz, and in sin-compras only the given range ("Todo el historial" is disabled). Reintentar resolves to the arroz data. The reset button and the scenario Select both reset the scenario: ARS went back to USD.

**Minor notes:**
- The period offers no free range, which is weaker than a Calendar but invents nothing.
- There is no full purchase list; individual purchases are reachable only through chart points.

## C "Una página con pestañas": **Rebuild**

**Structure.** A Combobox (Popover+Command) sits at the top of Precios, with kinds as Buttons in the empty state. The header has an ARS/US$ ToggleGroup, ARS by default. One headline Card per group shows the median, the "Más barata" chain and the withoutRate count. Four Tabs follow (Cadenas, Ofertas, Historial, Sin tamaño); all reading state lives in the hash URL. Figures match data.json: arroz US$ 1,38 / $ 2.120, chain lows, deals 45…5 %, arroz-coto "10 % sobre" and "22 % sobre", lucchetti "En la mediana", jabón kg and l cards 13.333,33 and 10.768,32, desodorante 2.506,49 / 3.190. Two invariants fail, and both are checkable.

1. **The filters and picker show a fake network failure for unmapped values (invented, misleading behavior).** Each case below shows "Sin conexión con Despensa. Revisá tu conexión a internet.", and Reintentar keeps failing (screenshots `ic-c-chain-dia-*`, `ic-c-unmapped-product-*`, `ic-c-period-oneday-*`):
   - arroz → Cadena "Día" (also Carrefour and Jumbo, all enabled), at 390 and 1440.
   - 11 of the 13 products in the Combobox, all enabled. "Arroz doble carolina Molinos Ala 1 kg" was tested.
   - Any Calendar day.
   - In sin-compras, "Todo el historial", which is the only action the empty state offers.

   The brief allows filters only to resolve to the provided data, or to stay visibly as controls without invented results. A and B disable unmapped options instead.
2. **The ARS default contradicts the ranking.** In leche at 390 and 1440, the headline says "Más barata: Coto · mediana $ 1.540/l", and the Cadenas list puts Coto first with the longest bar, above Día at **$ 1.280/l**. Nothing on screen says the order is by USD median (B states it, and A leads with USD). An aisle reader is told the wrong chain is cheaper.

**Also fix:**
- **Calendar.** The period popover closes and runs a query after the first day tap (`desde=hasta=2026-11-02`), so a range cannot be picked in one pass.
- **ARS format.** ARS drops the cents inconsistently ("$ 2.120/kg" and "Mín. $ 1.180" next to "$ 1.598,69/kg"). The app's formatter and the brief use `$ 1.598,69` style with two decimals.

**To pass, C needs to:**
- disable the unmapped products, chains and periods instead of returning the offline error;
- label the ranking basis, or lead with USD in the headline;
- make the period a real range picker;
- format ARS the way the app does.

## Pairwise divergence

- **A vs B: material.**
  - Structure: A is a ranking-first answer, with a table or list and the picker as a separate step or column. B is a timeline chart with a point inspector, and the picker sits behind "Cambiar".
  - Currency: A shows USD and ARS together in every figure; B switches one currency at a time with a toggle.
  - Time and history: A shows the full dated history behind a Collapsible and has no chart; B shows time through the chart and has no list.
- **A vs C: material.**
  - Structure: A is one sequential scroll with a disclosure; C is a headline card plus four Tabs that replace each other in place.
  - Picker: A uses a list step (a column on desktop); C uses an in-place Combobox.
  - Currency: A shows both currencies, USD first; C switches with a global toggle, ARS by default.
- **B vs C: material.**
  - Structure: B reads in chart-first order; C reads in tab-switched views.
  - Time: B plots purchases over time; C lists them in a Historial tab with bars.
  - Both pickers are Popover+Command and both use a currency toggle (USD vs ARS default), so the divergence rests on structure and on how time is read, not on the picker.

No aesthetic winner is chosen.

## C rejudge (rebuilt build): **Pass**

**What I ran.** I swept all 12 scenarios again at 390×844 and 1440×900, plus elegir, arroz, jabon and error at 1024, and re-drove every interaction. The results:
- Zero console messages.
- No horizontal overflow.
- No native controls, and no `<button>` without a shadcn `data-slot`.
- The shell and destinations are unchanged.
- The scenario stays in `?escenario=`.
- Reselecting a scenario resets the tab and currency: Historial and US$ went back to Cadenas and ARS.

New screenshots are `/tmp/despensa-20-judge/shots/c-*` and `ic-c-*`. The first build's interaction screenshots moved to `shots/c-v1/`.

**The four reasons, re-checked at 390 and 1440:**

1. **False network errors: fixed.**
   - Combobox: every product without data is disabled ("No disponible"), and force-clicking "Arroz doble carolina" does nothing. Only Lucchetti 1 kg and Queso are enabled.
   - Chain Select: in arroz, only Coto is enabled, and Coto ↔ Todas swaps to the exact arrozCoto response. In leche, lucchetti-1kg and jabon, every chain is disabled.
   - Calendar: in arroz, every day from June to November is disabled, and so is "Aplicar".
   - sin-compras: "Todo el historial" is disabled.
   - The offline Alert now appears only in the `error` scenario.
2. **"Más barata" in ARS: fixed.** In leche at 390, the headline reads "Más barata en US$ · Coto · mediana US$ 0,75/l · $ 1.540,00/l". The Cadenas tab opens with "Ordenadas por su mediana en US$, de más barata a más cara; las cadenas sin cotización van al final." That last clause is contract-true.
3. **Period applying on first tap: fixed.** In sin-compras, tapping 15 oct keeps the popover open with "Aplicar" disabled. Then 3 nov enables it, and Aplicar applies `desde=2026-10-15&hasta=2026-11-03`. The hint reads "Elegí el primer y el último día, después Aplicar."
4. **ARS cents: fixed.** ARS amounts now carry two decimals throughout: "$ 2.120,00/kg", "Mín. $ 1.180,00", "$ 2.200,00 por 1 kg", "$ 3.190,00".

**Figures re-checked against data.json, all exact:**
- arroz: median US$ 1,38 / $ 2.120,00. Chains Coto 1,13 / 1.890,00, Carrefour 1,25 / 1.915,00, Jumbo 1,43 / 2.195,00, Día 1,44 / 2.200,00. Coto's latest shows "sin cotización · 3 nov 2026". Deals 45/27/26/10/5 %.
- arroz-coto: deals 33 and 10 % "bajo", 10 and 22 % "sobre".
- lucchetti-1kg: "En la mediana"; Carrefour is cheapest at US$ 1,01 / $ 1.530,00.
- jabón: kg $ 13.333,33; l median $ 10.768,32, Carrefour US$ 6,80 / $ 10.500,00, Coto $ 11.036,63, ±2 %.
- leche: median $ 1.360,00.
- queso: median $ 13.911,89, Jumbo 8,81.
- analgésico: $ 587,94 per unit.
- desodorante: $ 2.506,49 and $ 3.190,00.
- withoutSize: $ 1.800,00.

**No new invented behavior.** I found no new metrics, controls or data.

**Notes, not blocking:**
- **Yerba.** Yerba (in list_kinds) is disabled as "No disponible" in the Combobox and missing from the elegir kind buttons, which show 5 of 6. B instead opened yerba on its supplied empty period. "No disponible" is prototype scaffolding and must not reach production.
- **Period control at 390.**
  - The trigger truncates "15 oct – 3 nov 20…"; the aria-label is complete.
  - The popover sits flush against the right edge (x 109 + width 281 = 390) but is not clipped.
- **Retry.** Reintentar in `error` stays on the error, the same as A.

**Divergence is still material.**
- **C vs A:**
  - Structure: C is a headline card plus four replacing Tabs with an in-place Combobox; A is one sequential scroll with a picker step or column and a history Collapsible.
  - Currency: C uses one global toggle with ARS by default, and its "Más barata" line now pairs USD with ARS; A puts USD and ARS together in every figure.
- **C vs B:**
  - Structure: C is organized by tabs, where B leads with the chart.
  - Time: C shows it in a Historial list, where B plots it with a point inspector.
  - The picker (Popover+Command) and the currency-toggle pattern are shared, so they do not count toward divergence.
