import {
  CheckIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  CombineIcon,
  TagsIcon,
  Trash2Icon,
  TriangleAlertIcon,
  WifiOffIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { api, toUiError, type UiError } from "./client.ts";
import { fold, type Kind, type KindSummary, type Product } from "./data.ts";
import { ActionRow, Ficha, FichaFrame, type OpenState } from "./ficha.tsx";
import { brandAndSize, purchasesText } from "./format.ts";
import { OFFLINE, SearchField, SectionHeading } from "./parts.tsx";

export const productsText = (n: number) =>
  n === 0 ? "Sin productos" : n === 1 ? "1 producto" : `${n} productos`;
const GONE = "Este tipo ya no existe. Puede haberse unido a otro tipo o eliminado.";
const cleanName = (text: string) => text.trim().replace(/\s+/g, " ");

// ——— Reading kinds ——————————————————————————————————————————————————————

export function useKindList() {
  const [state, setState] = useState<{
    kinds: KindSummary[];
    status: "loading" | "ready" | "error";
    fetching: boolean;
  }>({ kinds: [], status: "loading", fetching: true });
  const refresh = useCallback(async () => {
    setState((previous) => ({ ...previous, fetching: true }));
    try {
      const { kinds } = await api.list_kinds();
      setState({ kinds, status: "ready", fetching: false });
      return kinds;
    } catch {
      setState((previous) => ({ ...previous, status: previous.status === "ready" ? "ready" : "error", fetching: false }));
      return undefined;
    }
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { ...state, refresh };
}

/** A kind's current products, through list_products { kind }. */
function useKindProducts(kindName: string, refreshKey: number, onLoaded?: () => void) {
  const [state, setState] = useState<{
    products: Product[];
    more: boolean;
    status: "loading" | "ready" | "error";
    error?: UiError | undefined;
  }>({ products: [], more: false, status: "loading" });
  const loaded = useRef(onLoaded);
  loaded.current = onLoaded;
  const load = useCallback(async () => {
    setState((previous) => ({ ...previous, status: previous.status === "ready" ? "ready" : "loading" }));
    try {
      const page = await api.list_products({ kind: kindName, limit: 50 });
      setState({ products: page.products, more: page.nextCursor !== null, status: "ready" });
      loaded.current?.();
    } catch (failure) {
      setState({ products: [], more: false, status: "error", error: await toUiError(failure) });
    }
  }, [kindName]);
  useEffect(() => {
    void load();
  }, [load, refreshKey]);
  return { ...state, retry: load };
}

// ——— The "Tipos" tab ——————————————————————————————————————————————————————

export function KindList({
  list,
  selectedId,
  onOpen,
}: {
  list: ReturnType<typeof useKindList>;
  selectedId?: string | undefined;
  onOpen: (kind: KindSummary) => void;
}) {
  if (list.status === "loading")
    return (
      <div aria-busy="true" className="px-4">
        <span className="sr-only" role="status">
          Cargando los tipos…
        </span>
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="flex min-h-13 items-center justify-between gap-6 border-b py-3 last:border-0 lg:max-w-2xl">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  if (list.status === "error")
    return (
      <Alert className="mx-4 my-4 w-auto lg:max-w-xl">
        <WifiOffIcon aria-hidden />
        <AlertDescription className="text-pretty">
          <p>{OFFLINE}</p>
          <Button variant="outline" className="hit-area mt-3 text-foreground" disabled={list.fetching} onClick={() => void list.refresh()}>
            {list.fetching && <Spinner aria-hidden />}
            Reintentar
          </Button>
        </AlertDescription>
      </Alert>
    );
  if (list.kinds.length === 0)
    return (
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TagsIcon aria-hidden />
          </EmptyMedia>
          <EmptyTitle className="text-base">Todavía no hay tipos</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  return (
    <>
      <ul className="lg:hidden" aria-label="Tipos">
        {list.kinds.map((kind, index) => (
          <li key={kind.id}>
            {index > 0 && <ItemSeparator className="mx-4 my-0 data-horizontal:w-auto" />}
            <Item asChild className="rounded-none p-0">
              <Button
                variant="ghost"
                id={`kind-${kind.id}`}
                data-do={`abrir-tipo-${kind.id}`}
                data-selected={kind.id === selectedId}
                onClick={() => onOpen(kind)}
                className="h-auto min-h-13 w-full justify-start gap-3 rounded-none px-4 py-3 text-left whitespace-normal hover:bg-muted/60 focus-visible:ring-inset active:bg-muted data-[selected=true]:bg-muted"
              >
                <span className="min-w-0 flex-1 text-sm font-medium [overflow-wrap:anywhere]">{kind.name}</span>
                <span className={`shrink-0 text-sm tabular-nums ${kind.products === 0 ? "text-muted-foreground" : ""}`}>
                  {productsText(kind.products)}
                </span>
                <ChevronRightIcon aria-hidden className="-mr-1 text-muted-foreground" />
              </Button>
            </Item>
          </li>
        ))}
      </ul>
      <div className="hidden px-4 lg:block">
        <Table className="table-fixed lg:max-w-2xl">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead scope="col">Tipo</TableHead>
              <TableHead scope="col" className="w-36 text-right">
                Productos
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.kinds.map((kind) => {
              const selected = kind.id === selectedId;
              return (
                <TableRow
                  key={kind.id}
                  data-state={selected ? "selected" : undefined}
                  className="cursor-pointer"
                  // The whole row opens the ficha; the name's button is the keyboard way in,
                  // and its click bubbles here, so it opens once.
                  onClick={() => onOpen(kind)}
                >
                  <TableCell className="py-2.5 whitespace-normal">
                    <Button
                      variant="ghost"
                      id={`kind-${kind.id}`}
                      data-do={`abrir-tipo-${kind.id}`}
                      aria-current={selected ? "true" : undefined}
                  className="h-auto justify-start p-0 text-left text-sm font-medium whitespace-normal hover:bg-transparent [overflow-wrap:anywhere]"
                    >
                      {kind.name}
                    </Button>
                  </TableCell>
                  <TableCell data-do={`celda-${kind.id}`} className={`text-right tabular-nums ${kind.products === 0 ? "text-muted-foreground" : ""}`}>
                    {kind.products === 0 ? "Sin productos" : kind.products}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

// ——— The kind ficha ——————————————————————————————————————————————————————

export type KindView = { t: "ficha" } | { t: "pick" } | { t: "compare"; other: KindSummary };
export type KindOpen = {
  session: number;
  kind: KindSummary;
  view: KindView;
  notice?: string | undefined;
  draft?: string | undefined;
  pickSearch: string;
  keepId?: string | undefined;
  /** A write found the kind gone: only the way back remains. */
  gone?: boolean | undefined;
  /** A product of this kind, opened from the ficha. */
  product?: OpenState | undefined;
};

type KindCallbacks = {
  onChange: (next: KindOpen) => void;
  onClose: () => void;
  /** A write landed: reload the kinds and the products. */
  onDataChanged: () => void;
  onRenamed: (kind: Kind) => void;
  onMerged: (kept: Kind, goneName: string, moved: number) => void;
  onDeleted: (name: string) => void;
  /** The kind no longer exists: back to the list, freshly loaded. */
  onGone: () => void;
  onOpenProduct: (product: Product) => void;
  onCloseProduct: () => void;
  onProductsLoaded?: () => void;
};

export function KindFicha({
  open,
  wide,
  kinds,
  allKinds,
  refreshKey,
  ...callbacks
}: {
  open: KindOpen;
  wide: boolean;
  /** Every kind, for the merge picker. */
  kinds: KindSummary[];
  /** The product ficha's kind field suggestions. */
  allKinds: KindSummary[];
  refreshKey: number;
} & KindCallbacks) {
  const { kind, view } = open;
  const set = (next: Partial<KindOpen>) => callbacks.onChange({ ...open, ...next });

  if (open.product)
    return (
      <Ficha
        open={open.product}
        wide={wide}
        kinds={allKinds}
        onChange={(product) => set({ product })}
        onBack={callbacks.onCloseProduct}
        onClose={callbacks.onClose}
        onDataChanged={callbacks.onDataChanged}
        onDeleted={(name) => {
          set({ product: undefined, notice: `Se borró «${name}».` });
          callbacks.onDataChanged();
        }}
      />
    );

  let title: string;
  let description = "";
  let back: (() => void) | undefined;
  let body: ReactNode;
  if (view.t === "ficha") {
    title = kind.name;
    description = productsText(kind.products);
    body = (
      <div key={`${open.session}-${kind.id}`} className="flex flex-col gap-7">
        {open.notice && (
          <Alert role="status">
            <CircleCheckIcon aria-hidden />
            <AlertDescription className="text-pretty text-foreground">{open.notice}</AlertDescription>
          </Alert>
        )}
        <RenameForm
          kind={kind}
          initialDraft={open.draft}
          onSaved={(renamed) => callbacks.onRenamed(renamed)}
          onMergeWith={(other) => {
            const summary = kinds.find((candidate) => candidate.id === other.id);
            if (summary) set({ view: { t: "compare", other: summary }, keepId: undefined, notice: undefined, draft: undefined });
          }}
          onGone={callbacks.onGone}
          onNotFound={() => set({ gone: true })}
        />
        {kind.products > 0 && !open.gone && (
          <KindProducts
            kind={kind}
            refreshKey={refreshKey}
            onOpen={callbacks.onOpenProduct}
            onGone={callbacks.onGone}
            onLoaded={callbacks.onProductsLoaded}
          />
        )}
        {!open.gone && <KindActions
          kind={kind}
          onStartMerge={() => set({ view: { t: "pick" }, notice: undefined, keepId: undefined })}
          onDeleted={() => callbacks.onDeleted(kind.name)}
          onDataChanged={callbacks.onDataChanged}
          onGone={callbacks.onGone}
        />}
      </div>
    );
  } else if (view.t === "pick") {
    title = `Unir «${kind.name}» con…`;
    back = () => set({ view: { t: "ficha" } });
    body = (
      <KindPick
        kind={kind}
        kinds={kinds}
        search={open.pickSearch}
        wide={wide}
        onSearch={(pickSearch) => set({ pickSearch })}
        onPick={(other) => set({ view: { t: "compare", other }, keepId: undefined })}
      />
    );
  } else {
    title = "¿Cuál queda?";
    back = () => set({ view: { t: "pick" } });
    body = (
      <KindCompare
        a={kind}
        b={view.other}
        keepId={open.keepId}
        onKeep={(keepId) => set({ keepId })}
        onCancel={() => set({ view: { t: "ficha" } })}
        onMerged={callbacks.onMerged}
        onGone={callbacks.onGone}
      />
    );
  }

  return (
    <FichaFrame
      wide={wide}
      title={title}
      description={description}
      back={back}
      scrollKey={`${open.session}-${kind.id}-${view.t}`}
      onClose={callbacks.onClose}
    >
      {body}
    </FichaFrame>
  );
}

/** Words and a way forward for a failed kind write. */
function KindFailure({
  error,
  onRetry,
  retrying,
  onGone,
  onMergeWith,
}: {
  error: UiError;
  onRetry?: () => void;
  retrying?: boolean;
  onGone: () => void;
  onMergeWith?: (kind: Kind) => void;
}) {
  const { failure } = error;
  if (failure._tag === "KindNameTaken")
    return (
      <Alert>
        <TriangleAlertIcon aria-hidden />
        <AlertTitle className="leading-snug">Ya existe el tipo «{failure.kind.name}».</AlertTitle>
        <AlertDescription className="text-pretty">
          <p className="mb-0!">Si son lo mismo, unilos.</p>
          {onMergeWith && (
            <Button
              type="button"
              variant="outline"
              className="hit-area mt-3 h-auto min-h-8 text-left whitespace-normal text-foreground"
              data-do="unir-con-tomado"
              onClick={() => onMergeWith(failure.kind)}
            >
              <CombineIcon aria-hidden />
              Unir con «{failure.kind.name}»
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  if (failure._tag === "KindNotFound")
    return (
      <Alert>
        <TriangleAlertIcon aria-hidden />
        <AlertDescription className="text-pretty">
          <p className="mb-0! text-foreground">{GONE}</p>
          <Button type="button" variant="outline" className="hit-area mt-3 text-foreground" data-do="volver-tipos" onClick={onGone}>
            Volver a los tipos
          </Button>
        </AlertDescription>
      </Alert>
    );
  if (failure._tag === "KindHasProducts")
    return (
      <Alert>
        <TriangleAlertIcon aria-hidden />
        <AlertDescription className="text-pretty text-foreground">
          No se puede borrar porque ahora tiene {productsText(failure.products).toLowerCase()}.
        </AlertDescription>
      </Alert>
    );
  return (
    <Alert>
      <WifiOffIcon aria-hidden />
      <AlertDescription className="text-pretty">
        <p className="mb-0! text-foreground">{OFFLINE}</p>
        {onRetry && (
          <Button type="button" variant="outline" className="hit-area mt-3 text-foreground" disabled={retrying} data-do="reintentar" onClick={onRetry}>
            {retrying && <Spinner aria-hidden />}
            {retrying ? "Reintentando…" : "Reintentar"}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

function RenameForm({
  kind,
  initialDraft,
  onSaved,
  onMergeWith,
  onGone,
  onNotFound,
}: {
  kind: KindSummary;
  initialDraft?: string | undefined;
  onSaved: (kind: Kind) => void;
  onMergeWith: (kind: Kind) => void;
  onGone: () => void;
  onNotFound: () => void;
}) {
  const [draft, setDraft] = useState(initialDraft ?? kind.name);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<UiError | null>(null);
  const gone = error?.failure._tag === "KindNotFound";
  const dirty = cleanName(draft) !== kind.name;
  const nameError = cleanName(draft) === "" ? "Escribí un nombre." : null;

  const save = async () => {
    setChecked(true);
    if (nameError || saving) return;
    setSaving(true);
    setError(null);
    try {
      const result = await api.rename_kind({ kindId: kind.id, name: draft });
      setDraft(result.kind.name);
      setSaved(true);
      setChecked(false);
      onSaved(result.kind);
    } catch (failure) {
      const next = await toUiError(failure);
      setError(next);
      if (next.failure._tag === "KindNotFound") onNotFound();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      noValidate
      aria-label="Nombre del tipo"
      onSubmit={(event) => {
        event.preventDefault();
        void save();
      }}
    >
      <Field data-invalid={checked && !!nameError}>
        <FieldLabel htmlFor="kind-name">Nombre</FieldLabel>
        <Input
          id="kind-name"
          data-do="nombre-tipo"
          className="h-10 lg:h-9"
          value={draft}
          disabled={gone}
          autoComplete="off"
          autoCapitalize="none"
          aria-invalid={(checked && !!nameError) || error?.failure._tag === "KindNameTaken" || undefined}
          onChange={(event) => {
            setDraft(event.target.value);
            setSaved(false);
            if (error?.failure._tag === "KindNameTaken") setError(null);
          }}
        />
        {checked && nameError && <FieldError>{nameError}</FieldError>}
      </Field>
      {error && (
        <div className="mt-4">
          <KindFailure error={error} onRetry={() => void save()} retrying={saving} onGone={onGone} onMergeWith={onMergeWith} />
        </div>
      )}
      {!gone && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button type="submit" size="lg" className="hit-area h-10 px-4 lg:h-9" disabled={!dirty || saving} data-do="guardar-tipo">
            {saving && <Spinner aria-hidden />}
            {saving ? "Guardando…" : "Guardar"}
          </Button>
          {dirty && !saving && (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="hit-area h-10 lg:h-9"
              onClick={() => {
                setDraft(kind.name);
                setError(null);
                setChecked(false);
              }}
            >
              Descartar
            </Button>
          )}
          {saved && !dirty && (
            <span role="status" className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckIcon aria-hidden className="size-4" />
              Guardado
            </span>
          )}
        </div>
      )}
    </form>
  );
}

function KindProducts({
  kind,
  refreshKey,
  onOpen,
  onGone,
  onLoaded,
}: {
  kind: KindSummary;
  refreshKey: number;
  onOpen: (product: Product) => void;
  onGone: () => void;
  onLoaded?: (() => void) | undefined;
}) {
  const list = useKindProducts(kind.name, refreshKey, onLoaded);
  return (
    <section aria-labelledby="kind-products" className="flex flex-col gap-1">
      <SectionHeading id="kind-products">Productos</SectionHeading>
      {list.status === "loading" ? (
        <div aria-busy="true" className="mt-2 flex flex-col gap-3">
          {Array.from({ length: Math.min(kind.products, 4) }, (_, index) => (
            <Skeleton key={index} className="h-11 w-full" />
          ))}
        </div>
      ) : list.status === "error" && list.error ? (
        <div className="mt-2">
          <KindFailure error={list.error} onRetry={() => void list.retry()} onGone={onGone} />
        </div>
      ) : (
        <ul className="-mx-4 mt-1 lg:-mx-6">
          {list.products.map((product, index) => {
            const detail = brandAndSize(product);
            return (
              <li key={product.id}>
                {index > 0 && <ItemSeparator className="mx-4 my-0 data-horizontal:w-auto lg:mx-6" />}
                <Item asChild className="rounded-none p-0">
                  <Button
                    variant="ghost"
                    data-do={`abrir-producto-${product.id}`}
                    onClick={() => onOpen(product)}
                    className="h-auto min-h-14 w-full justify-start gap-3 rounded-none px-4 py-2.5 text-left whitespace-normal hover:bg-muted/60 focus-visible:ring-inset active:bg-muted lg:px-6"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="line-clamp-2 text-sm leading-snug font-medium [overflow-wrap:anywhere]">{product.name}</span>
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {[detail, purchasesText(product.purchases)].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    <ChevronRightIcon aria-hidden className="text-muted-foreground" />
                  </Button>
                </Item>
              </li>
            );
          })}
        </ul>
      )}
      {list.more && <p className="text-xs text-muted-foreground">Se muestran los primeros 50.</p>}
    </section>
  );
}

function KindActions({
  kind,
  onStartMerge,
  onDeleted,
  onDataChanged,
  onGone,
}: {
  kind: KindSummary;
  onStartMerge: () => void;
  onDeleted: () => void;
  onDataChanged: () => void;
  onGone: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<UiError | null>(null);
  const remove = async () => {
    setDeleting(true);
    setError(null);
    try {
      await api.delete_kind({ kindId: kind.id });
      setConfirming(false);
      onDeleted();
    } catch (failure) {
      const next = await toUiError(failure);
      setError(next);
      if (next.failure._tag === "KindHasProducts") onDataChanged();
    } finally {
      setDeleting(false);
    }
  };
  return (
    <section aria-label="Acciones" className="flex flex-col gap-2">
      <ActionRow icon={<CombineIcon aria-hidden />} title="Unir con otro tipo" doId="unir-tipo" onClick={onStartMerge} />
      {kind.products === 0 ? (
        <ActionRow
          icon={<Trash2Icon aria-hidden />}
          title="Borrar"
          destructive
          doId="borrar-tipo"
          onClick={() => {
            setError(null);
            setConfirming(true);
          }}
        />
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-dashed px-3 py-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
            <Trash2Icon aria-hidden className="size-4" />
          </span>
          <span className="text-sm text-muted-foreground">
            No se puede borrar porque tiene {productsText(kind.products).toLowerCase()}.
          </span>
        </div>
      )}
      <AlertDialog open={confirming} onOpenChange={(next) => !deleting && setConfirming(next)}>
        <AlertDialogContent aria-describedby={undefined}>
          <AlertDialogHeader>
            <AlertDialogTitle className="[overflow-wrap:anywhere]">¿Borrar el tipo «{kind.name}»?</AlertDialogTitle>
          </AlertDialogHeader>
          {error && (
            <KindFailure
              error={error}
              onRetry={() => void remove()}
              retrying={deleting}
              onGone={() => {
                setConfirming(false);
                onGone();
              }}
            />
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className="h-10 lg:h-8" disabled={deleting}>
              {error?.failure._tag === "KindHasProducts" ? "Cerrar" : "Cancelar"}
            </AlertDialogCancel>
            {error?.failure._tag !== "KindHasProducts" && error?.failure._tag !== "KindNotFound" && (
              <AlertDialogAction
                variant="destructive"
                className="h-10 lg:h-8"
                disabled={deleting}
                data-do="confirmar-borrar-tipo"
                onClick={(event) => {
                  event.preventDefault();
                  void remove();
                }}
              >
                {deleting && <Spinner aria-hidden />}
                {deleting ? "Borrando…" : "Borrar"}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

// ——— Merge: pick the other kind, then choose which one stays ———————————————

function KindPick({
  kind,
  kinds,
  search,
  wide,
  onSearch,
  onPick,
}: {
  kind: KindSummary;
  kinds: KindSummary[];
  search: string;
  wide: boolean;
  onSearch: (search: string) => void;
  onPick: (other: KindSummary) => void;
}) {
  const query = fold(search);
  const results = kinds.filter((candidate) => candidate.id !== kind.id && fold(candidate.name).includes(query));
  return (
    <div className="flex flex-col gap-3">
      <SearchField value={search} onChange={onSearch} fetching={false} placeholder="Buscar tipo" autoFocus={wide} doId="buscar-tipo" />
      {results.length === 0 ? (
        <Empty className="py-8">
          <EmptyHeader>
            <EmptyTitle className="text-base">
              {search.trim() ? `Nada coincide con «${search.trim()}»` : "No hay otros tipos"}
            </EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="-mx-4 lg:-mx-6">
          {results.map((candidate) => (
            <li key={candidate.id}>
              <ItemSeparator className="mx-4 my-0 data-horizontal:w-auto lg:mx-6" />
              <Item asChild className="rounded-none p-0">
                <Button
                  variant="ghost"
                  data-do={`elegir-tipo-${candidate.id}`}
                  onClick={() => onPick(candidate)}
                  className="h-auto min-h-13 w-full justify-start gap-3 rounded-none px-4 py-3 text-left whitespace-normal hover:bg-muted/60 focus-visible:ring-inset active:bg-muted lg:px-6"
                >
                  <span className="min-w-0 flex-1 text-sm font-medium [overflow-wrap:anywhere]">{candidate.name}</span>
                  <span className={`shrink-0 text-sm tabular-nums ${candidate.products === 0 ? "text-muted-foreground" : ""}`}>
                    {productsText(candidate.products)}
                  </span>
                  <ChevronRightIcon aria-hidden className="-mr-1 text-muted-foreground" />
                </Button>
              </Item>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** The first product names of a kind, so the cards say what each one holds. */
function ProductNames({ kind }: { kind: KindSummary }) {
  const list = useKindProducts(kind.name, 0);
  if (kind.products === 0) return <span className="text-muted-foreground">Sin productos</span>;
  if (list.status !== "ready") return <Skeleton className="h-4 w-40" />;
  const shown = list.products.slice(0, 3);
  const rest = kind.products - shown.length;
  return (
    <ul className="flex flex-col gap-0.5">
      {shown.map((product) => (
        <li key={product.id} className="[overflow-wrap:anywhere]">
          {product.name}
        </li>
      ))}
      {rest > 0 && <li className="text-muted-foreground">y {productsText(rest).toLowerCase()} más</li>}
    </ul>
  );
}

function KindCompare({
  a,
  b,
  keepId,
  onKeep,
  onCancel,
  onMerged,
  onGone,
}: {
  a: KindSummary;
  b: KindSummary;
  keepId?: string | undefined;
  onKeep: (id: string) => void;
  onCancel: () => void;
  onMerged: (kept: Kind, goneName: string, moved: number) => void;
  onGone: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<UiError | null>(null);
  const keep = keepId === a.id ? a : keepId === b.id ? b : null;
  const gone = keep === a ? b : keep === b ? a : null;
  const settled = error?.failure._tag === "KindNotFound";

  const confirm = async () => {
    if (!keep || !gone) return;
    setPending(true);
    setError(null);
    try {
      const result = await api.merge_kinds({ kindId: gone.id, intoKindId: keep.id });
      onMerged(result.kind, gone.name, result.moved);
    } catch (failure) {
      setError(await toUiError(failure));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        type="single"
        variant="outline"
        orientation="vertical"
        spacing={2}
        value={keepId ?? ""}
        aria-label="Cuál queda"
        disabled={pending || settled}
        onValueChange={(value) => {
          if (value) onKeep(value);
        }}
        className="w-full gap-2"
      >
        {[a, b].map((kind) => {
          const on = keepId === kind.id;
          const goes = keep !== null && !on;
          return (
            <ToggleGroupItem
              key={kind.id}
              value={kind.id}
              data-do={`queda-${kind.id}`}
              className="h-auto w-full flex-col items-stretch justify-start gap-2 rounded-xl! border p-3 text-left font-normal whitespace-normal hover:bg-muted/40 data-[state=on]:border-foreground data-[state=on]:bg-muted/40 data-[state=on]:ring-1 data-[state=on]:ring-foreground"
            >
              <span className={`flex items-center gap-1.5 text-xs font-medium ${on ? "text-foreground" : "text-muted-foreground"}`}>
                {on ? <CircleCheckIcon aria-hidden className="size-4" /> : goes ? <XIcon aria-hidden className="size-4" /> : <CircleIcon aria-hidden className="size-4" />}
                {on ? "Queda" : goes ? "Desaparece" : "Elegir"}
              </span>
              <span className={`text-sm leading-snug font-semibold [overflow-wrap:anywhere] ${goes ? "text-muted-foreground line-through decoration-1" : ""}`}>
                {kind.name}
              </span>
              <span className="grid grid-cols-[auto_1fr] gap-x-3 text-xs">
                <span className="text-muted-foreground">{productsText(kind.products)}</span>
                <span className="min-w-0">
                  {kind.products > 0 && <ProductNames kind={kind} />}
                </span>
              </span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      {keep && gone && !settled && (
        <Alert className="border-foreground/25">
          <TriangleAlertIcon aria-hidden />
          <AlertTitle>No se puede deshacer</AlertTitle>
        </Alert>
      )}

      {error && <KindFailure error={error} onRetry={() => void confirm()} retrying={pending} onGone={onGone} />}

      {!settled && (
        <div className="flex flex-col gap-2 lg:flex-row">
          <Button size="lg" className="hit-area h-11 px-4 lg:h-9" disabled={!keep || pending} data-do="confirmar-unir-tipo" onClick={() => void confirm()}>
            {pending ? <Spinner aria-hidden /> : <CombineIcon aria-hidden />}
            {pending ? "Uniendo…" : keep && gone ? `Unir en «${keep.name}»` : "Elegí cuál queda"}
          </Button>
          <Button variant="ghost" size="lg" className="hit-area h-11 lg:h-9" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
}
