import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Briefcase, Plus, Wallet, Bell, HelpCircle, LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — GroceryAI" },
      {
        name: "description",
        content: "Manage your GroceryAI addresses, wallet, notifications and account settings.",
      },
      { property: "og:title", content: "Your profile — GroceryAI" },
      { property: "og:description", content: "Manage addresses, wallet and account settings." },
    ],
  }),
  component: ProfilePage,
});

const initialAddresses = [
  { id: "a1", label: "Home", icon: Home, line: "Flat 402, Lily Apartments, Koregaon Park, Pune" },
  { id: "a2", label: "Work", icon: Briefcase, line: "5th Floor, Orion Tower, Baner, Pune" },
];

const settings = [
  { label: "GroceryAI Wallet", note: "₹640 balance", icon: Wallet },
  { label: "Notifications", note: "Offers and delivery updates", icon: Bell },
  { label: "Help & support", note: "Chat with us 24×7", icon: HelpCircle },
];

function ProfilePage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selected, setSelected] = useState("a1");
  const [draft, setDraft] = useState("");

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-fresh text-xl font-extrabold text-primary-foreground">
          IN
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-extrabold">Ishwari Nandanwar</h1>
          <p className="truncate text-sm text-muted-foreground">+91 98765 43210 · Member since 2024</p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold">Saved addresses</h2>
        <div className="mt-3 space-y-2">
          {addresses.map((a) => {
            const Icon = a.icon;
            const active = selected === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setSelected(a.id)}
                className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                  active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{a.label}</span>
                  <span className="block text-xs text-muted-foreground">{a.line}</span>
                </span>
              </button>
            );
          })}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            setAddresses((list) => [
              ...list,
              { id: crypto.randomUUID(), label: "Other", icon: Home, line: draft.trim() },
            ]);
            setDraft("");
          }}
          className="mt-3 flex gap-2"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a new address"
            className="min-w-0 flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/40 focus:ring-2"
          />
          <button className="shrink-0 rounded-2xl bg-fresh px-4 text-primary-foreground">
            <Plus className="h-4 w-4" />
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-bold">Account</h2>
        <div className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {settings.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-3 p-4">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{s.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.note}</p>
                </div>
              </div>
            );
          })}
          <button className="flex w-full items-center gap-3 p-4 text-left text-sm font-semibold text-destructive">
            <LogOut className="h-4 w-4 shrink-0" /> Log out
          </button>
        </div>
      </section>
    </div>
  );
}
