# Evidence contract

Write one stable, machine-readable manifest per `run_id`; JSON is preferred unless
the project already owns another format. Update it atomically. Store proof outside
temporary runtime resources so ownership-safe cleanup cannot remove it.

## Required identity and history

Record:

- schema version and `run_id`;
- source revision and immutable candidate/build digest;
- adapter/driver revision or digest;
- Feature Map revision plus exercised feature/sub-feature IDs;
- relevant lockfile and build-procedure identity;
- non-secret environment, target, data-store, and run-owner identity;
- ordered commands/actions with start and finish timestamps and exit status;
- observations and relative artifact paths;
- each artifact's media type, byte size, and cryptographic checksum;
- cleanup outcome; and
- limitations, unsupported steps, timeouts, and ambiguous observations.

Capture stdout, stderr, exit status, and timestamp when the target toolchain can do
so without recursively changing an artifact being checksummed. Normalize or
redact credentials, tokens, cookies, and sensitive user data before persistence;
record that redaction occurred and ensure it does not erase judgment evidence.

## Integrity and freshness

Verify artifact size and checksum before consumption. Verify expected candidate,
adapter, Feature Map, environment, and target identities against the manifest.
Missing or changed artifacts, identities, or schema make evidence invalid. Never
silently migrate old evidence into a new identity.

Validate the complete declared schema before interpreting any field. Reject
missing, unknown, or ill-typed fields; absolute, noncanonical, duplicate, or
out-of-namespace artifact paths; multiple records resolving to one artifact
identity; and any observation whose canonical artifact or feature reference is
not declared by that same manifest. A consumer must not infer that an unlisted
artifact once existed.

An operation that is unsupported, stale, unreachable, timed out, ambiguous, or of
unknown ownership exits non-zero and records its structured reason under
limitations. It cannot be represented by a success status, empty observation, or
inferred `Pass`. The manifest may report control completion; it cannot contain a
product-acceptance verdict.

Completion: a consumer can detect one-byte artifact tampering and any relevant
identity change, reconstruct command ordering, locate direct observations, and
see cleanup and uncertainty without trusting an implementer summary.
