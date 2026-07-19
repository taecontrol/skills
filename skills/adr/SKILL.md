---
name: adr
description: "Use when creating, editing, or reviewing an Architecture Decision Record (ADR), or when a durable gap in architectural rationale appears during software work. Determines whether an ADR is actually needed, investigates the missing why, requires human approval before writing, and produces a minimal decision record without implementation detail."
license: MIT
---

# ADR

An Architecture Decision Record preserves **why** a project took a consequential direction when code and ordinary documentation cannot tell the whole story. The successful outcome is a minimal, durable explanation—or an evidence-based recommendation not to create an ADR.

Do not treat a feature, technical choice, or missing document as automatic justification for an ADR. Qualification and writing are separate stages.

## Invocation branches

### Explicit ADR request

When asked to create an ADR, inspect the project and investigate the rationale before writing. Even an explicit creation request does not waive the creation gate.

When asked to edit or review an existing ADR, inspect its context and requested change, then route to **Reconcile project conventions**, **Edit without rewriting history by accident**, the compression pass, and verification as applicable. Do not force an editorial edit or review through the new-ADR creation gate; semantic rewrites have their own explicit human gate.

### Gap detected during other work

When a possible rationale gap appears during feature implementation, do not interrupt the feature to start an ADR investigation. Finish and verify the feature, then add one brief recommendation explaining why the gap may need an ADR. Ask no ADR-research questions until the human chooses to investigate.

Example:

> **Possible ADR:** The implementation now depends on ordered event processing, but the repository does not explain whether ordering is a business requirement or an accidental constraint. This gap will remain after implementation, so I recommend investigating whether it needs an ADR.

For work other than feature implementation, raise a material gap when it becomes relevant, but do not create an ADR without the qualification and approval below.

Completion criterion: proactive invocation identifies a concrete durable gap rather than reacting to the mere presence of a technical decision.

## 1. Inspect before asking

Read the relevant code, project instructions, documentation, glossary or ubiquitous language, existing ADRs, and repository history before asking people to repeat discoverable facts.

State the gap precisely:

- what the project currently does or assumes;
- what evidence shows that state;
- what important rationale remains unknowable;
- why normal implementation and documentation will not make it clear later.

Adopt the perspective of a new developer. Apply the **after-implementation test**:

> After the implementation is complete, could a new person or agent understand why the project is in this state from the code and maintained documentation?

If yes, an ADR is probably unnecessary. If no, continue investigating; a knowledge gap is a candidate, not yet an ADR.

Completion criterion: the agent can name the missing why without guessing it and has exhausted the relevant code and documentation first.

## 2. Ask, understand, and classify the gap

Ask the people who know the project to explain the missing context. Ask the fewest material questions needed; when an answer determines the next question, ask one at a time. Explore:

- whether the current state came from a deliberate decision;
- the business or technical context that mattered;
- constraints, risks, or trade-offs that shaped the choice;
- whether the rationale still affects future changes;
- what kind of durable documentation is actually missing.

Never reconstruct historical intent solely from code. When nobody can confirm the original rationale, distinguish observed facts, supported inferences, hypotheses, and unknowns. Uncertainty may be accepted; invented certainty may not.

Classify the gap before proposing an ADR. It may instead require domain documentation, a business-process description, functional documentation, a specification, an operational guide, or another artifact. This skill may recommend that artifact and explain why, but must not create it.

An ADR is warranted only when all of these remain true after investigation:

1. A consequential decision or deliberately preserved direction exists.
2. Its important rationale is not reasonably recoverable from code and maintained documentation.
3. The rationale gap will remain after the current implementation is complete.
4. The missing why matters to future change, risk, operation, or understanding.
5. The content is a decision and rationale—not an implementation design or plan.
6. An ADR is a better fit than another documentation type.

A lack of meaningful future consequences is a signal to recheck whether the ADR is needed, not an automatic veto.

Completion criterion: the gap is classified, uncertainty is honest, and the recommendation is ADR, another document type, or no new document.

## 3. Pass the creation gate

Before creating any ADR file, give the human a brief explanation of **why an ADR is needed**. This is not a draft ADR or another template. In one or two short paragraphs, make clear:

- the durable rationale gap;
- why code and current documentation will not close it;
- why an ADR is the right document.

Wait for explicit acceptance. The human may reject the ADR, correct the understanding, request more investigation, or choose another documentation type. Approval to investigate is not approval to create.

Once creation is accepted, write the file directly and review the artifact afterward; do not require a full chat draft unless the human asks for one.

Completion criterion: no new ADR file is created until the human has seen the need and accepted creation; existing-ADR edits follow their separate edit gates.

## 4. Reconcile project conventions

Inspect the repository's current ADR location, file naming, template, language, and lifecycle before writing. Evaluate existing conventions against this skill instead of following them blindly.

If the current structure is materially weaker—for example, it mandates implementation steps, duplicates rationale, or creates long form-driven records—explain the concrete problem and recommend a proportional improvement. Stop and decide the structure with the human before creating the ADR, changing a template, moving files, or migrating existing records. Respect a project-specific difference when it has a sound reason; this skill is opinionated, not absolute.

Use these defaults when the project has no justified alternative:

- directory: `docs/adrs/`;
- filename: four-digit sequence plus a decision-focused kebab-case title, such as `0007-use-transactional-outbox.md`;
- document title: `ADR-0007: Use transactional outbox`;
- number: monotonic, unique, never reused or renumbered; inspect repository history as needed before allocating it;
- language: the predominant language of project documentation, otherwise English;
- status tokens: always English;
- index: none; the numbered file list is sufficient.

A title states the decision. Avoid vague topics such as `database-decision`, `architecture-update`, or `event-discussion`.

Completion criterion: the destination, identifier, language, and structure are known, and every proposed convention change has a human decision before files change.

## 5. Write the minimum sufficient record

Use the agreed project template when a justified convention was retained through the previous gate; otherwise start from [`templates/adr.md`](templates/adr.md). In either case, the record must remain minimum sufficient. The default record contains only:

- title;
- creation date in `YYYY-MM-DD`;
- status;
- context;
- decision and rationale together.

Use only `Proposed`, `Accepted`, or `Superseded`. The date is when the ADR file was created and does not change with status.

Write as if an experienced developer were explaining the decision to a new teammate in plain language:

- **Context:** only the situation, forces, constraints, domain terms, and uncertainty needed to understand why a decision was necessary.
- **Decision:** what was chosen and why, in one coherent explanation.

Add a section only when it materially improves understanding:

- **Consequences:** include real costs, risks, constraints, benefits, responsibilities, or loss of flexibility. Evaluate consequences every time, but do not invent positive/negative symmetry or create the section when it adds nothing.
- **Alternatives considered:** include only options genuinely considered and necessary to understand the choice—especially a credible option a future developer would otherwise propose. Never invent alternatives to complete a template.
- **References:** include only supplemental, durable sources.

Do not add implementation details. A pattern, technology, protocol, invariant, or architectural constraint can be the decision itself; table schemas, classes, functions, commands, configuration, retry intervals, code paths, and implementation steps belong elsewhere. If the decision cannot be explained without such detail, stop and reclassify the artifact.

If evidence or historical rationale is incomplete, say what is known, inferred, hypothesized, and unknown in ordinary prose. An ADR may be `Accepted` with explicit uncertainty.

Completion criterion: a new developer can understand the decision and why it was made without receiving an implementation plan.

## 6. Use durable references without outsourcing the why

Use versioned sources with stable identities and preserved history:

- a project glossary or ubiquitous language that retains deprecated terms;
- other ADRs by stable identifier;
- versioned domain, business-process, or policy documentation;
- versioned contracts, specifications, regulations, standards, or official documentation.

Architectural components and bounded contexts may be named directly in prose, but a link that defines them must target versioned documentation.

Avoid line numbers, volatile file paths, temporary branches, chat messages, unowned documents, or pull requests and tickets that contain the only explanation. A historical issue or PR may be supplemental evidence, never the sole home of the rationale.

Keep the ADR independently comprehensible without duplicating the source. State the fact, constraint, or definition that influenced the decision; link the versioned source for full detail. The ADR should still make sense if every reference becomes unavailable.

Completion criterion: every reference is durable enough for the decision's lifetime, and removing the links would not erase the central why.

## 7. Edit without rewriting history by accident

Inspect the ADR's status, related records, repository history, and the reason for the requested edit.

- Edit obvious spelling, clarity, equivalent-link, and metadata corrections without performative ceremony when meaning does not change.
- For an edit that changes the decision, its rationale, or material consequences, recommend a new ADR as the normal path. Creating that replacement is new-ADR creation: explain why the new record is needed and wait at the creation gate before writing it. Once accepted, the new ADR supersedes the old one; the old ADR becomes `Superseded` and links to the new one, while the new one links back.
- Do not impose immutability as an absolute rule. If a direct semantic edit may be justified, state the history risk, recommend the history-preserving option, and stop. Only an explicit human decision can authorize overriding the normal supersession path.
- Never silently replace past uncertainty with a newly invented or retrospectively polished story.
- If the requested edit exposes a materially weak structure, use the convention decision gate before restructuring it.

A new decision extends history rather than pretending the previous decision never existed.

Completion criterion: editorial edits preserve meaning; semantic changes have an explicit history disposition; reciprocal supersession links resolve.

## 8. Perform the qualitative compression pass

Do not optimize for a word or page count. Optimize for the smallest explanation that remains sufficient.

For every sentence and section, ask:

> If this disappears, does it become harder to understand why the decision was made?

Delete it when the answer is no. Delete repetition, generic background, implementation detail, and material that belongs in a linked document. Then run the inverse test:

> Can a new developer understand why the project took this direction without reconstructing the story elsewhere?

Restore or clarify only what that reader still needs. Prefer short paragraphs, active voice, ordinary words, and direct causal statements such as “We chose X because Y.”

Completion criterion: every remaining passage contributes to the why, and no essential rationale gap remains hidden behind brevity or links.

## 9. Verify and report

Before finishing:

- for a new ADR, confirm the file is in the agreed directory and uses the next unused identifier under the agreed convention; for an edit, confirm the existing identity remains stable unless renaming was explicitly chosen;
- confirm `Date` is the creation date and `Status` is one of the three allowed tokens;
- confirm context and decision explain why without implementation detail;
- confirm optional sections earn their place;
- confirm uncertainty is labeled honestly;
- confirm references are versioned, durable, supplemental, and not code lines;
- confirm supersession links are reciprocal and resolve;
- inspect the final diff for accidental template, index, migration, or unrelated changes.

Report the created or edited path, the decision captured, any explicit uncertainty, and any related ADR status changes. Present the finished file for human review; do not create follow-on documentation automatically.

Completion criterion: the artifact passes every relevant check, the changed surface is known, and the human can review the actual file rather than a promised draft.

## Foundations

Load [`references/foundations.md`](references/foundations.md) only when maintaining this skill, comparing a disputed project-specific convention, or resolving an ADR-practice question. Routine creation and editing should not pay that context cost.

## Failure modes

1. **ADR inflation:** every feature or technology choice gets a record. Apply the after-implementation test and document classification first.
2. **Template momentum:** the presence of headings causes invented alternatives, consequences, or prose. Start minimal and add only material sections.
3. **Implementation leakage:** the ADR becomes a design or execution plan. Keep patterns and constraints; remove code-level realization.
4. **What/how without why:** the result is visible but the forces and rationale are absent. Reopen investigation instead of polishing the description.
5. **Plausible history:** the agent infers intent from code and writes it as fact. Mark inference and uncertainty explicitly.
6. **Reference outsourcing:** links contain the only explanation. Bring the decision-driving fact into the ADR without duplicating the source.
7. **Fragile citations:** line numbers and volatile artifacts rot. Use versioned identities and stable concepts.
8. **Local-convention surrender:** a weak project template is followed because it already exists. Recommend improvement and decide together.
9. **Rigid governance:** a general lifecycle rule blocks a justified professional exception. Explain the trade-off, preserve history deliberately, and follow the human decision.
