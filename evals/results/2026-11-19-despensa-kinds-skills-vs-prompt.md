# despensa-kinds: skills against a plain prompt, 2026-11-19

- **Question:** do the skills make a build better than a short prompt that states the same process? The owner's hypothesis: an implementer and a reviewer that reports what breaks, how often and why, followed by a fix at the cause, need no skills.
- **Case:** phase 2 of `despensa-precios` (tidy kinds, issue #32), built on the [reference build](2026-11-19-despensa-precios-reference.md)'s phase 1 (`16488ae`), so every build starts from the same code.
- **Builds:** lead and implementer `gpt-6.2-sol max ultrafast`, reviewer `gpt-6.2-astra high`, two builds per arm.
  - **S, skills:** the eval brief (`arms/common.md` with arm A, no tests) and the installed skills, with `refine` at `5b3ee07`: findings state how often and their cause and no remedy, and a fresh agent groups each round's findings by cause before any fix.
  - **N, no skills:** a 500-word brief that forbids loading any skill and states the process in four lines: build, verify in the product, have a fresh reviewer report what breaks, how often and its cause with no remedy, give all findings to a fresh `claude-opus-5-5 xhigh` agent to group by cause, and fix from that grouping, at most three rounds.
- **Council:** design `claude-opus-5-5 high`, `claude-opus-5-5 xhigh`, `gpt-6.2-astra high`; correctness `claude-opus-5-5 xhigh` and two `gpt-6.2-astra high`. No Fable and no proof judges. Hidden checks by `claude-sonnet-5-5 high`. Bugs rerun by `claude-opus-5-5 xhigh`, each build against the same list of 20.

## Results

| | S, run-12 | S, run-13 | N, run-14 | N, run-15 |
|---|---|---|---|---|
| Ran the cause step | no | no | every round | every round |
| Hidden checks, phases 1 and 2 | 20 / 21 | 19 / 21 | 19 / 21 | 19 / 21 |
| Real hidden-check failures | none | none | H18: the typed kind name is lost after opening a product | none |
| Confirmed bugs (critical / major / minor) | 0 / 5 / 6 | 0 / 2 / 8 | 1 / 6 / 7 | 0 / 3 / 6 |
| Of those, left by the build as owner decisions or improbable | 0 | 0 | 4 | 0 |
| Design score | 6 (6–7) | 6 (6–7) | 7 (7–7) | 6 (6–7) |
| Correctness score | 7 (7–9) | 7 (6.5–10) | 6 (6–8) | 7 (7–9) |
| Diff | 16 files, +1964 −529 | 16 files, +1902 −521 | 17 files, +1842 −527 | 17 files, +1910 −533 |
| Commits | 4 | 3 | 1 | 1 |
| How "keep the filter after a merge and a reload" was handled | sessionStorage, after a history-state attempt failed review | a module map copied into history state | left to the owner | a ref copied into history state |

H17 and H18 fail by their letter in every build, because each opens "¿Cuál queda?" at once with no pending read to discard or leave; only run-14's H18 failure is a real defect. Verifiers still rated the same bug differently between builds, even with worked severity examples in the brief, so read the counts as presence.

## What this run says

**The skills added nothing measurable.** On hidden checks, design, correctness and confirmed bugs the two arms overlap. The N builds reached the same result from a 500-word prompt, with no skill loaded.

**A step written in the prompt ran; the same step written in a skill did not.** Both S leads loaded `refine`, whose Improve section now begins with the cause step, and neither started the cause agent. Both N leads started it in every round. In run-12 the skipped step shows: a reload fix in history state failed review, and the lead replaced it with sessionStorage, the new piece the step exists to stop.

**The cause step reduced patches but did not remove them.** Run-14 built no new store and left three cases to the owner; its design scored 7 from all three judges. Run-15 ran the step every round and still patched its own round-1 guard in round 2. The step changes the decision more when its output is binding, as in the decision replay, than when the lead reads it and decides alone.

**Escalating leaves bugs open.** Four of run-14's fourteen bugs are cases it named and did not build: one improbable merge race and three owner decisions. In an autonomous run nobody answers, so they ship as bugs. That is the intended trade, and it needs an owner who answers.

**One bug family survived every arm and every run.** In all four builds: after a merge, the kept kind keeps its old count when the follow-up read fails, and offers "Borrar"; pressing Back before the merge reply arrives clears the filter; a kind removed by the partner opens with its name field and actions still live. Each is state an earlier step left behind combined with a read that fails. No review, with or without skills, drove a failure while the cache held older data.

## What it does not settle

- **Two builds per arm,** one case and one model.
- **Light contamination:** both N leads read two writing skills at the start, before reaching the line of the brief that forbids them.
- **Different council from earlier runs:** Fable was replaced by Opus xhigh, so scores compare within this run only.

## Eval findings

- **Put process steps where the run executes them,** in the brief or the orchestrator, not inside a skill the lead may read and skip.
- **H17 and H18 still test one implementation;** reword them to the intent, as the phase 2 results say.
- **Verifier severity stays unstable** across verifiers even with worked examples. Compare presence, or have one verifier rerun all builds.
