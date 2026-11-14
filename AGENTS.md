# taecontrol/skills

Agent skills, one folder each under `skills/<bucket>/<name>/`. `README.md` explains the buckets, the lifecycle, and versioning. Write every skill and this file with `writing-for-agents`, and finish with `unslop`.

## Changing a skill

A skill changes because a real run went wrong. Adding a rule for each incident is what makes skills fail. Each new rule takes attention from the others, and the catalog grows until agents follow none of it closely. Change a skill this way instead:

1. **Start from the transcript** of the run that went wrong, and find the point where the agent decided.
2. **Find why the text that should have caught it did not hold.** The rule may be missing, but more often it exists and is too long, conflicts with another rule, sits in a skill the agent had not loaded at that point, or asks for something the model will not do from text alone. Fix that cause: delete, move, merge, or resolve the conflict. Add a rule only when none covers the case. When a rule cannot hold as text, propose a mechanism to the owner, such as a hook or a line in their global instructions.
3. **One home per meaning.** Each rule lives in the skill that owns that kind of work; other skills point to it. A change that copies a rule into a second skill moves it instead.
4. **The catalog does not grow.** Count the words of every file the change touches before and after, and put both counts in the pull request. A net increase needs the owner's explicit agreement, with its reason.
5. **Replay the real failure before merging.** Give a fresh agent the changed text and the situation from the transcript just before the decision went wrong, without the outcome. The change holds when its decision differs from the one in the transcript. A scenario someone invented for the test does not count.

Each release bumps the version in `package.json` and `package-lock.json`, adds a short entry to `CHANGELOG.md`, and updates the bucket's README when a skill's one line changes.
