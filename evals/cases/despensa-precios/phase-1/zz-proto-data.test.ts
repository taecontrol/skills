// DISPOSABLE: generates prototype scenario data for #20 from the real operations. Not committed.
import { exports } from "cloudflare:workers";
import { afterEach, beforeEach, test, vi } from "vite-plus/test";
import { callHttp, freshDatabase } from "./agent.ts";
import { mepSource } from "./mep-source.ts";

const call = async (name: string, input: unknown): Promise<any> => {
  const r = await callHttp(name, input);
  if (r.status !== 200) throw new Error(`${name} ${JSON.stringify(r.body)}`);
  return r.body;
};
beforeEach(async () => {
  await freshDatabase();
  vi.spyOn(globalThis, "fetch").mockImplementation(async () => Response.json(mepSource));
  await exports.default.scheduled({ scheduledTime: Date.parse("2026-11-02T04:30:00Z"), cron: "x" });
});
afterEach(() => vi.restoreAllMocks());

const stores = {
  coto: { chain: "Coto", branch: "Av. Santa Fe 3760" },
  dia: { chain: "Día", branch: "Av. Corrientes 1500" },
  carrefour: { chain: "Carrefour", branch: "Av. Cabildo 2000" },
  jumbo: { chain: "Jumbo", branch: "Av. Pueyrredón 1200" },
} as const;
type L = { raw: string; amount: number; adj?: number; quantity?: number; unit?: string; p: string };
const products: Record<string, { name: string; brand?: string; size?: { amount: number; unit: string }; kind?: string }> = {
  luc1: { name: "Arroz largo fino Lucchetti 1 kg", brand: "Lucchetti", size: { amount: 1000, unit: "g" }, kind: "arroz" },
  gallo: { name: "Arroz largo fino Gallo Oro 1 kg", brand: "Gallo", size: { amount: 1000, unit: "g" }, kind: "arroz" },
  luc500: { name: "Arroz largo fino Lucchetti 500 g", brand: "Lucchetti", size: { amount: 500, unit: "g" }, kind: "arroz" },
  ala: { name: "Arroz doble carolina Molinos Ala 1 kg", brand: "Molinos Ala", size: { amount: 1000, unit: "g" }, kind: "arroz" },
  yamani: { name: "Arroz yamaní suelto", kind: "arroz" },
  serenisima: { name: "Leche entera La Serenísima 1 l", brand: "La Serenísima", size: { amount: 1000, unit: "ml" }, kind: "leche" },
  tregar: { name: "Leche entera Tregar 1 l", brand: "Tregar", size: { amount: 1000, unit: "ml" }, kind: "leche" },
  algabo: { name: "Jabón líquido Citrus Splash Algabo 300 ml", brand: "Algabo", size: { amount: 300, unit: "ml" }, kind: "jabón" },
  dove: { name: "Jabón en barra Dove 90 g", brand: "Dove", size: { amount: 90, unit: "g" }, kind: "jabón" },
  nivea: { name: "Antitranspirante Nivea Women Invisible Power", brand: "Nivea", kind: "desodorante" },
  queso: { name: "Queso cremoso La Paulina", brand: "La Paulina" },
  yerba: { name: "Yerba mate Playadito 1 kg", brand: "Playadito", size: { amount: 1000, unit: "g" }, kind: "yerba" },
  next: { name: "Next rápida acción 20 comprimidos", brand: "Next", size: { amount: 20, unit: "unit" }, kind: "analgésico" },
};
const purchases: Array<[string, keyof typeof stores, L[]]> = [
  ["2026-07-04", "coto", [{ raw: "ARROZ LUCCHETTI 1KG", amount: 1890, p: "luc1" }, { raw: "LECHE SERENISIMA 1L", amount: 1450, quantity: 2, unit: "unit", p: "serenisima" }]],
  ["2026-07-18", "dia", [{ raw: "ARROZ GALLO ORO 1K", amount: 1980, p: "gallo" }, { raw: "LECHE TREGAR 1L", amount: 2560, quantity: 2, unit: "unit", p: "tregar" }]],
  ["2026-08-08", "carrefour", [{ raw: "ARROZ LUCCHETTI 1 KG", amount: 4080, quantity: 2, unit: "unit", adj: -1020, p: "luc1" }, { raw: "YERBA PLAYADITO 1KG", amount: 5200, p: "yerba" }]],
  ["2026-08-22", "jumbo", [{ raw: "ARROZ ALA 1 KG", amount: 2150, p: "ala" }, { raw: "QUESO CREMOSO LA PAULINA X KG", amount: 6210, quantity: 0.46, unit: "kg", p: "queso" }]],
  ["2026-09-05", "coto", [{ raw: "ARROZ LUCCHETTI 1KG", amount: 2090, p: "luc1" }, { raw: "ANTITRANSP NIVEA", amount: 3190, p: "nivea" }, { raw: "LECHE SERENISIMA 1L", amount: 3080, quantity: 2, unit: "unit", p: "serenisima" }]],
  ["2026-09-19", "dia", [{ raw: "ARROZ LUCCHETTI 500G", amount: 1100, p: "luc500" }, { raw: "ARROZ YAMANI SUELTO", amount: 1800, p: "yamani" }, { raw: "JABON DOVE 90G", amount: 3600, quantity: 3, unit: "unit", p: "dove" }]],
  ["2026-10-03", "carrefour", [{ raw: "ARROZ GALLO ORO 1KG", amount: 2300, p: "gallo" }, { raw: "JABON LIQ ALGABO 300ML", amount: 3150, p: "algabo" }, { raw: "YERBA PLAYADITO 1KG", amount: 5480, p: "yerba" }]],
  ["2026-10-17", "jumbo", [{ raw: "ARROZ LUCCHETTI 1 KG", amount: 2240, p: "luc1" }, { raw: "LECHE TREGAR 1L", amount: 1360, p: "tregar" }]],
  ["2026-10-24", "coto", [{ raw: "ARROZ GALLO ORO 1KG", amount: 4720, quantity: 2, unit: "unit", adj: -2360, p: "gallo" }, { raw: "QUESO CREMOSO LA PAULINA X KG", amount: 6990, quantity: 0.488, unit: "kg", p: "queso" }]],
  ["2026-10-30", "dia", [{ raw: "ARROZ ALA 1KG", amount: 2280, p: "ala" }, { raw: "NEXT X 20", amount: 11758.75, p: "next" }]],
  ["2026-11-01", "coto", [{ raw: "ARROZ LARGO FINO LUCCHETTI PAQ 1 KGM", amount: 4270, quantity: 2, unit: "unit", adj: -1072.62, p: "luc1" }, { raw: "JABON LIQUIDO CITRUS SPLASHALGABO BOM 300 ML", amount: 3310.99, p: "algabo" }, { raw: "ANTITRANSPIRANTE NIVEA", amount: 3341.99, adj: -835.5, p: "nivea" }]],
  ["2026-11-03", "coto", [{ raw: "ARROZ LUCCHETTI 1KG", amount: 2200, p: "luc1" }, { raw: "LECHE SERENISIMA 1L", amount: 1620, p: "serenisima" }]],
];

test("proto data", async () => {
  const ids: Record<string, string> = {};
  let n = 0;
  for (const [date, store, lines] of purchases) {
    const total = lines.reduce((s, l) => s + Math.round(l.amount * 100) + Math.round((l.adj ?? 0) * 100), 0) / 100;
    const { purchase } = await call("record_purchase", {
      requestId: `r${++n}`, store: stores[store], date, total,
      lines: lines.map((l) => ({
        rawText: l.raw, amount: l.amount,
        ...(l.quantity === undefined ? {} : { quantity: l.quantity, unit: l.unit }),
        ...(l.adj === undefined ? {} : { adjustments: [{ text: "PROMO", amount: l.adj }] }),
        ...(ids[l.p] ? { productId: ids[l.p] } : { newProduct: { name: products[l.p]!.name, ...(products[l.p]!.brand ? { brand: products[l.p]!.brand } : {}), ...(products[l.p]!.size ? { size: products[l.p]!.size } : {}) } }),
      })),
    });
    purchase.lines.forEach((line: any, i: number) => { ids[lines[i]!.p] ??= line.product.id; });
  }
  for (const [key, p] of Object.entries(products)) if (p.kind) await call("update_product", { productId: ids[key], kind: p.kind });
  const kinds = (await call("list_kinds", {})).kinds;
  const kindId = (name: string) => kinds.find((k: any) => k.name === name).id;
  const out = {
    kinds,
    productsWithoutKind: (await call("list_products", { withoutKind: true })).products,
    allProducts: (await call("list_products", {})).products,
    scenarios: {
      arroz: await call("compare_prices", { kindId: kindId("arroz") }),
      arrozCoto: await call("compare_prices", { kindId: kindId("arroz"), chain: "Coto" }),
      lucchetti1kg: await call("compare_prices", { productId: ids.luc1 }),
      jabon: await call("compare_prices", { kindId: kindId("jabón") }),
      leche: await call("compare_prices", { kindId: kindId("leche") }),
      desodorante: await call("compare_prices", { kindId: kindId("desodorante") }),
      queso: await call("compare_prices", { productId: ids.queso }),
      analgesico: await call("compare_prices", { kindId: kindId("analgésico") }),
      yerbaNoPurchasesInPeriod: await call("compare_prices", { kindId: kindId("yerba"), from: "2026-10-15", to: "2026-11-03" }),
    },
  };
  throw new Error("PROTODATA" + JSON.stringify(out) + "ENDPROTODATA");
});
