import type { Research } from "@/types/types";

import { api } from "./client";

export type ResearchForm = Partial<Research>;

export const fetchResearchs = async (): Promise<Research[]> => {
  const res = await api.get("/research");
  return res.data;
};

export const createResearch = async (payload: ResearchForm) => {
  const res = await api.post("/research", payload);
  return res.data;
};

export const updateResearch = async (id: string, payload: ResearchForm) => {
  const res = await api.put(`/research/${id}`, payload);
  return res.data;
};

export const deleteResearch = async (id: string) => {
  const res = await api.delete(`/research/${id}`);
  return res.data;
};
