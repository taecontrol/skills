# Shared Mission Ticket Protocol

This is the source of truth for ticket states, authority, and transitions used by the `mission` skill. Any routed executor must return results through this contract; it does not own mission progression.

## Common contract

Each ticket owns one coherent, independently reviewable work package that advances the mission. The ticket has one objective and one governing Kind, but it may resolve multiple coupled questions or decisions when they establish the same downstream contract and are useful and accepted together. Related work may support that Kind; material outputs that require a different route or authority belong in another ticket.

An independent check is not automatically a separate Validation ticket. Fresh-context implementation review is completion evidence inside an Execution ticket because it judges whether that implementation honored its approved design and contract. Use-case QA is a separate Validation work package because it exercises accepted behavior through a project-specific runtime method and has its own evidence and disposition.

Default durable tickets are **index cards**. Start with the smallest contract that prevents ambiguity:

```markdown
# Ticket NNN: <one coherent work package>

Status: Ready | Active | Blocked | Review | Closed | Abandoned
Kind / Type: <Discovery | Decision | Deliverable | Execution | Validation | Task> / <human-readable operational type>
Owner: <person or role>
Depends on: <tickets or none>

Objective: <coherent result>
Scope: <allowed work>
Non-goals: <nearby work not allowed>
Acceptance / evidence: <observable completion criteria>
```

`Result`, `Evidence`, `Remaining uncertainty`, and `Map delta` may evolve while Active as owners and in-ticket reviewers return. Complete them before moving the ticket to Review.

Add `Mode`, `Questions / decisions`, `Why now`, `Method`, `Authorized outputs`, implementation constraints, or runbooks only when they change behavior, prevent real ambiguity, or support handoff/review. Do not complete sections merely because a template offers them.

`Type` makes the route legible without opening the ticket body:

- Discovery: use one concise method label, such as `research`, `grilling`, `prototype`, `technical-spike`, or `code-archaeology`.
- Other Kinds: use a concise kebab-case label that names the operational shape, such as `technical-design`, `risk-decision`, `schema-migration`, `independent-qa`, or `access-setup`.

Kind controls authority and routing; Type explains what the work is. Type never changes a ticket's authority.

Use [`../templates/ticket.md`](../templates/ticket.md) after Mission Control selects a material frontier. Unselected work remains a concise proposal on the map; it is not a ticket.

## States

| State | Meaning | Who may move it |
| --- | --- | --- |
| Ready | Scope, non-goals, dependencies, and evidence are agreed. | Mission Control for material/Deliverable work; agent for non-material Task work. |
| Active | Current authorized work. | Mission Control selects a material frontier; agent may activate mechanical child tasks. |
| Blocked | Cannot proceed; blocker and unblock condition are explicit. | Active owner. |
| Review | The complete work package, including any required in-ticket independent review, is ready for Mission Control; required authority has not accepted it. | Active owner after completion evidence is satisfied. |
| Closed | Result/evidence accepted at the ticket's authority level. | Mission Control for every material ticket; agent for non-material Task work. |
| Abandoned | Intentionally stopped with rationale and map impact. | Mission Control for material work; owner for non-material Task work. |

Exactly one material ticket is current in `Ready`, `Active`, or `Review`. Parallel mechanical child tasks may run inside that ticket, but Mission Control cannot authorize a second material frontier without first returning the current ticket to a non-current disposition.

## Human-visible navigation contract

The map and ticket preserve full state; chat uses the **minimum sufficient context**. Write as a natural conversation, not a status report. Default to 2–5 short sentences and roughly 100 words or fewer. Do not use headings, field labels, or repeated status blocks in normal navigation. Use up to three bullets only when separate items genuinely scan better than prose.

Say only what changes Mission Control's understanding, decision, or next action. Start with product meaning. Omit ticket IDs, Kind/Type, gate names, file lists, corpus counts, command results, and worktree details unless they matter to the decision or Mission Control asks. When a complex term is unavoidable, explain it immediately in one short clause using familiar words.

### Activation briefing

Before substantive execution, explain what will be done, why it matters now, and what will come back for review. Mention a stop condition only when it is not obvious. Do not recite mission position, ticket metadata, evidence fields, autonomy boundaries, or likely routes as labels.

Example: `We're going to design how buttons, AI interpretation, and confirmations work together. This prevents implementation from inventing safety rules. I'll return with a design for review; no production code will change.`

This is orientation, not another approval ceremony. If Mission Control already authorized execution, say it and proceed.

### Material checkpoint

Do not narrate mechanical work. When something materially changes, explain the discovery and consequence in one or two sentences, then ask one plain question if needed. Never print a `Checkpoint` block.

Example: `We found that some employee replies can bypass transcript storage, so the dashboard may miss them. That needs separate persistence work; should it be the next ticket?`

Ask only about scope, appetite, policy, risk, product intent, unavailable access, or competing next work—not implementation details already delegated. Explain one concrete example before a difficult choice.

### Review brief

In 2–5 short sentences, say what was produced, why it matters, and what Mission Control should decide. State naturally what acceptance will do. Mention verification or uncommitted work in one brief final sentence only when useful. Link the artifact only if Mission Control may want the detail. Never print the ticket contract back into chat.

Example: `We created a safety checklist for understanding employee replies in any language. It ensures an unclear AI interpretation cannot close or reject work. It's ready to accept; if you accept it, I'll activate the technical design as the next ticket for a fresh session. Checks passed, and no product code changed.`

If Mission Control would need to ask for “a small summary in very simple terms,” the Review brief failed. Counts, corpus sizes, release gates, latency, ticket status, file names, and protocol terms belong after the simple meaning—and usually only in the durable artifact.

For a `Decision / Collaborative` ticket, return a **decision-space brief**, not a ballot for accepting the agent's preferred answer. Surface the live options, trade-offs, and pressure points in chat, then use the installed `grilling` skill when Mission Control wants to stress-test the decision. Grilling proceeds one question at a time and waits for Mission Control after each question. Phrase each question first as a product choice with a concrete example and consequence; technical policy names may follow in parentheses when useful. Do not write proposed recommendations, rejected alternatives, or map deltas as durable mission truth before the grilling/shared-understanding loop has produced an accepted, amended, split, blocked, or rejected decision; at most record mechanical status/evidence and that a proposal is pending review.

## Kinds and authority

### Discovery

Produces evidence that resolves one decision-driving uncertainty or a tightly related set that must be understood together. The executor may move it to Review, but Mission Control accepts and closes material Discovery work; its findings become mission decisions only after that acceptance.

### Decision

Produces a coherent decision set or accepted contract. Agents verify evidence, compare defensible options, state trade-offs, and recommend. Mission Control owns activation and closure.

### Deliverable

Creates or amends one independently useful durable artifact or a tightly related set named or explicitly bounded in the Ready ticket and reviewed and accepted together. Mission Control owns activation and acceptance when it fixes product behavior, architecture, execution obligations, validation obligations, or the frozen baseline.

### Execution

Implements one approved slice. It cannot amend its own objective, scope, architecture, or acceptance criteria. Deviations return to Mission and may propose a Decision frontier on the map. Mission Control accepts and closes material Execution work only after its implementation evidence and required independent implementation verdict are complete.

For non-trivial implementation, use `strategic-implementation` when installed. Its return is a local candidate commit, not a transition to Review or permission to push. Keep the Execution ticket Active and route `C0` to `implementation-review` in fresh agent context. The reviewer independently checks the full base-to-candidate range, tests, approved design, contract, and non-goals; it does not perform the later use-case QA phase. Corrected candidates normally return incrementally to the same independent reviewer with the candidate ledger and previous-to-current range.

The reviewer returns `Pass`, `Request changes`, or `Inconclusive`:

- `Pass` completes the in-ticket review evidence and permits the Mission owner to move the Execution ticket to Review.
- `Request changes` keeps the ticket Active for bounded fixes inside the frozen contract by the same implementer context when available, followed by incremental re-review by the same independent reviewer. A contract or architecture gap, or a finding that changes scope, product policy, risk, or acceptance, returns to the map instead of becoming silent rework.
- `Inconclusive` keeps the ticket Active or Blocked and names the evidence, access, or decision needed.

The Execution review body includes compact design-quality evidence: complexity impact, concepts/interfaces changed, invariants represented directly, policy homes or duplicated policy deferred, APoSD residual risks, candidate lineage, finding ledger, and the independent verdict. Tests prove technical behavior; they do not by themselves prove that the approved design was implemented honestly.

### Validation

Exercises accepted use cases and produces independent behavioral evidence and a verdict. Validation is a separate material ticket after the implementation it depends on is accepted. The validator moves the Validation ticket to Review; Mission Control accepts and closes it. The validator does not accept or close the mission.

For behavior-changing design, accepted use cases are required design evidence: each case records enough preconditions, action, and observable outcome to constrain the solution and later judge it. Genuinely non-behavioral work does not need artificial cases. Validation consumes the accepted baseline rather than inventing success semantics after implementation. It may add exploratory cases, but labels them separately so new discoveries do not silently rewrite the accepted baseline.

For use-case validation, use `use-case-qa` when installed. Its execution method is project-specific and must be named in the ticket: a simulator or domain harness, browser/desktop automation, API or CLI driver, staging environment, human-assisted procedure, or another observable seam. The skill chooses from capabilities evidenced in the project; it never assumes that one harness exists everywhere.

### Task

Performs bounded setup or mechanical work with no material decision. Agents may manage its lifecycle inside an approved material ticket.

## Materiality test

A ticket is material when it can change any of:

- mission outcome, appetite, scope, no-gos, or success signal;
- public behavior, business rule, authorization, ownership, or accepted risk;
- architecture, persistence, security, migration, rollback, or operations;
- execution-contract baseline or evidence required for acceptance;
- mission verdict, reframe, abandonment, or closure.

When unsure, treat the transition as material and show it on the map.

Materiality determines authority and visibility, not ticket granularity. Several material decisions may belong to one work package when they are coupled.

## Work-package test

Group questions, decisions, and artifacts in one ticket when they:

- combine into the same downstream contract or independently useful result;
- depend on substantially the same evidence;
- constrain one another;
- share a governing Kind, route, owner, and authority level; and
- have little value or cannot be accepted sensibly in isolation.

Split work into separate tickets when a part can be scheduled, assigned, accepted, deferred, or implemented independently; requires a different authority or risk treatment; or can block or branch without preventing the rest from being useful.

The number of questions, decisions, artifacts, commands, or files does not determine ticket count.

A finding or decision inside an active ticket never authorizes an unlisted artifact, implementation, validation, or other downstream action. Surface that work as fog or a proposed frontier on the map unless Mission Control explicitly amends the active ticket before the new work begins.

Examples:

- **Group:** one Decision ticket resolves coupled authentication timeout and refresh-policy choices that form one accepted policy contract.
- **Group:** one Deliverable ticket updates a named specification and companion rationale when they share one purpose and acceptance decision.
- **Split:** a Discovery ticket identifies an implementation change; propose an Execution frontier on the map instead of implementing it inside Discovery.

## Collaborative frontier loop

1. Agent shows the current map and proposes one frontier without creating a ticket.
2. Mission Control selects or amends it.
3. Agent creates the selected ticket as Ready once scope and evidence are clear, then marks it Active.
4. Agent writes enough durable ticket/map context for a fresh executor, gives the activation briefing, and stops. The material ticket runs in a fresh session by default.
5. Owner works mechanical subtasks without expanding the ticket; communicate only at material checkpoints. For Execution, the implementer preserves a local candidate commit and Mission routes `C0` to a fresh-context implementation reviewer inside the same Active ticket. Repairs normally reuse the implementer and reviewer contexts with incremental commit ranges.
6. Owner returns result, evidence, remaining uncertainty, map delta, and worktree disposition; the ticket becomes Review only when all required evidence is complete. For Execution, that includes a `Pass` independent implementation verdict. The session then stops at the human ticket checkpoint.
7. Required authority accepts, rejects, splits, blocks, or abandons it. If the Review brief predeclared one eligible successor, acceptance also selects that successor.
8. Map updates; an accepted predeclared successor is created and activated for a fresh session, then the current session stops.

A ticket result never authorizes the next lifecycle phase. Discovery does not authorize deliverables; a deliverable does not authorize the next deliverable; a plan does not authorize implementation; QA does not accept the mission.

## Session isolation and ticket disposition

Each material work package is an independently resumable unit and uses a fresh execution session by default. Session isolation limits context bleed, makes the ticket contract testable by a fresh agent, and gives Mission Control a deliberate repository checkpoint.

A session opened with an explicit directive to work on, continue, or execute the current/next ticket **is** the fresh execution session. Do not turn one isolation boundary into two sessions merely because the agent must create or activate the ticket after loading the map.

Progression has two dimensions:

1. **Ticket authorization** moves the selected ticket to Active.
2. **Session-continuation authorization** permits working that ticket—or a following ticket—in the current session.

Mission Control may grant both dimensions in one contextual instruction. Do not infer same-session execution from ticket approval alone: once the immediately preceding proposal satisfies the Ready contract, “yes,” “activate it,” “approved,” or “go ahead” authorizes only the ticket transition. After default activation, persist the Active ticket and handoff, state that execution should resume in a fresh session, and stop.

At session start or resume, phrases such as “let's work on the next item,” “continue the active ticket,” “resume Ticket 005,” or “execute the next work package” grant both ticket selection and current-session execution when the target is unambiguous. If no ticket exists yet but its Ready contract can be shaped mechanically from the map and accepted artifacts, create it, mark it Active, give the activation briefing, and proceed with substantive work in that same session. Never end such a response with `execute this ticket in a fresh session`. By contrast, “what's next?”, “show me the next item,” or equivalent questions request orientation only.

At a ticket disposition checkpoint, interpret ordinary language semantically rather than requiring a formula. “Continue here,” “let's do the next one here,” or equivalent language selects the one unambiguous proposed frontier and authorizes its execution in the current session. If its Ready contract can be completed mechanically from accepted mission artifacts and the visible proposal, write it, mark it Active, and work it without asking again. If a material scope, risk, dependency, or acceptance choice is genuinely missing, ask only that substantive question; do not ask Mission Control to approve agent-authored ticket prose or repeat a permission already given.

Before a material ticket is accepted in Review, do not create or activate the next ticket or start its work. An in-ticket implementation reviewer is not a next frontier: it is required completion evidence for the still-Active Execution ticket. Record the full result, evidence, map delta, worktree state, and one concise next-frontier proposal in durable artifacts. In chat, say only the simple outcome, the decision needed, and what acceptance will activate; mention commit or verification state only when it changes the next action.

Use an **acceptance handoff** by default when all of these are true:

- the Review brief names exactly one successor and explicitly says that acceptance will activate it for a fresh session;
- its objective, scope, non-goals, dependencies, and acceptance evidence can be shaped mechanically from accepted artifacts and the visible map;
- no competing frontier or unresolved material scope, risk, policy, or acceptance choice remains; and
- activation creates only the ticket and handoff; it does not execute successor work or advance a gate.

`Close only` is permitted only when the mission is ending, Mission Control requested a pause, there is no single recommended successor, frontiers compete, or a named material scope/risk/policy/acceptance decision blocks shaping the successor. State that reason in the Review brief. “The next frontier remains a proposal,” “no implementation is authorized,” or a general preference for caution is not a reason. When one successor is already named and none of those conditions applies, the agent must predeclare and perform the acceptance handoff.

When Mission Control replies `accepted`, `accept`, `approved`, or equivalent without a contrary instruction, close the reviewed ticket and treat that acceptance as selection of the predeclared successor. Create it, mark it Ready and Active, update the map, give a short product-first handoff, and stop for a fresh session. Never ask for a second `agree`. If any eligibility condition is missing, acceptance closes only the current ticket; ask only the substantive missing question rather than requesting procedural confirmation.

At the resulting **ticket disposition checkpoint**, Mission Control may commit, pause, open a fresh session, or explicitly continue in the current session. If Mission Control requests a commit after an acceptance handoff, commit the accepted ticket changes plus the authorized successor ticket/map handoff, but no successor execution. A later “continue here” acts on the Active successor without another activation ceremony.

Do not end on an acknowledgment of an acknowledgment. If a short reply such as `ok` follows a message that left a genuine choice unresolved, do not respond only with “no action taken” or repeat a menu. Ask one concrete question using the recommended action, such as `Commit these accepted changes now?` If no choice remains because the acceptance handoff already activated the successor, acknowledge briefly and stop.

Same-session continuation is an exception, not a sticky mission setting. It applies only to the unambiguous next frontier selected at that checkpoint and must be granted again at the following checkpoint.

## Contract freeze and amendments

Ready tickets may be shaped. Once a ticket becomes Active, its Objective, Kind, Type, Scope, Authorized outputs, Non-goals, dependencies, and Acceptance/evidence are frozen.

- The owner may fill Result, Evidence, Confidence, Remaining uncertainty, Work log, and Map updates as work proceeds.
- Editorial clarification that does not change authority, output, risk, or pass/fail meaning is allowed and must be visible in the diff.
- A material change requires Mission Control to amend the Active ticket explicitly or to stop it and return to the map with a replacement frontier proposal. Create the replacement ticket only if Mission Control selects it.
- Reviewer findings classified as a new material question, risk/appetite change, incomplete system map, or independently useful objective cannot be silently absorbed through patching.

## Execution candidate lineage and repair loop

Candidate commits are local review checkpoints. `C0` is the first completed candidate; bounded repairs may produce `C1` and `C2`. They do not close the ticket, authorize a push, or constrain Mission Control's later choice to keep, reorder, or squash the sequence. During review, record actual SHAs, verify that the base is an ancestor of `C0` and each previous candidate is an ancestor of its repair, and never amend, rebase away, or silently replace reviewed evidence. Every Execution with independent review keeps a compact ledger containing base/candidate SHAs and routes, verified ancestry, exact full and incremental ranges, stable finding IDs, origin classification, evidence, required outcome, candidate/round, and status.

The first review is full and fresh from the implementer. Re-reviews normally preserve the same independent reviewer context and focus on the previous-to-current repair range, open findings, and regression evidence while retaining access to the full ticket range. Start another fresh full review only when the repair materially reshapes the candidate, adds a new risk or architecture surface, the reviewer is unavailable, lineage is unreliable, or incremental evidence cannot support a defensible verdict.

Return bounded implementation defects and repair regressions to the same implementer context and route when available. Contract and architecture gaps return to the map immediately. Unreliable ancestry prohibits incremental review; preserve the known SHAs and use a recorded fresh-full lineage trigger. Before authorizing a third repair candidate, Mission must stop for a root-cause checkpoint and Mission Control must choose the disposition; `C3` is never automatic.

## Provisional route

Prefer one recommended frontier proposal beyond the current ticket. Add a 2–5 item provisional route only when evidence genuinely supports that itinerary and it helps Mission Control orient. Each optional proposal states Kind/Type, objective, dependency or condition, and confidence (`likely`, `conditional`, or `tentative`). If route depth is unknown, say why instead of manufacturing a lifecycle tree.

The route is orientation, not a promise or authorization. Add, remove, reorder, split, or merge entries when evidence changes.

## When to create a ticket

Keep every unselected frontier as a map proposal. Once Mission Control selects a material work package and its contract is clear enough for `Ready`, create its ticket before execution. Every created ticket therefore represents selected work that is expected to run; never create placeholder tickets for possible future work.

Use the index-card contract by default. Expand it only when the work:

- spans sessions or owners;
- gathers durable evidence;
- can block or branch;
- creates/amends a substantial deliverable;
- carries a material objective or decision set needing durable acceptance;
- needs independent review or reproducibility.

Do not create tickets for individual reads, searches, commands, formatting steps, or other mechanical actions inside an active ticket.

## Splitting and surfacing new work

Stop and split when an active ticket develops an independently useful objective that can be disposed of separately, crosses its non-goals, changes risk class or authority, or requires an unapproved artifact.

Record each new concern as:

- a proposed frontier on the map if it forms an independently useful work package;
- a related question or decision inside the active ticket if it contributes to the same objective;
- fog if still vague;
- out of scope/future mission if consciously excluded.

Do not silently widen the active ticket to absorb it.

## Review return shape

Verification must be proportional to the active ticket and changed surface:

- Before classifying the change, inspect staged, unstaged, and untracked files. Check whether documentation contains executable examples or feeds a docs/build/release pipeline.
- For a decision, specification, plan, or Markdown-only deliverable, verify artifact structure, links, traceability to accepted decisions/evidence, internal consistency, and review findings.
- Do not run the full product test, typecheck, lint, or build suites merely to produce a green verification line when no executable code, configuration, schema, test, dependency, generated artifact, or build-consumed documentation changed.
- Run an executable suite only when the ticket explicitly requires baseline evidence, an executable example/generated artifact can affect it, or the changed surface can plausibly break it. State that reason with the result.
- When suites are not relevant, report `Not run — no executable changes` rather than treating an unchanged baseline as evidence that a proposed contract is correct.

A passing unchanged suite proves only that the pre-existing implementation baseline is green; it does not validate new behavior described solely in a proposed artifact.

Every material ticket returns a compact review body:

```markdown
## Result

<coherent answer, accepted contract, artifact set, implementation result, or verdict>

## Evidence

<paths, commands, tests, observations, sources>

<!-- For Execution, include the independent implementation-review verdict and its evidence. -->

<!-- Optional for non-trivial Execution tickets:
## Design quality evidence
- Complexity impact:
- Concepts/interfaces changed:
- Invariants represented directly:
- Policy homes / duplicated policy deferred:
- APoSD residual risks:
-->

## Remaining uncertainty

<what is still unknown; "None material" is allowed when justified>

## Map delta

- Known:
- Decisions:
- Fog:
- Proposed frontiers:
- Gate:
```

Omit empty map-delta categories. Keep detailed logs in the ticket or supporting artifacts, not in the human-facing brief.
