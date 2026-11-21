# Catalog tidying: program design

Status: Accepted (with the spec, 2026-11-02)

<!-- Eval case copy, unchanged except this note and the status. Its files, functions and the commit `231930f` name the original phase 1 code; map them to the code in this worktree and record each departure. -->
Spec: `.work/specs/8-catalog.md`. Brief: `docs/design/catalog.md`. Grounded on: `231930f`.

## Where things live

```text
  migrations/
+   0002_catalog.sql                 kinds, products.kind_id/merged_into, purchase_lines.via_product_id, product_merges
  src/operations/
~   index.ts                         registers the nine catalog operations
+   catalog/                         one file per operation (list-products, update-product, merge-products,
                                     undo-product-merge, delete-product, list-kinds, rename-kind, merge-kinds, delete-kind)
+   catalog/wire.ts                  KindName, Kind, CatalogProduct, MergedEntry, Merge, CatalogCursor
+   catalog/failures.ts              UnknownProduct, ProductAlreadyMerged, SizesDiffer, ProductHasPurchases,
                                     MergeNotFound, KindNotFound, KindNameTaken, KindHasProducts
~   purchases/wire.ts                Product gains kind; NewProduct gains optional kind
  src/worker/
+   handlers/<nine files>.ts         one-line handlers, as today
+   catalog/merges.ts                merge and undo batches; the only writer of merged_into, product_merges, via rewrites
+   catalog/products.ts              list, update and delete products; CatalogProduct reads
+   catalog/kinds.ts                 list, rename, merge, delete kinds; kindStatements (create-by-name in a batch)
~   purchases/catalog.ts             evidence reads origins; findLine compares current products; plan carries origins
~   purchases/write.ts               lineRows takes origins; insertLines resolves the current product in the INSERT;
                                     productStatements sets kind_id; newId gains "knd" | "mrg"
~   purchases/correct.ts             a kept line keeps its origin
~   purchases/read.ts                Product reads include kind; purchaseDetail carries each line's origin internally
+ tests/catalog.test.ts              E1–E25
+ docs/adrs/0009-…md                 merges move lines and keep per-line provenance
~ docs/design/recording-purchases.md #8 sketch points to catalog.md
```

## Key types

- `Origin` (branded string, `src/worker/purchases/catalog.ts`): the product whose evidence or pick linked a line. Built only by `findLine`/`linkLines` and by reading a stored line (`coalesce(via_product_id, product_id)`), so a correction cannot pass a line's current product where its origin belongs and silently drop provenance.
- `LinkPlan` entries carry `origin: Origin` instead of `productId: string` for existing products; `lineRows` emits `origin`, never `product_id`.
- `KindName` (operations wire): non-blank text, the only way a kind enters a write. Normalization stays in the Worker (`nameKey`), so callers never send keys.
- `CatalogProduct` is `Product` plus `purchases`, `lastPurchasedOn` and `merged`: there is no field for provenance or `merged_into`, so the wire cannot leak them.
- `MergeOutcome = "merged" | "already_applied"`, `UndoOutcome = "undone" | "already_undone"`: literals, as `record_purchase` does.

## Signatures that matter

```ts
// src/worker/catalog/merges.ts
export const mergeProducts: (input: MergeProductsInput) =>
  Effect<MergeResult, UnknownProduct | ProductAlreadyMerged | SizesDiffer | InvalidInput | SqlError, D1Client | SqlClient | Member>;
export const undoProductMerge: (mergeId: string) =>
  Effect<UndoResult, MergeNotFound | SqlError, D1Client | SqlClient | Member>;

// src/worker/catalog/kinds.ts
/** Statements that create the kind if missing, and an expression for its id, for any batch. */
export const kindStatements: (sql: D1Client, name: KindName, createdAt: string) =>
  { readonly kindId: Fragment; readonly statements: ReadonlyArray<Statement> };

// src/worker/purchases/write.ts
export const lineRows: (purchaseId: string, plan: LinkPlan) => { products: …; lines: ReadonlyArray<LineRow & { origin: Origin }> };
/** The only line writer: stores the origin's current product, and the origin in via_product_id when it is merged away. */
export const insertLines: (sql: D1Client, lines: ReadonlyArray<LineRow>) => Statement;
```

## Call paths

```text
E12 undo (production)                                   Tests
MCP undo_product_merge → handler → merges.undoProductMerge   callTool(rev, "undo_product_merge") → same path,
  → one D1 batch (lines by via subtree, re-root, mark)        real local D1; assert with get_purchase/list_products
  → products.catalogProduct(A), (from) → output

E12 recording after a merge (production)
record_purchase → record.ts → catalog.linkLines (evidence: origin A, current B)
  → write.lineRows (origin A) → write.insertLines (product_id = B, via = A) in the record batch

E13 correction keeping an origin
correct_purchase → correct.ts → read.purchaseDetail (line origin A) → plan keeps origin A
  → write.insertLines (B, via A)

E15 differing sizes
merge_products → merges.mergeProducts → pre-check → SizesDiffer (no batch)
  race: guard inside batch → NOT NULL abort → reread order → SizesDiffer

E24 migration over data (test only)
applyD1Migrations([0001]) → env.DB insert with 0001 columns → applyD1Migrations([0002]) → callTool get_purchase
```

## What each module hides

| Module | Hides | So callers never |
|---|---|---|
| `catalog/merges.ts` | the merge guard, line moves with `via`, one-hop `merged_into` compression, kind inheritance, the undo subtree CTE, the reread order after a failed batch | coordinate merge steps, see provenance, or classify a batch failure |
| `catalog/kinds.ts` | normalization by `nameKey`, create-on-conflict inside another batch, moving and clearing kinds on merged-away products | decide whether a kind exists before naming it |
| `catalog/products.ts` | counts of distinct purchases, the `merged[]` view, search over merged names, cursor paging, the delete guard and cascade over merged orphans | know which products are merged away |
| `purchases/catalog.ts` | the origin rule; comparing current products for `ProductMismatch` | reason about merges while recording |
| `purchases/write.ts` `insertLines` | resolving the origin's current product inside the INSERT | know a merge can land between their read and their batch |

## Errors

- Catalog failures live in `src/operations/catalog/failures.ts`, each with `_tag`, `message` for the agent and recovery fields; the generic adapters turn them into the shared envelope (ADR-0004).
- Pre-checks fail fast with a precise failure. A failed batch is reread in the order the brief states; only an unexplained failure surfaces as the original `SqlError` (`DatabaseFailure`).
- `already_applied` and `already_undone` are successes, as `already_recorded` is.

## Changes elsewhere

- `Product` on the wire gains `kind`; every existing output that carries a product shows it (outputs may gain fields).
- `NewProduct` gains `kind`, so `record_purchase` and `correct_purchase` create or reuse kinds in their own batch.
- `recording-purchases.md`'s "#8" paragraph points to `catalog.md`.

## Not decided here

Behaviour (the spec's examples), the schema and contracts (the brief), build order, function bodies, file names inside `catalog/` beyond the three modules above.
