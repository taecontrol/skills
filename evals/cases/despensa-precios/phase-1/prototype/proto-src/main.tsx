import { StrictMode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { PricesScreen } from "./prices.tsx";
import { scenarioById, scenarios } from "./scenarios.ts";
import { Shell } from "./shell.tsx";

const readScenario = () => new URLSearchParams(window.location.search).get("escenario");

function Prototype() {
  const [id, setId] = useState(() => scenarioById(readScenario()).id);
  // Choosing a scenario from the strip remounts it, so each starts fresh.
  const [generation, setGeneration] = useState(0);
  useEffect(() => {
    const onPop = () => setId(scenarioById(readScenario()).id);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const go = useCallback((next: string, options: { reset?: boolean } = {}) => {
    const url = new URL(window.location.href);
    url.searchParams.set("escenario", next);
    window.history.pushState(null, "", url);
    setId(next);
    if (options.reset) setGeneration((value) => value + 1);
  }, []);

  return (
    <div className="flex h-svh flex-col">
      <div
        aria-label="Escenarios del prototipo"
        className="flex h-8 shrink-0 items-center gap-1 overflow-x-auto bg-neutral-900 px-2 text-neutral-100"
      >
        <span className="shrink-0 pr-1 text-[11px] text-neutral-400">Prototipo final · escenario</span>
        {scenarios.map((scenario) => (
          <a
            key={scenario.id}
            href={`?escenario=${scenario.id}`}
            aria-current={scenario.id === id ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              go(scenario.id, { reset: true });
            }}
            className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[11px] text-neutral-300 hover:bg-neutral-700 aria-[current=true]:bg-neutral-100 aria-[current=true]:text-neutral-900"
          >
            {scenario.id}
          </a>
        ))}
      </div>
      <div className="min-h-0 flex-1">
        <Shell>
          <PricesScreen scenario={scenarioById(id)} go={go} generation={generation} />
        </Shell>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Prototype />
  </StrictMode>,
);
