import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, PackageCheck, Bike, Store, MapPin } from "lucide-react";
import { inr } from "@/lib/store";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Track your order — GroceryAI" },
      {
        name: "description",
        content: "Follow your GroceryAI delivery live, from packing to doorstep, and revisit past orders.",
      },
      { property: "og:title", content: "Track your order — GroceryAI" },
      { property: "og:description", content: "Follow your delivery live, from packing to doorstep." },
    ],
  }),
  component: OrdersPage,
});

const steps = [
  { label: "Order confirmed", icon: Check, note: "Payment received" },
  { label: "Packing at store", icon: Store, note: "Koregaon Park hub" },
  { label: "Out for delivery", icon: Bike, note: "Rider Aarav is on the way" },
  { label: "Delivered", icon: PackageCheck, note: "Handed to you" },
];

const past = [
  { id: "GA-10241", date: "27 Sep", items: 12, total: 1284 },
  { id: "GA-10198", date: "22 Sep", items: 6, total: 642 },
  { id: "GA-10120", date: "14 Sep", items: 18, total: 2190 },
];

function OrdersPage() {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s < steps.length - 1 ? s + 1 : s)), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="rounded-3xl border border-border bg-card p-5 shadow-soft">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold">Order GA-10256</h1>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate">Flat 402, Lily Apartments, Koregaon Park</span>
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            ETA 9 min
          </span>
        </div>

        <ol className="mt-6 space-y-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i <= stage;
            return (
              <li key={s.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl transition-colors ${
                      done ? "bg-fresh text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      className={`mt-1 w-0.5 flex-1 rounded-full ${done ? "bg-primary/40" : "bg-border"}`}
                    />
                  )}
                </div>
                <div className="pb-1">
                  <p className={`text-sm font-semibold ${done ? "" : "text-muted-foreground"}`}>
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.note}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-bold">Past orders</h2>
        <div className="mt-3 space-y-2">
          {past.map((o) => (
            <div
              key={o.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{o.id}</p>
                <p className="text-xs text-muted-foreground">
                  {o.date} · {o.items} items
                </p>
              </div>
              <span className="shrink-0 text-sm font-bold">{inr(o.total)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
