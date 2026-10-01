# Test value

A test earns its maintenance cost by protecting observable behavior, a credible regression, or an independent contract. Each contract has one primary test, its **keeper**, at the strongest boundary where the contract can be observed; another layer keeps its own test only for a risk the keeper cannot reach, such as a transport or lifecycle failure.

## Before adding a test

Answer four questions; a missing answer means the test is not ready:

1. What observable behavior, invariant, or independent contract does it protect?
2. What credible regression turns it red?
3. Why does the keeper not already catch that regression? Prefer extending a table-driven case or shared fixture over a near-duplicate test.
4. Does it need a production seam, such as an export, flag, wrapper, or injection hook, that no production caller needs? Then test at the real boundary instead.

A test that breaks under behavior-preserving refactoring asserts implementation; rewrite it at the owning boundary. A regression test must go red on the pre-fix code for the intended reason. One regression at the owner boundary covers a bug; do not replay the scenario at every layer it crosses.

## Junk patterns

A test that matches one fails the bar unless the [retention bar](#retention-bar) names the contract it independently guards:

- assertion-free coverage probes;
- self-comparisons, identity copiers, and expected values produced by the helper or renderer under test;
- copied fixtures, inventories, manifests, or export lists;
- exact source, import, or string greps;
- private predicate or call-shape tests duplicated at a real boundary;
- several invocations of the same contract, or local replays of a shared helper's tests;
- tests whose only purpose is preserving test-only exports, globals, or wrappers, and production code whose only callers are tests;
- mocks that implement the asserted behavior, or one identical mock standing in for different dependencies;
- fixtures that supply the result, ordering, or callback the owner should produce, or persistence asserted against a store the path never writes;
- capability tests that restate a declared flag instead of exercising what the flag promises;
- negative controls that pass for an unrelated reason, such as a rejection from a different guard or a branch production never reaches;
- names or fixtures that promise more than the input exercises.

## Retention bar

Keep a test that independently enforces a public API, protocol, configuration, migration, storage, security, platform, default, package, release, or architecture contract. Also keep:

- call ordering when the order is observable behavior;
- a regression with a credible failure mode;
- source inspection when it is the cheapest independent guard: it goes red when the contract changes, such as a user-facing key, byte, or path, and survives an identifier-only refactor.

A retained test that fails on an unmodified baseline is a possible product bug: reproduce it and repair the owner. Static or slow is not a reason to delete. A test that resembles implementation may still be the independent contract; prove otherwise before removing it.
