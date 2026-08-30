# JavaScript Performance Patterns

Framework-agnostic JavaScript runtime performance patterns.

## Use when

Reference these patterns when:
- Profiling reveals a hot function or tight loop
- Processing large datasets (1,000+ items)
- Handling high-frequency events (scroll, mousemove, resize)
- Optimizing build-time or server-side scripts
- Reviewing code for performance in critical paths

## Apply

- Apply these patterns only in **measured hot paths** — code that runs frequently or processes large datasets. Don't apply them to cold code paths where readability is more important than nanosecond gains.

## Source

Adapted from [Patterns.dev `js-performance-patterns`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/js-performance-patterns/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
