import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createSocial,
  deleteSocial,
  fetchSocials,
  type SocialForm,
  updateSocial,
} from "@/api/social";

export const useSocialsQuery = () => {
  const queryClient = useQueryClient();

  const getSocialsQuery = useQuery({
    queryKey: ["socials"],
    queryFn: fetchSocials,
  });

  const createSocialMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: (payload: SocialForm) => createSocial(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
      toast.success("Created social");
    },
  });

  const updateSocialMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: SocialForm }) =>
      updateSocial(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
      toast.success("Updated social");
    },
  });

  const deleteSocialMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: string) => deleteSocial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
      toast.success("Deleted social");
    },
  });

  return {
    getSocialsQuery,
    createSocialMutation,
    updateSocialMutation,
    deleteSocialMutation,
  };
};
