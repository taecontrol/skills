# Provider Pattern

The provider pattern for sharing data across component trees.

## Use when

- Use this when many components need access to the same data (themes, auth, locale)
- This is helpful when prop drilling becomes unwieldy across multiple component layers

## Apply

- Create a Context with `React.createContext()` and wrap components with its Provider
- Use the `useContext` hook in consuming components to access provided values
- Create custom hooks (e.g., `useThemeContext`) to encapsulate context consumption logic
- Avoid overusing context for frequently updated values as all consumers re-render on change
- Split contexts by concern to minimize unnecessary re-renders

## Source

Adapted from [Patterns.dev `provider-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/provider-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
