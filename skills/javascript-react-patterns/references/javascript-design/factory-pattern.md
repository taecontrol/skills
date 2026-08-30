# Factory Pattern

The factory pattern for flexible object creation.

## Use when

- Use this when you need to create multiple objects that share the same properties
- This is helpful when object creation depends on a certain environment or configuration

## Avoid when

- For simple objects where a plain object literal suffices — a factory adds unnecessary indirection
- When class constructors are the established convention in your project and the team expects `new`
- When there's no conditional logic or configuration driving object creation

## Apply

- Use factory functions to return custom objects based on current environment or user-specific configuration
- Prefer ES6 arrow functions for concise factory function definitions
- If profiling shows per-instance method allocation matters, share behavior through module functions or prototypes instead of assuming a class is required

## Source

Adapted from [Patterns.dev `factory-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/factory-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
