import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type {
  FieldError,
  FieldPath,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as d from "@/components/ui/dialog";
import * as f from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { projectSchema } from "./schema";
import {
  type LinksFieldProps,
  type ProjectDTO,
  type ProjectFormProps,
} from "./types";

export const ProjectFormGeneric = ({
  initialData,
  onSubmit,
  title,
  description,
  submitLabel,
}: ProjectFormProps) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProjectDTO>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || { links: [] },
  });

  const handleInternalSubmit: SubmitHandler<ProjectDTO> = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (e) {
      setError("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleInternalSubmit)}
      onChange={() => setError("")}
      className="space-y-6"
    >
      <d.DialogHeader>
        <d.DialogTitle className="text-2xl font-bold tracking-tight">
          {title}
        </d.DialogTitle>
        <d.DialogDescription>{description}</d.DialogDescription>
      </d.DialogHeader>
      <f.FieldGroup>
        <FieldInput name="name" register={register} error={errors.name} />
        <FieldInput
          name="description"
          register={register}
          error={errors.description}
        />
        <FieldInput name="start" register={register} error={errors.start} />
        <FieldInput name="end" register={register} error={errors.end} />
        <FieldInput name="source" register={register} error={errors.source} />
        <LinksField control={control} register={register} errors={errors} />
        <f.Field orientation="horizontal">
          <f.FieldContent>
            <f.FieldLabel htmlFor="project-featured">Featured</f.FieldLabel>
            <f.FieldDescription>
              Select if the project is featured
            </f.FieldDescription>
            <FieldError error={errors.featured} />
          </f.FieldContent>
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <Switch
                id="project-featured"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </f.Field>
      </f.FieldGroup>
      <d.DialogFooter className="mt-4">
        <ButtonGroup orientation="horizontal" className="gap-4">
          <d.DialogClose>Cancel</d.DialogClose>
          <Button type="submit" variant="ghost">
            {submitLabel}
          </Button>
        </ButtonGroup>
      </d.DialogFooter>
      {!!error && (
        <p className="text-xs font-medium text-destructive bg-destructive/10 p-2 rounded-md text-center">
          {error}
        </p>
      )}
    </form>
  );
};

const FieldError = ({ error }: { error?: FieldError }) => {
  if (!error) return null;
  return (
    <f.FieldDescription className="text-red-500">
      {error.message}
    </f.FieldDescription>
  );
};

const LinksField = ({
  control,
  register,
  errors,
}: LinksFieldProps<ProjectDTO>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex gap-2">
            <Input {...register(`links.${index}.value` as const)} />
            <Button size="icon" type="button" onClick={() => remove(index)}>
              <Trash2 />
            </Button>
          </div>
          <FieldError error={errors.links?.[index]?.value} />
        </div>
      ))}
      <Button size="icon" type="button" onClick={() => append({ value: "" })}>
        <Plus />
      </Button>
    </div>
  );
};

interface FieldInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

const FieldInput = ({ name, register, error }: FieldInputProps<ProjectDTO>) => {
  return (
    <f.Field>
      <f.FieldLabel htmlFor="project-source">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </f.FieldLabel>
      <Input id={`project-${name}`} {...register(name)} />
      <f.FieldDescription>
        Enter project {name} {["start", "end"].includes(name) && "date"}
      </f.FieldDescription>
      <FieldError error={error} />
    </f.Field>
  );
};
