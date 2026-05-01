import type { SocialType } from "./types";

export type User = {
  email: string;
  password: string;
};

export type ExperienceDTO = {
  name: string;
  company: string;
  start: string;
  end: string;
  description: string;
};

export type EducationDTO = {
  degree: string;
  unviersity: string;
  end: string;
  grades: string;
  heading: string;
};

export type ProjectDTO = {
  name: string;
  description: string;
  start: string;
  end: string;
  source: string;
  links: string[];
  featured: boolean;
};

export type PublicationDTO = {
  name: string;
  description: string;
  abstract: string;
  authors: string[];
  date: string;
  doi: string;
  journal: string;
  featured: boolean;
};

export type SocialDTO = {
  name: string;
  url: string;
  type: SocialType;
};

export type SkillDTO = {
  category: string;
  name: string;
};
