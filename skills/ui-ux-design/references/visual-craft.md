# Visual craft

Use this reference to create or review hierarchy, layout, typography, color, density, depth, imagery, and motion. Refactoring UI is a strong tactical foundation for developers, but these rules are independently phrased and combined with broader design-system and accessibility guidance.

## Ground the direction

Start from the product's world: its users, objects, materials, vocabulary, data, pace, and emotional stakes. Translate those into a concrete visual personality. `Clean`, `modern`, `premium`, and `intuitive` are not directions because they do not constrain a choice.

For greenfield work, define:

- one layout and hierarchy concept;
- typography roles and personality;
- semantic color and surface logic;
- density and spacing logic;
- icon, imagery, and motion treatment;
- one memorable element that expresses the product, if appropriate;
- three high-frequency defaults likely to appear and a product-specific replacement for each, when the exercise would expose an ungrounded new direction.

For a quiet, conventional, or task-dense product, `none justified` is a valid result for either item. Do not manufacture ornament or performative design prose to satisfy the checklist.

For a consequential unresolved direction, use the reference, variant, and comparative-critique method in [`art-direction.md`](art-direction.md). Do not reroll random full designs until one looks attractive.

## Hierarchy

Rank content and actions before styling:

- **Primary:** the title, key decision, key data, or next action.
- **Secondary:** context, filters, supporting explanation, and frequent alternatives.
- **Tertiary:** metadata, timestamps, labels, and low-frequency options.

Coordinate placement, size, weight, contrast, and space. Do not apply every emphasis signal to every important element. De-emphasis is as important as emphasis, but tertiary content must remain legible.

Use structure to carry meaning. A card, divider, number, eyebrow, badge, or color block earns its place only when it clarifies grouping, sequence, state, or action.

## Spacing, layout, and density

- Reuse the existing spacing scale. If none exists, introduce a small, named scale rather than component-by-component values.
- Use less space within a meaningful group and more space between groups.
- Align persistent edges and repeated elements to shared columns or grid lines.
- Make line length, control width, and pane width follow content rather than filling every available pixel.
- Choose density from frequency, expertise, information volume, and window size. A trading or operations surface may be compact; onboarding or deliberative work needs more breathing room.
- Solve dense interfaces with grouping, scanning order, progressive disclosure, and fit-for-purpose tables or lists—not a uniform grid of cards.
- Wide screens should reveal, reflow, constrain, or add useful panes. Do not stretch narrow controls and paragraphs across empty space.

## Typography

- Reuse the product's typeface before adding another.
- Define semantic roles: display or page title, section heading, body, supporting body, label, data or metric, and code where applicable.
- Use one family by default. Add a second only when brand or editorial contrast has a clear role.
- Keep role-to-treatment mapping stable across the interface.
- Optimize long text for actual font metrics, line length, and line height. Approximately 45–90 characters per line and 1.2–1.5 line height are non-normative starting ranges for running text, not universal control rules. Validate the result against user text scaling, localization, WCAG text-spacing overrides on web, and native platform text styles, which take precedence.
- Default to left alignment for substantial web text. Center only short content whose composition genuinely calls for it.
- Avoid casual letter spacing on lowercase body text. Use tracking deliberately for display or uppercase text.
- Use tabular numerals where changing numeric width harms scanning.
- Verify text scaling, localization, and long values. Do not make the hierarchy depend on clipping or single-line English copy.

## Color and state

Build semantic roles before exact values:

- canvas, raised, inset, and selected surfaces;
- primary, secondary, muted, and inverse content;
- subtle, strong, and focus boundaries;
- primary, secondary, and destructive actions;
- success, warning, danger, and information feedback.

Use a deliberately limited scale. Do not create nearly identical colors through ad hoc lightening or opacity. Most product UI can remain neutral while brand and state colors direct attention.

Keep one meaning per semantic color within a context. Pair state color with text, iconography, shape, or another non-color signal. Verify every theme and interaction state; low contrast is not a valid de-emphasis strategy.

## Depth, borders, radius, and surfaces

Choose one coherent separation model:

- whitespace and grouping;
- subtle surface contrast;
- purposeful borders;
- restrained elevation.

Dense tables and input controls may need boundaries. Editorial or spacious layouts may rely mostly on alignment and space. Do not combine borders, strong shadows, gradients, and nested surfaces simply to make containers visible.

Use a bounded radius and elevation vocabulary. Mixed radii or dramatic shadows without semantic purpose make a UI look assembled from unrelated templates.

## Icons, imagery, and motion

- Use the product's icon library and one stroke/fill language. Do not use emoji as interface icons unless emoji is the accepted product language.
- Label unfamiliar or consequential icon-only actions; always provide an accessible name.
- Use real, licensed, or original imagery with an intentional crop and role. Placeholder imagery hides layout and content problems.
- Motion should explain entry, exit, causality, spatial continuity, progress, or feedback. One orchestrated moment is stronger than many unrelated effects.
- Keep a fully understandable reduced-motion path. Do not rely on motion as the only state change.

## AI-default suspicion signals

These are review prompts, not bans:

- purple or indigo gradients without brand evidence;
- glass panels, mesh backgrounds, and decorative glow as default polish;
- every section in a rounded card;
- identical spacious padding at every level;
- a hero with generic claim, supporting statistic cards, and no product-specific thesis;
- centered layouts for task-heavy product screens;
- oversized metric cards instead of a useful comparison or table;
- multiple accent colors, mixed icon styles, mixed radii, or heavy shadows;
- fake data and short placeholder text that avoid real edge cases;
- cream-and-serif editorial styling, acid-on-black styling, or broadsheet grids used because they are current AI defaults rather than product choices.

For each signal, ask: what accepted product, platform, content, or brand decision justifies it? Keep it when the answer is specific and the execution supports the task.

## Visual critique pass

1. **Squint test:** is attention ordered correctly without reading details?
2. **Grouping test:** do spacing and alignment make relationships obvious?
3. **Swap test:** could the typography, palette, layout, or signature be exchanged with a generic template without loss? If yes, the direction may be ungrounded.
4. **Density test:** can an expert scan quickly while a new user still finds the next action?
5. **Token test:** do one-off values indicate a missing rule or accidental inconsistency?
6. **State test:** do focus, selected, disabled, loading, empty, error, and success states belong to the same visual system?
7. **Restraint test:** remove decoration that does not clarify meaning, brand, or interaction.

Completion criterion: the visual system is coherent, product-specific, accessible, and stable across realistic content, states, and target sizes—not merely attractive in one screenshot.
