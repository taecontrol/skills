# Precios screen: program design

Status: Accepted (by the owner, 2026-11-03)
Spec: `.work/20-compare-prices-app/spec.md`. Grounded on: `main` at `7c53585`.

## Where things live

```text
src/web/
+ prices/
+   prices-page.tsx     route component. Reads the URL and shows either the picker page or the answer, with loading and failure states.
+   subject-picker.tsx  the kind/product Command. Used as the page (nothing chosen) and inside the "Cambiar" Popover.
+   comparison.tsx      one compare_prices answer: Tabs per measure group, ranking, summary, best deals, purchases Collapsible, without size.
+   filters.tsx         period (Popover + Calendar range), chain (Select), currency (ToggleGroup).
+   search.ts           PricesSearch, its validation, and the compare_prices input it yields.
+   figures.ts          Currency, figure(price, currency), es-AR money per measure, deal badge words.
+ components/ui/select.tsx, tabs.tsx   added with `vp exec shadcn add select tabs`
~ router.tsx            + the /precios route (validateSearch = validatePricesSearch)
~ shell/app-shell.tsx   + { to: "/precios", label: "prices.title", icon: TagIcon } appended after Catálogo
~ i18n.ts               + prices.* messages (copy from the prototype's messages.ts)
```

```text
~ README.md             "Using the app": five screens, with Precios
tests/
+ prices-app.test.ts    E5 against figures.ts
```

Splitting `search.ts` and `figures.ts` out of the components is a decision. They hold the two rules a component would otherwise get wrong:
- which subject and filters reach the operation;
- what a price shows in a currency.

## Key types

- `PricesSearch = { tipo?: string; producto?: string; desde?: LocalDate; hasta?: LocalDate; cadena?: string; moneda?: "ars" }`. Validation drops both `tipo` and `producto` when both are present, so the picker shows. It drops invalid dates and reversed periods. So `compare_prices` never receives an input it rejects as `InvalidInput`.
- `Subject = { _tag: "Kind"; id: string } | { _tag: "Product"; id: string }`. It can't hold both or neither, matching the operation's "exactly one".
- `Currency = "usd" | "ars"`. USD is the default and is absent from the URL.
- `Figure = { _tag: "Shown"; text: string } | { _tag: "PesosOnly"; text: string }`. A price with `usd: null` always becomes `PesosOnly`, in either mode. It renders the ARS text with "sin cotización", so a missing rate never prints as a dollar number or zero, and the marker stays in ARS mode (E5).

## Signatures that matter

```ts
// search.ts
export const validatePricesSearch: (raw: Record<string, unknown>) => PricesSearch;
export const subjectOf: (search: PricesSearch) => Subject | undefined;
export const compareInput: (subject: Subject, search: PricesSearch) => ComparePricesInput;
export const chainOptionsInput: (subject: Subject, search: PricesSearch) => ComparePricesInput; // same, without chain

// figures.ts
export const figure: (price: Price, currency: Currency) => Figure;
export const perMeasure: (figure: Figure, measure: Measure) => string; // "US$ 1,13/kg"
export const dealWords: (belowMedianPercent: number | null) => string | undefined; // "45 % bajo la mediana"
```

The queries reuse `readQuery` from `src/web/queries.ts`:
- `readQuery("compare_prices", compareInput(...))`;
- `readQuery("compare_prices", chainOptionsInput(...))`, which is the same cache entry when no chain is set;
- `readQuery("list_kinds", {})`;
- `readQuery("list_products", { search, limit: 20 })`;
- `readQuery("list_products", { productId })` for a product's header.

## Call paths

```text
E3 (a kind, USD)
Production                                              Capture
/precios?tipo=knd_… → router validatePricesSearch        Chromium → vp dev (/precios?tipo=…)
 → PricesPage → subjectOf → useQuery(compare_prices)      → local Worker + local D1 seeded with F
 → api.compare_prices → POST /api/compare_prices          → compare with MCP compare_prices output
 → Comparison → figure(price, "usd") → rows

E5 (no made-up dollars)
Production                                              Test
Comparison row → figure({ ars: 2200, usd: null }, "usd") tests/prices-app.test.ts → figure(...)
 → PesosOnly "$ 2.200,00" + "sin cotización"             → expect PesosOnly in both modes; rated price in ARS → Shown

E13 (Cambiar)
"Cambiar" → Popover(SubjectPicker) → onPick(subject)
 → navigate({ search: { ...period, moneda, [tipo|producto]: id } })   // cadena dropped; push, so Back returns

E10 (empty period)
filters.tsx Calendar range → Aplicar → navigate({ search: { ...s, desde, hasta } }, replace)
 → compare_prices → { measures: [], withoutSize: [] } → empty state with "Cambiar el período"
```

## What each module hides

| Module | Hides | So callers never |
|---|---|---|
| `search.ts` | the URL's names (`tipo`, `desde`, `moneda`…) and their validation | build an operation input from raw strings or send `InvalidInput` |
| `figures.ts` | the currency choice, the null-USD rule, es-AR formatting, deal wording | branch on `usd === null` or format money themselves |
| `subject-picker.tsx` | where kinds and products come from (local filter vs server search) | know that products are paginated or searched on the server |
| `filters.tsx` | the Calendar's local-day handling and where the chain options come from | convert dates through UTC or query chains themselves |
| `comparison.tsx` | phone list vs desktop Table, Tabs for several groups, captions per currency | know the layout breakpoints or the ARS-mode labels |

## Errors

- **`compare_prices` failures** go through `failureMessage`:
  - `Unreachable` shows an Alert with `error.offline` and "Reintentar" (`refetch`), as in Reposición;
  - `UnknownProduct` and `KindNotFound` show their message with "Cambiar" still available;
  - anything else shows `error.InternalError`.
- **The picker's own queries** (`list_kinds`, `list_products`) show an inline message with a retry inside the picker, and do not block the answer.
- **The URL** never produces `InvalidInput`: `validatePricesSearch` drops what the operation would reject.

## Changes elsewhere

- **`app-shell.tsx`:** one destination appended. No reordering, and `<Toaster />` stays.
- **`router.tsx`:** one route.
- **`i18n.ts`:** new `prices.*` keys only.
- **`README.md`:** the screens list.
- **`select.tsx` and `tabs.tsx`:** new shadcn components.

## Not decided here

- Behaviour is in the spec.
- There are no cross-component contracts or one-way doors.
- Build order, component internals, and the exact markup belong to the deliver, following the prototype.
