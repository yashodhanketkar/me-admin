import { CalendarDays, Link2 } from "lucide-react";
import { toast } from "sonner";

import { FeatureButton } from "@/components/feature";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as c from "@/components/ui/card";
import { usePublicationsQuery } from "@/store/query/publication";
import type { Publication } from "@/types";

import { UpdatePublication } from "../form/update";
import { DeleteButton } from "./delete";

export const PublicationCard = ({
  publication,
}: {
  publication: Publication;
}) => {
  const { deletePublicationMutation, updatePublicationMutation } =
    usePublicationsQuery();

  const toggleFeatured = () => {
    updatePublicationMutation.mutate({
      id: publication.id,
      payload: { featured: !publication.featured },
    });
  };

  const deletePublication = () => {
    deletePublicationMutation.mutate(publication.id);
    toast.success("Deleted publication");
  };

  return (
    <c.Card className="group relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-ring/20">
      <c.CardHeader className="pb-3">
        <div className="space-y-2">
          <c.CardDescription>
            {publication.authors.join(", ")}
          </c.CardDescription>
        </div>
        <c.CardTitle>{publication.name}</c.CardTitle>
      </c.CardHeader>

      <c.CardContent className="pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed text-justify">
          {publication.abstract}
        </p>
        <Button variant="outline" size="sm" className="inline-flex gap-1 mt-2">
          <Link2 className="mr-2 h-3.5 w-3.5" />
          {publication.doi}
        </Button>
      </c.CardContent>

      <c.CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/70">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>
            {publication.date} - {publication.journal}
          </span>
        </div>
        <ButtonGroup>
          <UpdatePublication publication={publication} />
          <FeatureButton
            featured={publication.featured}
            toggleFeatured={toggleFeatured}
          />
          <DeleteButton deletePublication={deletePublication} />
        </ButtonGroup>
      </c.CardFooter>
    </c.Card>
  );
};
