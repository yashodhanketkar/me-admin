import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  type RouteComponent,
  useMatches,
} from "@tanstack/react-router";
import Cookies from "js-cookie";
import { ThemeProvider } from "next-themes";
import { useEffect, useLayoutEffect } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

import { TooltipProvider } from "./components/ui/tooltip";
import {
  BoardPage,
  EducationsPage,
  ExperiencesPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProjectsPage,
  PublicationsPage,
  RegisterPage,
  SkillsPage,
  SocialsPage,
} from "./pages";
import { HotkeysProvider } from "./providers/hotkeys";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    title?: string;
  }
}

interface RouteConfig {
  path: string;
  component: RouteComponent;
  title: string;
}

const unProtectedRouteConfigs: RouteConfig[] = [
  { path: "/login", component: LoginPage, title: "Login" },
  { path: "/register", component: RegisterPage, title: "Register" },
];

const protectedRouteConfigs: RouteConfig[] = [
  { path: "/board", component: BoardPage, title: "Dashboard" },
  { path: "/home", component: HomePage, title: "Home" },
  { path: "/skills", component: SkillsPage, title: "Skills" },
  { path: "/projects", component: ProjectsPage, title: "Projects" },
  { path: "/experiences", component: ExperiencesPage, title: "Experiences" },
  { path: "/publications", component: PublicationsPage, title: "Publications" },
  { path: "/socials", component: SocialsPage, title: "Socials" },
  { path: "/educations", component: EducationsPage, title: "Education" },
];

const rootRoute = createRootRoute({
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
});

const unProtectedRoutesFactory = (config: RouteConfig) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: config.path,
    component: config.component,
    staticData: { title: config.title },
    beforeLoad: () => {
      const token = Cookies.get("token");
      if (token) throw redirect({ to: "/home" });
    },
  });

const protectedRoutesFactory = (config: RouteConfig) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: config.path,
    component: config.component,
    staticData: { title: config.title },
    beforeLoad: () => {
      const token = Cookies.get("token");
      if (!token) throw redirect({ to: "/login" });
    },
  });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const unProtectedRoute = unProtectedRouteConfigs.map((config) => {
  return unProtectedRoutesFactory(config);
});

const protectedRoutes = protectedRouteConfigs.map((config) => {
  return protectedRoutesFactory(config);
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    ...unProtectedRoute,
    ...protectedRoutes,
  ]),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const matches = useMatches();

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light", "system");
    root.classList.add(localStorage.getItem("theme") || "dark");
  }, []);

  useEffect(() => {
    const lastMatch = [...matches].reverse().find((d) => d.staticData?.title);
    const title = lastMatch?.staticData?.title;

    document.title = title ? title : "Yashodhan | Admin";
  }, [matches]);

  return (
    <HotkeysProvider>
      <TooltipProvider>
        <ThemeProvider>
          <div className="w-screen min-h-screen flex flex-col justify-between">
            <Header />
            <main className="container mt-4 mb-auto mx-auto">
              {children}
              <Toaster position="top-center" />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </TooltipProvider>
    </HotkeysProvider>
  );
}
