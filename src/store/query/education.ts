import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createEducation,
  deleteEducation,
  type EducationForm,
  fetchEducations,
  updateEducation,
} from "@/api/education";

export const useEducationsQuery = () => {
  const queryClient = useQueryClient();

  const getEducationsQuery = useQuery({
    queryKey: ["educations"],
    queryFn: fetchEducations,
  });

  const createEducationMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: (payload: EducationForm) => createEducation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      toast.success("Created education");
    },
  });

  const updateEducationMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: EducationForm }) =>
      updateEducation(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      toast.success("Updated education");
    },
  });

  const deleteEducationMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: string) => deleteEducation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      toast.success("Deleted education");
    },
  });

  return {
    getEducationsQuery,
    createEducationMutation,
    updateEducationMutation,
    deleteEducationMutation,
  };
};
