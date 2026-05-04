import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useExperiencesQuery } from "@/store/query/experience";
import type { Experience, ExperienceDTO } from "@/types";

import { ExperienceFormGeneric } from "./form";

export const UpdateExperience = ({
  experience,
}: {
  experience: Experience;
}) => {
  const [open, setOpen] = useState(false);
  const { updateExperienceMutation } = useExperiencesQuery();

  const handleUpdate = async (data: ExperienceDTO) => {
    updateExperienceMutation.mutate({ id: experience.id, payload: data });
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
        <ExperienceFormGeneric
          title="Edit Experience"
          description="Update your experience details"
          submitLabel="Update"
          initialData={{ ...experience }}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};
