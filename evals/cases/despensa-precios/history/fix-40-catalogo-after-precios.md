<!-- COMPILED. Sources: `git -C <despensa> show ad49f9f` (full output in ad49f9f.diff next to this file); PR #40 description (read with `gh pr view 40`); fix session <transcript> -->

# #40 "Open Catálogo after Precios without crashing" (`ad49f9f`)

Merged 2026-11-03 after #38 (phase 1, `9c93fcd`) and #39 (phase 2, `51c98fe`). The owner hit it in production on their iPhone, with a screenshot: "me salió este error cuando entré en despensa, precios y luego catálogo".

## What was wrong

- Precios' subject picker (`src/web/prices/subject-picker.tsx`, added by phase 1) reads `readQuery("list_products", { ...(search ? { search } : {}), limit: 20 })`. With an empty search its TanStack Query key is `["list_products", { limit: 20 }]` and it caches `{ products, nextCursor }`.
- Catálogo's paged list `catalogListQuery` (`src/web/catalog/queries.ts`, from #31) is an `infiniteQueryOptions` with key `["list_products", { ...input, limit: 20 }]`. For the unfiltered catalog that is the same key, and it caches `{ pages, pageParams }`.
- One key, two shapes: whichever screen opened second read the other's data.

## How to reproduce (in-app navigation, no reload)

1. Run the app with any products (the fix session used a local D1 with 2 synthetic products).
2. Open Precios, so the picker loads with an empty search.
3. Tap Catálogo in the navigation. Wrong: "Something went wrong!" with `undefined is not an object (evaluating 't.length')` on iPhone Safari, `Cannot read properties of undefined (reading 'length')` in Chromium. Phone (390×844) and desktop (1280×800).
4. Reverse path: open Catálogo first, then Precios. Wrong: the picker lists no products and says «No hay tipos ni productos con ese nombre.» although the search box is empty.
5. Also affected: the "Unir productos" dialog inside Catálogo (`merge-products.tsx`) uses the same paged list (found by the PR-description verifier).

Expected: both screens list their products in both orders, at both sizes.

## The fix

```diff
--- a/src/web/catalog/queries.ts
+++ b/src/web/catalog/queries.ts
@@ -13,7 +13,9 @@ export type SessionWriteState = {
 
 export const catalogListQuery = (input: Omit<ListProductsInput, "cursor" | "limit">) =>
   infiniteQueryOptions({
-    queryKey: ["list_products", { ...input, limit: 20 }],
+    // A paged list caches `{ pages, pageParams }`, so its key must differ from
+    // the single-page `readQuery("list_products", …)` other screens cache.
+    queryKey: ["list_products", { ...input, limit: 20 }, "pages"],
     initialPageParam: undefined as typeof CatalogCursor.Type | undefined,
     queryFn: (context) => {
       const options = readQuery("list_products", {
```

Cancellation by the `["list_products"]` prefix and the app's unfiltered `invalidateQueries()` still reach both lists.

## As a hidden check

- **Phase 1 (#20):** after the Precios screen is built on base `7c53585`, open Precios (picker loaded with an empty search) and navigate in-app to Catálogo: it must list products, not crash. Then Catálogo → Precios: the picker must list products. The cause is a query-key collision between the new picker and the existing `catalogListQuery`, so it shows only when navigating between screens in a browser. No test in the suite renders two screens in sequence, so only a cross-screen browser run catches it.
- **Phase 2 (#32):** the same two journeys must still pass, and the kind ficha's "Productos" list (paged, `catalogListQuery({ kind })`) and the merge dialog must not share a cache entry with a single-page `readQuery("list_products", …)` of the same input.
- No automated test was added in #40. Verification was Chromium before/after screenshots at 390×844 and 1280×800 plus `vp run verify`. It was not verified on a real iPhone.
