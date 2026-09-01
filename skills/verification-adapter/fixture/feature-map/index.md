# Counter Feature Map

## Baseline and identities

- Product: local counter service with a public product CLI.
- Launch: `provision` receives the exact candidate digest and binds an ephemeral
  localhost port after creating a namespaced state directory.
- Data: each run starts at counter value `0`; only that run's product CLI may
  mutate it.
- Last reconciled candidate: not reconciled until an explicit candidate is
  provisioned.
- Last reconciled adapter: not reconciled until `provision` computes the local
  script digest.

## Driver, isolation, cleanup, and proof

Every verification invocation uses `python3 verify.py --root <root> --run-id
<run>`. `run_id` owns its process, port, runtime directory, state file, and
evidence namespace. Reserved shared/default names require explicit acknowledgement;
unknown ownership blocks stop and deletion. Cleanup removes runtime state but
preserves manifest-backed evidence.

Required proof is a successful exact-identity `doctor`, the recorded product-CLI
action, a restart, agreement between the public product read and the separate
read-only state-file observation, and verified artifact checksums.

<!-- verification-commands: info provision doctor restart stop clean capture wait observe-persistent check-support verify-evidence -->

Supported surface: `product-cli`. Unsupported surfaces: GUI, browser, and direct
internal handlers. Evidence from the supported surface cannot verify an
unsupported entry point.

## Features and journeys

- [Counter value and persistence](features/counter.md): `counter.set` and
  `counter.persistence`.
