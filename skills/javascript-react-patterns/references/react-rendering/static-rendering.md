# Static Rendering

Static rendering (SSG) for build-time HTML generation.

## Use when

- Use this for static content like About pages, blog posts, and product listings that don't change per-request
- This is helpful when you want the fastest possible TTFB via CDN-served static HTML

## Avoid when

- For highly dynamic, personalized content that changes per request (e.g., user dashboards, real-time feeds)
- When the dataset is so large that build times become impractical without ISR
- For pages requiring authentication-gated content that can't be pre-rendered at build time

## Apply

- Use the selected framework's current build-time data and static-route APIs
- Define which dynamic routes are known at build time and how missing routes behave
- Consider Incremental Static Regeneration (ISR) for pages that need periodic updates
- Deploy to a CDN for edge-cached performance

## Source

Adapted from [Patterns.dev `static-rendering`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/static-rendering/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
