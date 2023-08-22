"use client";

import { FormFieldFactory, FormFieldFactoryType } from "@/components/form";
import { useForm } from "react-hook-form";
import { loginUser } from "../api";

const formFields: Pick<
  FormFieldFactoryType,
  "name" | "fieldType" | "required"
>[] = [
  {
    name: "username",
    fieldType: "text",
    required: true,
  },
  {
    name: "password",
    fieldType: "password",
    required: true,
  },
];

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await loginUser(data);
    reset();
    window.location.href = "/";
  };

  return (
    <form
      className="z-50 flex flex-col items-center justify-center w-full h-full gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formFields.map((field) => (
        <FormFieldFactory
          key={field.name}
          name={field.name}
          errors={errors}
          fieldType={field.fieldType}
          register={register}
          required={field.required}
          valueAsNumber={false}
          textclass="py-4 px-6 rounded-xl caret-red-500 placeholder:text-red-500"
          labelclass="mb-2 text-xl"
        />
      ))}
      <input
        type="submit"
        value="submit"
        className="w-1/2 cursor-pointer add-button"
      />
    </form>
  );
};
