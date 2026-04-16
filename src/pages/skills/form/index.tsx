import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
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
    formState: { errors },
  } = useForm<SkillDTO>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", category: "", customCategory: "" },
  });

  const { getSkillsQuery, createSkillMutation } = useSkillsQuery();
  const { data, isLoading, isError } = getSkillsQuery;
  const [error, setError] = useState("");
  let dict: SkillDict = [];

  const selectedCategory = watch("category");
  const isCustom = selectedCategory === "Custom";
  console.log(selectedCategory);

  if (!isLoading && !isError && data) {
    dict = skillFormatter(data);
  }

  const onSubmit: SubmitHandler<SkillDTO> = async (data) => {
    createSkillMutation.mutate(data);
    if (createSkillMutation.status) setError("Failed to create skill");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="fixed font-bold bottom-20 right-10 bg-zinc-800 text-zinc-50 p-2 rounded-full">
          {"[+]"}
        </p>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} onChange={() => setError("")}>
          <DialogHeader>
            <DialogTitle>Skills</DialogTitle>
            <DialogDescription>Add your skills</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <SelectCategory
              register={register}
              dict={dict}
              errors={errors}
              isCustom={isCustom}
              setValue={setValue}
            />
            <InputName register={register} errors={errors} />
            {!!error && <p className="text-red-500 p-1 text-center">{error}</p>}
          </FieldGroup>
          <DialogFooter>
            <ButtonGroup orientation="horizontal" style={{ gap: "1rem" }}>
              <Button type="submit" variant="outline">
                Create
              </Button>
              <DialogClose>Cancel</DialogClose>
            </ButtonGroup>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
