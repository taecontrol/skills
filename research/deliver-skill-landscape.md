# Deliver skill landscape

## Question and bound

What should `deliver` retain from the previous Factory implementation flow so a second agent reliably closes the first implementer's gaps without restoring the goal map, parallel worktrees, role bureaucracy, or a rigid lifecycle protocol?

This review covers the repository's historical `strategic-implementation`, `implementation-review`, `cleaner`, `pursue-goal`, `factory-supervision`, and slice-delivery references through the reset commit. It addresses local sequential delivery from an accepted `implementation-spec`; publishing, pull requests, deployment, and production effects remain outside the bound.

## Historical finding

The original `strategic-implementation` already recognized that green tests were insufficient. It required the implementer to perform a post-green design pass for complexity, module depth, information hiding, honest interfaces, and boundary validation before returning work for independent review. It explicitly warned against waiting for review to discover obvious design problems. [Previous `strategic-implementation`](https://github.com/taecontrol/skills/blob/3ccc0b92f3c7cbf924203cc88175bdc993a87973/skills/strategic-implementation/SKILL.md)

The corresponding `implementation-review` deliberately remained independent and normally read-only. It checked the accepted contract and strategic design, then returned `Pass`, requested changes, or an inconclusive result. This supplied a second perspective, but another actor still had to apply every supported finding. [Previous `implementation-review`](https://github.com/taecontrol/skills/blob/3ccc0b92f3c7cbf924203cc88175bdc993a87973/skills/implementation-review/SKILL.md)

The later Factory formalized that repair actor as `Cleaner`: Implementer produced work, Cleaner repaired and materialized it, Verifier approved it read-only, and Product Validator exercised it. Later revisions made Cleaner optional before the first review but still routed every Verifier finding back to Cleaner. [Previous `cleaner`](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/cleaner/SKILL.md) [Previous slice lifecycle](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/pursue-goal/references/delivery-checkpoint.md)

That separation protected a strong audit property: the actor approving a candidate never edited it. The cost was a multi-role state machine. `pursue-goal` and `factory-supervision` added Coordinator, Slice Owner, Implementer, Cleaner, Verifier, Product Validator, Diagnostician, goal and profile identities, immutable candidate digests, evidence ledgers, preflight manifests, resource leases, distinct sessions, isolated worktrees, and integration routing. Much of that machinery existed to support concurrency, cross-harness supervision, and formal candidate lineage rather than to improve one sequential local implementation. [Previous `pursue-goal`](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/pursue-goal/SKILL.md) [Previous `factory-supervision`](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/factory-supervision/SKILL.md)

## Supported verdict

Require a second fresh quality pass for every slice, but allow that second agent to repair the code it reviews. The important independence is **independence from the first implementation reasoning**, not permanent read-only status after the second agent sees the diff.

This gives the desired two-pass behavior:

1. An Implementer produces one coherent slice, applies the strategic-programming lens, and runs the applicable slice gates before handoff.
2. A fresh Finisher reviews the accepted slice, diff, tests, applicable coding standards, and strategic design; it repairs supported in-scope defects directly, then independently runs the applicable slice gates against its final result.

Neither pass may knowingly hand off failing work for a later phase to discover. The Finisher's run is not a substitute for the Implementer's self-validation, and the Implementer's green result is not evidence the Finisher may merely trust. Each actor validates the state it claims is ready.

Calling the second actor a read-only Verifier would be inaccurate once it edits. `Finisher` is the clearest internal role name; “review” remains one of its activities. It does not require a public `finisher` skill. Its assignment can remain a supporting contract inside `deliver` until independent use demonstrates a reason to extract it.

A third fresh read-only review is not a default. Use another fresh pass only when the Finisher's repair materially reshapes the design it initially reviewed, touches a sensitive boundary, or leaves reasonable uncertainty that another perspective could settle. Mechanical or narrow repairs need only affected gates. This is a risk rule, not a fixed retry count.

## Minimum delivery invariants

Keep only guarantees whose absence creates a concrete failure:

- Start from one human-accepted `implementation-spec` in the current worktree.
- Execute exactly one slice at a time in its accepted order.
- Give the implementation pass and mandatory quality pass separate contexts.
- Keep every repair inside the accepted slice and settled design. Return a changed public behavior, product decision, or costly-to-reverse architecture question to the human instead of improvising it.
- Require the Implementer, after its final edit, to run the slice's applicable unit tests, changed-code CRAP gate, and any other affected project gate before handoff.
- Require the Finisher, after its final edit or no-change conclusion, to independently run the same applicable slice gates. Earlier logs may guide diagnosis but never replace this run.
- Create one focused local commit only after the slice's quality pass and gates succeed.
- After the final slice, run the accepted full-project gates and product validation against the integrated result.
- Bound a defect found during final validation by the failed accepted obligation and its evidence; repair the integrated result without inventing another slice or execution record.
- Treat push, PR publication, deployment, destructive actions, secrets, paid effects, and production mutation as separately authorized work.

Everything else should adapt to evidence. The Implementer may test frequently or perform cleanup before handoff. The Finisher may make no edits, repair several issues in one pass, run a focused diagnosis, or request another fresh review when its changes justify it. Both may choose the narrowest faithful commands that prove the slice; the required outcome is an independently green handoff from each pass, not a prescribed transcript of every intermediate action.

## Strategic programming is the shared quality lens

`deliver` should coordinate the two passes without becoming the source of programming philosophy. Implementer and Finisher should both apply `strategic-programming` before declaring their result ready:

- understand the governing invariant, its owner, and the real caller or data flow;
- place policy at one seam and prefer deep modules with small, honest interfaces;
- prove behavior at the narrowest faithful boundary with a test or reproduction capable of failing for the intended reason;
- after green, inspect the result for change amplification, leaked implementation detail, duplicated policy, dishonest names or types, and failure cases without a clear home;
- remove avoidable machinery without sacrificing trust-boundary validation, security, data-loss protection, accessibility, or accepted behavior.

These are state and quality criteria, not a mandatory sequence of ceremonial steps. Keeping them in one shared skill prevents the Implementer and Finisher contracts from drifting into competing definitions of good code.

## What Ponytail contributes

Ponytail's strongest idea is an **economy ladder**: after understanding the real flow, ask whether the need exists, whether the repository already solves it, then prefer standard-library, native-platform, or already-installed capabilities before adding the minimum custom code. It also correctly pairs deletion and boring code with explicit safety floors and root-cause fixes. [Ponytail core skill](https://github.com/DietrichGebert/ponytail/blob/356918eba965ee1eac64bd3a7f0dd02108350de5/skills/ponytail/SKILL.md)

That idea complements strategic programming but does not replace it. Ponytail minimizes how much mechanism the change owns; strategic programming minimizes the complexity exposed to future callers and changes. A deep module may legitimately contain more internal code to provide a much simpler, safer interface, so line count, file count, one-liners, and shortest diff can only be diagnostic signals—not design objectives or gates.

The project's own agentic benchmark is more credible than its superseded single-shot benchmark: it uses fresh Claude Code sessions, a pinned real repository, four runs per task and arm, `git diff` added lines, a terse-prose control, and deterministic adversarial checks for the safety tier. It reports 54% fewer added lines on average across twelve feature tickets and no safety failures in twenty Ponytail safety runs. The authors also disclose a contaminated earlier baseline and the limits of one model, small samples, nondeterminism, and a safety floor that is not a security proof. [Agentic benchmark report](https://github.com/DietrichGebert/ponytail/blob/356918eba965ee1eac64bd3a7f0dd02108350de5/benchmarks/results/2026-06-18-agentic.md)

The evidence supports “Ponytail can reduce over-building when a native or existing capability is available” better than the broader claim “Ponytail produces production-quality code.” In the published feature table, agents did not run a server or browser and those tasks were scored primarily by added lines. The current harness documents a later LLM completeness judge, but the flagship report does not publish completeness results. Its security evidence covers a small set of known adversarial cases, and its over-engineering judge deliberately ignores correctness, design quality, performance, and security. [Benchmark methodology](https://github.com/DietrichGebert/ponytail/blob/356918eba965ee1eac64bd3a7f0dd02108350de5/benchmarks/agentic/README.md) [Over-engineering review skill](https://github.com/DietrichGebert/ponytail/blob/356918eba965ee1eac64bd3a7f0dd02108350de5/skills/ponytail-review/SKILL.md)

Therefore, retain only the ladder's durable principle in `strategic-programming`: **prefer the least custom machinery that satisfies the accepted behavior and preserves the important safety and design properties**. Do not import Ponytail's persistent modes, “ship the lazy version and question it afterward” behavior, one-test ceiling, `ponytail:` debt ledger, line-count score, or separate complexity-review role. Those would either override an accepted specification, weaken project gates, or duplicate the Finisher.

## What to discard

- Goal mode, goal maps, project profiles, execution envelopes, candidate IDs, finding IDs, and duplicate progress ledgers.
- Parallel slice scheduling, child worktrees, resource leases, and integration choreography.
- A separate Slice Owner and `factory-supervision` layer for ordinary local agent dispatch.
- A mandatory standalone Cleaner between implementation and review.
- Immutable candidate manifests and digests when all work occurs sequentially in one Git worktree.
- Fixed retry counts and mandatory role transitions for recoverable local failures.
- Per-slice product validation when the accepted `implementation-spec` places representative product validation after integration.

Git supplies the durable execution boundary: the accepted base, current diff, and one focused commit per completed slice. The implementation specification remains unchanged during execution and is retired only after final validation when its accepted contract identifies it as temporary and authorizes deletion.

## Proposed `deliver` boundary

`deliver` is an explicit orchestrator, not an implementer or design skill. It should:

- locate and confirm the accepted implementation specification and current repository state;
- select only the next unfinished slice from Git evidence and the ordered spec;
- dispatch one implementation pass, then one fresh quality-and-repair pass;
- keep routine repair autonomous while detecting design or authority boundaries;
- require independent gate evidence from both passes, with the Finisher's run occurring after its last repair, then create the focused local commit;
- repeat sequentially, then coordinate full-project and product validation;
- stop with a concise blocker or resynchronization question only when local execution cannot safely continue.

It should not maintain a separate workflow file. It may report live progress conversationally, but conversation history is not a second execution database.

## Relationship to later skills

Do not recover the old `cleaner` as a public skill. Its valuable repair and strategic-cleanup behavior belongs in the Finisher contract.

Do not recover the old `implementation-review` unchanged. A later standalone review capability may still be useful for explicitly read-only audits, but `deliver` does not need it to complete its default second pass.

Keep final product validation conceptually independent because code inspection and technical gates cannot prove the user journey. Whether the existing `use-case-qa` should be recovered is a later decision; `deliver` needs only the accepted product-validation contract and a fresh capable validator.

## Evidence limits

The repository history demonstrates how the earlier roles and protocol evolved, not comparative outcome data for a two-agent editable review against a three-agent Cleaner/Verifier split. The mandatory second pass follows the user's repeated observation that first implementations leave gaps. Allowing that pass to repair is a design tradeoff: it gives up formal independent approval of the final bytes in exchange for lower coordination cost. Conditional fresh re-review and independent final product validation preserve stronger evidence where the risk justifies it.
