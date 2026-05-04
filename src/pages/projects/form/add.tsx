import { Plus } from "lucide-react";
import { useState } from "react";

import { NewButton } from "@/components/addbutton";
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
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <NewButton title="Add Project" setOpen={setOpen} />
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
