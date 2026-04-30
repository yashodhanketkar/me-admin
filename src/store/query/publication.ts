import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPublication,
  deletePublication,
  fetchPublications,
  type PublicationForm,
  updatePublication,
} from "@/api/research";

export const usePublicationsQuery = () => {
  const queryClient = useQueryClient();

  const getPublicationsQuery = useQuery({
    queryKey: ["researchs"],
    queryFn: fetchPublications,
  });

  const createPublicationMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: (payload: PublicationForm) => createPublication(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["researchs"] });
    },
  });

  const updatePublicationMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: PublicationForm }) =>
      updatePublication(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["researchs"] });
    },
  });

  const deletePublicationMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: string) => deletePublication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["researchs"] });
    },
  });

  return {
    getPublicationsQuery,
    createPublicationMutation,
    updatePublicationMutation,
    deletePublicationMutation,
  };
};
