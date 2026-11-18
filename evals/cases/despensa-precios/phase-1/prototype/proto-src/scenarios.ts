import type { MeasureGroup, WithoutSize } from "../src/operations/prices/wire.ts";
import data from "./data.json";

export type Comparison = { measures: readonly MeasureGroup[]; withoutSize: readonly WithoutSize[] };
export type KindEntry = { id: string; name: string; products: number };
export type ProductEntry = {
  id: string;
  name: string;
  kind: { id: string; name: string } | null;
  purchases: number;
};
export type Subject =
  | { type: "kind"; id: string; name: string; products: number }
  | { type: "product"; id: string; name: string; kind: string | null };

export const kinds = data.kinds as KindEntry[];
export const products = data.allProducts as ProductEntry[];
const results = data.scenarios as unknown as Record<string, Comparison>;

const kind = (name: string): Subject => {
  const found = kinds.find((entry) => entry.name === name)!;
  return { type: "kind", id: found.id, name: found.name, products: found.products };
};
const product = (name: string): Subject => {
  const found = products.find((entry) => entry.name === name)!;
  return { type: "product", id: found.id, name: found.name, kind: found.kind?.name ?? null };
};

export type Period = { from: string; to: string };
export type Scenario = {
  id: string;
  state: "pick" | "ready" | "loading" | "error";
  subject?: Subject;
  result?: Comparison;
  chain?: string;
  period?: Period;
};

export const scenarios: Scenario[] = [
  { id: "elegir", state: "pick" },
  { id: "arroz", state: "ready", subject: kind("arroz"), result: results.arroz },
  {
    id: "arroz-coto",
    state: "ready",
    subject: kind("arroz"),
    result: results.arrozCoto,
    chain: "Coto",
  },
  {
    id: "lucchetti-1kg",
    state: "ready",
    subject: product("Arroz largo fino Lucchetti 1 kg"),
    result: results.lucchetti1kg,
  },
  { id: "jabon", state: "ready", subject: kind("jabón"), result: results.jabon },
  { id: "leche", state: "ready", subject: kind("leche"), result: results.leche },
  { id: "desodorante", state: "ready", subject: kind("desodorante"), result: results.desodorante },
  {
    id: "queso",
    state: "ready",
    subject: product("Queso cremoso La Paulina"),
    result: results.queso,
  },
  { id: "analgesico", state: "ready", subject: kind("analgésico"), result: results.analgesico },
  {
    id: "sin-compras",
    state: "ready",
    subject: kind("yerba"),
    result: results.yerbaNoPurchasesInPeriod,
    period: { from: "2026-10-15", to: "2026-11-03" },
  },
  { id: "cargando", state: "loading", subject: kind("arroz") },
  { id: "error", state: "error", subject: kind("arroz") },
];

export const scenarioById = (id: string | null): Scenario =>
  scenarios.find((scenario) => scenario.id === id) ?? scenarios[0]!;

/** Which scenario answers picking this kind or product, when the data has one. */
export const scenarioForSubject = (id: string): string | undefined =>
  scenarios.find(
    (scenario) =>
      scenario.state === "ready" && scenario.subject?.id === id && scenario.chain === undefined,
  )?.id;

/** The scenario a chain filter resolves to; undefined when the data has none. */
export const scenarioForChain = (current: Scenario, chain: string | undefined) =>
  scenarios.find(
    (scenario) =>
      scenario.state === "ready" &&
      scenario.subject?.id === current.subject?.id &&
      scenario.chain === chain &&
      scenario.period?.from === current.period?.from,
  )?.id;

/** Chains to offer: those of the unfiltered result for the same subject and period. */
export const chainOptions = (current: Scenario): string[] => {
  const base =
    scenarios.find(
      (scenario) =>
        scenario.state === "ready" &&
        scenario.subject?.id === current.subject?.id &&
        scenario.chain === undefined,
    )?.result ?? current.result;
  const names = new Set<string>();
  for (const group of base?.measures ?? []) for (const chain of group.chains) names.add(chain.chain);
  for (const line of base?.withoutSize ?? []) names.add(line.chain);
  return [...names];
};
