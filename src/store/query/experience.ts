import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createExperience,
  deleteExperience,
  type ExperienceForm,
  fetchExperiences,
  updateExperience,
} from "@/api/experience";

export const useExperiencesQuery = () => {
  const queryClient = useQueryClient();

  const getExperiencesQuery = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });

  const createExperienceMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: (payload: ExperienceForm) => createExperience(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences", "dashboard"] });
    },
  });

  const updateExperienceMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: ExperienceForm }) =>
      updateExperience(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences", "dashboard"] });
    },
  });

  const deleteExperienceMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences", "dashboard"] });
    },
  });

  return {
    getExperiencesQuery,
    createExperienceMutation,
    updateExperienceMutation,
    deleteExperienceMutation,
  };
};
