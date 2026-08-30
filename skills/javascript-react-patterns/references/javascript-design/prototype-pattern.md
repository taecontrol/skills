# Prototype Pattern

The prototype pattern for property sharing via the prototype chain.

## Use when

- Use this when many objects need access to the same methods without duplicating them
- This is helpful for understanding JavaScript's inheritance model and ES6 classes

## Apply

- Use ES6 classes to automatically add methods to the prototype
- Use `Object.create()` to create objects with a specific prototype
- Leverage the prototype chain for inheritance (`extends` keyword in ES6 classes)
- Understand that properties on the prototype are shared and not duplicated per instance

## Source

Adapted from [Patterns.dev `prototype-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/prototype-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
