import { create } from "zustand";

type ThemeType = "light" | "dark" | null;

interface IThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<IThemeState>((set) => ({
  theme: localStorage.getItem("theme") as ThemeType,
  setTheme: (theme) => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light", "system");

    switch (theme) {
      case "light":
        root.classList.add("light");
        break;
      case "dark":
        root.classList.add("dark");
        break;
      default:
        root.classList.add("dark");
        break;
    }

    localStorage.setItem("theme", theme || "dark");
    set({ theme });
  },
}));
