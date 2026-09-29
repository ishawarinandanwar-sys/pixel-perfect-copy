import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ListChecks, MapPin, ShoppingCart, Sparkles, Truck, User } from "lucide-react";
import { useStore } from "@/lib/store";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Shop", icon: Home },
  { to: "/list", label: "My list", icon: ListChecks },
  { to: "/orders", label: "Orders", icon: Truck },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { count } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-fresh text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">
                Grocery<span className="text-primary">AI</span>
              </span>
            </Link>
            <span className="hidden min-w-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate">Delivering to Koregaon Park · 9 min</span>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <nav className="mr-2 hidden items-center gap-1 md:flex">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                    pathname === n.to
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-2xl bg-fresh px-3.5 py-2 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-background px-1 text-[11px] font-extrabold text-primary">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/95 backdrop-blur md:hidden">
        {nav.map((n) => {
          const Icon = n.icon;
          const active = pathname === n.to;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {n.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
