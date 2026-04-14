import type { Skill } from "@/types/types";

import { api } from "./client";

export type SkillForm = Partial<Skill>;

export const fetchSkills = async (): Promise<Skill[]> => {
  const res = await api.get("/skill");
  return res.data;
};

export const createSkill = async (payload: SkillForm) => {
  const res = await api.post("/skill", payload);
  return res.data;
};

export const updateSkill = async (id: string, payload: SkillForm) => {
  const res = await api.put(`/skill/${id}`, payload);
  return res.data;
};

export const deleteSkill = async (id: string) => {
  const res = await api.delete(`/skill/${id}`);
  return res.data;
};
