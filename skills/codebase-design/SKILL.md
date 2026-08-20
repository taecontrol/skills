---
name: codebase-design
description: "Shared vocabulary for reasoning about deep modules, interfaces, seams, testability, leverage, and locality."
---

# Codebase design

Use this reference when designing or reviewing a module's shape. It guides reasoning only; it does not authorize code changes.

## Vocabulary

- **Module**: anything with an interface and implementation, including a function, class, package, or tier-spanning slice.
- **Interface**: every fact callers must know to use a module correctly, including types, invariants, ordering, errors, configuration, and performance.
- **Implementation**: code inside a module.
- **Depth**: leverage at an interface. A deep module hides substantial behavior behind a small interface. A shallow module leaves callers with nearly as much complexity as it contains.
- **Seam**: the place where an interface allows behavior to change without editing callers.
- **Adapter**: a concrete thing that satisfies an interface at a seam.
- **Leverage**: capability gained when one implementation supports many callers and tests.
- **Locality**: maintenance benefit when knowledge, change, bugs, and verification stay in one place.

Use these terms consistently when applying this reference.

## Apply it

1. Name the module, interface obligations, and seam.
2. Find caller coordination, duplicated knowledge, or change that spreads across callers. Move behavior behind the module only when it reduces what callers must know.
3. Put a seam where variation is real. One adapter is hypothetical; two adapters show real variation.
4. Run the deletion test. If deleting the module makes complexity reappear across callers, it has depth. If the complexity disappears, it is a pass-through.
5. Test through the caller-facing interface. Tests that must reach past it indicate the module may have the wrong shape.
6. Prefer supplied dependencies and observable results when they simplify setup and behavior.

Depth belongs to the interface, not implementation line count. Internal seams may support implementation and tests without enlarging the caller-facing interface.

Done means the assessment names the module, interface, seam, caller complexity, deletion-test result, test result, and any real variation, then explains the expected leverage and locality.
