import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginAdmin, registerAdmin } from "../api/auth";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await loginAdmin(email, password);
          // Expected response: { jwtToken, refreshToken, admin: { ... } }
          set({
            user: data.admin,
            token: data.jwtToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error("Login Error Detail:", error);
          const errorMessage =
            error.response?.data?.message || error.message || "Login failed";
          set({
            error: errorMessage,
            isLoading: false,
          });
          return false;
        }
      },

      register: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await registerAdmin(email, password);
          set({
            user: data.admin,
            token: data.jwtToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error("Register Error Detail:", error);
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Registration failed";
          set({
            error: errorMessage,
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
