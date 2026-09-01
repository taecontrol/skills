# Feature Map contract

Maintain a behavior inventory, not an architecture document or source-file list.
The Feature Map helps an independent validator reach and observe accepted user
journeys; it does not create requirements and is not evidence by itself.

## Index

Record:

- baseline launch and data preconditions;
- run isolation, user-instance protection, and cleanup rules;
- CLI conventions and literal invocation form;
- direct proof requirements and persistent observation seams;
- supported and explicitly unsupported surfaces;
- links to every feature and cross-surface journey;
- the last reconciled product/candidate and adapter identities.

Use stable feature and sub-feature IDs. Identity fields must describe a concrete
reconciliation or say `not reconciled`; avoid mutable claims such as "current."

## Feature file

Each feature uses these headings in this order:

1. `Sub-features` — stable IDs and user-visible behavior.
2. `How to get to it (user POV)` — every reachable user entry point, kept
   distinct when their material semantics differ.
3. `Driving it with <project CLI>` — preconditions, literal commands/actions,
   expected observable states, and required proof.
4. `Gotchas` — focus, timing, state, permissions, flags, platform limits, and
   other evidence-invalidating traps.

For every materially relevant capability, record applicable success,
validation/error, cancel/undo, empty, loading/streaming, persistence/reload,
permission/authorization, gated variants, and cross-surface effects. Mark a case
`not applicable` with the product reason rather than omitting it silently.

Completion: a fresh reader can select one user path, execute literal commands,
name its expected observations and proof, and distinguish it from unsupported
paths without inspecting implementation code.
