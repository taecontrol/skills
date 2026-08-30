# Streaming Server-Side Rendering

Streaming server-side rendering for chunked HTML delivery.

## Use when

- Use this when you want to improve TTFB and FCP by sending HTML incrementally as it's generated
- This is helpful for large pages where waiting for the full HTML would delay the initial paint

## Avoid when

- When your hosting environment doesn't support streaming responses (some serverless platforms buffer the full response)
- For simple static pages where the HTML is small enough that streaming provides no meaningful improvement
- When middleware or reverse proxies in your stack buffer the response, negating the streaming benefit

## Apply

- Use `renderToPipeableStream` (React 18+) instead of the deprecated `renderToNodeStream`
- Combine streaming with `Suspense` boundaries to stream partial content while slow parts load
- Use the `onShellReady` callback to begin streaming once the critical shell is ready
- Handle streaming errors with the `onError` callback

## Source

Adapted from [Patterns.dev `streaming-ssr`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/streaming-ssr/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
