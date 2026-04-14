import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authSchema, type IAuthForm } from "@/features/auth";
import { useAuth } from "@/store/query/auth";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const [error, setError] = useState("");
  const { useRegisterMutation } = useAuth();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    useRegisterMutation.mutate(data);
    if (useRegisterMutation.status) setError("Failed to register");
  };

  return (
    <div className="w-11/12 lg:w-1/3 rounded-xl mx-auto mt-[25%] lg:translate-y-[-50%]">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your email and password to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} onChange={() => setError("")}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input type="text" {...register("email")} required />
              </Field>
              {errors.email && (
                <FieldDescription className="text-red-500">
                  {errors.email.message}
                </FieldDescription>
              )}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input type="password" {...register("password")} required />
              </Field>
              {errors.password && (
                <FieldDescription className="text-red-500">
                  {errors.password.message}
                </FieldDescription>
              )}
              <Field>
                <Button type="submit">
                  <AiOutlineUserAdd /> Register
                </Button>
              </Field>
              {!!error && (
                <p className="text-red-500 p-1 text-center">{error}</p>
              )}
            </FieldGroup>
            <FieldDescription className="text-center">
              <Link to="/login">Already have an account?</Link>
            </FieldDescription>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
