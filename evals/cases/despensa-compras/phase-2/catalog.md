# Product catalog: kinds, edits, merges and their undo

Status: Accepted (by the owner, 2026-11-02)
Date: 2026-11-02. Grounded on `231930f` (`main`), wrangler 4.156, `@effect/sql-d1` 4.1.1, SQLite 3.54 (local experiments).
Serves: issue #8 (catalog tidying over MCP), #16 (its screens), and #9, #10 and #11, which group by kind.

## Problem and scope

Agents create products from abbreviated receipt names, so the catalog collects duplicates and unclear names (`GALLO`, `ECUVITA`). A product left without lines after `delete_purchase` can no longer be found by evidence, so recording that receipt again creates a duplicate. Price comparison (#9), the shopping list (#10) and restock rhythm (#11) need clean product identities and a **kind** that groups brands and presentations.

This brief settles what is costly to reverse:

- the `0002` schema: kinds, merges and the provenance kept on purchase lines;
- the catalog operations that write;
- how every reader sees a merged product, now and in #9–#11.

Out of scope: screens (#16, after #7), kind groups or sections, edit history for names and sizes, fuzzy matching when recording. Protected: everything in [recording-purchases.md](recording-purchases.md) and ADR-0004, 0006 and 0008.

## Domain meaning (accepted by the owner, 2026-11-02)

- **Kind** ("tipo" in the UI): what you would write on the shopping list, such as "arroz", "leche" or "papel higiénico". Any product of a kind substitutes for another. When two variants do not substitute, the household makes two kinds ("leche entera", "leche descremada"). Kinds are a flat list.
- A product has **one kind or none**.
- A kind is **named, not chosen from a list**. A name that does not exist yet creates the kind. Names are matched normalized: "Arroz" is "arroz". Kinds can be renamed, merged (all products move; **no undo**), and deleted **only when no visible product has them**.
- `record_purchase` (and `correct_purchase`) accept an **optional kind name in `newProduct`**. When evidence links the line to an existing product, `newProduct` is ignored as today.
- A product's **name, brand and size** can be edited. No history is kept.
- **Merge A into B**: B keeps its name, brand, size and kind; if B has no kind it takes A's. A's purchases count as B's. A's id keeps working for reads and leads to B. **Who merged and when** is recorded.
- **Merging two products whose sizes are both known and differ is refused**, because different presentations are different articles and merging them would corrupt the price per kilogram, liter or unit (#9); a misread size is fixed first. If either size is unknown, the merge is allowed.
- **Undo a merge = as if it had never been merged.** A gets back its lines from before the merge and every line recorded later through A's evidence (its barcode, store code or receipt text) or an explicit pick of A's id. Lines linked through B's evidence stay with B. A returns with its own name, brand, size and kind. What changed on B meanwhile stays on B, including a kind B took from A.
  - If A's kind was merged into another kind meanwhile, A returns with the surviving kind. If it was deleted, A returns with no kind.
  - A line whose evidence matched both A and B (for example, both had the same barcode) stays with B: the receipt never said which duplicate it was.
- **Writes through a merged-away id are refused** (`update_product`, `delete_product`, either side of `merge_products`) and name the product it was merged into, who did it and when. Reads and recording keep resolving it.
- **A product with no purchases** shows in the catalog as such and can be merged or deleted. Only such a product can be deleted. Deleting one also deletes the products without purchases merged into it, along with their merge records. `delete_purchase` never deletes products.
- A kind held only by merged-away products can be deleted; those products lose it.
- Search by name and the filters "no kind" and "no purchases" exist **for tidying only**. Recording still links only by exact evidence (ADR-0008).

## Caller usage

```jsonc
// list_products: find what to tidy
{ "search": "gallo" }
// → { "products": [{ "id": "prd_g", "name": "GALLO", "brand": null, "size": null, "kind": null,
//      "purchases": 3, "lastPurchasedOn": "2026-11-01", "merged": [] }], "nextCursor": null }

// update_product: flat optional fields; null clears brand, size or kind; kind is a name
{ "productId": "prd_g", "name": "Arroz largo fino Gallo Oro 1 kg", "brand": "Gallo",
  "size": { "amount": 1000, "unit": "g" }, "kind": "arroz" }
// → { "product": { "id": "prd_g", …, "kind": { "id": "knd_a", "name": "arroz" }, "purchases": 3, … } }
// A later update_product { "productId": "prd_x", "kind": "Arroz" } reuses knd_a.

// A duplicate after delete_purchase and a re-record: list_products { "withoutPurchases": true }
// shows prd_old with "purchases": 0. Merge it, generating requestId once and reusing it on retry.
{ "requestId": "7c1…", "productId": "prd_new", "intoProductId": "prd_old" }
// → { "outcome": "merged",
//     "merge": { "id": "mrg_1", "productId": "prd_new", "intoProductId": "prd_old",
//                "mergedBy": "owner@…", "mergedAt": "2026-11-02T13:05:00Z", "undoneBy": null, "undoneAt": null },
//     "product": { "id": "prd_old", …, "purchases": 1,
//                  "merged": [{ "mergeId": "mrg_1", "product": { "id": "prd_new", … }, "intoProductId": "prd_old",
//                               "mergedBy": "owner@…", "mergedAt": "…", "lines": 1 }] } }
// get_purchase, find_products and list_products now show prd_old wherever prd_new was.

// undo_product_merge (the screen shows "merged by owner@… on 2 Nov" from merged[])
{ "mergeId": "mrg_1" }
// → { "outcome": "undone", "product": { "id": "prd_new", … }, "from": { "id": "prd_old", … } }

// record_purchase line with a kind for the new product
{ "rawText": "YERBA PLAYADITO 1KG", "barcode": "7790387000105", "amount": 5400,
  "newProduct": { "name": "Yerba mate Playadito 1 kg", "brand": "Playadito",
                  "size": { "amount": 1000, "unit": "g" }, "kind": "Yerba" } }
```

Failures, each with `_tag`, an agent-facing `message`, and recovery fields:

```jsonc
{ "_tag": "SizesDiffer", "message": "These presentations differ (500 g and 1000 g). If one was misread, fix it with update_product, then merge again with the same requestId.",
  "product": { "id": "prd_500", "size": { "amount": 500, "unit": "g" } }, "into": { "id": "prd_1k", "size": { "amount": 1000, "unit": "g" } } }
{ "_tag": "ProductAlreadyMerged", "message": "prd_a is merged into prd_b (partner@… on 2026-11-02). Act on prd_b, or undo that merge first.",
  "productId": "prd_a", "intoProductId": "prd_b", "mergeId": "mrg_1", "mergedBy": "partner@…", "mergedAt": "…" }
{ "_tag": "ProductHasPurchases", "message": "Only a product with no purchases can be deleted. Merge it into the right product instead.", "productId": "prd_g", "purchases": 3 }
{ "_tag": "KindNameTaken", "message": "Kind arroz already exists. To combine them, use merge_kinds.", "kind": { "id": "knd_a", "name": "arroz" } }
```

## Operations

| Operation            | Kind              | Input                                                                                                                               | Output                                                        | Failures                                                                                                                  |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `list_products`      | read              | `search?`, `productId?` (resolved to the current product), `kind?` (name), `withoutKind?`, `withoutPurchases?`, `cursor?`, `limit?` | `{ products: CatalogProduct[], nextCursor }`                  | `KindNotFound`                                                                                                            |
| `update_product`     | idempotent-write  | `productId`, `name?`, `brand?` (text or null), `size?` (or null), `kind?` (name or null); at least one                              | `{ product: CatalogProduct }`                                 | `UnknownProduct`, `ProductAlreadyMerged`                                                                                  |
| `merge_products`     | idempotent-write  | `requestId`, `productId`, `intoProductId`                                                                                           | `{ outcome: "merged" \| "already_applied", merge, product }`  | `UnknownProduct`, `ProductAlreadyMerged`, `SizesDiffer`, `InvalidInput` (same product; requestId reused for another pair) |
| `undo_product_merge` | idempotent-write  | `mergeId`                                                                                                                           | `{ outcome: "undone" \| "already_undone", product, from }`    | `MergeNotFound`                                                                                                           |
| `delete_product`     | destructive-write | `productId`                                                                                                                         | `{ deleted, alsoDeleted: string[] }`                          | `UnknownProduct`, `ProductHasPurchases`, `ProductAlreadyMerged`                                                           |
| `list_kinds`         | read              | `{}`                                                                                                                                | `{ kinds: [{ id, name, products }] }` (current products only) | —                                                                                                                         |
| `rename_kind`        | idempotent-write  | `kindId`, `name`                                                                                                                    | `{ kind }`                                                    | `KindNotFound`, `KindNameTaken`                                                                                           |
| `merge_kinds`        | destructive-write | `kindId`, `intoKindId`                                                                                                              | `{ kind, moved }`                                             | `KindNotFound`, `InvalidInput` (same kind)                                                                                |
| `delete_kind`        | destructive-write | `kindId`                                                                                                                            | `{ deleted }`                                                 | `KindNotFound`, `KindHasProducts`                                                                                         |

Wire changes to existing operations: `Product` gains `kind: { id, name } | null` everywhere it appears. `NewProduct` gains an optional `kind` (non-blank text). `CatalogProduct` is `Product` plus `purchases` (distinct purchases), `lastPurchasedOn`, and `merged[]`: every active merge whose current product is this one, flattened, each with the merged product's own fields, who and when, and `lines` (how many lines an undo would return). The catalog's not-found failure is `UnknownProduct { productId }`, because the existing `ProductNotFound` names a receipt line. Line provenance is not exposed on the wire.

Tool descriptions must state the kind policy: kinds are created by name; `merge_kinds` cannot be undone and frees the old name, so classifying something under that name later creates the kind again; `undo_product_merge` returns A with its own kind, or the kind that replaced it.

## Schema (`migrations/0002_catalog.sql`)

```sql
CREATE TABLE kinds (id TEXT PRIMARY KEY, name TEXT NOT NULL, name_key TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL);
ALTER TABLE products ADD COLUMN kind_id TEXT REFERENCES kinds(id);
-- The current product this one leads to: always a product that is not merged itself. NULL: current.
ALTER TABLE products ADD COLUMN merged_into TEXT REFERENCES products(id);
-- The merged-away product whose evidence or pick linked this line. NULL: product_id itself.
ALTER TABLE purchase_lines ADD COLUMN via_product_id TEXT REFERENCES products(id);
CREATE TABLE product_merges (
  id TEXT PRIMARY KEY, request_id TEXT NOT NULL UNIQUE,
  product_id TEXT NOT NULL REFERENCES products(id),   -- merged away (A)
  into_id TEXT NOT NULL REFERENCES products(id),      -- direct target at merge time (B); NOT NULL is the guard
  merged_by TEXT NOT NULL, merged_at TEXT NOT NULL,
  undone_by TEXT, undone_at TEXT,
  CHECK ((undone_by IS NULL) = (undone_at IS NULL)), CHECK (product_id <> into_id));
CREATE UNIQUE INDEX product_merges_active ON product_merges(product_id) WHERE undone_at IS NULL;
CREATE INDEX product_merges_into ON product_merges(into_id);
CREATE INDEX products_kind ON products(kind_id) WHERE kind_id IS NOT NULL;
CREATE INDEX products_merged_into ON products(merged_into) WHERE merged_into IS NOT NULL;
CREATE INDEX lines_via ON purchase_lines(via_product_id) WHERE via_product_id IS NOT NULL;
```

**With the previous Worker running:** the migration adds a table, nullable columns and indexes only. The previous Worker names its columns in every INSERT and SELECT, so its new rows read as "no kind, current, linked to itself". No merged product can exist until the new Worker serves `merge_products`. Rolling the Worker back is safe too: lines already point at current products, so an older Worker still reads merged history as one product. It just cannot undo.

Identifiers gain the prefixes `knd_` and `mrg_`.

## Shape and invariant owners

Every purchase line points at a **current** product. Merging A into B moves A's lines to B in one batch, and each moved line keeps `via_product_id = A`. Lines recorded later through A's evidence, or by picking A's id, are stored the same way. Undo moves back every line whose `via` is A or a product merged into A.

| Invariant                                     | Owner                                                                                                                 | Backstop                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| No line points at a merged product            | merge batch (existing lines); `insertLines` resolves the product inside the INSERT, in the same batch (new lines)     | acceptance tests                                         |
| `merged_into` is one hop to a current product | `catalog/merges.ts`, the only writer of `merged_into`, `product_merges` and `via_product_id` rewrites                 | —                                                        |
| No merge cycles                               | merge guard: both ends current and different, so a merge only joins two current products and the graph stays a forest | `CHECK (product_id <> into_id)`, `product_merges_active` |
| Differing known sizes are refused             | merge guard, evaluated inside the batch, so a concurrent size edit is seen                                            | —                                                        |
| Delete only products with no purchases        | each delete statement repeats `merged_into is null and not exists (line on it)`                                       | foreign keys (always enforced by D1)                     |
| Undo restores exactly                         | `via_product_id` on lines plus the merge subtree; record, correct and `insertLines` keep each line's **origin**       | acceptance tests                                         |
| One kind per normalized name                  | `kinds.name_key UNIQUE` (`nameKey` from `codes.ts`)                                                                   | the same                                                 |
| One kind per product                          | `products.kind_id`, a single column                                                                                   | —                                                        |
| Who merged or undid                           | `Member` → `merged_by`, `undone_by`                                                                                   | `NOT NULL`, `CHECK`                                      |

**Origin rule (linking).** A line's **origin** is the product whose evidence or pick linked it; its stored `product_id` is the origin's current product. In the winning evidence tier, take the rows of the unique current product R and their distinct origins L. The origin is R if R is in L, else the single origin when L has one, else R. An explicit pick of R takes the same origin. An explicit pick of a merged-away id keeps that id as origin. Mismatch checks (`ProductMismatch`) compare current products, so picking A while the code matches B (A merged into B) is not a mismatch. A correction that keeps a line's product keeps its origin.

**Merge batch** (one `D1Client.batch`):

```sql
-- Guard: a NULL into_id violates NOT NULL and rolls back the batch; request_id UNIQUE catches a racing retry.
insert into product_merges (id, request_id, product_id, into_id, merged_by, merged_at)
values (:m, :req, :A, (select b.id from products a, products b
  where a.id = :A and b.id = :B and a.id <> b.id and a.merged_into is null and b.merged_into is null
    and (a.size_amount is null or b.size_amount is null
         or (a.size_amount = b.size_amount and a.size_unit = b.size_unit))), :member, :now);
update purchase_lines set via_product_id = coalesce(via_product_id, product_id), product_id = :B where product_id = :A;
update products set merged_into = :B where id = :A or merged_into = :A;
update products set kind_id = coalesce(kind_id, (select kind_id from products where id = :A)) where id = :B;
```

Before the batch, the handler looks up `request_id` (`already_applied` with the stored merge, even if it was undone since; it does not merge again) and pre-checks for a precise failure. After a batch failure it rereads in this order: request id → `already_applied`; A missing → `UnknownProduct`; A merged → `ProductAlreadyMerged`; B missing or merged → the same for B; sizes → `SizesDiffer`; otherwise the original `SqlError`.

**Undo batch.** `sub(m)` is A plus every product whose active merge leads to A, recursively; the CTE repeats in each statement:

```sql
with recursive sub(id) as (select product_id from product_merges where id = :m and undone_at is null
  union select pm.product_id from product_merges pm join sub on pm.into_id = sub.id where pm.undone_at is null)
update purchase_lines set product_id = :A,
  via_product_id = case when via_product_id = :A then null else via_product_id end
where via_product_id in (select id from sub);
with recursive sub(id) as (…)
update products set merged_into = case when id = :A then null else :A end where id in (select id from sub);
update product_merges set undone_by = :member, undone_at = :now where id = :m and undone_at is null returning id;
```

The merge row is marked last, so earlier statements still see it. An empty `RETURNING` means `already_undone`.

**Delete batch** for current product P with no lines: every statement repeats the guard `P exists, merged_into is null, and no line has product_id = P`. Delete the `product_merges` rows whose `product_id` or `into_id` is P or a product merged into P (active and undone), then those products, then P with `RETURNING`. An empty result is reread as `UnknownProduct`, `ProductAlreadyMerged` or `ProductHasPurchases`.

**Kinds.** A kind name in any write becomes `insert into kinds … on conflict(name_key) do nothing` plus `(select id from kinds where name_key = :key)` in the same batch, shared by record, correct and `update_product`. `merge_kinds` moves every product with the kind, merged-away ones included, then deletes it. `delete_kind` is guarded by "no current product has it", clears it from merged-away products, and deletes it.

## How readers see merges

- **`find_products` and linking:** evidence joins `purchase_lines.product_id`, which is always current, so two duplicates joined by a merge now match uniquely. Explicit ids resolve in one hop: `coalesce(merged_into, id)`.
- **`get_purchase` and `list_purchases`:** unchanged joins, plus `left join kinds`.
- **`list_products`:** current products only; search matches the normalized name and brand of the product and of the products merged into it.
- **#9 (prices):** the current product of a line is `l.product_id`; its kind is `products.kind_id` joined on it. A kind can mix g, ml and unit products: kinds are not unit declarations, so #9 handles missing or incompatible denominators explicitly.

  ```sql
  select c.name_key as chain, pu.purchased_on, l.product_id, p.kind_id, p.size_amount, p.size_unit,
    l.quantity_milli, l.unit,
    l.amount_cents + coalesce((select sum(a.amount_cents) from purchase_adjustments a
      where a.purchase_id = l.purchase_id and a.line = l.line), 0) as net_cents
  from purchase_lines l join purchases pu on pu.id = l.purchase_id
  join stores s on s.id = pu.store_id join chains c on c.id = s.chain_id
  join products p on p.id = l.product_id
  where p.kind_id = :kind  -- or l.product_id = :product
  ```

- **#10 (list):** an item that names a product resolves it in one hop, `coalesce(p.merged_into, p.id)`. An item that names a kind holds a foreign key, so `merge_kinds` and `delete_kind` must handle list items; #10 decides how and adds its statements to those batches.
- **#11 (rhythm):** intervals between `purchased_on` over `(select distinct purchase_id, product_id from purchase_lines)`, partitioned by `l.product_id` or by `p.kind_id`. Neither query mentions merges.

## State space

| Situation                                                           | Result                                                                                                                                                                                  |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| merge: lost response, retry with the same requestId                 | `already_applied` with the merge. Two racing copies: one wins, the other fails on `request_id UNIQUE`, rereads, `already_applied`.                                                      |
| merge retried after someone undid it                                | `already_applied` with `undoneBy` set; it does not merge again.                                                                                                                         |
| merge retried with a new requestId after a lost response            | `ProductAlreadyMerged`, naming the existing merge.                                                                                                                                      |
| undo: lost response, retry, or retry after a partner merged A again | `already_undone`; the new merge has its own id and stands.                                                                                                                              |
| update_product retry                                                | Same values again. A partner's edit of the same field in between is overwritten: last writer wins, by decision (no history).                                                            |
| delete_product, merge_kinds, delete_kind retry                      | `UnknownProduct` or `KindNotFound`, "it may already have been deleted", as `delete_purchase` does.                                                                                      |
| merge A→B and a recording that links to A, either order             | The line ends on B with `via` A, because `insertLines` resolves inside the batch. Undo returns it to A.                                                                                 |
| merge A→B and merge B→A                                             | The first commits; the second's guard fails, reread → `ProductAlreadyMerged`. No cycle.                                                                                                 |
| merge A→B and delete A                                              | Delete first: merge → `UnknownProduct`. Merge first: delete → `ProductAlreadyMerged`.                                                                                                   |
| merge A→B and delete B                                              | Delete first: merge → `UnknownProduct`. Merge first: B has A's lines → `ProductHasPurchases`; with none, both are deleted.                                                              |
| A→B and B→C at the same time                                        | A→B first: B→C moves every line, A now leads to C. B→C first: A→B → `ProductAlreadyMerged { productId: B, intoProductId: C }`.                                                          |
| undo A→B after B→C                                                  | A's lines return to A from C; B stays merged into C.                                                                                                                                    |
| undo B→C while A→B is active                                        | Lines whose `via` is A or B return to B (`via` B cleared, `via` A kept); A still leads to B.                                                                                            |
| delete_purchase and a merge or undo                                 | Batches serialize; deleted lines take their `via` with them.                                                                                                                            |
| correct_purchase keeping a line that came through A                 | The kept origin is A, so it is stored on B with `via` A and `linkedBy` kept. Undo returns it.                                                                                           |
| kind merge K1→K2 and an assignment of "K1"                          | Assignment first: moved to K2. Merge first: "K1" is free and is created again.                                                                                                          |
| delete_kind and an assignment of it                                 | Assignment first: `KindHasProducts`. Delete first: the assignment creates it again.                                                                                                     |
| previous Worker during the deploy window                            | No merges exist yet. Residual: a merge issued within seconds of the swap while an old in-flight recording links to A leaves that line on A; it reads as A until merged again. Accepted. |

## Alternatives and provenance

Two independent candidates (Codex gpt-6.1-sol and Claude Opus 5.5) were compared by a separate judge (Claude Fable 5.1), which recommended this base.

- **Rejected: keep each line on its original product and resolve merges on every read.** Undo is trivially exact, but every reader now and later (`find_products`, catalog counts, #9, #10, #11, any ad-hoc query) must resolve merges. Forgetting once silently splits a price history. Here only the two line writers, behind one `insertLines`, must keep the origin; forgetting there loses lines on undo, which an acceptance test guards.
- **Rejected from the losing candidate:**
  - a household-wide write epoch that every purchase write had to pass: it reached into the protected record, correct and delete paths and made two members recording at once contend, while in-batch guards already refuse stale merges and deletes;
  - tombstone deletes: extra states and filters on every read, only to spare an in-flight insert on a just-deleted orphan, which already recovers as `ProductNotFound`;
  - revisions on every catalog write with a request table: a read before each write for little return, since edits are last-writer-wins by decision and only a merge needs a request id;
  - recreating a merged-away kind on undo: it would reverse a kind merge the owner made irreversible.
- **Grafted from it:** refusing writes through merged-away ids, cursor pagination, the kind policy in tool descriptions, and the note that kinds are not unit declarations.
- **Rejected: a per-merge list of moved lines.** Lines recorded after the merge would need registering too, and `delete_purchase` and `correct_purchase` would maintain a second table; a `via` column dies with its line.
- **Rejected: a database trigger that resolves inserted lines.** It would also cover a previous Worker's in-flight inserts, but remote D1's support for `CREATE TRIGGER` in migrations is not observed, and a failed migration turns `main` red. Resolving inside the `insertLines` statement covers every current writer.

## Implementation contract

Must preserve:

- one atomic batch per write, guards evaluated inside the batch, reread after failure;
- lines always on a current product, with `via_product_id` set exactly when the origin is merged away;
- `catalog/merges.ts` as the only writer of `merged_into`, `product_merges` and `via` rewrites; `insertLines` as the only line writer;
- refusal of writes through merged-away ids; refusal of differing known sizes; deletion only without purchases;
- no provenance on the wire; expand-only migrations; inputs gain only optional fields.

May choose: module and file names, statement grouping, pagination cursor format and limits, how search normalizes text, message wording, and whether `list_products` filters in SQL or in the Worker at household scale.

Return to design if D1 rejects a statement shape above, or if a reader needs line provenance on the wire.

## Open risks

- **A future line writer that forgets the origin.** Undo would return fewer lines and nothing else would look wrong. Mitigation: `insertLines` is the only writer and takes origins by type; an acceptance test corrects a line that came through A, then undoes.
- **A kind merge frees the old name,** so an agent classifying under it later creates it again. If it bothers the household, a later expand migration can add name aliases.
- **Size edits change how #9 reads every past line** of that product. Accepted: no history.

Governing decisions: [ADR-0004](../adrs/0004-operations-defined-once-in-a-registry-served-over-http-and-mcp.md), [ADR-0006](../adrs/0006-handlers-receive-the-signed-in-member-and-atomic-batches.md), [ADR-0008](../adrs/0008-purchases-recorded-whole-deduplicated-and-linked-only-by-exact-evidence.md). ADR candidate: **ADR-0010**, merges move purchase lines and keep per-line provenance for undo.
