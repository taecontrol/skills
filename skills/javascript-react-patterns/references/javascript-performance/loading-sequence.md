# Optimize your loading sequence

Resource loading sequence optimization for Core Web Vitals.

## Use when

- Use this when optimizing page load performance for Core Web Vitals
- This is helpful when you need to coordinate the loading of 1P JS, 3P JS, CSS, fonts, and images
- Use this when third-party scripts are impacting your loading performance

## Apply

- Inline critical CSS and font CSS; use preconnect for external fonts
- Prioritize the resources that produce FCP and the LCP element, then minimize main-thread work that delays interaction readiness
- Start fetching first-party JS before ATF images on the network
- Use `async` or `defer` attributes for non-critical scripts
- Lazy-load below-the-fold images and non-essential third-party resources

## Source

Adapted from [Patterns.dev `loading-sequence`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/loading-sequence/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
