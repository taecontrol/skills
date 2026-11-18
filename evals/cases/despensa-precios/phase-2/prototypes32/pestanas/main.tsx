import { ChevronDownIcon, FlaskConicalIcon, ListChecksIcon, PackageIcon, ReceiptTextIcon, RefreshCwIcon, RotateCcwIcon } from "lucide-react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CatalogPage } from "./catalog.tsx";
import { currentScenario, scenarios, type Scenario } from "./scenarios.ts";
import "./proto.css";

const destinations = [
  { label: "Compras", icon: ReceiptTextIcon, active: false },
  { label: "Reposición", icon: RefreshCwIcon, active: false },
  { label: "Lista", icon: ListChecksIcon, active: false },
  { label: "Catálogo", icon: PackageIcon, active: true },
];

const go = (id: string) => {
  window.location.search = `?s=${id}`;
};

/** Prototype chrome, not product: picks and resets a scenario. */
function ScenarioMenu({ scenario, pill }: { scenario: Scenario; pill?: boolean }) {
  return (
    <div className={`flex min-w-0 items-center gap-1 ${pill ? "" : "flex-1"}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={pill ? "default" : "outline"}
            size="sm"
            data-do="escenarios"
            aria-label={pill ? `Escenario: ${scenario.label}` : undefined}
            className={pill ? "h-7 max-w-40 gap-1 rounded-full px-2.5 text-xs shadow-md" : "h-8 min-w-0 flex-1 justify-between gap-1"}
          >
            {pill && <FlaskConicalIcon aria-hidden className="size-3.5" />}
            <span className="truncate">{pill ? scenario.id : scenario.label}</span>
            <ChevronDownIcon aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom" className="z-[70] w-64">
          <DropdownMenuLabel>Prototipo pestañas · escenario (?s=)</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={scenario.id} onValueChange={go}>
            {scenarios.map((item) => (
              <DropdownMenuRadioItem key={item.id} value={item.id}>
                <span className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.id}</span>
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => go(scenario.id)} data-do="reiniciar">
            <RotateCcwIcon aria-hidden />
            Reiniciar este escenario
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {!pill && (
        <Button variant="outline" size="icon-sm" aria-label="Reiniciar escenario" title="Reiniciar escenario" onClick={() => go(scenario.id)}>
          <RotateCcwIcon aria-hidden />
        </Button>
      )}
    </div>
  );
}

function App({ scenario }: { scenario: Scenario }) {
  return (
    <div className="flex h-svh flex-col overflow-hidden">
      {/* Phone: the pill sits in its own row above the app, so it never covers it;
          the row is shorter than the drawer's top gap, so it stays reachable. */}
      <div className="relative z-[60] flex h-10 shrink-0 items-center justify-end px-3 lg:hidden" style={{ pointerEvents: "auto" }}>
        <ScenarioMenu scenario={scenario} pill />
      </div>
      <TooltipProvider>
        <SidebarProvider className="min-h-0 flex-1 overflow-hidden">
          <Sidebar collapsible="none" className="hidden shrink-0 border-r lg:flex">
            <SidebarHeader className="px-5 py-6 text-xl font-semibold tracking-tight">Despensa</SidebarHeader>
            <SidebarContent>
              <nav aria-label="Navegación principal" className="px-3">
                <SidebarMenu>
                  {destinations.map(({ label, icon: Icon, active }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton asChild isActive={active} className="h-11">
                        <a href="#" aria-current={active ? "page" : undefined} onClick={(event) => event.preventDefault()}>
                          <Icon aria-hidden />
                          {label}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </nav>
            </SidebarContent>
          </Sidebar>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <CatalogPage scenario={scenario} />
            <nav
              aria-label="Navegación principal"
              className="z-20 flex shrink-0 border-t bg-background px-2 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:hidden"
            >
              {destinations.map(({ label, icon: Icon, active }) => (
                <Button
                  asChild
                  variant="ghost"
                  key={label}
                  className="h-14 flex-1 flex-col gap-1 rounded-lg text-xs text-muted-foreground aria-[current=page]:text-foreground"
                >
                  <a href="#" aria-current={active ? "page" : undefined} onClick={(event) => event.preventDefault()}>
                    <Icon aria-hidden className="size-5" />
                    {label}
                  </a>
                </Button>
              ))}
            </nav>
          </div>
        </SidebarProvider>
      </TooltipProvider>
      {/* Computer: a small panel at the top right; it steps left of an open sheet. */}
      <div
        className="proto-panel fixed top-3 right-4 z-[60] hidden w-64 items-center gap-2 rounded-xl border bg-background p-1.5 pl-2.5 shadow-sm lg:flex"
        style={{ pointerEvents: "auto" }}
      >
        <FlaskConicalIcon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
        <ScenarioMenu scenario={scenario} />
      </div>
    </div>
  );
}

// Screenshots (?shot=1) settle instantly instead of catching a transition midway.
if (new URLSearchParams(window.location.search).has("shot")) {
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important;animation-duration:0s!important;animation-delay:0s!important}";
  document.head.append(style);
}
const scenario = currentScenario();
scenario.setup?.();
createRoot(document.getElementById("root")!).render(<App scenario={scenario} />);

// Screenshot helper: ?do=a,b clicks [data-do=a] then [data-do=b], as a person would.
const steps = new URLSearchParams(window.location.search).get("do")?.split(",").filter(Boolean) ?? [];
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
void (async () => {
  await wait(700);
  for (const entry of steps) {
    // "name=value" types into [data-do=name]; anything else clicks it.
    const [step, typed] = entry.split("=") as [string, string | undefined];
    // "atras" presses the browser's Back button.
    // "espera" lets a closing drawer or sheet finish before the shot.
    if (step === "espera") {
      await wait(2000);
      continue;
    }
    if (step === "atras") {
      window.history.back();
      await wait(900);
      continue;
    }
    let target: HTMLElement | null = null;
    for (let tries = 0; tries < 100 && !target; tries++) {
      const found = Array.from(document.querySelectorAll<HTMLElement>(`[data-do="${step}"]`)).find(
        (element) => element.offsetParent !== null && !(element as HTMLButtonElement).disabled,
      );
      if (found) target = found;
      else await wait(50);
    }
    if (target instanceof HTMLInputElement && typed !== undefined) {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(target, typed);
      target.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (target instanceof HTMLInputElement) target.focus();
    else if (target?.getAttribute("role") === "tab")
      target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, button: 0 }));
    else if (target?.getAttribute("aria-haspopup") === "menu")
      target.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0 }));
    else target?.click();
    await wait(900);
  }
  document.documentElement.dataset.ready = "true";
  document.documentElement.dataset.url = `${window.history.length} ${window.location.search}`;
})();
