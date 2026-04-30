import z from "zod";

export const publicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  abstract: z.string().min(1, "Abstract is required"),
  date: z
    .string()
    .regex(/^\d{2},\s\d{4}$/, "Invalid date format")
    .min(1, "date is required"),
  doi: z
    .string()
    .regex(
      /^https:\/\/doi\.org\/10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i,
      "Invalid DOI URL",
    )
    .min(1, "doi is required"),
  journal: z.string().min(1, "journal is required"),
  featured: z.boolean(),
  authors: z.array(
    z.object({
      value: z.string().min(1, "Author is required"),
    }),
  ),
});
