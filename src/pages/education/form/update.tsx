import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEducationsQuery } from "@/store/query/education";
import type { Education, EducationDTO } from "@/types";

import { EducationFormGeneric } from "./form";

export const UpdateEducation = ({ education }: { education: Education }) => {
  const [open, setOpen] = useState(false);
  const { updateEducationMutation } = useEducationsQuery();

  const handleUpdate = async (data: EducationDTO) => {
    updateEducationMutation.mutate({ id: education.id, payload: data });
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
        <EducationFormGeneric
          title="Edit Education"
          description="Update your education details"
          submitLabel="Update"
          initialData={education}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};
