# Rationale template

Prose that ships alongside the sketch. One page. Sentence-case headings. Replace italics with content.

## Problem

*The bound architecture question, why evidence cannot settle it, and what about the existing system or constraints makes the shape non-obvious. Name grounding constraints the design must honor.*

## Usage (caller's view)

*Write this first. Show realistic call sites: what they import, call, and get back. The sketch must agree with this usage.*

## Shape

*Data structures first, then flow through signatures. Name load-bearing decisions, where invariants live, and what the system deliberately does not do. State what complexity the public surface hides.*

## Synthesis decision

*Filled by arena: base candidate, grafts, rejections, cross-judge verdict.*

## Tradeoffs accepted

*One bullet each: "we accept X in exchange for Y."*

## Alternatives considered

*At least one concrete alternative shape and why it lost. Prefer whole-shape alternatives.*

## Open questions and risks

*Questions for the human, and risks before Delivery starts.*

## Spec handoff

*Which SPEC sections this sketch should update. One sentence on the first Delivery slice that would realize it—do not implement here.*
