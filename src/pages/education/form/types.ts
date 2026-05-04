import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import type { EducationDTO } from "@/types";

export interface EducationFormProps {
  initialData?: Partial<EducationDTO>;
  onSubmit: (data: EducationDTO) => Promise<void>;
  title: string;
  description: string;
  submitLabel: string;
}

export interface LinksFieldProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
