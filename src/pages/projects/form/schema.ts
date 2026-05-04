import z from "zod";

const dateValidator = z.string().superRefine((val, ctx) => {
  if (val) {
    const result = z
      .string()
      .regex(/^\d{1,2}\/\d{1,2}\/\d{4}$/, "Invalid date format")
      .safeParse(val);

    if (!result.success) {
      result.error.issues.forEach((issue: any) => ctx.addIssue(issue));
    }
  }
});

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  start: dateValidator,
  end: dateValidator,
  source: z.string().min(1, "Source is required"),
  featured: z.boolean().default(false),
  links: z.array(
    z.object({
      value: z.string().min(1, "Link is required"),
    }),
  ),
});
