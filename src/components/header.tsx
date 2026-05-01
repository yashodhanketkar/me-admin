import { MainNavigation } from "./navigation";
import { AuthLinks } from "./navigation/authbutton";

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
        </div>
      </div>
    </header>
  );
};
