---
name: tdd
description: "Use an optional test-driven strategy for an accepted slice when its evidence justifies the cost."
---

# Test-driven development

## Process

1. Use this strategy only when the project profile or human selects it for an accepted slice or bounded experiment. Start with the accepted behavior, protected behavior, project profile, and a faithful validation path.
2. Choose the least costly approach that can produce trustworthy evidence. Strict red-green, small test-after increments, and behavior-first work followed by hardening are all valid choices. State why the choice fits this slice.
3. Work one vertical observable behavior at a time. Use the narrowest stable interface that preserves its meaning. Derive expected results from the accepted contract, a worked example, or another independent source of truth.
4. Use a red-capable test or equivalent reproduction when it can expose the old behavior or a plausible defect, and follow any project-profile requirement. When that evidence is impractical, record the reason and use the strongest faithful alternative.
5. After each increment, run the profile's tight feedback checks. Keep tests focused on observable behavior rather than private collaborators, copied production logic, or incidental side channels.
6. Record evidence that lets the team judge the strategy: time to an accepted candidate, defects found later, test sensitivity when measured, repair rounds, and breakage caused by test coupling. Record what was not measured.
7. Route the candidate and evidence to Cleaner. Cleaner owns broader cleanup, applicable gates, materialization, and the handoff for independent verification.

## Completion criteria

TDD work is complete when:

- A profile or human selected it for a named accepted slice or experiment.
- Each completed increment proves an observable behavior through a stable interface.
- The evidence can expose a plausible defect when feasible. Any weaker alternative states its limit.
- Retained tests use an independent expected result and avoid implementation coupling.
- The record shows the selected approach, its evidence, and its limits. It judges the approach by results, not ritual.
- New material decisions route to the Coordinator. The candidate routes to Cleaner and is not declared delivered here.
