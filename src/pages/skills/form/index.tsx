import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as d from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useSkillsQuery } from "@/store/query/skill";
import type { SkillDTO } from "@/types/dto";

import { type SkillDict, skillFormatter } from "../common";
import { SelectCategory } from "./categoryselector";
import { skillSchema } from "./form";
import { InputName } from "./nameinput";

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
    <d.Dialog>
      <d.DialogTrigger>
        <Button
          size="icon"
          className="fixed bottom-10 right-10 h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
          title="Add skill"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </d.DialogTrigger>
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
