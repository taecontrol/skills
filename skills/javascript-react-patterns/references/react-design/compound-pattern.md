# Compound Pattern

The compound component pattern for shared implicit state.

## Use when

- Use this when building components like dropdowns, tabs, or menus with related sub-components
- This is helpful when you want to provide a clean component API without exposing internal state management

## Avoid when

- When the sub-components don't share meaningful state — the pattern adds unnecessary Context overhead
- For simple one-off UIs where a single component with props is clearer
- When the implicit state sharing makes the component behavior hard to predict for consumers

## Apply

- Use React Context API to share state between the parent compound component and its children
- Attach child components as static properties on the parent (e.g., `FlyOut.Toggle`, `FlyOut.List`)
- Memoize context values to avoid unnecessary re-renders in complex scenarios
- Prefer the Context approach over `React.Children.map` for more flexible component nesting

## Source

Adapted from [Patterns.dev `compound-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/compound-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
