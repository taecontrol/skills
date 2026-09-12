---
name: coding-standards
description: "Create, audit, or update a project's durable review standards. Use explicitly when accepted, project-specific coding rules require human judgment and cannot be enforced reliably by tooling."
---

# Coding standards

Maintain one concise project source for rules an independent reviewer must judge. Treat observed code as evidence, not policy, and prefer executable enforcement whenever it is reliable.

## Process

1. **Resolve the source.** Use the path named by the user, then an established project standards source, otherwise root `CODING_STANDARDS.md`. Read any existing source before proposing changes. Do not create a second canonical file.
2. **Inspect competing owners.** Inspect only enough applicable agent instructions, contribution guidance, scripts, CI, formatter, linter, type, test, and build configuration to find contradictions, duplication, or a stronger owner. Inspect code only to understand the consequence and scope of a candidate rule; prevalence does not make a pattern accepted policy.
3. **Filter each candidate.** Keep a rule only when it is accepted, project-specific, durable across changes, concrete enough to judge in a diff, and not reliably enforceable elsewhere. Route other information without modifying its owner:
   - machine-checkable rules belong in executable configuration or CI;
   - navigation, non-obvious working choices, hazards, and authority boundaries needed during implementation belong in applicable agent instructions;
   - requirements, architecture, domain meaning, and durable rationale belong in their maintained sources;
   - task findings and preferences without project authority are not standards.
4. **Propose the smallest delta.** Show exact additions, revisions, removals, moves to stronger owners, and unresolved conflicts. Prefer deletion when a rule is stale, duplicated, generic, too vague to review, or now enforced automatically. Ask only about material policy choices that available evidence cannot settle.
5. **Obtain acceptance.** Do not establish or change project policy without explicit human acceptance of the proposed delta. A review, implementation, or retrospective finding may recommend a candidate rule but cannot add it as a side effect.
6. **Apply and verify.** Preserve unrelated content and write only the accepted delta. Use a simple `# Coding standards` document with `## Review rules` and, only when needed, `## Exceptions`. Verify that every retained rule has a clear review consequence, every pointer resolves, no stronger executable owner already enforces it, and the repository diff matches the accepted delta.

## Boundaries

- Do not copy package scripts, development commands, validation gates, tool settings, directory inventories, or framework facts into the standards file.
- Do not install or configure tooling, edit agent instructions, review an implementation, or repair code. Report a better owner without modifying it unless the user separately authorizes that work.
- Do not import a generic style guide or turn current code frequency into desired direction.
- Keep exceptions narrow. Preserve rationale here only when it is needed to apply the exception and no durable decision source owns it better.
- Do not add per-rule owners, status, timestamps, history, or boilerplate sections. Git preserves document history; omit empty sections.

## Outcomes

- `No standards needed`: no accepted rule requires a dedicated review-standard source, so no file is created.
- `No changes needed`: the existing source is concise, current, and correctly owned.
- `Agree-ready`: one minimal delta is ready for human acceptance; no file has changed.
- `Updated`: the accepted delta was written and verified at the reported path.
- `Inconclusive`: name the exact authority conflict or missing project decision that prevents a safe proposal.

## Completion criteria

The project has at most one canonical review-standard source containing only accepted, durable, project-specific rules that require reviewer judgment, or no such file because no rule earns one. Every mutation matches an explicitly accepted delta, and no executable rule or other maintained knowledge was duplicated.
