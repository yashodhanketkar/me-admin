import {
  type FieldError,
  type FieldPath,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";

import * as f from "./ui/field";
import { Input } from "./ui/input";

interface FieldInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export const FieldInput = <T extends FieldValues>({
  name,
  label,
  register,
  error,
}: FieldInputProps<T>) => {
  return (
    <f.Field>
      <f.FieldLabel htmlFor={label + "-" + name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </f.FieldLabel>
      <Input id={`experience-${name}`} {...register(name)} />
      <f.FieldDescription>
        Enter experience {name} {["start", "end"].includes(name) && "date"}
      </f.FieldDescription>
      <FieldErrorWrapper error={error} />
    </f.Field>
  );
};

export const FieldErrorWrapper = ({ error }: { error?: FieldError }) => {
  if (!error) return null;
  return (
    <f.FieldDescription className="text-red-500">
      {error.message}
    </f.FieldDescription>
  );
};
