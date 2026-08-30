# Static Import

Static ES2015 import syntax for module dependencies.

## Use when

- Use this for importing modules that are needed immediately on page load
- This is the default import mechanism — understand it to know when to switch to dynamic imports

## Apply

- Use static imports for modules critical to the initial render
- Be aware that all statically imported modules are bundled into the initial bundle
- Consider switching to dynamic imports for modules not needed on initial render

## Source

Adapted from [Patterns.dev `static-import`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/static-import/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
