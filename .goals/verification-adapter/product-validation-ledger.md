# Product Validation ledger: verification adapter

## Final validation

- Goal map: `verification-adapter-map-v9`
- Accepted slice: `verification-adapter-slice-v1`
- Project profile: `verification-adapter-profile-v1`
- Base revision: `755c150e3d765643e0641281dd540ea08fa1ad17`
- Candidate: `verification-adapter-candidate-sha256-6403d5c0020dccd14343636bd567eb11ad94be75dc6e0ea6f323ee67b94e20ca`
- Same-candidate Verifier outcome: `Pass -> Product Validator`
- Product Validator outcome: `Pass -> Coordinator commit readiness`
- Candidate digest independently reproduced before and after validation: yes

## Accepted journey

- Actor: fresh-context independent Product Validator using only durable operating guide, Feature Map, canonical CLI help, accepted contract, and candidate identity.
- Environment: fresh fixture copy under an isolated temporary root on CPython 3.9.6, Darwin arm64; unique run `pv-20260901-a91f`; no initial fixture process.
- Starting state: empty run root, `active_run:false`, counter baseline `0`.
- Action: derive exact product identity with `info`; provision; run exact-identity `doctor`; mutate via the public product CLI to `73`; wait; restart under the same owner; observe readiness; read through the public CLI and separate persistent-state seam; inspect and mechanically verify evidence; stop; cleanup twice.
- Required result: exact identities remain stable, value persists across restart, public and second seams agree, evidence is complete and checksummed, cleanup preserves proof and removes only owned runtime, and no process remains.
- Forbidden result: wrong/stale/shared target, direct state mutation as primary proof, ambiguous success, CLI acceptance verdict, secret leakage, lost evidence, unrelated deletion, or residual process.

## Direct observations

- Product, adapter, Feature Map, build procedure, environment, target, store, run, owner digest, PID, and port identities were observable and consistent.
- Provision and `doctor` completed successfully; public `get` returned `0`.
- Public product CLI `set --value 73` returned counter `73`; `wait` observed `73`.
- Restart changed generation `1 → 2` and PID/port while preserving owner digest, run, store, target, and package identities.
- Post-restart `wait` and public `get` returned `73`; `observe-persistent` reported `product_view:73` and `persistent_view:73`.
- The final manifest records `counter.set` and `counter.persistence`, 17 actual commands with timestamps and exit code `0`, five canonical relative artifacts with media type, byte size, and checksum, and completed cleanup.
- Direct checksum checks matched all five records. `verify-evidence` verified them before and after cleanup.
- Retained artifacts contained the owner digest but neither a raw owner token property nor token marker; the manifest states `secrets_recorded:false`.
- First cleanup preserved evidence; second cleanup returned `repeated:true`; final runtime was absent, `active_run:false`, and no copied-fixture process remained.

## Fidelity and route

- Covered supported local product-CLI/localhost behavior. Browser, GUI, external pilots, and production environments are explicitly unsupported and outside the accepted slice.
- Tests and static inspection were not used as product-journey proof.
- Earliest divergence: none.
- Route: exact candidate is eligible for Coordinator completion audit and focused local commit.
