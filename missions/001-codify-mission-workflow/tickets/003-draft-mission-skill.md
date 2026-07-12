# Ticket 003: Draft the `mission` Skill Package

Status: **Closed — accepted by Mission Control**  
Kind: **Deliverable**  
Mode: **Collaborative**  
Owner: **Kratos drafts; Luis reviews**  
Depends on: **Tickets 001 and 002**

## Outcome

Create a portable `skills/mission/` package that makes the human-visible map, shared ticket protocol, collaborative frontier loop, gates, and automation stops predictable across missions.

## Why now

`mission` is the lifecycle container and must define the interface that `discovery` will later obey. Drafting both simultaneously would hide incompatible assumptions and make review harder.

## Deliverables

- `skills/mission/SKILL.md`
- `skills/mission/references/ticket-protocol.md`
- `skills/mission/templates/mission-brief.md`
- `skills/mission/templates/exploration-map.md`
- `skills/mission/templates/ticket.md`

Files may be removed or combined during drafting if progressive-disclosure review shows they do not earn their context or maintenance cost.

## In scope

- Opening one bounded mission from raw human intent.
- Preserving Mission Control authority.
- Maintaining destination, known territory, fog, frontier, decisions, candidate/active/closed tickets, and gates.
- Selecting one material frontier collaboratively.
- Routing approved tickets by Kind and Mode.
- Returning every material ticket to the map before selecting the next.
- Creating deliverables only from active Deliverable tickets.
- Gate, freeze/amendment, verdict, and closure boundaries.
- Lightweight versus durable ticket guidance.
- Explicit interoperability contract for the later `discovery` skill.

## Non-goals

- Solving discovery questions.
- Defining product-specific architecture.
- Implementing or validating software.
- Automatically spawning role agents.
- Automatically creating Product Spec, Technical Design, Implementation Plan, or Validation Plan.
- Requiring GitHub Issues, Jira, or another remote tracker.
- Encoding a large mission taxonomy.

## Drafting method

1. Use the accepted rules from Tickets 001 and 002 as the only authoritative workflow decisions.
2. Keep `SKILL.md` as a concise router/process; move shared ticket semantics and copyable artifacts behind explicit pointers.
3. Make the skill user-invoked by default so starting Mission remains an intentional human action.
4. End every workflow step with a checkable completion criterion.
5. Run a failure-mode review for premature completion, contract theatre, silent chaining, duplication, sediment, and no-op prose.
6. Return the package to Review without drafting `discovery` or advancing to validation.

## Acceptance / evidence

- Frontmatter parses and the skill is discoverable by the repository's skill tooling.
- A fresh agent can explain the current map, active frontier, authority boundary, and next allowed action from the skill alone.
- The skill cannot interpret a scope answer as permission to produce downstream deliverables.
- Every substantial deliverable requires an active Deliverable ticket.
- Mission Control remains required at material decisions and gates.
- Mechanical subtasks inside an active ticket do not require performative approval.
- `SKILL.md` is concise; branch-specific detail and templates are progressively disclosed.
- No duplicated source of truth exists for ticket states and authority rules within the package.
- Repository diff contains only Mission 001 artifacts and the `mission` skill package.

## Review questions for Luis

- Does the skill make the journey visible rather than only presenting gates?
- Would using it feel like Wayfinder/Discovery inside a bounded mission?
- Are the automation stops strong enough without making the process bureaucratic?
- Is any downstream step still too visible and likely to cause rushing?

## Activation decision

**Activated by Luis.** Draft only the `mission` package described here, then return this ticket to Review. Do not draft `discovery` or begin the validation/live-test tickets.

## Result

Drafted the `mission` package with:

- a user-invoked `SKILL.md` centered on the visible-map frontier loop;
- one ticket-protocol source of truth;
- lightweight Mission Brief, Exploration Map, and Ticket templates;
- explicit routing to a future `discovery` executor without letting Mission advance automatically;
- Mission Control authority at material decisions, deliverables, gates, freeze, verdict, and closure;
- mechanical-subtask freedom inside an approved ticket.

No `discovery` skill, implementation ticket, validation ticket, symlink/client exposure, commit, or live mission test was created.

## Evidence

- `npx -y skills add . --list` found `mission` and displayed its trigger description.
- A temporary copied install contained `SKILL.md`, `references/ticket-protocol.md`, and all three templates.
- YAML frontmatter, description length, internal links, expected file count, and non-empty bodies were checked programmatically.
- `git diff --check` passed.
- Current diff scope is limited to Mission 001 artifacts and `skills/mission/`.

## Remaining uncertainty

- Human review has not yet confirmed that the skill feels like Wayfinder/Discovery rather than a gated pipeline.
- Behavioral validation in a fresh agent context belongs to a later approved ticket.
- The packaging relationship with `discovery` remains fog until the `mission` interface is accepted.

## Map updates

- Known territory: a compact two-level package can express the frontier loop without one skill per artifact.
- Decision awaiting: Mission Control acceptance or requested changes for the `mission` package.
- No new ticket is activated.
- Gate impact: Ticket 003 is accepted; repository relocation is complete; behavioral/live validation remains a separate future ticket.

## Mission Control acceptance and relocation

Luis accepted the `mission` draft, then corrected its canonical location: reusable skills belong in `taecontrol/skills`, not a Flaurence product branch. The accepted package now lives under `skills/mission/`; this mission record was renumbered as the skills repository's Mission 001.
