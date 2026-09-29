import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { byId, type Product } from "./products";

export type CartLine = { id: string; qty: number };
export type ListItem = { id: string; text: string; done: boolean };

type StoreValue = {
  cart: CartLine[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
  count: number;
  subtotal: number;
  savings: number;
  lines: { product: Product; qty: number }[];
  list: ListItem[];
  addListItem: (text: string) => void;
  toggleListItem: (id: string) => void;
  removeListItem: (id: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value, hydrated]);

  return [value, setValue] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = usePersisted<CartLine[]>("groceryai.cart", []);
  const [list, setList] = usePersisted<ListItem[]>("groceryai.list", []);

  const value = useMemo<StoreValue>(() => {
    const lines = cart
      .map((l) => ({ product: byId(l.id), qty: l.qty }))
      .filter((l): l is { product: Product; qty: number } => Boolean(l.product));

    return {
      cart,
      lines,
      add: (id) =>
        setCart((c) =>
          c.some((l) => l.id === id)
            ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
            : [...c, { id, qty: 1 }],
        ),
      remove: (id) => setCart((c) => c.filter((l) => l.id !== id)),
      setQty: (id, qty) =>
        setCart((c) =>
          qty <= 0
            ? c.filter((l) => l.id !== id)
            : c.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      clear: () => setCart([]),
      qtyOf: (id) => cart.find((l) => l.id === id)?.qty ?? 0,
      count: cart.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.product.price * l.qty, 0),
      savings: lines.reduce((n, l) => n + (l.product.mrp - l.product.price) * l.qty, 0),
      list,
      addListItem: (text) =>
        setList((l) => [
          { id: crypto.randomUUID(), text, done: false },
          ...l,
        ]),
      toggleListItem: (id) =>
        setList((l) => l.map((i) => (i.id === id ? { ...i, done: !i.done } : i))),
      removeListItem: (id) => setList((l) => l.filter((i) => i.id !== id)),
    };
  }, [cart, list, setCart, setList]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
