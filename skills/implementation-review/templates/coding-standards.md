# Coding standards

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
