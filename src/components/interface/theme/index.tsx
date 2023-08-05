"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";

// creates context for theme
const ThemeModeContext = createContext({
  toggleThemeMode: () => {},
});

// main wrapper for theme
const ThemeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme === "dark" || localTheme === "light") setMode(localTheme);
  }, []);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#222222" : "#eeeeee",
            paper: mode === "dark" ? "#222222" : "#dddddd",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export { ThemeWrapper, ThemeModeContext };
export type ThemeModeContextType = typeof ThemeModeContext;
