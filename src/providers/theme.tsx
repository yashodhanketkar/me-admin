import { useEffect } from "react";

import { useThemeStore } from "../store/theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    console.log("Debug 1");
    const root = window.document.documentElement;
    console.log("Debug 2");
    root.classList.remove("dark", "light", "system");
    console.log("Debug 3");
    console.log({ theme });
    root.classList.add(theme!);
  }, [theme]);

  return <>{children}</>;
};
