# HOC Pattern

The Higher-Order Component (HOC) pattern for logic reuse.

## Use when

- Use this when the same uncustomized behavior needs to be applied to many components
- This is helpful when a component should work standalone without the added custom logic

## Avoid when

- When custom hooks can achieve the same result with less nesting and better readability
- In modern React code where Hooks provide the same reuse with a clearer component tree
- When the HOC wrapper adds prop-name collisions or obscures the component tree in DevTools

## Apply

- Create a function that takes a component and returns a new component with enhanced behavior
- Avoid naming collisions by renaming or merging props in the HOC
- Prefer React Hooks over HOCs for most new code to avoid wrapper hell and deep nesting
- Compose multiple HOCs carefully and be aware that the order of composition matters

## Source

Adapted from [Patterns.dev `hoc-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/hoc-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
