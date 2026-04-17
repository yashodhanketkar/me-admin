import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldLabel } from "@/components/ui/field";
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="tracking-tight text-xl">
            Edit Skill
          </DialogTitle>
          <DialogDescription>
            Rename <span className="font-bold text-foreground">{name}</span>.
            This will update it across all projects.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEdit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <FieldLabel className="text-xs font-bold uppercase tracking-wider">
              Skill Name
            </FieldLabel>
            <Input
              {...register("name")}
              className={
                errors.name
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.name && (
              <p className="text-[12px] font-medium text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <div className="flex gap-2 justify-end w-full">
              <Button
                type="button"
                variant="ghost"
                onClick={() => toggleOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
