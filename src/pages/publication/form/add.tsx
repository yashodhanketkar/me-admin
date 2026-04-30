import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePublicationsQuery } from "@/store/query/publication";

import { PublicationFormGeneric } from "./form";
import { type PublicationDTO } from "./types";

export const CreatePublication = () => {
  const [open, setOpen] = useState(false);
  const { createPublicationMutation } = usePublicationsQuery();

  const handleCreate = async (data: PublicationDTO) => {
    const payload = { ...data, authors: data.authors.map((a) => a.value) };
    createPublicationMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Created publication");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="icon"
        className="fixed bottom-10 right-10 h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
        title="Add Publication"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
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
