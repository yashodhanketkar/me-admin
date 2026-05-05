import z from "zod";

const dateValidator = z.string().superRefine((val, ctx) => {
  if (val) {
    const result = z
      .string()
      .regex(
        /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec),\s\d{4}$/,
        "Invalid date format",
      )
      .safeParse(val);

    if (!result.success) {
      result.error.issues.forEach((issue) => ctx.addIssue(issue.message));
    }
  }
});

export const experienceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  start: dateValidator,
  end: dateValidator,
  description: z.string().min(1, "Description is required"),
});
