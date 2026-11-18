# Prototype brief: Despensa kinds tidying (issue #32, part 2 of #16)

You are one of three independent designers. Build ONE disposable but production-credible UI prototype of the kinds screens, following your assigned thesis. Do not look at other directories under `.work/prototypes32/`. Do not edit anything under `src/`, `tests/`, `docs/`, `README.md`, `package.json` or the lockfile. Do not commit. Write only inside `.work/prototypes32/<your-name>/`.

## Starting point

Part 1 (#31, products) is merged and its look was approved by the owner. Start by copying the approved products prototype: `cp -r .work/prototypes/hoja/. .work/prototypes32/<your-name>/` (the paths are relative at the same depth, so its `vite.config.ts` keeps working). Its catalog list, product ficha, shell and in-memory API are the accepted design: keep them as they are and add the kinds UI to them. The real merged code in `src/web/catalog/` (catalog-page.tsx, product-sheet.tsx, parts.tsx) and the strings in `src/web/i18n.ts` (`catalog.*`) are the reference for density, copy and the Drawer (< 1024 px) / Sheet (>= 1024 px) pattern. Read them. The approved owner preferences from part 1: the desktop Sheet is modal with an overlay and closes on an outside click; choice cards («¿Cuál queda?») are stacked one below the other; **UI copy is short, with no helper lines that repeat what the screen shows** (the owner asked to remove that noise).

## Product truth (fixed, do not change or extend)

Despensa is a household PWA (Spanish UI, Argentina, voseo: "Tocá", "Elegí"). Two members share one household: `member@example.com` (the current user) and `partner@example.com`. Agents create kinds by name while recording purchases, so the kind list collects misspellings and duplicates that mean the same thing.

Read `docs/design/catalog.md`, "Domain meaning", "Operations" and "State space", and `docs/design/shopping-list.md`, "Domain meaning" (the list items that name a kind). Rules the UI must respect:

- **Kind** ("tipo"): what you would write on the shopping list ("arroz", "leche entera"). Kinds are a flat list. Names are matched ignoring case and spacing but **not accents** ("papel higienico" and "papel higiénico" are two kinds).
- **See** every kind with how many current products it has, empty kinds included (`list_kinds`, sorted by name).
- **Rename** a kind everywhere. A capitalization-only change is allowed. A name another kind already uses fails with `KindNameTaken { kind }` naming that kind; the server's advice is to merge them instead.
- **Merge kind K1 into K2** ("unir"): every product of K1 moves to K2, K2 keeps its name, K1 disappears. **It cannot be undone.** It frees K1's name: classifying a product under it later creates the kind again. Shopping-list items naming K1 now name K2 (one item remains if both were listed). The result reports `moved` (how many products moved, merged-away ones included).
- **Delete** a kind only when no current product has it (`KindHasProducts { products }` otherwise). Shopping-list items naming it become free text with its name. A deleted name assigned later creates the kind again.
- Writes can fail: `KindNotFound` (the partner merged or deleted it meanwhile, or a retry after a lost response: «Este tipo ya no existe. Puede haberse unido a otro tipo o eliminado.»), `KindNameTaken`, `KindHasProducts`, network failure («Sin conexión con Despensa. Revisá tu conexión a internet.»). The app requires network; no offline queue.
- Assigning a kind to a product stays in the product ficha (part 1). Do not change it.

Operations the kinds screens may use (ONLY these, stubbed in memory): `list_kinds {}` → `{ kinds: [{ id, name, products }] }`, `rename_kind { kindId, name }`, `merge_kinds { kindId, intoKindId }` → `{ kind, moved }`, `delete_kind { kindId }`, and part 1's `list_products { search?, kind? (a kind name), withoutKind?, withoutPurchases?, cursor?, limit? }` (the `kind` filter exists in the operation but the merged app does not use it yet).

**Open scope question for the owner, do not decide it:** whether the kinds screens show which products a kind has (through `list_products { kind }`). The issue only asks for the count. Your thesis says whether yours shows them; make it easy to see in your NOTES what it adds and costs.

Forbidden inventions: kind groups, sections or categories, icons or colors per kind, aliases, automatic duplicate suggestions ("posibles duplicados"), bulk actions, undo of a kind merge, edit history, reading the shopping list from the kinds screens, swipe gestures, drag and drop, sorting other than by name, toasts (feedback inline, as part 1 does).

## Shell

Keep the shell from the hoja prototype, but its destinations are now the real ones: "Compras", "Reposición", "Lista", "Catálogo" (active). Do not add a destination for kinds: a later issue adds "Precios", which makes 5 on the phone bar.

## Components

Only shadcn/ui components in `src/web/components/ui/` (via `@/components/ui/...`): button, input, input-group, textarea, checkbox, item, empty, alert, alert-dialog, dialog, drawer, sheet, dropdown-menu, select, tabs, popover, command, badge, separator, skeleton, spinner, toggle, toggle-group, tooltip, field, label, card, collapsible, sidebar, table. No native `<select>`, `<dialog>`, `alert()/confirm()`, unstyled inputs, or bare hand-styled `<button>`. Lucide icons.

## Representative data (use exactly this content)

Today is 3 Nov 2026. Replace the hoja data's kinds and product kinds with these (keep the other product fields as they are, and add products 15 and 16):

Kinds (`list_kinds`, sorted by name as `nameKey` sorts: lowercase, accents kept), with current product counts:

| kind | products | its products |
|------|----------|--------------|
| arroz | 2 | Arroz Gallo Oro 500 g; Arroz largo fino Gallo Oro 1 kg |
| detergnte | 1 | Detergente Magistral limón 750 ml |
| fideos | 0 | — |
| lavandina | 1 | Lavandina Ayudín 2 l |
| leche | 1 | LECHE SERENISIMA ENT 1L |
| leche descremada | 0 | — |
| leche entera | 1 | Leche entera La Serenísima 1 l |
| papel higienico | 1 | Papel higiénico Higienol 4 rollos x 30 m (new #15: brand Higienol, 4 u., 2 purchases, last 18 oct) |
| papel higiénico | 1 | Papel higiénico Elite doble hoja 4 rollos x 30 m |
| queso cremoso | 1 | Queso cremoso La Paulina |
| tomate | 1 | Tomate perita |
| yerba | 1 | Yerba mate Playadito 1 kg |
| yerba mate | 1 | Yerba Taragüí 500 g (new #16: brand Taragüí, 500 g, 3 purchases, last 20 oct) |

BANANA ECUADOR XKG, ECUVITA, GALLO and Pilas AA Duracell x4 have no kind. The shopping list (not shown, only for copy) has a pending item "leche".

## Scenarios (every one reachable from your scenario selector, kept in the URL as `?s=<id>`, with a reset)

- `tipos`: the kinds list, reached from Catálogo as your thesis says (show the way there).
- `renombrar`: fixing "detergnte" to "detergente". Saving works; the list and the product's kind show the new name.
- `nombre-tomado`: renaming "yerba mate" to "Yerba" fails with `KindNameTaken` naming "yerba". Show the message and what the member can do next.
- `unir`: joining "leche" and "leche entera". Show how they pick the other kind, which one stays (the one that stays keeps its name), that it cannot be undone, and the result: "leche entera" has 2 products, "leche" is gone.
- `borrar`: deleting "fideos" (0 products) with confirmation; it disappears.
- `no-se-puede-borrar`: "arroz" (2 products): deleting is unavailable, and why.
- `ya-no-existe`: Luis renames "leche" while Ana merged it into "leche entera" a minute ago: `KindNotFound`. Show the message and how the screen recovers.
- `sin-conexion`: a rename fails offline; the typed name is kept and they can retry.

The selector is one control outside the product UI that covers none of it (a small fixed panel at the top-right on desktop, a collapsible pill on phone that does not overlap the bottom nav). Judge the phone at 390 × 844 and desktop at 1440 × 900.

## Build, run, inspect

- Build: `cd .work/prototypes32/<your-name> && PROTO=k-<your-name> npx vp build --config vite.config.ts` writes `/tmp/despensa16-proto/k-<your-name>/`. Static files only.
- Adapt the copied `shoot.sh`/`shoot-all.sh` to your build path and a `--user-data-dir` under `/tmp/despensa32-<your-name>-chrome`. Render every scenario at 390 × 844 and 1440 × 900 and look at every screenshot. Kill only the PIDs you start; never `pkill`/`killall`.
- Fix clipping, overflow, unreadable hierarchy, placeholder text and broken interactions before you finish. Delete the copied hoja shots and save yours in `shots/` as `<scenario>-phone.png` and `<scenario>-desktop.png`.
- Write `NOTES.md` (replace hoja's): your thesis in one sentence, the main tradeoffs, whether it shows a kind's products and what that costs, the scenario list, and known limitations.
- Reply with: thesis, path of the build, and anything you could not do.

## Shared machine rules (from the owner)

Many agents share this machine. Work only inside your directory. Do not touch other worktrees, branches, `README.md`, global caches or config. No `pkill`/`killall` of node, chromium, vite, wrangler or workerd: kill only PIDs you started. Do not fix ports; let the system choose. Run nothing heavier than your build and your screenshots. No push, no PR, no issue comments.
