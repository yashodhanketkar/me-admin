import * as n from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/auth";

import { NavContent } from "./factory";
import { HomePages, ManagePages } from "./links";

export const MainNavigation = () => {
  const { token } = useAuthStore();

  if (!token) return null;

  return (
    <n.NavigationMenu>
      <n.NavigationMenuList>
        <NavContent title="Home" pages={HomePages} />
        <NavContent title="Manage" pages={ManagePages} />
      </n.NavigationMenuList>
    </n.NavigationMenu>
  );
};

export { AuthLinks } from "./authbutton";
