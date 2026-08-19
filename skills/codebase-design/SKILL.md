---
name: codebase-design
description: "Shared vocabulary for reasoning about deep modules, interfaces, seams, testability, leverage, and locality."
license: MIT
---

# Codebase Design

Use this shared reference when designing or reviewing module shape, interfaces, seams, testability, or architecture opportunities. It is vocabulary and reasoning guidance, not a delivery phase, orchestration procedure, or authorization to edit code.

## Vocabulary

Use these terms consistently.

- **Module** — anything with an interface and an implementation: a function, class, package, or tier-spanning slice.
- **Interface** — everything a caller must know to use a module correctly: type shape, invariants, ordering constraints, errors, required configuration, and performance characteristics.
- **Implementation** — the code inside a module.
- **Depth** — leverage at the interface: how much behavior callers or tests can exercise per unit of interface they must learn. A deep module hides substantial behavior behind a small interface; a shallow module exposes nearly as much complexity as it contains.
- **Seam** — the location where an interface lets behavior change without editing the caller. Choosing the seam is distinct from choosing the implementation behind it.
- **Adapter** — a concrete thing that satisfies an interface at a seam. It names the role at the seam, not the implementation's size or complexity.
- **Leverage** — the capability callers gain from depth: one implementation supports many callers and tests.
- **Locality** — the maintenance benefit of depth: knowledge, change, bugs, and verification concentrate instead of spreading across callers.

Use `module`, `interface`, and `seam` rather than overloaded alternatives such as component, service, API, or boundary when this vocabulary is being applied.

## Apply the reference

When evaluating a proposed shape:

1. State the module's interface, including non-type obligations a caller must know.
2. Identify behavior that callers currently coordinate or duplicate. Move it behind the module only when that reduces caller knowledge and creates leverage.
3. Place the seam where real variation exists. One adapter is a hypothetical seam; two adapters demonstrate a real one.
4. Apply the deletion test: if deleting the module makes complexity reappear across callers, it was providing depth. If the complexity vanishes, it was a pass-through.
5. Test through the interface callers use. A test that must reach past that interface indicates the module may have the wrong shape.
6. Prefer dependencies supplied through the interface and returned results over internally created dependencies and hidden effects when that reduces caller setup and makes behavior observable.

Depth is a property of the interface, not a line-count ratio. A deep module may use small internal seams for its implementation and tests. Do not add a seam merely to make a hypothetical substitution possible.

## Completion criteria

An application of this reference is complete only when all of the following are true:

- The affected module, its interface obligations, and its seam are named.
- The assessment identifies a concrete source of caller complexity, duplicated knowledge, or change amplification.
- The deletion test and interface-as-test-surface test have a stated result.
- Any proposed adapter corresponds to real variation or is explicitly identified as hypothetical.
- The recommendation explains expected leverage and locality without relying on implementation-line counts or a synonym that changes the vocabulary's meaning.

## Provenance

- Canonical package: `codebase-design`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/engineering/codebase-design/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates and restructures the upstream codebase-design vocabulary and procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: existing adaptation reconciled against the pinned baseline.
- Taecontrol changes: packages the vocabulary as an independently installable shared reference; removes required links to upstream support files; makes no filesystem sibling a prerequisite; states checkable design-assessment completion criteria; and keeps the capability non-orchestrating and non-authorizing under Factory authority.
