import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { inr, useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — GroceryAI" },
      { name: "description", content: "Review your GroceryAI basket, adjust quantities and check out in seconds." },
      { property: "og:title", content: "Your cart — GroceryAI" },
      { property: "og:description", content: "Review your basket and check out in seconds." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal, savings, clear } = useStore();
  const navigate = useNavigate();
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 29;

  if (lines.length === 0) {
    return (
      <div className="grid place-items-center rounded-[2rem] border border-dashed border-border p-16 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold">Your cart is empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fresh picks are one tap away.</p>
        <Link
          to="/"
          className="mt-5 rounded-2xl bg-fresh px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <h1 className="text-2xl font-extrabold">Your cart</h1>
        <div className="mt-4 space-y-3">
          {lines.map(({ product, qty }) => (
            <div
              key={product.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border border-border bg-card p-3 shadow-soft"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-surface text-2xl">
                {product.emoji}
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">{product.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {product.unit} · {inr(product.price)}
                </p>
                <button
                  onClick={() => remove(product.id)}
                  className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-destructive"
                >
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <div className="flex items-center gap-1 rounded-xl bg-fresh p-1 text-primary-foreground">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQty(product.id, qty - 1)}
                    className="grid h-6 w-6 place-items-center rounded-lg hover:bg-black/10"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center text-xs font-bold">{qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQty(product.id, qty + 1)}
                    className="grid h-6 w-6 place-items-center rounded-lg hover:bg-black/10"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="w-16 text-right text-sm font-bold">
                  {inr(product.price * qty)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="h-fit rounded-3xl border border-border bg-card p-5 shadow-soft lg:sticky lg:top-24">
        <h2 className="text-lg font-bold">Bill summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Item total</dt>
            <dd className="font-semibold">{inr(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Delivery</dt>
            <dd className="font-semibold text-primary">{delivery === 0 ? "FREE" : inr(delivery)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">You save</dt>
            <dd className="font-semibold text-offer">{inr(savings)}</dd>
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
            <dt className="font-bold">To pay</dt>
            <dd className="font-extrabold">{inr(subtotal + delivery)}</dd>
          </div>
        </dl>
        <button
          onClick={() => {
            clear();
            toast.success("Order placed — arriving in 9 minutes");
            navigate({ to: "/orders" });
          }}
          className="mt-5 w-full rounded-2xl bg-fresh py-3 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
        >
          Place order
        </button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Free delivery on orders above ₹499
        </p>
      </aside>
    </div>
  );
}
