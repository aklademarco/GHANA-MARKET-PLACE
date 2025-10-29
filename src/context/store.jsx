import { create } from "zustand";
import { products as initialProducts } from "../assets/assets";
export const useStore = create((set, get) => ({
  products: initialProducts,
  Currency: "GH₵",
  delivery_fee: 10,
  search: "",
  showSearch: false,
  selectedCategory: "",
  selectedPriceRange: "",
  selectedAvailability: "",
  sortBy: "Newest-arrivals",

  // cart state + actions
  cart: [],
  addToCart: (product, qty = 1) =>
    set((s) => {
      const cart = [...s.cart];
      const idx = cart.findIndex((c) => c.id === product.id);
      if (idx > -1) {
        // update qty
        cart[idx] = { ...cart[idx], qty: (cart[idx].qty || 1) + qty };
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: Array.isArray(product.image)
            ? product.image[0]
            : product.image || product.thumbnail || "",
          qty,
        });
      }
      return { cart };
    }),
  removeFromCart: (productId) =>
    set((s) => ({ cart: s.cart.filter((c) => c.id !== productId) })),
  clearCart: () => set({ cart: [] }),

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
  setSelectedCategory: (c) =>
    set((s) => ({ selectedCategory: s.selectedCategory === c ? "" : c })),
  setSelectedPriceRange: (p) =>
    set((s) => ({ selectedPriceRange: s.selectedPriceRange === p ? "" : p })),
  setSelectedAvailability: (a) =>
    set((s) => ({
      selectedAvailability: s.selectedAvailability === a ? "" : a,
    })),
  setSortBy: (s) => set({ sortBy: s }),
  clearFilters: () =>
    set({
      selectedCategory: "",
      selectedPriceRange: "",
      selectedAvailability: "",
    }),

  getFilteredProducts: () => {
    const {
      products,
      search,
      selectedCategory,
      selectedPriceRange,
      selectedAvailability,
      sortBy,
    } = get();
    let filtered = [...products];

    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((p) => {
        const name = (p.name || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        return name.includes(q) || cat.includes(q) || desc.includes(q);
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (p) =>
          (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    if (selectedAvailability) {
      filtered = filtered.filter((p) =>
        selectedAvailability === "in-stock"
          ? p.inStock === true
          : p.inStock === false
      );
    }

    switch (sortBy) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        filtered.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      case "top-rated":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  },
}));
