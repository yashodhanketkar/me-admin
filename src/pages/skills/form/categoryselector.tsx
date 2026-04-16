import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import {
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  dict,
  errors,
  setValue,
  register,
}: ISelectCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Field>
      <FieldLabel>Category</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            <input
              {...register("category")}
              className="bg-transparent outline-none w-full text-left"
              placeholder="Select or type a category..."
            />
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search category..."
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-blue-600"
                  onClick={() => {
                    setValue("category", searchValue);
                    setOpen(false);
                  }}
                >
                  + Create "{searchValue}"
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {dict.map((item) => (
                  <CommandItem
                    key={item.category}
                    value={item.category}
                    onSelect={(currentValue) => {
                      setValue("category", currentValue);
                      setOpen(false);
                    }}
                  >
                    {item.category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {errors.category && (
        <FieldDescription className="text-red-500">
          {errors.category.message}
        </FieldDescription>
      )}
    </Field>
  );
};
