# An agent corrects, deletes, and finds recorded purchases over MCP (slice 2 of 2)

Status: Accepted (by the owner, 2026-11-01, as part of the accepted data model and agent contract and the two-slice split)
Issue: the slice 2 issue (linked from the pull request)

<!-- Eval case copy. Changed from the accepted original: the real receipts are replaced by the synthetic receipts of slice 1's spec, and the times, codes and amounts taken from them follow. Nothing else changed. -->

## Problem

Slice 1 lets an agent record a receipt and read it back. Its answers have three gaps:

- **A misread can't be fixed.** An agent that misreads a line, such as linking `GALLO` to the wrong rice or misreading a date, cannot fix it. (decided by the owner: "the agent needs to be able to correct a misread item")
- **A mistake can't be removed.** A purchase recorded by mistake, or a duplicate that escaped the keys, cannot be deleted.
- **A past purchase can't be found.** In a new conversation, the agent cannot find "last Saturday's Coto purchase" to correct it.

## Outcome

Over MCP:

- The agent finds a past purchase.
- It corrects any of its lines or its header, and Despensa rechecks the printed totals.
- It deletes a purchase recorded by mistake.

A retried correction never applies twice. Two corrections made from the same revision never both apply.

## Out of scope

- Adding or removing lines in a correction: for a structural misread, delete the purchase and record it again.
- Product renames and merges (#8).
- Screens (#7).

## Contract (from the accepted brief, `docs/design/recording-purchases.md`)

- **`list_purchases`** (read):
  - **Input:** optional `from`/`to` dates, an optional `chain` name, `limit` ≤ 50, and a cursor.
  - **Output:** newest first: id, chain, branch, date, time, total, `recordedBy`, revision.
- **`correct_purchase`** (idempotent-write):
  - **Input:**
    - `requestId`, `purchaseId`, `expectedRevision`;
    - optional `lines: [{ line, …complete line as in record_purchase… }]`, which replaces those lines by their receipt line number;
    - optional header fields: `date`, `time`, `store`, `receipt`, `subtotal`, `discounts`, `total`, and receipt-wide `adjustments`, which replace the whole receipt-wide set.
  - **Rules:**
    - The resulting purchase must pass the same totals check.
    - An explicit `productId` or `newProduct` wins over code matches: the person is fixing a wrong link.
  - **Output:** `{ outcome: "corrected" | "already_applied", purchase }`.
  - **Mechanism:** one batch inserts `purchase_corrections (purchase_id, expectedRevision + 1, request_id, corrected_by, corrected_at)`, whose primary key is the lock, and updates the purchase, its lines and its adjustments. When the batch fails, Despensa rereads:
    - `request_id` found: `already_applied`;
    - revision moved: `RevisionConflict`;
    - otherwise: `DatabaseFailure`.
- **`delete_purchase`** (destructive-write):
  - **Input:** `purchaseId`.
  - **Output:** `{ deleted: purchaseId }`.
  - **Mechanism:** one batch deletes adjustments, lines, corrections, and the purchase. There are no cascades. Products stay.
  - **Retry:** a retry gets `PurchaseNotFound`, whose message says it may already have been deleted.
- **Failures:**
  - `PurchaseNotFound`;
  - `LineNotFound`;
  - `RevisionConflict { currentRevision }`;
  - `TotalsMismatch`;
  - `ProductNotFound`;
  - `ReceiptAlreadyRecorded { otherPurchaseId }`, when a corrected receipt identity belongs to another purchase.
- **No migration.** Slice 1's migration already created `purchase_corrections`.

## Examples

Fixtures: the Coto and Farmcity receipts of 2026-11-01 (slice 1's spec and `.work/specs/receipts.json`). Expected values come from the printed receipts.

- **F1** `test`: **find purchases.** Given both receipts are recorded:
  - `list_purchases {}` returns Farmcity (10:31:47) before Coto (10:14:22), each with its chain, branch, total and `recordedBy`;
  - `list_purchases { chain: "Coto" }` returns only Coto;
  - `list_purchases { from: "2026-11-02" }` returns nothing.
- **F2** `test`: **re-link a misread line.** Given the Coto receipt is recorded with line 21 (`GALLO`) as new product "Arroz Gallo Oro 1 kg", when the agent sends `correct_purchase { expectedRevision: 1, lines: [line 21 with newProduct "Arroz integral Gallo 1 kg"] }`, then:
  - the answer is `corrected` with revision 2;
  - `get_purchase` shows line 21 on the new product, with every other line unchanged;
  - `recordedBy` is unchanged, and the correction records who made it.
- **F3** `test`: **the correction follows the code.** After F2, when a later Coto receipt with barcode 07790078024680 is recorded with `newProduct`, then that line links to "Arroz integral Gallo 1 kg", `linkedBy` `barcode`.
- **F4** `test`: **a retried correction.** When F2's exact call (same `requestId`) is sent again, then the answer is `already_applied`, and the purchase is still at revision 2.
- **F5** `test`: **a stale correction.** Given revision 2, when another correction with a new `requestId` and `expectedRevision: 1` arrives, then the answer is `RevisionConflict` with `currentRevision: 2`, and nothing changes.
- **F6** `test`: **concurrent corrections.** When two corrections with different `requestId`s and `expectedRevision: 1` are sent at once, then one is `corrected` and the other `RevisionConflict`, and the purchase is at revision 2.
- **F7** `test`: **a correction that breaks the totals.** When a correction changes line 1's amount from 11034.00 to 10990.00, then the answer is `TotalsMismatch` with a difference of 44.00, and nothing changes. When one correction changes two lines' amounts so that they compensate, then it is `corrected`.
- **F8** `test`: **a misread header.** When a correction changes the date to 2026-10-31, then `get_purchase` shows it. When a correction gives the Farmcity purchase the Coto receipt identity, then the answer is `ReceiptAlreadyRecorded` naming the Coto purchase, and nothing changes.
- **F9** `test`: **unknown targets.** A correction for line 99 returns `LineNotFound`. A correction or deletion of an unknown purchase returns `PurchaseNotFound`.
- **F10** `test`: **delete.** When `delete_purchase` is sent for Coto:
  - the answer is `{ deleted }`;
  - `get_purchase` returns `PurchaseNotFound`;
  - `list_purchases` shows only Farmcity;
  - the products the purchase created still appear in `find_products`;
  - recording the Coto receipt again is `recorded`.

  A second `delete_purchase` for the same id returns `PurchaseNotFound`, with a message saying it may already have been deleted.
- **F11** `test`: **tools.** On both MCP revisions the tool list holds the eight tools. `delete_purchase` has `destructiveHint: true`, and `correct_purchase` has `idempotentHint: true`.

State space for `correct_purchase`:

| Purchase state \ Arrives | New `requestId`, current revision | Same `requestId` again | New `requestId`, stale revision | Totals off | Concurrent, same revision |
|---|---|---|---|---|---|
| At revision n | `corrected`, n + 1 (F2) | — | `RevisionConflict` (F5) | `TotalsMismatch`, unchanged (F7) | one `corrected`, one `RevisionConflict` (F6) |
| Already corrected by this request | — | `already_applied` (F4) | — | `already_applied` | — |
| Deleted or unknown | `PurchaseNotFound` (F9) | `PurchaseNotFound` | `PurchaseNotFound` | `PurchaseNotFound` | — |

## Test boundary

As in slice 1:

- MCP `tools/call` and `POST /api/<name>` through `exports.default.fetch`, in workerd, against the real local D1 with the real migrations;
- both MCP revisions;
- no fakes beyond Access's certs.

## Decisions

- **Contract:** the accepted brief `docs/design/recording-purchases.md`, sections Caller usage, Operations, Schema, and Shape and invariant owners.
- **Program design:** follow slice 1's accepted program design.
  - `src/operations/purchases/{list-purchases,correct-purchase,delete-purchase}.ts`;
  - handlers in `src/worker/handlers/`;
  - logic in `src/worker/purchases/` (`correct.ts`, `delete.ts`, list in `read.ts`).
  - The correction reuses `checkTotals`, `codes.ts`, `linkLines` (which skips the code-match override for explicit choices), and `purchaseDetail`.

## Rabbit holes

- **F6 and the race:** two parallel calls cannot force both past the read. F6 proves the outcome, which is the same either way.
- **Concurrent writers:** the lock is the corrections primary key. Never decide a revision with a JavaScript read followed by a write.
- **Correcting a line's codes:** they change only on that line, the evidence stays on the lines, and there is no identifier table to rewrite.

## Open questions

None.
