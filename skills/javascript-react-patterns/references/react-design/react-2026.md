# React Stack Patterns

A comprehensive guide to the modern React 2026 stack.

## Use when

- Use this as a reference when choosing your React stack (framework, build tools, routing, state management)
- This is helpful when starting a new React project and evaluating modern ecosystem options

## Apply

- Choose the rendering and deployment model before choosing the framework; verify the current official React recommendations and the project's hosting constraints
- Prefer a maintained React framework when routing, data loading, mutations, streaming, or server rendering must work as one system
- For a client-only application, choose a maintained build tool and router that meet the project's type-safety, data-loading, and deployment needs
- Distinguish server state from client UI state; add a cache or global state library only when framework and local state facilities leave a demonstrated gap
- Use modern React APIs only when the installed version and selected framework support them

## Source

Adapted from [Patterns.dev `react-2026`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/react-2026/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
