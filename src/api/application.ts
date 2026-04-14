import type { IApplication } from "@/types/types";

import { api } from "./client";

export type IAppFromData = Partial<IApplication>;

export const fetchApps = async (): Promise<IApplication[]> => {
  const res = await api.get("/apps/");
  return res.data;
};

export const updateAppStatus = async (id: string, status: string) => {
  return api.put(`/apps/${id}`, { status });
};

export const deleteApp = async (id: string) => {
  return api.delete(`/apps/${id}`);
};

export const createApp = async (data: IAppFromData) => {
  return api.post("/apps", { ...data, dateApplied: new Date() });
};

export const updateApp = async (id: string, data: IAppFromData) => {
  return api.put(`/apps/${id}`, { ...data });
};
