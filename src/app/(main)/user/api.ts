import { API } from "@/lib/config";

export const getUsers = async (): Promise<User[]> => {
  return fetch(API + "user", { cache: "no-store" })
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => console.log(err));
};

export const getUser = async (id: string): Promise<User> => {
  return fetch(API + "user/" + id, { cache: "no-store" })
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => console.log(err));
};
