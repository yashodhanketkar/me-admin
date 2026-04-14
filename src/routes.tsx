import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  type RouteComponent,
} from "@tanstack/react-router";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import BoardPage from "./pages/board";
import HomePage from "./pages/home";
import SkillsPage from "./pages/skills";

const unProtectedRouteConfigs: RouteConfig[] = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

const protectedRouteConfigs: RouteConfig[] = [
  { path: "/board", component: BoardPage },
  { path: "/skills", component: SkillsPage },
];

const rootRoute = createRootRoute({
  shellComponent: RootDocument,
});

interface RouteConfig {
  path: string;
  component: RouteComponent;
}

const unProtectedRoutesFactory = (path: string, component: RouteComponent) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: path,
    component: component,
    beforeLoad: () => {
      const token = localStorage.getItem("token");
      if (token) throw redirect({ to: "/board" });
    },
  });

const protectedRoutesFactory = (path: string, component: RouteComponent) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: path,
    component: component,
    beforeLoad: () => {
      const token = localStorage.getItem("token");
      if (!token) throw redirect({ to: "/login" });
    },
  });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const unProtectedRoute = unProtectedRouteConfigs.map((config) => {
  return unProtectedRoutesFactory(config.path, config.component);
});

const protectedRoutes = protectedRouteConfigs.map((config) => {
  return protectedRoutesFactory(config.path, config.component);
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    ...unProtectedRoute,
    ...protectedRoutes,
  ]),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-between">
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
}
