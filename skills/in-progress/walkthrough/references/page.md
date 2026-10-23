# The page

What the page holds and how it reads. [The template](../templates/page.html) already implements the structure, the visual components, the palette, and the stability rules below; when no component fits a visual, add one in the template's style rather than restyling the page.

## Structure

- **Header:** the title and one sources line, once: each source with its status and date, such as "Spec: Draft, re-opened 21 Oct" or "Program design: draft, not reviewed".
- **Tabs:** Story first, then one full-width tab per kind of reference the sources hold: Examples (every example with its `test` or `capture` mark and its prototype link, plus the state space), Decisions (each with its why), Terms (searchable). The story takes the full width; reference lives in its tabs, never in a side margin.
- **Story:** a chapter rail with progress, previous and next, and arrow keys. Each chapter opens with the question it answers. The ladder for a spec usually runs: in short (what, for whom, what success looks like), who decides and how, the main behaviours, the system, the program design when there is one, how it will be proven, and what is open, always last.
- **Inline links:** an example id, a decision name, or a defined term in the text opens a popover that covers part of the page and moves nothing, with a button to open it in its tab.

## Content

- **Lean.** Every element answers a question the reader has. One main visual per chapter and a few short sentences; about one screen at 1440×900. Detail the story doesn't need goes to the reference tabs, or behind at most one collapsed disclosure per chapter; delete what earns neither. Say each fact once and link to it elsewhere.
- **Context at each point.** Define a term where it first matters, and give every decision its why from the sources.
- **Open stays open.** Draft status, open questions, pending decisions, and unproven risks look open wherever they appear.
- **Program design:** labelled a draft until accepted, once. Show it as pictures of the code's shape: a module map whose folders carry their role and open to their files on click, one walk of an important call through it in production with the test fakes named at each step, how errors travel, and each type guarantee as the concrete mistake it refuses ("the instance name is passed where an id is expected: refused before it runs"). Exact types and signatures, when kept, sit behind one disclosure.
- **UI:** link each example to its scenario in the chosen prototype, such as `prototype.html#scenario`; never redraw product screens. A small screenshot beside the link is fine.
- **Copy:** load `unslop`. Plain sentences, the important word first, one term per concept, no meta-text about the page or its readers, no paths the reader can't open.

## Visuals

- **Diagrams:** boxes sized to their text, generous spacing, readable type. A diagram larger than its column goes on a pannable canvas of fixed height: drag to move, buttons or ctrl+wheel to zoom, a reset-view control, and a visible hint.
- **Walks:** a flow is a step-through on its diagram, one per chapter: numbered steps, previous and next, the path of the current step drawn, a caption with what happens. Reserve the tallest step's height so nothing moves between steps.
- **Forms that read at a glance:** before and after, a fork for allowed and denied, refused and accepted, side-by-side options, production beside tests.
- **Code:** short and only where its shape is the point; `white-space: pre` with horizontal scroll, never wrapped.
- **Colour:** a neutral gray scale for paper, ink, rules, and grids, with no tint; saturated colour only where it means something, such as one colour per token or green for allowed, used the same way everywhere.
- **Stability:** zero layout shift on load and while stepping, panning, zooming, switching tabs, and opening popovers.
