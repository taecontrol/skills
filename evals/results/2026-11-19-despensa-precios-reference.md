# despensa-precios: a reference build to anchor the scale, 2026-11-19 (phase 1 only)

- **Why:** the design score was 7 in all 18 earlier design scores, and the scale had no top. This build asks what the best build we know how to make scores, so a 10 means something.
- **Configuration:** one agent, `claude-fable-5-2 high`, building and verifying on its own; `refine` with the Sequences lens of the [previous replay](2026-11-19-despensa-precios-refine-sequences.md), reviewer `claude-fable-5-2 high`.
- **Inputs:** phase 1's spec, constraints, data and prototype, without the accepted program design, so the agent wrote its own. The brief also gave it every bug and design finding from the earlier builds, including #40, and the hidden checks, and asked it to decide each scope case and record it.
- **Council:** changed from the previous replay, see below. Hidden checks by `claude-sonnet-5-5 high`. Bugs rerun by `claude-fable-5-2 high`.
- **Case:** `despensa-precios` at base `7c53585`, phase 1 only. Worktree `eval-precios-run-7`, final commit `16488ae`.

## Council changes tested here

- **Correctness** has a new bullet, in place of "switching between screens, and features that share state with this one". It asks the judge to use the product in sessions, where a person arrives at each example from somewhere, carries on, and keeps the state every step leaves behind.
- **All areas:** the build was told which tests to write, so a missing test costs no points.
- **Proof** expects one claim per session the review drove, besides one per example.
- **Hidden check H7 is unchanged.** The spec does not say whether a failed header read may hide a comparison that arrived, so a hidden check should not demand it. Correctness judges and the verifier still report it.

## Scores

Scores are the council's median, followed by the lowest and highest score in parentheses. The earlier builds are the previous replay's.

| | Reference | A, no tests | B, expect tests | C, current flow |
|---|---|---|---|---|
| Hidden checks, phase 1 | 11 / 11, known in advance | 11 / 11 | 10 / 11 | 10 / 11 |
| Confirmed bugs (critical / major / minor) | 0 / 1 / 7 | 0 / 0 / 6 | 1 / 0 / 7 | 1 / 0 / 5 |
| Correctness score | 9 (6–10) | 10 (8–10) | 7 (4–9) | 7 (4–10) |
| Design score | **8 (7–8)** | 7 (7–7) | 7 (6–7) | 7 (6–7) |
| Proof score | 8 (8–9) | 9 (8–9) | 9 (9–9) | 9 (9–9) |
| Proof entries | 17 examples, 15 sessions, 6 edge cases | 17 + 15 | 17 + 10 | 17 + 15 |
| Tests added (files / cases) | 1 / 5 | 0 / 0 | 1 / 3 | 1 / 3 |
| Diff | 20 files, +2077 | 15 files, +1743 | 15 files, +1726 | 17 files, +1561 |
| Build time, approximate | 1 h 40 min | 21 min | 30 min | 20 min |

Opus, Fable and Astra scored correctness 10, 9 and 6; design 8, 8 and 7; proof 9, 8 and 8.

## Confirmed bugs

The four bugs every earlier build shipped did not reproduce: #40, the picker that shows only 20 search results, a failed header read hiding the comparison, and the offline alert that stays after one retry.

| Bug | Severity | Found by |
|---|---|---|
| "Cambiar" opens with no subject checked when the current product is past the picker's first 20, so E13 fails. A cost of paging the picker. | major | Astra in correctness and proof |
| After Back to a product someone corrected meanwhile, such as 1 l to 500 ml, the header shows the new size while the ranking shows the old figures, with no loading sign, until the new answer arrives. | minor; the verifier notes a stricter reading makes it critical | Astra in correctness |
| While a new search is pending, Enter or a click opens a product from the previous, dimmed list. | minor | Astra in correctness and design |
| With a merged product's old id in the link, the picker checks nothing, and picking the product shown clears the chain filter. | minor | Astra, Fable |
| The open measure tab disappears after another member's correction, and the comparison goes blank until a tab is tapped. The agent recorded it as left without code. | minor | Astra |
| A hand-typed `cadena=coto` lists Coto twice in the Select. The agent recorded it as a scope decision. | minor | Astra, Fable, Opus as unproven |
| A hand-typed `cadena=365` is dropped. The agent recorded it as a scope decision. | minor | Astra |
| A 60-letter chain name with no space overflows the open Select at 390 px. | minor | Astra |

The two new kinds of bug, old figures after Back and an old search list, are state an earlier step left behind. The agent drove 21 sequences and found neither.

## What the judges found against the reference

- **Design, 8.** All three named the same strengths. One module owns each rule (the URL, the US$ figure, the rows both layouts render), it reuses the app's queries and failure handling, and the code matches the program design module for module. What kept it from a 10:
  - it is the first screen to import from other screens' component files, and it had to change Catálogo's failure component;
  - some rules are written more than once: one section skips the rows module, "sin cotización" is written in four places, and "the current subject" is decided three ways;
  - it infers whether a group has dollar figures from the order of the chains, when the answer says so directly;
  - two of its reads are one cache entry, and the retry handles that without saying so;
  - one test asserts caption copy the spec does not fix.
- **Proof, 8.** Every claim held, and the five tests go red when their rule breaks. Fable and Astra broke the screen on purpose and found checks that could not fail:
  - re-sorting the chains by pesos in ARS mode passes every test and script, because leche, the only subject whose order differs, is never read in ARS;
  - the audit for buttons outside shadcn cannot fail inside the app, because every element sits under a `data-slot` ancestor;
  - E7's script never compares the measure it says it compares;
  - E13 is false for a product past the first page, using the agent's own data.

## Where the judges disagreed

- **Correctness, again by model.** Opus gave 10 with no bug, Fable 9 with two minors from hand-typed links, and Astra 6 with the two session bugs. The sessions bullet did not change how Opus or Fable worked. Fable drove sessions and found nothing new. Astra was already the judge who found the most edge cases, so this run does not show that the bullet helped.
- **Severity.** Astra rated the session bug critical and five scope cases major. The verifier rated all of them minor but one.
- **Astra is the only judge who attacks.** In correctness, design and proof it changed state or code on purpose and watched what broke. Opus checks thoroughly and attacks nothing. It missed #40 in five of five builds that had it, and found no bug in the reference.

## What this run says

The best build we know how to make scores 9, 8 and 8. The judges' findings against it are real, so the top of the scale is not this build. It is this build without those findings. That list is the next target for the flow. Most of it is what `refine`'s Right lens already asks for, such as one rule in one place and nothing inferred from an order, and the reference's own reviewer reported none of it.

The design score moved for the first time, from 7 to 8, with an agent that wrote its own program design and knew every earlier finding. This run cannot say which of the two moved it.

The proof score dropped from 9 to 8 because the reference claims more, 38 entries instead of 27 to 32, and two judges broke the screen to test the evidence. "Every claim is true" is not enough for a 10. The evidence has to be able to fail.

What it does not settle: one run; an agent that knew the hidden checks and every earlier bug, which no real build has; and whether a correctness panel without Astra would find the session bugs.

## Eval findings

- **Correctness needs a judge who attacks state.** Text has not changed Opus in six builds. Consider replacing Opus in correctness with a second Astra or Fable, or weighting Astra's bugs once the verifier confirms them.
- **Proof judges should break the screen, not only repeat the steps.** The rubric already says evidence that would look the same on a broken product proves nothing. Fable and Astra acted on it and Opus did not.
- **Score the scale against this list.** A design 10 is a build with none of the design findings above; a proof 10 is one where every check goes red when its behavior breaks.
- **Cost:** 1 build of 1 h 40 min, 1 hidden-check run, 9 judges and 1 verifier, about 45 min from launch to the last verification.
