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

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  unviersity: z.string().min(1, "Unviersity is required"),
  end: dateValidator,
  heading: z.string().min(1, "Heading is required"),
  grades: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0.1 && num <= 10.0;
    },
    {
      message: "Grades must be between 0.1 and 10.0",
    },
  ),
});
