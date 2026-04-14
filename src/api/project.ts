import type { Project } from "@/types/types";

import { api } from "./client";

export type ProjectForm = Partial<Project>;

export const fetchProjects = async (): Promise<Project[]> => {
  const res = await api.get("/project");
  return res.data;
};

export const createProject = async (payload: ProjectForm) => {
  const res = await api.post("/project", payload);
  return res.data;
};

export const updateProject = async (id: string, payload: ProjectForm) => {
  const res = await api.put(`/project/${id}`, payload);
  return res.data;
};

export const deleteProject = async (id: string) => {
  const res = await api.delete(`/project/${id}`);
  return res.data;
};
