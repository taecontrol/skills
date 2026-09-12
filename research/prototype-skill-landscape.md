# Prototype skill landscape

## Question and scope

Should Taecontrol recover `prototype` as a UI-only skill, and which constraints from comparable public skills would reliably produce meaningfully different, production-representative options rather than superficial variants?

This review is bounded to the public skill sources most directly relevant to runnable or rendered UI exploration, inspected on 2026-09-12 at the revisions linked below. It considers Matt Pocock's current `prototype`, Taecontrol's retired version, and five focused UI-design or UI-prototyping precedents. It excludes general product-discovery methods, Figma-only processes, and implementation skills whose primary outcome is production code.

## Direct answer

Recover the capability, but make it UI-only. The logic/state branch should not survive merely because it exists upstream: the user has not found it useful, its current upstream form remains a separate kind of artifact, and Taecontrol already has a clearer empirical boundary in `spike`. Keep interactive behavior inside a UI variant when it is necessary to judge that interface; do not retain a separate logic-demo mode.

The new skill should preserve Matt's strongest shape—several variants in the real product context—but strengthen it with independent authorship and two explicit gates:

1. **Independent exploration:** dispatch three designers in parallel with the same product truth, isolated workspaces, non-overlapping exploration territories, and no access to one another's implementations.
2. **Divergence gate:** have a fresh judge reject any pair that differs only in styling or minor arrangement.
3. **Fidelity gate:** have that judge verify every surviving variant in its intended runtime against real product constraints, representative content, relevant states, and the existing shell/design system where one exists. A prototype may use disposable code, but it must not look disposable.

Keep the name `prototype` if continuity is valuable, but make its discovery description explicitly UI-only. Do not add both `prototype` and `ui-prototype`; that would create the overlap the catalog is trying to remove.

## What the sources establish

### Matt Pocock

Matt's current entry point still routes between logic and UI, but the logic artifact has changed from the earlier CLI shape: it is now a self-contained HTML demo driven by buttons for a non-developer. It even isolates a pure logic module intended to be lifted later. This is a material upstream change, but it remains a separate validation mode rather than a reason Taecontrol needs the branch. [Entry point](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/prototype/SKILL.md) [logic branch](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/prototype/LOGIC.md)

The UI branch contributes the strongest reusable baseline. It prefers mounting alternatives into an existing page with its real header, sidebar, data, density, fetching, parameters, and authentication. It defaults to three variants, requires differences in layout, information hierarchy, and primary affordance, discourages shared layout abstractions, makes variants easy to switch, and keeps prototype code out of production. These choices make comparison concrete and contextual rather than a set of detached mockups. [Matt's UI branch](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/prototype/UI.md)

Its weakness is enforcement rather than intent. Saying “radically different” and naming three structural dimensions does not require the agent to state distinct hypotheses before implementation or prove afterward that the variants actually diverged. The reported failure—three near-identical options—is therefore consistent with the contract even though it violates its aspiration. This is an inference from the instructions and observed use, not a claim made by Matt.

### Focused precedents

- **x0c `ui-prototyper`** has the clearest conceptual divergence test. Each option starts from an incompatible visual proposition with a distinct visual event and spatial grammar. Its quality gate compares visual protagonist, silhouette, reading path, grouping logic, and color behavior; if removing color makes two screens equivalent, they fail. It also rejects generic results before presenting them instead of counting every generated artifact as an option. [Skill](https://github.com/x0c/ui-prototyper-skill/blob/722f8b79cb935d88ca6176979a590c15de31a0e8/SKILL.md) [quality gate](https://github.com/x0c/ui-prototyper-skill/blob/722f8b79cb935d88ca6176979a590c15de31a0e8/references/visual-quality-gate.md)
- **dnesdan `prototype-ui-with-imagegen`** freezes shared product facts and varies a named design thesis. It uses the same platform, viewport, state, framing, and product invariants for a fair comparison, while requiring each direction to differ on axes such as hierarchy, density, disclosure, spatial organization, navigation, or interaction. It issues a separate prompt per direction and rejects outputs that invent behavior, violate the shell, clip content, or cannot map to credible native components. [Skill](https://github.com/dnesdan/Skills/blob/e4766663872e1fc68b5a015af258f555df1ae1ad/prototype-ui-with-imagegen/SKILL.md) [variant guidance](https://github.com/dnesdan/Skills/blob/e4766663872e1fc68b5a015af258f555df1ae1ad/prototype-ui-with-imagegen/references/variant-prompting.md)
- **rshankras `ui-prototyping`** treats divergence as a difference in organizing metaphor rather than paint. More importantly for fidelity, its second pass adds plausible, messy, domain-specific data plus empty, unbounded-growth, and long-input states. It compiles and runs the alternatives instead of judging dead mockups. Its prescribed six-to-ten options and Apple-specific planning dependencies are too heavy and too coupled for Taecontrol. [UI prototyping skill](https://github.com/rshankras/claude-code-apple-skills/blob/9ffb83138209057875698dd11c1720c657c47a92/skills/design/ui-prototyping/SKILL.md)
- **0furkancolak `frontend-ui-prototype`** treats an existing product as product truth, extracts its actual routes, terminology, assets, workflow, tokens, density, and supported claims, and requires desktop/mobile rendering. It also separates existing-app, new-concept, landing-page, and reference-led situations. Its mandatory `DESIGN.md`, `Makefile`, web research, fixed file shape, and extensive gates would turn a small general skill into a protocol. [Frontend UI Prototype](https://github.com/0furkancolak/frontend-ui-prototype/blob/385f1b09bcb8f449c17849b91faa18dbc76bbd9a/SKILL.md)
- **Anthropic `frontend-design`** is not a prototyping workflow, but it reinforces one useful quality principle: distinctive choices should come from the actual subject, audience, content, and visual vernacular rather than generic “modern UI” defaults. Its aesthetic guidance is useful as a quality lens, not as another phase or dependency. [Frontend Design](https://github.com/anthropics/skills/blob/34040c9c568585f6929bedeaad110ad08f079624/skills/frontend-design/SKILL.md)

Taecontrol's retired `prototype` correctly required a bounded question, representative actions and edge states, rendered inspection, captured evidence, disposable disposition, and separation from production. Its weaknesses are the same broad logic/UI scope and the Factory-specific `Coordinator`, goal-map, and production-slice language already removed from `spike`. [Retired prototype](https://github.com/taecontrol/skills/blob/d8c53df75c4de46720e8701b11de6e7fdcf9b142/skills/prototype/SKILL.md)

## Recommended contract

### Scope and boundary

- Answer one visual or interaction-design question for one screen, component, or short coherent flow.
- Use `prototype` to compare UI directions before committing to one. It does not validate technical feasibility, reconstruct rationale, or produce production implementation.
- Permit enough interaction to judge the UI. Exclude a separate logic/state-model artifact and any required CLI or logic-demo format.
- Treat the prototype as disposable. Selection of a direction is a design decision, not automatic promotion of its code.

### Shared truth before divergence

Inspect the existing product, repository, rendered baseline, design system, platform conventions, terminology, real data shape, and relevant UI states before designing. Fix a compact shared brief containing:

- the user, product moment, primary task, and decisive action;
- exact content and capabilities that every option must preserve;
- the shell, components, tokens, platform behavior, and scope boundaries;
- the viewport or device and representative populated, empty, loading, error, long-content, or responsive states that matter to the question.

For a new product without an existing visual system, ground this truth in the product brief and a small number of relevant references. References should inform deliberate choices, not turn the result into a clone.

### Real alternatives

Default to three fresh designer agents and cap the portfolio at five. Prefer different model families when available. Give every designer the same neutral brief but an isolated workspace and a non-overlapping exploration territory. The designers work concurrently without seeing one another's implementations. Each names its own thesis, which must differ from the others in organizing structure or interaction model and at least one additional material axis: information hierarchy, primary affordance, density, disclosure, navigation, reading path, or spatial composition.

Keep product facts, content, state, viewport, and evaluation conditions identical across directions. Shared product shell and primitives are appropriate; a shared layout that predetermines the answer is not. Build each direction from its own thesis rather than creating one option and restyling it twice.

After all candidates finish, give the complete set, shared brief, baseline, and rendered evidence to a fresh judge that authored none of them. The judge compares every pair and checks fidelity to the shared truth. Color, typography, radius, shadow, illustration, or copy alone do not establish a new direction. If two alternatives would still feel like the same design in grayscale or as rough silhouettes, the weaker one fails. Its original designer may rebuild it once without seeing the other implementations, after which the judge rechecks it. Never include filler merely to reach the requested count; if fewer than two candidates pass, return an incomplete run instead of presenting a false comparison.

### Production-representative fidelity

“Disposable” describes lifecycle, not visual quality. Every presented option should:

- run and render in the intended product environment when available;
- preserve the real surrounding shell, component library, terminology, data shape, density, and platform behavior unless one of those is explicitly under exploration;
- use plausible, domain-specific, non-idealized content rather than lorem ipsum or uniformly convenient fixtures;
- include the relevant interactions and difficult states needed to judge the question;
- be responsive or adaptive at the target sizes;
- avoid invented features, controls, metrics, customers, or claims;
- be inspected as rendered output at useful full-size and compact views, with visible defects corrected before presentation.

The skill should not mandate HTML, image generation, one framework, a fixed directory, a query-parameter switcher, or external design research. Use the host project's runtime and conventions by default; use the lightest standalone artifact that still provides representative evidence when no host exists. A switcher is valuable when several runnable options share one host, but it is an implementation choice rather than the skill's purpose.

### Selection and handoff

Present every judge-approved direction with its thesis, material tradeoffs, rendered evidence, and known limitations. The judge verifies compliance and explains differences; it does not select the aesthetic winner. Let the human choose a direction, request an explicit hybrid, or reject the set. Record the chosen principles and unresolved questions briefly, then delete or isolate the prototype according to its declared disposition. Production work may implement the accepted direction, but prototype code carries no production-readiness claim.

## Decision

Use the name `prototype` with an explicitly UI-only discovery description. The first version should be a compact, self-contained `prototype/SKILL.md`: three isolated designer agents by default, preferably from different model families; one fresh compliance judge; at most one rebuild per failed candidate; and final selection reserved to the human. Do not create a parallel `ui-prototype`, copy any source wholesale, or depend on another skill.

## Sources and limits

All source links above are pinned to the inspected revisions. Public skills are design precedents, not empirical proof that a particular prompt always yields strong alternatives. The recommended gates combine their checkable mechanisms with the user's observed failure mode; they still require evaluation through real use after the first version is created.
