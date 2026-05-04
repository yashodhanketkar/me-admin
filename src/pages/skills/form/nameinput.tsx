import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { SkillDTO } from "@/types";

interface InputNameProps {
  register: UseFormRegister<SkillDTO>;
  errors: FieldErrors<SkillDTO>;
}

export const InputName = ({ register, errors }: InputNameProps) => {
  return (
    <Field>
      <FieldLabel htmlFor="skill-name">Name</FieldLabel>
      <Input id="skill-name" {...register("name")} />
      {errors.name && (
        <FieldDescription className="text-red-500">
          {errors.name.message}
        </FieldDescription>
      )}
    </Field>
  );
};
