import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePublicationsQuery } from "@/store/query/publication";
import type { Publication } from "@/types";

import { PublicationFormGeneric } from "./form";
import type { PublicationDTO } from "./types";

export const UpdatePublication = ({
  publication,
}: {
  publication: Publication;
}) => {
  const [open, setOpen] = useState(false);
  const { updatePublicationMutation } = usePublicationsQuery();

  const handleUpdate = async (data: PublicationDTO) => {
    const payload = { ...data, authors: data.authors.map((a) => a.value) };
    updatePublicationMutation.mutate({ id: publication.id, payload });
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
        <PublicationFormGeneric
          title="Edit publication"
          description="Update your publication details"
          submitLabel="Update"
          initialData={{
            ...publication,
            authors: publication.authors?.map((l: string) => ({ value: l })),
          }}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};
