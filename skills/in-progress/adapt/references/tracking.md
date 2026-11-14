# Tracking file

Keep the file where version control does not see it: an established convention for local work files, or `.work/`, added to the repository's exclude file, `$(git rev-parse --git-common-dir)/info/exclude`, when nothing ignores it. This holds over any general instruction against writing planning files.

It opens with what a reader without this thread needs: where the work is, the human's rules for it in their words, the skills in force, the contract and the route, the gates, and what is next. After a compaction, read it first and load the skills it names.

## A list

When the work is a list, the items follow, grouped by shared cause, each with its source, whether its case is live or improbable, whether this work introduced it, its cause, the fix, its proof, and its status, and each decision with the human's answer and its date. A group's plan is its contract lines, its fixes, and their proofs.

Show the groups and their order in a stop, and ask once which groups wait for their word before you build and which go on after a clean review. Take one group at a time through the skill's steps 1 to 5, and update the file before a turn ends. Each group runs its own proofs. For a high-stakes group, the skill's step 3 reviewer reads its plan before you build it and its commits after. When step 5 calls for `pr-review`, it runs once, after the last group. A group is done when its proofs pass and its review, when it has one, has no open finding.
