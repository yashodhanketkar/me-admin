import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEducationsQuery } from "@/store/query/education";
import type { EducationDTO } from "@/types";

import { EducationFormGeneric } from "./form";

export const CreateEducation = () => {
  const [open, setOpen] = useState(false);
  const { createEducationMutation } = useEducationsQuery();

  const handleCreate = async (data: EducationDTO) => {
    createEducationMutation.mutate(data, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="icon"
        className="fixed bottom-10 right-10 h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
        title="Add Education"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <DialogContent>
        <EducationFormGeneric
          title="New Education"
          description="Add a new education to your portfolio"
          submitLabel="Create"
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
};
