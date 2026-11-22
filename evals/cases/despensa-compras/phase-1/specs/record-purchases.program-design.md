# Recording purchases (slice 1): program design

Status: Accepted (with the spec, 2026-11-01)

<!-- Eval case copy, unchanged except this note and the status line, which records the owner's acceptance. -->
Spec: `.work/specs/record-purchases.md`. Brief: `docs/design/recording-purchases.md`. Grounded on: `fa3ac39`.

## Where things live

```text
+ migrations/0001_purchases.sql              the schema in the brief, all tables at once (slice 2 needs no migration)
~ src/operations/index.ts                    registers the four new operations
+ src/operations/purchases/wire.ts           Cents, Thousandths, LocalDate/LocalTime, StoreRef, LineInput, PurchaseDetail: shared schemas
+ src/operations/purchases/failures.ts       TotalsMismatch, ProductMismatch, ProductNotFound, PurchaseNotFound
+ src/operations/purchases/list-stores.ts    one file per operation: name, description, kind, schemas
+ src/operations/purchases/find-products.ts
+ src/operations/purchases/record-purchase.ts
+ src/operations/purchases/get-purchase.ts
~ src/worker/access.ts                       the gate returns the verified Member (or the development member)
+ src/worker/member.ts                       the Member service: the signed-in person
~ src/worker/operation-layer.ts              OperationServices = SqlClient | D1Client | Member
~ src/worker/index.ts                        a per-request layer: D1Client.layer + Member
~ src/worker/handlers.ts                     four new entries
+ src/worker/handlers/{list-stores,find-products,record-purchase,get-purchase}.ts   thin: decode → purchases module
+ src/worker/purchases/codes.ts              stableGtin, storeCode, textKey, nameKey, receiptKey: every normalization rule
+ src/worker/purchases/totals.ts             checkTotals: pure
+ src/worker/purchases/catalog.ts            linkLines (reads), findProducts, listStores
+ src/worker/purchases/record.ts             recordPurchase: plan → one batch → recovery
+ src/worker/purchases/read.ts               purchaseDetail(id): the one query shape get_purchase and record return
~ vite.config.ts                             readD1Migrations → a TEST_MIGRATIONS binding
~ tests/env.d.ts                             TEST_MIGRATIONS
+ tests/purchases.test.ts                    E1–E8 over MCP (alternating revisions) plus HTTP reads
+ tests/receipts.ts                          the two receipts of 2026-11-01 as record_purchase inputs (plain data)
~ tests/access.test.ts                       E9: two signed members record concurrently
~ tests/mcp.test.ts                          E10: the exact tool list grows to five
+ docs/adrs/0006-…, 0007-…, 0008-…           the three ADRs the spec lists
~ docs/deployment.md, README.md              the Access allowed callbacks; connecting the Claude app and ChatGPT; Status
```

Operations stay in `src/operations/` and may import only `effect` (ADR-0004). Each schema lives once in `wire.ts`, and the four definitions compose them.

## Key types

- **`Cents`** (branded integer) decodes only from a JSON number with at most 2 decimals, through its shortest decimal string. A float like `4215.4000001` is `InvalidInput`, and nothing ever multiplies a float by 100.
- **`Thousandths`**: the same for quantities, with 3 decimals.
- **`StableGtin`** comes only from `stableGtin(barcode)`: a valid check digit, not all zeros, no restricted prefix (20–29). A `25…` weight code can never become a product identity.
- **`ReceiptKey`** comes only from `receiptKey(taxId, pointOfSale, number)` when all three are present. A partial identity never becomes a unique key.
- **`Member`** (`{ email }`) is constructed only in `access.ts`, so a handler cannot take the recorder from input.
- **`LineInput`** has flat optional `productId` and `newProduct`, with a schema filter for "exactly one". After decoding, handlers see a tagged `LineProduct = Existing | New`, so the bad combination is gone past the boundary.
- **`LinkPlan`** pairs each line with `{ productId, linkedBy }` or a new product with a local key. It is the only thing the batch builder accepts, so no line reaches SQL unlinked.

## Signatures that matter

```ts
// src/worker/access.ts
export const admit: (request: Request, env: AccessEnv) => Promise<{ member: Member } | { refusal: Refusal }>;

// src/worker/purchases/totals.ts
export const checkTotals: (lines: ReadonlyArray<LineAmounts>, receiptAdjustments: ReadonlyArray<Cents>, printed: PrintedTotals)
  => TotalsMismatch | undefined;

// src/worker/purchases/catalog.ts
export const linkLines: (chainNameKey: string, lines: ReadonlyArray<LineInput>)
  => Effect<LinkPlan, ProductMismatch | ProductNotFound | SqlError, SqlClient>;

// src/worker/purchases/record.ts
export const recordPurchase: (input: RecordPurchaseInput)
  => Effect<{ outcome: "recorded" | "already_recorded"; purchase: PurchaseDetail },
            TotalsMismatch | ProductMismatch | ProductNotFound | SqlError, SqlClient | D1Client | Member>;
```

## Call paths

```text
E2 record the Coto receipt
Production:  POST /mcp → mcpAdapter → execute(decode) → recordPurchaseHandler → recordPurchase
               → existing(requestId | receiptKey)?        (one read)
               → checkTotals                                (pure)
               → linkLines                                  (one read over gtin/store_code/text_key)
               → D1Client.batch([chain, store, products, purchase, lines, adjustments])
               → purchaseDetail(id)
Tests:       exports.default.fetch("/mcp") → the same path → real local D1 (reset + migrations)

E4/E5 retry or the same receipt again
             → existing(...) finds it → already_recorded, nothing written
             race: batch fails on UNIQUE → recover: reread by requestId, then receiptKey → already_recorded
                   neither found → the SqlError propagates → DatabaseFailure

E3 totals off → checkTotals → TotalsMismatch (declared failure → 422 / isError), before any read of the catalog

E9 who recorded it
Production:  index.ts → admit → { member } → Layer.succeed(Member, member) → handler reads Member
Tests:       access.test.ts signs two assertions → worker.fetch twice in parallel → get_purchase shows each email
```

## What each module hides

| Module | Hides | So callers never |
|---|---|---|
| `codes.ts` | GTIN check digits, restricted prefixes, padding, text and name normalization, receipt-key normalization | know what makes a code an identity |
| `totals.ts` | which sums compare to which printed figure, and the sign convention | compute a difference or choose the check name |
| `catalog.ts` | how lines map to products (code scopes, ambiguity yields no link) | query `purchase_lines` to find a product |
| `record.ts` | ID generation, statement order, chain and store find-or-create by subquery, D1 batch limits, recovery after a failed batch | coordinate writes or interpret a D1 error |
| `read.ts` | the joins behind `PurchaseDetail` and the cents-to-decimal encoding | assemble a purchase |
| `member.ts` and `access.ts` | the JWT, and the development identity | touch headers or `env` |

## Errors

- **Bad shape, too many decimals, or both or neither of `productId` and `newProduct`:** `InvalidInput`, decoded once in `execute`, as today.
- **Domain failures** (`TotalsMismatch`, `ProductMismatch`, `ProductNotFound`, `PurchaseNotFound`): declared on each operation and raised in the `purchases` modules. The adapters give them the existing envelope: HTTP 422, MCP `isError`.
- **`SqlError`:** `record.ts` catches it only around the batch, to reread by key. Every other `SqlError`, and an unexplained batch failure, propagates to the existing `DatabaseFailure` translation.
- **Bugs** (an output that does not encode, an impossible plan): `InternalError`, as today.

## Changes elsewhere

- **`access.ts`, `index.ts`, `operation-layer.ts`:** handlers need the person and an atomic batch. This is recorded in the ADR that extends ADR-0004. `get_status` is unchanged.
- **`vite.config.ts` and `tests/env.d.ts`:** tests apply the real migrations.
- **`tests/mcp.test.ts`:** its exact tool list grows. That is the accepted design change, not a loosened check.

## Not decided here

The behavior is the spec's examples. The contract and schema are in the brief. Build order is `deliver`'s. Function bodies and the exact wording of tool descriptions are settled in the pull request.
