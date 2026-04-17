import type { Research } from "@/types/types";

import { api } from "./client";

export type ResearchForm = Partial<Research>;

export const fetchResearchs = async (): Promise<Research[]> => {
  const res = await api.get("/publication");
  return res.data;
};

export const createResearch = async (payload: ResearchForm) => {
  const res = await api.post("/publication", payload);
  return res.data;
};

export const updateResearch = async (id: string, payload: ResearchForm) => {
  const res = await api.put(`/publication/${id}`, payload);
  return res.data;
};

export const deleteResearch = async (id: string) => {
  const res = await api.delete(`/publication/${id}`);
  return res.data;
};
