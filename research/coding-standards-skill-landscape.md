# Coding-standards skill landscape

> **Revised direction:** the later `agents-md` investigation found a concrete reason to keep review-only coding standards outside always-loaded agent instructions: context isolation between implementation and independent review. A separate standards artifact is justified; whether its lifecycle deserves a narrow `coding-standards` skill or a broader future retrospective skill remains an open design decision. See [`agents-md-skill-landscape.md`](agents-md-skill-landscape.md).

## Question and bound

What minimum skill should create and maintain a project's durable coding-standard source so implementation specification, implementation, and review can apply the same accepted rules without duplicating executable configuration or turning observed habits into policy?

The review covers Taecontrol's last coding-standard seed and its consumers, Matt Pocock's current engineering skills, the cross-agent `AGENTS.md` convention, GitHub's current distinction among instructions and skills, and executable style/rule configuration represented by EditorConfig and ESLint. Sources were inspected on 2026-09-12. The design of implementation and review workflows is out of scope except where it establishes the consumer boundary.

## Conditional verdict

A separate review-standard artifact is useful when a project has accepted rules that tooling cannot enforce and an independent reviewer must judge. Matt Pocock's experimental `retro` skill supplies the missing rationale: the implementation agent carries exploration, writing, and debugging context, whereas the reviewer starts with a compact diff, so review is the cheaper and clearer place to load prose standards. It also says always-loaded `CLAUDE.md` and `AGENTS.md` files should be used sparingly, primarily for navigation pointers. [Matt `retro`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/in-progress/retro/SKILL.md)

A dedicated manager skill may still be useful, but that conclusion does not follow automatically from needing the artifact. If created, name it `coding-standards` and make its description say that it **creates or updates the project's review standards**. Existing skills with this name commonly bundle and apply a generic rulebook, so the verb is needed to prevent it from competing with implementation or review. [Generic coding-standards example](https://github.com/iurysza/agent-skills/blob/75fbca5074af5b94814683f5145e1f3edb454030/skills/coding-standards/SKILL.md)

Keep such a skill explicitly invoked because it changes durable project policy. Its output would be one maintained source at the repository's established location, falling back to root `CODING_STANDARDS.md`. Other Factory skills would consume that file directly; they would not invoke the manager.

The file should hold only:

1. accepted project-specific rules that require review judgment and are not reliably enforced by tooling;
2. narrowly scoped exceptions, with their accepted rationale or a pointer to the durable rationale.

It should not hold project orientation, agent workflow, architecture, domain language, implementation requirements, generic programming advice, duplicated formatter or linter options, or historical review findings.

## What survives from the previous design

The old `implementation-review` mode correctly required explicit human authority, one durable destination, concise diff-reviewable rules, and duplicate detection. It also kept standards creation separate from a live candidate review. Those constraints survive. [Previous implementation-review](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/implementation-review/SKILL.md)

The bundled seed does not survive as the default contents. Its `Test evidence` rules are shared engineering guidance already present in `strategic-programming`, while `Durable names and dependencies` contains goal-map and `.goals/` concerns from the retired orchestration design. Copying either section into every repository would make project standards repeat Factory defaults and preserve obsolete vocabulary. [Previous seed](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/implementation-review/templates/coding-standards.md) [Shared strategic standard](https://github.com/taecontrol/skills/blob/2cf931ce75cd3feb91228106115ff9ef180c328f/skills/strategic-programming/SKILL.md)

The previous rule against mining the repository for policy was too absolute for setup. A standards manager must inspect existing scripts, CI, formatter and linter configuration, contribution docs, and scoped instructions to discover conflicts, duplicates, and stronger executable owners. The safe boundary is different: observation may produce a draft or question, but only an explicit source or human acceptance may promote an observed convention into a standard.

Once the dedicated skill exists, `implementation-review` should lose its seed mode and template. Review remains a read-only consumer of the established standards source.

## Boundaries with nearby artifacts

### `AGENTS.md` and harness instructions

The open `AGENTS.md` convention explicitly supports build commands, tests, coding style, and security context, and allows nested files whose closest scope wins. GitHub distinguishes standing cross-agent instructions from task-specific skills. [AGENTS.md](https://agents.md/) [GitHub customization model](https://docs.github.com/en/copilot/concepts/agents/code-review#enhancing-copilots-knowledge-of-a-repository)

That makes `AGENTS.md` a valid conditional pointer or operational source, but not a reason to duplicate every rule. For this Factory, use `CODING_STANDARDS.md` for review-only judgment rules and keep `AGENTS.md` sparse: navigation, non-obvious choices, hazards, and authority boundaries needed during work. Existing accepted rules in either source must be reconciled, not copied silently. Adding a pointer to agent instructions is useful only when an implementation-time condition requires an agent to consult the standards file; an independent review skill can discover the file itself.

### Executable configuration

EditorConfig exists specifically to apply file-formatting rules across editors. ESLint configuration gives rules enforceable severities; an error produces a failing exit status suitable for CI, while a warning is appropriate when the signal is not certain enough to enforce. These mechanisms are stronger owners for mechanical policy than prose. [EditorConfig](https://editorconfig.org/) [ESLint rule configuration](https://eslint.org/docs/latest/use/configure/rules)

Therefore, the standards file should not inventory validation commands that already live in package scripts, build files, or CI. Tool configuration and its executable entry point own mechanical gates. When prose and executable configuration disagree, surface the conflict for human resolution rather than choosing one silently.

### Architecture, domain, and rationale

Architecture documents own system shape, the glossary owns accepted domain meaning, and ADRs own durable rationale that code and current documentation cannot reveal. The standards file may link to one of these only when a short rule names the exact condition under which it applies. It must not summarize those artifacts.

## Comparable skills

Matt Pocock has no promoted standalone standards manager at the inspected revision. His stable `code-review` discovers `CODING_STANDARDS.md`, `CONTRIBUTING.md`, and similar repository sources, gives documented repository policy precedence over its built-in smell heuristics, and skips checks already enforced by tooling. His experimental `retro` skill proposes maintaining `CODING_STANDARDS.md` from recurring review findings and removing stale or enforceable rules. Together they support a distinct project-owned, review-time source and a deletion-capable lifecycle, but `retro` is explicitly still a stub. [Matt `code-review`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/code-review/SKILL.md) [Matt `retro`](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/in-progress/retro/SKILL.md)

Matt's setup skill illustrates the useful mutation shape: inspect first, present findings and a draft, obtain confirmation, then write repository configuration. It is specific to his issue-tracker and domain-doc ecosystem, so its artifacts and questions should not transfer. [Matt setup](https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/setup-matt-pocock-skills/SKILL.md)

Anthropic's Claude Code plugin example includes a `code-standards` skill that hardcodes generic formatting, naming, documentation, error-handling, and security advice. It demonstrates a reusable rulebook, not project-standard management. Arbitrary cross-language defaults such as line limits or indentation are exactly what this skill should avoid inventing. [Anthropic plugin example](https://github.com/anthropics/claude-code/blob/2b40e76d3f03b9070e2431e0bd05b4f3ace77982/plugins/plugin-dev/skills/plugin-structure/examples/standard-plugin.md)

## Recommended contract

### Invocation and authority

Use explicit invocation to create, add, change, remove, or reconcile project coding standards. The agent may inspect facts and recommend a rule, but only an already authoritative source or explicit human acceptance can establish policy. Never modify the standards file as a side effect of implementation or review.

### Inspect before proposing

Resolve the destination from a user-supplied path, an established repository standard, or root `CODING_STANDARDS.md`. Read existing standards and relevant `AGENTS.md`, `CONTRIBUTING.md`, CI workflows, task scripts, test configuration, formatter and linter configuration, and package/build files. Inspect only enough source code to understand the scope of an explicitly requested rule or a detected contradiction; do not convert code frequency into policy.

Classify each candidate addition:

- **Executable gate:** move or keep it in its script, tool configuration, or CI owner; do not copy it into prose.
- **Human-reviewed rule:** retain only when it is project-specific, accepted, concrete enough to judge in a diff, and not reliably enforced elsewhere.
- **Pointer:** keep a short conditional link when architecture, domain, security, or another maintained source owns the detail.
- **Not a standard:** omit task-specific requirements, generic advice, observed habits, explanations, and duplicates.

Show the proposed delta, conflicts, stronger executable owners, and removals to the human before writing. A project rule such as the CRAP threshold of `8` belongs in the project's executable CRAP configuration or validation script, not in this prose file. Do not install or configure tooling merely to make the document look complete.

### Minimal maintained file

Prefer one section and add the second only when needed:

```markdown
# Coding standards

## Review rules

- <One accepted, directly reviewable project rule.>

## Exceptions

- **<scope>:** <exception> — <accepted rationale or durable rationale pointer>.
```

Omit empty sections. Do not add validation-command inventories, per-rule metadata, ownership tables, status, or change history; the repository and Git already preserve those facts.

### Update and cleanup

For an update, change only the affected rule. Remove prose superseded by executable configuration, stale commands, obsolete exceptions, and duplicates after human acceptance. If two authoritative sources conflict, stop with the exact conflict and ask the human which source should own the rule. Do not leave two competing rules for consumers to interpret.

After writing, verify that referenced files and commands exist and that the Markdown is internally consistent. Run a safe, bounded command only when needed to confirm its invocation; managing the document does not imply permission to install dependencies, change tooling, or run an expensive full suite.

## Recommended first version

If a dedicated manager proves preferable to a broader retrospective workflow, create one self-contained, explicit-only `coding-standards` skill with a small seed template containing `Review rules` and optional `Exceptions`. It would support creation and focused updates to one durable project file. It would not apply standards to code, review a candidate, configure tools, maintain `AGENTS.md`, or ship generic coding doctrine.

Separately, revise `implementation-review` when it is recovered: remove `Seed project standards`, remove its bundled template, and keep only standards discovery and read-only application. No change to `implementation-spec` is required; it already treats the project's standards as an input and explicitly handles missing CRAP configuration.

## Evidence limits

No inspected source provides outcome data comparing `CODING_STANDARDS.md` with `AGENTS.md` as the canonical policy file. Matt's explicit rationale appears in an in-progress stub rather than a promoted skill. The recommendation to separate them is therefore a grounded hypothesis based on their distinct readers, context costs, and enforcement mechanisms. The exact non-mechanical rules remain project decisions, not defaults this research can infer.
