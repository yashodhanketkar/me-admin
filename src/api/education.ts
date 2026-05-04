import type { Education } from "@/types";

import { api } from "./client";

export type EducationForm = Partial<Education>;

export const fetchEducations = async (): Promise<Education[]> => {
  const res = await api.get("/education");
  return res.data;
};

export const createEducation = async (payload: EducationForm) => {
  const res = await api.post("/education", payload);
  return res.data;
};

export const updateEducation = async (id: string, payload: EducationForm) => {
  const res = await api.put(`/education/${id}`, payload);
  return res.data;
};

export const deleteEducation = async (id: string) => {
  const res = await api.delete(`/education/${id}`);
  return res.data;
};
