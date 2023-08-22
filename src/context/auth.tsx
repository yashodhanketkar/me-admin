"use client";

import { AuthLoadingScreen } from "@/components/loading";
import { API } from "@/lib/config";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const defaultUser = {
  user: "",
  role: "",
};

const AuthContext = createContext({
  authState: defaultUser,
  isUserAuthenticated: false,
});

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState(defaultUser);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getAuthState = async () => {
      await fetch(API + "auth", { method: "POST", cache: "no-store" })
        .then((res) => res.json())
        .then((res) => res.result[0])
        .then((res) => {
          if (!res) throw new Error("User not logged in");
          setAuthState(res);
          setIsUserAuthenticated(true);
        })
        .catch((err) => router.push("/login"));
      setLoading(false);
    };
    getAuthState();
  }, [router]);

  if (loading) return <AuthLoadingScreen />;

  if (isUserAuthenticated) {
    return (
      <>
        <AuthContext.Provider
          value={{
            authState,
            isUserAuthenticated,
          }}
        >
          {children}
        </AuthContext.Provider>
      </>
    );
  }
};

export { AuthContext, AuthWrapper };
