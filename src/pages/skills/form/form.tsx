import z from "zod";

export const skillSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    customCategory: z.string().optional(),
  })
  .refine(
    (data) =>
      data.category !== "custom" ||
      (data.customCategory && data.customCategory.length > 0),
    {
      message: "Please enter a new category",
      path: ["customCategory"],
    },
  );
