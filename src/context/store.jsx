import { create } from "zustand";
import {products as initialProducts} from '../assets/assets';
import { Currency } from "lucide-react";
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