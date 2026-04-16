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
          <Badge variant="secondary" className="text-base">
            {item}
          </Badge>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>Options</ContextMenuLabel>
            <ContextMenuItem onClick={() => toggleOpen(true)}>
              Update
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDelete}>Delete</ContextMenuItem>
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
