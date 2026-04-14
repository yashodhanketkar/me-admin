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
];

export const MainNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
          <NavigationMenuContent>
            {Pages.map((page) => (
              <NavigationMenuLink key={page.path + page.name}>
                <Link to={page.path}>{page.name}</Link>
              </NavigationMenuLink>
            ))}
            <AuthLinsk />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const AuthLinsk = () => {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();

  const setToken = useAuthStore((s) => s.setToken);
  const hasToken = useAuthStore((s) => !!s.token);

  if (matchRoute({ to: "/login" }) || matchRoute({ to: "/register" }))
    return null;

  const handleLogout = () => {
    setToken(null);
    navigate({ to: "/" });
  };

  const handleLogin = () => {
    navigate({ to: "/login" });
  };

  return (
    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
      {hasToken ? (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/login" onClick={handleLogin}>
          Login
        </Link>
      )}
    </NavigationMenuLink>
  );
};
