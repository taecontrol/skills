<!-- Eval case file: the brief the real shaping thread received on 2026-11-01, adapted for a local run. Changes: the feature list is already agreed, so part 1 is gone; the feature names what the agent must be able to do after recording, as PR #15's problem states it; production, Cloudflare Access, the connector spike, Nook and GitHub are gone, since the run stays local; the closing ends on this branch instead of a pull request. -->

Trabajas en Despensa. Habla con el owner en español; todo el contenido del repo va en inglés.

Antes de empezar, lee `AGENTS.md`, `CODING_STANDARDS.md`, todos los ADRs de `docs/adrs/`, el README y `docs/deployment.md`. Ya hay un scaffold:
- una sola operación, `get_status`, servida por `POST /api/<name>` y como tool MCP desde un registro único (ADR-0004);
- verificación con `vp test` dentro de workerd contra una D1 local.

Todavía no existe el modelo de datos.

## Tarea: `/shape` de la primera feature, que el owner ya eligió

El owner ya acordó la lista de features y su orden. Esta es la primera; las siguientes, en orden, son ver las compras en la app, ordenar el catálogo de productos (renombrar, fusionar, agrupar en tipos como "arroz"), comparar precios en ARS y USD, la lista de compras, el ritmo de reposición y registrar una compra chica a mano en la app.

El owner lo dijo así:

> Tengo las compras del mercado que hicimos hoy y quisiera mandarle las fotos de la factura a mi agente y que él registre todo en despensa por el MCP. Este flujo va a ser por MCP porque es más rápido y menos tedioso para mí.

Eso es la primera feature: **un agente registra en Despensa, por MCP, una compra leída de las fotos de una factura.** El agente lee la foto con su propia visión y le pasa datos estructurados a Despensa. Despensa no hace OCR, salvo que el shape demuestre que hace falta. Después de registrar, el agente tiene que poder corregir una línea que leyó mal, borrar una compra registrada por error y encontrar una compra pasada en una conversación nueva.

Decisiones que este shape tiene que enfrentar. Las puertas sin retorno van por `architect`.

- **El modelo de datos**, que es la puerta sin retorno central:
  - compra, ítem, producto, tienda, fecha;
  - cantidad, unidad o peso;
  - precio unitario y total, descuentos y promociones;
  - cómo se reconoce el mismo producto entre facturas, porque las facturas argentinas abrevian los nombres;
  - que más adelante sirva para comparar precios y calcular el ritmo de reposición.
  Dimensiónalo para las features de la lista, no solo para esta.
- **La cotización para el USD** (oficial, MEP o blue), de dónde sale y cuándo se fija. Decídelo con el owner.
- **Quién hizo cada compra.** El JWT de Access ya trae el email; el owner decide si se registra.
- **Si Despensa se conecta con money**, otro proyecto del owner. Probablemente queda fuera de alcance, pero confírmalo con el owner.
- **El diseño de las tools MCP.** El `AGENTS.md` pide un conjunto chico de tools simples, con descripciones que alcancen para usarlas bien. Para la escritura:
  - el reintento después de una respuesta perdida no puede duplicar la compra, así que necesita idempotencia;
  - el agente necesita poder corregir un ítem mal leído.
- **Migraciones de D1.** Es la primera, y el deploy las aplica (`migrations/*.sql`). Tienen que mantenerse compatibles con el código del deploy anterior (ADR-0001).
- **Qué agente va a usar el owner para mandar las fotos.** Pregúntaselo.
- **Datos reales.** Pídele al owner las fotos de las facturas de hoy y úsalas como ejemplos del spec: los casos borde salen de ahí (ítems pesados, promos tipo 2x1, nombres abreviados, descuentos con tarjeta).

Verificación: los ejemplos se prueban por MCP contra el Worker y la D1 locales, siguiendo al pie de la letra la sección *Verification* del `AGENTS.md`. El owner pidió especialmente que no se escriban pruebas innecesarias.

Si la feature no entra en un PR, propón partirla en pasos que se puedan entregar por separado (ADR-0001).

## Cierre

Cuando el owner acepte el spec, entrégalo con `deliver`, cada paso después del anterior, en esta rama.
