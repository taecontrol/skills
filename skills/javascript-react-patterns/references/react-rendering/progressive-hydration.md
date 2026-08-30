# Progressive Hydration

Progressive hydration for prioritized client-side interactivity.

## Use when

- Use this when your SSR application has non-critical sections that don't need immediate interactivity
- This is helpful for reducing the JavaScript required to make the page interactive on initial load

## Avoid when

- When the entire page is interactive and all components need immediate hydration
- When the complexity of managing hydration boundaries outweighs the performance benefit
- For small pages where the total JavaScript is already minimal and hydration is fast

## Apply

- Wrap non-critical components in `<Suspense>` boundaries with appropriate fallbacks
- Use `React.lazy()` with code-splitting to defer loading of below-the-fold or rarely-used components
- Use the selected framework's streaming and selective-hydration support to prioritize user-interacted regions
- Treat client-only rendering as a separate fallback for browser-dependent widgets, not as progressive hydration

## Source

Adapted from [Patterns.dev `progressive-hydration`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/progressive-hydration/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
