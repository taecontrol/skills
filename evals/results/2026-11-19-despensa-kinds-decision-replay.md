# despensa-kinds: replaying the patch decision with two mechanisms, 2026-11-19

- **Why:** in phase 2 of the [Sessions replay](2026-11-19-despensa-precios-sessions.md), every build closed each review finding with a new guard, and design fell from 7–8 to 5–6. The transcripts showed that refine's rules on improbable cases, new pieces and causes were in context and were not applied, even right after a lead re-read them.
- **What was replayed:** the moment each phase 2 lead received its first review. A fresh worktree at the commit that review saw (run-8 `c95449b`, run-9 `9bd1e1c`, run-10 `261c093`, run-11 `03b1d93`), with only the inputs available then.
- **The two mechanisms, written into the briefs, not into the skills:**
  1. **Finding format.** The reviewer (`gpt-6.2-astra high`, as before) writes each finding as what breaks, how often it happens in this household's ordinary use or which acts must coincide, its cause as a choice with `file:line`, and its class. No remedy and no "the code must".
  2. **A cause step.** Before any fix, a fresh agent (`claude-opus-5-5 xhigh`) reads all findings together and groups them by the earlier choice that produces them, sorting each into a cause fix in scope, a scope decision for the owner, or a local fix, with improbable findings as report lines.
- **Then:** the lead (`gpt-6.2-sol max ultrafast`, as before) wrote its fix plan from the review and the cause analysis, without code.

## Results

| | Original round 1 | Replay review | Replay plan: new pieces | Replay plan: owner decisions |
|---|---|---|---|---|
| run-8 | name reuse among the blockers; fixed with a client identity check that fabricates `KindNotFound`, a sessionStorage history built unasked, a ready gate and a timestamp protocol | 3 blockers, all from one actor or one network failure; name reuse and two partner races improbable | none: conditions and moves of existing state | reload keeps the filter (sessionStorage recommended, not built); whether Unir waits for previews |
| run-9 | name reuse a blocker; fixed with a module map, an identity check, a pre-merge name guard that contradicts the spec, and attempt flags | 3 blockers; name reuse improbable | none: per-screen query observers replace passed-down props; the existing gone view takes one derived input | reload keeps the filter (recommends limiting E13 to the mounted page) |
| run-10 | name reuse a blocker, carried through three rounds until the build stopped; fixed with a sessionStorage log, a mutation-cache predicate, a mismatch protocol in three callers and a nested read | 4 blockers; name reuse improbable | none: survivor count from the cached counts; per-screen observers | reload keeps the filter (one option removes the map); which read proves a filtered kind gone (one option adds `kindId` to `list_products`) |
| run-11 | 6 blockers including name reuse; fixed with a mismatch protocol in three callers and a root filter-history provider | 3 blockers; name reuse, a discarded edit and a candidate retry improbable | none: one shared refresh condition absorbs two existing paths; both cards use one query | reload keeps the filter; the name-based read contract |

**The decision changed in all four builds.**

- **Improbable cases left the blockers.** All four reviewers classified the name-reuse family as improbable once they had to name the acts that must coincide. That family produced every blocker left after round 3 in the builds that stopped.
- **No plan adds a store, map, provider or guard.** Each finding is closed by a condition or a move inside existing state, or by reading the same query where it is used. Two plans remove code.
- **The root cause reached the owner.** All four cause analyses named "the URL keeps a kind id, `list_products` reads by name" and put the operation change to the owner as a scope decision, with a recommendation. The originals wrote it in a code comment and compensated in the client.
- **The cause analyses also found spec gaps.** Run-11's names two: E13's parenthesis conflates a name that is gone with a kind that is gone, and E10 assumes the open ficha is the kind that disappeared. Each lead had filled those gaps with code.

## What it does not settle

- **Plans only.** No plan was implemented, so the code quality and bug counts that would follow are untested.
- **Over-escalation.** Run-8's plan leaves "should Unir wait for the previews" to the owner, a choice the lead could make.
- **Fable use.** Two cause agents asked Fable for a second opinion, because strategic-programming's second-opinion reference and the owner's global instructions send reviews to the most capable model.
- **Cost:** 4 reviews, 4 cause analyses and 4 plans, about 1 h 15 min, with no builds or council.
