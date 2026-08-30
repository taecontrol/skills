# Islands Architecture

The islands architecture pattern for partial hydration.

## Use when

- Use this for primarily static websites that need sprinkles of interactivity (blogs, product pages, news sites)
- This is helpful when you want to reduce the volume of JavaScript shipped to the client
- Use this when SEO and fast initial page loads are priorities alongside selective interactivity

## Apply

- Identify static and dynamic regions of each page separately
- Use frameworks like Astro, Marko, or Eleventy that support islands architecture
- Hydrate interactive components independently using `client:visible` or similar directives
- Keep the majority of the page as static HTML with zero JavaScript cost

## Source

Adapted from [Patterns.dev `islands-architecture`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/islands-architecture/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
