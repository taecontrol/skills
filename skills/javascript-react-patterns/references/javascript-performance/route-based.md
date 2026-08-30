# Route Based Splitting

Route-based code splitting for single-page applications.

## Use when

- Use this when your application has multiple routes and not all code is needed on every page
- This is helpful for reducing initial load time by only loading code for the current route

## Apply

- Use the selected router or framework's lazy-route API so code, data, preload hints, and error handling remain coordinated
- Lazily load page-level components per route for optimal code splitting
- Take advantage of natural loading pauses during route transitions for a seamless experience

## Source

Adapted from [Patterns.dev `route-based`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/route-based/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
