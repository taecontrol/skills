# Proxy Pattern

The proxy pattern for intercepting object operations.

## Use when

- Use this when you need to add validation, formatting, notifications, or debugging to object access
- This is helpful for controlling and intercepting property gets and sets on objects

## Avoid when

- In performance-critical hot paths where Proxy overhead on every property access matters
- When simple getter/setter methods or Object.defineProperty achieve the same validation with less indirection
- When the target objects are rarely accessed and the interception logic isn't needed

## Apply

- Create a `Proxy` with a handler object defining `get` and `set` traps
- Use the `Reflect` object within handlers for cleaner property access and modification
- Add validation logic in the `set` trap to ensure data integrity
- Avoid using proxies in performance-critical code paths as they add overhead

## Source

Adapted from [Patterns.dev `proxy-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/proxy-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
