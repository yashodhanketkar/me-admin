import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createApp,
  fetchApps,
  type IAppFromData,
  updateApp,
  updateAppStatus,
} from "@/api/application";
import type { Status } from "@/types/types";

export const useApps = () => {
  const queryClient = useQueryClient();

  const getAppsQuery = useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      updateAppStatus(id, status),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["apps"] });
    },
  });

  const updateAppMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: IAppFromData }) =>
      updateApp(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });

  const createAppMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: ({ payload }: { payload: IAppFromData }) => createApp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });

  return {
    getAppsQuery,
    updateStatusMutation,
    updateAppMutation,
    createAppMutation,
  };
};
