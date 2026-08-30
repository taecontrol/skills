# PRPL Pattern

The PRPL pattern for optimizing initial page load.

## Use when

- Use this when building applications that need to perform well on low-end devices and slow networks
- This is helpful for optimizing the critical rendering path of web applications

## Apply

- **Preload** genuinely critical resources with preload hints or supported early-hint infrastructure
- **Render** the initial route as soon as possible for fast first paint
- **Pre-cache** frequently visited routes using service workers for offline support
- **Lazily load** routes and assets that aren't immediately needed
- Use an app shell architecture as the main entry point

## Source

Adapted from [Patterns.dev `prpl`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/prpl/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
