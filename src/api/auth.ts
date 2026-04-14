import { api } from "./client";

export type AuthForm = {
  email: string;
  password: string;
};

export const login = async (data: AuthForm) => {
  const res = await api.post("/user/login", { ...data });
  return res;
};

export const register = async (data: AuthForm) => {
  const res = await api.post("/user/register", { ...data });
  return res;
};
