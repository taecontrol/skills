# Prototype brief: the price comparison screen (Despensa issue #20)

You are one of three independent designers. Build ONE direction, in your own isolated git worktree of the Despensa repo (TypeScript, React 19, Tailwind 4, shadcn/ui, TanStack Router/Query). Do not look at other candidates. Do not spawn agents. Do not commit or push anything.

## The design question

How should a household member pick a product or a kind ("tipo") and read its price comparison, on a 390 px phone in the store aisle and on a desktop at home?

## User, moment, task

- Users: the owner and their partner (one household, Buenos Aires). The owner earns in USD.
- Moments: (1) in the aisle, phone in one hand: "¿Este arroz está caro? ¿Dónde lo compré más barato?"; (2) at home on the computer: "¿Qué cadena conviene para el arroz? ¿Fue una oferta de verdad?".
- Primary task: choose a kind or a product, then see where and when it was cheapest, per kilo / liter / unit, in ARS and USD, and which purchases were the best deals.

## Product truth (fixed; do not reinterpret)

The screen reads ONE operation, `compare_prices` (merged on main; see `src/operations/prices/compare-prices.ts` and `src/operations/prices/wire.ts` in your worktree for the exact shape and the agent description with every rule). Key rules:
- Price per measure = (printed line amount + its own line discounts) ÷ measure. A line with no printed quantity counts as one unit. Groups `kg`, `l`, `unit` are separate and never converted into each other; a kind can have several groups.
- USD uses the MEP **compra** rate of each purchase's date (the last close before that date). A purchase without a rate shows ARS only and is left out of every USD figure; the group's `withoutRate` says how many.
- Each group: `purchases` (newest first), `median` (ARS and USD), `withoutRate`, `chains` (ordered by median USD, cheapest first; each with `purchases` count, `latest` {date, price}, `median`, `lowest`), `bestDeals` (up to 5 cheapest in USD, each with `belowMedianPercent`; negative means above the median, null means median zero).
- `withoutSize`: lines whose product has no size and was not weighed; shown apart, with what was paid.
- Optional input filters exist: `from`, `to` (inclusive dates), `chain`.
- **Show figures exactly as returned.** Never recompute prices, medians, order or percentages. (Presentation math such as bar lengths or chart positions is fine.)

## Exact content (use this data, unchanged)

`./.work/20-compare-prices-app/data.json`, generated from the real operations:
- `kinds`: the `list_kinds` result (id, name, product count).
- `productsWithoutKind` and `allProducts`: `list_products` results (for choosing a product, e.g. a product without a kind).
- `scenarios.*`: real `compare_prices` results.

## Named scenarios (your scenario selector must offer exactly these, and reset each to its start)

1. `elegir` — the screen before choosing anything (the picker), with the kinds and products from the data.
2. `arroz` — kind "arroz": 4 chains, 12 purchases Jul–Nov 2026, one purchase without a rate (2026-11-03), one line without size (Arroz yamaní suelto).
3. `arroz-coto` — the same kind filtered to chain Coto (`scenarios.arrozCoto`).
4. `lucchetti-1kg` — one product (`scenarios.lucchetti1kg`).
5. `jabon` — a kind with two groups, kg and l (`scenarios.jabon`).
6. `leche` — liters only (`scenarios.leche`).
7. `desodorante` — only without-size lines, no groups (`scenarios.desodorante`).
8. `queso` — a product without a kind, weighed per kg (`scenarios.queso`).
9. `analgesico` — per unit (`scenarios.analgesico`).
10. `sin-compras` — kind yerba with a period that has no purchases (`scenarios.yerbaNoPurchasesInPeriod`, period 2026-10-15 to 2026-11-03).
11. `cargando` — loading.
12. `error` — the request failed (network): a Spanish message and a retry action, as other screens do (see `src/web/failures.ts`, `src/web/restock/restock-page.tsx`).

Keep the selected scenario in the URL (e.g. `?escenario=arroz`). The selector sits outside the product UI and covers none of it (e.g. a slim strip above the app frame).

## Invariants

- **Real app shell** from `src/web/shell/app-shell.tsx`: shadcn Sidebar from 1024 px with "Despensa" and the destinations; bottom bar below 1024 px. Show the existing destinations Compras and Reposición plus ONE new destination "Precios" (add it at the end; do not reorder the others). The Precios screen is where the comparison lives.
- **shadcn/ui variant of every control** (Select, Combobox/Command, ToggleGroup, Tabs, Calendar in Popover, Drawer/Sheet, Button, Input, Table, Item, Badge, Card...). No browser-native controls (`<select>`, unstyled `<input type=date|number|checkbox>`, `<dialog>`, `alert()`, loose `<button>`). If you need a shadcn component that is not in `src/web/components/ui/`, add it with the shadcn CLI in your worktree (`vp exec shadcn add <name>`), e.g. `chart`, `tabs`, `select`.
- Use the repo's tokens, fonts and existing components and patterns (look at `src/web/purchases/purchases-page.tsx`, `src/web/restock/restock-page.tsx`, `src/web/index.css`).
- Spanish UI text (rioplatense, as the app). es-AR formats: `$ 1.598,69` for ARS, `US$ 1,02` for USD, dates like "1 nov 2026" / "sáb 1".
- Say where USD comes from, briefly (dólar MEP compra; the last close before each purchase).
- Responsive: works and looks right at 390×844 and at 1440×900 (also check 1024 and 1280).

## Allowed / forbidden

- Allowed: your own layout, hierarchy, reading order, disclosure, navigation inside Precios, charts (via shadcn `chart`), filters for period and chain (they may only resolve to the scenario data provided; otherwise keep them visibly as controls without inventing results).
- Forbidden: inventing features, controls, metrics or claims beyond the contract (no price alerts, favorites, targets, store maps, inflation figures, predictions, editing), invented data, placeholder or lorem text.

## Your territory (non-overlapping)

Given separately in your task message. State your thesis in one named sentence first, then build.

## Build and deliver

- Work in your worktree only. Run `vp install` there if needed (do not touch global caches/config).
- Build a prototype entry that runs only in the browser with the data above inlined or imported (no Worker, no API calls): e.g. `proto/index.html` + `proto/main.tsx` and a `proto/vite.config.ts` with the react and tailwind plugins and the `@` alias, `base: "./"`, and hash or query routing so it works from a static subfolder.
- Build static output to `/tmp/despensa-20-proto/<your letter>/` (index.html at its root). It must work when served from `http://host:port/<your letter>/index.html?escenario=...`.
- Render and inspect every scenario in headless Chromium at 390×844 and 1440×900; fix clipping, overflow, layout shift, console errors and placeholder content. Save screenshots `/tmp/despensa-20-proto/<letter>/evidence/<scenario>-<width>.png` for every scenario at both widths.
- Write `/tmp/despensa-20-proto/<letter>/README.md`: thesis, how it works, material tradeoffs, known limitations, the shadcn components used and any added.
- Process hygiene: do not kill processes you did not start (no pkill/killall of node, chromium, vite, workerd); use a free system-chosen port for any server and stop it when done.

Return only: your thesis, the output path, and 3 lines on tradeoffs.
