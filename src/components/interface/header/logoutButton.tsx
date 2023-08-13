"use client";

import { checkAuth, logoutUser } from "@/app/(auth)/api";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const LogoutButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    checkAuth().then((res) => {
      if (res) setIsVisible(true);
    });
  }, []);

  return (
    <Button
      variant="outlined"
      sx={{
        backgroundColor: "error.main",
        color: "error.main",
        padding: 0,
        textTransform: "none",
        borderColor: "error.main",
        display: isVisible ? "block" : "none",
        "&:hover": {
          borderColor: "error.dark",
          backgroundColor: "error.dark",
          color: "white",
        },
      }}
      onClick={async () => {
        await logoutUser();
        window.location.href = "/";
      }}
    >
      Logout
    </Button>
  );
};
