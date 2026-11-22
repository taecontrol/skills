# Browser game base: test-first against build-first, 2026-11-22

- **Why:** a real `deliver` run on the first slice of a private browser game spent most of its review rounds on its own tests, and the tests passed with every product defect the reviews found. The question: does building without tests, reviewing the product, and choosing the tests at the end deliver as well, at lower cost?
- **Case:** the first slice of a private browser game compiled to HTML5: a clean project, one room, a character that walks with keyboard or controller, the page that scales the game to whole device pixels, and a deploy command. Same accepted spec in both runs, recovered for the second from the orchestrator's transcript as it stood before delivery. Same base commit. The case is not under `cases/`: the repository is private and the run used no synthetic copy.
- **Test-first run (the real delivery):** skills at 3.20.x, `deliver` with acceptance tests first. Builder `gemini-4-neon high`; reviewers and cause agents `gpt-6.2-astra xhigh`; fixers `gemini-4-neon`.
- **Build-first run (the experiment):** briefs written for this run, which became 5.0.0's `builder.md`, `reviewer.md`, `fixer.md` and `protection.md`. Builder and fixers `gpt-6.2-sol max`; reviewers and cause agents `gpt-6.2-astra xhigh`; protection proposals `gpt-6.2-astra xhigh` and `claude-opus-5-5 xhigh`, separately.
- **No council and no hidden checks.** The runs are compared by their review records.

## Results

| | Test-first | Build-first |
|---|---|---|
| Builder time | about 10 h, of which 9 h 46 min was one hung test command | 25 min |
| Review rounds until the third found a blocker | 3, then a fourth after the owner chose a fix | 3 |
| Review causes about the tests | many in rounds 1 to 3, and all of round 4 | none |
| Lines changed by the rounds after the builder, product / tests | 53 / 1,979 | product only; no tests |
| Test lines at the end | about 2,750, for about 480 of product | none before the protection step |
| Incidents | a deploy test kept in the repository published to the live site when a reviewer ran it; the hung command | none |

## Product defects

Seven product defects from the test-first run served as the comparison list.

| Defect | Test-first | Build-first |
|---|---|---|
| A held stick keeps walking in a visible window without focus | round 1 (owner accepted it) | fixed by the builder before review |
| Unequal pixel widths at some device-pixel ratios | round 1 | round 1 |
| The frame drops to 1× after a resize or rotation when 2× fits | round 1 | round 1, and again in round 3 through the hint's height |
| A frame that fits exactly loses a scale step; a scrollbar covers columns | round 2 | round 1, and a scrollbar regression in round 2 |
| A density change without a resize keeps the old scale | round 2 | not found |
| A click outside the game leaves the keys dead | round 2 (owner accepted it) | round 1 (owner accepted it) |
| Browser zoom or a fractional width loses a scale step | round 3, the blocker that stopped `refine` | round 1 |

Build-first also found defects the test-first run never reported: the game froze after the browser's Back button, the page showed no message when the game could not start, and a fix that used CSS `round()` hid the game in an older Chrome. Neither run converged: in both, each fix to the page's scaling produced the next round's defect, and neither safety net caught it, tests in one run and re-checking the touched examples in the other.

The test-first run's tests went red on no product defect an agent introduced, as far as its orchestrator knew; it could not rule out fixes made before a commit.

## Protection lists

Run on the build-first result after `refine` stopped, from all three rounds' records.

| | Astra | Opus |
|---|---|---|
| Tests | 8 | 4, plus 1 left to the owner |
| Lines, estimated | about 355 | about 285 |
| Run time | 26 to 50 s, estimated | about 7 s, from partial measurements |
| Red runs shown | none | five rows and the Back test, on the pages before each fix |

Both proposed a gate before upload, a table of window sizes, the Back button, and a table of movement rules at the rules module. Astra alone proposed a permanent test of the deploy command with a fake uploader, the pattern behind the test-first run's incident, and a slow test of the startup messages; it made the old Chrome check mandatory where Opus left the supported versions to the owner. Opus alone noted that the browser driver disables the back-forward cache and hides scrollbars by default, so those tests would pass on broken code. Astra alone added a row with real browser zoom. The combined list is Opus's plus that row, about 290 lines. No list was implemented.

## What this run says

Building and reviewing without tests found the same product defects sooner, at a fraction of the time, and spent no review on tests. It did not converge any better: fixes that rewrite the same code break it in both flows, and re-checking the touched examples catches that no better than tests did. Choosing tests at the end produced short lists, and one model was close to enough; the second added one row and the first, alone, would have kept a risky deploy test.

This agrees with [the first despensa-precios run](2026-11-18-despensa-precios-sol-max-ultrafast.md): tests showed their value as protection against later changes, not as discovery.

What it does not settle: one case; the builder and fixer models differed between the runs; the narrower alternative, test-first with fewer examples marked `test`, was not tried; and no protection list was written and run.
