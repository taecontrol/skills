# Optimize loading third-parties

Strategies for mitigating third-party script performance impact.

## Use when

- Use this when third-party scripts (analytics, ads, chat widgets, social embeds) are slowing down your site
- This is helpful for optimizing Core Web Vitals while retaining essential third-party functionality

## Apply

- Use `async` or `defer` attributes for non-critical third-party scripts
- Establish early connections with `preconnect` and `dns-prefetch` resource hints
- Lazy-load below-the-fold embeds (YouTube, maps, social media) using IntersectionObserver or facades
- Consider self-hosting critical third-party scripts for better caching control
- Use the selected framework's script-loading primitive when it can express priority, consent, and execution timing

## Source

Adapted from [Patterns.dev `third-party`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/third-party/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
