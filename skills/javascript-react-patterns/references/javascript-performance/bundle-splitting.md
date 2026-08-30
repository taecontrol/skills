# Bundle Splitting

Bundle splitting techniques for web performance.

## Use when

- Use this when your application has a large JavaScript bundle that affects load times
- This is helpful when you want to reduce First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
- Use this when parts of your code are only needed for specific user interactions or routes

## Apply

- Use the selected framework or bundler's supported chunking and lazy-loading primitives
- Separate code that isn't needed for the initial render into its own bundle
- Measure the impact on LCP and INP; prioritize critical rendering code without creating request waterfalls or excessive tiny chunks

## Source

Adapted from [Patterns.dev `bundle-splitting`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/bundle-splitting/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
