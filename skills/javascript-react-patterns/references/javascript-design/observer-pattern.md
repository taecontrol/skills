# Observer Pattern

The observer pattern for event-driven communication.

## Use when

- Use this when you need to notify multiple parts of an application about state changes or events
- This is helpful for implementing event-driven, asynchronous communication between components

## Avoid when

- When the subscriber count is very high and notification performance becomes critical
- When simpler callbacks or direct function calls suffice for one-to-one communication
- When debugging difficulty from implicit event chains outweighs the decoupling benefit

## Apply

- Expose explicit `subscribe`, `unsubscribe`, and `notify` contracts; use a class only when it fits the existing module design
- Keep observers loosely coupled to the observable for better separation of concerns
- Be mindful of performance when notifying many subscribers with complex logic
- Consider using libraries like RxJS for more advanced reactive programming needs

## Source

Adapted from [Patterns.dev `observer-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/observer-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
