import { Plus } from "lucide-react";

import { Button } from "./ui/button";
import { Kbd } from "./ui/kbd";
import * as t from "./ui/tooltip";

export interface NewButtonProps {
  title?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewButton = ({ title, setOpen }: NewButtonProps) => {
  return (
    <t.Tooltip>
      <t.TooltipTrigger
        render={
          <Button
            id="new-button"
            size="icon"
            className="fixed bottom-15 right-10 h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
            onClick={() => setOpen(true)}
            autoFocus
          >
            <Plus className="h-6 w-6" />
          </Button>
        }
      />
      <t.TooltipContent className="px-2">
        {title}
        <Kbd data-icon="inline-end" className="translate-x-0.5">
          Ctrl + N
        </Kbd>
      </t.TooltipContent>
    </t.Tooltip>
  );
};
