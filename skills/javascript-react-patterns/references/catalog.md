# Pattern catalog

Read this index after the skill is activated. Choose from the problem signal, then read only the linked cards for plausible candidates. A named pattern is not evidence that it fits.

The cards are grouped for navigation only; their source APIs and ecosystem recommendations must be checked against the installed stack.

## JavaScript design

| Pattern | Problem signal |
| --- | --- |
| [`singleton-pattern`](javascript-design/singleton-pattern.md) | One stateful service must be shared with an explicit lifecycle and owner. |
| [`observer-pattern`](javascript-design/observer-pattern.md) | Multiple independent consumers must react to the same event or state change. |
| [`proxy-pattern`](javascript-design/proxy-pattern.md) | Access, assignment, or invocation needs interception without changing callers. |
| [`prototype-pattern`](javascript-design/prototype-pattern.md) | Many objects need to share behavior without duplicating per-instance methods. |
| [`module-pattern`](javascript-design/module-pattern.md) | A capability needs a small public interface and private implementation state. |
| [`mixin-pattern`](javascript-design/mixin-pattern.md) | Unrelated objects need reusable behavior and simpler composition cannot express it. |
| [`mediator-pattern`](javascript-design/mediator-pattern.md) | Many participants communicate directly and their dependency graph is becoming chaotic. |
| [`flyweight-pattern`](javascript-design/flyweight-pattern.md) | Profiling shows repeated intrinsic object state is causing material memory pressure. |
| [`factory-pattern`](javascript-design/factory-pattern.md) | Construction varies by type, environment, or configuration and needs one policy owner. |
| [`command-pattern`](javascript-design/command-pattern.md) | Actions need queuing, logging, retry, scheduling, or undo independently of invocation. |
| [`provider-pattern`](javascript-design/provider-pattern.md) | A subtree needs the same stable dependency and prop drilling obscures ownership. |

## JavaScript performance

| Pattern | Problem signal |
| --- | --- |
| [`loading-sequence`](javascript-performance/loading-sequence.md) | A measured request waterfall or main-thread sequence delays LCP or interaction. |
| [`static-import`](javascript-performance/static-import.md) | Startup dependencies must stay predictable and available for tree shaking. |
| [`dynamic-import`](javascript-performance/dynamic-import.md) | A large optional module is not needed during initial rendering. |
| [`import-on-visibility`](javascript-performance/import-on-visibility.md) | Below-the-fold UI can wait until it approaches the viewport. |
| [`import-on-interaction`](javascript-performance/import-on-interaction.md) | Heavy code is needed only after a deliberate user action. |
| [`route-based`](javascript-performance/route-based.md) | Route-specific code inflates the entry bundle and most users do not need it immediately. |
| [`bundle-splitting`](javascript-performance/bundle-splitting.md) | Bundle evidence shows the initial chunk contains substantial non-critical code. |
| [`prpl`](javascript-performance/prpl.md) | An app-shell experience must remain usable on slow networks and repeat visits. |
| [`tree-shaking`](javascript-performance/tree-shaking.md) | Bundle analysis shows unused exports or side effects prevent dead-code removal. |
| [`preload`](javascript-performance/preload.md) | A critical current-page resource is discovered too late in the waterfall. |
| [`prefetch`](javascript-performance/prefetch.md) | Evidence makes the next navigation or resource highly probable. |
| [`third-party`](javascript-performance/third-party.md) | Vendor code consumes material network, CPU, privacy, or interaction budget. |
| [`virtual-lists`](javascript-performance/virtual-lists.md) | Hundreds or thousands of rendered items create DOM or scrolling pressure. |
| [`compression`](javascript-performance/compression.md) | Production transfer sizes remain high after minification and caching. |
| [`js-performance-patterns`](javascript-performance/js-performance-patterns.md) | Profiling identifies a JavaScript hot path, high-frequency event, or large dataset. |
| [`vite-bundle-optimization`](javascript-performance/vite-bundle-optimization.md) | A Vite build is slow or its measured chunks and dependencies are unexpectedly large. |

## JavaScript rendering

| Pattern | Problem signal |
| --- | --- |
| [`islands-architecture`](javascript-rendering/islands-architecture.md) | A mostly static page needs only a few independently interactive regions. |
| [`view-transitions`](javascript-rendering/view-transitions.md) | DOM or navigation changes need visual continuity without bespoke animation state. |

## React design

| Pattern | Problem signal |
| --- | --- |
| [`hooks-pattern`](react-design/hooks-pattern.md) | Function components need to share stateful behavior without sharing markup. |
| [`hoc-pattern`](react-design/hoc-pattern.md) | A library or legacy interface requires wrapper-based cross-cutting behavior. |
| [`compound-pattern`](react-design/compound-pattern.md) | Related child components coordinate state but should expose a flexible declarative API. |
| [`render-props-pattern`](react-design/render-props-pattern.md) | A legacy or library interface shares behavior while consumers control rendering. |
| [`presentational-container-pattern`](react-design/presentational-container-pattern.md) | View rendering and orchestration are entangled and a Hook alone does not clarify the seam. |
| [`ai-ui-patterns`](react-design/ai-ui-patterns.md) | Streaming, interruption, retry, and partial AI output create unusual interaction states. |
| [`react-2026`](react-design/react-2026.md) | A new or modernized project needs an evidence-backed stack decision. |
| [`react-composition-2026`](react-design/react-composition-2026.md) | Boolean props or rigid component APIs make shared UI difficult to extend. |

## React performance

| Pattern | Problem signal |
| --- | --- |
| [`react-render-optimization`](react-performance/react-render-optimization.md) | React Profiler shows avoidable renders or expensive work during interaction. |
| [`react-data-fetching`](react-performance/react-data-fetching.md) | Server-state code creates waterfalls, duplicate requests, stale data, or ad hoc caching. |

## React rendering

| Pattern | Problem signal |
| --- | --- |
| [`client-side-rendering`](react-rendering/client-side-rendering.md) | A private, interaction-heavy application does not need indexed initial HTML. |
| [`server-side-rendering`](react-rendering/server-side-rendering.md) | Dynamic per-request HTML must improve discovery or first render. |
| [`static-rendering`](react-rendering/static-rendering.md) | Content is stable enough to generate ahead of requests and cache broadly. |
| [`incremental-static-rendering`](react-rendering/incremental-static-rendering.md) | Mostly static pages need bounded staleness without rebuilding the entire site. |
| [`streaming-ssr`](react-rendering/streaming-ssr.md) | Slow subtrees delay the whole server-rendered response. |
| [`progressive-hydration`](react-rendering/progressive-hydration.md) | Non-critical server-rendered regions do not need immediate interactivity. |
| [`react-server-components`](react-rendering/react-server-components.md) | Supported server-only components can keep data access and dependencies off the client. |
| [`react-selective-hydration`](react-rendering/react-selective-hydration.md) | Streamed SSR needs critical interactions hydrated ahead of slower regions. |
