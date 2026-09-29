import { Minus, Plus, Star } from "lucide-react";
import { discount, type Product } from "@/lib/products";
import { inr, useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { add, setQty, qtyOf } = useStore();
  const qty = qtyOf(product.id);
  const off = discount(product);

  return (
    <div className="group relative flex flex-col rounded-3xl border border-border bg-card p-3 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      {off > 0 && (
        <span className="absolute left-3 top-3 rounded-full bg-offer-gradient px-2 py-0.5 text-[11px] font-bold text-offer-foreground">
          {off}% off
        </span>
      )}
      <div className="grid h-28 place-items-center rounded-2xl bg-surface text-5xl transition-transform duration-300 group-hover:scale-105">
        <span aria-hidden>{product.emoji}</span>
      </div>

      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {product.brand}
      </p>
      <h3 className="truncate text-sm font-semibold text-foreground">{product.name}</h3>
      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
        <span>{product.unit}</span>
        <span className="inline-flex items-center gap-0.5">
          <Star className="h-3 w-3 fill-current text-warning" />
          {product.rating}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="text-sm font-bold text-foreground">{inr(product.price)}</span>
          {off > 0 && (
            <span className="ml-1 text-xs text-muted-foreground line-through">
              {inr(product.mrp)}
            </span>
          )}
        </div>

        {qty === 0 ? (
          <button
            onClick={() => add(product.id)}
            className="shrink-0 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            ADD
          </button>
        ) : (
          <div className="flex shrink-0 items-center gap-1 rounded-xl bg-fresh p-1 text-primary-foreground">
            <button
              aria-label={`Remove one ${product.name}`}
              onClick={() => setQty(product.id, qty - 1)}
              className="grid h-6 w-6 place-items-center rounded-lg hover:bg-black/10"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-5 text-center text-xs font-bold">{qty}</span>
            <button
              aria-label={`Add one ${product.name}`}
              onClick={() => setQty(product.id, qty + 1)}
              className="grid h-6 w-6 place-items-center rounded-lg hover:bg-black/10"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
