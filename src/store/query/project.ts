import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createProject,
  deleteProject,
  fetchProjects,
  type ProjectForm,
  updateProject,
} from "@/api/project";

export const useProjectsQuery = () => {
  const queryClient = useQueryClient();

  const getProjectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const createProjectMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: (payload: ProjectForm) => createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Created project");
    },
  });

  const updateProjectMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: ProjectForm }) =>
      updateProject(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Updated project");
    },
  });

  const deleteProjectMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Deleted project");
    },
  });

  return {
    getProjectsQuery,
    createProjectMutation,
    updateProjectMutation,
    deleteProjectMutation,
  };
};
