import {
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SkillDTO } from "@/types/dto";

import type { SkillDict } from "../common";

interface ISelectCategoryProps {
  register: UseFormRegister<SkillDTO>;
  dict: SkillDict;
  errors: FieldErrors<SkillDTO>;
  isCustom: boolean;
  setValue: UseFormSetValue<SkillDTO>;
}

export const SelectCategory = ({
  register,
  dict,
  errors,
  isCustom,
  setValue,
}: ISelectCategoryProps) => {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="skill-category">Category</FieldLabel>
        <Select
          id="skill-category"
          onValueChange={(value) => setValue("category", value!)}
          defaultValue=""
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="Custom">Custom</SelectItem>
              {dict.map(({ category }) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.category && (
          <FieldDescription className="text-red-500">
            {errors.category.message}
          </FieldDescription>
        )}
      </Field>
      {isCustom && (
        <Field>
          <FieldLabel htmlFor="skill-custom-category">
            Custom Category
          </FieldLabel>
          <Input id="skill-custom-category" {...register("customCategory")} />
          {errors.customCategory && (
            <FieldDescription className="text-red-500">
              {errors.customCategory.message}
            </FieldDescription>
          )}
        </Field>
      )}
    </>
  );
};
