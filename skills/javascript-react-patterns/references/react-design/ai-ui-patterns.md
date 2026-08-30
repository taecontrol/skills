# AI UI Patterns

Design patterns for building AI-powered React interfaces.

## Use when

- Use this when building conversational AI interfaces that stream responses from LLMs
- This is helpful for integrating OpenAI, Anthropic, or other AI providers into React applications
- Use this when you need patterns for prompt management, streaming, error handling, and AI-specific UI

## Apply

- Use the Vercel AI SDK's `useChat` hook for managing conversation state and streaming responses
- Keep API keys on the server and use the selected framework's server boundary or a separate backend for provider calls
- Enable streaming (`stream: true`) for responsive real-time output in chat interfaces
- Debounce input for autocomplete features; disable input during response streaming for chat
- Build reusable components (ChatMessage, InputBox) decoupled from data-fetching logic

## Source

Adapted from [Patterns.dev `ai-ui-patterns`](https://github.com/PatternsDev/skills/blob/48bf58a488cd210bcfad280b09c3a00403964d9d/react/ai-ui-patterns/SKILL.md), licensed MIT. Verify current framework and browser APIs before implementation.
