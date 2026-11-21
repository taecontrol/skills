# What the real delivery found, and where each hidden check comes from

Runner only. Commits are on the branches of the real pull requests in `taecontrol/despensa`.

## Phase 1: #14 (record) and #15 (correct, delete, list)

Found by review on #14, after the acceptance tests passed:

- `716822e` **Sums of floating-point cents lost a cent.** A huge line amount and a receipt-wide adjustment that cancelled out let a total of 0.02 through where the lines added up to 0.03. Fixed with BigInt sums and a range check on computed totals. H1 uses the regression test's own values. → H1
- `53130c9` **Partial receipt identities were dropped,** and **GTIN-14 codes with a nonzero packaging indicator 2 were treated as restricted 2x prefixes.** Also added the test "a retry without fiscal identity and a normalized fiscal duplicate both return the original before checking totals", and "an unknown explicit product is refused without creating its store". → H2, H3, H4, H9, H10
- `e1f6533` Catalog evidence reads were unbounded (performance at D1's limits). → H8 checks the long receipt end to end.

Found on #15:

- `5982017` A purchase deleted during a correction answered `DatabaseFailure` instead of `PurchaseNotFound`. A race; no check forces it.
- The pull request lists as unproven: paging with `limit` and `cursor`, the order of purchases without a time, and the chain filter's case and spacing. → H11, H12

Shipped and fixed later:

- **#29, fixed in #33:** purchases on one day without a time were ordered by random id, so the one recorded last could appear below. The owner chose "by when they were recorded" after the feature shipped, and the spec leaves the order open, so H11 is recorded and not scored. → H11

Stress on the contract's own rules: ten concurrent recordings of one receipt (H5) and five concurrent corrections from one revision (H6, the spec's rabbit hole "never decide a revision with a JavaScript read followed by a write"); the real tests ran two writers each. Money with too many decimals (H7).

**An ambiguity in the inputs.** The slice 1 spec's state space says a new `requestId` with the same receipt identity and totals off answers `TotalsMismatch`. The accepted design says the duplicate lookup runs first, so it answers `already_recorded`. The real delivery followed the design. No hidden check depends on this cell; H4 uses the same `requestId`, where spec and design agree.

**A deviation in the real delivery.** F10 says the products a deleted purchase created "still appear in `find_products`". #15 delivered that they stay in the database but `find_products` can no longer reach them, and recorded it as a known limit, which #22 addressed with `list_products { withoutPurchases }`. The proof judges check F10 as written.

## Phase 2: #22 (catalog)

Found by review on #22, in code phase 1 wrote (`src/worker/purchases/catalog.ts` and `correct.ts`):

- `3d00a38` added regression tests after review: "catalog purchase counts count receipts rather than repeated lines of the same product", "a correction using an old id for the same current product keeps the line's original identity", "a correction creates kinds by name even when its new product has known receipt evidence", "refused product edits leave no kind behind for either a missing or merged id", "simultaneous retries of a merge leave one merge and return the stored winner". → H14, H15, H18, H19, H20. `3d00a38` added tests only: its parent already counted distinct purchases, so H14 is regression coverage, not a bug the real build had.
- `5824b1f` **Corrections lost a line's origin under a merge.** The first implementation compared products from different snapshots; the fix resolves the previous origin in the linking query and keeps a corrected line's origin and `linkedBy` when the caller sends its previously read product id or its origin. Merge retries racing the pre-check were also recovered through one path. → H15, H16, H20
- `c47ef6a` **An explicit pick of a merged-away product** must keep that id as origin with `linkedBy` `chosen`, so undo returns the line to it. The first fix had kept `linkedBy` for any id resolving to the same product. Its regression corrected B's own line by picking A after A merged into B, which H17 repeats. → H17

From the accepted design: opposite merges at once (H21), search through merged names (H22, which the real tests also covered), sizes that differ only in unit (H23), recording after a merge and then deleting it (H24).

No catalog backend fix landed after #22; #36 and #39 changed only the app.
