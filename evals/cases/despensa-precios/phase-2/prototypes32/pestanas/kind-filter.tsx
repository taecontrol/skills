import { CheckIcon, ChevronDownIcon, TagIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { fold, type KindSummary } from "./data.ts";

/** Every kind with its count, empty ones included, searchable ignoring accents. */
function KindOptions({
  kinds,
  loaded,
  selectedId,
  autoFocus,
  onSelect,
  onClear,
}: {
  kinds: KindSummary[];
  loaded: boolean;
  selectedId: string | null;
  autoFocus: boolean;
  onSelect: (kind: KindSummary) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const shown = kinds.filter((kind) => fold(kind.name).includes(fold(query)));
  return (
    <Command shouldFilter={false} className="rounded-none! bg-transparent p-0">
      <CommandInput
        placeholder="Buscar tipo"
        aria-label="Buscar tipo"
        value={query}
        onValueChange={setQuery}
        autoFocus={autoFocus}
        data-do="buscar-filtro-tipo"
        className="h-10 lg:h-8"
      />
      <CommandList className="max-h-none lg:max-h-80" aria-label="Tipos">
        {!loaded ? (
          <div aria-busy="true" className="flex flex-col gap-2 p-2">
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton key={index} className="h-7 w-full" />
            ))}
          </div>
        ) : (
          <>
            <CommandEmpty>Nada coincide con «{query.trim()}»</CommandEmpty>
            {selectedId && !query && (
              <CommandGroup>
                <CommandItem value="__clear" onSelect={onClear} data-do="quitar-filtro-tipo" className="py-2.5 lg:py-1.5">
                  <XIcon aria-hidden />
                  Quitar el filtro
                </CommandItem>
              </CommandGroup>
            )}
            {shown.length > 0 && (
              <CommandGroup>
                {shown.map((kind) => (
                  <CommandItem
                    key={kind.id}
                    value={kind.id}
                    data-checked={kind.id === selectedId}
                    data-do={`filtrar-${kind.id}`}
                    onSelect={() => onSelect(kind)}
                    className="gap-3 py-2.5 lg:py-1.5"
                  >
                    <span className="min-w-0 flex-1 truncate">{kind.name}</span>
                    <span className={`shrink-0 tabular-nums ${kind.products === 0 ? "text-muted-foreground" : ""}`}>
                      {kind.products === 0 ? "Sin productos" : kind.products}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </Command>
  );
}

/** The "Tipo" chip beside "Sin tipo" and "Sin compras": a Popover on the
 * computer, a Drawer on the phone. */
export function KindFilter({
  wide,
  kinds,
  loaded,
  selected,
  onSelect,
  onOpen,
}: {
  wide: boolean;
  kinds: KindSummary[];
  loaded: boolean;
  selected: { id: string; name: string } | null;
  onSelect: (kind: KindSummary | null) => void;
  /** Refresh the counts each time the list opens. */
  onOpen: () => void;
}) {
  const [open, setOpen] = useState(false);
  const change = (next: boolean) => {
    setOpen(next);
    if (next) onOpen();
  };
  const trigger = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      aria-label={selected ? `Tipo: ${selected.name}` : "Filtrar por tipo"}
      data-do="filtro-tipo"
      data-state={selected ? "on" : "off"}
      onClick={wide ? undefined : () => change(true)}
      className="h-9 max-w-40 min-w-0 gap-1.5 rounded-full px-3 lg:px-3.5 font-medium data-[state=on]:border-foreground/40 data-[state=on]:bg-muted lg:h-8 lg:max-w-56"
    >
      {selected ? <CheckIcon aria-hidden /> : <TagIcon aria-hidden />}
      <span className="truncate">{selected?.name ?? "Tipo"}</span>
      <ChevronDownIcon aria-hidden className="-mr-1 text-muted-foreground" />
    </Button>
  );
  const list = (
    <KindOptions
      kinds={kinds}
      loaded={loaded}
      selectedId={selected?.id ?? null}
      autoFocus={wide}
      onSelect={(kind) => {
        onSelect(kind);
        setOpen(false);
      }}
      onClear={() => {
        onSelect(null);
        setOpen(false);
      }}
    />
  );
  if (wide)
    return (
      <Popover open={open} onOpenChange={change}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent align="start" className="w-80 p-1">
          {list}
        </PopoverContent>
      </Popover>
    );
  return (
    <>
      {trigger}
      <Drawer open={open} onOpenChange={change}>
        <DrawerContent className="data-[vaul-drawer-direction=bottom]:mx-auto data-[vaul-drawer-direction=bottom]:h-[min(85svh,46rem)] data-[vaul-drawer-direction=bottom]:max-h-none data-[vaul-drawer-direction=bottom]:max-w-md">
          <DrawerHeader className="pt-2 pb-2 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-left">
            <DrawerTitle className="text-lg">Tipo</DrawerTitle>
            <DrawerDescription className="sr-only">Elegí un tipo para ver sus productos.</DrawerDescription>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">{list}</div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
