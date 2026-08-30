# List Virtualization

Virtual list (windowing) techniques for rendering large datasets.

## Use when

- Use this when rendering large lists or grids (hundreds/thousands of items) that cause performance issues
- This is helpful for reducing initial render time and improving scroll performance

## Avoid when

- For short lists (under ~100 items) where native rendering is fast enough without virtualization
- When accessibility requirements demand all list items be in the DOM for screen readers
- When the list items have unpredictable, content-dependent heights that make virtualization measurements unreliable

## Apply

- Use `react-window` (or `react-virtualized`) to render only visible items in a scrollable container
- Choose `FixedSizeList` for items of equal height or `VariableSizeList` for items of different heights
- Use `react-window-infinite-loader` for incrementally loading data as the user scrolls
- Consider CSS `content-visibility: auto` for simpler cases where full virtualization isn't needed

## Source

Adapted from [Patterns.dev `virtual-lists`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/virtual-lists/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
