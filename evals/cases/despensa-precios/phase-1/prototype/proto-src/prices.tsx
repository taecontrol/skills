import { cn } from "cn";
import {
  CalendarIcon,
  ChevronDownIcon,
  SearchIcon,
  SearchXIcon,
  StoreIcon,
  WifiOffIcon,
} from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { MeasureGroup, Price, WithoutSize } from "../src/operations/prices/wire.ts";
import { formatArs, formatDate, formatMeasure, formatUsd } from "./format.ts";
import { t } from "./messages.ts";
import {
  chainOptions,
  type Comparison,
  kinds,
  products,
  type Scenario,
  scenarioForChain,
  scenarioForSubject,
  type Subject,
} from "./scenarios.ts";

type Go = (scenario: string) => void;
type Unit = MeasureGroup["measure"];
type Currency = "usd" | "ars";
const suffix = (unit: Unit) => t(`prices.suffix.${unit}`);
const unitWord = (unit: Unit) => t(`prices.unitWord.${unit}`);

/**
 * Ranking first: the chains in the order compare_prices returns them answer
 * "¿dónde conviene?", the best deals answer "¿fue una oferta?", and every
 * purchase waits behind a disclosure. The answer stays on screen; "Cambiar"
 * opens the picker over it. One currency leads, chosen with a toggle.
 */
export function PricesScreen({
  scenario,
  go,
  generation,
}: {
  scenario: Scenario;
  go: Go;
  generation: number;
}) {
  return (
    <main
      aria-label={t("prices.title")}
      className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain"
    >
      {scenario.state === "pick" ? (
        <Choose key={generation} onPick={go} />
      ) : (
        <Answer key={`${scenario.id}-${generation}`} scenario={scenario} go={go} />
      )}
    </main>
  );
}

/** The first screen: nothing chosen yet, so the picker is the page. */
function Choose({ onPick }: { onPick: Go }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col pb-8 lg:max-w-xl">
      <h1 className="px-4 pt-[max(1.25rem,env(safe-area-inset-top))] font-heading text-2xl font-semibold tracking-tight">
        {t("prices.title")}
      </h1>
      <p className="px-4 pt-1 pb-4 text-sm text-muted-foreground">{t("prices.intro")}</p>
      <Picker current={undefined} onPick={onPick} />
    </div>
  );
}

function Picker({
  current,
  onPick,
  compact = false,
}: {
  current: string | undefined;
  onPick: Go;
  compact?: boolean;
}) {
  const [highlighted, setHighlighted] = useState(current ?? "ninguno");
  const itemClass = cn("gap-3 rounded-lg px-3 py-2", compact ? "min-h-11" : "min-h-12 lg:min-h-10");
  return (
    <Command
      loop
      value={highlighted}
      onValueChange={setHighlighted}
      className={cn(
        "rounded-none! bg-transparent",
        compact ? "px-1 **:data-[slot=input-group]:h-10!" : "px-3 **:data-[slot=input-group]:h-11! lg:**:data-[slot=input-group]:h-9!",
      )}
    >
      <CommandInput
        placeholder={t("prices.search")}
        className={compact ? "text-base lg:text-sm" : "text-base lg:text-sm"}
      />
      <CommandList className={cn("mt-1", compact ? "max-h-[min(60svh,420px)]" : "max-h-none")}>
        <CommandEmpty>{t("prices.noMatch")}</CommandEmpty>
        <CommandGroup heading={t("prices.kinds")}>
          {kinds.map((kind) => {
            const target = scenarioForSubject(kind.id);
            return (
              <CommandItem
                key={kind.id}
                value={kind.id}
                keywords={[kind.name]}
                disabled={!target}
                data-checked={current === kind.id}
                onSelect={() => target && onPick(target)}
                className={itemClass}
              >
                <span className="min-w-0 flex-1 truncate text-sm font-medium first-letter:uppercase">
                  {kind.name}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {t("prices.productCount", kind.products)}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading={t("prices.products")}>
          {products.map((product) => {
            const target = scenarioForSubject(product.id);
            return (
              <CommandItem
                key={product.id}
                value={product.id}
                keywords={[product.name, product.kind?.name ?? ""]}
                disabled={!target}
                data-checked={current === product.id}
                onSelect={() => target && onPick(target)}
                className={itemClass}
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm leading-snug">{product.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {product.kind?.name ?? t("prices.noKind")} ·{" "}
                    {t("prices.purchaseCount", product.purchases)}
                  </span>
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Answer({ scenario, go }: { scenario: Scenario; go: Go }) {
  const subject = scenario.subject!;
  const [currency, setCurrency] = useState<Currency>("usd");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const busy = scenario.state !== "ready";
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col pb-10 lg:max-w-4xl lg:px-4">
      <AnswerHeader
        subject={subject}
        scenario={scenario}
        go={go}
        busy={busy}
        periodOpen={periodOpen}
        setPeriodOpen={setPeriodOpen}
        currency={currency}
        setCurrency={setCurrency}
      />
      {scenario.state === "loading" ? (
        <AnswerSkeleton />
      ) : scenario.state === "error" ? (
        <Alert className="mx-4 mt-6 w-auto lg:max-w-xl">
          <WifiOffIcon aria-hidden />
          <AlertDescription>
            <p>{t("error.offline")}</p>
            <Button
              variant="outline"
              className="hit-area mt-3"
              disabled={retrying}
              onClick={() => {
                setRetrying(true);
                window.setTimeout(() => setRetrying(false), 900);
              }}
            >
              {retrying && <Spinner aria-label={t("error.retrying")} />}
              {t("error.retry")}
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Result
          result={scenario.result!}
          subject={subject}
          scenario={scenario}
          currency={currency}
          onChangePeriod={() => setPeriodOpen(true)}
        />
      )}
    </div>
  );
}

function AnswerHeader({
  subject,
  scenario,
  go,
  busy,
  periodOpen,
  setPeriodOpen,
  currency,
  setCurrency,
}: {
  subject: Subject;
  scenario: Scenario;
  go: Go;
  busy: boolean;
  periodOpen: boolean;
  setPeriodOpen: (open: boolean) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const eyebrow =
    subject.type === "kind"
      ? t("prices.kindEyebrow", subject.products)
      : subject.kind
        ? t("prices.productEyebrow", subject.kind)
        : t("prices.productNoKind");
  const chains = chainOptions(scenario);
  const control = "h-10 min-w-0 flex-1 lg:h-9 lg:flex-none";
  return (
    <header className="px-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight first-letter:uppercase lg:text-3xl">
            {subject.name}
          </h1>
        </div>
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              aria-label={t("prices.changeAria")}
              className="hit-area mt-0.5 h-10 shrink-0 lg:h-9"
            >
              <SearchIcon aria-hidden data-icon="inline-start" />
              {t("prices.change")}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[min(26rem,calc(100vw-2rem))] p-0">
            <Picker
              compact
              current={subject.id}
              onPick={(target) => {
                setPickerOpen(false);
                go(target);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-4 flex items-center gap-2 lg:flex-wrap">
        <PeriodControl
          period={scenario.period}
          open={periodOpen}
          onOpenChange={setPeriodOpen}
          disabled={busy}
          className={cn(control, "flex-[3] lg:w-52")}
        />
        <Select
          value={scenario.chain ?? "todas"}
          disabled={busy}
          onValueChange={(value) => {
            const target = scenarioForChain(scenario, value === "todas" ? undefined : value);
            if (target) go(target);
          }}
        >
          <SelectTrigger
            aria-label={t("prices.chain")}
            className={cn(
              control,
              "flex-[2] justify-start px-3 data-[size=default]:h-10 lg:w-52 lg:data-[size=default]:h-9 [&>svg:last-child]:ml-auto",
            )}
          >
            <StoreIcon aria-hidden className="hidden text-muted-foreground lg:block" />
            <SelectValue>
              {scenario.chain ?? (
                <>
                  <span className="lg:hidden">{t("prices.allChainsShort")}</span>
                  <span className="hidden lg:inline">{t("prices.allChains")}</span>
                </>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            <SelectItem value="todas" className="min-h-10 lg:min-h-0">
              {t("prices.allChains")}
            </SelectItem>
            {chains.map((chain) => (
              <SelectItem
                key={chain}
                value={chain}
                className="min-h-10 lg:min-h-0"
                disabled={!scenarioForChain(scenario, chain) && scenario.chain !== chain}
              >
                {chain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={0}
          value={currency}
          disabled={busy || !scenario.result?.measures.length}
          aria-label={t("prices.currency")}
          className="shrink-0 lg:ml-auto"
          onValueChange={(value) => {
            if (value === "usd" || value === "ars") setCurrency(value);
          }}
        >
          {(["ars", "usd"] as const).map((value) => (
            <ToggleGroupItem
              key={value}
              value={value}
              className="h-10 px-2.5 lg:h-9 lg:px-4 data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary data-[state=on]:hover:text-primary-foreground"
            >
              {value.toUpperCase()}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </header>
  );
}

const toDate = (iso: string) => {
  const [year = 0, month = 1, day = 1] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/** The period is a real control; it applies only ranges the prototype has data for. */
function PeriodControl({
  period,
  open,
  onOpenChange,
  disabled,
  className,
}: {
  period: Scenario["period"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
  className?: string;
}) {
  const initial: DateRange | undefined = period
    ? { from: toDate(period.from), to: toDate(period.to) }
    : undefined;
  const [range, setRange] = useState<DateRange | undefined>(initial);
  const sameYear = period !== undefined && period.from.slice(0, 4) === period.to.slice(0, 4);
  const label = period
    ? t(
        "prices.periodRange",
        sameYear ? formatDate(period.from).slice(0, -5) : formatDate(period.from),
        formatDate(period.to),
      )
    : t("prices.allHistory");
  const shortLabel = period
    ? t(
        "prices.periodRange",
        sameYear ? formatDate(period.from).slice(0, -5) : formatDate(period.from),
        sameYear ? formatDate(period.to).slice(0, -5) : formatDate(period.to),
      )
    : t("prices.allHistoryShort");
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) setRange(initial);
        onOpenChange(next);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          aria-label={`${t("prices.period")}: ${label}`}
          className={cn("justify-start px-3 font-normal", className)}
        >
          <CalendarIcon aria-hidden className="hidden text-muted-foreground lg:block" />
          <span className="truncate lg:hidden">{shortLabel}</span>
          <span className="hidden truncate lg:inline">{label}</span>
          <ChevronDownIcon aria-hidden className="ml-auto text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="range"
          locale={es}
          selected={range}
          onSelect={setRange}
          defaultMonth={range?.from ?? new Date(2026, 10, 1)}
          className="p-3 [--cell-size:--spacing(10)] lg:[--cell-size:--spacing(8)]"
        />
        <div className="flex justify-between gap-2 border-t p-3">
          <Button variant="ghost" className="h-10 lg:h-8" onClick={() => setRange(undefined)}>
            {t("prices.allHistory")}
          </Button>
          <Button
            className="h-10 lg:h-8"
            disabled={!sameRange(range, initial)}
            onClick={() => onOpenChange(false)}
          >
            {t("prices.apply")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
const sameRange = (a: DateRange | undefined, b: DateRange | undefined) =>
  a?.from?.getTime() === b?.from?.getTime() && a?.to?.getTime() === b?.to?.getTime();

function Result({
  result,
  subject,
  scenario,
  currency,
  onChangePeriod,
}: {
  result: Comparison;
  subject: Subject;
  scenario: Scenario;
  currency: Currency;
  onChangePeriod: () => void;
}) {
  const [tab, setTab] = useState<string>(result.measures[0]?.measure ?? "");
  if (result.measures.length === 0 && result.withoutSize.length === 0)
    return (
      <Empty className="flex-none py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchXIcon aria-hidden />
          </EmptyMedia>
          <EmptyTitle className="text-base">{t("prices.noPurchasesTitle")}</EmptyTitle>
          {scenario.period && (
            <EmptyDescription>
              {t(
                "prices.noPurchasesDescription",
                subject.name,
                formatDate(scenario.period.from),
                formatDate(scenario.period.to),
              )}
            </EmptyDescription>
          )}
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" className="hit-area" onClick={onChangePeriod}>
            {t("prices.changePeriod")}
          </Button>
        </EmptyContent>
      </Empty>
    );
  return (
    <div className="mt-6 flex flex-col gap-8">
      {result.measures.length === 0 ? null : result.measures.length === 1 ? (
        <GroupView group={result.measures[0]!} currency={currency} />
      ) : (
        <Tabs value={tab} onValueChange={setTab} className="gap-6">
          <div className="px-4">
            <TabsList className="h-10! w-full lg:h-9! lg:w-fit">
              {result.measures.map((group) => (
                <TabsTrigger key={group.measure} value={group.measure} className="px-4">
                  {t(`prices.per.${group.measure}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {result.measures.map((group) => (
            <TabsContent key={group.measure} value={group.measure}>
              <GroupView group={group} currency={currency} />
            </TabsContent>
          ))}
        </Tabs>
      )}
      {result.withoutSize.length > 0 && (
        <WithoutSizeList
          lines={result.withoutSize}
          caption={
            result.measures.length === 0
              ? t("prices.withoutSizeOnly", subject.name)
              : t("prices.withoutSizeCaption")
          }
        />
      )}
    </div>
  );
}

function SectionHeading({ id, title, caption }: { id?: string; title: string; caption: string }) {
  return (
    <div className="px-4">
      <h2 id={id} className="text-base font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-0.5 text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}

const formatPrice = (price: Price, currency: Currency): string =>
  currency === "usd" && price.usd !== null ? formatUsd(price.usd) : formatArs(price.ars);

/**
 * One figure in the chosen currency. A price without a rate exists only in
 * pesos, so it shows its peso figure in both modes and says why.
 */
function Figure({
  price,
  unit,
  currency,
  strong,
  note = true,
}: {
  price: Price;
  unit: Unit;
  currency: Currency;
  strong?: boolean;
  note?: boolean;
}) {
  return (
    <span className="flex shrink-0 flex-col items-end tabular-nums">
      <span className={cn(strong ? "text-base font-semibold" : "text-sm font-medium")}>
        {formatPrice(price, currency)}
        <span className="text-xs font-normal text-muted-foreground">{suffix(unit)}</span>
      </span>
      {note && price.usd === null && (
        <span className="text-xs text-muted-foreground">{t("prices.noRate")}</span>
      )}
    </span>
  );
}

const bothCurrencies = (price: Price, unit: Unit, currency: Currency): string => {
  const ars = `${formatArs(price.ars)}${suffix(unit)}`;
  if (price.usd === null) return ars;
  const usd = `${formatUsd(price.usd)}${suffix(unit)}`;
  return currency === "usd" ? `${usd} · ${ars}` : `${ars} · ${usd}`;
};

function GroupView({ group, currency }: { group: MeasureGroup; currency: Currency }) {
  const unit = group.measure;
  const unrated = group.purchases.filter((purchase) => purchase.rate === null);
  const ranked = group.chains.length > 1 && group.chains[0]!.median.usd !== null;
  const cheapest = <Badge>{t(`prices.cheapest.${currency}`)}</Badge>;
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3" aria-labelledby={`where-${unit}`}>
        <SectionHeading
          id={`where-${unit}`}
          title={t("prices.whereTitle")}
          caption={t(`prices.whereCaption.${currency}`, unitWord(unit))}
        />
        {/* Phone: a ranked list, one block per chain. */}
        <ol className="flex flex-col px-4 lg:hidden">
          {group.chains.map((chain, index) => (
            <li key={chain.chain} className="flex gap-3 py-3">
              <span className="w-4 shrink-0 pt-0.5 text-right text-sm text-muted-foreground tabular-nums">
                {index + 1}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "truncate text-sm",
                          index === 0 && ranked ? "font-semibold" : "font-medium",
                        )}
                      >
                        {chain.chain}
                      </span>
                      {index === 0 && ranked && cheapest}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t("prices.purchaseCount", chain.purchases)}
                    </span>
                  </div>
                  <Figure price={chain.median} unit={unit} currency={currency} strong />
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs">
                  <dt className="text-muted-foreground">{t("prices.lowest")}</dt>
                  <dd className="text-right tabular-nums">
                    {formatPrice(chain.lowest, currency)}
                    {chain.lowest.usd === null && (
                      <span className="text-muted-foreground"> · {t("prices.noRate")}</span>
                    )}
                  </dd>
                  <dt className="text-muted-foreground">
                    {t("prices.latest", formatDate(chain.latest.date))}
                  </dt>
                  <dd className="text-right tabular-nums">
                    {formatPrice(chain.latest.price, currency)}
                    {chain.latest.price.usd === null && (
                      <span className="text-muted-foreground"> · {t("prices.noRate")}</span>
                    )}
                  </dd>
                </dl>
              </div>
            </li>
          ))}
        </ol>
        {/* Desktop: the same ranking as a table. */}
        <div className="hidden px-4 lg:block">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead scope="col" className="w-8">
                  <span className="sr-only">{t("prices.rank")}</span>
                </TableHead>
                <TableHead scope="col">{t("prices.chainColumn")}</TableHead>
                <TableHead scope="col" className="w-36 text-right">
                  {t("prices.medianColumn")}
                </TableHead>
                <TableHead scope="col" className="w-36 text-right">
                  {t("prices.lowestColumn")}
                </TableHead>
                <TableHead scope="col" className="w-44 text-right">
                  {t("prices.latestColumn")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.chains.map((chain, index) => (
                <TableRow key={chain.chain} className="hover:bg-transparent">
                  <TableCell className="py-3 align-top text-sm text-muted-foreground tabular-nums">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-3 align-top whitespace-normal">
                    <span className="flex items-center gap-2">
                      <span className={index === 0 && ranked ? "font-semibold" : "font-medium"}>
                        {chain.chain}
                      </span>
                      {index === 0 && ranked && cheapest}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t("prices.purchaseCount", chain.purchases)}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 align-top">
                    <Figure price={chain.median} unit={unit} currency={currency} strong />
                  </TableCell>
                  <TableCell className="py-3 align-top">
                    <Figure price={chain.lowest} unit={unit} currency={currency} />
                  </TableCell>
                  <TableCell className="py-3 align-top">
                    <span className="flex flex-col items-end">
                      <Figure price={chain.latest.price} unit={unit} currency={currency} />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(chain.latest.date)}
                      </span>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mx-4 flex flex-col gap-1.5 rounded-lg bg-muted/50 px-3 py-2.5 text-xs">
          <div className="flex flex-col gap-0.5 text-sm lg:flex-row lg:items-baseline lg:justify-between lg:gap-3">
            <span className="text-muted-foreground">
              {t("prices.overall", group.purchases.length)}
            </span>
            <span className="font-medium tabular-nums lg:text-right">
              {bothCurrencies(group.median, unit, currency)}
            </span>
          </div>
          {group.withoutRate > 0 && (
            <p className="text-muted-foreground">
              {t(
                "prices.withoutRate",
                unrated.map((purchase) => formatDate(purchase.date)),
              )}
            </p>
          )}
          <p className="text-muted-foreground">{t("prices.usdNote")}</p>
        </div>
      </section>

      {group.bestDeals.length > 0 && (
        <section className="flex flex-col gap-3" aria-labelledby={`deals-${unit}`}>
          <SectionHeading
            id={`deals-${unit}`}
            title={t("prices.dealsTitle")}
            caption={t(
              `prices.dealsCaption.${currency}`,
              unitWord(unit),
              `${formatPrice(group.median, currency)}${suffix(unit)}`,
            )}
          />
          <ol className="flex flex-col px-4 lg:hidden">
            {group.bestDeals.map((deal) => (
              <li key={`${deal.purchaseId}-${deal.line}`} className="flex items-start gap-3 py-3">
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium">
                    {deal.chain} · {formatDate(deal.date)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {deal.product.name} · {formatMeasure(deal.measure.amount, deal.measure.unit)}
                  </span>
                  <VsMedian percent={deal.belowMedianPercent} />
                </div>
                <Figure price={deal.price} unit={unit} currency={currency} strong />
              </li>
            ))}
          </ol>
          <div className="hidden px-4 lg:block">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead scope="col" className="w-28">
                    {t("prices.dateColumn")}
                  </TableHead>
                  <TableHead scope="col" className="w-28">
                    {t("prices.chainColumn")}
                  </TableHead>
                  <TableHead scope="col">{t("prices.productColumn")}</TableHead>
                  <TableHead scope="col" className="w-32 text-right">
                    {t("prices.priceColumn", unitWord(unit))}
                  </TableHead>
                  <TableHead scope="col" className="w-44 text-right">
                    {t("prices.vsMedianColumn")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.bestDeals.map((deal) => (
                  <TableRow key={`${deal.purchaseId}-${deal.line}`} className="hover:bg-transparent">
                    <TableCell className="py-3 align-top tabular-nums">
                      {formatDate(deal.date)}
                    </TableCell>
                    <TableCell className="py-3 align-top font-medium">{deal.chain}</TableCell>
                    <TableCell className="py-3 align-top whitespace-normal">
                      {deal.product.name}
                      <span className="block text-xs text-muted-foreground">
                        {formatMeasure(deal.measure.amount, deal.measure.unit)}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 align-top">
                      <Figure price={deal.price} unit={unit} currency={currency} strong />
                    </TableCell>
                    <TableCell className="py-3 text-right align-top">
                      <VsMedian percent={deal.belowMedianPercent} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}

      <History group={group} currency={currency} />
    </div>
  );
}

function VsMedian({ percent }: { percent: number | null }) {
  if (percent === null) return null;
  if (percent === 0)
    return (
      <Badge variant="outline" className="mt-1 lg:mt-0">
        {t("prices.atMedian")}
      </Badge>
    );
  return percent > 0 ? (
    <Badge variant="secondary" className="mt-1 lg:mt-0">
      {t("prices.below", percent)}
    </Badge>
  ) : (
    <Badge variant="outline" className="mt-1 text-muted-foreground lg:mt-0">
      {t("prices.above", -percent)}
    </Badge>
  );
}

function History({ group, currency }: { group: MeasureGroup; currency: Currency }) {
  const [open, setOpen] = useState(false);
  const unit = group.measure;
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col gap-2">
      <div className="px-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="hit-area h-10 px-2 font-medium lg:h-9">
            {open ? t("prices.historyHide") : t("prices.historyShow", group.purchases.length)}
            <ChevronDownIcon
              aria-hidden
              className={cn("text-muted-foreground transition-transform", open && "rotate-180")}
            />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <h2 className="sr-only">{t("prices.historyTitle")}</h2>
        <ul className="flex flex-col px-4 lg:hidden">
          {group.purchases.map((purchase) => (
            <li
              key={`${purchase.purchaseId}-${purchase.line}`}
              className="flex items-start gap-3 py-3"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-sm font-medium">
                  {formatDate(purchase.date)} · {purchase.chain}
                </span>
                <span className="text-xs text-muted-foreground">{purchase.product.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {formatMeasure(purchase.measure.amount, purchase.measure.unit)} ·{" "}
                  {t("prices.paid", formatArs(purchase.paid))} ·{" "}
                  {purchase.rate === null
                    ? t("prices.noRate")
                    : t("prices.rate", formatArs(purchase.rate))}
                </span>
              </div>
              <Figure price={purchase.price} unit={unit} currency={currency} note={false} />
            </li>
          ))}
        </ul>
        <div className="hidden px-4 lg:block">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead scope="col" className="w-28">
                  {t("prices.dateColumn")}
                </TableHead>
                <TableHead scope="col" className="w-36">
                  {t("prices.chainColumn")}
                </TableHead>
                <TableHead scope="col">{t("prices.productColumn")}</TableHead>
                <TableHead scope="col" className="w-28 text-right">
                  {t("prices.paidColumn")}
                </TableHead>
                <TableHead scope="col" className="w-32 text-right">
                  {t("prices.priceColumn", unitWord(unit))}
                </TableHead>
                <TableHead scope="col" className="w-28 text-right">
                  {t("prices.rateColumn")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.purchases.map((purchase) => (
                <TableRow
                  key={`${purchase.purchaseId}-${purchase.line}`}
                  className="hover:bg-transparent"
                >
                  <TableCell className="py-2.5 align-top tabular-nums">
                    {formatDate(purchase.date)}
                  </TableCell>
                  <TableCell className="py-2.5 align-top whitespace-normal">
                    <span className="font-medium">{purchase.chain}</span>
                    <span className="block text-xs text-muted-foreground">{purchase.branch}</span>
                  </TableCell>
                  <TableCell className="py-2.5 align-top whitespace-normal">
                    {purchase.product.name}
                    <span className="block text-xs text-muted-foreground">
                      {formatMeasure(purchase.measure.amount, purchase.measure.unit)}
                    </span>
                  </TableCell>
                  <TableCell className="py-2.5 text-right align-top tabular-nums">
                    {formatArs(purchase.paid)}
                  </TableCell>
                  <TableCell className="py-2.5 align-top">
                    <Figure price={purchase.price} unit={unit} currency={currency} note={false} />
                  </TableCell>
                  <TableCell className="py-2.5 text-right align-top text-muted-foreground tabular-nums">
                    {purchase.rate === null ? t("prices.noRate") : formatArs(purchase.rate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function WithoutSizeList({
  lines,
  caption,
}: {
  lines: readonly WithoutSize[];
  caption: string;
}) {
  return (
    <section className="flex flex-col gap-3" aria-labelledby="without-size">
      <SectionHeading id="without-size" title={t("prices.withoutSizeTitle")} caption={caption} />
      <ul className="flex flex-col px-4">
        {lines.map((line) => (
          <li key={`${line.purchaseId}-${line.line}`} className="flex items-start gap-3 py-3">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-sm font-medium">
                {formatDate(line.date)} · {line.chain}
              </span>
              <span className="text-xs text-muted-foreground">{line.product.name}</span>
            </div>
            <span className="shrink-0 text-sm font-medium tabular-nums">
              {formatArs(line.paid)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AnswerSkeleton() {
  return (
    <div aria-busy="true" className="mt-6 flex flex-col gap-3 px-4">
      <span className="sr-only" role="status">
        {t("prices.loading")}
      </span>
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-64 max-w-full" />
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="flex items-center gap-3 py-3">
          <Skeleton className="h-4 w-4" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
      <Skeleton className="mt-4 h-5 w-36" />
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="flex items-center gap-3 py-3">
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-52 max-w-full" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}
