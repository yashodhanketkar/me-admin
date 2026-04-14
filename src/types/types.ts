export const statuses = [
  "Applied",
  "Phone Screen",
  "Interview",
  "Offer",
  "Rejected",
] as const;

export type Status = (typeof statuses)[number];

export interface IApplication {
  _id: string;
  userId: string;
  company: string;
  role: string;
  jdLink?: string;
  notes?: string;
  dateApplied: Date;
  status: Status;
  salaryRange?: string;
  skills?: string[];
}

export type User = {
  email: string;
  password: string;
};

export type Experience = {
  id: string;
  name: string;
  company: string;
  start: string;
  end: string;
  description: string;
};

export type Education = {
  id: string;
  degree: string;
  unviersity: string;
  end: string;
  grades: string;
  heading: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  source: string;
  links: string[];
  featured: boolean;
};

export type Research = {
  id: string;
  name: string;
  description: string;
  abstract: string;
  authors: string[];
  date: string;
  doi: string;
  journal: string;
  featured: boolean;
};

export type Social = {
  id: string;
  name: string;
  url: string;
  type: string;
};

export type Skill = {
  category: string;
  id: string;
  name: string;
};
