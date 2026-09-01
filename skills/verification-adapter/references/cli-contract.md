# Project-local CLI contract

Use this contract while creating or changing the target project's canonical
verification CLI. Command names may follow the project, but `--help` must state
commands, flags, defaults, examples, and exit semantics.

## Identity and health

- `info` reports project/checkout, expected target, candidate/build, adapter,
  Feature Map, environment, active `run_id`, and artifact location without
  claiming that the product is healthy.
- `doctor` compares expected and observed candidate, target, run ownership, data
  store, and required capabilities. A listening process or open page alone is
  insufficient. Unreachable, stale, wrong, shared, unauthorized, incomplete, or
  unknown state exits non-zero with a structured reason.
- Every stateful command requires an explicit `run_id`. Runs own separate ports,
  processes, profiles/data directories, fixtures, and temporary resources.
  Targeting a shared/default or user-owned instance requires an explicit target
  plus acknowledgement; projects may reject it entirely.

Completion: substituting any expected identity, target, owner, or data store makes
`doctor` fail even when something remains reachable.

## Lifecycle and ownership

- Provision or launch the exact candidate, then wait on observable readiness with
  a bounded timeout. Never use a fixed sleep as proof of readiness. After a
  process is spawned, any readiness read, parse, or identity failure terminates
  that directly owned child before the command returns.
- Restart or reconnect without transferring run ownership or silently changing
  data stores.
- Stop only a process whose current identity and ownership match the run record.
  PID presence alone does not prove ownership.
- Clean only namespaced resources with known ownership. Unknown ownership blocks
  deletion. Cleanup is idempotent and preserves manifests and proof artifacts.
- Record late, repeated, partial, timed-out, and failed lifecycle operations.
  Recovery cannot relabel an earlier failure as success.

Completion: two concurrent runs remain disjoint, repeating cleanup is safe, and a
forged or missing owner prevents process termination and resource deletion.

## Product control and observation

Expose only operations required by supported real surfaces: browser semantics,
desktop accessibility, documented API, CLI/PTY, simulator, or mobile automation.
Prefer stable public handles such as accessible role/name, registered command ID,
public route or field, and explicit test ID. Document weaker fallbacks.

Provide inspection before action, user-visible interaction, bounded waits for
observable end states, and relevant visual, semantic, console, process, network,
RPC, or application evidence. Confirm persistent effects through a second
faithful read-only seam. Never call an internal success handler as product proof.

Unsupported paths are named and return a structured non-zero result. One supported
entry point cannot be reported as verification of another.

Completion: the CLI can demonstrate a real action and a separate persistent
observation, while unsupported and ambiguous paths cannot produce success.

## Result semantics

The CLI reports only `completed`, `failed`, `unsupported`, `unknown`, `stale`,
`timeout`, or another project-specific control state. Success means the requested
control operation completed as specified. It never means the accepted product
journey passed. Product Validator alone interprets observations as `Pass`, `Fail`,
or `Inconclusive`.
