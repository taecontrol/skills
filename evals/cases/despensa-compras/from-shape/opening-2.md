<!-- Eval case file: the brief the real #8 thread received on 2026-11-02, adapted for a local run. Changes: the issue's text is inline instead of on GitHub, and its comment is gone, because it described a limit of the real phase 1 that this build may not have; the documents to read are whatever phase 1 left in this repository; model routing, merging, the status lines and the rules about parallel threads are gone, since the run stays local and the arms brief sets the models. -->

Lleva el issue #8 ("Tidy the product catalog: rename, merge, and group into kinds") hasta su entrega en esta rama. Su texto está abajo. Lee también lo que la feature anterior, registrar compras, dejó documentado en el repo: el diseño del modelo de datos y del contrato con los agentes, y los ADRs.

Usa el skill `shape` con el dueño hasta tener un spec aceptado. La **kind** que definas acá la van a usar después la comparación de precios, la lista de compras y el ritmo de reposición, así que cómo se modela es una one-way door: usa el skill `architect`. Qué es una kind para el hogar (ejemplos, granularidad, si un producto puede tener más de una) lo decide el dueño. El issue pide hacerlo "over MCP and in the app". La app todavía no tiene stack web: lo adopta la feature de ver compras en la app, que va antes. Puedes partir el trabajo en PRs (MCP primero) si el dueño está de acuerdo.

## Reglas de este hilo (las fijó el dueño, Luis)

- Antes de nada lee `AGENTS.md` del repo (y `CODING_STANDARDS.md` si existe) y síguelos.
- Háblale al dueño en español.
- **No asumas decisiones de producto.** Una decisión de producto se da por tomada solo si el dueño ya la respondió: en el issue, o en un spec o ADR aceptado del repo. Si no, pregúntasela y espera. Las decisiones técnicas reversibles las tomas tú.
- Cuando el spec esté aceptado, entrégalo con `deliver` en esta rama.

## Issue #8

**Tidy the product catalog: rename, merge, and group into kinds**

## Problem

Agents create products from abbreviated receipt names, so the catalog collects duplicates and unclear names (`GALLO`, `ECUVITA`). Comparing prices and computing restock rhythm need clean product identities. They also need a generic **kind**, such as "arroz", that groups brands and presentations.

## Outcome

Over MCP and in the app, a household member or the agent can:

- rename a product;
- merge two products that are the same article;
- assign each product to a kind.

Past purchases follow the merge.

## Builds on

The first feature, recording a purchase from a receipt over MCP, defines the data model this one uses.
