# Native harness adapter

Use this adapter when no relevant execution state is owned by Orca.

## Inspect the native surface

Read the current harness instructions and available tools. Establish whether they can:

- start the requested agent or subagent in an exact workspace;
- select the requested provider, model, and effort when prescribed;
- keep a fresh context independent from prior role reasoning;
- return questions and one terminal result to the initiating owner;
- expose cancellation, failure, and completion distinctly;
- preserve output after the worker exits;
- identify and release only resources owned by the attempt.

Do not assume that Cursor, Codex, Claude Code, or another harness supports nested agents, shared filesystems, background work, model selection, or cross-provider launch merely because another installation does.

Use the narrowest native mechanism that satisfies the assignment. If the requested target harness cannot be launched from the initiating harness, return `Blocked` with the missing bridge or choose another harness only when the execution plan permits that substitution.

## Place the worker

Reuse the current checkout for internal roles of one slice when it is their assigned exclusive workspace. Allocate an isolated checkout for each concurrently mutating slice through the environment's supported workspace mechanism.

Verify the exact path and base revision before delivering work. Parent-child display relationships are optional outside Orca; isolation, accepted base, resource ownership, and recoverable lineage are not.

If the native harness cannot attach a worker to the required workspace, do not copy the repository into an untracked location or ask the worker to reconstruct state from prose. Return `Blocked` with the missing placement capability.

## Launch and supervise

Pass the complete assignment and require the completion-envelope format. Keep each independent role in a fresh context:

- Implementer and Cleaner may write only inside the slice workspace and accepted boundary.
- Verifier and Product Validator are fresh and cannot change the candidate. Product Validator may mutate only validation state owned by its recorded lease.
- A Goal Validation Owner and its reviewers inspect the immutable integrated candidate without repairing it.

Use the harness's native wait, resume, message, and cancellation operations. Do not poll a guessed transcript path, impersonate another agent, or infer success from process exit alone.

When native child agents cannot launch children:

1. The initiating Slice Owner launches ordinary peer sessions and sequences their results.
2. The goal Coordinator retries the whole Slice Owner assignment in a harness that can supervise the required independent contexts.
3. The Slice Owner performs a role in its current context only when that role does not require independence and the accepted Factory contract permits it.

The goal Coordinator must not launch or supervise a slice's internal roles. Never collapse Verifier or Product Validator independence to avoid a nesting limit. If no topology preserves the role contract, return `Blocked`.

## Settle

Accept one result envelope, preserve its evidence, and stop or release the worker through the native lifecycle operation. Record any session that cannot be proven stopped and the resources it may still own.

The goal Coordinator retains responsibility for integrating validated slice commits and safely removing isolated checkouts. A child result does not authorize push, publication, merge, deployment, destructive cleanup, secret access, paid activity, or production mutation.
