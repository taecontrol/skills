# Flyweight Pattern

The flyweight pattern for memory optimization.

## Use when

- Use this when creating a huge number of objects that could potentially drain available memory
- This is helpful when many objects share the same intrinsic properties (e.g., books with the same ISBN)

## Avoid when

- When the number of objects is small enough that memory is not a concern
- When objects have few or no shared intrinsic properties — the separation of intrinsic and extrinsic state adds complexity without savings
- When the added lookup/management overhead outweighs the memory benefit

## Apply

- Separate intrinsic (shared) state from extrinsic (unique) state
- Use a Map or similar structure to cache and reuse shared object instances
- Consider JavaScript's prototypal inheritance as a simpler alternative in many cases

## Source

Adapted from [Patterns.dev `flyweight-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/flyweight-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
