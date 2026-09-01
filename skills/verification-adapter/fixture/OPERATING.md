# Counter fixture operating guide

Run commands from this directory with Python 3. Use a unique `run_id`, an
isolated `--root`, and the immutable digest of the candidate under review.
Start with `doctor`; its success means only that the expected service is safely
operable. Judge the product journey from direct observations and artifacts.

<!-- verification-commands: info provision doctor restart stop clean capture wait observe-persistent check-support verify-evidence -->

The canonical verification commands are `info`, `provision`, `doctor`,
`restart`, `stop`, `clean`, `capture`, `wait`, `observe-persistent`,
`check-support`, and `verify-evidence`. `python3 verify.py --help` owns flags,
defaults, exit behavior, and examples.

## Fresh-context recipe

1. Read this guide and [Feature Map index](feature-map/index.md).
2. Read the product content identity without launching it:
   `python3 verify.py --root <root> --run-id <run> info`. Copy the reported
   `candidate_digest`; do not invent or reuse one from another checkout.
3. Provision with that explicit candidate:
   `python3 verify.py --root <root> --run-id <run> provision --candidate <digest>`.
4. Compare expected and observed identities:
   `python3 verify.py --root <root> --run-id <run> doctor --candidate <digest>`.
5. Perform the real user action:
   `python3 product_cli.py --root <root> --run-id <run> set --value 7`.
6. Restart the owned process, then use the separate read-only persistence view:
   `python3 verify.py --root <root> --run-id <run> restart` and
   `python3 verify.py --root <root> --run-id <run> observe-persistent --expected 7`.
7. Stop, verify manifest identities and checksums, then clean:
   `python3 verify.py --root <root> --run-id <run> stop`,
   `python3 verify.py --root <root> --run-id <run> verify-evidence --candidate <digest>`,
   and `python3 verify.py --root <root> --run-id <run> clean`.

The CLI surface is supported. GUI, browser, and direct internal-handler paths are
unsupported; confirm this with `check-support --surface <name>`. An unsupported
entry point cannot be replaced by evidence from the product CLI.

Evidence remains under `<root>/evidence/<run>/` after cleanup. It contains no
tokens or product-acceptance field. Return observations and limitations to the
Product Validator, who independently reports `Pass`, `Fail`, or `Inconclusive`.
