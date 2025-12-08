import { create } from "zustand";
import Cookies from "js-cookie";

type AuthState = {
  token: string | null;
  user: { name: string } | null;
  isAuthenticated: boolean;
  setAuth: (token: string, userName?: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
  getUser: () => { name: string } | null;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setAuth: (token, userName) => {
    Cookies.set("token", token, { expires: 7 });

    const user = userName ? { name: userName } : null;
    if (userName && typeof window !== "undefined") {
      localStorage.setItem("user_name", userName);
    }

    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove("token");
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_name");
    }
    set({ token: null, user: null, isAuthenticated: false });
  },

  loadFromStorage: () => {
    const token = Cookies.get("token") || null;
    let user = null;

    if (typeof window !== "undefined") {
      const userName = localStorage.getItem("user_name");
      if (userName) {
        user = { name: userName };
      }
    }

    set({
      token,
      user,
      isAuthenticated: !!token,
    });
  },

  getUser: () => {
    return get().user;
  },
}));
