// stores/authStores.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  login: (token: string, expiresIn: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      isAuthenticated: false, // Add the new property here
     
    
login: (token: string, expiresIn: number) => {
  set({ accessToken: token, expiresIn });
},
      logout: () => set({ accessToken: null, expiresIn: null }),
      
    }),
    {
      name: 'auth-storage',
    }
  )
);