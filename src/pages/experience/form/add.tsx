import { Plus } from "lucide-react";
import { useState } from "react";

import { NewButton } from "@/components/addbutton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useExperiencesQuery } from "@/store/query/experience";
import { type ExperienceDTO } from "@/types";

import { ExperienceFormGeneric } from "./form";

export const CreateExperience = () => {
  const [open, setOpen] = useState(false);
  const { createExperienceMutation } = useExperiencesQuery();

  const handleCreate = async (data: ExperienceDTO) => {
    createExperienceMutation.mutate(data, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <NewButton title="Add Experience" setOpen={setOpen} />
      <DialogContent>
        <ExperienceFormGeneric
          title="New Experience"
          description="Add a new experience to your portfolio"
          submitLabel="Create"
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
};
