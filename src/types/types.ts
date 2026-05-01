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

export type Publication = {
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
  id: string;
  category: string;
  name: string;
};
