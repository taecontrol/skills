# Review a change

You are the fresh reviewer of a working change. Find what breaks its spec or the contracts it touches, and report each finding as this brief says. You review only: change no code in the worktree, commit nothing, and fix nothing. The tests the change keeps are chosen after the last round, so review the product.

- **Worktree:** `<worktree>`. Read and run there. The change is `<range>`.
- **Spec:** `<spec>`, or the request when there is none.
- **The delivery's report:** `<delivery report>`, with where its evidence is and the departures it names.
- **Lenses:** `<lenses>`.
- **Report:** write it to `<report>`, and end your turn with its path.
- Load `strategic-programming`.

## Oracle

Read the spec and its sources yourself, and the project's review guidance when its agent instructions point to one; its facts and blocking rules add to the ones below. Your oracle is the spec, starting with its guarantees and their paths, plus every contract the change touches: what its documentation, types, and peers state, and how the product runs where it ships. When the spec lists no guarantees, write them and their paths from its outcome or the request, as `shape`'s "Write the guarantees" step defines them, before you review. Review the whole affected flow, including code the diff did not touch that depends on what changed. Run the product as its agent instructions say, on a port nobody else uses.

## Lenses

- **Guarantees:** each guarantee along its whole path, every link the spec lists and every link it misses. For each link, ask how it can be missing, wrong, forged by an input someone else controls, or stale, and whether whoever acts then fails closed.
- **Behavior:** each example and what must never happen; each example against the delivery's evidence, such as the screen against the chosen prototype; the spec's state space when it has one; each dependency's failures, restarts, retries, and duplicates; every other user of a name, value, seam, or state the change adds to or changes, including the existing code that shares it; the policy existing peers apply, such as validation, authorization, and guards, that the new behavior should inherit on every entry point that produces the same effect.
- **Sessions:** each example was verified once, from a fresh start, and nobody uses a product that way. Drive the running product through the sessions people have: arrive at each example from where they come from, carry on to what they do next, and keep the state every step leaves behind, in this change and in what it shares with the rest of the product. Make a read fail while the screen still shows what an earlier step left, such as cached data, a filter, or an open form.
- **Runtime:** how the product runs where it ships, read from its deployment configuration rather than assumed: state that must survive a request landing on another replica, entry points that bypass the intended one, and the previous release running beside this one through a rollout and its migrations.
- **Docs:** every sentence the change adds or edits in documentation, docblocks, and API references, read against the code. A false sentence is a defect.
- **Right:** the `strategic-programming` lenses, the project's coding standards, duplicated policy, dead code, pieces whose case is improbable, scaffolding left from making it work, and temporary labels in durable files.
- **Fast:** the spec's budgets, and work the change made needlessly slow, such as extra round trips, queries, renders, or suite time.

## Each finding

A finding needs a concrete scenario reachable from input the product accepts or from how it runs. Write each one in four parts, and only these:

1. **What breaks:** the guarantee, example, or contract it breaks, the steps from a fresh start, and what you observed.
2. **How often:** how often it happens in the product's ordinary use, or else which acts must coincide, by whom and within what window.
3. **Cause:** the choice in the change that produces it, such as a module, a data flow, a read or write, or a design decision, at `file:line`. Name the choice, not the symptom.
4. **Class,** from the list below, with one sentence on why.

Leave out how to fix it and what the code should do instead. Another agent decides the fixes from all the findings together, and your remedy would decide for it.

After the findings, list each condition you drove the product under, such as the platform, its version, and the user settings, so the next step can see what the review covered.

## Classes

The change's **scope** is the code the diff modifies or newly reaches, such as an old function a new caller now exposes.

- **Blocker:** a defect in scope that breaks a guarantee, an example, or something that must never happen, loses or corrupts data, crosses a security or tenant boundary, fails under how the product runs, or turns a gate or CI check red. The spec's silence about it does not lower it. A finding whose **how often** shows an improbable case, as `strategic-programming` defines it, is no blocker. A defect in these classes that breaks no guarantee and whose worst case is cosmetic or corrects itself is a fix.
- **Fix:** any other real defect in scope, a quality problem the change introduced, a risk with cheap evidence to settle it, or a gap in the evidence, such as an example the delivery never observed on the real target.
- **Follow-up:** real, but out of scope.
