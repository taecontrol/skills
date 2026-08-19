---
name: architecture-design
description: "Develop evidence-backed alternatives for an expensive-to-reverse architecture question and return the proposed decision frontier to the Coordinator."
license: MIT
---

# Architecture Design

Use this Taecontrol-authored composite discovery capability when an interface, dependency, ownership, persistence, failure, security, recovery, or validation choice is expensive to reverse and current evidence cannot settle it. It designs the current consequential question, not the entire future system. It never edits production code, invokes human acceptance, or treats a proposed direction as accepted.

## Bound the question

Before exploring, state:

- the one expensive-to-reverse question;
- why existing evidence cannot settle it;
- the decision it blocks or materially changes;
- accepted decisions, constraints, protected behavior, and relevant repository facts;
- the observable evidence that would reduce the uncertainty; and
- a time, cost, or scope bound.

Inspect existing code, accepted decisions, project profile, maintained rationale, and relevant validation paths before proposing a shape. Respect accepted constraints; a contradiction is evidence for the Coordinator, not a silent redesign.

## Build alternatives from evidence

1. Apply the local deep-module minimum: identify each affected module, its interface obligations, the seam, and the expected leverage and locality. This is interoperable with the optional `codebase-design` skill, but does not require it to be installed.
2. When concepts or invariants are uncertain, apply the local domain minimum: distinguish proposed from accepted terms, stress-test ordinary, edge, and failure scenarios, and return model questions. The optional `domain-modeling` skill can deepen that discovery without becoming a required filesystem dependency.
3. If source inspection cannot settle an empirical uncertainty, route a bounded question to optional `research`, `spike`, or `prototype` capability as appropriate. Carry their evidence and limits forward; do not substitute an unrun proposal for empirical evidence.
4. Compare at least two plausible shapes when real alternatives exist. If only one shape remains after constraints are evidenced, state the eliminated alternatives and why rather than inventing a false comparison.
5. Cover only concerns that apply: invariant ownership, interfaces, dependency direction, data ownership, persistence, failure behavior, concurrency, recovery, security, and a faithful validation path.
6. Separate reversible local implementation choices from material decisions. Leave reversible choices for the accepted delivery slice.

## Return a proposed frontier

Return this result to the Coordinator:

```text
Question and bound: <expensive-to-reverse question; decision relevance; exploration bound>
Evidence: <repository fact, research, spike, prototype, or constraint — pointer> …
Alternatives: <shape; applicable concerns; benefits; costs; rejected or remaining risks> …
Proposed decision frontier: <each currently answerable human-owned decision, recommendation, and principal consequence>
Remaining uncertainty: <unsettled prerequisite and the capability or observation needed>
Validation path: <how an accepted realization can be proved through a faithful product interface>
Recommendation: <next Coordinator route>
```

The Coordinator decides whether the frontier is ready for its human decision process, records acceptance, and routes accepted realization into a production vertical slice. If the accepted rationale would otherwise be lost, the optional `adr` skill may record it after acceptance; if unavailable, return the minimum rationale-recording handoff. This composite does not invoke that acceptance or create an ADR itself.

## Completion criteria

Architecture design is complete only when all of the following are true:

- One expensive-to-reverse question, its decision relevance, current evidence gap, and exploration bound are explicit.
- Existing code, accepted decisions, project constraints, and maintained rationale relevant to the question were inspected or their absence is recorded.
- The result identifies affected modules, interface obligations, seams, and expected leverage or locality; uncertain domain concepts have proposed terms and scenarios rather than hidden assumptions.
- Every empirical claim is supported by evidence or routed to a bounded discovery capability with a stated limit.
- At least two real alternatives are compared, or evidence explains why alternatives were eliminated rather than fabricated.
- Applicable ownership, dependency, data, failure, concurrency, recovery, security, and validation concerns are addressed; inapplicable concerns are not ceremonial requirements.
- The output is a proposed human-owned decision frontier for the Coordinator, with recommendations and principal consequences, not an acceptance request or production edit.
- An accepted realization is explicitly deferred to a production vertical slice and complete delivery lifecycle.

## Provenance

- Canonical package: `architecture-design`.
- Canonical repository: `https://github.com/taecontrol/skills.git`.
- Source commit: `d7cef91264450e72ad28f396fbed28c3d2e22d2e`.
- Upstream baseline: no single distributable upstream package.
- Source basis: Taecontrol-authored composition from `docs/software-factory-v0.1.md` and `docs/software-factory-v0.1-skill-library.md` at the source commit in the canonical repository.
- Incorporation mode: Taecontrol-authored; no upstream skill text copied.
- Taecontrol changes: defines a bounded, evidence-driven composite for consequential architecture questions; carries independent local minimum behavior for optional design, domain, research, spike, prototype, and ADR capabilities; returns a proposed decision frontier only to the Coordinator; and prohibits production edits and in-skill human acceptance.
