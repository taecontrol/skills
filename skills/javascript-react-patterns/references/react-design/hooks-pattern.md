# Hooks Pattern

React Hooks for reusing stateful logic across components.

## Use when

- Use this when you need to add state or lifecycle behavior to function components
- This is helpful for extracting and reusing stateful logic across multiple components
- Use this instead of class components for cleaner, more composable code

## Apply

- Use `useState` for local state and `useEffect` for side effects in function components
- Create custom hooks (prefixed with `use`) to encapsulate and share reusable logic
- Follow the Rules of Hooks: only call hooks at the top level and only in React functions
- Avoid unnecessary `useEffect` — compute derived state directly in the component body
- Let the React Compiler handle memoization instead of manual `useMemo`/`useCallback` where possible

## Source

Adapted from [Patterns.dev `hooks-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/hooks-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
