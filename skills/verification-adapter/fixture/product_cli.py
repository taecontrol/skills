#!/usr/bin/env python3
"""User-facing CLI for the fixture counter product."""

from __future__ import annotations

import argparse
import json
import sys

from common import (
    ControlError,
    assert_observed_identity,
    build_procedure_digest,
    candidate_digest,
    environment_identity,
    execute_recorded,
    http_json,
    load_metadata,
    mark_features_exercised,
    paths_for,
)


def make_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Read or set the counter through the product's public CLI interface."
    )
    parser.add_argument("--root", required=True)
    parser.add_argument("--run-id", required=True)
    commands = parser.add_subparsers(dest="command", required=True)
    commands.add_parser("get", help="read the visible counter")
    set_command = commands.add_parser("set", help="set the visible counter")
    set_command.add_argument("--value", type=int, required=True)
    return parser


def product_operation(args: argparse.Namespace, paths):
    def run():
        metadata = load_metadata(paths)
        expected_inputs = {
            "candidate_digest": candidate_digest(),
            "build_procedure_digest": build_procedure_digest(),
            "environment": environment_identity(),
        }
        mismatches = {
            key: {"expected": value, "recorded": metadata.get(key)}
            for key, value in expected_inputs.items()
            if metadata.get(key) != value
        }
        if mismatches:
            raise ControlError(
                "stale_or_wrong_target",
                "product CLI inputs do not match the provisioned run",
                details=mismatches,
            )
        identity = http_json(int(metadata["port"]), "GET", "/health")
        assert_observed_identity(metadata, identity)
        if args.command == "get":
            result = http_json(int(metadata["port"]), "GET", "/counter")
        else:
            result = http_json(
                int(metadata["port"]), "POST", "/counter", {"counter": args.value}
            )
            mark_features_exercised(paths, ["counter.set"])
        return {
            "status": "completed",
            "interface": "product-cli",
            "operation": args.command,
            **result,
        }

    return run


def main(argv: list[str] | None = None) -> int:
    raw = list(sys.argv[1:] if argv is None else argv)
    args = make_parser().parse_args(raw)
    try:
        paths = paths_for(args.root, args.run_id)
        exit_code, payload = execute_recorded(
            paths, ["product-cli", *raw], product_operation(args, paths)
        )
    except ControlError as error:
        exit_code, payload = error.exit_code, error.payload()
    stream = sys.stdout if exit_code == 0 else sys.stderr
    print(json.dumps(payload, sort_keys=True), file=stream)
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
