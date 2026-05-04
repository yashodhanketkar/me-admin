import z from "zod";

import type { SocialType } from "@/types";

const LINKEDINrx = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
const GITHUBrx = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/;
const ORCIDrx = /^https?:\/\/(www\.)?orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;
const YOUTUBErx =
  /^https?:\/\/(www\.)?youtube\.com\/(channel\/UC[\w-]{21}[AQgw]|(c\/|user\/)?[\w@-]+)$/;

export const socialSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    url: z
      .string()
      .min(1, "Url is required")
      .pipe(z.url().min(1, "URL is Invalid")),
    type: z.enum(["linkedin", "github", "home", "orcid", "web", "youtube"]),
  })
  .superRefine((val, ctx) => {
    validators[val.type]?.(val.url, ctx);
  });

const validators: Record<
  SocialType,
  ((url: string, ctx: z.RefinementCtx) => void) | undefined
> = {
  linkedin: (url, ctx) => {
    if (!LINKEDINrx.test(url)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid LinkedIn profile URL",
        path: ["url"],
      });
    }
  },

  github: (url, ctx) => {
    if (!GITHUBrx.test(url)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid GitHub profile URL",
        path: ["url"],
      });
    }
  },

  orcid: (url, ctx) => {
    if (!ORCIDrx.test(url)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid ORCID URL",
        path: ["url"],
      });
    }
  },

  youtube: (url, ctx) => {
    if (!YOUTUBErx.test(url)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid YouTube URL",
        path: ["url"],
      });
    }
  },

  home: undefined,
  web: undefined,
};

export const socialOptions: {
  order: number;
  title: SocialType;
  label: string;
}[] = [
  { order: 1, title: "github", label: "Github" },
  { order: 2, title: "linkedin", label: "Linkedin" },
  { order: 3, title: "youtube", label: "Youtube" },
  { order: 4, title: "orcid", label: "ORCID" },
  { order: 5, title: "home", label: "home" },
  { order: 6, title: "web", label: "Other" },
];
