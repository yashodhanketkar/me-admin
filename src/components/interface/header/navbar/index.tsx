"use client";

import { Link } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { navs } from "./navs";

export const NavBar = () => {
  const pathname = usePathname();

  return navs.map((nav) => (
    <Link
      key={nav.path}
      sx={{
        ":hover": {
          ":first-letter": {
            fontWeight: 700,
            color: "red",
          },
        },
        color: nav.path === pathname ? "red" : "white",
        textDecoration: "none",
      }}
      component={NextLink}
      href={nav.path}
    >
      {nav.name}
    </Link>
  ));
};
