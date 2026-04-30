import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/auth";

const Pages: { path: string; name: string }[] = [
  { path: "/board", name: "Dashboard" },
  { path: "/skills", name: "Skills" },
  { path: "/projects", name: "Projects" },
  { path: "/experiences", name: "Experiences" },
  { path: "/publications", name: "Publications" },
];

export const MainNavigation = () => {
  const { token } = useAuthStore();

  if (!token) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent font-semibold">
            Manage
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-1 p-1 md:grid-cols-2">
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
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const AuthLinkButton = ({ label }: { label: string }) => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const handleAuth = () => {
    switch (label) {
      case "Logout":
        setToken(null);
        navigate({ to: "/" });
        break;
      case "Login":
        navigate({ to: "/login" });
        break;
      case "Register":
        navigate({ to: "/register" });
    }
  };

  return (
    <button
      onClick={handleAuth}
      className={`${navigationMenuTriggerStyle()} cursor-pointer font-medium text-destructive hover:bg-destructive/10 hover:text-destructive transition-all`}
    >
      {label}
    </button>
  );
};

export const AuthLinks = () => {
  const { token } = useAuthStore();
  const matchRoute = useMatchRoute();

  const hasToken = !!token;

  if (matchRoute({ to: "/login" })) return <AuthLinkButton label="Register" />;

  return hasToken ? (
    <AuthLinkButton label="Logout" />
  ) : (
    <AuthLinkButton label="Login" />
  );
};
