import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

import { FieldErrorWrapper, FieldInput } from "@/components/inputfield";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as d from "@/components/ui/dialog";
import * as f from "@/components/ui/field";
import * as s from "@/components/ui/select";
import type { SocialDTO } from "@/types/dto";

import { socialSchema } from "./schema";
import { type SocialFormProps } from "./types";

export const SocialFormGeneric = ({
  initialData,
  onSubmit,
  title,
  description,
  submitLabel,
}: SocialFormProps) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<SocialDTO>({
    resolver: zodResolver(socialSchema),
    values: initialData as SocialDTO,
  });

  const handleInternalSubmit: SubmitHandler<SocialDTO> = async (data) => {
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
      className="space-y-6 flex flex-col"
    >
      <d.DialogHeader>
        <d.DialogTitle className="text-2xl font-bold tracking-tight">
          {title}
        </d.DialogTitle>
        <d.DialogDescription>{description}</d.DialogDescription>
      </d.DialogHeader>
      <f.FieldGroup>
        <FieldInput
          label="socials"
          name="name"
          register={register}
          error={errors.name}
        />
        <FieldInput
          label="socials"
          name="url"
          register={register}
          error={errors.url}
        />
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState }) => (
            <f.Field>
              <f.FieldContent>
                <f.FieldLabel htmlFor="social-type-selector">
                  Social Type
                </f.FieldLabel>
                <f.FieldDescription>
                  Select the type of social from dropdown
                </f.FieldDescription>
                <FieldErrorWrapper error={fieldState.error} />
              </f.FieldContent>
              <s.Select
                id="social-type-selector"
                value={field.value}
                onValueChange={field.onChange}
              >
                <s.SelectTrigger
                  id="social-type-placeholder"
                  aria-invalid={fieldState.invalid}
                >
                  <s.SelectValue placeholder="Select a type" />
                </s.SelectTrigger>
                <s.SelectContent>
                  <s.SelectItem value="linkedin">Linkedin</s.SelectItem>
                  <s.SelectItem value="github">Github</s.SelectItem>
                </s.SelectContent>
              </s.Select>
            </f.Field>
          )}
        />
      </f.FieldGroup>
      <d.DialogFooter className="mt-4">
        <ButtonGroup orientation="horizontal" className="gap-4">
          <d.DialogClose>Cancel</d.DialogClose>
          <Button type="submit" variant="ghost">
            {submitLabel}
          </Button>
        </ButtonGroup>
        {!!error && (
          <p className="text-xs font-medium text-destructive bg-destructive/10 p-2 rounded-md text-center">
            {error}
          </p>
        )}
      </d.DialogFooter>
    </form>
  );
};
