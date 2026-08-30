# Module Pattern

The module pattern for code organization and encapsulation.

## Use when

- Use this when you need to organize code into maintainable, encapsulated units
- This is helpful when you want to keep certain values private to a module and avoid global scope pollution
- Use this to enable tree-shaking and reduce bundle sizes

## Avoid when

- When ES2015 native modules with static `import`/`export` are available — prefer static imports for better tooling and tree-shaking
- When the IIFE-based module pattern is used purely for encapsulation in a codebase that already uses a bundler
- For trivial scripts where module overhead adds unnecessary complexity

## Apply

- Use ES2015 `import`/`export` syntax for module definitions
- Use named exports for multiple values and default exports for the primary value of a module
- Keep non-exported values private to reduce naming collision risks
- Use dynamic `import()` for on-demand module loading to reduce initial bundle size

## Source

Adapted from [Patterns.dev `module-pattern`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/module-pattern/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
