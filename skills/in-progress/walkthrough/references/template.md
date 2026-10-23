# Filling the template

Copy [page.html](../templates/page.html) next to the main source and replace the demo. Edit only the block between the `CONTENT` and `END OF CONTENT` comments: the `<template id="chapters">` and the `PAGE` object. When a page needs something the machinery lacks, change the template, not one page.

## PAGE

- `title`; `sources`: one line, each source with its status and date, joined by ` · `.
- `prototypeBase`: the prototype URL that example links append `#scenario` to.
- `notes`: optional `examples` and `decisions` lines under those tab headings.
- `lang`: the sources' language. `labels` overrides interface words, keyed as in `L` in the machinery.
- `examples`: `{id, mark, group, title, text, proto}`. `mark` is `test` or `capture`; examples sharing a `group` sit under one heading; `proto` lists `['scenario', 'Label']`.
- `stateSpace`: `{after, title, caption, head, rows}`, shown after the examples group `after`. Each row starts with its event.
- `decisions`: `{id, title, source, decision, why, alternatives, costs, status}`. `decision`, `why` and `costs` list sentences; `alternatives` lists `['Option', 'why not']`; `status: 'pending'` draws it open.
- `terms`: `{id, term, def}`.
- `diagrams`: by name. `nodes` maps an id to `{name, sub, col, row, kind, meta, text}`: `sub` lists short lines, `kind` is `new`, `ext` (outside), or omitted (changed), and `meta` and `text` fill the popover a click opens. `edges` lists `{from, to, kind, label}`, `kind` being `a`, `b`, `int` (internal or read), or omitted for ink. `zones` lists `{label, nodes}`. `legend` names each kind used, such as `{a: 'the reminder', new: 'new', plain: 'changed', ext: 'outside'}`.
- `walks`: by name, `{diagram, steps}`; a step is `{title, text, path, tests}`, and `path` lists edges as `'from>to'`.

Text fields are HTML and may hold inline links.

## Diagrams

Boxes are measured from their text; a column takes its widest box. Edges run at right angles: along a row, down a column, or with one bend in the gap beside the start (`bend: 'end'` uses the gap beside the end). Move a node when an edge would cross a box. `colGap` and `rowGap` give labels room.

## Chapters

Each chapter is a `<section data-chapter="id" data-title="Rail title">` in the template, in reading order; the rail, numbering, previous and next, and the URL hash come from them. Never use `story`, `examples`, `decisions` or `terms` as an id. To add a chapter, add a section that opens like this:

```html
<p class="q">The question this chapter answers?</p>
<h2>The answer in a few words</h2>
<p class="lead">Two or three sentences.</p>
```

## Inline links

- Example `<a class="ex" data-e="E1"></a>`, decision `<a class="dc" data-d="schedule"></a>`, chapter `<a class="ch" data-go="open"></a>`: left empty, they fill in their id or title.
- Term: `<a class="t" data-t="quiet-period">quiet period</a>`.
- A tab anchor: `<a class="ch" data-go="examples:statespace">Label</a>`.
- Prototype: `<a class="proto" target="_blank" rel="noopener" href="…#scenario">Label</a>`.

Example ids inside `pre.code` link themselves. A missing id logs a console warning, so a clean console means every link resolves.

## Components

- Diagram `<div data-diagram="name"></div>`; walk `<div class="walk" data-walk="name"></div>`. Both accept `data-height="380"`.
- Tiles: `.tiles` of `<div class="tile"><b>41 days</b><span>…</span></div>`.
- Cards in a row: `.cards` of `<div class="card"><h4>…</h4><p>…</p></div>`.
- Claims: `.claims` of `<div><span>Claim.</span><span class="ids">chips</span></div>`.
- Flow: `.flow` of `<div><b><span class="n">1</span>Title</b>Text</div>`.
- Timeline: `.tl` of `<div><b>Date</b>Text</div>`; `class="op"` for an open point.
- Before and after: `.ba`, a header row of three `.h` cells, then rows of `.rh`, the before cell, and `.aft`.
- Production beside tests: `.pt`, the same grid; `.fk` marks a fake, `.wide` spans both columns.
- Allowed and denied: `.fork` holding `.fq` (the question), an optional `.hd` row, and rows `<div class="r"><div><span class="yn ok">Sent</span></div><div>When</div><div>Then</div></div>`; `yn no` for denied.
- Refused and accepted: `.ra` of `<span class="yn no">Refused</span><span class="x">…</span>` pairs, inside a `.card`.
- Options side by side: `.opts` of cards with `li.pro` and `li.con`.
- Open item: `.open` with an `h4`; `open line` for one line, such as "Draft, not reviewed".
- One disclosure per chapter: `<details class="more"><summary>…</summary><div>…</div></details>`.
- Code: `<pre class="code">`, comments in `span.cm`, `<` escaped as `&lt;`.
- Table: `table.t`.

## Never edit

The `<style>` block, the machinery script, and the header, tabs, rail and popover they generate. Colour comes only from the CSS variables: `--a` and `--b` for lines, `--ok` for allowed, `--no` for refused, `--open` for anything open. Never add inline colours.
