import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      userRole: null, // 'admin', 'seller', 'customer'
      
      login: (userData) =>
        set({
          user: userData,
          isLoggedIn: true,
          userRole: userData.role,
        }),
      
      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
          userRole: null,
        }),
      
      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
