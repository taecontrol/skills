# Selective Hydration

Selective hydration combined with streaming SSR in modern React.

## Use when

- Use this when you want to make parts of your SSR page interactive before all JavaScript has loaded
- This is helpful when slow components (e.g., data-fetching components) are blocking the entire page's hydration

## Apply

- Use `Suspense` boundaries to delineate independently hydratable chunks of UI
- Use `renderToPipeableStream` (Node) or `renderToReadableStream` (edge) for streaming SSR
- Place heavy data-fetching components inside `Suspense` so they don't delay sibling hydration
- Ensure critical interactive components are not inside long-lived loading fallbacks
- Use the selected framework's hydration entry point, or `hydrateRoot` for a supported custom React DOM setup

## Source

Adapted from [Patterns.dev `react-selective-hydration`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/react-selective-hydration/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
