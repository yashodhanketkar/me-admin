import type { Social } from "@/types";

import { api } from "./client";

export type SocialForm = Partial<Social>;

export const fetchSocials = async (): Promise<Social[]> => {
  const res = await api.get("/social");
  return res.data;
};

export const createSocial = async (payload: SocialForm) => {
  const res = await api.post("/social", payload);
  return res.data;
};

export const updateSocial = async (id: string, payload: SocialForm) => {
  const res = await api.put(`/social/${id}`, payload);
  return res.data;
};

export const deleteSocial = async (id: string) => {
  const res = await api.delete(`/social/${id}`);
  return res.data;
};
