# Mediator/Middleware Pattern

The mediator pattern for centralized component communication.

## Use when

- Use this when multiple objects need to communicate but direct many-to-many relationships would be chaotic
- This is helpful for implementing middleware chains (e.g., Express.js middleware)

## Avoid when

- When direct communication between two components is simpler and the system has few participants
- When the mediator itself becomes a monolithic "god object" that's hard to maintain
- When event-driven patterns (observer/pub-sub) provide sufficient decoupling without a central coordinator

## Apply

- Create a central mediator that processes requests and forwards them to the appropriate handlers
- Use the middleware pattern to chain processing functions that can modify requests/responses
- Keep individual components unaware of each other; they only know about the mediator

## Source

Adapted from [Patterns.dev `mediator-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/mediator-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
