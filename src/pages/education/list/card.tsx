import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

import { ButtonGroup } from "@/components/ui/button-group";
import * as c from "@/components/ui/card";
import { useEducationsQuery } from "@/store/query/education";
import type { Education } from "@/types";

import { UpdateEducation } from "../form/update";
import { DeleteButton } from "./delete";

export const EducationCard = ({ education }: { education: Education }) => {
  const { deleteEducationMutation } = useEducationsQuery();

  const deleteEducation = () => {
    deleteEducationMutation.mutate(education.id);
    toast.success("Deleted education");
  };

  return (
    <c.Card className="group relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-ring/20">
      <c.CardHeader>
        <div className="space-y-2">
          <c.CardDescription>{education.unviersity}</c.CardDescription>
        </div>
        <c.CardTitle>{education.degree}</c.CardTitle>
      </c.CardHeader>

      <c.CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {education.heading}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {education.grades}
        </p>
      </c.CardContent>

      <c.CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/70">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{education.end}</span>
        </div>
        <ButtonGroup>
          <UpdateEducation education={education} />
          <DeleteButton deleteEducation={deleteEducation} />
        </ButtonGroup>
      </c.CardFooter>
    </c.Card>
  );
};
