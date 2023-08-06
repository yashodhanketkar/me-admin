import { API } from "@/lib/config";

const getProjects = async (): Promise<Project[]> => {
  return fetch(API + "project", { cache: "no-store" })
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => console.log(err));
};

const getProject = async (id: string): Promise<Project> => {
  return fetch(API + "project/" + id, { cache: "reload" })
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => console.log(err));
};

const createProject = async (data: Project) => {
  return fetch(API + "project", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const updateProject = async (id: string, data: Project) => {
  return fetch(API + "project/" + id, {
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const deleteProject = async (id: string) => {
  return fetch(API + "project/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = "/projects";
    })
    .catch((err) => console.log(err));
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
