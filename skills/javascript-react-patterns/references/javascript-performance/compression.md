# Compressing JavaScript

JavaScript compression techniques including Gzip and Brotli.

## Use when

- Use this when you need to reduce JavaScript payload sizes for faster page loads
- This is helpful when optimizing network transfer times, especially for users on slower connections
- Use this alongside minification, code-splitting, and caching strategies

## Apply

- Prefer Brotli compression over Gzip for better compression ratios at similar speed
- Use static compression for assets that don't change frequently and dynamic compression for frequently changing content
- Enable compression at the server or CDN level (e.g., Nginx, Vercel, Netlify)
- Minify JavaScript before applying compression
- Be mindful of the granularity trade-off: larger bundles compress better, but smaller chunks cache better

## Source

Adapted from [Patterns.dev `compression`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/javascript/compression/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
