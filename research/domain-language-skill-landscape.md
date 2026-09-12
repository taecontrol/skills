# Panorama para un posible `domain-language`

## Pregunta, alcance y corte

**Pregunta.** ¿Qué contratos públicos vigentes de Matt Pocock tratan lenguaje ubicuo, términos de dominio, límites conceptuales e invariantes; qué ideas proceden de las obras que se citan; y qué contrato mínimo debería informar a un `domain-language` independiente de Taecontrol, sin invadir `architect` ni `adr`?

**Corte y alcance.** 2026-09-12. Se verificó que `main` de `mattpocock/skills` apuntaba a `3cca18b368ae95cdbdebbff572ccafa662551015`; allí hay 37 `SKILL.md`. Se inspeccionaron directamente los contratos y referencias relevantes de ese árbol, no sólo los dos informes previos. Para Taecontrol hay dos estados que no se deben confundir: el `main` público era `2cf931ce75cd3feb91228106115ff9ef180c328f`, mientras que este workspace está en `21b07fff8eb890c4a4bbef52f947ed3a9ec464c0`; este último no es ancestro del `main` público. Por eso las conclusiones sobre el `architect` *in-progress* se citan al archivo local y no se presentan como una fuente GitHub pública.

## Respuesta directa

Sí: **`domain-language` es un nombre y una capacidad separados adecuados**. Debe descubrir y conservar, dentro de un contexto semántico explícito, qué significan los términos de dominio, sus distinciones, relaciones, exclusiones e invariantes observables. No es un glosario pasivo ni modelado DDD completo; tampoco decide módulos, interfaces, propietarios técnicos ni rationale histórico.

La división práctica es:

| Pregunta que resuelve | Propietario | Entrega al siguiente paso |
| --- | --- | --- |
| ¿Qué significa el concepto; qué incluye/excluye; qué debe y no debe ocurrir? | `domain-language` | significado aceptado, escenarios y contradicciones explícitas |
| ¿Quién lo hace cumplir técnicamente; qué frontera, interfaz y flujo lo ocultan? | `architect` | forma técnica aceptable y obligaciones de implementación |
| ¿Por qué se escogió una dirección consecuente que no se entendería después de implementar? | `adr` | rationale histórico mínimo |

Es una frontera recomendada para Taecontrol, no una taxonomía que se pueda atribuir literalmente a Evans. El `architect` del workspace ya requiere significado aceptado antes de comparar alternativas y ubica la responsabilidad técnica de cada invariante; `adr` excluye expresamente la explicación de dominio de lo que debe ser un ADR. [Architect local](../skills/in-progress/architect/SKILL.md), [entregable local](../skills/in-progress/architect/references/deliverable.md), [ADR público fijado](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/adr/SKILL.md).

## Hallazgos: contratos de Matt

### Núcleo, drivers y consumidores

| Clase | Contratos | Veredicto |
| --- | --- | --- |
| **Núcleo** | `domain-modeling`, `CONTEXT-FORMAT.md`, `CONTEXT-MAP.md`/formato | Es el único contrato que cambia activamente el significado: detecta colisiones y vaguedad, prueba relaciones con escenarios, contrasta con código y persiste el término que considera resuelto. El formato fija término canónico, sinónimos evitados y una definición breve; también mezcla ADRs. |
| **Driver de conversación** | `grilling`; compuesto `grill-with-docs` | `grilling` preserva la autoridad de decisión del usuario y no posee la semántica. `grill-with-docs` simplemente carga ambos skills: es composición, no un segundo modelo de dominio. |
| **Drivers de flujo** | `wayfinder`, `triage`, `improve-codebase-architecture` | Invocan la conversación y el núcleo al aclarar solicitudes/decisiones. Son dueños de mapa, tickets, triage o propuesta de arquitectura, no de las definiciones. `improve-codebase-architecture` es el caso riesgoso: pide añadir al glosario un nombre surgido de un módulo técnico. |
| **Configuración/routing** | `setup-matt-pocock-skills`, `domain.md`, `ask-matt` | Fijan rutas y consumo; `ask-matt` distingue vocabulario del dominio del vocabulario de forma del módulo. La heurística “monorepo → ofrecer varios contextos” es configuración, no evidencia de un límite conceptual. |
| **Consumidores** | `diagnosing-bugs`, `tdd`, `to-spec`, `to-tickets`, `prototype/LOGIC.md`, `wait-what`, `codebase-design` y `DESIGN-IT-TWICE` | Leen o propagan las palabras, o usan escenarios para ejercer una hipótesis; no deben canonizar significado. `codebase-design` consume tanto lenguaje de dominio como su vocabulario técnico de seams/interfaces. |

La clasificación se apoya en las instrucciones directas, no en sus nombres: `domain-modeling` se declara disciplina **activa**, mientras que leer `CONTEXT.md` es una costumbre que cualquier skill puede hacer; `grill-with-docs` sólo carga `grilling` y `domain-modeling`; y el README clasifica `domain-modeling` como *model-invoked*. [Núcleo de Matt fijado](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/domain-modeling/SKILL.md), [composición](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/grill-with-docs/SKILL.md), [taxonomía de invocación](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/README.md).

Los drivers no corroboran independientemente las reglas del núcleo: los dos investigadores y los contratos de flujo remiten al mismo `domain-modeling` del mismo commit. Sí corroboran otra cosa: que Matt lo concibe como una disciplina reutilizable bajo varios flujos. La propuesta técnica que aparece durante `improve-codebase-architecture` debe abrir una pregunta semántica, no convertirse por sí sola en verdad canónica. [Wayfinder](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/wayfinder/SKILL.md), [triage](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/triage/SKILL.md), [arquitectura de Matt](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/improve-codebase-architecture/SKILL.md).

### Qué está realmente respaldado por los autores

**Evans / DDD.** El respaldo transferible es: usar un lenguaje compartido con practicantes del dominio y del software; ejercitarlo sobre elementos e interacciones del modelo; limitar el significado a un *bounded context* explícito; y expresar reglas que deben sostenerse como postcondiciones/invariantes. Evans también asocia contornos conceptuales con cohesión, pero sus patrones de agregados, clases y assertions son realización táctica, no el mandato de un artefacto semántico independiente. Su propia página explica que la referencia resume el libro de 2004 y que contiene además tres patrones posteriores: sirve para estas ideas, pero no para atribuirle cada convención operativa de Matt. [Procedencia de la referencia DDD](https://www.domainlanguage.com/ddd/reference/), [lenguaje, contexto, invariantes y contornos](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf).

**Feathers.** Un *seam* es un lugar donde se altera el comportamiento sin editar ese lugar. Eso apoya testabilidad y descomposición técnica; no delimita dónde una palabra de negocio tiene significado. Por tanto, un seam, una interfaz reemplazable o su ubicación pertenecen a diseño/arquitectura, aunque el nombre del módulo pueda usar lenguaje de dominio. [Feathers, “Seams”](https://www.informit.com/articles/article.aspx?p=359417&seqNum=2).

**Ousterhout.** Su distinción interfaz/implementación y ocultamiento de información apoya a `codebase-design`/`architect`: una interfaz incluye comportamiento, efectos y restricciones que otros módulos deben conocer, y debería ser más simple que la implementación. No concede autoridad para decidir la semántica del dominio ni prueba que un glosario sea un modelo suficiente. [Ousterhout, notas de diseño modular](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php%3Ftopic=modularDesign).

**Convenciones de Matt, no derivaciones demostradas.** `CONTEXT.md`, definiciones de una o dos frases, `_Avoid_`, escritura inline al considerar algo “resuelto”, creación perezosa, una raíz por defecto, la señal de monorepo y el umbral triple para ADR son decisiones de su contrato. `domain-modeling` no da una cita bibliográfica a Evans, y el README sólo atribuye la idea general de lenguaje ubicuo. Tampoco se comprobó una fuente primaria que funde en Evans/Feathers/Ousterhout la promesa de menos tokens o verbosidad. [Formato y contrato de Matt](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/domain-modeling/CONTEXT-FORMAT.md), [documentación que reconoce límites](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/docs/engineering/domain-modeling.md).

Los nombres de Thomas/Hunt, Fowler y otros autores aparecen en el corpus de Matt, pero no son evidencia necesaria para la frontera semántica aquí decidida. No se les atribuye regla alguna sin una fuente primaria inspeccionada; por ello no se los usa para justificar el contrato propuesto.

## Evidencia contraria y desacuerdos resueltos

1. **Glosario estrecho frente a lenguaje vivo.** Matt ordena que `CONTEXT.md` sea “glossary and nothing else” y que defina qué una cosa *es*, no lo que hace; Evans exige ejercer el modelo en conversación y sus interacciones. Ambos son compatibles si el glosario sigue siendo breve, pero no basta para conservar una invariante. **Resolución:** el artefacto mínimo de `domain-language` debe poder referenciar o incluir el escenario discriminante y el resultado prohibido de una regla material, sin convertir el glosario en una especificación completa. [Formato de Matt](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/domain-modeling/CONTEXT-FORMAT.md), [Evans](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf).

2. **Contexto semántico frente a topología del repositorio.** Matt predetermina un contexto y sólo ofrece varios ante señales de monorepo. Evans dice que las expresiones sólo significan algo en contexto y enumera diferencias de usuarios, trabajo, equipos y modelos; no equipara repo, servicio o monorepo con contexto. **Resolución:** el skill debe registrar el alcance contextual cuando sea material, pero nunca inferirlo sólo del layout. [Setup de Matt](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/setup-matt-pocock-skills/SKILL.md), [Evans](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf).

3. **Persistir “resuelto” frente a aceptación.** El núcleo de Matt escribe inline, pero, invocado solo, no identifica quién aceptó una decisión material; `grilling` sí reserva las decisiones al usuario. **Resolución:** persistir sólo significado exacto aceptado por una persona con autoridad de dominio; antes de ello devolver propuesta y pregunta, sin promoverla a canon. [Domain modeling](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/domain-modeling/SKILL.md), [grilling](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/productivity/grilling/SKILL.md).

4. **Mezcla de ADR y lenguaje.** Matt admite que una sola habilidad lleva dos artefactos y reconoce que esto choca con convenciones ADR ajenas. Taecontrol clasifica una explicación de dominio como otro tipo de documento, no ADR. **Resolución:** `domain-language` no crea ADRs; cuando queda un “por qué” consecuente que no sobrevivirá al código/documentación mantenida, recomienda `adr` y se detiene. [Límite reconocido por Matt](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/docs/engineering/domain-modeling.md), [ADR de Taecontrol fijado](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/adr/SKILL.md).

5. **Estado de Taecontrol.** El `main` público aún contiene `skills/domain-modeling` con una buena separación de evidencia, propuesta, escenarios y aceptación, pero dependiente de `Coordinator` y de una identidad de goal-map. Este workspace, en cambio, ha eliminado aquel catálogo y está desarrollando otro `architect`. **Resolución:** conservar la frontera y los escenarios del precursor público, no su acoplamiento Factory; diseñar el nuevo skill para invocación directa y composición portable. [Precursor público fijado](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/domain-modeling/SKILL.md), [estado local de architect](../skills/in-progress/architect/SKILL.md).

## Recomendaciones prácticas para el futuro contrato

### Trigger e invocación

Debe ser **model-invoked**, como la disciplina reutilizable de Matt, y también invocable directamente. El trigger debe ser estrecho: término ambiguo/sobrecargado, sinónimos incompatibles, relación/regla/exclusión cuyo significado cambia una decisión, contradicción entre conversación, documentos, tests o comportamiento observado, o bloqueo semántico comunicado por `architect`/`adr`.

No se activa por leer un glosario, por mero naming estilístico, por escoger seam/interfaz/owner, ni por una rationale ya decidida. Un consumidor puede usar una definición existente sin abrir el skill. Esta recomendación conserva el beneficio de la invocación automática sin el mantenimiento ritual que Matt reconoce como vulnerable a omisiones y a glosarios sin revisar. [Clasificación y límites de Matt](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/README.md), [documentación de límites](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/docs/engineering/domain-modeling.md).

### Autoridad, alcance y escenarios

El agente inspecciona fuentes, separa hecho observado de significado aceptado/propuesto, formula términos y escenarios, y hace visibles las contradicciones. No decide significado material: lo acepta una persona autorizada para representar el dominio. Código y tests son evidencia de comportamiento actual, no prueba automática de intención correcta.

Para cada regla material, la resolución debe precisar actor, estado inicial, acción, resultado requerido y resultado prohibido; incluir escenario normal, de borde y de fallo/acción ilegal. El contexto semántico acompaña al término si hay riesgo de que la misma palabra difiera en otro contexto. Son exigencias de salida, no una orden de crear aggregates, servicios, clases ni protocolos. Esta adaptación toma la disciplina de escenarios e invariantes del precursor de Taecontrol y la idea de contexto de Evans, manteniendo fuera la realización técnica. [Precursor Taecontrol](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/domain-modeling/SKILL.md), [Evans](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf).

### Resultado, artefacto y persistencia

La salida primaria es una **resolución semántica comprobable**, aun sin archivo: pregunta y alcance; evidencia; significado aceptado o propuestas separadas; término canónico y colisiones; inclusión/exclusión; relación o invariante; escenarios; contradicciones; preguntas abiertas; y handoff recomendado.

Primero se descubre la convención existente. Si hay una fuente canónica, se modifica sólo su parte semántica tras aceptación explícita del contenido y destino exactos. Si no la hay, se propone el artefacto y contenido mínimos, sin crear automáticamente `CONTEXT.md`, `GLOSSARY.md`, `CONTEXT-MAP.md` ni una ruta fija. Mantener una fuente canónica evita duplicar definiciones en specs, tickets, tests, prototipos y diseño; éstos deben referenciarla. El cambio de significado se conserva según esa convención; la razón histórica, sólo si califica, se enruta a `adr`. [Formato/persistencia de Matt](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/domain-modeling/SKILL.md), [ADR de Taecontrol](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/adr/SKILL.md).

### Handoffs exactos

- A `architect`: significado aceptado cuando la pregunta restante sea owner, interfaz, seam, integración, datos/control, mecanismo o dónde se garantiza técnicamente el invariante. `architect` no debe redefinirlo; el de este workspace exige resolver la ambigüedad bloqueante antes de arena. [Architect local](../skills/in-progress/architect/SKILL.md).
- A `adr`: sólo el rationale de una dirección consecuente que el test posterior a implementación no permita comprender. No enviar una definición o un escenario de dominio como si fuera decisión de arquitectura. [ADR de Taecontrol](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/adr/SKILL.md).
- A `prototype`/`spike`: si hace falta ejercer o medir una hipótesis para distinguir significados; su resultado vuelve como evidencia, no como aceptación tácita. El prototipo lógico de Matt es un buen complemento porque pone en manos del experto casos felices, de borde e ilegales. [Prototipo lógico](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/prototype/LOGIC.md).

### Lo que no se debe copiar

- **No goal mode, Coordinator ni goal-map identity.** La aceptación humana explícita y el destino exacto bastan como condición portable; el skill debe poder devolver una propuesta útil en una llamada directa.
- **No rutas ni nombres de archivo fijos.** `CONTEXT.md` es una convención de Matt, no DDD; el contexto se descubre por significado y la ubicación por la convención del repositorio.
- **No ADRs, arquitectura ni implementación.** No usar el skill para elegir aggregate/clase/módulo, ownership, interfaz, schema, evento, HTTP, tipo compartido, transacción o test seam. Tampoco canonizar un nombre nacido de una alternativa técnica.
- **No glosario de sustantivos como único resultado.** Conservar los ejemplos que discriminan relación, exclusión e invariante, pero no convertir el documento semántico en una especificación o scratchpad.
- **No afirmar causalidad sobre tokens, rendimiento de agentes o mejora universal.** La evidencia inspeccionada muestra una práctica y sus límites, no un experimento controlado.

## Límites e inferencias

La separación de tres habilidades, el nombre `domain-language`, el trigger estrecho, el formato de salida y la regla de aceptación son **inferencias normativas** de esta investigación. Están respaldadas por límites complementarios de las fuentes, no prescritas por ninguna de ellas como plantilla exacta. En especial, Evans no prescribe el archivo, Matt no demuestra que el glosario mejore a todo agente, y el `architect` local aún difiere del `main` público de Taecontrol.

Los informes A y B coincidieron en el commit de Matt, el núcleo, la mezcla con ADR y la frontera propuesta; eso elevó su cobertura de contratos, pero no su independencia causal porque comparten el mismo corpus. Se reabrieron los textos primarios para los reclamos disputados sobre DDD, seams e interfaces, y se corrigió la fijación pública de Taecontrol a `2cf931c` en vez de tratar `21b07ff` como si fuese público.

## Nota de método

Se leyó por completo `researcher-a.md` y `researcher-b.md`; se verificó `git ls-remote` de Matt y Taecontrol, se inspeccionó el árbol de Matt fijado al commit y los archivos locales/públicos de Taecontrol, y se reabrieron las fuentes primarias de Evans, Feathers y Ousterhout. Se distinguieron hechos de contrato, atribuciones de autor e inferencias de diseño. No se redactó el `SKILL.md` futuro ni se modificó ningún otro archivo.

## Fuentes centrales

1. [Matt Pocock, `skills` fijado a `3cca18b`](https://github.com/mattpocock/skills/tree/3cca18b368ae95cdbdebbff572ccafa662551015) — contratos públicos vigentes y documentación.
2. [Eric Evans, procedencia de *DDD Reference*](https://www.domainlanguage.com/ddd/reference/) y [PDF de referencia](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf) — resumen autorizado del libro de 2004 y adiciones posteriores identificadas.
3. [Michael Feathers, “Seams”](https://www.informit.com/articles/article.aspx?p=359417&seqNum=2) — definición primaria publicada por su editorial.
4. [John Ousterhout, “Modular Design”](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php%3Ftopic=modularDesign) — notas docentes del autor.
5. [Taecontrol público fijado a `2cf931c`](https://github.com/taecontrol/skills/tree/2cf931ce75cd3feb91228106115ff9ef180c328f) — precursor `domain-modeling` y `adr` público.
6. [Estado local `architect` en `21b07ff`](../skills/in-progress/architect/SKILL.md) — contrato in-progress del workspace; no se declara fuente pública.
