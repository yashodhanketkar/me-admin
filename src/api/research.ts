import type { Publication } from "@/types/types";

import { api } from "./client";

export type PublicationForm = Partial<Publication>;

export const fetchPublications = async (): Promise<Publication[]> => {
  const res = await api.get("/publication");
  return res.data;
};

export const createPublication = async (payload: PublicationForm) => {
  const res = await api.post("/publication", payload);
  return res.data;
};

export const updatePublication = async (
  id: string,
  payload: PublicationForm,
) => {
  const res = await api.put(`/publication/${id}`, payload);
  return res.data;
};

export const deletePublication = async (id: string) => {
  const res = await api.delete(`/publication/${id}`);
  return res.data;
};
