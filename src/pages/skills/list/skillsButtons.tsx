import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useSkillsQuery } from "@/store/query/skill";
import type { Skill } from "@/types/types";

import { SkillNameEdit } from "./editDialog";

export const SkillButton = ({
  item,
  data,
}: {
  item: string;
  data: Skill[];
}) => {
  const { deleteSkillMutation } = useSkillsQuery();
  const [open, toggleOpen] = useState(false);

  const handleDelete = () => {
    const updatedItem = data.filter((it) => it.name === item)[0];
    deleteSkillMutation.mutate(updatedItem.id);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <Badge
            variant="secondary"
            className="px-3 py-1 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground cursor-context-menu"
          >
            {item}
          </Badge>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuGroup>
            <ContextMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">
              SKill Options
            </ContextMenuLabel>
            <ContextMenuItem onClick={() => toggleOpen(true)}>
              Update Name
            </ContextMenuItem>
            <ContextMenuItem
              onClick={handleDelete}
              className="text-destructive focus:bg-destructive focus:text-white"
            >
              Delete Skill
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <SkillNameEdit
        name={item}
        skills={data}
        open={open}
        toggleOpen={toggleOpen}
      />
    </>
  );
};
