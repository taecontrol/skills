# Retro: Money #9 — plan participation (diseño → entrega)

Fecha del reporte: 2026-09-17

Idioma: español (corrida del owner)

## Alcance y evidencia

- **Objetivo de la corrida:** cerrar issue [#9](https://github.com/taecontrol/money/issues/9) (on-plan vs tracking) desde decisiones de producto/UI/arquitectura hasta código validado y PR.
- **Worktree:** `/home/guetteluis/orca/workspaces/money/plan-mark-accounts-on-plan-vs-tracking`
- **Rama / resultado:** `guetteman/plan-mark-accounts-on-plan-vs-tracking` → PR https://github.com/taecontrol/money/pull/30
- **Revisiones útiles:** base de diseño `f757f86` (ADR-0004 ya en main); entrega `421b227` → `675c267` → `6c44ac7` → `f799540`; ADR post-cierre `cc8287b` (ADR-0005).
- **Evidencia primaria:** transcript padre de diseño `bf5ba370-…`; sesión `/deliver` `7cb088c1-…`; subagentes Implementer/Finisher/Product Validator (p. ej. `31490613`, `8aa12deb`, `3cd50d6e`, `025d7909`); commits y `pnpm verify` final exit 0; evidencia de producto bajo `.local/verification/manual/driver/pv-f799540-20260917-1344/`.
- **Huecos:** material temporal `docs/design/` y `prototypes/` fue eliminado tras el cierre (contenido reconstruido desde transcripts y ADRs, no releído completo al final); versiones exactas de skills en `~/.claude` durante la corrida no auditadas byte-a-byte frente a este catálogo `logperch`; notificaciones de shells de subagentes llegaron fuera de orden y no son evidencia de estado final.
- **Revisión posterior:** el transcript padre de Cursor confirma que `skill-guide` fue adjuntado completo a las 11:16. Antes de recomendar, el agente leyó `strategic-programming` y `verify-money`; solo después de la corrección del owner consultó el contrato de `deliver` y verificó el spec. Esta evidencia amplía el reporte original.

Destino del reporte: raíz de este worktree (`logperch`), por instrucción explícita del owner (la skill `retro` por defecto usa un directorio temporal).

## Objetivo, resultado y giros materiales

**Resultado:** Pass de producto + `pnpm verify` verde + PR #30 + ADR-0005; spec de implementación retirado; diseño/prototipos desechables borrados.

**Giros que cambiaron costo o dirección:**

1. **Diseño — grilling + research + ADR-0004 como ancla.** El issue era implementación bajo un modelo de producto ya aceptado; research YNAB orientó, no reabrió el ADR.
2. **Q10 pasó de preguntas a prototipos.** El owner pidió comparación visual; tres direcciones + juez Pass; luego híbrido iterado en tab Orca (`:5200`) hasta aceptación (sin label Unit, filtro de participación, vacío filtrado, quitar body “Does not feed…”).
3. **Arena de arquitectura (A/B + juicio + agree).** Base A (participación en create/edit, pools compartidos) + injertos B (refresh-only, archive clarity, flip no vacío, replay matrix). El primer handoff de `skill-guide` recomendó `strategic-programming` + `verify-money`. Tras la corrección del owner a `/deliver`, el agente detectó que el spec era un work map “Ready for implementation session”, sin los requisitos de entrega. Una instrucción posterior del owner llevó al spec Accepted con 4 slices.
4. **Slice 1 — primer handoff “blocked” por CRAP/cobertura.** Implementación enfocada verde, pero `edit` exigía `participation` y callers MCP/UI no lo enviaban; además el repo no tiene CRAP “changed-code”, solo cobertura completa → `verify:crap`. Orchestrator autorizó pass-through mecánico + schema MCP mínimo; luego verde.
5. **Slices 2–3** relativamente limpios; Finisher de lista reparó truncado móvil.
6. **Slice 4** con fricción de entorno (límites de modelo → cambio a Grok; híbrido en puerto ocupado; `wait` exact del tooltip en driver; Finisher añadió `focus(role,name)`).
7. **Cierre:** product validation Pass; `pnpm verify` falló primero por formato Biome del prototipo no rastreado; formateo local y verify verde; limpieza desechable + ADR-0005.

## Comportamiento a preservar

- Separar **ADR de producto** (0004) de **ADR de forma de API/ownership** (0005) solo cuando el brief temporal lo marca como riesgo al retirarse.
- **Prototype → híbrido runnable + markdown selected** antes de architect/deliver; validar UI con el owner en runtime, no solo capturas.
- **Deliver secuencial** (Implementer → Finisher → un commit por slice) y Product Validator read-only al final.
- Spec de implementación **Accepted** con slices, journey y retiro explícito; handoff listo para sesión nueva.
- No importar `prototypes/` a producción (ADR-0003 / convención del proyecto).

## Evaluación compacta de skills

| Skill | ¿Cargada? | Instrucción relevante | Conducta observada | Diagnóstico |
| --- | --- | --- | --- | --- |
| `grilling` | Sí (diseño) | Rondas de preguntas | Owner respondió Q1–Q12; Q10 desviada a prototipos | Cumplida; el desvío a prototype fue instrucción del owner, no fallo de la skill |
| `research` | Sí | Fuentes primarias | Informe YNAB usado como grounding | Cumplida |
| `prototype` | Sí | Direcciones paralelas + juez | Tres prototipos, Pass, híbrido iterado en Orca | Cumplida; fricción de **cómo mostrar** (tabs Orca) fue de orquestación, no del brief |
| `architect` / arena | Sí | Candidatos + juicio | A/B + agree-ready → brief Accepted | Cumplida |
| `skill-guide` | Sí, adjuntada completa en Cursor | Descubrir candidatos y recomendar el siguiente paso | Leyó `strategic-programming` y `verify-money`; recomendó ambos sin contrastar `deliver` ni verificar sus prerrequisitos | Fallo de selección y preparación del handoff; corregido por el owner — ver candidato 0 |
| `implementation-spec` | No demostrada en la secuencia examinada | Slices verticales; CRAP en código nuevo/modificado si el proyecto lo define | Se creó un work map y luego se convirtió en spec Accepted; pidió “changed-code CRAP ≤ 8 when configured” | Crear el documento no demuestra haber seguido la skill; además Money no configura ese modo — ver candidato 1 |
| `deliver` | Sí | Un slice; no avanzar con handoff rojo; gates por pase | Orchestrator reanudó Slice 1 tras bloqueo; no paralelizó slices | Cumplida; el costo vino del criterio CRAP mal alineado con Money y del límite de callers entre slices |
| `strategic-programming` | Referenciada en pases | Política en un seam | Pools/totals en dominio; adapters finos | Cumplida donde se aplicó |
| `product-validation` | Sí (cierre) | Journey real; Pass/Fail/Inconclusive | Pass con UI+MCP en instancia aislada | Cumplida |
| `adr` | Sí (cierre) | Solo rationale durable | ADR-0005 creado; desechables borrados | Cumplida; no duplicó 0004 |
| `retro` | Esta invocación | Reporte sin cambiar workflow | Este archivo | N/A |

## Candidatos de mejora (por impacto)

### 0. Verificar candidatos y prerrequisitos antes de recomendar un handoff

- **Evidencia:** a las 11:16 el owner pidió un prompt para una sesión nueva con `/skill-guide`. El agente leyó `strategic-programming` y `verify-money`, recomendó esos skills y dio por listo el diseño para implementar. A las 11:17 el owner indicó `/deliver`; recién entonces el agente comprobó que faltaban slices y estado Accepted en el spec.
- **Impacto:** el owner tuvo que conocer y corregir el workflow que la guía debía ayudar a elegir.
- **Destino:** `skill-guide`: comprobar cobertura de skills manuales, comparar contratos de candidatos por el resultado que gestionan y verificar los artefactos requeridos antes de declarar listo el prompt. Adaptar la invocación al harness.
- **Límite de la conclusión:** Cursor recibió la guía completa y podía leer skills en `~/.claude/skills`; el transcript no demuestra qué catálogo automático tenía disponible. No atribuir el fallo a una incompatibilidad de Cursor.
- **Confianza:** alta para la selección incorrecta y la verificación tardía; indeterminada para un posible problema de descubrimiento del harness.

### 1. Alinear “CRAP por slice” con lo que el proyecto realmente ejecuta

- **Evidencia:** handoff Slice 1 “blocked only on CRAP evidence”; `scripts/crap.mjs` exige manifest de cobertura completa; Money no expone CRAP changed-code. `deliver/references/passes.md` habla de “changed-code CRAP … when configured”; `implementation-spec` pide CRAP ≤ 8 en código nuevo/modificado **si el proyecto define la herramienta**. El spec escrito usó la frase de deliver sin que Money configure ese modo.
- **Impacto:** un ciclo extra de Implementer + confusión de autoridad (¿arreglar callers de slices posteriores?).
- **Destino:** `implementation-spec` (Validation) y `deliver` (passes): registrar comando, alcance, prerrequisitos de cobertura y momento de ejecución real. Si solo existe CRAP full-project, decidir su ejecución por slice o integración según los requisitos del proyecto; no deducir un modo changed-code ni posponer un gate obligatorio automáticamente.
- **Cambio mínimo:** distinguir un chequeo changed-code inexistente de un gate global requerido; no inventar tooling ni alimentar el gate global con cobertura parcial.
- **Confianza:** alta. **Recurrencia:** alta en repos con solo `verify:crap` global. **Riesgo:** bajo si solo aclara; alto si se inventa un CRAP parcial sin tooling.

### 2. Enabling slices que cambian contratos de escritura deben incluir pass-through de callers

- **Evidencia:** `editAccountSchema` pasó a exigir `participation`; `EditAccountCommand`/diálogos/MCP omitían el campo → fallos de browser/MCP; arreglo mecánico (enviar valor actual) sin UI de Slice 4.
- **Impacto:** suite rota entre slices; handoff falso “blocked”.
- **Destino:** `implementation-spec` (Keep each slice vertical) — ya dice poner setup/schema/callers en el slice que los necesita; reforzar con ejemplo: “required field en edit ⇒ actualizar callers existentes en el mismo slice”.
- **Cambio mínimo:** oración en enabling-slice / shared constraints, no un protocolo nuevo.
- **Confianza:** alta. **Recurrencia:** media-alta en cambios de schema OCC. **Riesgo:** bajo.

### 3. Entorno: shim `mise`/`pnpm` en spawns anidados

- **Evidencia:** `mise ERROR No version is set for shim: pnpm` en migrations/driver bajo Vitest; workaround repetido `PATH=…/mise/installs/node/26.8.1/bin:$PATH`.
- **Impacto:** falsos rojos de migración/driver; tiempo de diagnóstico.
- **Destino:** instrucciones del proyecto Money (`AGENTS.md` o scripts de verify), no una skill genérica — salvo nota en deliver “report missing tooling / env”.
- **Cambio mínimo:** documentar PATH o hacer que `migrations-check` invoque el binario resuelto.
- **Confianza:** alta (reproducido). **Recurrencia:** alta en esta máquina. **Riesgo:** bajo.

### 4. Driver / Feature Map: tooltips no son `wait` de texto exacto sin foco

- **Evidencia:** Slice 4 falló `wait` del copy del tooltip (`exact: true`); Finisher añadió `focus(role,name)` y actualizó recetas.
- **Impacto:** validación UI incompleta o reparaciones de harness mid-slice.
- **Destino:** skill/proyecto `verify-money` / `app-driver` (Money), no `product-validation` genérica.
- **Cambio mínimo:** documentar focus antes de assert de tooltip; o `wait` no exact para contenido de portal.
- **Confianza:** alta. **Recurrencia:** media (cualquier tooltip Radix). **Riesgo:** bajo.

### 5. Prototipos no rastreados vs `biome check .`

- **Evidencia:** `pnpm verify` falló solo por formato en `prototypes/.../main.tsx` tras entrega; prototipos eran desechables.
- **Impacto:** cierre técnico bloqueado por artefacto temporal.
- **Destino:** convención Money (`biome.json` ignore `prototypes/**`) o `prototype` skill (“mantener fuera del include de formatter del repo host” / formatear al generar).
- **Cambio mínimo:** `!!prototypes` en Biome o no dejar prototipos dentro del árbol chequeado.
- **Confianza:** alta. **Recurrencia:** cada vez que prototype vive bajo el repo. **Riesgo:** bajo.

### 6. Lanzamiento del híbrido en puerto fijo `:5200`

- **Evidencia:** múltiples shells “Launch hybrid…” exit 1 durante slices UI (puerto ocupado / proceso previo).
- **Impacto:** ruido y reintentos; a veces se reutilizó el servidor ya arriba.
- **Destino:** `prototype` o passes UI de `deliver` — “detectar servidor existente / puerto libre”.
- **Cambio mínimo:** instrucción de reutilizar URL viva antes de relanzar.
- **Confianza:** media (causa inferida: conflicto de puerto; no siempre log completo). **Recurrencia:** media. **Riesgo:** bajo.

## Cambios rechazados / no recomendados

- **No** añadir un ledger de progreso ni segundo sistema de ejecución en deliver (la corrida ya cumplió el límite y terminó bien).
- **No** un ADR por la dirección visual híbrida: quedó en UI + Feature Map; el brief lo marcó fuera de ADR.
- **No** “arreglar” límites de uso de modelos vía skill: fue restricción de plataforma, no de instrucción.
- **No** duplicar en skills la semántica Assignable vs Ready to Assign: ya está en ADR-0004/0005 y naming del producto.

## Preguntas abiertas (para decisión posterior)

- ¿Money debería implementar CRAP changed-code real, o las skills deben tratar full-suite CRAP como solo gate de integración?
- ¿Los prototipos deben vivir fuera del árbol del producto (worktree desechable) para no tocar Biome?
- ¿El fallback de modelo ante usage limit debe ser política de orquestación documentada?

## Resumen ejecutivo

La corrida completa (grill → prototype → architect → spec → deliver → PR → ADR) produjo el outcome correcto. La revisión posterior identificó un fallo de `skill-guide`: seleccionó un estándar de programación sin contrastar el workflow de entrega y verificó sus prerrequisitos solo después de la corrección del owner. Durante la implementación, la desalineación CRAP “changed-code” vs tooling Money y un enabling slice que no actualizó callers causaron fricción adicional. Entorno (`mise`/`pnpm`, puerto del híbrido, Biome sobre prototipos, driver de tooltips) concentró otros costos operativos.
