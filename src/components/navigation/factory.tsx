import { Link } from "@tanstack/react-router";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import type { NavPage } from "./types";

const LinkFactory = ({ page }: { page: NavPage }) => {
  return (
    <li key={page.path}>
      <Link
        to={page.path}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        activeProps={{
          className:
            "bg-muted font-bold border-l-2 border-primary rounded-l-none",
        }}
      >
        <div className="text-sm font-medium leading-none">{page.name}</div>
      </Link>
    </li>
  );
};

export const NavContent = ({
  title,
  pages,
  numcols = 1,
}: {
  title: string;
  pages: NavPage[];
  numcols?: number;
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent font-semibold">
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className={`grid gap-1 p-1 md:grid-cols-${numcols}`}>
          {pages.sort(sorter).map((page) => (
            <LinkFactory page={page} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const sorter = (a: NavPage, b: NavPage) => {
  return a.serial - b.serial;
};
