---
name: improve-codebase-architecture
description: "Run a bounded read-only architecture scan, verify its visual report, and return candidates and a decision frontier to the Coordinator."
---

# Improve codebase architecture

Find evidence-backed architecture opportunities in a bounded area. The scan is read-only. It does not choose a refactor, accept a decision, or begin delivery.

## Process

1. Bound the scan to a named subsystem, module, recurring hotspot, failed repair seam, test friction, or other demonstrated friction. Record the area, evidence, and file, time, or scope limit. If no direction or evidence can bound it, return `Inconclusive` to the Coordinator with the missing direction or evidence and exact bound needed. Do not create a report.
2. Inspect the selected area's domain language, accepted decisions, rationale, change evidence, code, tests, and dependency shape with read-only tools. Treat accepted decisions as constraints unless concrete friction justifies reopening them.
3. Identify candidates from shallow modules, scattered knowledge, leaky seams, duplicated caller coordination, or tests that cannot exercise behavior through an interface. For each candidate, record involved files or modules, observed friction, evidence, opportunity, expected leverage and locality, test impact, risks or decision conflicts, and `Strong`, `Worth exploring`, or `Speculative`. Apply the deletion test before calling a module shallow. Tie every seam or adapter claim to real variation. Do not design a final interface or implementation plan.
4. Create one self-contained visual report:
   - Write a default report to a fresh OS temporary path outside the repository.
   - Write a persistent report only after explicit user approval of its destination.
   Report the artifact write separately from the read-only scan.
5. Render the exact written report in its intended runtime and inspect every presented candidate, diagram, and visual state. Preserve a screenshot or equivalent rendered output for every presented visual state, plus the reproducible render command and environment record. If rendering or inspection fails or is unavailable, return `Inconclusive` with the exact unblock condition. Do not present the report as verified.

## Return

Return exactly one outcome:

- `Verified`: scan bound and evidence; artifact branch and absolute path; rendered-evidence pointer; candidates; top recommendation; proposed decision frontier; remaining uncertainty; and next Coordinator route.
- `Inconclusive`: evidence and attempts, any artifact created, exact blocker, owner, and unblock condition. It does not require a verified report, candidates, or frontier.

Done means one branch is complete. `Verified` requires a read-only scan and verified report. `Inconclusive` requires a precise unblock route. A selected refactor needs its own accepted delivery slice.
