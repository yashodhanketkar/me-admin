import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as d from "@/components/ui/dialog";
export const DeleteButton = ({
  deleteProject,
}: {
  deleteProject: () => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <d.Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        className="cursor-pointer"
      >
        <Trash2 className="h-3 w-3" />
        Delete
      </Button>
      <d.DialogContent>
        <d.DialogHeader>
          <d.DialogTitle>Delete Project</d.DialogTitle>
          Are you sure you want to delete this project?
        </d.DialogHeader>
        <d.DialogFooter>
          <ButtonGroup orientation="horizontal">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => {
                deleteProject();
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </d.DialogFooter>
      </d.DialogContent>
    </d.Dialog>
  );
};
