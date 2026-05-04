import type { Experience } from "@/types";

import { api } from "./client";

export type ExperienceForm = Partial<Experience>;

export const fetchExperiences = async (): Promise<Experience[]> => {
  const res = await api.get("/experience");
  return res.data;
};

export const createExperience = async (payload: ExperienceForm) => {
  const res = await api.post("/experience", payload);
  return res.data;
};

export const updateExperience = async (id: string, payload: ExperienceForm) => {
  const res = await api.put(`/experience/${id}`, payload);
  return res.data;
};

export const deleteExperience = async (id: string) => {
  const res = await api.delete(`/experience/${id}`);
  return res.data;
};
