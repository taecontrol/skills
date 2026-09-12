# Product validation skill landscape

## Pregunta y alcance

¿Qué debería conservar el Factory del enfoque de verificación de pstack y de nuestros antiguos `use-case-qa` y `verification-adapter` para que `deliver` pueda obtener evidencia independiente del producto real sin introducir un feature map obligatorio, infraestructura prematura ni otro protocolo de ejecución?

La revisión está acotada a pstack en `cursor/plugins` revisión `889ec4b68fa5aab0e867dad71ec3fdf386ae48f3`, al historial disponible de ese directorio y a los skills de Taecontrol anteriores al reset. No evalúa empíricamente ningún driver ni diseña todavía el nuevo `SKILL.md`.

## Qué existe actualmente en pstack

pstack no contiene hoy un skill general llamado `product-validation`. Su enfoque está dividido en tres capacidades:

1. **Principio de prueba.** `principle-prove-it-works` exige observar el artefacto real en lugar de confiar en compilación, proxies o el reporte del agente que escribió el cambio. Para código, pide ejecutar el feature y comprobar el flujo completo; para delegación, inspeccionar el artefacto y no el resumen. [Prove It Works](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/skills/principle-prove-it-works/SKILL.md)
2. **Driver específico del proyecto.** `create-verification-skill` inspecciona el repositorio y genera `.cursor/skills/verify-<app>/` con instrucciones concretas de launch, doctor, drive, evidence y cleanup. Prefiere harnesses existentes y sólo después browser/CDP, PTY o HTTP. Debe ejecutar una receta real antes de declarar listo el skill generado. [Create Verification Skill](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/skills/create-verification-skill/SKILL.md)
3. **Mantenimiento del driver.** `maintain-verification-skill` compara el feature map contra código y luego conduce todos los features en una sesión real. Sólo modifica la infraestructura de verificación; una regresión del producto se reporta en lugar de ocultarse cambiando el mapa. [Maintain Verification Skill](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/skills/maintain-verification-skill/SKILL.md)

El playbook de shipping sí aporta la independencia que nos interesa: asigna un agente nuevo a cada PR, exige que ejercite la superficie real y rechaza CI verde como sustituto del veredicto. Su unidad y maquinaria son PRs apilados, no slices locales, pero el principio es transferible. [Shipping playbook](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/skills/poteto-mode/playbooks/shipping.md)

## Lo valioso del driver local

La idea más fuerte de `create-verification-skill` no es el formato del feature map sino convertir conocimiento operacional frágil en una capacidad repetible:

- cómo iniciar exactamente el producto y reconocer que está listo;
- cómo confirmar que se conduce la instancia, build y datos correctos;
- cómo interactuar mediante una superficie fiel al usuario;
- qué observación demuestra el resultado y qué efecto persistente debe comprobarse;
- cómo aislar y limpiar únicamente el estado creado por la validación.

El feature map de ejemplo separa correctamente las rutas de acceso del usuario, las acciones del driver, los resultados observables y los gotchas. También insiste en capturar la acción y el resultado, y en comprobar persistencia desde otra vista. [Feature map example](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/skills/create-verification-skill/references/feature-map-example/README.md)

Sin embargo, generar y mantener un mapa completo no es un requisito intrínseco de product validation. Es infraestructura durable para proyectos que necesitan conducir repetidamente muchas superficies. Para un proyecto cuyo comando, test end-to-end o procedimiento ya prueba el journey aceptado, otro skill local y varios archivos de features serían duplicación.

## Qué aprendimos del Factory anterior

La primera versión de `use-case-qa` ya tenía el núcleo correcto: ejecutar comportamiento aceptado mediante navegador, CLI, API, simulador, staging o asistencia humana; elegir el método por fidelidad, observabilidad, repetibilidad, aislamiento y seguridad; distinguir casos aceptados de exploración; y devolver `Pass`, `Fail` o `Inconclusive` con evidencia directa. [Primer `use-case-qa`](https://github.com/taecontrol/skills/blob/e3f4d446e9bd47a28f6ad10aa6732e36c0312b2a/skills/use-case-qa/SKILL.md)

Sus versiones posteriores conservaron ese núcleo, pero lo rodearon de `goal-map`, perfiles, leases, identidades de candidate, un Verifier previo obligatorio, Cleaner, Slice Owner y Goal Validation Owner. Esa información resolvía coordinación paralela y linaje formal; no es necesaria para nuestro flujo local secuencial. [Último `use-case-qa`](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/use-case-qa/SKILL.md)

`verification-adapter` intentó solucionar la falta de un driver creando un CLI, Feature Map, manifests, identidades e integridad de evidencia. Su distinción conceptual sigue siendo buena: el adapter opera y observa; el Product Validator decide si el journey pasó. Su implementación, sin embargo, creció para soportar candidatos inmutables, concurrencia, resource leases y evidencia auditable entre worktrees. [Último `verification-adapter`](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/verification-adapter/SKILL.md)

## Separación recomendada

| Capacidad | Dueño | Persistencia |
| --- | --- | --- |
| Definir el journey y su resultado observable | `implementation-spec` | Temporal durante el trabajo |
| Demostrar técnicamente código y diseño | Implementer y Finisher con `strategic-programming` | Código, tests y configuración |
| Conducir el producto | Harness existente o capacidad local del proyecto | Sólo durable cuando su reutilización lo justifica |
| Juzgar el journey aceptado | `product-validation` en contexto fresco | Evidencia de la corrida, no otro mapa de estado |
| Reparar un fallo confirmado | Finisher bajo `deliver` | Commit de reparación |

El driver no debe decidir `Pass`; sólo ejecuta acciones y devuelve observaciones. El Product Validator no debe construir o reparar el driver ni editar el producto mientras juzga. Si falta una capacidad mecánica pequeña ya autorizada, puede declararse `Inconclusive` con el gap exacto. Crear infraestructura reusable debe ser otro trabajo explícito, no una expansión lateral de la validación.

## Contrato mínimo propuesto para `product-validation`

El nuevo skill debería:

- usar un contexto fresco y tratar código, spec y producto como read-only;
- recibir del `implementation-spec` un actor, estado inicial, acción, resultado observable, resultado prohibido cuando importe, ambiente, datos, aislamiento o reset y evidencia esperada;
- identificar el commit o build real bajo prueba sin crear un sistema adicional de candidate IDs;
- usar la superficie real más estrecha que preserve las semánticas materiales: UI, CLI, API pública, dispositivo, simulador fiel o intervención humana explícita;
- ejecutar un health/doctor check cuando el proyecto lo tenga y rechazar una instancia o datos ambiguos;
- observar el resultado directo y, cuando importe, el efecto persistente desde una segunda seam fiel;
- exigir autoridad separada antes de efectos productivos, destructivos, facturables, privados o externos;
- devolver solamente `Pass`, `Fail` o `Inconclusive`, con el journey, primera divergencia, reproducción, evidencia y límites de fidelidad;
- mantener exploración y regresiones adyacentes fuera del veredicto aceptado salvo que el spec las incluya;
- nunca reparar: `deliver` transforma un `Fail` en una reparación integrada del Finisher y vuelve a ejecutar la evidencia invalidada.

No necesita goal map, ticket, candidate manifest, resource lease formal, lista completa de features, campaña exploratoria, PR ni reporte durable por defecto.

## ¿Debemos recuperar un generador de verificación?

No todavía. La necesidad es real, pero no aparece en todos los proyectos y pstack la trata como una oferta opcional cuando no existe un modo de conducir la app. [Verify and ship guide](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/docs/guide/06-verify-and-ship.md)

Primero conviene observar `product-validation` en proyectos reales. Si repetidamente termina `Inconclusive` porque falta launch, doctor, drive, evidence o cleanup, esa evidencia justificaría un skill separado —posiblemente `verification-harness`— que adapte el repositorio sin decidir aceptación. No recuperaría ahora `verification-adapter` ni copiaría el generador de pstack completo.

## Veredicto

Crear un único skill general llamado `product-validation`. El nombre describe mejor la responsabilidad que `use-case-qa` y coincide con el rol ya utilizado por `deliver`. Debe combinar el juicio independiente y read-only del antiguo Factory con el principio de pstack de probar el artefacto real.

No incorporar por ahora un feature map obligatorio ni skills de creación y mantenimiento del driver. `product-validation` debe preferir capacidad existente y declarar un gap preciso cuando no pueda obtener evidencia fiel. Esa presión permitirá decidir después, desde uso real, si `verification-harness` merece existir.

## Límites de la evidencia

pstack documenta contratos y prácticas del autor; no publica en estos archivos una comparación empírica entre su feature map y validación ad hoc. La recomendación de no portar el generador todavía es una inferencia de diseño basada en nuestro objetivo explícito de evitar protocolos y artefactos sin necesidad demostrada. El historial propio muestra evolución de contratos, no resultados comparativos entre los modelos anteriores y el flujo propuesto.
