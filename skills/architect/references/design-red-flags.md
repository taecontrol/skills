# Design red flags

Screen every candidate before synthesis. A red flag is a reason to revise or reject the shape.

## Shallow module

Exposes a large interface while hiding little complexity. Prefer a simple interface backed by substantial behavior. Signs: callers coordinate several methods for one operation; public options expose internal stages; learning the interface does not save learning the implementation.

## Information leakage

Multiple modules depend on the same internal decision. Representation, policy, or protocol details appear in more than one place. Keep storage schemas, framework objects, and wire types behind the interface.

## Temporal decomposition

Modules organized by execution order (load, validate, transform, save) instead of the knowledge they own. Group around domain ownership.

## Pass-through method

Forwards the same arguments to another method with the same shape. Remove it or move responsibility to the module that can complete the operation.
