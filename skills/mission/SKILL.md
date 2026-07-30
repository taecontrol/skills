---
name: mission
description: "Open or continue a bounded software mission with a human Mission Control, a visible exploration map, conversational collaboration, and one approved material frontier or parallel group. Use only when the human explicitly invokes Mission or asks to start, resume, navigate, or close a mission."
disable-model-invocation: true
license: MIT
---

# Mission

Mission is the cockpit for one bounded intervention on a persistent product. Mission Control and the agent navigate together; ticket profiles make each kind of work predictable without imposing a fixed lifecycle.

Mission Control owns the outcome, appetite, scope, no-gos, material product policy, accepted risk, gates, ticket selection, verdict, and closure. The agent owns evidence gathering, exposing fog, recommending the route, shaping clear tickets, executing approved work, and keeping the cockpit current.

Keep these invariants:

- Give every ticket one coherent objective, one governing Kind/Type, an observable acceptance contract, and one plain-language Collaboration sentence.
- Keep selection, activation, and execution distinct; one unambiguous instruction may authorize any or all three.
- Keep one material frontier by default. Use several Active tickets only as an explicitly approved independent parallel group.
- Treat Planned tickets as preserved context, never execution authority.
- Treat ticket profiles as selectable work shapes, not mandatory phases.
- Stop at material scope, policy, architecture, risk, or acceptance changes and return them to Mission Control.

## Load the applicable contract

Load [`references/ticket-protocol.md`](references/ticket-protocol.md) before creating, activating, reviewing, or closing any ticket.

Then load exactly one branch reference:

| Ticket type | Branch reference |
| --- | --- |
| Code Archaeology, Research, Technical Spike | [`references/discovery-tickets.md`](references/discovery-tickets.md) |
| Decision, Prototype, Use Cases Definition, Design | [`references/collaborative-tickets.md`](references/collaborative-tickets.md) |
| Implementation, Validation, Repair | [`references/delivery-tickets.md`](references/delivery-tickets.md) |

Use [`templates/mission-brief.md`](templates/mission-brief.md), [`templates/exploration-map.md`](templates/exploration-map.md), and [`templates/ticket.md`](templates/ticket.md) selectively. Keep artifacts only as large as the active work requires.

## Speak from the cockpit

Keep chat conversational and product-first. Default to 2–5 short sentences; use a small list only when it scans better.

Before work, explain what will happen, why it matters, how Mission Control will participate, and what will return. Express the ticket's Collaboration contract naturally rather than naming modes or reciting fields.

During work, honor every promised interview, demonstration, and checkpoint. Otherwise surface only a material decision, blocker, or scope/risk change. At Review, explain the result in simple terms, why it matters, what needs deciding, and exactly what acceptance will activate.

Completion criterion: Mission Control can act without opening a ticket file or translating Mission vocabulary.

## Step 1: Orient

1. Locate the repository root and inspect repository instructions, branch/worktree state, persistent product context, and existing mission artifacts.
2. Resume the matching mission instead of opening a duplicate. When repository and runtime copies of Mission differ materially, identify the loaded copy before changing ticket state.
3. Preserve the raw request in a small Mission Brief when opening a mission; keep unknowns unknown.
4. Create or refresh one dashboard-sized map: destination, gate, current frontier or parallel group, decision needed, 3–7 facts that matter now, open fog, accepted one-line receipts linked to durable sources, and the smallest justified successor set.
5. Explain the map in ordinary language and recommend the next material work.

Completion criterion: Mission Control can explain the destination, current evidence, important fog, recommended work, and next material decision; every accepted-history receipt resolves to a durable source.

## Step 2: Shape and activate

1. Load the applicable branch reference and choose the profile by the ticket's real objective.
2. Propose one ticket while fog remains. When several contracts are already clear, shape a dependency-aware sequence or parallel group while context is fresh.
3. Record the objective, scope, non-goals, dependencies, Collaboration sentence, and acceptance evidence. Keep uncertain work on the map; use Planned only for a clear future contract.
4. Let Mission Control select or amend material work. Move selected work through Ready to Active according to the lifecycle protocol.
5. Give the natural activation briefing. Use a fresh execution context by default; an explicit current-session directive or predeclared parallel dispatch supplies the documented exception.

Completion criterion: every Active owner has a frozen, independently reviewable contract, and Mission Control knows when they will be involved.

## Step 3: Execute the profile

Work only the Active ticket, or the named member of an approved parallel group. Perform mechanical legwork independently while following the selected profile's collaboration, evidence, review, and stopping rules.

Update Result, Evidence, Remaining uncertainty, Next tickets, and Map delta as work evolves. Preserve the frozen contract; a material change returns to the cockpit for amendment or replacement.

Completion criterion: every profile-specific acceptance item has evidence, every promised collaboration point occurred, and remaining uncertainty is explicit.

## Step 4: Review and hand off

1. Return the complete result, evidence, remaining uncertainty, map delta, worktree disposition, and the next ticket or tickets justified by what was learned.
2. Explain the outcome and decision in simple language. A Decision, Prototype, Use Cases Definition, or materially open Design ticket reaches Review only after its required shared-understanding loop.
3. When fog remains, recommend one next ticket. When several work packages are clear, preserve their contracts and dependencies now; mark parallel work only after it passes the protocol's independence test.
4. State exactly what acceptance will close, activate, sequence, dispatch, commit, or continue in another session. Apply an unambiguous Mission Control disposition as one transition without a second procedural confirmation.

Completion criterion: the ticket has an explicit human disposition, the map matches it, and only the predeclared successor set has authority.

## Step 5: Close or pause

Close the mission with an explicit Mission Control verdict. Record outcome, evidence, residual risk, follow-up proposals, durable product/architecture truth, and the disposition of branches, worktrees, servers, credentials, and temporary artifacts.

For a pause, leave the cockpit with the smallest clear successor set and no ambiguous Active owner.

Completion criterion: a fresh session can resume or understand closure from the repository without reconstructing intent from chat.
