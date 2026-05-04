import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { FieldInput } from "@/components/inputfield";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as d from "@/components/ui/dialog";
import * as f from "@/components/ui/field";
import type { EducationDTO } from "@/types";

import { educationSchema } from "./schema";
import { type EducationFormProps } from "./types";

export const EducationFormGeneric = ({
  initialData,
  onSubmit,
  title,
  description,
  submitLabel,
}: EducationFormProps) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EducationDTO>({
    resolver: zodResolver(educationSchema),
    values: initialData as EducationDTO,
  });

  const handleInternalSubmit: SubmitHandler<EducationDTO> = async (data) => {
    try {
      await onSubmit(data);
      if (!initialData) reset();
    } catch (e) {
      setError("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleInternalSubmit)}
      onChange={() => setError("")}
      className="space-y-6 max-h-[82vh]"
    >
      <d.DialogHeader>
        <d.DialogTitle className="text-2xl font-bold tracking-tight">
          {title}
        </d.DialogTitle>
        <d.DialogDescription>{description}</d.DialogDescription>
      </d.DialogHeader>
      <f.FieldGroup>
        <FieldInput
          label="educations"
          name="degree"
          register={register}
          error={errors.degree}
        />
        <FieldInput
          label="educations"
          name="unviersity"
          register={register}
          error={errors.unviersity}
        />
        <FieldInput
          label="educations"
          name="heading"
          fType="textarea"
          register={register}
          error={errors.heading}
        />
        <FieldInput
          label="educations"
          name="grades"
          register={register}
          error={errors.grades}
        />
        <FieldInput
          label="educations"
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
