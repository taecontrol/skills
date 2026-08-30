# Tree Shaking

Tree shaking for dead code elimination in JavaScript bundles.

## Use when

- Use this when your bundle includes unused code from imported modules
- This is helpful for keeping JavaScript bundles lean and improving load performance

## Apply

- Use ES2015 `import`/`export` syntax — only ES modules can be tree-shaken
- Use named imports instead of importing entire modules to enable effective tree-shaking
- Mark packages as side-effect-free in `package.json` when appropriate
- Be aware that modules with side effects cannot be safely tree-shaken

## Source

Adapted from [Patterns.dev `tree-shaking`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/tree-shaking/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
