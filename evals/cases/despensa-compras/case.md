# Case: Despensa, purchases then catalog

Despensa is the owner's household purchases PWA: TypeScript and Effect on Cloudflare Workers with D1. The case replays its first data features, built on 2026-11-01 and 2026-11-02, which agents use over MCP; they have no screens. Phase 2 has to change phase 1's code: product merges move purchase lines, so recording and correcting must keep each line's origin. In the real delivery that is where phase 2's review found its bugs (`history/findings.md`).

- **Repository:** `taecontrol/despensa` (private; the owner's checkout is enough, the run never pushes).
- **Base commit:** `fa3ac39`.

| Phase | Feature | Real PRs | Spec the lead receives | Phase directory |
|---|---|---|---|---|
| 1 | Record a purchase read from a receipt, then correct, delete and find purchases | #14 `81489cb`, #15 `231930f` | `.work/compras/spec.md` | `.work/compras/` |
| 2 | Tidy the product catalog: edit, merge and undo products, group them into kinds (issue #8) | #22 `ccca311` | `.work/specs/8-catalog.md` | `.work/catalogo/` |

The proof goes in the phase directory. The specs and program designs are the accepted versions the real delivery received, recovered from the delivery transcripts. Phase 1 joins two specs, because each was its own pull request. Each changed file states its changes in a comment at its top: the real receipts are replaced by synthetic receipts of the same shape (`phase-1/receipts.json`, built to add up exactly), slice 1's E11 is out because the case has no receipt photos, and the status lines record the owner's acceptance.

## Setting up each phase

**Each arm gets a clone that holds no history after the base.** A worktree of the owner's checkout would let an arm read the real solution with `git show 231930f`. Make each run directory with `git clone --single-branch --no-tags <the owner's checkout> run-N`, then inside it `git reset --hard fa3ac39`, `git remote remove origin`, `git reflog expire --expire=now --all` and `git gc --prune=now`, and check that `git cat-file -t ccca311` fails. Run `vp install` in it. Each lead's brief adds: read only this directory, never the GitHub repository, its issues or its pull requests.

Before launching a lead, in each run directory (create the directories first):

- **Phase 1:** copy `phase-1/specs/*` and `phase-1/receipts.json` to `.work/specs/`, and `phase-1/spec.md` to `.work/compras/spec.md`. Copy `phase-1/recording-purchases.md` to `docs/design/recording-purchases.md` and commit it as "Record the accepted data model and agent contract for recording purchases", as the real branch's first commit did.
- **Phase 2:** copy `phase-2/specs/*` to `.work/specs/`. Copy `phase-2/catalog.md` to `docs/design/catalog.md` and commit it as "Design the product catalog: kinds, edits, merges and their undo".

`.work/` is ignored by git, so it never enters a commit.

**A contradiction the real inputs carry.** Slice 2's F10 says the products of a deleted purchase "still appear in `find_products`", while the accepted design keeps evidence only on purchase lines, and phase 2's spec starts from the opposite: after a deletion `find_products` cannot reach the product, so recording the receipt again creates a duplicate (E10). The real delivery recorded F10 as a known limit. The case keeps both texts as they were; judges score an arm's resolution by the arms brief's rule, the reading the Decisions and accepted references support.

Phase 2's program design and specs name files and functions of the real phase 1 code (`insertLines`, `linkLines`, `write.ts`); a note at their top tells the lead to map them to the worktree's code.

## Running the product

`vp dev` serves the Worker with a local D1 under the worktree; apply the migrations first with `vp exec wrangler d1 migrations apply DB --local`. Operations answer at `POST /api/<name>` and over MCP at `/mcp`. Local runs need no Cloudflare account and record as `local@despensa.localhost`. `vp run verify` is the gate.

Every check seeds its own data by calling `record_purchase` with the receipts in `.work/specs/receipts.json`, so no check depends on an arm's seeding. Judges and checkers drive the product over HTTP and MCP; there is no browser step.

## Known history

What the real delivery's reviews found, the bug it shipped (#29), and which hidden check each one became are in `history/findings.md`, with the pull request descriptions beside it. For the runner only.

## From shape

A second way to run the case starts each phase from the brief the real thread received instead of the accepted spec, so each arm shapes its own spec with a simulated owner. Its files are in `from-shape/`:

- `opening-1.md` and `opening-2.md`: the adapted briefs, each with its changes in a comment at its top;
- `tickets/`: the synthetic receipts as printed tickets, copied to `.work/tickets/`;
- `owner.md`: the owner's brief, built from the November transcripts; the runner splits it per phase and serves it through a command each lead calls as `.work/ask-owner`;
- `hidden-sessions.md`: the hidden checks as two sessions of use over MCP on one database, written so they apply to whatever tools a build designed.

The arms for this way are in `arms/flow-common.md`, `arms/d-with-design.md` and `arms/n-without-design.md`. The first run is `results/2026-11-22-despensa-compras-from-shape.md`.
