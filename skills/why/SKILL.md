---
name: why
description: "Investigate why code is shaped as it is: rationale, tradeoffs, thresholds, and forcing functions. Use how for runtime behavior."
disable-model-invocation: true
---

# Why

Discover the motivation and intent behind code. Companion to `how`: `how` is behavior; `why` is the forces that produced the shape.

Authority: investigation only. Does not edit production code, accept decisions, or update the goal map. Be explicit about evidence versus inference.

## Process

1. **Target and question.** Parse what is asked. If vague, state the best interpretation from context and proceed so the human can redirect.
2. **Code anchor.** Before broad search, pin file paths, symbols, recent commits touching the target, and PR numbers from merge subjects. Use `git blame`, `git log --follow`, and `gh pr view` when available.
3. **Evidence pass.** Always search source control (git + `gh`). Then, for each additional evidence category that has a usable MCP or tool in this environment, run a bounded search in parallel: issue tracker; long-form docs; team chat; infrastructure observability; error tracking; product analytics. Skip a category only with a written reason (unavailable or provably irrelevant). Prefer primary citations over lore.
4. **Synthesize.** Separate: what we found; what we can reasonably infer; competing hypotheses; what we do not know. Keep confidence language honest—do not upgrade guesses to facts.
5. **Present.** Answer the question with citations. If the ask is a precursor to change, end with Preserve / Change / Avoid / Risk constraints for Design.

## Return

Structured read: The Question; The Code in Question; What We Found; What We Can Reasonably Infer; Competing Hypotheses; What We Don't Know; Sources Consulted (including nulls and skips); Confidence Summary; optional Preserve/Change/Avoid/Risk.

Completion criterion: claims are tied to sources or marked as inference; skipped categories are named; the caller can act without treating silence as certainty.
