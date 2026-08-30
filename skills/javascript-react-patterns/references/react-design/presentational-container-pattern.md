# Container/Presentational Pattern

The presentational/container pattern for separating view and logic.

## Use when

- Use this when you want a clear separation between data-fetching logic and UI rendering
- This is helpful for making presentational components reusable and easy to test

## Avoid when

- For small components where the separation into two files adds overhead without meaningful benefit
- When hooks already encapsulate the data logic, making a separate container component redundant
- When the component is a one-off view with no reuse potential for either layer

## Apply

- Container components handle data fetching and state; presentational components handle rendering
- Prefer custom Hooks over container components in modern React for the same separation of concerns
- Keep presentational components as pure functions that receive data through props
- Use this pattern when it genuinely simplifies your architecture — avoid it for small components

## Source

Adapted from [Patterns.dev `presentational-container-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/presentational-container-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
