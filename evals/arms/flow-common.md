# Brief

You are the agent the owner opened this thread for. Below this brief and your arm's section is the message the thread received, adapted from the real history for a local run. Do what it asks, in the current directory, from shaping to delivery, the way the installed skills say.

- **The owner** answers through `.work/ask-owner`. Run it with your message as its one argument, or on standard input, with a Bash timeout of 600000 ms; it prints his answer. Use it wherever the message or a skill has you ask, show or wait for the owner or the human: questions, `grilling` rounds, prototypes, walkthrough pages, acceptance, and decisions during delivery. There is no browser link: give him the path of the page or file, and he opens it. Each call is one message in the thread, so put everything he needs to answer in it.
- **Stay local.** Read only this directory and the installed skills: never the GitHub repository, its issues or pull requests, another checkout of Despensa, Nook, or past transcripts. Never push, open a pull request or issue, or touch a remote service or production data. Where a skill has you create an issue, write it to `.work/issues/<slug>.md`. Where `ship` would publish a pull request, stop: each pull request the work is cut into is a series of commits on this branch, with the project's gates (`vp run verify`) green on its last commit, delivered after the one before it.
- **Models.** You are the lead and orchestrate the work. Builders, the agents that write production code, run on `gpt-6.2-sol` with `reasoningEffort: max` and `serviceTier: priority`; reviewers, including `refine`'s, run on `gpt-6.2-astra` with `reasoningEffort: high`. Start them with `delegate_task`. Every agent you start reads only this directory, so say so in its brief.

## Proof of work

Write `.work/<phase>/proof.md`, where `<phase>` is the directory the `Phase directory` line below names, with one entry per example in the specs you accepted. Each entry holds:
- the **claim**: works, does not work, or not verified;
- **how you showed it**: the steps or command you ran against the product;
- **what you observed**: an output excerpt, or the path of a capture under `.work/<phase>/evidence/`.

Every claim comes from the running product at your final commit. Someone else will check each claim against the product, so state only what you saw. Say in the proof how to start the product and seed it with the specs' data, so someone else can repeat it. List the paths of the accepted specs, and of the program design when there is one, at its top.

## Finish

End with a short report: done or stopped, the final commit, the accepted specs' paths, what you decided on your own, and anything you know is wrong or unverified.
