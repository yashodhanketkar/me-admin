import { Plus, Trash2 } from "lucide-react";
import {
  type ArrayPath,
  type Control,
  type FieldError,
  type FieldErrors,
  type FieldPath,
  type FieldValue,
  type FieldValues,
  get,
  type Path,
  useFieldArray,
  type UseFormRegister,
} from "react-hook-form";

import { Button } from "./ui/button";
import * as f from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface FieldInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  fType?: "input" | "textarea";
}

export const FieldInput = <T extends FieldValues>({
  name,
  label,
  fType = "input",
  register,
  error,
}: FieldInputProps<T>) => {
  return (
    <f.Field>
      <f.FieldLabel htmlFor={label + "-" + name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </f.FieldLabel>
      {fType === "input" ? (
        <Input id={`experience-${name}`} {...register(name)} />
      ) : (
        <Textarea rows={3} id={`experience-${name}`} {...register(name)} />
      )}
      <f.FieldDescription>
        Enter {`${label} 's ${name} `}
        {["start", "end"].includes(name) && "date"}
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

export interface LinksFieldProps<T extends FieldValues> {
  name: ArrayPath<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export const LinksField = <T extends FieldValues>({
  name,
  control,
  register,
  errors,
}: LinksFieldProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <f.Field>
      <f.FieldLabel htmlFor={name + "-text-array"}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </f.FieldLabel>
      <div className="space-y-4">
        {fields.map((field, index) => {
          const fieldError = get(errors, `${name}.${index}.value`);
          return (
            <div key={field.id}>
              <div className="flex gap-2">
                <Input {...register(`${name}.${index}.value` as Path<T>)} />
                <Button size="icon" type="button" onClick={() => remove(index)}>
                  <Trash2 />
                </Button>
              </div>
              <FieldErrorWrapper error={fieldError} />
            </div>
          );
        })}
        <Button
          size="icon"
          type="button"
          onClick={() => append({ value: "" } as FieldValue<T>)}
        >
          <Plus />
        </Button>
      </div>
    </f.Field>
  );
};
