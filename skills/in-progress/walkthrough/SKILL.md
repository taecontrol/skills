---
name: walkthrough
description: "Render a self-contained HTML page that lets a human understand a design in detail and talk it through with others: a spec, an architecture brief, a program design, or a comparison of options, built from their Markdown sources. Use before a human accepts a spec or design, or when they need something visual to share."
---

# Walkthrough

A walkthrough is the human view of a design. The Markdown sources stay the single source of truth, and agents read only them; the page is a view the human reads to understand, decide, and share. It explains and shows, and it never decides: every decision, example, number, name, and status on it comes from a source.

Write the page in the language of its sources. Talk to the human in theirs.

## Process

1. **Frame.** Name the reader (the owner, and colleagues who know less of the context), what they must decide or discuss with it, and each source with its status and date. A page for acceptance covers one spec with the briefs it points to; a page for discussion can cover one open question, such as two candidate paths, with each option's pros, cons, what is decided, and what is open. Write it next to its main source with the same name and `.html`, such as `.work/specs/<slug>.html`. Done when the reader, the decision, and the sources are explicit.
2. **Write the story.** Copy [the template](templates/page.html) to the page's path and fill only its content block, as [template.md](references/template.md) describes; the machinery, styles, and palette stay as they are. Read [page.md](references/page.md) for what the content must be: a ladder of chapters, each answering the question the previous one left, with one main visual and a few short sentences, ending on what is open. Context goes at the point it is needed, and every decision shown carries its why. Done when every source decision, example, and open item is reachable and each chapter fits about one screen.
3. **Render and inspect.** Open the page in a real browser at the reader's sizes, such as 1440×900 and 1280×800, over `file://`. Step every walk, pan every canvas, open every popover and tab. Done when no text leaves its box, layout shift is zero, nothing overflows the page, and the console is clean.
4. **Check against the sources.** Dispatch a fresh reviewer who did not write the page, with the page and its sources, to check every decision, example, number, name, status, diagram, and flow step on the page against them, and to read it as the reader would for anything unclear or missing. Fix what it finds and repeat the check on what the fix touched. A diagram edited without its text, or text without its diagram, is the drift this step exists to catch. Done when a check finds no contradiction.
5. **Present.** Give the page's absolute path and one link that opens it where the human reads, and say in a few lines what to look at first. When a source changes, change the source, then rebuild the affected chapters and repeat steps 3 and 4; never edit the page alone.

## Done

The reader can understand the design from the page without opening its sources, every fact on the page matches them, and the page renders cleanly at the reader's sizes.
