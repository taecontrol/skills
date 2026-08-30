# Server-side Rendering

Server-side rendering (SSR) for React applications.

## Use when

- Use this when SEO and fast First Contentful Paint are important for your application
- This is helpful for content-heavy pages that need to be quickly visible to users and search engines

## Avoid when

- For purely static content where static rendering (SSG) is sufficient and avoids per-request server cost
- For internal dashboards or tools where SEO is irrelevant and CSR provides a simpler architecture
- When the server rendering overhead per request is too high and caching isn't feasible

## Apply

- Prefer the selected framework's supported SSR lifecycle over a custom renderer unless project constraints require one
- When implementing custom SSR, select the streaming API for the actual runtime and verify its Suspense and abort behavior
- Combine SSR with client-side hydration for interactive pages
- Be aware of TTFB implications — optimize server response times and consider caching
- Explore React Server Components as a complement to SSR for reducing client-side JavaScript

## Source

Adapted from [Patterns.dev `server-side-rendering`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/server-side-rendering/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
