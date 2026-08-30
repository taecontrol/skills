# Animating View Transitions

The View Transitions API for animating DOM changes.

## Use when

- Use this when you want to animate transitions between different page states or navigations
- This is helpful for creating polished, app-like navigation experiences in web applications

## Apply

- Use `document.startViewTransition(callback)` to animate DOM changes
- Assign unique `view-transition-name` CSS properties to elements that should transition between states
- Check for browser support before using the API (`if (document.startViewTransition)`)
- Minimize the time the DOM is frozen by starting transitions after data fetching completes
- Consider CSS animation fallbacks for browsers that don't yet support the View Transitions API

## Source

Adapted from [Patterns.dev `view-transitions`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/view-transitions/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
