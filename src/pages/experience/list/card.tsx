import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

import { ButtonGroup } from "@/components/ui/button-group";
import * as c from "@/components/ui/card";
import { useExperiencesQuery } from "@/store/query/experience";
import type { Experience } from "@/types";

import { UpdateExperience } from "../form/update";
import { DeleteButton } from "./delete";

export const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const { deleteExperienceMutation } = useExperiencesQuery();

  const deleteExperience = () => {
    deleteExperienceMutation.mutate(experience.id);
    toast.success("Deleted experience");
  };

  return (
    <c.Card className="group relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-ring/20">
      <c.CardHeader className="pb-3">
        <div className="space-y-2">
          <c.CardDescription>{experience.company}</c.CardDescription>
        </div>
        <c.CardTitle>{experience.name}</c.CardTitle>
      </c.CardHeader>

      <c.CardContent className="pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {experience.description}
        </p>
      </c.CardContent>

      <c.CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/70">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>
            {experience.start} — {experience.end}
          </span>
        </div>
        <ButtonGroup>
          <UpdateExperience experience={experience} />
          <DeleteButton deleteExperience={deleteExperience} />
        </ButtonGroup>
      </c.CardFooter>
    </c.Card>
  );
};
