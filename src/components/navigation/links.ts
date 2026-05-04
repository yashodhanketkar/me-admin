import type { NavPage } from "./types";

export const HomePages: NavPage[] = [
  { serial: 1, path: "/home", name: "Home" },
  { serial: 2, path: "/board", name: "Dashboard" },
];

export const ManagePages: NavPage[] = [
  { serial: 1, path: "/projects", name: "Projects" },
  { serial: 2, path: "/skills", name: "Skills" },
  { serial: 3, path: "/publications", name: "Publications" },
  { serial: 4, path: "/educations", name: "Education" },
  { serial: 5, path: "/experiences", name: "Experiences" },
  { serial: 6, path: "/socials", name: "Social" },
];
