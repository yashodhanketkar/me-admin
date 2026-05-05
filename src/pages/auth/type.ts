import type { SubmitHandler } from "react-hook-form";

import type { IAuthForm } from "./schema";

export interface AuthFormGenericProps {
  onSubmit: SubmitHandler<IAuthForm>;
  title: string;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  submitLabel: string;
  haveAccount?: boolean;
}
