import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  CombineIcon,
  PencilIcon,
  PlusIcon,
  SplitIcon,
  TagIcon,
  Trash2Icon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Item, ItemSeparator } from "@/components/ui/item";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { api, toUiError, useProductList, type UiError } from "./client.ts";
import { fold, type KindSummary, type Product, type Size, type Unit } from "./data.ts";
import { brandAndSize, formatDay, formatSize, formatWhen, purchasesText } from "./format.ts";
import { FailureAlert, KindBadge, ProductRowContent, SearchField, SectionHeading } from "./parts.tsx";
import type { Draft } from "./scenarios.ts";

export type View = { t: "ficha" } | { t: "pick" } | { t: "compare"; other: Product };
export type Notice = { text: string; open?: Product };
export type OpenState = {
  session: number;
  product: Product;
  view: View;
  notice?: Notice | undefined;
  draft?: Draft | undefined;
  pickSearch: string;
  keepId?: string | undefined;
};

type Callbacks = {
  onChange: (next: OpenState) => void;
  onClose: () => void;
  /** A write landed: reload the list and the kinds. */
  onDataChanged: () => void;
  onDeleted: (name: string) => void;
  /** Opened from a kind ficha: the back arrow returns to it. */
  onBack?: (() => void) | undefined;
};

export function Ficha({
  open,
  wide,
  kinds,
  ...callbacks
}: { open: OpenState; wide: boolean; kinds: KindSummary[] } & Callbacks) {
  const { product, view } = open;
  const set = (next: Partial<OpenState>) => callbacks.onChange({ ...open, ...next });
  const openProduct = (next: Product, notice?: Notice) =>
    callbacks.onChange({
      session: open.session + 1,
      product: next,
      view: { t: "ficha" },
      pickSearch: "",
      ...(notice ? { notice } : {}),
    });

  let title: string;
  let description = "";
  let back: (() => void) | undefined;
  let body: ReactNode;
  if (view.t === "ficha") {
    title = product.name;
    back = callbacks.onBack;
    description = [
      purchasesText(product.purchases),
      product.lastPurchasedOn && `última ${formatDay(product.lastPurchasedOn)}`,
    ]
      .filter(Boolean)
      .join(" · ");
    body = (
      <FichaBody
        key={`${open.session}-${product.id}`}
        open={open}
        kinds={kinds}
        onSaved={(saved) => {
          set({ product: saved, notice: undefined, draft: undefined });
          callbacks.onDataChanged();
        }}
        onStartMerge={() => set({ view: { t: "pick" }, notice: undefined, keepId: undefined })}
        onOpen={(next, notice) => openProduct(next, notice)}
        onSeparated={(from, back, lines) => {
          set({
            product: from,
            notice: {
              text: `«${back.name}» se separó con ${lines === 1 ? "su compra" : lines === 0 ? "ninguna compra" : `sus ${lines} compras`}.`,
              open: back,
            },
          });
          callbacks.onDataChanged();
        }}
        onDeleted={() => callbacks.onDeleted(product.name)}
        onGone={() => {
          callbacks.onDataChanged();
          callbacks.onClose();
        }}
      />
    );
  } else if (view.t === "pick") {
    title = `Unir «${product.name}» con…`;
    back = () => set({ view: { t: "ficha" } });
    body = (
      <MergePick
        product={product}
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
      <MergeCompare
        a={product}
        b={view.other}
        keepId={open.keepId}
        onKeep={(keepId) => set({ keepId })}
        onUpdate={(updated) =>
          set(
            updated.id === product.id
              ? { product: updated }
              : { view: { t: "compare", other: updated } },
          )
        }
        onCancel={() => set({ view: { t: "ficha" } })}
        onMerged={(kept, gone) => {
          openProduct(kept, {
            text: `«${gone.name}» quedó unido a este producto.`,
          });
          callbacks.onDataChanged();
        }}
        onOpen={(next) => openProduct(next)}
        onDataChanged={callbacks.onDataChanged}
        onGone={() => {
          callbacks.onDataChanged();
          callbacks.onClose();
        }}
      />
    );
  }

  return (
    <FichaFrame
      wide={wide}
      title={title}
      description={description}
      back={back}
      scrollKey={`${open.session}-${product.id}-${view.t}`}
      onClose={callbacks.onClose}
    >
      {body}
    </FichaFrame>
  );
}

/** Drawer on the phone, side sheet on the computer, like a purchase. */
export function FichaFrame({
  wide,
  title,
  description,
  back,
  scrollKey,
  onClose,
  children,
}: {
  wide: boolean;
  title: string;
  description: string;
  back?: (() => void) | undefined;
  scrollKey: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const header = (
    Title: typeof SheetTitle,
    Description: typeof SheetDescription,
    Close: typeof SheetClose,
  ) => (
    <div className="flex shrink-0 items-start gap-1 border-b pt-2 pr-1.5 pb-3 pl-4 lg:py-3 lg:pr-2 lg:pl-6">
      {back && (
        <Button
          variant="ghost"
          size="icon"
          className="hit-area mt-1 -ml-2 shrink-0"
          aria-label="Volver"
          data-do="volver"
          onClick={back}
        >
          <ArrowLeftIcon />
        </Button>
      )}
      <div className="min-w-0 flex-1 pt-1.5">
        <Title className="text-xl leading-tight font-semibold [overflow-wrap:anywhere]">
          {title}
        </Title>
        <Description className={description ? "mt-1 text-xs text-muted-foreground" : "sr-only"}>
          {description || title}
        </Description>
      </div>
      <Close asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hit-area shrink-0"
          aria-label="Cerrar ficha"
          data-do="cerrar"
        >
          <XIcon />
        </Button>
      </Close>
    </div>
  );

  if (wide)
    return (
      <Sheet
        open
        onOpenChange={(next) => {
          if (!next) onClose();
        }}
      >
        <SheetContent
          side="right"
          showCloseButton={false}
          onOpenAutoFocus={(event) => {
            // Land on the ficha itself, not on its close button.
            event.preventDefault();
            (event.currentTarget as HTMLElement | null)?.focus();
          }}
          className="gap-0 shadow-xl outline-none data-[side=right]:w-[30rem] data-[side=right]:sm:max-w-[30rem]"
        >
          {header(SheetTitle, SheetDescription, SheetClose)}
          <div
            key={scrollKey}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-5 pb-10"
          >
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );

  return (
    <Drawer
      open
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DrawerContent className="h-[calc(100svh-3.25rem)] rounded-t-2xl shadow-[0_-8px_30px_rgb(0_0_0/0.12)] data-[vaul-drawer-direction=bottom]:mx-auto data-[vaul-drawer-direction=bottom]:mt-0 data-[vaul-drawer-direction=bottom]:max-h-none data-[vaul-drawer-direction=bottom]:max-w-md">
        {header(DrawerTitle, DrawerDescription, DrawerClose)}
        <div
          key={scrollKey}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]"
        >
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// ——— The ficha itself ———————————————————————————————————————————————

function FichaBody({
  open,
  kinds,
  onSaved,
  onStartMerge,
  onOpen,
  onSeparated,
  onDeleted,
  onGone,
}: {
  open: OpenState;
  kinds: KindSummary[];
  onSaved: (product: Product) => void;
  onStartMerge: () => void;
  onOpen: (product: Product, notice?: Notice) => void;
  onSeparated: (from: Product, back: Product, lines: number) => void;
  onDeleted: () => void;
  onGone: () => void;
}) {
  const { product, notice } = open;
  return (
    <div className="flex flex-col gap-7">
      {notice && (
        <Alert role="status">
          <CircleCheckIcon aria-hidden />
          <AlertDescription className="text-pretty">
            <p className="mb-0! text-foreground">{notice.text}</p>
            {notice.open && (
              <Button
                variant="outline"
                className="hit-area mt-3 h-auto min-h-8 text-left whitespace-normal text-foreground"
                data-do="abrir-separado"
                onClick={() => onOpen(notice.open!)}
              >
                Abrir «{notice.open.name}»
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
      <EditForm
        product={product}
        kinds={kinds}
        initialDraft={open.draft}
        onSaved={onSaved}
        onOpen={onOpen}
        onGone={onGone}
      />
      {product.merged.length > 0 && (
        <MergedList product={product} onSeparated={onSeparated} onOpen={onOpen} onGone={onGone} />
      )}
      <Actions product={product} onStartMerge={onStartMerge} onDeleted={onDeleted} onOpen={onOpen} onGone={onGone} />
    </div>
  );
}

const draftOf = (product: Product): Draft => ({
  name: product.name,
  brand: product.brand ?? "",
  amount: product.size ? String(product.size.amount) : "",
  unit: product.size?.unit ?? "g",
  kind: product.kind?.name ?? "",
});

const amountProblem = (amount: string) =>
  amount.trim() !== "" && !/^[1-9]\d*$/.test(amount.trim())
    ? "Escribí un número entero."
    : null;
const sizeOf = (amount: string, unit: Unit): Size | null =>
  amount.trim() === "" ? null : { amount: Number(amount.trim()), unit };
const pricePer = (size: Size | null) =>
  size?.unit === "ml" ? "por litro" : size?.unit === "unit" ? "por unidad" : "por kilo";
const sameSize = (a: Size | null, b: Size | null) =>
  a === null || b === null ? a === b : a.amount === b.amount && a.unit === b.unit;

/** Only what changed goes to update_product; empty means none. */
function changesOf(product: Product, draft: Draft) {
  const changes: { name?: string; brand?: string | null; size?: Size | null; kind?: string | null } =
    {};
  if (draft.name.trim() !== product.name) changes.name = draft.name.trim();
  const brand = draft.brand.trim() || null;
  if (brand !== product.brand) changes.brand = brand;
  if (!amountProblem(draft.amount)) {
    const size = sizeOf(draft.amount, draft.unit);
    if (!sameSize(size, product.size)) changes.size = size;
  }
  const kind = draft.kind.trim();
  if (fold(kind) !== fold(product.kind?.name ?? "")) changes.kind = kind || null;
  return changes;
}

function EditForm({
  product,
  kinds,
  initialDraft,
  onSaved,
  onOpen,
  onGone,
}: {
  product: Product;
  kinds: KindSummary[];
  initialDraft?: Draft | undefined;
  onSaved: (product: Product) => void;
  onOpen: (product: Product) => void;
  onGone: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(initialDraft ?? draftOf(product));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<UiError | null>(null);
  const [checked, setChecked] = useState(false);
  const changes = changesOf(product, draft);
  const dirty =
    Object.keys(changes).length > 0 || (amountProblem(draft.amount) !== null && draft.amount !== "");
  const nameError = draft.name.trim() === "" ? "Escribí un nombre." : null;
  const amountError = amountProblem(draft.amount);
  const edit = (next: Partial<Draft>) => {
    setDraft((previous) => ({ ...previous, ...next }));
    setSaved(false);
  };

  const save = async () => {
    setChecked(true);
    if (nameError || amountError || saving) return;
    setSaving(true);
    setError(null);
    try {
      const result = await api.update_product({ productId: product.id, ...changes });
      setDraft(draftOf(result.product));
      setSaved(true);
      setChecked(false);
      onSaved(result.product);
    } catch (failure) {
      setError(await toUiError(failure));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      noValidate
      aria-label="Datos del producto"
      onSubmit={(event) => {
        event.preventDefault();
        void save();
      }}
    >
      <FieldGroup className="gap-5">
        <Field data-invalid={checked && !!nameError}>
          <FieldLabel htmlFor="product-name">Nombre</FieldLabel>
          <Input
            id="product-name"
            className="h-10 lg:h-9"
            value={draft.name}
            autoComplete="off"
            autoCapitalize="sentences"
            aria-invalid={(checked && !!nameError) || undefined}
            onChange={(event) => edit({ name: event.target.value })}
          />
          {checked && nameError && <FieldError>{nameError}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="product-brand">Marca</FieldLabel>
          <Input
            id="product-brand"
            className="h-10 lg:h-9"
            value={draft.brand}
            placeholder="Sin marca"
            autoComplete="off"
            autoCapitalize="words"
            onChange={(event) => edit({ brand: event.target.value })}
          />
        </Field>
        <SizeField
          id="product-amount"
          label="Presentación"
          amount={draft.amount}
          unit={draft.unit}
          showError={checked || draft.amount.length > 0}
          onChange={(next) => edit(next)}
        />
        <KindField
          value={draft.kind}
          kinds={kinds}
          currentKind={product.kind?.name ?? null}
          onChange={(kind) => edit({ kind })}
        />
      </FieldGroup>
      {error && (
        <div className="mt-5">
          <FailureAlert
            error={error}
            nameOf={() => product.name}
            onRetry={() => void save()}
            retrying={saving}
            onOpen={onOpen}
            onGone={onGone}
          />
        </div>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Button
          type="submit"
          size="lg"
          className="hit-area h-10 px-4 lg:h-9"
          disabled={!dirty || saving}
          data-do="guardar"
        >
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
              setDraft(draftOf(product));
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
    </form>
  );
}

function SizeField({
  id,
  label,
  amount,
  unit,
  showError,
  onChange,
}: {
  id: string;
  label: string;
  amount: string;
  unit: Unit;
  showError: boolean;
  onChange: (next: { amount?: string; unit?: Unit }) => void;
}) {
  const problem = amountProblem(amount);
  return (
    <Field data-invalid={showError && !!problem}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex gap-2">
        <Input
          id={id}
          data-do={id}
          inputMode="numeric"
          autoComplete="off"
          placeholder="Sin dato"
          className="h-10 w-28 tabular-nums lg:h-9"
          value={amount}
          aria-invalid={(showError && !!problem) || undefined}
          aria-describedby={showError && problem ? `${id}-hint` : undefined}
          onChange={(event) => onChange({ amount: event.target.value })}
        />
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={0}
          value={unit}
          aria-label="Unidad"
          onValueChange={(value) => {
            if (value === "g" || value === "ml" || value === "unit") onChange({ unit: value });
          }}
        >
          <ToggleGroupItem value="g" className="h-10 min-w-12 lg:h-9">
            g
          </ToggleGroupItem>
          <ToggleGroupItem value="ml" className="h-10 min-w-12 lg:h-9">
            ml
          </ToggleGroupItem>
          <ToggleGroupItem value="unit" aria-label="unidades" className="h-10 min-w-12 lg:h-9">
            u.
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {showError && problem && <FieldError id={`${id}-hint`}>{problem}</FieldError>}
    </Field>
  );
}

function KindField({
  value,
  kinds,
  currentKind,
  onChange,
}: {
  value: string;
  kinds: KindSummary[];
  currentKind: string | null;
  onChange: (kind: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const query = fold(value);
  const exact = kinds.find((kind) => fold(kind.name) === query);
  const matches = kinds
    .filter((kind) => fold(kind.name).includes(query))
    .sort((a, b) => Number(fold(b.name).startsWith(query)) - Number(fold(a.name).startsWith(query)))
    .slice(0, 6);
  const offerNew = query !== "" && !exact;
  const listOpen = open && (matches.length > 0 || offerNew) && !(exact && exact.name === value.trim());
  const pick = (name: string) => {
    onChange(name);
    setOpen(false);
  };

  // The only hint the field needs: a name that does not exist yet creates a kind.
  const status: ReactNode =
    query !== "" && !exact && fold(value) !== fold(currentKind ?? "") ? (
      <span className="flex items-start gap-1.5 font-medium text-foreground">
        <PlusIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        <span>«{value.trim().toLowerCase()}» es un tipo nuevo y se crea al guardar.</span>
      </span>
    ) : null;

  return (
    <Field>
      <FieldLabel htmlFor="product-kind">Tipo</FieldLabel>
      <Command
        shouldFilter={false}
        value={highlight}
        onValueChange={setHighlight}
        className="h-auto overflow-visible rounded-none! bg-transparent p-0"
      >
        <InputGroup className="h-10 lg:h-9">
          <InputGroupAddon>
            <TagIcon aria-hidden />
          </InputGroupAddon>
          <InputGroupInput
            ref={input}
            id="product-kind"
            data-do="foco-tipo"
            role="combobox"
            aria-expanded={listOpen}
            aria-controls={listOpen ? "kind-options" : undefined}
            aria-autocomplete="list"
            aria-describedby={status ? "product-kind-hint" : undefined}
            autoComplete="off"
            autoCapitalize="none"
            placeholder="Sin tipo"
            value={value}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onChange={(event) => {
              onChange(event.target.value);
              setOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" && listOpen) {
                event.preventDefault();
                event.stopPropagation();
                setOpen(false);
              }
              if (event.key === "Enter" && !listOpen) event.preventDefault();
            }}
          />
          {value && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                className="hit-area"
                aria-label="Quitar el tipo"
                onClick={() => {
                  onChange("");
                  input.current?.focus();
                }}
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
        {listOpen && (
          <CommandList
            id="kind-options"
            label="Tipos"
            onMouseDown={(event) => event.preventDefault()}
            className="mt-1.5 max-h-60 rounded-lg bg-popover p-1 shadow-md ring-1 ring-foreground/10"
          >
            {matches.length > 0 && (
              <CommandGroup>
                {matches.map((kind) => (
                  <CommandItem
                    key={kind.id}
                    value={kind.id}
                    onSelect={() => pick(kind.name)}
                    className="pointer-coarse:py-2.5"
                  >
                    {kind.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {offerNew && (
              <CommandGroup>
                <CommandItem
                  value="new-kind"
                  onSelect={() => pick(value.trim().toLowerCase())}
                  className="pointer-coarse:py-2.5"
                >
                  <PlusIcon />
                  Crear «{value.trim().toLowerCase()}»
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
      {status && (
        <FieldDescription id="product-kind-hint" className="text-xs">
          {status}
        </FieldDescription>
      )}
    </Field>
  );
}

function MergedList({
  product,
  onSeparated,
  onOpen,
  onGone,
}: {
  product: Product;
  onSeparated: (from: Product, back: Product, lines: number) => void;
  onOpen: (product: Product) => void;
  onGone: () => void;
}) {
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<UiError | null>(null);
  const separate = async (mergeId: string, lines: number) => {
    setPending(mergeId);
    setError(null);
    try {
      const result = await api.undo_product_merge({ mergeId });
      onSeparated(result.from, result.product, lines);
    } catch (failure) {
      setError(await toUiError(failure));
    } finally {
      setPending(null);
    }
  };
  return (
    <section aria-labelledby="merged-heading" className="flex flex-col gap-1">
      <SectionHeading id="merged-heading">Unidos a este producto</SectionHeading>
      <ul className="mt-1">
        {product.merged.map((entry) => {
          const detail = brandAndSize(entry.product);
          return (
            <li key={entry.mergeId} className="flex items-start gap-3 border-b py-3 last:border-0">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="text-sm font-medium [overflow-wrap:anywhere]">{entry.product.name}</p>
                {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
                <p className="text-xs text-muted-foreground">
                  Unido por {entry.mergedBy} {formatWhen(entry.mergedAt)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Al separarlo vuelve con{" "}
                  {entry.lines === 0
                    ? "ninguna compra"
                    : entry.lines === 1
                      ? "su compra"
                      : `sus ${entry.lines} compras`}
                  .
                </p>
              </div>
              <Button
                variant="outline"
                className="hit-area h-9 shrink-0 lg:h-8"
                disabled={pending !== null}
                data-do={`separar-${entry.mergeId}`}
                onClick={() => void separate(entry.mergeId, entry.lines)}
              >
                {pending === entry.mergeId ? <Spinner aria-hidden /> : <SplitIcon aria-hidden />}
                {pending === entry.mergeId ? "Separando…" : "Separar"}
              </Button>
            </li>
          );
        })}
      </ul>
      {error && (
        <FailureAlert
          error={error}
          nameOf={() => product.name}
          onOpen={onOpen}
          onGone={onGone}
        />
      )}
    </section>
  );
}

export function ActionRow({
  icon,
  title,
  description,
  destructive,
  doId,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  destructive?: boolean;
  doId: string;
  onClick: () => void;
}) {
  return (
    <Item asChild variant="outline" className="p-0">
      <Button
        variant="ghost"
        data-do={doId}
        onClick={onClick}
        className={`h-auto w-full justify-start gap-3 rounded-lg px-3 py-3 text-left whitespace-normal ${destructive ? "text-destructive hover:bg-destructive/5 hover:text-destructive" : ""}`}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted [&_svg]:size-4">
          {icon}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-sm font-medium">{title}</span>
          {description && (
            <span className="text-xs font-normal text-muted-foreground">{description}</span>
          )}
        </span>
        <ChevronRightIcon aria-hidden className="text-muted-foreground" />
      </Button>
    </Item>
  );
}

function Actions({
  product,
  onStartMerge,
  onDeleted,
  onOpen,
  onGone,
}: {
  product: Product;
  onStartMerge: () => void;
  onDeleted: () => void;
  onOpen: (product: Product) => void;
  onGone: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<UiError | null>(null);
  const remove = async () => {
    setDeleting(true);
    setError(null);
    try {
      await api.delete_product({ productId: product.id });
      setConfirming(false);
      onDeleted();
    } catch (failure) {
      setError(await toUiError(failure));
    } finally {
      setDeleting(false);
    }
  };
  return (
    <section aria-label="Acciones" className="flex flex-col gap-2">
      <ActionRow
        icon={<CombineIcon aria-hidden />}
        title="Unir con otro producto"
        doId="unir"
        onClick={onStartMerge}
      />
      {product.purchases === 0 ? (
        <ActionRow
          icon={<Trash2Icon aria-hidden />}
          title="Borrar"
          destructive
          doId="borrar"
          onClick={() => {
            setError(null);
            setConfirming(true);
          }}
        />
      ) : (
        <div className="flex items-start gap-3 rounded-lg border border-dashed px-3 py-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
            <Trash2Icon aria-hidden className="size-4" />
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm text-muted-foreground">
              No se puede borrar porque tiene {purchasesText(product.purchases).toLowerCase()}.
            </span>
          </span>
        </div>
      )}
      <AlertDialog open={confirming} onOpenChange={(next) => !deleting && setConfirming(next)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="[overflow-wrap:anywhere]">
              ¿Borrar «{product.name}»?
            </AlertDialogTitle>
            <AlertDialogDescription>
              No se puede deshacer.
              {product.merged.length > 0 && " También se borran los productos unidos a él."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <FailureAlert
              error={error}
              nameOf={() => product.name}
              onRetry={() => void remove()}
              retrying={deleting}
              onOpen={(next) => {
                setConfirming(false);
                onOpen(next);
              }}
              onGone={() => {
                setConfirming(false);
                onGone();
              }}
            />
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className="h-10 lg:h-8" disabled={deleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              className="h-10 lg:h-8"
              disabled={deleting}
              data-do="confirmar-borrar"
              onClick={(event) => {
                event.preventDefault();
                void remove();
              }}
            >
              {deleting && <Spinner aria-hidden />}
              {deleting ? "Borrando…" : "Borrar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

// ——— Merge: search the other product, then choose which one stays ——————————

function MergePick({
  product,
  search,
  wide,
  onSearch,
  onPick,
}: {
  product: Product;
  search: string;
  wide: boolean;
  onSearch: (search: string) => void;
  onPick: (other: Product) => void;
}) {
  const filters = useMemo(
    () => ({ search, withoutKind: false, withoutPurchases: false }),
    [search],
  );
  const list = useProductList(filters);
  const results = list.products.filter((candidate) => candidate.id !== product.id);
  return (
    <div className="flex flex-col gap-3">
      <SearchField
        value={search}
        onChange={onSearch}
        fetching={list.fetching && list.status !== "loading"}
        placeholder="Buscar por nombre o marca"
        autoFocus={wide}
      />
      {list.status === "loading" ? (
        <div aria-busy="true" className="flex flex-col gap-3 py-2">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      ) : list.status === "error" ? (
        <FailureAlert
          error={{ failure: { _tag: "Offline" } }}
          nameOf={() => ""}
          onRetry={() => void list.retry()}
          onOpen={() => {}}
          onGone={() => {}}
        />
      ) : results.length === 0 ? (
        <Empty className="py-8">
          <EmptyHeader>
            <EmptyTitle className="text-base">
              {search.trim() ? `Nada coincide con «${search.trim()}»` : "No hay otros productos"}
            </EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <ul className="-mx-4 lg:-mx-6">
            {results.map((candidate) => (
              <li key={candidate.id}>
                <ItemSeparator className="mx-4 my-0 data-horizontal:w-auto lg:mx-6" />
                <Item asChild className="rounded-none p-0">
                  <Button
                    variant="ghost"
                    data-do={`elegir-${candidate.id}`}
                    onClick={() => onPick(candidate)}
                    className="h-auto min-h-16 w-full justify-start gap-3 rounded-none px-4 py-2.5 text-left whitespace-normal hover:bg-muted/60 focus-visible:ring-inset active:bg-muted lg:px-6"
                  >
                    <ProductRowContent product={candidate} search={search} />
                    <ChevronRightIcon aria-hidden className="text-muted-foreground" />
                  </Button>
                </Item>
              </li>
            ))}
          </ul>
          {list.nextCursor && (
            <Button
              variant="outline"
              className="hit-area w-full"
              disabled={list.fetching}
              onClick={() => void list.loadMore()}
            >
              {list.fetching && <Spinner aria-hidden />}
              Ver más
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function Facts({ product, sizeClash }: { product: Product; sizeClash: boolean }) {
  const size = formatSize(product.size);
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
      <dt className="text-muted-foreground">Marca</dt>
      <dd className="min-w-0 [overflow-wrap:anywhere]">{product.brand ?? "Sin marca"}</dd>
      <dt className="text-muted-foreground">Presentación</dt>
      <dd className={sizeClash ? "flex items-center gap-1 font-medium text-destructive" : ""}>
        {sizeClash && <TriangleAlertIcon aria-hidden className="size-3" />}
        {size ?? "Sin dato"}
      </dd>
      <dt className="text-muted-foreground">Tipo</dt>
      <dd>
        <KindBadge kind={product.kind} />
      </dd>
      <dt className="text-muted-foreground">Compras</dt>
      <dd className="tabular-nums">
        {purchasesText(product.purchases)}
        {product.lastPurchasedOn && ` · última ${formatDay(product.lastPurchasedOn)}`}
      </dd>
      {product.merged.length > 0 && (
        <>
          <dt className="text-muted-foreground">Unidos</dt>
          <dd className="[overflow-wrap:anywhere]">
            {product.merged.map((entry) => entry.product.name).join(", ")}
          </dd>
        </>
      )}
    </dl>
  );
}

function MergeCompare({
  a,
  b,
  keepId,
  onKeep,
  onUpdate,
  onCancel,
  onMerged,
  onOpen,
  onDataChanged,
  onGone,
}: {
  a: Product;
  b: Product;
  keepId?: string | undefined;
  onKeep: (id: string) => void;
  onUpdate: (product: Product) => void;
  onCancel: () => void;
  onMerged: (kept: Product, gone: Product) => void;
  onOpen: (product: Product) => void;
  onDataChanged: () => void;
  onGone: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<UiError | null>(null);
  const [fixing, setFixing] = useState<string | null>(null);
  const [fixed, setFixed] = useState<string | null>(null);
  // One requestId per direction, reused when the same merge is retried.
  const requestIds = useRef(new Map<string, string>());
  const clash = a.size !== null && b.size !== null && !sameSize(a.size, b.size);
  const keep = keepId === a.id ? a : keepId === b.id ? b : null;
  const gone = keep === a ? b : keep === b ? a : null;
  const settled = error?.failure._tag === "ProductAlreadyMerged" || error?.failure._tag === "UnknownProduct";

  const confirm = async () => {
    if (!keep || !gone) return;
    const key = `${gone.id}>${keep.id}`;
    const requestId = requestIds.current.get(key) ?? crypto.randomUUID();
    requestIds.current.set(key, requestId);
    setPending(true);
    setError(null);
    try {
      const result = await api.merge_products({
        requestId,
        productId: gone.id,
        intoProductId: keep.id,
      });
      onMerged(result.product, gone);
    } catch (failure) {
      const next = await toUiError(failure);
      if (next.failure._tag === "SizesDiffer") {
        // Our copy was stale: show the sizes the server compared.
        const { product, into } = next.failure;
        for (const side of [a, b]) {
          const size = side.id === product.id ? product.size : side.id === into.id ? into.size : null;
          if (size) onUpdate({ ...side, size });
        }
      } else setError(next);
      if (next.failure._tag !== "Offline" && next.failure._tag !== "SizesDiffer") onDataChanged();
    } finally {
      setPending(false);
    }
  };

  const nameOf = (id: string) => (id === a.id ? a.name : id === b.id ? b.name : "Este producto");
  const takesKind = keep && gone && !keep.kind && gone.kind;

  return (
    <div className="flex flex-col gap-4">
      {clash && (
        <Alert>
          <TriangleAlertIcon aria-hidden />
          <AlertTitle>No se pueden unir</AlertTitle>
          <AlertDescription className="text-pretty">
            <p className="mb-0!">
              «{a.name}» es de {formatSize(a.size)} y «{b.name}» es de {formatSize(b.size)}. Son
              productos distintos y unirlos mezclaría sus precios {pricePer(a.size)}. Si una
              presentación está mal, corregila.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[a, b].map((product) => (
                <Button
                  key={product.id}
                  variant="outline"
                  className="hit-area text-foreground"
                  data-do={`corregir-${product.id}`}
                  aria-label={`Corregir la presentación de ${product.name}`}
                  onClick={() => {
                    setFixing(product.id);
                    setFixed(null);
                  }}
                >
                  <PencilIcon aria-hidden />
                  Corregir {formatSize(product.size)}
                </Button>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
      {fixing && (
        <SizeFix
          key={fixing}
          product={fixing === a.id ? a : b}
          onCancel={() => setFixing(null)}
          onOpen={onOpen}
          onGone={onGone}
          onSaved={(updated) => {
            onUpdate(updated);
            setFixing(null);
            setFixed(
              updated.size
                ? `«${updated.name}» ahora es de ${formatSize(updated.size)}.`
                : `«${updated.name}» quedó sin presentación.`,
            );
            onDataChanged();
          }}
        />
      )}
      {fixed && (
        <p role="status" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CheckIcon aria-hidden className="size-4" />
          {fixed}
        </p>
      )}

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
        {[a, b].map((product) => {
          const on = keepId === product.id;
          return (
            <ToggleGroupItem
              key={product.id}
              value={product.id}
              data-do={`queda-${product.id}`}
              className="h-auto w-full flex-col items-stretch justify-start gap-2 rounded-xl! border p-3 text-left font-normal whitespace-normal hover:bg-muted/40 data-[state=on]:border-foreground data-[state=on]:bg-muted/40 data-[state=on]:ring-1 data-[state=on]:ring-foreground"
            >
              <span
                className={`flex items-center gap-1.5 text-xs font-medium ${on ? "text-foreground" : "text-muted-foreground"}`}
              >
                {on ? (
                  <CircleCheckIcon aria-hidden className="size-4" />
                ) : (
                  <CircleIcon aria-hidden className="size-4" />
                )}
                {on ? "Queda" : keep ? "Se une" : "Elegir"}
              </span>
              <span className="text-sm leading-snug font-semibold [overflow-wrap:anywhere]">
                {product.name}
              </span>
              <Facts product={product} sizeClash={clash} />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      {keep && gone && !clash && !settled && (
        <p className="text-sm text-muted-foreground">
          {gone.purchases === 0
            ? `«${gone.name}» no tiene compras.`
            : `${gone.purchases === 1 ? "Su compra pasa" : `Sus ${gone.purchases} compras pasan`} a «${keep.name}».`}
          {takesKind && ` «${keep.name}» toma el tipo «${gone.kind!.name}».`} Se puede deshacer con «Separar».
        </p>
      )}

      {error && (
        <FailureAlert
          error={error}
          nameOf={nameOf}
          onRetry={() => void confirm()}
          retrying={pending}
          onOpen={onOpen}
          onGone={onGone}
        />
      )}

      {!settled && (
        <div className="flex flex-col gap-2 lg:flex-row">
          <Button
            size="lg"
            className="hit-area h-11 px-4 lg:h-9"
            disabled={!keep || clash || pending}
            data-do="confirmar-unir"
            onClick={() => void confirm()}
          >
            {pending ? <Spinner aria-hidden /> : <CombineIcon aria-hidden />}
            {pending ? "Uniendo…" : keep || clash ? "Unir" : "Elegí cuál queda"}
          </Button>
          <Button variant="ghost" size="lg" className="hit-area h-11 lg:h-9" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
}

function SizeFix({
  product,
  onCancel,
  onSaved,
  onOpen,
  onGone,
}: {
  product: Product;
  onCancel: () => void;
  onSaved: (product: Product) => void;
  onOpen: (product: Product) => void;
  onGone: () => void;
}) {
  const [amount, setAmount] = useState(product.size ? String(product.size.amount) : "");
  const [unit, setUnit] = useState<Unit>(product.size?.unit ?? "g");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<UiError | null>(null);
  const problem = amountProblem(amount);
  const changed = !sameSize(sizeOf(amount, unit), product.size);
  const save = async () => {
    if (problem) return;
    setSaving(true);
    setError(null);
    try {
      const result = await api.update_product({ productId: product.id, size: sizeOf(amount, unit) });
      onSaved(result.product);
    } catch (failure) {
      setError(await toUiError(failure));
    } finally {
      setSaving(false);
    }
  };
  return (
    <form
      noValidate
      className="flex flex-col gap-3 rounded-lg border p-3"
      onSubmit={(event) => {
        event.preventDefault();
        void save();
      }}
    >
      <SizeField
        id="fix-amount"
        label={`Presentación de «${product.name}»`}
        amount={amount}
        unit={unit}
        showError
        onChange={(next) => {
          if (next.amount !== undefined) setAmount(next.amount);
          if (next.unit) setUnit(next.unit);
        }}
      />
      {error && (
        <FailureAlert
          error={error}
          nameOf={() => product.name}
          onRetry={() => void save()}
          retrying={saving}
          onOpen={onOpen}
          onGone={onGone}
        />
      )}
      <div className="flex gap-2">
        <Button
          type="submit"
          className="hit-area h-10 lg:h-8"
          disabled={!changed || !!problem || saving}
          data-do="guardar-presentacion"
        >
          {saving && <Spinner aria-hidden />}
          Guardar
        </Button>
        <Button type="button" variant="ghost" className="hit-area h-10 lg:h-8" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
