# Constraints for the #20 spec and Deliver brief (from the orchestrator)

- app-shell.tsx: append "Precios" after Catálogo in `destinations`; do not reorder or remove entries; keep `<Toaster />`.
- Reuse sonner, next-themes, and the shadcn checkbox/alert-dialog already in main.
- README (PR #37, 7c53585): the same PR updates the README's screens section with the prices screen. Required in the Deliver brief.

# Owner decisions (2026-11-03)

- Direction: prototype A, with B's "Cambiar" subject header/picker and B's ARS/USD ToggleGroup (default USD). /unslop all UI text; polish per Refactoring UI. Reference build: /tmp/despensa-20-proto/final.
- Q2: yes, "Precios" is a navigation destination, appended after Catálogo.
- Q3: no rate source in the UI (no "ArgentinaDatos"). The USD note says only "dólar MEP compra, último cierre antes de cada compra".
