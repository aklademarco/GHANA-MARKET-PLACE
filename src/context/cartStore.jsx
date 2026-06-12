import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import { products } from "../assets/assets";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: {},

      addToCart: (itemId, variant = "Default") => {
        const variantKey = variant || "Default";

        const cartData = structuredClone(get().cartItems);

        if (cartData[itemId]) {
          cartData[itemId][variantKey] = (cartData[itemId][variantKey] || 0) + 1;
        } else {
          cartData[itemId] = { [variantKey]: 1 };
        }

        set({ cartItems: cartData });
        toast.success("Item added to cart");
      },

      decreaseQuantity: (itemId, size) => {
        const cartData = structuredClone(get().cartItems);

        if (cartData[itemId] && cartData[itemId][size]) {
          if (cartData[itemId][size] > 1) {
            cartData[itemId][size] -= 1;
          } else {
            delete cartData[itemId][size];
            toast.info("Item removed from cart");
          }

          if (cartData[itemId] && Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }

          set({ cartItems: cartData });
        }
      },

      removeFromCart: (itemId, size) => {
        const cartData = structuredClone(get().cartItems);

        if (cartData[itemId] && cartData[itemId][size]) {
          delete cartData[itemId][size];
          toast.info("Item removed from cart");

          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }

          set({ cartItems: cartData });
        }
      },

      getCartCount: () => {
        let totalCount = 0;
        const cart = get().cartItems;
        for (const productId in cart) {
          for (const size in cart[productId]) {
            totalCount += cart[productId][size];
          }
        }
        return totalCount;
      },

      getCartAmount: () => {
        let totalAmount = 0;
        const cart = get().cartItems;

        for (const itemId in cart) {
          const itemInfo = products.find((p) => p.id === itemId);
          if (!itemInfo) continue;

          for (const size in cart[itemId]) {
            totalAmount += itemInfo.price * cart[itemId][size];
          }
        }

        return totalAmount;
      },

      clearCart: () => {
        set({ cartItems: {} });
        toast.info("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
