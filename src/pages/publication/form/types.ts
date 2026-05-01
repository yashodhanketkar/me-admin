import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import type { PublicationDTO as RawDTO } from "@/types/dto";

export interface PublicationDTO extends Omit<RawDTO, "authors"> {
  authors: { value: string }[];
}

export interface PublicationFormProps {
  initialData?: Partial<PublicationDTO>;
  onSubmit: (data: PublicationDTO) => Promise<void>;
  title: string;
  description: string;
  submitLabel: string;
}

export interface LinksFieldProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
