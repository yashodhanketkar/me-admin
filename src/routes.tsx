import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  type RouteComponent,
} from "@tanstack/react-router";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import BoardPage from "./pages/board";
import ExperiencesPage from "./pages/experience";
import HomePage from "./pages/home";
import ProjectsPage from "./pages/projects";
import PublicationsPage from "./pages/publication";
import SkillsPage from "./pages/skills";

const unProtectedRouteConfigs: RouteConfig[] = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

const protectedRouteConfigs: RouteConfig[] = [
  { path: "/board", component: BoardPage },
  { path: "/home", component: HomePage },
  { path: "/skills", component: SkillsPage },
  { path: "/projects", component: ProjectsPage },
  { path: "/experiences", component: ExperiencesPage },
  { path: "/publications", component: PublicationsPage },
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
      if (token) throw redirect({ to: "/home" });
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
      <main className="container mt-4 mb-auto mx-auto">
        {children}
        <Toaster position="top-center" />
      </main>
      <Footer />
    </div>
  );
}
