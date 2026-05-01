import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import type { SocialDTO } from "@/types/dto";

export interface SocialFormProps {
  initialData?: Partial<SocialDTO>;
  onSubmit: (data: SocialDTO) => Promise<void>;
  title: string;
  description: string;
  submitLabel: string;
}

export interface LinksFieldProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
