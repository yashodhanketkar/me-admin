import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  type Control,
  Controller,
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type SubmitHandler,
  useFieldArray,
  useForm,
  type UseFormRegister,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useProjectsQuery } from "@/store/query/project";
import type { ProjectDTO as RawDTO } from "@/types/dto";

import { projectSchema } from "./schema";

interface ProjectDTO extends Omit<RawDTO, "links"> {
  links: { value: string }[];
}

export const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProjectDTO>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      featured: false,
    },
  });

  const [open, setOpen] = useState(false);

  const { createProjectMutation } = useProjectsQuery();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<ProjectDTO> = async (data) => {
    const newProject = { ...data, links: data.links.map((l) => l.value) };
    createProjectMutation.mutate({ ...newProject });
    if (createProjectMutation.isError) setError("Failed to create skill");
    else reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="icon"
        className="fixed bottom-10 right-10 h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
        title="Add Project"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => setError("")}
          className="space-y-6"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Skills
            </DialogTitle>
            <DialogDescription>Add your skills</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="project-name">Name</FieldLabel>
              <Input id="project-name" {...register("name")} />
              <FieldDescription>Enter a project name</FieldDescription>
              <FieldError error={errors.name} />
            </Field>

            <Field>
              <FieldLabel htmlFor="project-description">Description</FieldLabel>
              <Input id="project-description" {...register("description")} />
              <FieldDescription>Enter a project description</FieldDescription>
              <FieldError error={errors.description} />
            </Field>

            <Field>
              <FieldLabel htmlFor="project-start">Start</FieldLabel>
              <Input id="project-start" {...register("start")} />
              <FieldDescription>Enter a project start date</FieldDescription>
              <FieldError error={errors.start} />
            </Field>

            <Field>
              <FieldLabel htmlFor="project-end">End</FieldLabel>
              <Input id="project-end" {...register("end")} />
              <FieldDescription>Enter a project end date</FieldDescription>
              <FieldError error={errors.end} />
            </Field>

            <Field>
              <FieldLabel htmlFor="project-source">Source</FieldLabel>
              <Input id="project-source" {...register("source")} />
              <FieldDescription>Enter a project source</FieldDescription>
              <FieldError error={errors.source} />
            </Field>

            <LinksField control={control} register={register} errors={errors} />

            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="project-featured">Featured</FieldLabel>
                <FieldDescription>
                  Select if the project is featured
                </FieldDescription>
                <FieldError error={errors.featured} />
              </FieldContent>
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
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <ButtonGroup orientation="horizontal" className="gap-4">
              <DialogClose>Cancel</DialogClose>
              <Button type="submit" variant="ghost">
                Create
              </Button>
            </ButtonGroup>
          </DialogFooter>
          {!!error && (
            <p className="text-xs font-medium text-destructive bg-destructive/10 p-2 rounded-md text-center">
              {error}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FieldError = ({ error }: { error?: FieldError }) => {
  if (!error) return null;
  return (
    <FieldDescription className="text-red-500">
      {error.message}
    </FieldDescription>
  );
};

interface LinksFieldProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

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
