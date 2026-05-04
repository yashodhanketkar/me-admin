import { useState } from "react";

import { NewButton } from "@/components/addbutton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSocialsQuery } from "@/store/query/social";
import type { SocialDTO } from "@/types";

import { SocialFormGeneric } from "./form";

export const CreateSocial = () => {
  const [open, setOpen] = useState(false);
  const { createSocialMutation } = useSocialsQuery();

  const handleCreate = async (data: SocialDTO) => {
    createSocialMutation.mutate(data, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <NewButton title="Add Social" setOpen={setOpen} />
      <DialogContent>
        <SocialFormGeneric
          title="New Social"
          description="Add a new social to your portfolio"
          submitLabel="Create"
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
};
