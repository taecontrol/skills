# Import On Visibility

Visibility-based lazy loading using Intersection Observer.

## Use when

- Use this for components that aren't visible on the initial page (e.g., below-the-fold content)
- This is helpful for lazy loading images, widgets, or heavy components as the user scrolls

## Avoid when

- For above-the-fold content that must render immediately — deferring it causes visible layout shifts and slow LCP
- When the component is lightweight enough that lazy loading adds more overhead than it saves
- When the content is critical for SEO and needs to be present in the initial HTML

## Apply

- Use the `IntersectionObserver` API to detect when components enter the viewport
- Prefer the platform `IntersectionObserver` API or the selected framework's maintained visibility-loading primitive
- Provide a loading fallback component while the module is being loaded

## Source

Adapted from [Patterns.dev `import-on-visibility`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/import-on-visibility/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
