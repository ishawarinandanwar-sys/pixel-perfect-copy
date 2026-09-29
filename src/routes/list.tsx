import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus, Sparkles, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { searchProducts } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/list")({
  head: () => ({
    meta: [
      { title: "Smart grocery list — GroceryAI" },
      {
        name: "description",
        content: "Jot down what you need and turn your grocery list into a filled cart in one tap.",
      },
      { property: "og:title", content: "Smart grocery list — GroceryAI" },
      { property: "og:description", content: "Turn your grocery list into a filled cart in one tap." },
    ],
  }),
  component: ListPage,
});

function ListPage() {
  const { list, addListItem, toggleListItem, removeListItem, add } = useStore();
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    addListItem(t);
    setText("");
  };

  const fillCart = () => {
    let added = 0;
    list
      .filter((i) => !i.done)
      .forEach((i) => {
        const match = searchProducts(i.text)[0];
        if (match) {
          add(match.id);
          added += 1;
        }
      });
    toast[added ? "success" : "error"](
      added ? `Matched ${added} list items to products` : "No products matched your list yet",
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold">My grocery list</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Write it like you would on paper — GroceryAI finds the products.
      </p>

      <form onSubmit={submit} className="mt-5 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. milk, eggs, coffee beans"
          className="min-w-0 flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/40 focus:ring-2"
        />
        <button className="shrink-0 rounded-2xl bg-fresh px-4 text-sm font-bold text-primary-foreground">
          <Plus className="h-4 w-4" />
        </button>
      </form>

      <button
        onClick={fillCart}
        disabled={list.length === 0}
        className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4" /> Fill my cart from this list
      </button>

      <ul className="mt-6 space-y-2">
        {list.length === 0 && (
          <li className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Your list is empty.
          </li>
        )}
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft"
          >
            <button
              aria-label="Toggle done"
              onClick={() => toggleListItem(item.id)}
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border ${
                item.done ? "border-primary bg-fresh text-primary-foreground" : "border-border"
              }`}
            >
              {item.done && <Check className="h-3.5 w-3.5" />}
            </button>
            <span
              className={`min-w-0 flex-1 truncate text-sm ${
                item.done ? "text-muted-foreground line-through" : "font-medium"
              }`}
            >
              {item.text}
            </span>
            <button
              aria-label="Delete item"
              onClick={() => removeListItem(item.id)}
              className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
