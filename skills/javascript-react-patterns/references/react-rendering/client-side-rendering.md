# Client-side Rendering

Client-side rendering (CSR) for React applications.

## Use when

- Use this for internal tools, dashboards, or SPAs where SEO is not a priority
- This is helpful when you need a fully interactive single-page application experience

## Avoid when

- For SEO-critical pages where search engines need server-rendered HTML to index content
- For content-heavy sites where users see a blank page until JavaScript loads and executes
- When Time to First Contentful Paint is a key metric — CSR defers all rendering to the client

## Apply

- Keep initial JavaScript bundles small (< 100-170KB minified/gzipped) for fast First Contentful Paint
- Use code-splitting and lazy loading to defer non-critical JavaScript
- Consider SSR/SSG for public-facing pages where SEO and initial load performance matter
- Use service workers and application shell caching for offline and repeat visit performance

## Source

Adapted from [Patterns.dev `client-side-rendering`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/client-side-rendering/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
