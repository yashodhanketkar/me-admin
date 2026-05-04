import { Moon, Sun } from "lucide-react";

import { useThemeStore } from "@/store/theme";

import { AuthLinks, MainNavigation } from "./navigation";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <h3 className="text-lg font-bold tracking-tight sm:text-xl">
          Yashodhan{" "}
          <span className="text-muted-foreground font-normal">| Admin</span>
        </h3>
        <div className="flex flex-row">
          <MainNavigation />
          <AuthLinks />
          <ThemeButton />
        </div>
      </div>
    </header>
  );
};

const ThemeButton = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <Button
      size="icon-lg"
      variant="ghost"
      className="my-auto"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? <Moon fill="yellow" /> : <Sun fill="orange" />}
    </Button>
  );
};
