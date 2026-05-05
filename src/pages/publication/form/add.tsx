import { useState } from "react";

import { NewButton } from "@/components/addbutton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePublicationsQuery } from "@/store/query/publication";

import { PublicationFormGeneric } from "./form";
import { type PublicationDTO } from "./types";

export const CreatePublication = () => {
  const [open, setOpen] = useState(false);
  const { createPublicationMutation } = usePublicationsQuery();

  const handleCreate = async (data: PublicationDTO) => {
    const payload = {
      ...data,
      authors: data.authors.map((a) => a.value),
    };
    createPublicationMutation.mutate(payload, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <NewButton title="Add Publication" setOpen={setOpen} />
      <DialogContent>
        <PublicationFormGeneric
          title="New publication"
          description="Add a new publication to your portfolio"
          submitLabel="Create"
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
};
