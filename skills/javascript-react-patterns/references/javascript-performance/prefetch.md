# Prefetch

Resource prefetching strategies for faster navigation.

## Use when

- Use this when you know users will likely navigate to certain routes or need certain resources soon
- This is helpful for reducing perceived loading time on subsequent navigations

## Avoid when

- For resources unlikely to be needed — unnecessary prefetching wastes bandwidth and competes with critical requests
- On low-bandwidth or metered connections where prefetching consumes the user's data budget
- When the prefetched resources change frequently and would be stale by the time they're used

## Apply

- Use `<link rel="prefetch">` or the selected router or bundler's current prefetch primitive
- Only prefetch resources that are likely to be needed — don't overdo it as it consumes bandwidth
- Prefetched resources are loaded at low priority when the browser is idle

## Source

Adapted from [Patterns.dev `prefetch`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/prefetch/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
