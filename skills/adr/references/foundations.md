# ADR foundations

Load this reference only when maintaining the skill, comparing a project-specific ADR convention, or resolving a disputed ADR practice. Routine creation and editing should follow `SKILL.md` without loading this file.

## Primary source

- Michael Nygard, [“Documenting Architecture Decisions”](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) (2011). Popularized ADRs as short, modular records of architecturally significant decisions. Introduced title, context, decision, status, and consequences; monotonic numbering; and preservation of superseded decisions.

## Operational guidance

- AWS Prescriptive Guidance, [“Architectural decision record process”](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html). Covers qualification, ownership, lifecycle, review, decision logs, and supersession.
- AWS Prescriptive Guidance, [“Best practices for using architectural decision records”](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/best-practices.html). Emphasizes preserving history, shared access, ownership, and proportionate review.

## Templates and current synthesis

- [Markdown Architectural Decision Records (MADR)](https://adr.github.io/madr/). Provides structured Markdown templates, optional alternatives and consequences, and a confirmation concept. Use as a source of possible fields, not a requirement to include every field.
- Martin Fowler, [“Architecture Decision Record”](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html). Emphasizes a single short decision, rationale, credible alternatives, ramifications, confidence, triggers for reevaluation, and supersession instead of silent rewriting.
- [ADR GitHub organization](https://adr.github.io/). Maintains definitions, tools, templates, publications, and links across the ADR ecosystem.

## Broader architecture documentation

- Paul Clements et al., [*Documenting Software Architectures: Views and Beyond, 2nd Edition*](https://www.sei.cmu.edu/library/documenting-software-architectures-views-and-beyond-second-edition/), Software Engineering Institute. Provides rigorous guidance on architecture documentation, stakeholder communication, and rationale.
- [ISO/IEC/IEEE 42010:2022](https://standards.ieee.org/ieee/42010/6846/), *Software, systems and enterprise — Architecture description*. Provides the formal architecture-description foundation, including stakeholders, concerns, decisions, and rationale. It is background, not a daily ADR template.
