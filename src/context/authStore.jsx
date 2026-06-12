import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      userRole: null, // 'admin', 'seller', 'customer'
      accessToken: null,

      login: (userData, accessToken = null) =>
        set({
          user: userData,
          isLoggedIn: true,
          userRole: userData.role,
          accessToken,
        }),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
          userRole: null,
          accessToken: null,
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
