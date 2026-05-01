import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Created experience");
    },
  });

  const updateExperienceMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: ExperienceForm }) =>
      updateExperience(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Updated experience");
    },
  });

  const deleteExperienceMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Deleted experience");
    },
  });

  return {
    getExperiencesQuery,
    createExperienceMutation,
    updateExperienceMutation,
    deleteExperienceMutation,
  };
};
