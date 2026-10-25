import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AdminUser, LoginResponseData } from "@/models/auth";

interface AuthState {
  token: string | null;
  user: AdminUser | null;
  expiresAt: number | null; // Timestamp in milliseconds (12 hours / 720 minutes lifespan)
  isAuthenticated: boolean;
  
  // Actions
  setAuth: (data: LoginResponseData) => void;
  setUser: (user: AdminUser) => void;
  logout: () => void;
  isTokenValid: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      expiresAt: null,
      isAuthenticated: false,

      setAuth: (data: LoginResponseData) => {
        // Token lifespan is 12 hours (720 minutes = 43,200,000 ms)
        const twelveHoursMs = 12 * 60 * 60 * 1000;
        let expiresAt = Date.now() + twelveHoursMs;
        if (data.expiresAt) {
          const parsed = new Date(data.expiresAt).getTime();
          if (!isNaN(parsed) && parsed > Date.now()) {
            expiresAt = parsed;
          }
        }

        const maxAgeSeconds = Math.max(60, Math.floor((expiresAt - Date.now()) / 1000));

        // Synchronize browser storage
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_token", data.token);
          // Set cookie for Next.js proxy route protection (12 hours = 43200 seconds)
          document.cookie = `admin_token=${data.token}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
        }

        set({
          token: data.token,
          user: data.user,
          expiresAt,
          isAuthenticated: true,
        });
      },

      setUser: (user: AdminUser) => {
        set({ user });
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("admin_token");
          document.cookie = "admin_token=; path=/; max-age=0; SameSite=Lax";
        }
        set({
          token: null,
          user: null,
          expiresAt: null,
          isAuthenticated: false,
        });
      },

      isTokenValid: () => {
        const { token, expiresAt } = get();
        if (!token || !expiresAt) return false;
        const isValid = Date.now() < expiresAt;
        if (!isValid) {
          get().logout();
          return false;
        }
        return true;
      },
    }),
    {
      name: "admin_auth_storage",
    }
  )
);

export default useAuthStore;
