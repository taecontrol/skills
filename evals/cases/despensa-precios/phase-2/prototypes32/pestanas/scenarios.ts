import { faults, type Api, type Unit } from "./data.ts";

export type Filters = {
  search: string;
  withoutKind: boolean;
  withoutPurchases: boolean;
  /** The "Tipo" filter, as the kind name list_products takes. */
  kind?: string | null | undefined;
};
export type Draft = { name: string; brand: string; amount: string; unit: Unit; kind: string };

export type Scenario = {
  id: string;
  label: string;
  filters?: Partial<Filters>;
  open?: {
    productId: string;
    view?: "ficha" | "pick" | "compare";
    pickSearch?: string;
    otherId?: string;
    keepId?: string;
    draft?: Draft;
  };
  /** Which Catálogo tab the scenario starts on (a kind ficha implies "tipos"). */
  tab?: "productos" | "tipos";
  /** A kind ficha open at the start, maybe with a typed name. */
  kind?: { kindId: string; draft?: string };
  /** The Productos tab starts filtered by this kind id. */
  kindFilter?: string;
  setup?: () => void;
  /** Runs once the ficha shows: what the partner does on the other phone. */
  afterOpen?: (api: Api) => void;
};

// Kind ids follow list_kinds order: arroz knd_1, detergnte knd_2, fideos knd_3,
// lavandina knd_4, leche knd_5, leche descremada knd_6, leche entera knd_7,
// papel higienico knd_8, papel higiénico knd_9, queso cremoso knd_10,
// tomate knd_11, yerba knd_12, yerba mate knd_13.
export const scenarios: Scenario[] = [
  { id: "tipos", label: "Lista de tipos", tab: "tipos" },
  { id: "renombrar", label: "Renombrar «detergnte»", kind: { kindId: "knd_2", draft: "detergente" } },
  { id: "nombre-tomado", label: "«yerba mate» → «Yerba» (tomado)", kind: { kindId: "knd_13", draft: "Yerba" } },
  { id: "unir", label: "Unir «leche» y «leche entera»", kind: { kindId: "knd_5" } },
  { id: "borrar", label: "Borrar «fideos»", kind: { kindId: "knd_3" } },
  { id: "no-se-puede-borrar", label: "«arroz» no se puede borrar", kind: { kindId: "knd_1" } },
  {
    id: "ya-no-existe",
    label: "Ana ya unió «leche»",
    kind: { kindId: "knd_5", draft: "leche común" },
    afterOpen: (api) => api.partnerMergesKind("knd_5", "knd_7"),
  },
  { id: "filtro-tipo", label: "Filtro «Tipo»: leche entera", kindFilter: "knd_7" },
  { id: "fila-entera", label: "Toda la fila abre la ficha", tab: "tipos" },
  {
    id: "sin-conexion",
    label: "Sin conexión al renombrar",
    kind: { kindId: "knd_2", draft: "detergente" },
    setup: () => {
      faults.offlineKindWrites = 1;
    },
  },
];

export const currentScenario = (): Scenario => {
  const id = new URLSearchParams(window.location.search).get("s");
  return scenarios.find((scenario) => scenario.id === id) ?? scenarios[0]!;
};
