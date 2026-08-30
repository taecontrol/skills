# Product UI art direction

Use this reference only when creating or materially changing a visual direction that is not already approved. Its job is to turn product evidence and selected references into comparable rendered directions before production implementation.

Do not use this workflow for an approved design, review-only work, or a small bounded change. Preserve the controlling language. For an implementation change, render the affected before-and-after evidence; for review-only work, inspect the exact current surface or supplied change evidence.

## 1. Establish the product position

Before selecting a look, record:

- the user, main task, use context, and product category;
- the desired character in concrete, contrasting terms;
- the required information density and scanning speed;
- the trust, sensitivity, and consequence of error;
- the platform, input modes, and window or device conditions;
- representative content, data extremes, and material states;
- the product's own objects, vocabulary, workflows, data shapes, pace, and emotional stakes.

Treat these as constraints on visual choices. A personal-finance overview, a trading workstation, a clinical intake flow, and a creative editor should not converge because they share a component library.

Completion criterion: every proposed direction can explain how its hierarchy, density, expression, and interaction posture serve this product position.

## 2. Curate references without cloning

Select two or three references only when they resolve a real uncertainty. Prefer a mix of:

- a comparable product category or trust context;
- a comparable interaction model or information-density problem;
- an applicable platform convention or established product surface.

Inspect current, relevant surfaces when possible instead of relying on reputation or memory. A marketing homepage is weak evidence for an operational product screen.

For each reference, record:

| Field | Question |
| --- | --- |
| Relevance | Which product, task, user, platform, or risk similarity makes it useful? |
| Authority | Is it an approved target, behavioral reference, inspiration, or anti-reference? |
| Typography | Which roles, contrast, rhythm, and data treatments matter? |
| Layout and density | How are hierarchy, navigation, grouping, and scanning organized? |
| Data presentation | How do tables, lists, charts, metrics, and uncertainty support decisions? |
| Surfaces and color | Which semantic roles, boundaries, depth, and emphasis patterns matter? |
| Icons and imagery | What role, style, and level of prominence do icons, illustrations, or media have? |
| Interaction language | How are actions, feedback, motion, and state changes expressed? |
| Adopt | Which principle fits this product, and why? |
| Reject | Which characteristic conflicts with this product, platform, or accepted identity? |

References provide vocabulary, not authority. Do not copy proprietary assets, product copy, distinctive compositions, exact brand palettes, type scales, radii, or trade dress. Translate an adopted characteristic through this product's own content and constraints.

`Make it like Linear` is incomplete direction. Identify the relevant characteristic—such as compact hierarchy, quiet surfaces, keyboard-first feedback, or restrained motion—then state what does not transfer. Do not inherit dark mode, purple accents, branded composition, or product-specific chrome by association.

A finance comparison might examine Wise for clarity and trust, Coinbase for institutional presentation, Revolut for consumer polish, or Linear for interaction density. These are starting hypotheses, not dependencies or universal recommendations; inspect the relevant current surface and reject mismatched characteristics.

Completion criterion: every adopted characteristic has a product reason, every rejected characteristic has a conflict reason, and the resulting expression remains original.

## 3. Define material directions

When uncertainty is consequential, propose two or three named directions. Each direction states:

- a product-specific character and design thesis;
- hierarchy and layout concept;
- typography strategy;
- semantic color and surface strategy;
- density and spacing logic;
- treatment of data, navigation, and actions;
- icon, imagery, feedback, and motion approach;
- one restrained signature element or `None justified`;
- generic defaults it rejects and their replacements.

Directions must take different positions in density, hierarchy, layout model, content emphasis, interaction posture, or visual character. Changing only accent color, radius, shadow, or typeface does not create another direction.

Name the position rather than its generation order: `Compact ledger`, `Guided overview`, or `Decision workspace`, not `Option A`, `Option B`, or `Option C`.

Do not force weak alternatives. If controlling evidence eliminates all but one direction, name the eliminated positions and why rather than creating ceremonial variants.

Completion criterion: another agent could implement each direction consistently, and a reviewer could predict meaningful visible trade-offs before seeing code.

## 4. Render a fair comparison

Render the actual interface when practical. Otherwise build a faithful throwaway mockup in the available stack. A mockup is disposable evidence, not production code or a new design system.

Hold these constant across variants:

- representative content and data;
- primary task and interaction scope;
- selected state or states;
- viewport, device, theme, and text scale, unless one is the explicit direction under comparison;
- fidelity and implementation effort.

Vary only the intended design position. Include the populated primary state and any stress state that could reverse the decision, such as long data, empty content, error recovery, or responsive transformation. Present named renders side by side when the environment permits it.

Open and inspect every render. Fix clipping, overlap, broken fonts, missing assets, implausible content, and other execution defects before comparing taste; otherwise the comparison confounds direction with implementation quality.

If faithful rendering is unavailable, complete only the design contract, state `Visual quality unverified`, and do not claim the direction looks polished or wins visually.

Completion criterion: the variants show the same product problem under comparable conditions, and every visual claim points to an inspected render.

## 5. Compare and recommend

Critique directions against each other and the brief, not against a universal taste score. For each direction state:

- what it communicates before detailed reading;
- where hierarchy and grouping work;
- where it looks generic or interchangeable;
- what is visually excessive;
- what is missing or under-emphasized;
- which user, frequency, or context it best serves;
- its main trade-off.

Choose a preferred direction and explain why its visible trade-offs best fit the product position. A hybrid is valid only when the combined rules remain coherent; do not average away the point of view.

Leave brand identity, consequential product posture, and other material choices to the authorized human. Obtain explicit acceptance before production implementation. For material work, follow the conditional independent-review contract in [`verification.md`](verification.md); do not relabel self-review as independent evidence.

Completion criterion: the recommendation follows from comparative rendered evidence, human-owned decisions remain explicit, and visual judgment is not presented as usability, accessibility, or representative-user evidence.
