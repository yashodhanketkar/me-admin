import { Plus } from "lucide-react";
import { useState } from "react";

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
      <Button
        size="icon"
        className="fixed bottom-10 right-10 h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
        title="Add Experience"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
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
