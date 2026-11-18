# Case: Despensa, Precios then kinds

Despensa is the owner's household purchases PWA: TypeScript and Effect on Cloudflare Workers with D1, React and shadcn/ui. The case replays two features built on 2026-11-03.

- **Repository:** `taecontrol/despensa` (private; the owner's checkout is enough, the run never pushes).
- **Base commit:** `7c53585`.

| Phase | Feature | Real PR | Arms receive | Copy to |
|---|---|---|---|---|
| 1 | Compare prices in the app (issue #20) | #38, `9c93fcd` | `phase-1/*`; spec `.work/20-compare-prices-app/spec.md` | `.work/20-compare-prices-app/` |
| 2 | Tidy kinds from the app (issue #32) | #39, `51c98fe` | `phase-2/*`; spec `.work/specs/32-catalog-kinds-app.md` | `.work/` |

Phase 1 has an accepted program design; phase 2's spec has none ("gated out"). Both specs are the accepted versions the real delivery received. Two inputs are incomplete: the prototype screenshots (24 of 44 for phase 1, 39 of 80 for phase 2) and phase 1's prototype build, which can be rebuilt from `proto-src/` with `phase-1/data.json`. The arms get the same inputs, so this costs every arm alike.

## Running the product

`vp dev` in the worktree serves the Worker and the app with a local D1 under the worktree; `vp run verify` is the gate. Local runs need no Cloudflare account.

Each arm seeds its local D1 with the spec's data as part of its work, and its proof says how. The checker and the judges use that seeding. When it does not give the spec's data, checks that depend on the data are `blocked`, and that counts against the arm's proof.

## Known history

The real delivery's review findings and the bug that reached production are in `history/`, for the runner only. The hidden checks come from them.
