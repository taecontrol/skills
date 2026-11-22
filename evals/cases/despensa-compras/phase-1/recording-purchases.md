# Recording purchases: data model and agent contract

Status: Accepted (by the owner, 2026-11-01)

<!-- Eval case copy. Changed from the accepted original: the two real receipts are replaced by synthetic receipts of the same shape (see `.work/specs/record-purchases.md`), and every figure, code, time and address taken from them follows. Nothing else changed. -->

Date: 2026-11-01. Grounded on `fa3ac39` (`main`), `effect` and `@effect/sql-d1` 4.1.1, `@cloudflare/vitest-plugin` 1.4.11.
Serves: recording a purchase read from a receipt over MCP, and issues #7–#12, which build on this model.

## Problem and scope

A household member sends receipt photos to an AI agent (the Claude app or ChatGPT through a remote MCP connector, or Claude Code or Codex). The agent reads the receipt itself and records the purchase through MCP. Despensa never receives images and does no OCR.

This brief settles the parts that are costly to reverse:

- the first D1 schema;
- the write contract agents use;
- how the signed-in person reaches handlers;
- how a product is recognized across receipts.

Out of scope: USD and exchange rates (#9), payment method and bank reimbursements, any link to the owner's finance app, product kinds (#8), the shopping list (#10), and screens (#7, #12).

Protected behavior: `get_status`, the Origin and Access gates, the failure envelope, and both MCP revisions.

## Grounding

- **Receipts from 2026-11-01:**
  - Coto: 27 lines and 14 discounts. They add up exactly to the printed subtotal 180,644.74, discounts −31,313.66 and total 149,331.08.
  - Farmcity: 2 lines with no codes, total 7,195.50.
  - Weighed lines are rounded by the store: 0.264 × 38,499 = 10,163.736 is printed 10,163.74.
  - Printed discounts are not their label's percentage: "25%" of 4,580.00 is printed −1,150.62.
  - A promotion spans lines: 6x3 shows −2,690 on each of three lines.
  - Weighed and store-brand items carry EAN-13 codes with prefixes 25 and 28. These are restricted-circulation codes and identify nothing outside the store.
  - Every line at Coto has a 10-digit store article code.
  - Both receipts print the issuer's CUIT, a point of sale and a number.
- **Batches:** `@effect/sql-d1` 4.1.1 provides `D1Client.batch(statements)`, one atomic D1 batch, and `D1Client.layer` provides both `D1Client` and `SqlClient`. D1 has no interactive transactions. Every batch failure surfaces as `SqlError` with no reliable cause, so a constraint violation looks like an outage.
- **Identity:** `refuseUnlessAccess` already verifies the Access assertion and its `email` but discards it. Handlers receive only `SqlClient`.
- **Migrations:** the deploy job applies `migrations/*.sql` with `wrangler d1 migrations apply` before deploying the Worker. Tests can apply the same files with `applyD1Migrations` from `cloudflare:test`.
- **Remote connectors:** Access Managed OAuth registration now accepts Claude's and ChatGPT's callbacks. A full login from those clients has not been observed yet.

## Domain meaning (accepted by the owner)

- **Purchase:** one receipt from one store on one date, in ARS as paid, with its printed totals.
- **Store:** a branch, such as "Av. Rivadavia 5108", of a **chain**, such as "Coto". Comparisons default to the chain.
- **Product:** the exact article, brand plus presentation, such as "Arroz largo fino Lucchetti 1 kg".
- **Line:** one printed receipt line. It keeps its raw text always, its codes as printed, and its quantity when printed.
- **Adjustment:** a printed discount or surcharge, attached to a line or to the whole receipt.
- **Printed amounts are the truth.** Despensa never computes a line from quantity × unit price, nor a discount from its label.
- **Totals check:** a purchase whose lines and adjustments do not add up to the printed total is refused, with the difference.
- **Who recorded it:** taken from the Access email, never passed by the agent.
- **Unclear items:** the agent asks the person when it cannot tell what a line is.

## Caller usage

The agent's usual sequence for one receipt is `list_stores`, then `find_products`, then `record_purchase`.

```jsonc
// record_purchase, abridged (Coto)
{
  "requestId": "9f2c…", // generated once for this receipt; reused on retry
  "store": { "chain": "Coto", "branch": "Av. Rivadavia 5108", "branchCode": "184" },
  "date": "2026-11-01",
  "time": "10:14:22",
  "receipt": { "taxId": "30-71188345-9", "pointOfSale": "2184", "number": "00731562" },
  "subtotal": 180644.74,
  "discounts": -31313.66,
  "total": 149331.08,
  "lines": [
    {
      "rawText": "PAN D/MESA BLANCOFARGO BSA 390 GRM",
      "barcode": "07793891160009",
      "storeCode": "0000631152",
      "quantity": 2,
      "unit": "unit",
      "unitPrice": 5517,
      "amount": 11034,
      "adjustments": [{ "text": "1 *70% 2DA MARCAS", "amount": -3861.9 }],
      "newProduct": {
        "name": "Pan de mesa blanco Fargo 390 g",
        "brand": "Fargo",
        "size": { "amount": 390, "unit": "g" },
      },
    },
    {
      "rawText": "PECETO AL HORNOCOTO X KG",
      "barcode": "02506531002646",
      "storeCode": "0000006531",
      "quantity": 0.264,
      "unit": "kg",
      "unitPrice": 38499,
      "amount": 10163.74,
      "adjustments": [{ "text": "1 *25% ELABORADOS", "amount": -2540.94 }],
      "productId": "prd_…",
    }, // reused from find_products
    // … every printed line, in order
  ],
}
// → { "outcome": "recorded", "purchase": { "id": "pur_…", "revision": 1, "recordedBy": "owner@…", "lines": [ … "linkedBy": "barcode" … ] } }
```

How each situation turns out:

- **Totals off:** a discount misread as −3,861.50 returns `TotalsMismatch { check: "discounts", printed: -31313.66, computed: -31313.26, difference: 0.40 }`. Nothing is written. The agent rereads the receipt and sends again with the same `requestId`.
- **Lost response:** the agent sends the same `requestId` again and gets `already_recorded` with the stored purchase, even if its input changed. One purchase exists.
- **Same photo days later, new conversation:** the `requestId` is new but the receipt identity (CUIT, point of sale, number) is the same. The agent gets `already_recorded` with who recorded it and when. Nothing is overwritten, and the agent tells the person.
- **Order of checks:** an existing purchase with this `requestId` or receipt identity is looked up first, so a repeat answers `already_recorded` even if its totals were misread. Then totals, then products, then one batch.
- **Known product:** a line whose stable barcode, or whose store code within the same chain, identifies exactly one product links to it (`linkedBy: "barcode"` or `"store_code"`), even when the agent sent `newProduct`. A line with no codes at all links by its normalized raw text within the chain (`"receipt_text"`).
- **Agent chose a different product:** a `productId` that contradicts a single code match returns `ProductMismatch`, naming both products. Nothing is written. At recording time a contradiction means a misread or a wrong pick, so it is refused. When two products match, the agent's choice among them is accepted. In a correction the choice is explicit, so it wins.
- **Misread item after recording** (second slice): `correct_purchase { requestId, purchaseId, expectedRevision: 1, lines: [{ line: 21, …complete line… }] }` replaces those lines and rechecks the totals. An explicit product choice wins over code matches. A stale revision returns `RevisionConflict { currentRevision }`. A retried `requestId` returns `already_applied`.
- **Structural misread or a duplicate that slipped through** (second slice): `delete_purchase`, then record again.
- **Two members record different receipts at once:** both are recorded, each with its own email. Two new products with the same new barcode created at the same moment can both exist; `find_products` then shows both, and #8 merges them.

## Operations

| Operation          | Kind              | Slice |
| ------------------ | ----------------- | ----- |
| `list_stores`      | read              | 1     |
| `find_products`    | read              | 1     |
| `record_purchase`  | idempotent-write  | 1     |
| `get_purchase`     | read              | 1     |
| `list_purchases`   | read              | 2     |
| `correct_purchase` | idempotent-write  | 2     |
| `delete_purchase`  | destructive-write | 2     |

Wire conventions:

- **Money:** a JSON number in ARS with at most 2 decimals, signed as printed (discounts are negative). It decodes to integer cents.
- **Quantity:** at most 3 decimals, decoded to integer thousandths. It is optional; when unknown it stays null.
- **Product of a line:** flat optional fields (`productId` or `newProduct`, exactly one) rather than unions, because remote clients render `anyOf` unevenly.
- **Date and time:** `date` is the printed local date. `time` is optional.
- **Receipt identity:** the key is the CUIT's digits, then the point of sale and the number without leading zeros: `30711883459`, `2184`, `731562`.
- **Store:** `store` is resolved by name. The chain is matched by normalized name, and the branch by branch code or normalized address within the chain. A missing chain or branch is created.

Failures, each with `_tag`, a `message` written for the agent, and recovery fields:

- `TotalsMismatch`
- `ProductMismatch`
- `ProductNotFound`
- `PurchaseNotFound`
- `LineNotFound` (slice 2)
- `RevisionConflict` (slice 2)
- `ReceiptAlreadyRecorded`, when a correction would give a purchase another purchase's receipt identity (slice 2)

## Schema (`migrations/0001_purchases.sql`)

```sql
CREATE TABLE chains (id TEXT PRIMARY KEY, name TEXT NOT NULL, name_key TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL);
CREATE TABLE stores (
  id TEXT PRIMARY KEY, chain_id TEXT NOT NULL REFERENCES chains(id),
  address TEXT NOT NULL, address_key TEXT NOT NULL, branch_code TEXT, created_at TEXT NOT NULL,
  UNIQUE (chain_id, address_key));
CREATE UNIQUE INDEX stores_branch_code ON stores(chain_id, branch_code) WHERE branch_code IS NOT NULL;
CREATE TABLE products (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, brand TEXT,
  size_amount INTEGER CHECK (size_amount > 0), size_unit TEXT CHECK (size_unit IN ('g','ml','unit')),
  created_at TEXT NOT NULL, CHECK ((size_amount IS NULL) = (size_unit IS NULL)));
CREATE TABLE purchases (
  id TEXT PRIMARY KEY, request_id TEXT NOT NULL UNIQUE,
  store_id TEXT NOT NULL REFERENCES stores(id),
  purchased_on TEXT NOT NULL, purchased_time TEXT,
  tax_id TEXT, point_of_sale TEXT, receipt_number TEXT,
  receipt_key TEXT UNIQUE,                          -- set only when CUIT, point of sale and number are all printed
  subtotal_cents INTEGER, discounts_cents INTEGER CHECK (discounts_cents <= 0),
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  revision INTEGER NOT NULL DEFAULT 1 CHECK (revision >= 1),
  recorded_by TEXT NOT NULL, recorded_at TEXT NOT NULL);
CREATE INDEX purchases_date ON purchases(purchased_on DESC, purchased_time DESC);
CREATE INDEX purchases_store ON purchases(store_id, purchased_on);
CREATE TABLE purchase_lines (
  purchase_id TEXT NOT NULL REFERENCES purchases(id), line INTEGER NOT NULL CHECK (line >= 1),
  product_id TEXT NOT NULL REFERENCES products(id),
  raw_text TEXT NOT NULL CHECK (raw_text <> ''),
  barcode TEXT, gtin TEXT,                          -- gtin: only a valid, non-restricted, non-zero barcode
  store_code TEXT, text_key TEXT,                   -- text_key: only for lines with no barcode and no store code
  quantity_milli INTEGER CHECK (quantity_milli > 0), unit TEXT CHECK (unit IN ('unit','kg','l')),
  unit_price_cents INTEGER CHECK (unit_price_cents >= 0),
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  PRIMARY KEY (purchase_id, line), CHECK ((quantity_milli IS NULL) = (unit IS NULL)));
CREATE INDEX lines_product ON purchase_lines(product_id);
CREATE INDEX lines_gtin ON purchase_lines(gtin) WHERE gtin IS NOT NULL;
CREATE INDEX lines_store_code ON purchase_lines(store_code) WHERE store_code IS NOT NULL;
CREATE INDEX lines_text_key ON purchase_lines(text_key) WHERE text_key IS NOT NULL;
CREATE TABLE purchase_adjustments (
  purchase_id TEXT NOT NULL REFERENCES purchases(id), position INTEGER NOT NULL,
  line INTEGER,                                     -- NULL: applies to the whole receipt
  raw_text TEXT NOT NULL, amount_cents INTEGER NOT NULL CHECK (amount_cents <> 0),
  PRIMARY KEY (purchase_id, position),
  FOREIGN KEY (purchase_id, line) REFERENCES purchase_lines(purchase_id, line));
CREATE TABLE purchase_corrections (                 -- used from slice 2; the primary key is the optimistic lock
  purchase_id TEXT NOT NULL REFERENCES purchases(id), revision INTEGER NOT NULL,
  request_id TEXT NOT NULL UNIQUE, corrected_by TEXT NOT NULL, corrected_at TEXT NOT NULL,
  PRIMARY KEY (purchase_id, revision));
```

No cascades: a deletion removes its rows explicitly in one batch. Identifiers are opaque prefixed strings generated in the Worker (`pur_`, `prd_`, `sto_`, `chn_`), so one batch can insert parents and children together.

## Shape and invariant owners

| Invariant                     | Owner                                                                                                                                                        | Backed by                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Totals hold                   | `checkTotals`, a pure function used by record and correct                                                                                                    | —                                         |
| A retry never duplicates      | `purchases.request_id UNIQUE`                                                                                                                                | the batch fails and recovery reads by key |
| A receipt is recorded once    | `purchases.receipt_key UNIQUE`, from normalized CUIT, point of sale and number                                                                               | the same recovery                         |
| All-or-nothing                | one `D1Client.batch` per write; chains and stores are inserted with `ON CONFLICT DO NOTHING` and referenced by subquery                                      | D1 batch atomicity                        |
| Product links                 | `linkLines`: stable GTIN anywhere, store code within the chain, text key within the chain for lines without codes; exactly one product, or no automatic link | reads before the batch                    |
| Corrections do not interleave | `purchase_corrections` primary key `(purchase_id, revision)` and unique `request_id`                                                                         | the batch fails and recovery reads        |
| Who recorded it               | `Member` service, built only by the Access gate                                                                                                              | `recorded_by NOT NULL`                    |
| Exact money                   | `Cents` and `Thousandths` schemas at the operation boundary                                                                                                  | INTEGER columns                           |

**What happens when a batch fails.** The handler rereads by `request_id`, then by `receipt_key`, and for corrections by revision:

- found by `request_id`: `already_recorded` (or `already_applied`);
- found by `receipt_key`: `already_recorded`;
- the revision moved: `RevisionConflict`;
- otherwise the original `SqlError`, which the client sees as `DatabaseFailure`.

Rejected attempts are not stored, so an agent can fix its transcription and resend with the same `requestId`.

**Seam (ADR-0004 extension).** `OperationServices` becomes `SqlClient | D1Client | Member`:

- `refuseUnlessAccess` turns into a gate that returns the member it verified.
- `index.ts` builds a per-request layer with that member.
- The development build without Access settings admits requests as `local@despensa.localhost`.
- `get_status` keeps needing only `SqlClient`.

**What each boundary hides:**

- `record_purchase` hides store resolution, code normalization (GTIN check digit, restricted prefixes, chain scope), money conversion, the totals check, deduplication, atomicity and race recovery. The agent sends what it read.
- `find_products` hides how lines are linked to products, returning "match, or candidates".
- `Member` hides JWT handling and the development identity.

## How later features extend it (expand-only)

- **#7:** `list_purchases` and `get_purchase`. No schema change.
- **#8:** rename by `UPDATE products`. Kinds add a `kinds` table and a nullable `products.kind_id`. A merge adds a nullable `products.merged_into`, repoints lines in one batch, and keeps old IDs resolvable.
- **#9:** lines joined to purchases, stores and chains. The net line amount is the amount plus its adjustments. USD adds a daily `mep_rates` table joined on `purchased_on`. Receipt-wide adjustments stay unallocated unless #9 decides otherwise.
- **#10:** a list table pointing to a product, a kind, or free text.
- **#11:** intervals between `purchased_on` per product (later per kind).
- **#12:** the same `record_purchase`. The form generates `requestId` when it opens, and sends no receipt identity and no codes.

Compatibility rules: migrations add tables, nullable columns, and indexes only. Every INSERT names its columns. Operation inputs gain only optional fields.

## Alternatives and provenance

Two independent candidates (Codex gpt-6.1-sol and Claude Opus 5.5) were compared by a separate judge. The base is candidate A: a request key separate from the fiscal receipt identity, revision-checked corrections, and evidence kept on lines. These ideas came from candidate B:

- decimal money on the wire;
- flat optional fields;
- `already_recorded` as a success;
- recovery by rereading after a batch fails;
- automatic linking by codes;
- `delete_purchase`;
- a non-null recorder with a development identity.

Rejected:

- **B's key of printed minute plus total:** it collides falsely and needs a time.
- **A's durable commands table storing rejections:** it blocks resubmitting a fixed transcription with the same key, and adds a table.
- **A product-identifier table that a correction rewrites:** it moves codes away from other purchases' lines.
- **A draft workflow (start, add lines, confirm):** server-side partial state.
- **Fuzzy name matching across receipts:** false links that silently corrupt price history.
- **One JSON document per receipt:** every later feature would query through JSON.
- **A members table:** a second list of people next to the Access policy.

## Implementation contract

Must preserve:

- one atomic batch per write;
- printed amounts stored as integer cents, never recomputed;
- the two unique keys and recovery by reread;
- product links only from exact evidence: codes, or exact text within the chain for lines without codes;
- `recorded_by` from the verified member only;
- expand-only migrations.

May choose: module file names, SQL statement grouping within the batch, normalization details beyond those stated, and the exact message wording.

Return to design if D1 cannot run the record batch for a real receipt within its limits (100 bound parameters per statement), or if remote clients cannot use flat optional fields.

## Open risks

- **Remote connectors:** a full login from the Claude app or ChatGPT is not observed yet. Until it is, Claude Code and Codex work.
- **Duplicates without a receipt identity:** purchases without one (hand entry, an unreadable number) rely on `requestId` and on human judgment.
- **A manufacturer reusing a GTIN** for a new presentation links to the old product. A correction (slice 2) repairs that line.
- **Coto store codes are assumed to be chain-wide.** If they turn out to be per branch, matches only get fewer, never wrong.

ADR candidates:

- handler services gain `Member` and `D1Client` (extends ADR-0004);
- remote connectors allowed in Access (amends ADR-0005);
- purchases are recorded whole and deduplicated by request and fiscal receipt identity, and products are linked only by exact evidence.
