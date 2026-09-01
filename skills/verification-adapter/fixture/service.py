#!/usr/bin/env python3
"""Local counter service used by this fixture's product CLI."""

from __future__ import annotations

import argparse
import json
import os
import signal
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any

from common import (
    TARGET_ID,
    atomic_write_json,
    build_procedure_digest,
    candidate_digest,
    environment_identity,
    read_json,
)


def parser() -> argparse.ArgumentParser:
    value = argparse.ArgumentParser(description="Run the fixture counter service")
    value.add_argument("--runtime-dir", required=True)
    value.add_argument("--ready-file", required=True)
    value.add_argument("--run-id", required=True)
    value.add_argument("--owner-token", required=True)
    value.add_argument("--candidate", required=True)
    value.add_argument("--adapter", required=True)
    value.add_argument("--generation", type=int, required=True)
    return value


def main() -> int:
    args = parser().parse_args()
    if args.candidate != candidate_digest():
        raise SystemExit("candidate digest does not match the executable product source")
    runtime = Path(args.runtime_dir).resolve()
    state_path = runtime / "state.json"
    if not state_path.exists():
        atomic_write_json(state_path, {"counter": 0})

    identity = {
        "run_id": args.run_id,
        "owner_token": args.owner_token,
        "candidate_digest": args.candidate,
        "adapter_digest": args.adapter,
        "build_procedure_digest": build_procedure_digest(),
        "environment": environment_identity(),
        "target": TARGET_ID,
        "data_store": str(state_path),
        "pid": os.getpid(),
        "generation": args.generation,
        "capabilities": ["health", "counter.read", "counter.write"],
    }

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, format: str, *values: Any) -> None:
            print(format % values, flush=True)

        def send_json(self, status: int, payload: dict[str, Any]) -> None:
            encoded = json.dumps(payload, sort_keys=True).encode()
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(encoded)))
            self.end_headers()
            self.wfile.write(encoded)

        def do_GET(self) -> None:
            if self.path == "/health":
                self.send_json(200, identity)
                return
            if self.path == "/counter":
                self.send_json(200, {"counter": read_json(state_path)["counter"]})
                return
            self.send_json(404, {"error": "not_found"})

        def do_POST(self) -> None:
            if self.path != "/counter":
                self.send_json(404, {"error": "not_found"})
                return
            try:
                length = int(self.headers.get("Content-Length", "0"))
                payload = json.loads(self.rfile.read(length).decode())
                counter = payload["counter"]
                if isinstance(counter, bool) or not isinstance(counter, int):
                    raise ValueError("counter must be an integer")
            except (KeyError, ValueError, json.JSONDecodeError):
                self.send_json(400, {"error": "invalid_counter"})
                return
            atomic_write_json(state_path, {"counter": counter})
            self.send_json(200, {"counter": counter, "operation": "set"})

    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    port = int(server.server_address[1])
    atomic_write_json(
        Path(args.ready_file),
        {**identity, "port": port},
    )
    signal.signal(
        signal.SIGTERM,
        lambda _signum, _frame: threading.Thread(
            target=server.shutdown, daemon=True
        ).start(),
    )
    try:
        server.serve_forever(poll_interval=0.05)
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
