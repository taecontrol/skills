# Tidy the product catalog over MCP: rename, merge, and group into kinds

Status: Accepted (by the owner, 2026-11-02)
Issue: https://github.com/taecontrol/despensa/issues/8 (screens: #16, after #7)

<!-- Eval case copy. Changed from the accepted original: the fixtures are the synthetic receipts of `.work/specs/receipts.json` instead of the real ones, and the status lines record the owner's acceptance. Nothing else changed. File and function names here and in the design (such as `insertLines`, `linkLines`, `write.ts`, `codes.ts`) and the commit `231930f` name the original phase 1 code; map them to the code in this worktree. -->

## Problem

- Agents create products from abbreviated receipt names, so the catalog collects duplicates and unclear names such as `GALLO` and `ECUVITA` (`reported`, issue #8).
- After `delete_purchase`, a product used only by that purchase stays in `products`, but `find_products` can no longer reach it, so recording the receipt again creates a duplicate (`observed`: by design in `docs/design/recording-purchases.md`, and in the owner's comment on #8).
- Nothing lists or edits the catalog today: the only product operation is `find_products`, which searches by receipt evidence (`observed`, `src/operations/`).
- #9 (prices), #10 (list) and #11 (restock rhythm) need clean products and a kind that groups brands and presentations (`reported`, issues #9–#11).
- There is no production data yet (`reported` by the owner, 2026-11-02).

Options considered: do nothing (#9–#11 cannot group); free-form tags (rejected: one kind per product); fuzzy matching when recording (rejected by ADR-0008).

## Outcome

Over MCP, a household member or the agent can see the catalog, including products left without purchases. They can correct a product's name, brand and presentation, merge two products that are the same article (past purchases follow, and the merge can be undone), delete products without purchases, and assign each product a kind such as "arroz" that #9, #10 and #11 group by. (Accepted by the owner, Q1.)

## Out of scope

- Screens: issue #16, after #7 adopts the web stack (owner, Q9).
- Kind groups or sections (Q4); undoing a kind merge (Q12); history of name, brand or size edits (Q13).
- Automatic deletion of orphans by `delete_purchase` (Q8).
- A one-time test against a copy of production: there is no production data (Q14).

## Examples

Fixtures are the Coto and Farmcity receipts in `.work/specs/receipts.json`, plus small receipts built in the test. "A", "B", "C" are products.

**Seeing and editing**

- **E1** `test` — Given a Coto purchase that created `GALLO` (no brand, size or kind), when the agent calls `list_products { search: "gallo" }`, then it gets `GALLO` with `purchases: 1` and its last purchase date. When it calls `update_product` with the name "Arroz largo fino Gallo Oro 1 kg", brand "Gallo", size 1000 g and kind "arroz", then `get_purchase` and `find_products` show those values and `kind: { name: "arroz" }`.
- **E2** `test` — Given the kind "arroz" exists, when another product is updated with kind "Arroz", then both have the same kind id and `list_kinds` shows "arroz" with 2 products. Sending `kind: null` clears it.
- **E3** `test` — `list_products { withoutKind: true }` returns only products without a kind. With `limit: 1` over three products, following `nextCursor` returns each product exactly once.
- **E4** `test` — `update_product` with no field to change is `InvalidInput`; an unknown id is `UnknownProduct`.

**Recording with a kind**

- **E5** `test` — Given no kind "yerba", when `record_purchase` sends `newProduct.kind: "Yerba"`, then the new product has kind "Yerba". A second receipt with a different product and `kind: "yerba"` reuses it.
- **E6** `test` — Given a line whose barcode links to existing product A with kind "arroz", when the agent sends `newProduct.kind: "fideos"`, then the line links to A, A keeps "arroz", and no kind "fideos" is created.

**Orphans and deletion**

- **E7** `test` — Given A was created only by purchase P, when P is deleted, then `list_products { withoutPurchases: true }` returns A with `purchases: 0`, and `delete_product A` deletes it.
- **E8** `test` — `delete_product` on a product with purchases is `ProductHasPurchases { purchases }`, and nothing changes.
- **E9** `test` — Given orphan A merged into orphan B, `delete_product B` deletes both and returns `alsoDeleted: [A]`. `delete_product A` (merged away) is `ProductAlreadyMerged`.

**Merging and undo**

- **E10** `test` — The owner's case. Given A was recorded, its purchase deleted, and the receipt recorded again, creating duplicate B, when the agent merges B into A, then `get_purchase` of the new purchase shows A, `list_products` shows A with 1 purchase and B under `merged[]` with who and when, and `find_products` for that receipt's line returns a unique match A.
- **E11** `test` — Given A (with kind "arroz") has lines and B has none and no kind, when A is merged into B, then B keeps its name, brand and size and takes "arroz". `list_products { productId: A }` returns B.
- **E12** `test` — Undo, as if never merged. Given A has two Coto lines with barcode X and B has a Farmcity line linked by receipt text, A is merged into B, and then a new Coto receipt with barcode X is recorded (the agent sends `productId: B` from `find_products`), and a new Farmcity receipt is recorded with B's text, and a third receipt picks `productId: A` explicitly. When the merge is undone, then A has its two original lines, the new barcode-X line and the explicit pick, B has its two Farmcity lines, A has its own name, brand, size and kind, and B keeps the kind it took from A.
- **E13** `test` — Given A merged into B, when a correction replaces a line that came through A while keeping its product, then the merge is undone, and that line returns to A with its `linkedBy` kept.
- **E14** `test` — Chains. Given A→B then B→C: `get_purchase` shows C for A's and B's lines. Undoing A→B returns A's lines from C to A, and B stays in C. Separately, undoing B→C while A→B is active returns A's and B's lines to B, and A still leads to B.
- **E15** `test` — Merging "Arroz Gallo 500 g" into "Arroz Gallo 1 kg" is `SizesDiffer` naming both sizes, and nothing is written (no merge record, lines unchanged). Merging when one size is unknown succeeds.
- **E16** `test` — Merging a product into itself is `InvalidInput`. Merging a merged-away product, or into one, is `ProductAlreadyMerged` with the target, who and when. `update_product` through a merged-away id is `ProductAlreadyMerged` and changes nothing.
- **E17** `test` — Retries. The same `requestId` after a lost response returns `already_applied` and one merge exists. The same `requestId` after the merge was undone returns `already_applied` with `undoneBy` set, and A stays separate. A new `requestId` for an active merge is `ProductAlreadyMerged`. Undoing twice returns `already_undone`. Undoing again after a new merge of the same pair returns `already_undone`, and the new merge stands. The same `requestId` with a different pair is `InvalidInput`.
- **E18** `test` — Kind changes during a merge (Q15, Q18). Given A with kind "arroz blanco" merged into B: when "arroz blanco" is merged into "arroz" and the product merge is undone, then A has "arroz". When instead "arroz blanco" is deleted (allowed, because no current product has it), then the undo returns A without a kind.
- **E19** `test` — A line whose barcode matched both A and B before the merge, recorded after A→B, stays with B when the merge is undone (Q19).

**Kinds**

- **E20** `test` — `rename_kind` changes the name everywhere; renaming onto an existing normalized name is `KindNameTaken` naming that kind; renaming "arroz" to "Arroz" is allowed.
- **E21** `test` — `merge_kinds` moves every product to the target and removes the source; `list_kinds` no longer shows it. Merging a kind into itself is `InvalidInput`.
- **E22** `test` — `delete_kind` with current products is `KindHasProducts { products }`; on an empty kind it deletes it.

**Never**

- **E23** `test` — After any merge, `find_products`, `get_purchase`, `list_purchases` and `list_products` never show a merged-away product as a line's product or as a catalog entry, and every purchase keeps its line count and totals (checked after merge and after undo in E12 and E14).
- **E24** `test` — The migration over existing data: with only `0001` applied, a purchase is recorded through the old column list; after applying `0002`, `get_purchase` shows it with `kind: null`, and it can be merged and undone.
- **E25** `test` — Both MCP revisions list the nine new tools with their hints (`readOnlyHint` for reads, `destructiveHint` for `delete_product`, `merge_kinds` and `delete_kind`), and every operation answers the same over HTTP.

State space: the table in [docs/design/catalog.md § State space](../../docs/design/catalog.md#state-space). Each row with two orders is covered by running both orders serially through the entry point (E12, E14, E16, E17); a race between the read and the batch inside one call is covered by the in-batch guards and E12's explicit pick of a merged-away id, which goes through the same `insertLines` resolution.

## Test boundary

- **Where the tests run:** MCP (`callTool`, both revisions) and HTTP, against the Worker's own fetch handler, in `vp test` with `@cloudflare/vitest-plugin` (workerd plus a real local D1 with `applyD1Migrations`), as `tests/purchases.test.ts` does. A new `tests/catalog.test.ts`.
- **Real target:** the production build's operation layer with the development member `local@despensa.localhost`; the receipts in `.work/specs/receipts.json`; migrations `0001` and `0002` as deploy applies them.
- **Stand-ins:** none. E24 inserts rows with `0001`'s column list straight into `env.DB` to stand in for the previous Worker; it uses the same statement shape as `insertLines` at `231930f`.
- Run `vp run verify` locally for the touched tests; CI runs the full suite.

## Decisions

- **Architecture:** [docs/design/catalog.md](../../docs/design/catalog.md), `architect` result (arena: Codex gpt-6.1-sol vs Claude Opus 5.5, judge Claude Fable 5.1). Status: Proposed, accepted together with this spec.
- **Domain:** owner's answers Q1–Q19 (2026-11-02), recorded in that brief's Domain meaning.
- **Split:** this PR is MCP and schema; #16 holds the screens (Q9).
- **ADR-0009** is written in this PR: merges move purchase lines and keep per-line provenance for undo.
- **Migration number:** `0002_catalog.sql`, rechecked against `origin/main` just before merging (owner's rule 3).
- **Program design:** [8-catalog.program-design.md](8-catalog.program-design.md), accepted with this spec.
- No budgets: household scale, no performance check added.

## Rabbit holes

- Do not resolve merges in readers; lines already point at current products.
- Do not expose `via_product_id` on the wire.
- Do not add a trigger (see the brief's alternatives).
- `correct_purchase` must keep the origin of a line whose product it keeps; `purchaseDetail` reads the origin internally only.
- `UnknownProduct` is new: the existing `ProductNotFound` requires a `line`.

## Context

- `src/worker/purchases/catalog.ts` (`evidence`, `findLine`, `linkLines`), `write.ts` (`lineRows`, `insertLines`, `productStatements`, `newId`), `correct.ts`, `read.ts`, `delete.ts`.
- `src/operations/purchases/wire.ts` (`Product`, `NewProduct`), `failures.ts`, `list-purchases.ts` (cursor pattern).
- ADR-0004, 0006, 0008; `docs/design/recording-purchases.md` (its #8 sketch is superseded by the catalog brief).
- `AGENTS.md`, `CODING_STANDARDS.md`.

## Open questions

None.
