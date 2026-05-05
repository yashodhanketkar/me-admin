import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";

import { FieldErrorWrapper } from "@/components/inputfield";
import { Button } from "@/components/ui/button";
import * as c from "@/components/ui/card";
import * as f from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { authSchema, type IAuthForm } from "./schema";
import type { AuthFormGenericProps } from "./type";

const AuthFormGeneric = ({
  onSubmit,
  title,
  error,
  setError,
  description,
  submitLabel,
  haveAccount = false,
}: AuthFormGenericProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="w-11/12 lg:w-1/3 rounded-xl mx-auto mt-[25%] lg:translate-y-[-50%]">
      <c.Card>
        <c.CardHeader>
          <c.CardTitle>{title}</c.CardTitle>
          <c.CardDescription>{description}</c.CardDescription>
        </c.CardHeader>
        <c.CardContent>
          <form onSubmit={handleSubmit(onSubmit)} onChange={() => setError("")}>
            <f.FieldGroup>
              <f.Field>
                <f.FieldLabel htmlFor="email">Email</f.FieldLabel>
                <Input type="text" {...register("email")} required />
              </f.Field>
              <FieldErrorWrapper error={errors.email} />
              <f.Field>
                <f.FieldLabel htmlFor="password">Password</f.FieldLabel>
                <Input type="password" {...register("password")} required />
              </f.Field>
              <FieldErrorWrapper error={errors.password} />
              <f.Field>
                <Button type="submit">
                  <AiOutlineUser /> {submitLabel}
                </Button>
              </f.Field>
              {!!error && (
                <p className="text-red-500 p-1 text-center">{error}</p>
              )}
            </f.FieldGroup>
            <f.FieldDescription className="text-center">
              {haveAccount ? (
                <Link to="/login">Already have an account?</Link>
              ) : (
                <Link to="/register">Don't have an account?</Link>
              )}
            </f.FieldDescription>
          </form>
        </c.CardContent>
      </c.Card>
    </div>
  );
};

export default AuthFormGeneric;
