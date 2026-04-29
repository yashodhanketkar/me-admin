import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProjectsQuery } from "@/store/query/project";

import { ProjectFormGeneric } from "./form";
import { type ProjectDTO } from "./types";

export const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const { createProjectMutation } = useProjectsQuery();

  const handleCreate = async (data: ProjectDTO) => {
    const payload = { ...data, links: data.links.map((l) => l.value) };
    createProjectMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Created project");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="icon"
        className="fixed bottom-10 right-10 h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
        title="Add Project"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <DialogContent>
        <ProjectFormGeneric
          title="New Project"
          description="Add a new project to your portfolio"
          submitLabel="Create"
          initialData={{ links: [], featured: false }}
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
};
