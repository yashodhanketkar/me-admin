import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSocialsQuery } from "@/store/query/social";
import { type SocialDTO } from "@/types/dto";
import type { Social } from "@/types/types";

import { SocialFormGeneric } from "./form";

export const UpdateSocial = ({ social }: { social: Social }) => {
  const [open, setOpen] = useState(false);
  const { updateSocialMutation } = useSocialsQuery();

  const handleUpdate = async (data: SocialDTO) => {
    updateSocialMutation.mutate({
      id: social.id,
      payload: data,
    });
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
        <SocialFormGeneric
          title="Edit Social"
          description="Update your social details"
          submitLabel="Update"
          initialData={social}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};
