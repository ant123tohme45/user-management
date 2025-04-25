import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  setAccessToken: (token: string) => void;
  setAuth: (token: string, expiresIn: number) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      setAuth: (token: string, expiresIn: number) => set({ accessToken: token, expiresIn }),
      logout: () => set({ accessToken: null, expiresIn: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
