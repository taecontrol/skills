# Singleton Pattern

The singleton pattern for managing a single shared instance.

## Use when

- Use this when you need exactly one instance of a class shared across the entire application
- This is helpful for managing global state, configuration, or shared resources

## Avoid when

- When you need multiple instances of a class — singletons enforce a single shared instance by design
- When it introduces hidden global state coupling that makes testing and reasoning about code harder
- When dependency injection or module-scoped variables achieve the same result with better testability

## Apply

- Ensure only one instance can be created by checking for an existing instance in the constructor
- Use `Object.freeze()` on the exported instance to prevent accidental modifications
- In JavaScript, prefer simple object literals or modules over class-based singletons when possible
- In React, prefer state management tools (Redux, Context) over Singletons for global state
- Be aware that Singletons can make testing more difficult due to shared mutable state

## Source

Adapted from [Patterns.dev `singleton-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/singleton-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
