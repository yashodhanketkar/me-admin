import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/auth";

import { NavContent } from "./factory";
import type { NavPage } from "./types";

const HomePages: NavPage[] = [
  { serial: 1, path: "/home", name: "Home" },
  { serial: 2, path: "/board", name: "Dashboard" },
];

const ManagePages: NavPage[] = [
  { serial: 1, path: "/projects", name: "Projects" },
  { serial: 2, path: "/skills", name: "Skills" },
  { serial: 3, path: "/publications", name: "Publications" },
  { serial: 4, path: "/educations", name: "Education" },
  { serial: 5, path: "/experiences", name: "Experiences" },
  { serial: 6, path: "/socials", name: "Social" },
];

export const MainNavigation = () => {
  const { token } = useAuthStore();

  if (!token) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavContent title="Home" pages={HomePages} />
        <NavContent title="Mange" pages={ManagePages} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { AuthLinks } from "./authbutton";
