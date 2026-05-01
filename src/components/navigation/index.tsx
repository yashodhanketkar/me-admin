import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/auth";

import { NavContent } from "./factory";
import type { NavPage } from "./types";

const HomePages: NavPage[] = [
  { path: "/home", name: "Home" },
  { path: "/board", name: "Dashboard" },
];

const ManagePages: NavPage[] = [
  { path: "/skills", name: "Skills" },
  { path: "/projects", name: "Projects" },
  { path: "/experiences", name: "Experiences" },
  { path: "/publications", name: "Publications" },
  { path: "/educations", name: "Education" },
  { path: "/socials", name: "Social" },
];

export const MainNavigation = () => {
  const { token } = useAuthStore();

  if (!token) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavContent title="Home" pages={HomePages} />
        <NavContent title="Mange" pages={ManagePages} numcols={2} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
