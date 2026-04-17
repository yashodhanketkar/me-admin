import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/auth";

const Pages: { path: string; name: string }[] = [
  { path: "/", name: "Home" },
  { path: "/skills", name: "Skills" },
  { path: "/projects", name: "Projects" },
];

export const MainNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent font-semibold">
            Manage
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              {Pages.map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    activeProps={{
                      className:
                        "bg-muted font-bold border-l-2 border-primary rounded-l-none",
                    }}
                  >
                    <div className="text-sm font-medium leading-none">
                      {page.name}
                    </div>
                  </Link>
                </li>
              ))}

              {/* Divider and Auth */}
              <li className="col-span-2 mt-2 border-t pt-2">
                <AuthLinks />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const AuthLinks = () => {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const { setToken, token } = useAuthStore();
  const hasToken = !!token;

  if (matchRoute({ to: "/login" }) || matchRoute({ to: "/register" }))
    return null;

  const handleAuth = () => {
    if (hasToken) {
      setToken(null);
      navigate({ to: "/" });
    } else {
      navigate({ to: "/login" });
    }
  };

  return (
    <button
      onClick={handleAuth}
      className={`${navigationMenuTriggerStyle()} cursor-pointer font-medium text-destructive hover:bg-destructive/10 hover:text-destructive transition-all`}
    >
      {hasToken ? "Logout" : "Login"}
    </button>
  );
};
