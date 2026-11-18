import { CombineIcon, SearchIcon, WifiOffIcon, XIcon, TriangleAlertIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import type { UiError } from "./client.ts";
import { fold, type Kind, type Product } from "./data.ts";
import { brandAndSize, formatDay, formatWhen, purchasesText } from "./format.ts";

export function KindBadge({ kind }: { kind: Kind | null }) {
  return kind ? (
    <Badge variant="secondary" className="h-5 max-w-36 truncate px-1.5 font-normal">
      {kind.name}
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="h-5 border-dashed px-1.5 font-normal text-muted-foreground"
    >
      Sin tipo
    </Badge>
  );
}

export const mergedText = (n: number) => (n === 1 ? "1 unido" : `${n} unidos`);

/** A product merged into this one that also matches the search. */
export function matchedThrough(product: Product, search: string): string | null {
  const query = fold(search);
  if (!query) return null;
  const hit = product.merged.find(
    (entry) =>
      fold(entry.product.name).includes(query) || fold(entry.product.brand ?? "").includes(query),
  );
  return hit ? hit.product.name : null;
}

/** The two-line body of a product row, shared by the catalog and the merge search. */
export function ProductRowContent({ product, search }: { product: Product; search: string }) {
  const detail = brandAndSize(product);
  const through = matchedThrough(product, search);
  return (
    <span className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="flex items-start justify-between gap-3 text-sm">
        <span className="line-clamp-2 min-w-0 leading-snug font-medium [overflow-wrap:anywhere]">
          {product.name}
        </span>
        <span
          className={`shrink-0 tabular-nums ${product.purchases === 0 ? "font-normal text-muted-foreground" : "font-medium"}`}
        >
          {purchasesText(product.purchases)}
        </span>
      </span>
      <span className="flex items-center justify-between gap-3 text-xs font-normal text-muted-foreground">
        <span className="flex min-w-0 items-center gap-1.5">
          <KindBadge kind={product.kind} />
          {detail && <span className="truncate">{detail}</span>}
          {product.merged.length > 0 && (
            <span className="inline-flex shrink-0 items-center gap-0.5">
              <CombineIcon aria-hidden className="size-3" />
              {mergedText(product.merged.length)}
            </span>
          )}
        </span>
        {product.lastPurchasedOn && (
          <span className="shrink-0 tabular-nums">{formatDay(product.lastPurchasedOn)}</span>
        )}
      </span>
      {through && (
        <span className="text-xs font-normal text-muted-foreground [overflow-wrap:anywhere]">
          Incluye «{through}»
        </span>
      )}
    </span>
  );
}

export function SearchField({
  value,
  onChange,
  fetching,
  placeholder,
  autoFocus,
  className,
  doId,
}: {
  value: string;
  onChange: (value: string) => void;
  fetching: boolean;
  placeholder: string;
  autoFocus?: boolean;
  className?: string;
  doId?: string;
}) {
  return (
    <InputGroup className={`h-10 lg:h-9 ${className ?? ""}`}>
      <InputGroupAddon>
        <SearchIcon aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        autoComplete="off"
        enterKeyHint="search"
        data-do={doId}
        onChange={(event) => onChange(event.target.value)}
      />
      {(fetching || value) && (
        <InputGroupAddon align="inline-end">
          {fetching && <Spinner aria-label="Buscando…" />}
          {value && (
            <InputGroupButton
              size="icon-xs"
              aria-label="Borrar la búsqueda"
              className="hit-area"
              onClick={() => onChange("")}
            >
              <XIcon />
            </InputGroupButton>
          )}
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

export function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </h3>
  );
}

export const OFFLINE = "Sin conexión con Despensa. Revisá tu conexión a internet.";

/** One place that turns a write failure into words and a way forward. */
export function FailureAlert({
  error,
  nameOf,
  kept,
  onRetry,
  retrying,
  onOpen,
  onGone,
}: {
  error: UiError;
  nameOf: (id: string) => string;
  kept?: string;
  onRetry?: () => void;
  retrying?: boolean;
  onOpen: (product: Product) => void;
  onGone: () => void;
}) {
  const { failure } = error;
  if (failure._tag === "Offline")
    return (
      <Alert>
        <WifiOffIcon aria-hidden />
        <AlertDescription className="text-pretty">
          <p className="mb-0! text-foreground">{OFFLINE}</p>
          {onRetry && (
            <Button
              variant="outline"
              className="hit-area mt-3 text-foreground"
              disabled={retrying}
              data-do="reintentar"
              onClick={onRetry}
            >
              {retrying && <Spinner aria-hidden />}
              {retrying ? "Reintentando…" : "Reintentar"}
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  if (failure._tag === "ProductAlreadyMerged") {
    const into = error.into;
    return (
      <Alert>
        <CombineIcon aria-hidden />
        <AlertTitle className="leading-snug">
          {nameOf(failure.productId)} ya está unido a {into?.name ?? "otro producto"}, por{" "}
          {failure.mergedBy} {formatWhen(failure.mergedAt)}.
        </AlertTitle>
        <AlertDescription className="text-pretty">
          {into && (
            <Button
              variant="outline"
              className="hit-area mt-3 h-auto min-h-8 text-left whitespace-normal text-foreground"
              data-do="abrir-destino"
              onClick={() => onOpen(into)}
            >
              Abrir «{into.name}»
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }
  if (failure._tag === "UnknownProduct")
    return (
      <Alert>
        <TriangleAlertIcon aria-hidden />
        <AlertDescription className="text-pretty">
          <p className="mb-0! text-foreground">Este producto ya no existe. Puede haberse eliminado.</p>
          <Button variant="outline" className="hit-area mt-3 text-foreground" onClick={onGone}>
            Volver al catálogo
          </Button>
        </AlertDescription>
      </Alert>
    );
  if (failure._tag === "ProductHasPurchases")
    return (
      <Alert>
        <TriangleAlertIcon aria-hidden />
        <AlertDescription className="text-pretty text-foreground">
          No se puede borrar porque tiene {purchasesText(failure.purchases).toLowerCase()}.
        </AlertDescription>
      </Alert>
    );
  return (
    <Alert>
      <TriangleAlertIcon aria-hidden />
      <AlertDescription className="text-pretty text-foreground">
        No se pueden unir porque las presentaciones son distintas.
      </AlertDescription>
    </Alert>
  );
}
