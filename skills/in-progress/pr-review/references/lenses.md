# Lenses

Each lens is a set of questions to ask of the whole change, its callers, and its siblings. A suspect needs a scenario: the input or event, the path through `file:line`, and the consequence.

## Failure and lifecycle

- **Ordering around side effects.** For each pair of side effects, such as write and commit, delete and audit, take and decrypt, send and record: what state is left when the second throws, the process dies between them, or the response is lost after the commit? Does the protective step run before the step that can fail? Can a throw inside `finally` or a cleanup replace the result the code was about to return?
- **Every way a resource ends.** List how each resource the change creates can end: success, error, timeout, idle, abandoned midway, `SIGTERM`, deploy. Which of those paths release it? Resources include connections, locks, temporary users and roles, tokens and credentials, sessions, timers, and background tasks. A fire-and-forget task needs a stop handle and a handled rejection; a sweep needs to page through everything it owns.
- **Shared fate.** What does one hung dependency, one dropped connection, one hostile input, or one noisy tenant do to the whole process and to other tenants? Every network call needs a timeout. An `error` listener must be attached before the first await on the resource. Work sized by input, such as regex backtracking, parsing, and unbounded reads, needs a bound. Ask which pools, slots, and locks a stall pins.
- **Concurrency.** For each pair of transactions on the same rows, find the order each locks them in and what handles a deadlock or serialization failure. Check races between people's actions, such as cancel against complete and a double click. Check retries, duplicates, and idempotency, and the previous release running beside this one through a rollout and its migrations.

## Trust and record

- **Trust boundaries.** Who controls each input: a header, a query parameter, a token claim, a body, a file, a value someone else stored? The code must enforce the invariant it states for every input, beyond the common shape: values as well as key names, every Unicode and case spelling the storage treats as equal. Tenant identity comes from the authenticated token, and every query carries its tenant predicate. Secrets stay out of source, logs, responses, and previews. Ask whether a write can reach code execution, such as a script, stored UI code, or a command. Each new entry point needs the validation, authorization, and limits its peers apply.
- **What people see against what runs.** An approver, a user, or an audit log must see what actually runs, with nothing lost to truncation, previews, or summaries. Refusals and errors must be recorded as refusals, with their reason, on every path, including a throw.
- **Claims.** Check each entry in the claims ledger against the code. A false sentence in documentation or a comment is a defect. A safety promise in the description that the code does not keep is a blocker.

## Contracts and design

- **Consumers.** For every new or changed name, error code, field, route, or event, find who reads it, in this repository and across the stack. Look for a code nothing handles, a field the client ignores, documentation tables, error catalogs, or API references the project requires to change with the code, and merge and deploy order across the stack.
- **Client state.** Data the server gives only once, such as a token, a secret, or a one-time link: what loses it? Check a remount, navigation, a failed refetch that replaces loaded data, a failed promise such as a clipboard write, and a lost response. Give each query a loading, error, and empty state. Read the library's semantics for the version in use from its documentation.
- **Architecture.** Apply coding principles and SOLID in the language of the diff. Check co-location: files that change together live together. Check that names and structure tell the code's story without comments doing the work. Check how layers connect, where the seams sit, which component owns what, abstractions that are wrong, contracts that will be painful to evolve, and layers that blur. Judge the architecture as a whole, with line-level wording left out.
- **Standards.** Check the project's rules from step 2, such as type safety in new code, file length, a clean lint and type check, and the project's naming and error conventions.

## Tests

- **Mutations.** For each guard the change adds on a security, tenant, or privilege boundary, or on a cleanup path such as a `finally`, delete or invert it in the checkout and run only the test files that should cover it. Give each mutation a time limit and restore it afterwards. A guard whose removal leaves those tests green is a finding. Judge the other guards by reading which test asserts them.
- **Vacuous fixtures.** Look for fixtures that make a guard vacuous: one tenant, one user, one role, empty lists, a fake that accepts any request, a stub that always resolves. Look for fakes that behave differently from the real dependency they stand in for.
- **Gaps.** Look for behaviors and edge cases the suite never asserts, tests that pass either way, assertions weaker than the test's name, sleeps and wall-clock dependence, and tests CI never runs, such as ones behind path filters or in skipped jobs.
- **Fix code.** On a re-review, every fix from the previous round needs a test that fails without it.
