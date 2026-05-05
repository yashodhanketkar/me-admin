import type { AxiosError } from "axios";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

import { useAuth } from "@/store/query/auth";

import AuthFormGeneric from "./form";
import { type IAuthForm } from "./schema";

const LoginPage = () => {
  const [error, setError] = useState("");
  const { useLoginMutation } = useAuth();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    useLoginMutation.mutate(data);
    if (useLoginMutation.isError) {
      const err = (useLoginMutation.error as AxiosError)?.response?.data;
      setError((err as Error)?.message || "Failed to login");
    }
  };

  return (
    <AuthFormGeneric
      onSubmit={onSubmit}
      title="Login"
      description="Enter your email and password to login"
      submitLabel="Login"
      error={error}
      setError={setError}
    />
  );
};

export default LoginPage;
