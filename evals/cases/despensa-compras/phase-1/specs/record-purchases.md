# An agent records a purchase read from receipt photos, over MCP (slice 1 of 2)

Status: Accepted (by the owner, 2026-11-01)

<!-- Eval case copy. Changed from the accepted original: the two real receipts are replaced by synthetic receipts of the same shape, and every figure, code, time and address taken from them follows; E11 is out of the eval because the case has no receipt photos; the status lines record the owner's acceptance. Nothing else changed. -->

## Problem

The owner comes back from the supermarket with paper receipts and wants Despensa to hold what they bought, without typing it in.

- **Today there is nowhere to put it.** Despensa has no data model and only `get_status`. (observed)
- **Typing is the cost.** A 27-line Coto receipt typed by hand is "tedious". (reported) Sending the photo to an agent that already reads images is "faster and less tedious". (reported)
- **The agent can read it.** It reads the photo with its own vision. Despensa must take structured data, never images. (decided by the owner)
- **The receipts are hard:** abbreviated, concatenated names; weighed lines rounded by the store; discounts that are not their label's percentage; promotions spanning lines; restricted barcodes; pharmacy tickets with no codes at all. (observed in two real receipts, 2026-11-01)
- **Where the photo is sent from.** The owner wants to use the Claude app (phone or desktop) and ChatGPT. Claude Code and Codex already reach production. Remote connectors can now register in Access (observed), but a full login from them is not yet observed.

Options considered:

- **A Despensa-side OCR or upload service:** rejected by the owner; no images.
- **Agent-driven multi-step drafts:** rejected in design; it leaves partial state.
- **Doing nothing:** the data that #7–#12 need never exists.

## Outcome

The owner sends the photos of a receipt to their agent. The agent asks only about lines it cannot identify, then records the whole purchase in one call. Despensa holds it exactly as printed: store, date, every line, its codes and amounts, the discounts, and the totals, linked to products it already knew when the codes match, and marked with who recorded it. The agent reads it back to confirm.

Despensa refuses a transcription that does not add up. A retry after a lost response, or the same receipt sent again later, never creates a second purchase.

## Out of scope

- **Slice 2** (its own issue): correcting a recorded line (`correct_purchase`), deleting a purchase (`delete_purchase`), and finding past purchases (`list_purchases`).
- **Out of the feature altogether:**
  - USD (#9);
  - product kinds, renames, and merges (#8);
  - screens (#7, #12);
  - payment method and bank reimbursements;
  - money, the owner's finance app;
  - images.

## Examples

The fixtures are the two receipts of 2026-11-01, transcribed below and in `.work/specs/receipts.json`. Expected values come from the printed receipts, not from the code.

- **E1** `test`: **pharmacy ticket.** Given an empty database, when an agent records the Farmcity ticket over MCP, then the result is `recorded`. Reading it back over HTTP with `get_purchase` returns:
  - chain Farmcity, branch Av. Rivadavia 5320, date 2026-11-01, time 10:31:47;
  - two lines with their raw texts, 4215.00 and 2980.50, no codes and no quantity;
  - total 7195.50;
  - `recordedBy` `local@despensa.localhost`.
- **E2** `test`: **full supermarket receipt.** When an agent records the full Coto receipt, then the result is `recorded` with 27 lines, subtotal 180644.74, discounts −31313.66, and total 149331.08. Also:
  - peceto stores 10163.74 and 0.264 kg;
  - Lucchetti keeps its −1150.62 discount;
  - merluza is one line of 1.088 kg and 13589.12;
  - each empanada line has its own −2690.00.
- **E3** `test`: **misread discount.** When the Coto receipt is sent with Fargo's discount read as −3861.50, then the result is `TotalsMismatch` with check `discounts` and difference 0.40, and `list_stores` is still empty, so nothing was written.
- **E4** `test`: **lost response.** When the same `record_purchase` call (same `requestId`) is sent twice, then the second answer is `already_recorded` with the first purchase's id, and only one purchase exists.
- **E5** `test`: **same photo, new conversation.** Given the Coto receipt is recorded, when it is sent again with a new `requestId`, different readable product names, and the chain spelled "COTO", then the answer is `already_recorded` with the original purchase and its `recordedBy`. Its lines are unchanged.
- **E6** `test`: **known products by code.** Given the Coto receipt is recorded, when a later Coto receipt is recorded with a Lucchetti line (barcode 07790070907721) and a peceto line (store code 0000006531, a different 25… barcode), both sent with `newProduct`, then both lines link to the existing products, `linkedBy` `barcode` and `store_code`. Also:
  - a line whose only barcode starts with 25 or 28 never links by barcode;
  - `find_products` with those codes returns the same matches before recording.
- **E7** `test`: **known products by text.** Given the Farmcity ticket is recorded, when another Farmcity ticket has the line `PARACETAMOL 500MG X 20 COMP`, then it links to the same product, `linkedBy` `receipt_text`.
- **E8** `test`: **agent picked the wrong product.** When a line's barcode identifies product P but the agent sends `productId` Q, then the result is `ProductMismatch` naming both, and nothing is written.
- **E9** `test`: **who recorded it.** Given Access settings, when the owner's and the partner's agents (signed assertions) record different receipts concurrently, then both purchases exist, each with its own email as `recordedBy`.
- **E10** `test`: **tools.** On both MCP revisions, the tool list holds `get_status`, `list_stores`, `find_products`, `record_purchase` and `get_purchase`, each described for the agent and with the hints of its kind.
- **E11**: not part of this eval. The case has no receipt photos.
- **E12** `test`: **schema compatibility.** With the migration applied, `get_status` and the existing gate tests keep passing unchanged.

State space for `record_purchase` (rows: what exists; columns: what arrives):

| Exists \ Arrives | New `requestId`, new receipt | Same `requestId` | New `requestId`, same receipt identity | Totals off |
|---|---|---|---|---|
| Nothing | `recorded` (E1, E2) | — | — | `TotalsMismatch`, nothing written (E3) |
| Purchase from this request | — | `already_recorded` (E4) | — | `already_recorded`: the first commit wins |
| Purchase with this receipt identity | — | — | `already_recorded` (E5) | `TotalsMismatch` |
| A concurrent writer, same receipt | one `recorded`, the other `already_recorded` | same | same | — |
| Previous Worker running during the migration | `get_status` unaffected; new tools absent until the Worker deploys (E12) | | | |

A receipt without a receipt identity (no CUIT, point of sale, or number) is deduplicated only by `requestId`.

## Test boundary

- **Where the tests run:** MCP `tools/call` and `POST /api/<name>` through `exports.default.fetch`, in workerd with `@cloudflare/vitest-plugin`, against the real local D1. A test that writes starts from `reset()` and `applyD1Migrations` of `migrations/`.
- **Real target:**
  - the production Worker build;
  - both MCP revisions;
  - full-length receipts (27 lines) and code-less ones (2 lines);
  - the empty database a first deploy sees.
- **Stand-ins:** only Access's certs, as `tests/access.test.ts` already does (E9). No database or handler fakes.
- **Running the product:** `vp dev` with the local D1, and Claude Code connected with `claude mcp add --transport http despensa-local http://localhost:5173/mcp`.

## Decisions

- **Data model and agent contract:** see `docs/design/recording-purchases.md` (architect: two candidates plus a judge, synthesized; accepted by the owner, 2026-11-01).
- **Program design:** see `.work/specs/record-purchases.program-design.md` (accepted with this spec).
- **Remote connectors:** the spike is `Partial`.
  - Access registration of `claude.ai`, `claude.com` and `chatgpt.com` callbacks was observed failing (400) before and succeeding after `allowed_uris` was set, with the owner's approval.
  - A full login from those clients was not observed; the owner chose not to test it now.
  - The tools do not depend on the client. Claude Code and Codex reach production today.
  - An ADR records the Access change.
- **Owner decisions:**
  - the MEP rate, arriving with #9;
  - record who recorded it;
  - no link to money;
  - product = exact article;
  - store = branch of a chain;
  - the agent asks when unclear;
  - refuse on mismatch;
  - no payment method.
- **ADRs in this slice:**
  - handler services gain `Member` and `D1Client` (extends ADR-0004);
  - remote connectors in Access (amends ADR-0005);
  - purchases recorded whole and deduplicated by request and receipt identity, products linked only by exact codes.
- **Split:** two slices (ADR-0001). Slice 1 is usable on its own: it records and reads back. Slice 2 adds correction, deletion and listing.

## Rabbit holes

- **Money:** never multiply a JSON float by 100. Decode from the number's shortest decimal string.
- **Batch failures:** never parse D1 error text to tell a constraint from an outage. Reread by key.
- **The offer summary:** the receipt's "DETALLE DE OFERTAS APLICADAS" footer repeats the line discounts. The tool description must say not to send it as adjustments.
- **Bound parameters:** D1 allows at most 100 per statement. Insert lines in several statements, or use a bound JSON array with `json_each`, never one huge statement.
- **The tools test:** the existing exact tool-list test must list the new tools (E10). Do not loosen it to "contains".

## Context

- **Repo:**
  - `AGENTS.md`, `CODING_STANDARDS.md`;
  - ADR-0001 to ADR-0005;
  - `src/operations/operation.ts`, `src/worker/operation-layer.ts`, `src/worker/access.ts`, `src/worker/index.ts`;
  - `tests/mcp.test.ts`, `tests/access.test.ts`.
- **Related issues:** #7–#12, and the slice 2 spec, `.work/specs/fix-and-find-purchases.md`.
- **References:** Nook ADR-0007 (D1 and migrations) and ADR-0011 (idempotent writes).

### Fixture: Coto, 2026-11-01 10:14:22

Store "SUC184 COTO CICSA", Av. Rivadavia 5108, CABA, branch code 184. CUIT 30-71188345-9. NRO.T. 2184-00731562. Factura B.

| # | qty × unit price | raw text | store code | barcode | amount | adjustment |
|---|---|---|---|---|---|---|
| 1 | 2 × 5517.00 | PAN D/MESA BLANCOFARGO BSA 390 GRM | 0000631152 | 07793891160009 | 11034.00 | 1 *70% 2DA MARCAS −3861.90 |
| 2 | 0.264 kg × 38499.00 | PECETO AL HORNOCOTO X KG | 0000006531 | 02506531002646 | 10163.74 | 1 *25% ELABORADOS −2540.94 |
| 3 | 1.088 kg × 12490.00 | =FILET DE MERLUZA DESPINADOFRESCO X KG (0,512 x 02517921005129; 0,576 x 02517921005761) | 0000017921 | 0000000000000 | 13589.12 |  |
| 4 |  | ZORRO | 0000585120 | 07790993452278 | 4890.99 | 1 *45% ZORRO −2200.95 |
| 5 |  | JABON LIQUIDO LAVANDAALGABO BOM 300 ML | 0000509911 | 07791278712902 | 3120.99 |  |
| 6 |  | DESODORANTE REXONA MENXTRA COOL AER 150 ML | 0000224618 | 07791795076174 | 3455.99 | 3 *25% MARCAS −864.00 |
| 7 |  | PRE MEZCLA P/PIZZAMAMA COCINA PAQ 500 GRM | 0000572304 | 07792180215321 | 4980.00 |  |
| 8 |  | CACAO E/POLVO DULCECOLACAO PAQ 400 GRN | 0000574390 | 08410004502363 | 6120.00 | 3 *25% MARCAS −1530.00 |
| 9 |  | ARVEJASCOTO LAT 300 GRM | 0000482115 | 02800004821155 | 790.00 |  |
| 10 | 2 × 1650.00 | FIDEOS TIRABUZONFEDERAL PAQ 400 GRM | 0000605013 | 07840024537686 | 3300.00 | 2 *25% CLASES −825.00 |
| 11 | 2 × 2290.00 | ARROZ  LARGO FINO LUCCHETTI PAQ 1 KGM | 0000572036 | 07790070907721 | 4580.00 | 2 *25% LUCCHETTI −1150.62 |
| 12 | 2 × 4120.00 | TOSTADAS LIGHTBIMBO PAQ 200 GRM | 0000542701 | 07793895727710 | 8240.00 | 2 *50% PANADERIA −4120.00 |
| 13 | 0.760 kg × 14299.00 | =MILA.NALGA NOV. ESTANCIA X KG | 0000029982 | 02529982007602 | 10867.24 |  |
| 14 | 0.915 kg × 15999.00 | =CARNE PICADA ESPECIAL X KG | 0000048207 | 02548207009153 | 14639.09 |  |
| 15 | 0.286 kg × 13499.00 | =QUESO TYBO BARRAESTILO REAL X KGM | 0000013311 | 02513311002864 | 3860.71 |  |
| 16 | 0.312 kg × 19299.00 | =QUESO CREMOSOMELINCUE XKG | 0000015932 | 02515932003121 | 6021.29 |  |
| 17 | 2 × 1940.00 | GARBAN RAMO400 | 0000006702 | 07790276287795 | 3880.00 | 2 *2X1 CLASES −1940.00 |
| 18 |  | =ACEITE GIRASOL .NATURA PET 1.5 LT | 0000163611 | 07790270128292 | 6215.00 |  |
| 19 |  | ECUVITA | 0000515020 | 07798127377237 | 8240.99 | 3 *25% MARCAS −2060.25 |
| 20 | 2 × 2150.00 | LENTEJAS COTO PAQ 400 GRM | 0000171688 | 02800001716881 | 4300.00 | 2 *2X1 CLASES −2150.00 |
| 21 |  | GALLO | 0000632410 | 07790078024680 | 7650.00 |  |
| 22 | 2 × 2690.00 | EMPANADA CARNECOTO UNI | 0000044781 | 02544781000029 | 5380.00 | 1 *6X3 EMPANADAS −2690.00 |
| 23 | 2 × 2690.00 | EMPANADA JAMON Y QUESOCOTO UNI | 0000044775 | 02544775000028 | 5380.00 | 1 *6X3 EMPANADAS −2690.00 |
| 24 | 2 × 2690.00 | EMPANADA HUMITACOTO UNI | 0000044769 | 02544769000027 | 5380.00 | 1 *6X3 EMPANADAS −2690.00 |
| 25 |  | LECHE E/POLVO ENTERALA SERENISIMA EST 400 | 0000510702 | 07790746501246 | 9480.00 |  |
| 26 | 0.412 kg × 27999.00 | =ALMENDRAS PELADASX KG (0.197 x 02563702001978; 0.215 x 02563702002159) | 0000063702 | 0000000000000 | 11535.59 |  |
| 27 |  | AVENA INSTANTANEAQUAKER PAQ 400 GRM | 0000621488 | 07792174509450 | 3550.00 |  |

Printed: subtotal 180644.74, discounts −31313.66, total 149331.08 (checked: the lines and adjustments add up exactly).

### Fixture: Farmcity, 2026-11-01 10:31:47

FARMCITY SA, CUIT 30-71422907-5, Av. Rivadavia 5320. Cód. 083 TIQUE, P.V. 04217, Nº T. 00051268.

| raw text | amount |
|---|---|
| PARACETAMOL 500MG X 20 COMP | 4215.00 |
| ALCOHOL EN GEL 250 ML X 1 | 2980.50 |

Total 7195.50.

Both receipts, as `record_purchase` inputs without a `requestId`, are in `.work/specs/receipts.json`.

## Open questions

None. The owner accepted the data model and contract, the program design, and the split into two slices.
