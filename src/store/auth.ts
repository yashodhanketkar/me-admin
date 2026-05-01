import Cookies from "js-cookie";
import { create } from "zustand";

interface IAuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  token: Cookies.get("token") || null,
  setToken: (token) => {
    if (token) {
      const exp = parseJwtExpiry(token);

      if (exp) {
        const expDate = new Date(exp * 1000);
        document.cookie = `token=${token}; expires=${expDate}; path=/`;
      }
    } else {
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }

    set({ token });
  },
}));

export const parseJwtExpiry = (token: string) => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    return payload.exp;
  } catch (err) {
    console.error("Failed to parse JWT", err);
    return null;
  }
};
