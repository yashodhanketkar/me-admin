import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import type { ProjectDTO as RawDTO } from "@/types";

export interface ProjectDTO extends Omit<RawDTO, "links"> {
  links: { value: string }[];
}

export interface ProjectFormProps {
  initialData?: Partial<ProjectDTO>;
  onSubmit: (data: ProjectDTO) => Promise<void>;
  title: string;
  description: string;
  submitLabel: string;
}

export interface LinksFieldProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
