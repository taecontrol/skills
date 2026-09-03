# Assignment and completion envelopes

Use these schemas across harnesses. A backend may encode them as JSON, structured messages, or plain text, but it must preserve every applicable field and exact Factory outcome.

## Assignment

```text
FACTORY ASSIGNMENT
assignment: <durable assignment identity>
attempt: <attempt identity>
initiating-owner: <Coordinator | Slice Owner | Goal Validation Owner>
target-role: <role>

factory-identities:
  goal-map: <identity | not applicable>
  project-profile: <identity>
  phase: <identity or name>
  design-baseline: <identity | not applicable>
  slice-batch: <identity | not applicable>
  execution-plan: <identity | not applicable>
  human-acceptance: <identity | not applicable>
  accepted-slice: <identity | not applicable>
  candidate: <identity | none>
  base-revision: <revision>

execution:
  workspace: <exact identity and path>
  resource-lease: <identity | none>
  harness: <requested harness or permitted set>
  model-and-effort: <requested value | unconstrained>
  initiating-owner-session: <backend session identity>
  target-role-session: <backend session identity>
  prior-role-sessions: <role and backend session identities | none>
  required-predecessor-result: <role, outcome, and candidate | none>
  allowed-effects: <bounded list>
  forbidden-effects: <bounded list>

work:
  outcome: <bounded assignment>
  protected-behavior: <items or exact pointer>
  gates-and-journeys: <items or exact pointer>
  evidence-destination: <path or durable destination>
  commit-boundary: <boundary | no commit>

routing:
  progress: <route and cadence | none>
  question: <route>
  terminal-result: <route and accepted outcomes>
  cancellation: <owner and mechanism>
  cleanup: <owner and retained-resource policy>
```

Pointers must resolve inside the target's available filesystem or artifact store. A conversation reference such as “as discussed above” is invalid.

## Question

Use this for a question that the initiating owner is authorized to answer. It does not settle the assignment.

```text
FACTORY QUESTION
assignment: <identity>
attempt: <identity>
question: <one answerable question>
owner: <who may answer>
why-blocking: <consequence>
evidence: <direct evidence or pointers>
options: <options and consequences when useful>
safe-state: <workspace, process, and resource state while waiting>
```

Routine implementation choices stay with the assigned role or Slice Owner. A human-owned material decision routes through the goal Coordinator and `pursue-goal`.

## Progress

Progress is optional and never substitutes for completion.

```text
FACTORY PROGRESS
assignment: <identity>
attempt: <identity>
phase: <current bounded activity>
evidence: <new evidence | none>
next-checkpoint: <condition>
```

## Terminal result

Return exactly one terminal result per attempt.

```text
FACTORY RESULT
assignment: <identity>
attempt: <identity>
role: <role>
outcome: <exact outcome from the active Factory role or route>
summary: <what changed or was judged, what the evidence shows, what remains>

identities:
  input-candidate: <identity | none>
  output-candidate: <identity | unchanged | none>
  base-revision: <revision>
  commit: <revision | none>

evidence:
  checks: <commands or product actions and results>
  findings: <stable finding or journey identities and dispositions>
  artifacts: <durable pointers>

effects:
  files-modified: <paths | none>
  external-effects: <authorized effects performed | none>
  resources: <released, retained, or possibly live resources with owners>

route:
  next-owner: <authorized owner>
  unblock-condition: <condition | none>
  residual-risks: <advisory risks | none>
```

Use the exact outcome vocabulary from the active role:

- Cleaner: `Ready`, `Resynchronize`, or `Blocked`.
- Verifier: `Pass`, `Repair`, `Resynchronize`, or `Inconclusive`.
- Product Validator: `Pass`, `Fail`, or `Inconclusive`.
- Slice Owner: `Validated commit`, `Resynchronize`, or `Blocked`.
- Goal Validation Owner: `Pass`, `Slice failure`, `Resynchronize`, or `Blocked`.

Other roles use their own declared terminal outcomes. Do not translate a failed or inconclusive outcome into success in the summary.

## Execution receipt

Keep backend routing metadata in a separate execution receipt:

```text
adapter: <Orca | native harness>
requested-harness: <value>
effective-harness: <value>
workspace-routing: <backend identity>
task-or-session-routing: <backend identities>
initiating-owner-session: <backend session identity>
target-role: <role>
target-role-session: <backend session identity>
prior-role-sessions: <role and backend session identities | none>
role-separation-check: <passed | failed with reason>
started-at: <timestamp>
settled-at: <timestamp | none>
cleanup-state: <released | retained | possibly live>
```

The receipt supports supervision and recovery. It is not an accepted decision, candidate identity, or production dependency.
