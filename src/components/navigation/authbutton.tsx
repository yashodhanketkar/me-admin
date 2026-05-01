import { useMatchRoute, useNavigate } from "@tanstack/react-router";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/auth";

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
