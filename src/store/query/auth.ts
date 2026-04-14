import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { login, register } from "@/api/auth";

import { useAuthStore } from "../auth";

export const useAuth = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  const useLoginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.status === 200) {
        console.log("Login success");
        setToken(res.data.token);
        navigate({ to: "/board" });
      }
    },
    onError: (err: Error) => {
      console.log("Login failed: ", err.message);
    },
  });

  const useRegisterMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  return {
    useLoginMutation,
    useRegisterMutation,
  };
};
