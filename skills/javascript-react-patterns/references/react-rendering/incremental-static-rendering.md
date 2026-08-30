# Incremental Static Generation

Incremental Static Regeneration (ISR) for updating static content post-build.

## Use when

- Use this when you have mostly static pages that need periodic data updates without full rebuilds
- This is helpful for large sites (blogs, e-commerce) where rebuilding every page on each change is impractical

## Avoid when

- When content changes in real-time and stale data is unacceptable (e.g., live scores, stock tickers)
- For pages that are fully dynamic and personalized per user — SSR is a better fit
- When the revalidation window creates a confusing experience where different users see different content versions

## Apply

- Use the selected framework's current time-based or event-driven revalidation primitive
- Define first-request behavior, staleness tolerance, cache scope, and failure behavior before enabling background regeneration
- Prefer event-driven invalidation when a content mutation must become visible promptly

## Source

Adapted from [Patterns.dev `incremental-static-rendering`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/incremental-static-rendering/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
