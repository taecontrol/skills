<!-- COMPILED, not an original file. Phase 2 (#32) had no constraints.md under .work/. These are the orchestrator notices the #32 shaping thread received, quoted verbatim from <transcript> (user messages at the timestamps given). The spec's Decisions section records how they were applied (E15 five destinations, E16 README). -->

# Orchestrator notices received while shaping #32

## 2026-11-03T11:32:00Z (start of #32)

> Orquestador: el dueño pidió seguir con los issues que quedan en despensa. Tu turno anterior terminó sin arrancar #32. Empieza ahora el shape de #32 (tipos: renombrar, unir y borrar desde la app), en una rama nueva desde `origin/main` actualizado (#31 ya está en main). Mismas reglas de siempre: shadcn y responsive, no asumas decisiones de producto, Deliver con Opus high aparte (Sol max fast implementa, Astra high revisa, consejo Fable+Astra si Sol se traba), merge seguro, y avísame al terminar cada turno. Otro hilo está reescribiendo `README.md` en paralelo; no lo toques. Las dos preguntas del #31 (contador de compras al separar; reintento después de que Ana deshizo) siguen esperando al dueño: si alguna afecta a #32, inclúyela en tus preguntas.

## 2026-11-03T12:06:29Z (README rewrite merged)

> Orquestador: el README nuevo entró a main (PR #37, 7c53585). Ahora lista las herramientas MCP agrupadas por tarea y describe las pantallas de la app. Cuando el PR de #32 agregue o cambie herramientas o pantallas, actualiza también la sección correspondiente del README en el mismo PR. Rebasa sobre main antes.

## 2026-11-03T14:19:01Z (#20 merged; phase 1 is now on main)

> Orquestador: el #20 ya está en main (PR #38, 9c93fcd). Agrega «Precios» al final de `destinations` en app-shell, después de «Catálogo», y toca router, i18n y la sección de pantallas del README. Rebasa feat/32-catalog-kinds sobre main y conserva esas entradas. Si #32 cambia el menú o las pantallas, actualiza el README en el mismo PR.

After that rebase the shaping thread deleted its uncommitted copies of `src/web/components/ui/select.tsx` and `tabs.tsx`, because `main` already had the ones #20 added (transcript, 14:19:24Z). An untracked `src/web/components/ui/dropdown-menu.tsx` stayed in the worktree and was never committed.
