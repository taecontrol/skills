---
name: improve-codebase-architecture
description: "Run a bounded read-only scan for evidenced architecture friction, verify its visual report, and return candidates and a proposed frontier to the Coordinator."
license: MIT
---

# Improve Codebase Architecture

Use this composite discovery capability when a user identifies an area or demonstrated change friction suggests a bounded architecture review. It finds candidate opportunities; it does not edit production code, invoke human acceptance, choose a refactor, or begin delivery.

## Bound the scan

Start from a named subsystem, module, recurring change hotspot, failed repair seam, test friction, or other demonstrated friction. State the selected area, why it merits review, the evidence already known, and a file, time, or scope bound. If neither user direction nor evidence can bound the scan, return that limit to the Coordinator rather than mechanically scanning the repository.

Inspect the selected area's domain language, accepted decisions, maintained rationale, change evidence, code, tests, and dependency shape. Use a read-only explorer. Treat an existing accepted architecture decision as a constraint unless concrete friction provides evidence that reopening it is warranted.

## Find evidence-backed candidates

Apply this local minimum vocabulary so the skill remains independently usable: a **module** has an **interface** at a **seam**; **depth** produces **leverage** for callers and **locality** for maintainers; an **adapter** is justified by real variation. Examine shallow modules, scattered knowledge, leaky seams, duplicated caller coordination, and tests that cannot exercise behavior through the interface. Apply the deletion test before calling a module shallow.

Use project domain terms for proposed seams. The optional `codebase-design` skill can provide deeper shared vocabulary, and optional `domain-modeling` can resolve uncertain terms or invariants; neither is a required sibling filesystem dependency. Carry the minimum reasoning above even when they are unavailable.

For every candidate, record involved files or modules, observed friction, supporting evidence, a plain-language opportunity, expected leverage and locality, test-interface impact, risks or accepted-decision conflict, and recommendation strength: `Strong`, `Worth exploring`, or `Speculative`. Do not propose a final interface or implementation plan during this scan.

## Produce and verify a visual report

The scan itself is read-only: it never modifies production code, production configuration, or repository artifacts. Report creation is a separate artifact-write action and must be reported separately from the read-only scan. Choose exactly one artifact branch:

- **Default temporary report:** create the self-contained report at a fresh OS temporary path outside the repository and report its absolute location.
- **User-approved persistent artifact:** only after the user explicitly approves persistence and its destination, write the self-contained report at that approved destination. This artifact is not production code or production configuration; report the approved destination and write separately.

Include the scan bound, evidence, one candidate card per opportunity, before/after visualizations, recommendation strength, and the top recommendation. Use a graph or flow visual only when it clarifies relationships; otherwise use a simpler visual explanation.

In either artifact branch, before showing the report, render the exact written artifact in its intended runtime and inspect every presented candidate, diagram, and visual state. Capture rendered evidence, such as screenshots or a reproducible render record. Source inspection, static markup review, or an uninspected build is not visual verification. If rendering or inspection is unavailable or fails, return `Inconclusive` with the exact unblock condition and do not present the report as verified.

## Return candidates and frontier

Return this compact result to the Coordinator:

```text
Scan: <selected area, demonstrated friction, and bound>
Evidence: <finding — file, change, test, or rationale pointer> …
Artifact write: <temporary report at absolute path | user-approved persistent report at approved destination | no write; reason>
Visual report: <exact artifact path, verified rendered-evidence pointer | Inconclusive with unblock condition>
Candidates: <name; files/modules; friction; leverage/locality; test impact; risks; strength> …
Top recommendation: <candidate and evidence-backed reason>
Proposed decision frontier: <currently answerable decisions for the top candidate; recommendation and principal consequence for each>
Remaining uncertainty: <prerequisite and next discovery capability>
Recommendation: <next Coordinator route>
```

The Coordinator decides whether to run its human decision process and whether any candidate proceeds. An accepted refactor becomes its own vertical slice and passes the complete production delivery lifecycle. This composite does not request or record human acceptance itself.

## Completion criteria

The scan is complete only when all of the following are true:

- The selected area, demonstrated friction, evidence, and file, time, or scope bound are explicit.
- The explorer was read-only; the scan did not modify production code, production configuration, or repository artifacts.
- Any report creation is separately reported as an artifact write: the default uses a fresh OS temporary path outside the repository, while a persistent destination requires explicit user approval.
- Every candidate has concrete evidence, involved modules or files, friction, expected leverage and locality, test-interface impact, risks, and one allowed recommendation strength.
- Every shallow-module claim has a stated deletion-test result, and every seam or adapter claim is tied to real variation.
- Before presentation, the exact artifact written in either branch was rendered and every presented candidate, diagram, and visual state was inspected with rendered evidence; otherwise the result is `Inconclusive` and carries an exact unblock condition.
- The output contains candidates plus a proposed decision frontier for the Coordinator, not an acceptance request, chosen refactor, interface design, or production change.
- Any future realization is explicitly routed to an accepted vertical slice and complete delivery lifecycle.

## Provenance

- Canonical package: `improve-codebase-architecture`.
- Upstream repository: `https://github.com/mattpocock/skills`.
- Upstream revision: `885e2ca4d842d139e9aef4e48d366c63cb1b8013`.
- Upstream path: `skills/engineering/improve-codebase-architecture/SKILL.md`.
- MIT disposition: MIT upstream; this material adaptation incorporates and restructures the upstream architecture-review procedure. Copyright Matt Pocock, 2026. The adapted package remains distributed under MIT.
- Incorporation mode: material portability and Factory routing adaptation.
- Taecontrol changes: requires demonstrated bounded friction and a read-only explorer; removes required upstream support-file and sibling-skill links; turns the report into independently verifiable temporary evidence; returns candidates and a proposed frontier to the Coordinator; prohibits in-skill acceptance and production edits; and routes accepted refactors through the Factory vertical-slice lifecycle.
