import { useMatches } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { useEffect, useLayoutEffect } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

import { TooltipProvider } from "./components/ui/tooltip";
import { HotkeysProvider } from "./providers/hotkeys";

export const RootDocument = ({ children }: { children: React.ReactNode }) => {
  const matches = useMatches();

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light", "system");
    root.classList.add(localStorage.getItem("theme") || "dark");
  }, []);

  useEffect(() => {
    const lastMatch = [...matches].reverse().find((d) => d.staticData?.title);
    const title = lastMatch?.staticData?.title;

    document.title = title ? title : "Yashodhan | Admin";
  }, [matches]);

  return (
    <HotkeysProvider>
      <TooltipProvider>
        <ThemeProvider>
          <div className="w-screen min-h-screen flex flex-col justify-between">
            <Header />
            <main className="container mt-4 mb-auto mx-auto">
              {children}
              <Toaster position="top-center" />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </TooltipProvider>
    </HotkeysProvider>
  );
};
