import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { FieldInput } from "@/components/inputfield";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as d from "@/components/ui/dialog";
import * as f from "@/components/ui/field";
import type { ExperienceDTO } from "@/types/dto";

import { experienceSchema } from "./schema";
import { type ExperienceFormProps } from "./types";

export const ExperienceFormGeneric = ({
  initialData,
  onSubmit,
  title,
  description,
  submitLabel,
}: ExperienceFormProps) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExperienceDTO>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData,
  });

  const handleInternalSubmit: SubmitHandler<ExperienceDTO> = async (data) => {
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
        <FieldInput
          label="experience"
          name="name"
          register={register}
          error={errors.name}
        />
        <FieldInput
          label="experience"
          name="company"
          register={register}
          error={errors.company}
        />
        <FieldInput
          label="experience"
          name="description"
          register={register}
          error={errors.description}
        />
        <FieldInput
          label="experience"
          name="start"
          register={register}
          error={errors.start}
        />
        <FieldInput
          label="experience"
          name="end"
          register={register}
          error={errors.end}
        />
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
