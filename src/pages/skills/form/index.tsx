import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { NewButton } from "@/components/addbutton";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as d from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useSkillsQuery } from "@/store/query/skill";
import type { SkillDTO } from "@/types";

import { type SkillDict, skillFormatter } from "../common";
import { SelectCategory } from "./categoryselector";
import { InputName } from "./nameinput";
import { skillSchema } from "./schema";

export const SkillsForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SkillDTO>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", category: "" },
  });

  const { getSkillsQuery, createSkillMutation } = useSkillsQuery();
  const { data, isLoading, isError } = getSkillsQuery;
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  let dict: SkillDict = [];

  const selectedCategory = watch("category");
  const isCustom = selectedCategory === "Custom";

  if (!isLoading && !isError && data) {
    dict = skillFormatter(data);
  }

  const onSubmit: SubmitHandler<SkillDTO> = async (data) => {
    createSkillMutation.mutate(data);
    if (createSkillMutation.isError) setError("Failed to create skill");
    else reset();
  };

  return (
    <d.Dialog open={open} onOpenChange={setOpen}>
      <NewButton title="Add Skill" setOpen={setOpen} />
      <d.DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => setError("")}
          className="space-y-6"
        >
          <d.DialogHeader>
            <d.DialogTitle className="text-2xl font-bold tracking-tight">
              Skills
            </d.DialogTitle>
            <d.DialogDescription>Add your skills</d.DialogDescription>
          </d.DialogHeader>
          <FieldGroup className="space-y-4 py-2">
            <SelectCategory
              register={register}
              dict={dict}
              errors={errors}
              isCustom={isCustom}
              setValue={setValue}
            />
            <InputName register={register} errors={errors} />
            {!!error && (
              <p className="text-xs font-medium text-destructive bg-destructive/10 p-2 rounded-md text-center">
                {error}
              </p>
            )}
          </FieldGroup>
          <d.DialogFooter className="mt-4">
            <ButtonGroup orientation="horizontal" className="gap-4">
              <d.DialogClose>Cancel</d.DialogClose>
              <Button type="submit" variant="ghost">
                Create
              </Button>
            </ButtonGroup>
          </d.DialogFooter>
        </form>
      </d.DialogContent>
    </d.Dialog>
  );
};
