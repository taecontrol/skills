# Arm B: expect tests

Write tests as **expect tests**: each one runs a behavior and records its output inline with the test runner's inline snapshot (`toMatchInlineSnapshot` in Vitest and Vite+), filled in by the runner, never typed by hand.

- **Record what a person or agent sees:** an operation's response, or the text and state a screen shows, rather than internal calls.
- **Read every snapshot before you accept it.** A snapshot you accepted without reading checks nothing. When a snapshot changes, read the diff and decide whether it is the intended behavior or a bug.
- **Pick examples that would show a wrong answer:** the spec's examples, its edges, and what must never happen.
