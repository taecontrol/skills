import { CheckIcon, CircleCheckIcon, CombineIcon, PackageIcon, SearchXIcon, WifiOffIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Item, ItemSeparator } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { api, findProduct, useKinds, useProductList, useWide } from "./client.ts";
import type { Kind, KindSummary, Product } from "./data.ts";
import { Ficha, type OpenState } from "./ficha.tsx";
import { brandAndSize, formatDay, formatSize } from "./format.ts";
import { KindBadge, matchedThrough, mergedText, OFFLINE, ProductRowContent, SearchField } from "./parts.tsx";
import { KindFilter } from "./kind-filter.tsx";
import { KindFicha, KindList, useKindList, type KindOpen } from "./kinds.tsx";
import type { Filters, Scenario } from "./scenarios.ts";

// ——— The tab and the open kind live in the URL, so Back works ———————————————

type Tab = "productos" | "tipos";
/** ?tab=tipos, ?ficha=<kind id> (kind ficha), ?producto=<id> (product opened from it),
 * ?tipo=<kind id> (the Productos tab's "Tipo" filter). */
type Loc = {
  tab: Tab;
  ficha?: string | undefined;
  producto?: string | undefined;
  filtro?: string | undefined;
};
/** history.state.depth: how many ficha entries sit above the list entry. */
const depth = (): number => (window.history.state as { depth?: number } | null)?.depth ?? 0;

const readLoc = (): Loc => {
  const params = new URLSearchParams(window.location.search);
  return {
    tab: params.get("tab") === "tipos" ? "tipos" : "productos",
    ficha: params.get("ficha") ?? undefined,
    producto: params.get("producto") ?? undefined,
    filtro: params.get("tipo") ?? undefined,
  };
};
const hrefFor = (loc: Loc) => {
  const params = new URLSearchParams(window.location.search);
  const put = (key: string, value: string | undefined) => (value ? params.set(key, value) : params.delete(key));
  put("tab", loc.tab === "tipos" ? "tipos" : undefined);
  put("ficha", loc.ficha);
  // A write that does not mention the filter keeps it.
  if ("filtro" in loc) put("tipo", loc.filtro);
  put("producto", loc.producto);
  return `?${params.toString()}`;
};
const write = (mode: "push" | "replace", loc: Loc, entryDepth: number) => {
  try {
    if (mode === "push") window.history.pushState({ depth: entryDepth }, "", hrefFor(loc));
    else window.history.replaceState({ depth: entryDepth }, "", hrefFor(loc));
  } catch {
    // Some file:// contexts refuse history writes; the screen still works.
  }
};

/** A fresh load with ?ficha= gets a list entry under the ficha, like the real app. */
function startLoc(scenario: Scenario): Loc {
  const url = readLoc();
  const loc: Loc =
    window.history.state?.depth !== undefined
      ? url
      : scenario.kind && !url.ficha
        ? { tab: "tipos", ficha: scenario.kind.kindId }
        : scenario.kindFilter && !url.filtro
          ? { tab: "productos", filtro: scenario.kindFilter }
          : scenario.tab && !new URLSearchParams(window.location.search).has("tab")
            ? { ...url, tab: scenario.tab }
            : url;
  if (window.history.state?.depth === undefined) {
    write("replace", { tab: loc.ficha ? "tipos" : loc.tab, ...(loc.filtro ? { filtro: loc.filtro } : {}) }, 0);
    if (loc.ficha) write("push", { tab: "tipos", ficha: loc.ficha }, 1);
  }
  return readLoc();
}

export function CatalogPage({ scenario }: { scenario: Scenario }) {
  const wide = useWide();
  const [loc, setLoc] = useState<Loc>(() => startLoc(scenario));
  useEffect(() => {
    const sync = () => setLoc(readLoc());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const changeTab = (tab: string) => {
    const next: Loc = { tab: tab === "tipos" ? "tipos" : "productos" };
    // Radix reports a click twice (mousedown, then focus): push one entry.
    if (readLoc().tab === next.tab) return;
    write("push", next, 0);
    setLoc(readLoc());
  };
  const [filters, setFilters] = useState<Filters>({
    search: "",
    withoutKind: false,
    withoutPurchases: false,
    ...scenario.filters,
  });
  const kinds = useKinds();
  const [open, setOpen] = useState<OpenState | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // The "Tipo" filter: the URL holds the kind id, so a rename is followed for free.
  const kindFilter = loc.filtro ? kinds.kinds.find((kind) => kind.id === loc.filtro) : undefined;
  const lastKindName = useRef<string | null>(null);
  if (kindFilter) lastKindName.current = kindFilter.name;
  const listFilters = useMemo(
    () => ({ ...filters, kind: kindFilter?.name ?? null }),
    [filters, kindFilter?.name],
  );
  const list = useProductList(listFilters, !loc.filtro || kindFilter !== undefined);
  const setKindFilter = (id: string | undefined) => {
    write("replace", { ...readLoc(), filtro: id }, depth());
    setLoc(readLoc());
  };
  const chooseKind = (kind: KindSummary | null) => {
    setNotice(null);
    setKindFilter(kind?.id);
    if (kind) setFilters((previous) => ({ ...previous, withoutKind: false }));
  };
  // What happened to kinds in this tab: merged into another id, or deleted (null).
  // The URL entry under a ficha may still name the old kind when Back returns to it.
  const kindFates = useRef(new Map<string, string | null>());
  // A filtered kind that no longer exists: follow our own merge to the survivor,
  // clear it after our own delete, and say so when someone else removed it.
  useEffect(() => {
    if (!loc.filtro || !kinds.loaded || kindFilter) return;
    const fate = kindFates.current.get(loc.filtro);
    setKindFilter(fate ?? undefined);
    if (fate !== undefined) return;
    setNotice(lastKindName.current ? `El tipo «${lastKindName.current}» ya no existe. Se quitó el filtro.` : null);
  }, [loc.filtro, kinds.loaded, kindFilter]);
  // list_products answered KindNotFound: reload the kinds, and the effect above clears it.
  useEffect(() => {
    if (list.failure === "KindNotFound") void kinds.refresh();
  }, [list.failure, kinds.refresh]);
  const sessions = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);

  // A scenario may start with a ficha open, at any step of its flow.
  const applied = useRef(false);
  useEffect(() => {
    if (applied.current || list.status !== "ready" || !scenario.open || scenario.kind) return;
    applied.current = true;
    const start = scenario.open;
    void (async () => {
      const product = await findProduct(start.productId);
      const other = start.otherId ? await findProduct(start.otherId) : undefined;
      if (!product) return;
      setOpen({
        session: ++sessions.current,
        product,
        view: start.view === "compare" && other ? { t: "compare", other } : { t: start.view === "pick" ? "pick" : "ficha" },
        pickSearch: start.pickSearch ?? "",
        ...(start.draft ? { draft: start.draft } : {}),
        ...(start.keepId ? { keepId: start.keepId } : {}),
      });
      scenario.afterOpen?.(api);
    })();
  }, [list.status, scenario]);

  const openRow = (product: Product) => {
    setNotice(null);
    setOpen({ session: ++sessions.current, product, view: { t: "ficha" }, pickSearch: "" });
  };
  const dataChanged = () => {
    void list.refresh();
    void kinds.refresh();
  };
  const filtered = filters.search.trim() !== "" || !!loc.filtro || filters.withoutKind || filters.withoutPurchases;
  const products = list.products;
  const selectedId = open?.product.id;

  const toolbar = (
    <div className="sticky top-0 z-10 flex flex-col gap-2 bg-background px-4 pt-1 pb-3 lg:flex-row lg:items-center lg:gap-3 lg:pt-2">
      <SearchField
        value={filters.search}
        onChange={(search) => setFilters((previous) => ({ ...previous, search }))}
        fetching={list.fetching && list.status === "ready"}
        placeholder="Buscar por nombre o marca"
        className="lg:max-w-sm"
      />
      <div className="flex min-w-0 flex-wrap gap-2" role="group" aria-label="Filtros">
        <KindFilter
          wide={wide}
          kinds={kinds.kinds}
          loaded={kinds.loaded}
          selected={kindFilter ? { id: kindFilter.id, name: kindFilter.name } : null}
          onSelect={chooseKind}
          onOpen={() => void kinds.refresh()}
        />
        <Toggle
          variant="outline"
          pressed={filters.withoutKind}
          onPressedChange={(withoutKind) => {
            setFilters((previous) => ({ ...previous, withoutKind }));
            if (withoutKind && loc.filtro) setKindFilter(undefined);
          }}
          className="h-9 rounded-full px-3 data-[state=on]:border-foreground/40 lg:h-8 lg:px-3.5"
          data-do="filtro-sin-tipo"
        >
          {filters.withoutKind && <CheckIcon aria-hidden />}
          Sin tipo
        </Toggle>
        <Toggle
          variant="outline"
          pressed={filters.withoutPurchases}
          onPressedChange={(withoutPurchases) =>
            setFilters((previous) => ({ ...previous, withoutPurchases }))
          }
          className="h-9 rounded-full px-3 data-[state=on]:border-foreground/40 lg:h-8 lg:px-3.5"
          data-do="filtro-sin-compras"
        >
          {filters.withoutPurchases && <CheckIcon aria-hidden />}
          Sin compras
        </Toggle>
      </div>
    </div>
  );

  let content;
  if (list.status === "loading") content = <ListSkeleton />;
  else if (list.status === "error")
    content = (
      <Alert className="mx-4 my-4 w-auto lg:max-w-xl">
        <WifiOffIcon aria-hidden />
        <AlertDescription className="text-pretty">
          <p>{OFFLINE}</p>
          <Button variant="outline" className="hit-area mt-3 text-foreground" disabled={list.fetching} onClick={() => void list.retry()}>
            {list.fetching && <Spinner aria-hidden />}
            Reintentar
          </Button>
        </AlertDescription>
      </Alert>
    );
  else if (products.length === 0)
    content = (
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">{filtered ? <SearchXIcon aria-hidden /> : <PackageIcon aria-hidden />}</EmptyMedia>
          <EmptyTitle className="text-base">
            {filters.search.trim()
              ? `Nada coincide con «${filters.search.trim()}»`
              : filtered
                ? "No hay productos con estos filtros"
                : "Todavía no hay productos"}
          </EmptyTitle>
        </EmptyHeader>
        {filtered && (
          <EmptyContent className="flex-row justify-center gap-2">
            {filters.search.trim() && (
              <Button variant="outline" className="hit-area" onClick={() => setFilters((previous) => ({ ...previous, search: "" }))}>
                Borrar la búsqueda
              </Button>
            )}
            {(filters.withoutKind || filters.withoutPurchases || loc.filtro) && (
              <Button
                variant="outline"
                className="hit-area"
                data-do="quitar-filtros"
                onClick={() => {
                  setFilters((previous) => ({ ...previous, withoutKind: false, withoutPurchases: false }));
                  if (loc.filtro) setKindFilter(undefined);
                }}
              >
                Quitar filtros
              </Button>
            )}
          </EmptyContent>
        )}
      </Empty>
    );
  else
    content = (
      <>
        <ul className="lg:hidden" aria-label="Productos">
          {products.map((product) => (
            <li key={product.id}>
              <ItemSeparator className="mx-4 my-0 data-horizontal:w-auto" />
              <Item asChild className="rounded-none p-0">
                <Button
                  variant="ghost"
                  id={`product-${product.id}`}
                  data-do={`abrir-${product.id}`}
                  data-selected={product.id === selectedId}
                  onClick={() => openRow(product)}
                  className="h-auto min-h-16 w-full justify-start rounded-none px-4 py-2.5 text-left whitespace-normal hover:bg-muted/60 focus-visible:ring-inset active:bg-muted data-[selected=true]:bg-muted"
                >
                  <ProductRowContent product={product} search={filters.search} />
                </Button>
              </Item>
            </li>
          ))}
        </ul>
        <div className="hidden px-4 lg:block">
          <DesktopTable products={products} search={filters.search} selectedId={selectedId} onOpen={openRow} />
        </div>
        {list.nextCursor && (
          <div className="px-4 pt-4">
            <Button variant="outline" className="hit-area w-full lg:w-auto" disabled={list.fetching} onClick={() => void list.loadMore()}>
              {list.fetching && <Spinner aria-hidden />}
              Ver más
            </Button>
          </div>
        )}
      </>
    );

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
      <main
        aria-label="Catálogo"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        <Tabs
          value={loc.tab}
          onValueChange={changeTab}
          className="@container/list mx-auto flex min-h-full max-w-md flex-col gap-0 pb-8 lg:max-w-6xl"
        >
          <div className="flex flex-col gap-3 px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3 lg:flex-row lg:items-center lg:gap-6">
            <h1 ref={heading} tabIndex={-1} className="font-heading text-2xl font-semibold tracking-tight">
              Catálogo
            </h1>
            <TabsList className="w-full group-data-horizontal/tabs:h-9 lg:w-56">
              <TabsTrigger value="productos" data-do="tab-productos">
                Productos
              </TabsTrigger>
              <TabsTrigger value="tipos" data-do="tab-tipos">
                Tipos
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="productos" className="flex flex-col">
            {toolbar}
            {notice && (
              <Alert role="status" className="mx-4 mb-3 w-auto pr-10 lg:max-w-xl">
                <CircleCheckIcon aria-hidden />
                <AlertDescription className="text-pretty text-foreground">{notice}</AlertDescription>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Cerrar aviso"
                  className="hit-area absolute top-1.5 right-1.5"
                  onClick={() => setNotice(null)}
                >
                  <XIcon />
                </Button>
              </Alert>
            )}
            {content}
          </TabsContent>
          <TabsContent value="tipos" className="flex flex-col">
            <KindsTab
              scenario={scenario}
              loc={loc}
              setLoc={setLoc}
              onKindMerged={(goneId, keptId) => kindFates.current.set(goneId, keptId)}
              onKindDeleted={(id) => kindFates.current.set(id, null)}
              wide={wide}
              allKinds={kinds.kinds}
              onDataChanged={dataChanged}
            />
          </TabsContent>
        </Tabs>
      </main>
      {open && (
        <Ficha
          open={open}
          wide={wide}
          kinds={kinds.kinds}
          onChange={setOpen}
          onClose={() => {
            const id = open.product.id;
            setOpen(null);
            requestAnimationFrame(() => (document.getElementById(`product-${id}`) ?? heading.current)?.focus({ preventScroll: true }));
          }}
          onDataChanged={dataChanged}
          onDeleted={(name) => {
            setOpen(null);
            setNotice(`Se borró «${name}».`);
            dataChanged();
          }}
        />
      )}
    </div>
  );
}

function KindsTab({
  scenario,
  loc,
  setLoc,
  onKindMerged,
  onKindDeleted,
  wide,
  allKinds,
  onDataChanged,
}: {
  scenario: Scenario;
  loc: Loc;
  setLoc: (loc: Loc) => void;
  /** Keep the Productos tab's "Tipo" filter coherent. */
  onKindMerged: (goneId: string, keptId: string) => void;
  onKindDeleted: (id: string) => void;
  wide: boolean;
  allKinds: KindSummary[];
  /** Product-side data (the product list and the kind field) to reload too. */
  onDataChanged: () => void;
}) {
  const list = useKindList();
  const [open, setOpen] = useState<KindOpen | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const sessions = useRef(0);
  const startDraft = useRef(scenario.kind);
  const partnerDone = useRef(false);

  // The URL decides which kind ficha (and product) is open.
  useEffect(() => {
    if (list.status !== "ready") return;
    if (!loc.ficha) {
      if (open) setOpen(null);
      return;
    }
    if (open?.kind.id === loc.ficha) {
      if (!loc.producto && open.product) setOpen({ ...open, product: undefined });
      return;
    }
    const kind = list.kinds.find((candidate) => candidate.id === loc.ficha);
    if (!kind) {
      const next: Loc = { tab: "tipos" };
      write("replace", next, depth());
      setLoc(readLoc());
      return;
    }
    const draft = startDraft.current?.kindId === kind.id ? startDraft.current.draft : undefined;
    startDraft.current = undefined;
    setOpen({ session: ++sessions.current, kind, view: { t: "ficha" }, pickSearch: "", draft });
  }, [loc.ficha, loc.producto, list.status, list.kinds]);

  // A reloaded list refreshes the open kind's name and count.
  useEffect(() => {
    if (!open) return;
    const fresh = list.kinds.find((candidate) => candidate.id === open.kind.id);
    if (fresh && (fresh.name !== open.kind.name || fresh.products !== open.kind.products))
      setOpen({ ...open, kind: fresh });
  }, [list.kinds]);

  const dataChanged = () => {
    void list.refresh();
    setRefreshKey((key) => key + 1);
    onDataChanged();
  };
  const openKind = (kind: KindSummary) => {
    setNotice(null);
    const next: Loc = { tab: "tipos", ficha: kind.id };
    write("push", next, 1);
    setLoc(readLoc());
  };
  const closeAll = (focusId?: string) => {
    const steps = depth();
    setOpen(null);
    const next: Loc = { tab: "tipos" };
    if (steps > 0) window.history.go(-steps);
    else write("replace", next, 0);
    setLoc(readLoc());
    if (focusId) requestAnimationFrame(() => document.getElementById(`kind-${focusId}`)?.focus({ preventScroll: true }));
  };
  const showKind = (kind: Kind, extra: Partial<KindOpen>, fresh?: KindSummary[]) => {
    const summary = (fresh ?? list.kinds).find((candidate) => candidate.id === kind.id) ?? { ...kind, products: 0 };
    setOpen({ session: ++sessions.current, kind: summary, view: { t: "ficha" }, pickSearch: "", ...extra });
    const next: Loc = { tab: "tipos", ficha: kind.id };
    write("replace", next, depth());
    setLoc(readLoc());
  };

  return (
    <>
      {notice && (
        <Alert role="status" className="mx-4 mb-3 w-auto pr-10 lg:max-w-2xl">
          <CircleCheckIcon aria-hidden />
          <AlertDescription className="text-pretty text-foreground">{notice}</AlertDescription>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Cerrar aviso"
            className="hit-area absolute top-1.5 right-1.5"
            onClick={() => setNotice(null)}
          >
            <XIcon />
          </Button>
        </Alert>
      )}
      <KindList list={list} selectedId={open?.kind.id} onOpen={openKind} />
      {open && (
        <KindFicha
          open={open}
          wide={wide}
          kinds={list.kinds}
          allKinds={allKinds}
          refreshKey={refreshKey}
          onChange={setOpen}
          onClose={() => closeAll(open.kind.id)}
          onDataChanged={dataChanged}
          onRenamed={(kind) => {
            setOpen({ ...open, kind: { ...open.kind, name: kind.name }, draft: undefined, notice: undefined });
            dataChanged();
          }}
          onMerged={async (kept, goneName, moved) => {
            const goneId = open.kind.id === kept.id && open.view.t === "compare" ? open.view.other.id : open.kind.id;
            onKindMerged(goneId, kept.id);
            const fresh = await list.refresh();
            showKind(kept, {
              notice: `«${goneName}» se unió a este tipo.${moved === 0 ? "" : moved === 1 ? " Pasó 1 producto." : ` Pasaron ${moved} productos.`}`,
            }, fresh);
            setRefreshKey((key) => key + 1);
            onDataChanged();
          }}
          onDeleted={(name) => {
            onKindDeleted(open.kind.id);
            closeAll();
            setNotice(`Se borró el tipo «${name}».`);
            dataChanged();
          }}
          onGone={() => {
            closeAll();
            dataChanged();
          }}
          onOpenProduct={(product) => {
            const next: Loc = { tab: "tipos", ficha: open.kind.id, producto: product.id };
            write("push", next, 2);
            setLoc(readLoc());
            setOpen({ ...open, product: { session: ++sessions.current, product, view: { t: "ficha" }, pickSearch: "" } });
          }}
          onCloseProduct={() => {
            setOpen({ ...open, product: undefined });
            const next: Loc = { tab: "tipos", ficha: open.kind.id };
            if (depth() === 2) window.history.back();
            else write("replace", next, depth());
            setLoc(readLoc());
          }}
          onProductsLoaded={() => {
            // ya-no-existe: Ana merges on her phone once Luis has the ficha open.
            if (partnerDone.current || !scenario.afterOpen) return;
            partnerDone.current = true;
            scenario.afterOpen(api);
          }}
        />
      )}
    </>
  );
}

/** On the computer: a denser table. Brand and size get their own columns while
 * there is room; with the ficha open they fold under the name. */
function DesktopTable({
  products,
  search,
  selectedId,
  onOpen,
}: {
  products: Product[];
  search: string;
  selectedId?: string | undefined;
  onOpen: (product: Product) => void;
}) {
  const wideCol = "hidden @3xl/list:table-cell";
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead scope="col" className="w-auto">Producto</TableHead>
          <TableHead scope="col" className={`w-[13%] ${wideCol}`}>Marca</TableHead>
          <TableHead scope="col" className={`w-[11%] ${wideCol}`}>Presentación</TableHead>
          <TableHead scope="col" className="w-[17%]">Tipo</TableHead>
          <TableHead scope="col" className="w-28 text-right">Compras</TableHead>
          <TableHead scope="col" className="w-28">Última compra</TableHead>
          <TableHead scope="col" className={`w-24 ${wideCol}`}>Unidos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          const through = matchedThrough(product, search);
          const detail = brandAndSize(product);
          const selected = product.id === selectedId;
          return (
            <TableRow
              key={product.id}
              data-state={selected ? "selected" : undefined}
              className="cursor-pointer"
              // The whole row opens the ficha; the name's button is the keyboard way in,
              // and its click bubbles here, so it opens once.
              onClick={() => onOpen(product)}
            >
              <TableCell className="py-2.5 whitespace-normal">
                <Button
                  variant="ghost"
                  id={`product-${product.id}`}
                  data-do={`abrir-${product.id}`}
                  aria-current={selected ? "true" : undefined}
                  className="h-auto justify-start p-0 text-left text-sm font-medium whitespace-normal hover:bg-transparent [overflow-wrap:anywhere]"
                >
                  {product.name}
                </Button>
                {(detail || product.merged.length > 0) && (
                  <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground @3xl/list:hidden">
                    {detail && <span className="truncate">{detail}</span>}
                    {product.merged.length > 0 && (
                      <span className="inline-flex shrink-0 items-center gap-0.5">
                        <CombineIcon aria-hidden className="size-3" />
                        {mergedText(product.merged.length)}
                      </span>
                    )}
                  </span>
                )}
                {through && (
                  <span className="mt-0.5 block text-xs text-muted-foreground">Incluye «{through}», unido a este</span>
                )}
              </TableCell>
              <TableCell className={`truncate text-muted-foreground ${wideCol}`}>{product.brand}</TableCell>
              <TableCell className={`text-muted-foreground tabular-nums ${wideCol}`}>{formatSize(product.size)}</TableCell>
              <TableCell>
                <KindBadge kind={product.kind} />
              </TableCell>
              <TableCell data-do={`celda-${product.id}`} className={`text-right tabular-nums ${product.purchases === 0 ? "text-muted-foreground" : ""}`}>
                {product.purchases === 0 ? "Sin compras" : product.purchases}
              </TableCell>
              <TableCell className="text-muted-foreground tabular-nums">
                {product.lastPurchasedOn && formatDay(product.lastPurchasedOn)}
              </TableCell>
              <TableCell className={`text-muted-foreground ${wideCol}`}>
                {product.merged.length > 0 ? (
                  <span className="inline-flex items-center gap-1">
                    <CombineIcon aria-hidden className="size-3.5" />
                    {product.merged.length}
                  </span>
                ) : null}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function ListSkeleton() {
  return (
    <div aria-busy="true" className="px-4">
      <span className="sr-only" role="status">
        Cargando el catálogo…
      </span>
      {Array.from({ length: 9 }, (_, index) => (
        <div key={index} className="flex min-h-16 flex-col justify-center gap-2 border-b py-2.5 last:border-0">
          <div className="flex justify-between gap-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between gap-6">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3.5 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}

