---
name: shape
description: "Shape a problem with the human into one accepted spec: what to build, what success means, and how to prove it, before anyone writes production code. Invoke when the user brings a problem, issue, or feature to work on, or opens its design phase."
---

# Shape

Shaping decides **what** and **how we will know**, not how to build it. The result is one short spec, accepted by the human, that holds or points to everything an agent needs to deliver it without asking again. Everything downstream is only as good as this document, so take the time to get it right: this is the collaborative part of the work.

Write in the user's language.

## Roles

The human decides the problem, the scope, the examples that define success, and every cut. You settle facts: read the code, issues, data, and history; run experiments; prepare options. A question whose answer you could observe is yours, not the human's. Ask one decision at a time, in order, and never ask about UI without something to look at.

## Process

1. **Understand the problem.** Who has it, what it costs them, how they cope today, and the evidence, labeled `observed`, `reported`, or `assumed`. Read the issue, the affected code, related and duplicate issues, and where the system actually runs. Before converging, zoom out: list the options, including an existing tool or package and doing nothing.
2. **Size it.** The spec must fit one pull request. When it does not, propose a split into separate issues, each shippable and verifiable on its own; create them after the human agrees, then shape one.
3. **Settle uncertainty with the cheapest faithful evidence.** Use `prototype` for a screen, flow, or logic model; `spike` for feasibility or tool behavior; `research` for outside facts; `architect` for a costly-to-reverse boundary. Show the artifacts and let the human react. Decide the direction before writing examples, so they describe it.
4. **Write the examples.** They are the definition of success. Cover the happy path, the edges, the failures, and what must never happen. When state interacts (concurrency, retries, ordering, partial failure, fields that change other fields), enumerate the states against the operations so the edge cases come from the table, not from memory. When performance matters, add the budgets the change must hold, as counts a check can enforce, such as queries or round trips per operation. Mark each example `test` when it can be automated at the test boundary, or `evidence` when a person or agent must look, such as fidelity to the chosen prototype.
5. **Fix the test boundary.** Name where the acceptance tests run (UI, API, CLI, or a module seam) and the real target conditions they must hold under: the actual app and runtime mode, representative data, the platforms CI uses. Use the project's verification method from its agent instructions; when it has none that can run these examples, `setup-verification` comes first.
6. **Accept.** Present the spec plainly: the problem and the bet first, then the examples, then decisions and cuts. Resolve every open question. Mark it `Accepted` only after the human explicitly accepts what they saw; when a later change alters the examples or scope, present it and ask again. Then give the spec's absolute path and stop: `deliver` takes it from here.

## The spec

Write it from [the template](templates/spec.md) at the path the user gives, an established convention for local work files, or `.work/specs/<slug>.md`. It stays out of version control: when nothing ignores it, add its directory to the repository's exclude file, `$(git rev-parse --git-common-dir)/info/exclude`. Keep it short; point to sources instead of restating them. Example labels such as `E3` live only here: durable files get names that say what they are.

The spec is temporary. Knowledge that must outlive it moves to its owner during delivery: behavior into tests, rationale into an ADR, vocabulary into the glossary, project-wide rules into agent instructions.

## Done

An accepted spec states the problem with labeled evidence, the examples that define success with their test boundary and real target, the decisions with pointers to their evidence, and what is out of scope, with no open questions left. No production code was written.
