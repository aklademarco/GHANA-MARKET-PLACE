import { create } from "zustand";
import { products as initialProducts } from "../assets/assets";

export const useStore = create((set, get) => ({
  products: initialProducts,
  Currency: "GH₵",
  delivery_fee: 10,
  search: "",
  showSearch: false,

  // utility to get related products (non-mutating)
  getRelatedProducts: (productId, category, limit = 4) => {
    const { products } = get();
    if (!category) return [];
    return products
      .filter(
        (p) =>
          p.id !== productId &&
          (p.category || "").toLowerCase() === (category || "").toLowerCase()
      )
      .slice(0, limit);
  },

  setSearch: (q) => set({ search: q }),
  setShowSearch: (v) => set({ showSearch: v }),
}));
