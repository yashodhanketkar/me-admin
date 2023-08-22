import { API } from "@/lib/config";

const loginUser = async (data: Pick<User, "username" | "password">) => {
  return fetch(API + "/auth/login", {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => data.user)
    .catch((err) => console.log(err));
};

const logoutUser = async () => {
  return fetch(API + "auth/logout", {
    cache: "no-store",
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const checkAuth = async (): Promise<void | {
  user: string;
  role: string;
}> => {
  return fetch(API + "auth", {
    cache: "no-store",
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => {
      return {
        user: res.user,
        role: res.role,
      };
    })
    .catch((err) => console.log(err));
};

export { checkAuth, loginUser, logoutUser };
