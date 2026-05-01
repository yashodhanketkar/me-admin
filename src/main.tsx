import "@/index.css";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { toast } from "sonner";

import { router } from "./routes";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("Something went wrong while executing the query", error);
      toast.error("Something went wrong");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof AxiosError) console.error(error.response?.data);
      toast.error("Something went wrong");
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
