import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProjectsQuery } from "@/store/query/project";
import type { Project } from "@/types/types";

import { ProjectFormGeneric } from "./form";
import { type ProjectDTO } from "./types";

export const UpdateProject = ({ project }: { project: Project }) => {
  const [open, setOpen] = useState(false);
  const { updateProjectMutation } = useProjectsQuery();

  const handleUpdate = async (data: ProjectDTO) => {
    const payload = { ...data, links: data.links.map((l) => l.value) };
    updateProjectMutation.mutate(
      { id: project.id, payload },
      {
        onSuccess: () => {
          toast.success("Updated project");
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="default"
        onClick={() => setOpen(true)}
        type="button"
        className="cursor-pointer"
      >
        <Pencil className="h-3 w-3" />
        Update
      </Button>
      <DialogContent>
        <ProjectFormGeneric
          title="Edit Project"
          description="Update your project details"
          submitLabel="Update"
          initialData={{
            ...project,
            links: project.links?.map((l) => ({ value: l })),
          }}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};
