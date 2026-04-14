import z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(33, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Must contain uppercase, lowercase, and number",
    ),
});

export type IAuthForm = z.infer<typeof authSchema>;
