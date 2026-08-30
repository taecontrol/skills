# Render Props Pattern

The render props pattern for flexible component composition.

## Use when

- Use this when you need to share stateful logic between components with different rendering needs
- This is helpful when the HOC pattern creates naming collision issues or overly deep nesting

## Avoid when

- When custom hooks can replace the pattern — hooks provide the same logic reuse without render prop nesting
- When it creates deeply nested JSX that becomes hard to read and maintain
- When the shared logic is simple enough for a plain utility function or hook

## Apply

- Pass a function as a `render` prop (or `children` prop) that receives data and returns JSX
- Prefer custom Hooks over render props in most modern React code
- Use the children-as-a-function pattern as a cleaner alternative to explicit `render` props
- Avoid deeply nesting multiple render prop components — refactor to Hooks instead

## Source

Adapted from [Patterns.dev `render-props-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/render-props-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
