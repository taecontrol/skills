# Import On Interaction

Interaction-based lazy loading for non-critical resources.

## Use when

- Use this when you have third-party widgets (video players, chat widgets) that are costly to load eagerly
- This is helpful for deferring non-critical code until the user actually needs it
- Use this to reduce initial main-thread work while preserving Interaction to Next Paint (INP)

## Avoid when

- When the resource is needed immediately on page load and isn't gated behind a user interaction
- When the loading delay after interaction creates a noticeably poor user experience (consider prefetch/preload instead)
- For small modules where the dynamic import overhead exceeds the savings from deferring

## Apply

- Use dynamic `import()` to load modules on user interaction (click, hover, etc.)
- Implement facades (lightweight placeholders) for heavy third-party embeds
- For first-party code, prefer prefetching over import-on-interaction when possible
- Consider preconnecting to required origins on hover to reduce latency
- Use `React.lazy` with `Suspense` for component-level import-on-interaction in React

## Source

Adapted from [Patterns.dev `import-on-interaction`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/import-on-interaction/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
