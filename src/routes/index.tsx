import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, Timer, BadgePercent, Leaf, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-groceries.jpg";
import { ProductCard } from "@/components/ProductCard";
import { categories, discount, products, searchProducts, smartSuggest } from "@/lib/products";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GroceryAI — fresh groceries delivered in minutes" },
      {
        name: "description",
        content:
          "Shop fresh produce, dairy, bakery and daily essentials on GroceryAI. Ask the AI assistant to build your basket and get it delivered in minutes.",
      },
      { property: "og:title", content: "GroceryAI — fresh groceries delivered in minutes" },
      {
        property: "og:description",
        content: "Ask for 'pasta night' and GroceryAI fills your basket in one tap.",
      },
    ],
  }),
  component: Home,
});

const prompts = ["Breakfast for the week", "Pasta night", "Healthy high protein", "Snacks for a party"];

function Home() {
  const [query, setQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const { add } = useStore();

  const suggestion = useMemo(() => smartSuggest(prompt), [prompt]);
  const results = useMemo(() => {
    const base = query ? searchProducts(query) : products;
    return activeCat ? base.filter((p) => p.category === activeCat) : base;
  }, [query, activeCat]);

  const deals = useMemo(
    () => [...products].sort((a, b) => discount(b) - discount(a)).slice(0, 6),
    [],
  );

  const addAll = () => {
    suggestion.items.slice(0, 5).forEach((p) => add(p.id));
    toast.success(`Added ${Math.min(5, suggestion.items.length)} items to your cart`);
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
        <img
          src={heroImg}
          alt="Fresh vegetables, bread and milk in a cotton grocery bag"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="relative bg-gradient-to-r from-background via-background/90 to-background/10 p-6 sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            <Timer className="h-3.5 w-3.5" /> Delivery in 9 minutes
          </span>
          <h1 className="mt-4 max-w-md text-3xl font-extrabold leading-tight sm:text-5xl">
            Groceries that think ahead
          </h1>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground sm:text-base">
            Tell GroceryAI what you're cooking. It builds the basket, finds the offers and gets it
            to your door before you finish the recipe.
          </p>

          <div className="mt-6 flex max-w-md items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft">
            <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search milk, mangoes, coffee…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* AI assistant */}
      <section className="rounded-[2rem] border border-primary/20 bg-accent/50 p-5 sm:p-7">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-fresh text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <h2 className="truncate text-lg font-bold sm:text-xl">AI basket assistant</h2>
          </div>
          <button
            onClick={addAll}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-fresh px-4 py-2 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
          >
            Add top 5 <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What are you planning? e.g. healthy breakfast for 3 days"
          className="mt-4 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          Picked for <span className="font-semibold text-foreground">{suggestion.label}</span>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {suggestion.items.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-xl font-bold">Shop by category</h2>
        <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCat(null)}
            className={`shrink-0 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
              activeCat === null
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCat(c.slug === activeCat ? null : c.slug)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                activeCat === c.slug
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              <span aria-hidden className="text-lg">
                {c.emoji}
              </span>
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Deals */}
      <section>
        <div className="flex items-center gap-2">
          <BadgePercent className="h-5 w-5 text-offer" />
          <h2 className="text-xl font-bold">Today's best offers</h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Catalogue */}
      <section>
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">
            {query ? `Results for “${query}”` : activeCat ? "In this aisle" : "All products"}
          </h2>
        </div>
        {results.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nothing matched. Try “milk”, “rice” or “snacks”.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
