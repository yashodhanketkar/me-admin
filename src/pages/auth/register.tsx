import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

import { useAuth } from "@/store/query/auth";

import AuthFormGeneric from "./form";
import { type IAuthForm } from "./schema";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const { useRegisterMutation } = useAuth();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    useRegisterMutation.mutate(data);
    if (useRegisterMutation.status) setError("Failed to register");
  };

  return (
    <AuthFormGeneric
      onSubmit={onSubmit}
      title="Register"
      description="Enter your email and password to register"
      submitLabel="Register"
      error={error}
      setError={setError}
      haveAccount
    />
  );
};

export default RegisterPage;
