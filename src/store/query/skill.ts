import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createSkill,
  deleteSkill,
  fetchSkills,
  type SkillForm,
  updateSkill,
} from "@/api/skills";

export const useSkillsQuery = () => {
  const queryClient = useQueryClient();

  const getSkillsQuery = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  const createSkillMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: (payload: SkillForm) => createSkill(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  const updateSkillMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: SkillForm }) =>
      updateSkill(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  const deleteSkillMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  return {
    getSkillsQuery,
    createSkillMutation,
    updateSkillMutation,
    deleteSkillMutation,
  };
};
