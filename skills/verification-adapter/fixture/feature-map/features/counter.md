# Counter value and persistence

## Sub-features

- `counter.set` — a user sets an integer through the public product CLI and sees
  that value on a subsequent public read.
- `counter.persistence` — the value survives an owned service restart and is
  present through both the public read and a separate read-only state-file view.
- Validation/error — non-integer CLI input is rejected before mutation.
- Empty — the deterministic initial value is `0`.
- Loading/streaming, cancel/undo, permission variants, and gated variants are not
  applicable because this local CLI action is synchronous, unprivileged, and has
  no feature gate or cancellable intermediate state.

## How to get to it (user POV)

The only supported entry point is the public product CLI:
`python3 product_cli.py --root <root> --run-id <run> set --value <integer>`.
Read the visible value with the same interface and `get`. GUI and browser paths
are unsupported and remain separate, unverified entry points.

## Driving it with counter fixture CLI

Precondition: provision an isolated run and require
`doctor --candidate <digest>` to complete with matching expected and observed
identity.

1. Run `python3 product_cli.py --root <root> --run-id <run> set --value 7`.
   Expected observable state: JSON reports the public operation completed and
   the visible counter is `7`. Required proof: recorded product command and
   result in the run manifest.
2. Run `python3 verify.py --root <root> --run-id <run> restart`.
   Expected observable state: a new service generation retains the same owned
   state namespace.
3. Run `python3 verify.py --root <root> --run-id <run> observe-persistent --expected 7`.
   Expected observable state: public API and separate read-only state-file view
   both report `7`. Required proof: the checksummed persistence artifact.
4. Run `python3 verify.py --root <root> --run-id <run> verify-evidence --candidate <digest>`
   after stopping the service. Expected observable state: all exact identities,
   sizes, and checksums validate.

## Gotchas

- A reachable port is insufficient; a wrong candidate, owner, adapter, target,
  capability set, or state file makes `doctor` fail.
- A timed-out wait or disagreement between product and state-file views is not
  success and must be judged `Inconclusive` by Product Validator unless the
  accepted result is otherwise disproved.
- Changing product or adapter inputs invalidates retained evidence.
- `clean` is ownership-scoped and keeps proof artifacts. Do not delete a runtime
  whose current owner cannot be observed.
