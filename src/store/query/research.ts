import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createResearch,
  deleteResearch,
  fetchResearchs,
  type ResearchForm,
  updateResearch,
} from "@/api/research";

export const useResearchsQuery = () => {
  const queryClient = useQueryClient();

  const getResearchsQuery = useQuery({
    queryKey: ["researchs"],
    queryFn: fetchResearchs,
  });

  const createResearchMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: (payload: ResearchForm) => createResearch(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["researchs"] });
    },
  });

  const updateResearchMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: ResearchForm }) =>
      updateResearch(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["researchs"] });
    },
  });

  const deleteResearchMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: string) => deleteResearch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["researchs"] });
    },
  });

  return {
    getResearchsQuery,
    createResearchMutation,
    updateResearchMutation,
    deleteResearchMutation,
  };
};
