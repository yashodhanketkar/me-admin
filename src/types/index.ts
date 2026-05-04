export type User = {
  email: string;
  password: string;
};

// Experience
export type Experience = {
  id: string;
  name: string;
  company: string;
  start: string;
  end: string;
  description: string;
};
export type ExperienceDTO = Omit<Experience, "id">;

// Education
export type Education = {
  id: string;
  degree: string;
  unviersity: string;
  end: string;
  grades: string;
  heading: string;
};
export type EducationDTO = Omit<Education, "id">;

// Project
export type Project = {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  source: string;
  links: string[];
  featured?: boolean;
};
export type ProjectDTO = Omit<Project, "id">;

// Publication
export type Publication = {
  id: string;
  name: string;
  description: string;
  abstract: string;
  authors: string[];
  date: string;
  doi: string;
  journal: string;
  featured?: boolean;
};
export type PublicationDTO = Omit<Publication, "id">;

// Social
export type SocialType =
  | "linkedin"
  | "home"
  | "github"
  | "web"
  | "orcid"
  | "youtube";

export type Social = {
  id: string;
  name: string;
  url: string;
  type: SocialType;
};
export type SocialDTO = Omit<Social, "id">;

// Skill
export type Skill = {
  id: string;
  category: string;
  name: string;
};
export type SkillDTO = Omit<Skill, "id">;
