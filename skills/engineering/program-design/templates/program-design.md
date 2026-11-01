# <Title>: program design

Status: Draft | Accepted
Spec: <path or issue>. Brief: <path, when there is one>. Grounded on: <revision>.

## Where things live

The file tree diff of the change: `+` new, `~` changed, one line per entry saying what it holds. Folders first; individual files only where their split is a decision.

## Key types

The types that carry the spec's invariants, and the mistake each one refuses, in one line each: "an `InstanceId` can't be built from a name, so a name never becomes a key".

## Signatures that matter

The few signatures callers depend on, with their owner file. Not every function.

## Call paths

The spec's most important examples walked through the modules, each in production and in tests, with the examples they serve:

```text
Production                         Tests
entry → module → module            entry → module → fake
```

## What each module hides

| Module | Hides | So callers never |
|---|---|---|

## Errors

Where each kind of failure is handled and what the caller gets.

## Changes elsewhere

What changes in existing components outside the new code, and why.

## Not decided here

Behaviour (the spec), cross-component contracts and one-way doors (the brief), build order, function bodies.
