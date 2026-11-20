import { ReceiptTextIcon, RefreshCwIcon, TagIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
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

// The app shell from src/web/shell/app-shell.tsx with Precios added at the end.
// Router links become buttons here: the prototype only renders Precios.
const destinations = [
  { label: "Compras", icon: ReceiptTextIcon, current: false },
  { label: "Reposición", icon: RefreshCwIcon, current: false },
  { label: "Precios", icon: TagIcon, current: true },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider className="h-full min-h-0 overflow-hidden">
        <Sidebar collapsible="none" className="hidden shrink-0 border-r lg:flex">
          <SidebarHeader className="px-5 py-6 text-xl font-semibold tracking-tight">
            Despensa
          </SidebarHeader>
          <SidebarContent>
            <nav aria-label="Navegación principal" className="px-3">
              <SidebarMenu>
                {destinations.map(({ label, icon: Icon, current }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      isActive={current}
                      className="h-11"
                      aria-current={current ? "page" : undefined}
                    >
                      <Icon aria-hidden />
                      {label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </nav>
          </SidebarContent>
        </Sidebar>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {children}
          <nav
            aria-label="Navegación principal"
            className="z-20 flex shrink-0 border-t bg-background px-2 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            {destinations.map(({ label, icon: Icon, current }) => (
              <Button
                variant="ghost"
                key={label}
                aria-current={current ? "page" : undefined}
                className="h-14 flex-1 flex-col gap-1 rounded-lg text-xs text-muted-foreground aria-[current=page]:text-foreground"
              >
                <Icon aria-hidden className="size-5" />
                {label}
              </Button>
            ))}
          </nav>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
