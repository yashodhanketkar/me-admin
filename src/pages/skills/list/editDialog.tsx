import { type SubmitHandler, useForm } from "react-hook-form";

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
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSkillsQuery } from "@/store/query/skill";
import type { Skill } from "@/types/types";

type SkillUdpate = {
  name: string;
};

export const SkillNameEdit = ({
  skills,
  name,
  open,
  toggleOpen,
}: {
  skills: Skill[];
  name: string;
  open: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateSkillMutation } = useSkillsQuery();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SkillUdpate>({
    defaultValues: { name: name },
  });

  const handleEdit: SubmitHandler<SkillUdpate> = (data) => {
    if (data.name === name) {
      setError("name", { message: "Please enter new name" });
      return;
    }

    const toUpdate = skills.filter((it) => it.name === name)[0];
    updateSkillMutation.mutate({
      id: toUpdate.id,
      payload: { ...toUpdate, name: data.name },
    });
  };

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Name</DialogTitle>
          <DialogDescription>Change the name of {name} skill</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEdit)}>
          <Field className="mb-4">
            <FieldLabel>Name</FieldLabel>
            <Input {...register("name")} />
            {errors.name && (
              <FieldDescription className="text-red-500">
                {errors.name.message}
              </FieldDescription>
            )}
          </Field>
          <DialogFooter>
            <ButtonGroup orientation="horizontal" style={{ gap: "1rem" }}>
              <Button type="submit" variant="ghost">
                Edit
              </Button>
              <DialogClose>Cancel</DialogClose>
            </ButtonGroup>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
