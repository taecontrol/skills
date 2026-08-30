# Dynamic Import

Dynamic import() for on-demand code loading.

## Use when

- Use this when certain modules are only needed based on user interaction or conditions
- This is helpful when you want to reduce the initial bundle size for faster page loads
- Use this when components like modals, pickers, or heavy libraries aren't needed on initial render

## Apply

- Use `React.lazy` with `Suspense` for dynamic component imports in React
- Provide meaningful fallback UI while dynamically imported modules are loading
- For SSR, use the selected framework's server-aware code-splitting mechanism and verify how it coordinates `Suspense`, preload hints, and hydration
- Only dynamically import modules that aren't critical to the initial render

## Source

Adapted from [Patterns.dev `dynamic-import`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/dynamic-import/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
