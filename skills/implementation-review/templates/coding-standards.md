# Coding standards

After the project accepts the destination and rules, adapt this seed into a committed root `CODING_STANDARDS.md` or the repository's established durable standards location. Keep project-specific rules here when they change review decisions and are not already enforced by formatters, linters, compilers, or CI. The reviewer applies the resulting file in addition to its shared strategic standard. Remove rules that become automated or no longer describe intended policy.

## Test evidence

- Every retained test protects a distinct observable behavior or material failure mode and can fail for a plausible defect.
- Derive expected results from an independent source of truth such as an accepted contract, worked example, known-good fixture, or external oracle.
- Do not retain tautological tests that repeat the production algorithm, copy production logic, compare a value with itself, or approve current output only because it is current.
- Prefer the highest faithful stable seam. Keep coverage at multiple seams only when each test protects a different risk.

## Durable names and dependencies

- Name tests with durable domain vocabulary that states the actor, behavior, and observable result.
- Do not use goal-map, slice, finding, branch, or disposable-workspace identifiers in production code, retained test names, fixtures, or maintained documentation unless the identifier is part of a durable product or external contract.
- Do not make retained artifacts depend on ignored goal files, local evidence, ambient configuration, or other undeclared workspace state.
- Production code, retained tests, fixtures, and maintained documentation must remain understandable and usable after `.goals/` is deleted.

## Project rules

Add only accepted rules that a reviewer can apply to a concrete diff. Put detailed architecture, domain, security, or testing guidance in its maintained document and link it here with the exact condition that requires the reviewer to read it.
