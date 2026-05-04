import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import type { ExperienceDTO } from "@/types";

export interface ExperienceFormProps {
  initialData?: Partial<ExperienceDTO>;
  onSubmit: (data: ExperienceDTO) => Promise<void>;
  title: string;
  description: string;
  submitLabel: string;
}

export interface LinksFieldProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
