---
name: adr
description: "Preserve the rationale of a consequential architecture decision in a lightweight ADR when code and maintained documentation will not retain it. Use to create, edit, or review ADRs, or when settled rationale is about to be lost; keep implementation plans elsewhere."
---

# ADR

Preserve why a consequential architecture decision exists. Produce a minimal durable record, or conclude that an existing artifact, another document type, or no document is the better home.

## Route the request

- **Explicit creation:** qualify the decision, inspect its evidence and repository conventions, then write and verify the ADR. The request authorizes the warranted record; do not add another creation gate.
- **Detected gap:** only consider an already settled decision whose rationale is otherwise ephemeral. Finish the active work where safe, recommend the ADR with the concrete missing why, and wait for the user before creating it.
- **Existing ADR edit:** inspect the record and its history. Apply editorial changes directly; preserve semantic changes through the lifecycle below.
- **Existing ADR review:** apply the qualification, content, history, and verification checks read-only, then report findings.

## 1. Qualify the durable rationale

Inspect the decision, relevant code and tests, maintained documentation, temporary design material, existing ADRs, and history before asking for discoverable facts. An ADR is warranted when all of these hold:

- the decision has consequential architectural, operational, compatibility, or security effects and would be meaningfully costly to reverse;
- a reasonable future contributor would question the choice without its context;
- the rationale reflects a real tradeoff or a material external constraint;
- after temporary design artifacts are retired, code and maintained documentation will not preserve the important why.

A temporary architecture brief is evidence, not a durable home. Conversely, do not duplicate rationale already owned by a maintained design, policy, specification, or other durable artifact. Keep implementation plans, domain definitions, operating instructions, and descriptions of current behavior in their respective artifacts.

Separate observed facts, supported inferences, hypotheses, and unknowns. Never reconstruct intent from code alone or make uncertainty sound settled.

Completion criterion: classify the gap as ADR, another durable home, or no record, with the decisive evidence and uncertainty explicit.

## 2. Reconcile repository conventions

Inspect existing ADR location, naming, template, language, status vocabulary, and history. Follow a sound local convention without migrating or expanding it. When none exists, use `docs/adr/`, a monotonic four-digit identifier with a decision-focused title, the project's documentation language, and the statuses `Proposed`, `Accepted`, `Rejected`, and `Superseded`.

Do not create an index, bootstrap record, directory hierarchy, or tooling unless the user separately requests it. Never reuse an identifier.

Completion criterion: the destination, identity, status, language, and document shape are known before writing.

## 3. Write the minimum sufficient record

Start from [`templates/adr.md`](templates/adr.md) when the project has no stronger template. Keep these sections:

- **Context:** the forces, constraints, uncertainty, and conflict that made a decision necessary.
- **Decision:** what was chosen and why, stated plainly.
- **Consequences:** the material benefits, costs, risks, responsibilities, and lost flexibility created by the choice.

Add **Alternatives considered** only for genuine alternatives whose rejection a future reader may otherwise reopen. Add **References** only as durable supplemental evidence; keep the central rationale in the ADR.

Exclude classes, schemas, commands, file-by-file changes, task breakdowns, verification plans, and other realization details. Those belong to temporary design and implementation artifacts. Compress every passage that does not help a future contributor understand the decision, its rationale, or its consequences.

Completion criterion: the record preserves one decision and its why without becoming the implementation contract.

## 4. Preserve history and verify

Apply corrections that preserve meaning directly. A changed decision, rationale, or material consequence normally becomes a new ADR; mark the old record `Superseded` and link both records. Preserve rejected and superseded records. If a direct semantic edit has a justified benefit, explain the history cost and obtain an explicit human choice first.

Verify the identity, date, status, location, uncertainty, durable references, reciprocal supersession links, and final diff. Report the created, changed, or reviewed path; the decision captured; remaining uncertainty; and related status changes.

Completion criterion: the durable record is minimal and intelligible, its history remains honest, and every changed artifact is accounted for.
