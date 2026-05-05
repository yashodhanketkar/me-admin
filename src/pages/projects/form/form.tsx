import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

import {
  FieldErrorWrapper,
  FieldInput,
  LinksField,
} from "@/components/inputfield";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as d from "@/components/ui/dialog";
import * as f from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

import { projectSchema } from "./schema";
import { type ProjectDTO, type ProjectFormProps } from "./types";

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
    values: initialData as ProjectDTO,
  });

  const handleInternalSubmit: SubmitHandler<ProjectDTO> = async (data) => {
    try {
      await onSubmit(data);
      if (!initialData) reset();
      reset();
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleInternalSubmit)}
      onChange={() => setError("")}
      className="space-y-6 max-h-[82vh] flex flex-col"
    >
      <d.DialogHeader>
        <d.DialogTitle className="text-2xl font-bold tracking-tight">
          {title}
        </d.DialogTitle>
        <d.DialogDescription>{description}</d.DialogDescription>
      </d.DialogHeader>
      <ScrollArea className="flex-1 min-h-0 pr-4">
        <f.FieldGroup>
          <FieldInput
            label="projects"
            name="name"
            register={register}
            error={errors.name}
          />
          <FieldInput
            label="projects"
            name="description"
            fType="textarea"
            register={register}
            error={errors.description}
          />
          <FieldInput
            label="projects"
            name="start"
            register={register}
            error={errors.start}
          />
          <FieldInput
            label="projects"
            name="end"
            register={register}
            error={errors.end}
          />
          <FieldInput
            label="projects"
            name="source"
            register={register}
            error={errors.source}
          />
          <LinksField
            name="links"
            control={control}
            register={register}
            errors={errors}
          />
          <f.Field orientation="horizontal">
            <f.FieldContent>
              <f.FieldLabel htmlFor="project-featured">Featured</f.FieldLabel>
              <f.FieldDescription>
                Select if the project is featured
              </f.FieldDescription>
              <FieldErrorWrapper error={errors.featured} />
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
      </ScrollArea>
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
