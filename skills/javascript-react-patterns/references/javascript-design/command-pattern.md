# Command Pattern

The command pattern for decoupling task execution from invocation.

## Use when

- Use this when you need to decouple the object invoking an operation from the object performing it
- This is helpful when commands need a certain lifespan or should be queued and executed at specific times

## Avoid when

- For simple one-off operations that don't need undo/redo, queuing, or logging
- When direct function calls are clear enough and the extra abstraction adds complexity without benefit
- When the system has few operations and the command infrastructure would be over-engineering

## Apply

- Represent each command with the smallest object or function that exposes the execution contract; a class is optional, not required
- Replace direct method calls with command objects passed to a single `execute` method on the manager
- Use this pattern sparingly as it can add unnecessary boilerplate in simpler JavaScript applications

## Source

Adapted from [Patterns.dev `command-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/command-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
