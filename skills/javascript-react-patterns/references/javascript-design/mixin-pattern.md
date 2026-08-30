# Mixin Pattern

The mixin pattern for sharing functionality without inheritance.

## Use when

- Use this when you need to add reusable functionality to multiple classes without creating an inheritance chain
- This is helpful when you want to compose behavior from multiple sources

## Avoid when

- When composition via hooks (React) or composables (Vue) achieves the same result with better traceability
- When prototype pollution is a risk — mixins modify shared prototypes and can cause naming collisions
- When the added functionality is simple enough that a utility function or module import suffices

## Apply

- Use `Object.assign()` to add mixin properties to a class prototype
- Be cautious with prototype pollution — modifying prototypes can lead to unexpected behavior
- In React, prefer Hooks over mixins (mixins are discouraged by the React team)
- Consider composition over inheritance when designing reusable behavior

## Source

Adapted from [Patterns.dev `mixin-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/mixin-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
