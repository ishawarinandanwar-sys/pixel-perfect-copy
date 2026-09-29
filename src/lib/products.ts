export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  unit: string;
  category: string;
  emoji: string;
  tags: string[];
  rating: number;
};

export const categories = [
  { slug: "fruits-veg", name: "Fruits & Veg", emoji: "🥬" },
  { slug: "dairy", name: "Dairy & Eggs", emoji: "🥛" },
  { slug: "bakery", name: "Bakery", emoji: "🍞" },
  { slug: "snacks", name: "Snacks", emoji: "🍪" },
  { slug: "beverages", name: "Beverages", emoji: "🧃" },
  { slug: "staples", name: "Staples", emoji: "🌾" },
  { slug: "household", name: "Household", emoji: "🧴" },
  { slug: "frozen", name: "Frozen", emoji: "🧊" },
];

export const products: Product[] = [
  { id: "p1", name: "Baby Spinach", brand: "FarmFresh", price: 39, mrp: 55, unit: "250 g", category: "fruits-veg", emoji: "🥬", tags: ["salad", "healthy", "iron"], rating: 4.5 },
  { id: "p2", name: "Alphonso Mangoes", brand: "Orchard Co", price: 349, mrp: 420, unit: "1 kg", category: "fruits-veg", emoji: "🥭", tags: ["seasonal", "sweet"], rating: 4.8 },
  { id: "p3", name: "Roma Tomatoes", brand: "FarmFresh", price: 32, mrp: 40, unit: "500 g", category: "fruits-veg", emoji: "🍅", tags: ["curry", "salad"], rating: 4.2 },
  { id: "p4", name: "Bananas Robusta", brand: "FarmFresh", price: 48, mrp: 60, unit: "6 pcs", category: "fruits-veg", emoji: "🍌", tags: ["breakfast", "smoothie"], rating: 4.4 },
  { id: "p5", name: "Avocado", brand: "Orchard Co", price: 129, mrp: 160, unit: "2 pcs", category: "fruits-veg", emoji: "🥑", tags: ["toast", "healthy", "keto"], rating: 4.3 },
  { id: "p6", name: "Full Cream Milk", brand: "Meadow", price: 68, mrp: 72, unit: "1 L", category: "dairy", emoji: "🥛", tags: ["breakfast", "coffee"], rating: 4.6 },
  { id: "p7", name: "Farm Eggs", brand: "Meadow", price: 84, mrp: 96, unit: "12 pcs", category: "dairy", emoji: "🥚", tags: ["breakfast", "protein"], rating: 4.7 },
  { id: "p8", name: "Greek Yoghurt", brand: "Meadow", price: 95, mrp: 110, unit: "400 g", category: "dairy", emoji: "🍶", tags: ["healthy", "protein", "smoothie"], rating: 4.5 },
  { id: "p9", name: "Cheddar Slices", brand: "Meadow", price: 165, mrp: 199, unit: "200 g", category: "dairy", emoji: "🧀", tags: ["sandwich", "pasta"], rating: 4.1 },
  { id: "p10", name: "Sourdough Loaf", brand: "Crumb & Co", price: 149, mrp: 149, unit: "450 g", category: "bakery", emoji: "🍞", tags: ["breakfast", "toast", "sandwich"], rating: 4.6 },
  { id: "p11", name: "Butter Croissants", brand: "Crumb & Co", price: 120, mrp: 150, unit: "4 pcs", category: "bakery", emoji: "🥐", tags: ["breakfast", "coffee"], rating: 4.4 },
  { id: "p12", name: "Dark Choc Cookies", brand: "Nibble", price: 99, mrp: 120, unit: "200 g", category: "snacks", emoji: "🍪", tags: ["dessert", "party"], rating: 4.2 },
  { id: "p13", name: "Sea Salt Chips", brand: "Nibble", price: 55, mrp: 70, unit: "150 g", category: "snacks", emoji: "🥔", tags: ["party", "movie night"], rating: 4.0 },
  { id: "p14", name: "Roasted Almonds", brand: "Nutly", price: 289, mrp: 340, unit: "500 g", category: "snacks", emoji: "🥜", tags: ["healthy", "protein"], rating: 4.7 },
  { id: "p15", name: "Cold Pressed Orange", brand: "Squeeze", price: 119, mrp: 140, unit: "1 L", category: "beverages", emoji: "🧃", tags: ["breakfast", "healthy"], rating: 4.3 },
  { id: "p16", name: "Arabica Coffee Beans", brand: "Slow Roast", price: 449, mrp: 520, unit: "250 g", category: "beverages", emoji: "☕", tags: ["coffee", "breakfast"], rating: 4.8 },
  { id: "p17", name: "Green Tea Bags", brand: "Leafy", price: 199, mrp: 240, unit: "50 pcs", category: "beverages", emoji: "🍵", tags: ["healthy", "detox"], rating: 4.4 },
  { id: "p18", name: "Basmati Rice", brand: "Golden Field", price: 320, mrp: 380, unit: "5 kg", category: "staples", emoji: "🍚", tags: ["curry", "dinner"], rating: 4.5 },
  { id: "p19", name: "Durum Penne", brand: "Bella", price: 145, mrp: 175, unit: "500 g", category: "staples", emoji: "🍝", tags: ["pasta", "dinner"], rating: 4.6 },
  { id: "p20", name: "Extra Virgin Olive Oil", brand: "Bella", price: 649, mrp: 799, unit: "1 L", category: "staples", emoji: "🫒", tags: ["pasta", "salad", "healthy"], rating: 4.7 },
  { id: "p21", name: "Toor Dal", brand: "Golden Field", price: 179, mrp: 210, unit: "1 kg", category: "staples", emoji: "🌾", tags: ["curry", "protein"], rating: 4.3 },
  { id: "p22", name: "Dish Wash Gel", brand: "Sparkle", price: 129, mrp: 165, unit: "750 ml", category: "household", emoji: "🧴", tags: ["cleaning"], rating: 4.1 },
  { id: "p23", name: "Kitchen Towels", brand: "Sparkle", price: 99, mrp: 120, unit: "2 rolls", category: "household", emoji: "🧻", tags: ["cleaning"], rating: 4.0 },
  { id: "p24", name: "Frozen Green Peas", brand: "Chill", price: 89, mrp: 110, unit: "500 g", category: "frozen", emoji: "🫛", tags: ["curry", "dinner"], rating: 4.2 },
  { id: "p25", name: "Vanilla Ice Cream", brand: "Chill", price: 259, mrp: 299, unit: "700 ml", category: "frozen", emoji: "🍨", tags: ["dessert", "party"], rating: 4.6 },
  { id: "p26", name: "Paneer Block", brand: "Meadow", price: 105, mrp: 125, unit: "200 g", category: "dairy", emoji: "🧈", tags: ["curry", "protein", "dinner"], rating: 4.5 },
];

export const byId = (id: string) => products.find((p) => p.id === id);

export const discount = (p: Product) =>
  p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

/** Lightweight on-device "AI" matcher: intent keywords -> ranked products. */
const intents: { keys: string[]; tags: string[]; label: string }[] = [
  { keys: ["breakfast", "morning"], tags: ["breakfast", "coffee", "toast"], label: "a quick breakfast" },
  { keys: ["pasta", "italian"], tags: ["pasta", "salad"], label: "pasta night" },
  { keys: ["healthy", "diet", "fit", "protein"], tags: ["healthy", "protein"], label: "eating clean" },
  { keys: ["party", "guests", "friends"], tags: ["party", "dessert"], label: "hosting people" },
  { keys: ["curry", "indian", "dinner"], tags: ["curry", "dinner"], label: "a home-style dinner" },
  { keys: ["dessert", "sweet", "cake"], tags: ["dessert", "sweet"], label: "something sweet" },
  { keys: ["smoothie", "shake"], tags: ["smoothie", "healthy"], label: "smoothies" },
];

export function smartSuggest(query: string): { label: string; items: Product[] } {
  const q = query.toLowerCase().trim();
  if (!q) return { label: "your weekly basket", items: products.slice(0, 6) };

  const intent = intents.find((i) => i.keys.some((k) => q.includes(k)));
  const words = q.split(/\s+/).filter(Boolean);

  const scored = products
    .map((p) => {
      let score = 0;
      if (intent) score += p.tags.filter((t) => intent.tags.includes(t)).length * 3;
      for (const w of words) {
        if (p.name.toLowerCase().includes(w)) score += 4;
        if (p.tags.some((t) => t.includes(w))) score += 2;
        if (p.category.includes(w)) score += 2;
        if (p.brand.toLowerCase().includes(w)) score += 1;
      }
      return { p, score: score + p.rating / 10 };
    })
    .filter((s) => s.score > 0.6)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.p);

  return {
    label: intent ? intent.label : `“${query}”`,
    items: scored.length ? scored : products.slice(0, 6),
  };
}

export function searchProducts(q: string): Product[] {
  const s = q.toLowerCase().trim();
  if (!s) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.category.includes(s) ||
      p.tags.some((t) => t.includes(s)),
  );
}
