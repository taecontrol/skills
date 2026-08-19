---
name: cleaner
description: "Repair local implementation and design defects in an accepted production candidate, run applicable project-profile gates, and freeze reproducible evidence for independent verification."
license: MIT
---

# Cleaner

Use this write-role capability after an Implementer has produced an accepted production slice, or after a Verifier or Product Validator returns a repairable finding. It repairs the candidate inside accepted decisions, hardens its local design, runs the applicable project-profile gates, and hands an immutable materialization to independent judgment. It is neither a report-only review nor an authority to redefine behavior, public interfaces, sensitive policy, consequential architecture, or external-effect policy.

## Establish the repair boundary

Inspect the accepted slice contract, goal-map and project-profile identities, candidate base and current diff, protected behavior, prior evidence, and every open finding. Reject superseded inputs.

Classify each observed problem before changing it:

- **Local repair** — correctness, error handling, regression protection, duplication, dead debris, shallow local structure, information leakage, dependency direction, or avoidable complexity that can be repaired within accepted decisions.
- **Resynchronize** — evidence challenges an accepted behavior, public interface, sensitive policy, consequential architecture, gate policy, or approved cost.
- **Blocked** — a required tool, access, environment, or materialization capability is unavailable; state the owner and exact unblock condition.

Repair local causes, not only symptoms. The write boundary includes necessary code and test refactoring beyond originally changed lines when it removes the demonstrated local cause. Preserve behavior-oriented proof through stable interfaces; do not add implementation-coupled tests merely to raise a metric.

## Clean and harden the candidate

1. Make the smallest coherent repairs for every local finding. Re-run the tight project-profile feedback loop after each meaningful change.
2. Inspect the resulting modules for incomplete failure behavior, accidental duplication, dead implementation debris, shallow interfaces, scattered policy, leaky seams, dependency violations, and change amplification. Deepen or simplify locally when doing so remains inside accepted decisions.
3. Run every gate activated by the slice and project profile at its required cadence. This can include focused and adjacent regression tests, build/parse/type checks, formatting and static analysis, declared architecture checks, coverage or complexity analysis, mutation testing, integration checks, and required product-supporting checks. Do not invent universal commands, thresholds, or gates.
4. For each required gate, record exactly one status: `Pass`, `Pre-authorized disposition`, `Resynchronize`, or `Blocked`. A disposition identifies the applicable project-profile rule and matching evidence. `Resynchronize` and `Blocked` do not satisfy the gate.
5. When a repair changes the candidate, rerun every affected gate. For any expensive gate claimed unaffected, record the dependency reasoning that keeps its earlier evidence valid.

## Freeze the verification candidate

Before independent verification, freeze one immutable, reproducible pre-commit candidate materialization. Record:

- the candidate identity, base revision, exact source-tree or patch digest, and included tracked and untracked artifacts;
- behavior-affecting generated outputs or the reproducible procedure that creates them;
- dependency locks, permitted configuration classes, fixtures and test data, and validation-driver and environment identities; and
- each gate's command or adapter, exact candidate identity, status, evidence pointer, and any valid disposition or unaffected-evidence rationale.

Unlisted workspace state is excluded. The materialization must be reproducible without undeclared ignored files, local outputs, ambient configuration, or secrets. If the harness cannot create or identify it, return `Blocked` with that unsupported guarantee and exact unblock condition.

Return exactly one outcome; do not judge the candidate as independently verified:

- **Candidate ready for Verifier** — every required gate is `Pass` or has a valid `Pre-authorized disposition`, and the frozen materialization and complete evidence ledger are present. Only this outcome may dispatch to the independent Verifier.
- **Resynchronize to Coordinator** — one or more gates are `Resynchronize`, or evidence materially challenges an accepted decision. Include the challenged decision, gate or finding identity, and evidence. Do not dispatch to the Verifier.
- **Blocked to owner** — one or more gates are `Blocked`, or the required materialization cannot be created or identified. Include the owner and exact unblock condition. Do not dispatch to the Verifier.

A repairable finding from independent verification or product validation returns here with its stable identity and evidence.

## Return record

Return a compact handoff, backed by the preserved materialization:

```text
Candidate: <immutable identity; base; source/patch digest>
Repairs: <finding ID; local cause; changed surface; proof> …
Gate ledger: <gate ID; candidate identity; Pass | Pre-authorized disposition | Resynchronize | Blocked; evidence; rationale when applicable> …
Materialization: <included artifacts; generated-output procedure; locks/config/test data/driver/environment identities>
Outcome: <Candidate ready for Verifier | Resynchronize to Coordinator | Blocked to owner>
Route details: <Verifier candidate identity | challenged decision and evidence | owner and exact unblock condition>
```

This record accompanies repaired code, executed gates, and a frozen candidate. It never substitutes for them.

## Completion criteria

Cleaning is complete only when all of the following are true:

- The accepted contract, project-profile identity, candidate base and diff, protected behavior, and open findings were inspected; superseded input was rejected.
- Every repairable local defect found in the accepted boundary was repaired and receives behavior-oriented proof or evidence that it was already protected.
- No observed material decision challenge was silently repaired; each is routed as `Resynchronize` to the Coordinator.
- Every applicable required gate has an exact recorded status and evidence; only `Pass` or a profile-valid `Pre-authorized disposition` can satisfy it.
- Changed candidates reran affected gates, and every retained expensive gate has a recorded unaffected-evidence rationale.
- A reproducible immutable candidate materialization records its complete declared surface and excludes undeclared workspace state, ambient configuration, and secrets.
- The return record has exactly one outcome. It may name a candidate for independent verification only when every required gate is `Pass` or has a valid `Pre-authorized disposition`; otherwise it routes only to the Coordinator or named owner.

## Provenance

- Canonical package: `cleaner` in `https://github.com/taecontrol/skills.git`.
- Source commit: `d7cef91264450e72ad28f396fbed28c3d2e22d2e`.
- Upstream baseline: no distributable upstream baseline.
- Source basis: Taecontrol-authored from `docs/software-factory-v0.1.md` and `docs/software-factory-v0.1-skill-library.md` in the canonical skills repository.
- Incorporation mode: Taecontrol-authored; no upstream skill text copied.
- Taecontrol changes: defines Cleaner as a write role with accepted-decision boundaries; requires local repair rather than review-only reporting; records the four Factory gate dispositions; and freezes a reproducible pre-commit candidate materialization for independent verification.
