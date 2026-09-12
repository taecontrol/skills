# Diagnosing bugs skill landscape

## Pregunta y alcance

¿Qué debería conservar y cambiar una nueva versión de `diagnosing-bugs` para establecer causas reales sin convertirse en un protocolo pesado, activarse ante preguntas simples ni competir con `strategic-programming`, el Finisher, `how`, `why` o `product-validation`?

La revisión compara `mattpocock/skills` en `3cca18b368ae95cdbdebbff572ccafa662551015`, Superpowers en `b36e0829c6d0140e93cfef2ca599b1b07d4a7797`, pstack en `889ec4b68fa5aab0e867dad71ec3fdf386ae48f3`, wshobson/agents en `a30778f8c4e6b0a87567941b7cca4f534bf642b6` y nuestro último skill anterior al reset. Se inspeccionaron los contratos y sus excepciones; no se ejecutaron benchmarks de debugging.

## Matt: el loop rojo es el aporte central

Matt define seis fases: construir un feedback loop, reproducir y minimizar, generar hipótesis, instrumentar, corregir con regression test y limpiar. Su mejor restricción es exigir un comando ya ejecutado que alcance el bug real, produzca una señal específica, sea rápido, sea determinista o eleve la tasa de reproducción de un flake, y pueda correr sin supervisión. Sin esa señal, el agente debe pedir acceso, un artefacto capturado o autorización para instrumentar en vez de seguir teorizando. [Diagnosing Bugs de Matt](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/diagnosing-bugs/SKILL.md)

También son valiosos:

- minimizar inputs, pasos y configuración para reducir el espacio de hipótesis;
- formular predicciones falsables y cambiar una variable por vez;
- medir primero en performance regressions;
- convertir el repro en regression test sólo cuando existe una seam fiel;
- volver a ejecutar el escenario original después del fix;
- etiquetar y eliminar instrumentación temporal;
- redactar secretos antes de compartir comandos, outputs o capturas.

La versión actual ya contiene una sección explícita de redacción aunque el issue que la solicitó siga abierto y la documentación humana aún diga que no fue implementada. Esto confirma que debemos fijar la revisión y tomar el `SKILL.md` como contrato vigente, no asumir que issues o docs están sincronizados. [Issue de evidencia sensible](https://github.com/mattpocock/skills/issues/674)

## Lo que no conviene copiar de Matt

El skill aplica una disciplina pesada a cualquier reporte “broken/throwing/failing/slow”: prohíbe incluso leer para construir una teoría antes de tener un loop, exige que todo elemento restante del repro sea load-bearing, fija de tres a cinco hipótesis, muestra esa lista al humano, impone un orden de seis fases y termina corrigiendo y definiendo contenido del commit o PR.

La documentación del propio proyecto reconoce que esa activación es excesiva para preguntas y bugs simples. El autor propuso comenzar liviano y escalar sólo cuando haga falta; otros usuarios terminaron haciéndolo user-invoked para evitar que un problema sencillo dispare browser y workflow completo. [Discusión de sobre-activación](https://github.com/mattpocock/skills/issues/578)

Otro issue señala que el skill pasa de instrumentación a modificación sin una autorización humana intermedia. Para nuestro catálogo, la solución no es necesariamente otro checkpoint: separar diagnóstico de reparación respeta naturalmente la intención del usuario. Una solicitud de diagnóstico retorna evidencia; una tarea que ya autoriza reparación puede continuar después bajo `strategic-programming` y los gates del actor. [Issue sobre diagnóstico y fix](https://github.com/mattpocock/skills/issues/124)

## Superpowers: más dogma, poco valor adicional

`systematic-debugging` comparte reproducción, comparación working/broken, hipótesis falsable, cambio de una variable, causa raíz y regression test. Sin embargo, declara una “Iron Law”, se activa para cualquier problema, obliga cuatro fases, deriva a TDD y verification skills, y usa tres fixes fallidos como umbral fijo para cuestionar arquitectura. También recomienda defensa en profundidad, que puede contradecir nuestro principio de un hogar claro por política y validación concentrada en boundaries. [Superpowers systematic debugging](https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/systematic-debugging/SKILL.md)

No añade una capacidad que justifique copiar su protocolo. Su comparación working/broken, lectura completa de errores y trazado del valor defectuoso hacia su origen son buenas técnicas disponibles, no fases universales.

## pstack: mejor separación por tipo de evidencia

El playbook `bug-fix` reproduce en la superficie correspondiente, reduce hipótesis mediante binary search, exige runtime evidence para el mecanismo, verifica el fix mediante el mismo repro y evita enviar líneas motivadas sólo por “might help”. Es más compacto, pero está atado a control skills, subagentes, `how`, `why`, `architect`, TDD, commits ordenados y PRs. [pstack bug fix](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/skills/poteto-mode/playbooks/bug-fix.md)

pstack además distingue dos entradas que Matt fuerza dentro de un solo loop:

- `runtime-forensics` captura e instrumenta un proceso vivo y entrega diagnóstico sin fix. [Runtime forensics](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/skills/poteto-mode/playbooks/runtime-forensics.md)
- `trace-forensics` comienza desde un perfil, trace, heap snapshot, spindump u otro artefacto fijo; lo reduce, atribuye a source y marca como hipótesis cuando falta una captura comparativa. [Trace forensics](https://github.com/cursor/plugins/blob/889ec4b68fa5aab0e867dad71ec3fdf386ae48f3/pstack/skills/poteto-mode/playbooks/trace-forensics.md)

La distinción de evidencia es útil, pero no necesita tres skills todavía. Un `diagnosing-bugs` general puede escoger entre reproducción ejecutable, proceso vivo o artefacto capturado y exigir en todos los casos una observación capaz de distinguir el mecanismo.

## Otros catálogos: cobertura amplia no equivale a guía útil

`debugging-strategies` de wshobson reúne checklists, herramientas y ejemplos por lenguaje, desde rubber-duck debugging hasta profilers. `parallel-debugging` agrega categorías fijas de fallos, porcentajes de confianza y arbitraje multiagente. Son buenas enciclopedias de técnicas, pero diluyen el invariante que el agente suele violar: no declarar causa raíz desde una explicación plausible sin evidencia que pueda refutarla. [Debugging strategies](https://github.com/wshobson/agents/blob/a30778f8c4e6b0a87567941b7cca4f534bf642b6/plugins/developer-essentials/skills/debugging-strategies/SKILL.md) [Parallel debugging](https://github.com/wshobson/agents/blob/a30778f8c4e6b0a87567941b7cca4f534bf642b6/plugins/agent-teams/skills/parallel-debugging/SKILL.md)

No conviene importar inventarios de herramientas, seis categorías obligatorias ni precisión numérica de confianza sin calibración. Varios investigadores read-only pueden ser útiles cuando ya existe un repro y las hipótesis son genuinamente independientes, pero no deberían ser la ruta por defecto.

## Nuestro skill anterior

La última versión propia ya había reducido bien el concepto a: síntoma visible, red loop, minimización, hipótesis falsables, una predicción distinguible por vez y sólo dos resultados—`Diagnosed` o `Inconclusive`. Además era explícitamente read-only sobre production code. Su principal deuda es vocabulario del Factory anterior (`candidate`, Coordinator, Cleaner y routing) y exigir siempre un loop ejecutable, incluso cuando un artefacto capturado contiene evidencia causal suficiente. [Anterior `diagnosing-bugs`](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/diagnosing-bugs/SKILL.md)

## Diseño recomendado

Mantener el nombre `diagnosing-bugs`, pero hacerlo un skill de diagnóstico, no de reparación. Su pregunta es “¿qué mecanismo produce este síntoma y qué evidencia distingue esa causa?”. El Finisher o cualquier tarea de implementación autorizada conserva la reparación y los gates.

### Activación graduada

Usar el skill cuando el humano pide explícitamente diagnosticar/debuggear, o cuando una reparación autorizada sigue teniendo causa incierta después de una inspección directa. No activarlo para preguntas factuales, errores locales cuya causa ya está demostrada por el mensaje y el flujo, auditorías preventivas, arreglos mecánicos o cualquier test rojo que todavía no sea un problema difícil.

### Evidencia antes del veredicto

Preferir una reproducción red-capable en la superficie del síntoma y hacerla tan rápida, específica y repetible como el costo justifique. Para flakes, medir y elevar la tasa de reproducción. Pero aceptar como punto de partida un trace, perfil, core dump, HAR, log estructurado o captura equivalente cuando permite reducir y atribuir el mecanismo. No fabricar un mock de baja fidelidad sólo para cumplir el ritual del loop.

Minimizar cuando reduce materialmente el espacio de búsqueda; no exigir que cada elemento restante sea probado como load-bearing si el costo excede su valor diagnóstico.

### Hipótesis proporcionales

Generar sólo las hipótesis plausibles que la evidencia permita, sin cuota fija. Probar una predicción distinguible a la vez, buscando el split que descarte más espacio. Usar working/broken comparisons, history, bisection, instrumentation, differential execution o profiling según el síntoma. Varios agentes read-only son opcionales cuando pueden investigar hipótesis independientes sin competir por estado.

### Veredicto estrecho

`Diagnosed` requiere una observación que confirme el mecanismo y discrimine alternativas materiales. `Inconclusive` conserva intentos, evidencia, hipótesis descartadas y un unblock concreto; nunca transforma la hipótesis más convincente en causa raíz por falta de algo mejor.

Siempre redactar secretos y datos privados antes de compartir evidencia, limpiar instrumentación temporal y distinguir hechos observados de inferencias. No modificar producción, escribir el fix, abrir un ADR, crear un plan, decidir arquitectura ni hacer commits dentro del skill.

Cuando la solicitud ya autoriza reparación, el mismo agente puede terminar primero el diagnóstico y luego aplicar el flujo de implementación correspondiente; no hace falta introducir otro agente o handoff ceremonial. El repro puede convertirse en regression test sólo si representa una seam fiel.

## Relación con los skills actuales

- `how` explica el flujo; puede orientar el diagnóstico, pero no prueba la causa.
- `why` recupera forcing functions e historia; puede encontrar una regresión, pero no reproduce el síntoma.
- `product-validation` detecta y evidencia un fallo desde el producto; `diagnosing-bugs` reduce ese fallo a un mecanismo.
- `strategic-programming` guía el fix y su prueba una vez establecida la causa.
- `deliver` mantiene al Finisher como dueño de la reparación y de sus gates.
- `spike` responde una incertidumbre técnica de diseño; `diagnosing-bugs` parte de un fallo observado.

No hay competencia si `diagnosing-bugs` termina en diagnóstico y los demás conservan sus dueños.

## Veredicto

Sí vale la pena agregar `diagnosing-bugs`, pero no copiar a Matt literalmente. Su loop rojo es el principio central y su redacción actual debe conservarse. La versión nueva debería ser más graduada, diagnosis-only, aceptar artefactos fijos o runtime forensics como evidencia válida y eliminar fases, cuotas, checkpoints, commits y routing del ecosistema de origen.

## Límites de la evidencia

Los repositorios revisados describen contratos de trabajo y experiencias reportadas; no publican una comparación controlada de tiempo hasta diagnóstico, tasa de causas correctas o defectos introducidos. La preferencia por un flujo graduado es apoyada por reportes de sobre-activación y por nuestro objetivo explícito de evitar protocolo, pero su desempeño deberá evaluarse en uso real.
