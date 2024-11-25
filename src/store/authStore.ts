import { create } from 'zustand'

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === "demo@example.com" && password === "password") {
      set({ user: { email, name: "Demo User" }, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  resetPassword: async (email: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  },

  signup: async (email: string, password: string, name: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ user: { email, name }, isAuthenticated: true });
    return true;
  },
}));