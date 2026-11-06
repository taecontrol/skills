# <Title>

Status: Draft | Accepted
Issue: <link, when there is one>

## Problem

Who has it, what it costs them, and how they cope today. Label each piece of evidence `observed`, `reported`, or `assumed`.

## Outcome

What is true for whoever has the problem when this is done, as agreed with the human, in one short paragraph.

## Out of scope

What we are deliberately not doing, and why when it is not obvious.

## Examples

The definition of success. Each one is concrete: starting state, action, and result.

- **E1** `test` — Given …, when …, then …
- **E2** `test` — Given …, when …, then … must never happen.
- **E3** `capture` — The screen matches the chosen prototype at <sizes/states>.

For each guarantee the outcome makes, write its path as a table: one row per link, one column per way the link can fail. Each cell holds the example that covers that failure, or the reason it cannot happen.

**G1** <what whoever depends on the change can rely on, stated where they act on it>

| Link | Missing | Wrong | Forged | Stale |
|---|---|---|---|---|
| built at … | E… | E… | E… | E… |
| shown at … | E… | E… | E… | E… |

When state interacts, add the state space the edge cases come from:

| State \ Operation | … | … |
|---|---|---|
| … | expected result | expected result |

## Test boundary

- **Where the tests run:** the interface (UI, API, CLI, or module seam) and the tool.
- **Real target:** the app, runtime mode, data, and platforms the examples must hold under.
- **Stand-ins:** each fake or fixture for an external system, and the observation that shows it behaves like the real one.

## Decisions

Each settled decision with a pointer to its evidence: the chosen prototype, the architecture result, a spike verdict, a data shape or contract. Each number a check imposes, such as a budget or a repetition count, names that check and carries the outcome it protects, its evidence, its measured cost per run locally and in CI, and the cost of getting it wrong. Every one-way door is here with its `architect` result, and the program design with its status when there is one.

## Rabbit holes

Known traps and how to avoid them within the decisions above. A trap that could reopen a decision is an open question.

## Context

Pointers an implementer needs: files and modules, related issues, research, spikes, prototypes, ADRs, coding standards.

## Open questions

Empty before acceptance.
