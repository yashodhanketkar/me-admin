import { Plus } from "lucide-react";

import { Button } from "./ui/button";

export interface NewButtonProps {
  title?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewButton = ({ title, setOpen }: NewButtonProps) => {
  return (
    <Button
      size="icon"
      className="fixed bottom-20 right-10 h-14 w-14 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95"
      title={title || "New"}
      onClick={() => setOpen(true)}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
