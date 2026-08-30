# React Server Components

React Server Components for zero-bundle server rendering.

## Use when

- Use this when you want to reduce client-side JavaScript by running data-fetching and rendering on the server
- This is helpful when a supported React framework can keep server-only rendering and dependencies out of the client bundle

## Avoid when

- When the component needs client-side interactivity — state (`useState`), effects (`useEffect`), and event handlers require Client Components
- For components that depend on browser-only APIs (e.g., `window`, `localStorage`, `IntersectionObserver`)
- When the component is already small and the server/client boundary adds more complexity than it saves

## Apply

- Use Server Components only through a framework and deployment environment that supports their server/client boundary
- Add `'use client'` directive only to components that need interactivity (event handlers, state, effects)
- Server Components can use heavy libraries (markdown parsers, date formatters) at zero client bundle cost
- Server Components complement SSR — they are not a replacement for it
- Use Server Functions or Server Actions (`'use server'`) for form submissions and mutations when your framework supports them

## Source

Adapted from [Patterns.dev `react-server-components`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/react-server-components/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
