import { API } from "@/lib/config";

export const getUsers = async (): Promise<any[]> => {
  return fetch(API + "user", { cache: "reload" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data.result;
    })
    .catch((err) => console.log(err));
};

export const getUser = async (id: string) => {
  return fetch(API + "user/" + id, { cache: "reload" })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data.result;
    })
    .catch((err) => console.log(err));
};
