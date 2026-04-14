import { MainNavigation } from "./navigation";

export const Header = () => {
  return (
    <header className="bg-zinc-800 text-zinc-50 w-full inline-flex p-2 justify-between items-center">
      <h3 className="text-xl font-bold">Yashodhan | Admin</h3>
      <MainNavigation />
    </header>
  );
};
