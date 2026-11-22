# Hidden sessions

You use one build of Despensa the way the household's agent does: over MCP, from receipts, on one database that keeps everything each step leaves. Each build designed its own tools, so learn them from the tool list and their descriptions alone, as an MCP client would. Do not read the build's code, specs or tests. The worktree path is named at the end of this brief.

- **Work in your own copy.** Others use the same worktree at the same time, and the product keeps its database inside the checkout. Make a copy with `git -C <worktree> worktree add --detach <a new directory outside it> HEAD`, copy the worktree's `.work/tickets/` into it, work there, and remove it with `git worktree remove --force` when you finish.
- **Launch** the product in the copy: `vp install`, apply the build's migrations to the copy's local D1 (`vp exec wrangler d1 migrations apply DB --local`), then `vp dev --port <a free port>`. Its MCP endpoint is `/mcp` (protocol revision `2025-06-18`). Start the session on an empty database and **never reset it**: every step runs on what the steps before it left.
- **Receipts** are the printed tickets in `.work/tickets/`, which stand in for photos. A step that needs another receipt describes it as a change to one of them. Build each call from the ticket as the tool descriptions ask. The chains are `Coto` and `Farmcity`, and a branch is its street address. Before recording a line, find its product the way the tool descriptions say; when a tool needs to know what product a line is, the person tells you the names in the table at the end; when a description says to ask the person, ask by noting the question in your evidence and use that table as the answer.
- **Three ways to send the same thing again**, as the steps name them:
  - a **retry** resends the identical tool call, every argument the same, as a client does when the response was lost;
  - a **new send** builds a new call from the same ticket, as a new conversation or the other household member would, so any request key the build uses is new;
  - **at once** sends the calls as separate MCP requests at the same moment, for example with `Promise.all` in a Node script.
- **Judge by what the household would see**: what the tools answer and what reading the data back shows. Tool names, field names, message wording and error formats differ between builds. A failure the tool does not declare, such as an internal error, fails the step.

Answer with one JSON object:

```json
{ "steps": [ { "id": "S1", "result": "pass|fail|blocked|not-offered", "evidence": "the calls you sent and the answers you got, abridged" } ] }
```

Use `not-offered` only when the build has no tool for what the step needs; say which tool is missing. Use `blocked` when you could not run the step for another reason.

## Session 1: a week of receipts

Run it after phase 1, and again, on a new empty database, after phase 2.

- **S1, Today's receipts.** Record the Coto ticket and the Farmcity ticket. Expected: both recorded; reading each back shows its store, date, time, every line's amount and adjustment as printed, and its printed totals.
- **S2, A lost response.** Retry the Farmcity call. Expected: no second purchase; the answer leads to the Farmcity purchase from S1.
- **S3, A retry with a different total.** If the build's record call carries a key of the caller's own that names the request, retry the Farmcity call with that key unchanged and the total changed to 7.195,40. Expected: no second purchase, and the stored total is still 7.195,50. If the build has no such key, mark `not-offered`.
- **S4, The other member sends the same photo the next day.** New send of the Coto ticket, writing the CUIT without dashes (`30711883459`) and the receipt number without leading zeros (`731562`) wherever the call takes them. Expected: no second purchase; the answer says or shows it is the purchase from S1.
- **S5, Ten agents send one receipt at once.** Make a Coto receipt "C2": the Coto ticket with number `00731999`, dated 02/11/2026. New send it ten times at once. Expected: exactly one purchase for C2; every answer leads to it; no answer is an undeclared failure.
- **S6, Five corrections at once.** Read C2 back, then send five corrections of its time at once, each from what you read and each with a different time (11:00:01 to 11:00:05). Expected: C2 shows exactly one of the five times; every agent whose time is not the stored one was told its correction did not stand, unless the tool description says the last correction wins; no undeclared failure.
- **S7, A correction of the receipt number, then the lost retry.** Make a Farmcity receipt "F2": the Farmcity ticket with number `00051300`, dated 02/11/2026, and record it. Correct F2's receipt number to `00051301`, as if the agent had misread it. Then retry the first call that recorded F2, still carrying `00051300`. Expected: one purchase for F2, with number `00051301`.
- **S8, Lines that do not add up.** New send of a Farmcity receipt with number `00051400` and its total printed as 7.200,00. Expected: refused, saying the lines are 4,50 short of the total; nothing recorded.
- **S9, Exact sums of huge amounts.** Make a Farmcity receipt with number `00051500`, two lines without codes, `LARGE` 90.071.992.547.409,90 and `SMALL` 0,03, an adjustment for the whole receipt of -90.071.992.547.409,90 if the build takes one, and total 0,02. Expected: refused, because the lines add to 0,03. Send it again with total 0,03. Expected: recorded, and reading it back shows total 0,03 and each amount exactly as sent. If the build takes no adjustment for the whole receipt, give `LARGE`'s line the adjustment instead.
- **S10, A misread amount with too many decimals.** New send of a Farmcity receipt with number `00051600` whose first line's amount is `4215.0000001`. Expected: refused, or stored exactly as sent; never silently rounded.
- **S11, A long receipt over known products.** Make a Coto receipt with number `00732000` and 60 lines: the Coto ticket's 27 lines with their codes, then 33 lines without codes, `ITEM 28` to `ITEM 60`, each 100,00; subtotal and total grow by 3.300,00 and the discounts stay. Expected: recorded with 60 lines, and each of the first 27 lines is on the same product as the same line of the S1 Coto purchase.
- **S12, A failed recording leaves nothing.** Record a receipt from a new chain, `Día`, branch `Av. Corrientes 2200`, that the build refuses: one line whose total does not add up, or, if the build lets a line name an existing product, a product that does not exist. Expected: refused, and nothing anywhere shows the chain Día or its branch.
- **S13, A case code is a product.** Record a Coto receipt with number `00732100` and one line `GALLO X6` with barcode `27790078024684`, named "Arroz Gallo Oro 1 kg x6". Then record another with number `00732101`, the same line and barcode, and the name "Gallo oro caja". Expected: both lines are on one product.
- **S14, Unclear lines.** Read the description of the tool that records purchases. Expected: it tells the agent to ask the person when it cannot tell what a line is, rather than record a guess.
- **S15, Finding past purchases.** List the purchases as a new conversation would to find last week's. If the list comes in pages, follow them with the smallest page size the build accepts. Expected: every purchase recorded so far appears exactly once, newest first. If the build finds purchases by chain, search for `  coto ` and for `COTO`: each finds every Coto purchase and nothing else.
- **S16, A purchase recorded by mistake.** Delete F2. Expected: it no longer appears anywhere. Then new send F2's receipt with number `00051301`. Expected: recorded as a new purchase, not answered with the deleted one.
- **S17, Same-day purchases without a time (recorded, not scored: the owner chose this order after the feature shipped).** Record two Farmcity receipts dated 03/11/2026 with no time, numbers `00051700` then `00051701`, a second apart. Expected: listing shows `00051701` first.

## Session 2: tidying the catalog

Run it after phase 2, on the database session 1 left. Products "A", "B" and "C" come from three receipts:
- **A**: a Coto receipt with number `00733000` and one line `ARROZ DOBLE CAROLINA`, barcode `7790070507051`, named "Arroz doble carolina", no presentation;
- **B**: a Farmcity receipt with number `00052000` and one line `ARROZ CAROLINA X 1KG`, no codes, named "Arroz carolina 1 kg", no presentation;
- **C**: a Coto receipt with number `00733001` and one line `FIDEOS MONO`, barcode `7790070507068`, named "Fideos moño".

- **T1, A kind while recording.** Record a Coto receipt with number `00733100` and one line `YERBA PLAYADITO 1KG`, barcode `7790070507075`, named "Yerba Playadito 1 kg", with the kind «Yerba» given while recording, if the build takes one. Then give C the kind «yerba» while tidying. Expected: one kind holds both products. If the build takes no kind while recording, give it while tidying and mark the first half `not-offered` in the evidence.
- **T2, Counts are purchases.** Record a Coto receipt with number `00733200` holding two separate lines with A's barcode. Expected: wherever the catalog shows how many purchases a product has, A shows 2, not 3.
- **T3, Correcting a merged line, keeping its product, then undo.** Merge A into B. Correct A's line on receipt `00733000`, sending it complete with the product it showed before the merge. Expected: the correction stands and the line is on B. Undo the merge. Expected: the line is back on A.
- **T4, The same, naming the current product.** Repeat T3 on receipt `00733200`, this time naming B, the product the line shows after the merge. Expected after the undo: the line is back on A.
- **T5, An explicit pick of a merged-away product.** Merge A into B. Correct B's line on receipt `00052000` to name A. Expected: the correction stands and the line shows B. Undo the merge. Expected: that line is on A, A's own lines are on A, and B has no purchases.
- **T6, Refused edits create no kind.** Give a product that does not exist the kind «fantasma». Then merge B into A, and give B the kind «fantasma». Expected: both refused, the second saying B was merged into A; no kind «fantasma» exists. Undo the merge.
- **T7, Five copies of one merge at once.** Retry one merge of B into A five times at once. Expected: one merge; reading B leads to A, which shows one merge in its history.
- **T8, Opposite merges at once.** Undo T7's merge. Merge C into A and A into C at once. Expected: one stands and the other is refused; exactly one of the two is a current product. Undo the one that stood.
- **T9, Searching finds merged names.** Search the catalog for `doble`. Expected: it finds the product A was merged into, or A itself when A is current, and not unrelated products.
- **T10, Different presentations.** Make two products from new Coto receipts: "Leche entera 1 l" with presentation 1 l (barcode `7790070507082`, number `00733300`) and "Leche entera 500 ml" with presentation 500 ml (barcode `7790070507099`, number `00733301`). Merge one into the other. Expected: refused, naming both presentations; both stay current and unmerged.
- **T11, Recording after a merge, deleting it, then undo.** Undo any merge left on A, B or C, merge A into B, record a Coto receipt with number `00733400` and a line with A's barcode, then delete that purchase and undo the merge. Expected: the undo works; every line is on the product it was on before this step; the deleted purchase appears nowhere; every remaining purchase shows its printed totals.
- **T12, Undo is as if it never happened.** Merge A into B. Record a Coto receipt with number `00733500` and a line with A's barcode. Expected: the line is on B. Undo the merge. Expected: that line is back on A.
- **T13, The old product still leads somewhere.** Merge A into B. Read or edit A by the reference the build gave for it before the merge. Expected: reading leads to B; editing A is refused, saying it was merged into B.
- **T14, A correction's new product keeps its kind.** Correct A's line on receipt `00733000` to a new product "Arroz carolina Gallo 1 kg" with the kind «arroz carolina», keeping its barcode. Expected: the line is on that new product, and the kinds show «arroz carolina» with one product.
- **T15, Products left without purchases.** Delete the purchase from receipt `00733001`, C's only one, if C has no other. Expected: the catalog still shows C, marked as having no purchases, and C can be deleted. A product that has purchases cannot be deleted.

## Names the person gives

| Ticket line | Name |
|---|---|
| Coto 1 `PAN D/MESA BLANCOFARGO` | Pan de mesa blanco Fargo 390 g |
| Coto 2 `PECETO AL HORNOCOTO` | Peceto al horno Coto |
| Coto 3 `FILET DE MERLUZA` | Filet de merluza fresco |
| Coto 4 `ZORRO` | Detergente Zorro |
| Coto 5 `JABON LIQUIDO LAVANDAALGABO` | Jabón líquido lavanda Algabo 300 ml |
| Coto 6 `DESODORANTE REXONA` | Desodorante Rexona Men Xtra Cool 150 ml |
| Coto 7 `PRE MEZCLA P/PIZZAMAMA COCINA` | Premezcla para pizza Mamá Cocina 500 g |
| Coto 8 `CACAO E/POLVO DULCECOLACAO` | Cacao en polvo Colacao 400 g |
| Coto 9 `ARVEJASCOTO` | Arvejas Coto 300 g |
| Coto 10 `FIDEOS TIRABUZONFEDERAL` | Fideos tirabuzón Federal 400 g |
| Coto 11 `ARROZ LARGO FINO LUCCHETTI` | Arroz largo fino Lucchetti 1 kg |
| Coto 12 `TOSTADAS LIGHTBIMBO` | Tostadas light Bimbo 200 g |
| Coto 13 `MILA.NALGA NOV. ESTANCIA` | Milanesa de nalga Estancia |
| Coto 14 `CARNE PICADA ESPECIAL` | Carne picada especial |
| Coto 15 `QUESO TYBO BARRAESTILO REAL` | Queso tybo barra Estilo Real |
| Coto 16 `QUESO CREMOSOMELINCUE` | Queso cremoso Melincué |
| Coto 17 `GARBAN RAMO400` | Garbanzos Ramo 400 g |
| Coto 18 `ACEITE GIRASOL .NATURA` | Aceite de girasol Natura 1,5 l |
| Coto 19 `ECUVITA` | Ecuvita |
| Coto 20 `LENTEJAS COTO` | Lentejas Coto 400 g |
| Coto 21 `GALLO` | Arroz Gallo Oro 1 kg |
| Coto 22 `EMPANADA CARNECOTO` | Empanada de carne Coto |
| Coto 23 `EMPANADA JAMON Y QUESOCOTO` | Empanada de jamón y queso Coto |
| Coto 24 `EMPANADA HUMITACOTO` | Empanada de humita Coto |
| Coto 25 `LECHE E/POLVO ENTERALA SERENISIMA` | Leche en polvo entera La Serenísima 400 g |
| Coto 26 `ALMENDRAS PELADAS` | Almendras peladas |
| Coto 27 `AVENA INSTANTANEAQUAKER` | Avena instantánea Quaker 400 g |
| Farmcity 1 `PARACETAMOL 500MG X 20 COMP` | Paracetamol 500 mg x 20 |
| Farmcity 2 `ALCOHOL EN GEL 250 ML X 1` | Alcohol en gel 250 ml |
| `ITEM 28` to `ITEM 60` | Ítem 28 to Ítem 60 |
