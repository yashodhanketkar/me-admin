import { Plus } from "lucide-react";
import { useState } from "react";

import { NewButton } from "@/components/addbutton";
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
      <NewButton title="Add Education" setOpen={setOpen} />
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
