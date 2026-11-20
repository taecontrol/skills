// In-memory stand-in for the six catalog operations. It follows the domain
// rules in docs/design/catalog.md so the screens meet the real failures.

export type Unit = "g" | "ml" | "unit";
export type Size = { amount: number; unit: Unit };
export type Kind = { id: string; name: string };
export type ProductRef = {
  id: string;
  name: string;
  brand: string | null;
  size: Size | null;
  kind: Kind | null;
};
export type MergedEntry = {
  mergeId: string;
  product: ProductRef;
  intoProductId: string;
  mergedBy: string;
  mergedAt: string;
  lines: number;
};
export type Product = ProductRef & {
  purchases: number;
  lastPurchasedOn: string | null;
  merged: MergedEntry[];
};
export type KindSummary = Kind & { products: number };

export type Failure =
  | { _tag: "Offline" }
  | { _tag: "UnknownProduct"; productId: string }
  | {
      _tag: "SizesDiffer";
      product: { id: string; size: Size };
      into: { id: string; size: Size };
    }
  | {
      _tag: "ProductAlreadyMerged";
      productId: string;
      intoProductId: string;
      mergeId: string;
      mergedBy: string;
      mergedAt: string;
    }
  | { _tag: "ProductHasPurchases"; productId: string; purchases: number }
  | { _tag: "KindNotFound"; kindId: string }
  | { _tag: "KindNameTaken"; kind: Kind }
  | { _tag: "KindHasProducts"; kindId: string; products: number };

export class OperationFailed extends Error {
  constructor(readonly failure: Failure) {
    super(failure._tag);
  }
}

export const ME = "member@example.com";
export const PARTNER = "partner@example.com";
/** The prototype's clock: 3 Nov 2026, 10:30 in Buenos Aires. */
export const NOW = "2026-11-03T10:30:00-03:00";

type Row = {
  id: string;
  name: string;
  brand: string | null;
  size: Size | null;
  kindId: string | null;
  ownPurchases: number;
  ownLast: string | null;
  deleted: boolean;
};
type Merge = {
  id: string;
  productId: string;
  intoProductId: string;
  mergedBy: string;
  mergedAt: string;
  undone: boolean;
};

export const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

/** How kind names match: case and spacing ignored, accents kept. */
export const nameKey = (text: string) => text.toLowerCase().trim().replace(/\s+/g, " ");
const cleanName = (text: string) => text.trim().replace(/\s+/g, " ");
const byKey = (a: Kind, b: Kind) => (nameKey(a.name) < nameKey(b.name) ? -1 : nameKey(a.name) > nameKey(b.name) ? 1 : 0);

const g = (amount: number): Size => ({ amount, unit: "g" });
const ml = (amount: number): Size => ({ amount, unit: "ml" });
const u = (amount: number): Size => ({ amount, unit: "unit" });

export function createDb() {
  const kinds: Kind[] = [
    "arroz",
    "detergnte",
    "fideos",
    "lavandina",
    "leche",
    "leche descremada",
    "leche entera",
    "papel higienico",
    "papel higiénico",
    "queso cremoso",
    "tomate",
    "yerba",
    "yerba mate",
  ].map((name, index) => ({ id: `knd_${index + 1}`, name }));
  const kindId = (name: string) => kinds.find((kind) => kind.name === name)!.id;
  const row = (
    id: string,
    name: string,
    brand: string | null,
    size: Size | null,
    kind: string | null,
    ownPurchases: number,
    ownLast: string | null,
  ): Row => ({
    id,
    name,
    brand,
    size,
    kindId: kind ? kindId(kind) : null,
    ownPurchases,
    ownLast,
    deleted: false,
  });
  const rows: Row[] = [
    row("prd_1", "Arroz Gallo Oro 500 g", "Gallo", g(500), "arroz", 2, "2026-09-30"),
    row("prd_2", "Arroz largo fino Gallo Oro 1 kg", "Gallo", g(1000), "arroz", 4, "2026-10-28"),
    row("prd_2b", "ARROZ GALLO ORO 1K", null, g(1000), null, 2, "2026-10-12"),
    row("prd_3", "BANANA ECUADOR XKG", null, null, null, 4, "2026-10-29"),
    row("prd_4", "Detergente Magistral limón 750 ml", "Magistral", ml(750), "detergnte", 3, "2026-10-05"),
    row("prd_5", "ECUVITA", null, null, null, 1, "2026-10-30"),
    row("prd_6", "GALLO", null, null, null, 3, "2026-10-15"),
    row("prd_7", "Lavandina Ayudín 2 l", "Ayudín", ml(2000), "lavandina", 2, "2026-08-22"),
    row("prd_8", "Leche entera La Serenísima 1 l", "La Serenísima", ml(1000), "leche entera", 14, "2026-11-01"),
    row("prd_9", "LECHE SERENISIMA ENT 1L", null, ml(1000), "leche", 0, null),
    row("prd_10", "Papel higiénico Elite doble hoja 4 rollos x 30 m", "Elite", u(4), "papel higiénico", 4, "2026-10-12"),
    row("prd_11", "Pilas AA Duracell x4", "Duracell", u(4), null, 0, null),
    row("prd_12", "Queso cremoso La Paulina", "La Paulina", null, "queso cremoso", 7, "2026-10-31"),
    row("prd_13", "Tomate perita", null, null, "tomate", 9, "2026-11-01"),
    row("prd_14", "Yerba mate Playadito 1 kg", "Playadito", g(1000), "yerba", 5, "2026-10-25"),
    row("prd_15", "Papel higiénico Higienol 4 rollos x 30 m", "Higienol", u(4), "papel higienico", 2, "2026-10-18"),
    row("prd_16", "Yerba Taragüí 500 g", "Taragüí", g(500), "yerba mate", 3, "2026-10-20"),
  ];
  const merges: Merge[] = [
    {
      id: "mrg_1",
      productId: "prd_2b",
      intoProductId: "prd_2",
      mergedBy: PARTNER,
      mergedAt: "2026-10-20T18:42:00-03:00",
      undone: false,
    },
  ];
  return { kinds, rows, merges, nextId: 100 };
}
export type Db = ReturnType<typeof createDb>;

/** Faults a scenario injects: the next N writes of a kind fail offline. */
export const faults = { offlineUpdates: 0, offlineKindWrites: 0 };

const activeMergeOf = (db: Db, productId: string) =>
  db.merges.find((merge) => merge.productId === productId && !merge.undone);
const childrenOf = (db: Db, productId: string) =>
  db.merges.filter((merge) => merge.intoProductId === productId && !merge.undone);

function totals(db: Db, productId: string): { purchases: number; last: string | null } {
  const row = db.rows.find((r) => r.id === productId)!;
  let purchases = row.ownPurchases;
  let last = row.ownLast;
  for (const merge of childrenOf(db, productId)) {
    const child = totals(db, merge.productId);
    purchases += child.purchases;
    if (child.last && (!last || child.last > last)) last = child.last;
  }
  return { purchases, last };
}

const refOf = (db: Db, row: Row): ProductRef => ({
  id: row.id,
  name: row.name,
  brand: row.brand,
  size: row.size,
  kind: db.kinds.find((kind) => kind.id === row.kindId) ?? null,
});

function view(db: Db, id: string): Product {
  const row = db.rows.find((r) => r.id === id)!;
  const { purchases, last } = totals(db, id);
  return {
    ...refOf(db, row),
    purchases,
    lastPurchasedOn: last,
    merged: childrenOf(db, id).map((merge) => ({
      mergeId: merge.id,
      product: refOf(db, db.rows.find((r) => r.id === merge.productId)!),
      intoProductId: id,
      mergedBy: merge.mergedBy,
      mergedAt: merge.mergedAt,
      lines: totals(db, merge.productId).purchases,
    })),
  };
}

function searchTexts(db: Db, id: string): string[] {
  const row = db.rows.find((r) => r.id === id)!;
  return [
    fold(row.name),
    fold(row.brand ?? ""),
    ...childrenOf(db, id).flatMap((merge) => searchTexts(db, merge.productId)),
  ];
}

const sameSize = (a: Size, b: Size) => a.unit === b.unit && a.amount === b.amount;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Writes through a merged-away id are refused, naming where it went. */
function writable(db: Db, productId: string) {
  const row = db.rows.find((r) => r.id === productId);
  if (!row || row.deleted) throw new OperationFailed({ _tag: "UnknownProduct", productId });
  const merge = activeMergeOf(db, productId);
  if (merge)
    throw new OperationFailed({
      _tag: "ProductAlreadyMerged",
      productId,
      intoProductId: merge.intoProductId,
      mergeId: merge.id,
      mergedBy: merge.mergedBy,
      mergedAt: merge.mergedAt,
    });
  return row;
}

function kindOf(db: Db, kindId: string) {
  const kind = db.kinds.find((k) => k.id === kindId);
  if (!kind) throw new OperationFailed({ _tag: "KindNotFound", kindId });
  return kind;
}

export function makeApi(db: Db) {
  const requests = new Map<string, unknown>();
  return {
    async list_products(input: {
      search?: string;
      kind?: string;
      withoutKind?: boolean;
      withoutPurchases?: boolean;
      cursor?: string;
      limit?: number;
    }): Promise<{ products: Product[]; nextCursor: string | null }> {
      await delay(120);
      const limit = input.limit ?? 20;
      const query = fold(input.search ?? "");
      const kind =
        input.kind === undefined ? undefined : db.kinds.find((k) => nameKey(k.name) === nameKey(input.kind!));
      if (input.kind !== undefined && !kind)
        throw new OperationFailed({ _tag: "KindNotFound", kindId: input.kind });
      const visible = db.rows
        .filter((row) => !row.deleted && !activeMergeOf(db, row.id))
        .map((row) => view(db, row.id))
        .filter((product) => !kind || product.kind?.id === kind.id)
        .filter((product) => !input.withoutKind || product.kind === null)
        .filter((product) => !input.withoutPurchases || product.purchases === 0)
        .filter(
          (product) => !query || searchTexts(db, product.id).some((text) => text.includes(query)),
        )
        .sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
      const start = input.cursor ? Number(input.cursor) : 0;
      const page = visible.slice(start, start + limit);
      return {
        products: page,
        nextCursor: start + limit < visible.length ? String(start + limit) : null,
      };
    },

    async list_kinds(): Promise<{ kinds: KindSummary[] }> {
      await delay(80);
      return {
        kinds: db.kinds
          .map((kind) => ({
            ...kind,
            products: db.rows.filter(
              (row) => row.kindId === kind.id && !row.deleted && !activeMergeOf(db, row.id),
            ).length,
          }))
          .sort(byKey),
      };
    },

    async update_product(input: {
      productId: string;
      name?: string;
      brand?: string | null;
      size?: Size | null;
      kind?: string | null;
    }): Promise<{ product: Product }> {
      await delay(350);
      if (faults.offlineUpdates > 0) {
        faults.offlineUpdates -= 1;
        throw new OperationFailed({ _tag: "Offline" });
      }
      const row = writable(db, input.productId);
      if (input.name !== undefined) row.name = input.name;
      if (input.brand !== undefined) row.brand = input.brand;
      if (input.size !== undefined) row.size = input.size;
      if (input.kind !== undefined) {
        if (input.kind === null) row.kindId = null;
        else {
          const existing = db.kinds.find((kind) => nameKey(kind.name) === nameKey(input.kind!));
          if (existing) row.kindId = existing.id;
          else {
            const kind = { id: `knd_${db.nextId++}`, name: input.kind.trim().toLowerCase() };
            db.kinds.push(kind);
            row.kindId = kind.id;
          }
        }
      }
      return { product: view(db, row.id) };
    },

    async merge_products(input: {
      requestId: string;
      productId: string;
      intoProductId: string;
    }): Promise<{ outcome: "merged"; merge: Merge; product: Product }> {
      await delay(450);
      const replay = requests.get(input.requestId);
      if (replay) return replay as { outcome: "merged"; merge: Merge; product: Product };
      const from = writable(db, input.productId);
      const into = writable(db, input.intoProductId);
      if (from.size && into.size && !sameSize(from.size, into.size))
        throw new OperationFailed({
          _tag: "SizesDiffer",
          product: { id: from.id, size: from.size },
          into: { id: into.id, size: into.size },
        });
      if (!into.kindId && from.kindId) into.kindId = from.kindId;
      const merge: Merge = {
        id: `mrg_${db.nextId++}`,
        productId: from.id,
        intoProductId: into.id,
        mergedBy: ME,
        mergedAt: NOW,
        undone: false,
      };
      db.merges.push(merge);
      const result = { outcome: "merged" as const, merge, product: view(db, into.id) };
      requests.set(input.requestId, result);
      return result;
    },

    async undo_product_merge(input: {
      mergeId: string;
    }): Promise<{ outcome: "undone"; product: Product; from: Product }> {
      await delay(400);
      const merge = db.merges.find((m) => m.id === input.mergeId && !m.undone);
      if (!merge) throw new OperationFailed({ _tag: "UnknownProduct", productId: input.mergeId });
      merge.undone = true;
      return {
        outcome: "undone",
        product: view(db, merge.productId),
        from: view(db, merge.intoProductId),
      };
    },

    async delete_product(input: { productId: string }): Promise<{ outcome: "deleted" }> {
      await delay(350);
      const row = writable(db, input.productId);
      const { purchases } = totals(db, row.id);
      if (purchases > 0)
        throw new OperationFailed({ _tag: "ProductHasPurchases", productId: row.id, purchases });
      row.deleted = true;
      for (const merge of childrenOf(db, row.id)) {
        db.rows.find((r) => r.id === merge.productId)!.deleted = true;
        db.merges.splice(db.merges.indexOf(merge), 1);
      }
      return { outcome: "deleted" };
    },

    async rename_kind(input: { kindId: string; name: string }): Promise<{ kind: Kind }> {
      await delay(350);
      if (faults.offlineKindWrites > 0) {
        faults.offlineKindWrites -= 1;
        throw new OperationFailed({ _tag: "Offline" });
      }
      const kind = kindOf(db, input.kindId);
      const name = cleanName(input.name);
      const taken = db.kinds.find((k) => k.id !== kind.id && nameKey(k.name) === nameKey(name));
      if (taken) throw new OperationFailed({ _tag: "KindNameTaken", kind: { ...taken } });
      kind.name = name;
      return { kind: { ...kind } };
    },

    async merge_kinds(input: { kindId: string; intoKindId: string }): Promise<{ kind: Kind; moved: number }> {
      await delay(450);
      if (faults.offlineKindWrites > 0) {
        faults.offlineKindWrites -= 1;
        throw new OperationFailed({ _tag: "Offline" });
      }
      const from = kindOf(db, input.kindId);
      const into = kindOf(db, input.intoKindId);
      if (from.id === into.id) throw new Error("InvalidInput");
      let moved = 0;
      for (const row of db.rows)
        if (!row.deleted && row.kindId === from.id) {
          row.kindId = into.id;
          moved += 1;
        }
      db.kinds.splice(db.kinds.indexOf(from), 1);
      return { kind: { ...into }, moved };
    },

    async delete_kind(input: { kindId: string }): Promise<{ deleted: true }> {
      await delay(350);
      if (faults.offlineKindWrites > 0) {
        faults.offlineKindWrites -= 1;
        throw new OperationFailed({ _tag: "Offline" });
      }
      const kind = kindOf(db, input.kindId);
      const current = db.rows.filter((row) => row.kindId === kind.id && !row.deleted && !activeMergeOf(db, row.id));
      if (current.length > 0)
        throw new OperationFailed({ _tag: "KindHasProducts", kindId: kind.id, products: current.length });
      for (const row of db.rows) if (row.kindId === kind.id) row.kindId = null;
      db.kinds.splice(db.kinds.indexOf(kind), 1);
      return { deleted: true };
    },

    /** Prototype-only: the partner merges a kind on the other phone. */
    partnerMergesKind(kindId: string, intoKindId: string) {
      const from = db.kinds.find((k) => k.id === kindId)!;
      for (const row of db.rows) if (row.kindId === from.id) row.kindId = intoKindId;
      db.kinds.splice(db.kinds.indexOf(from), 1);
    },

    /** Prototype-only: the partner acting on another phone. */
    partnerMerges(productId: string, intoProductId: string, mergedAt: string) {
      db.merges.push({
        id: `mrg_${db.nextId++}`,
        productId,
        intoProductId,
        mergedBy: PARTNER,
        mergedAt,
        undone: false,
      });
    },
  };
}
export type Api = ReturnType<typeof makeApi>;
