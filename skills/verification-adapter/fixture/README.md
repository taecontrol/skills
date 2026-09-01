# Counter verification fixture

This directory is a self-contained sample project. Its public product is
`product_cli.py`; `verify.py` is a separate project-local verification CLI. Both
use only the Python 3 standard library and work after this directory is copied
out of the repository.

Ask the adapter to derive the executable product's content identity, then run the
complete journey against that exact digest:

```bash
ROOT="$(mktemp -d)"
CANDIDATE="$(python3 verify.py --root "$ROOT" --run-id demo info | python3 -c 'import json, sys; print(json.load(sys.stdin)["candidate_digest"])')"
python3 verify.py --root "$ROOT" --run-id demo provision --candidate "$CANDIDATE"
python3 verify.py --root "$ROOT" --run-id demo doctor --candidate "$CANDIDATE"
python3 product_cli.py --root "$ROOT" --run-id demo set --value 7
python3 verify.py --root "$ROOT" --run-id demo restart
python3 verify.py --root "$ROOT" --run-id demo observe-persistent --expected 7
python3 verify.py --root "$ROOT" --run-id demo stop
python3 verify.py --root "$ROOT" --run-id demo verify-evidence --candidate "$CANDIDATE"
python3 verify.py --root "$ROOT" --run-id demo clean
```

Each command prints one JSON control result and exits non-zero for unsafe,
stale, unsupported, timed-out, ambiguous, or invalid-evidence states. No result
is a product-acceptance verdict. See [OPERATING.md](OPERATING.md) and the
[Feature Map](feature-map/index.md) for fresh-context operation.

Run the black-box contract suite:

```bash
python3 -m unittest discover -s tests -v
```

The fixture demonstrates one project-specific implementation. Target projects
must build the mechanism that fits their own products and toolchains; copying
this runtime is neither required nor recommended.
