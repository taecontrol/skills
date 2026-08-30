# Preload

Resource preloading to prioritize critical assets.

## Use when

- Use this when critical resources (fonts, scripts, images) are discovered late in the loading process
- This is helpful when a late-discovered resource delays Largest Contentful Paint (LCP) or interaction readiness

## Avoid when

- For non-critical resources — preloading too many assets delays the resources that actually matter for initial render
- When resources are already discovered early by the browser's preload scanner (e.g., inline `<script>` tags in `<head>`)
- When overuse leads to browser warnings about unused preloaded resources, indicating wasted bandwidth

## Apply

- Use `<link rel="preload">` for resources needed immediately on the current page
- Be careful not to delay First Contentful Paint by preloading too many resources
- Use `as` attribute to specify the resource type (script, style, font, image)
- For fonts and other CORS-fetched resources, set `crossorigin` on the preload to match the eventual request mode
- Only preload resources that must be visible within ~1 second of initial render

## Source

Adapted from [Patterns.dev `preload`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/preload/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
