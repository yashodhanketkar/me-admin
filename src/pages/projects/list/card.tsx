import { CalendarDays, Link, Link2 } from "lucide-react";
import { toast } from "sonner";

import { FeatureButton } from "@/components/feature";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import * as c from "@/components/ui/card";
import { useProjectsQuery } from "@/store/query/project";
import type { Project } from "@/types/types";

import { UpdateProject } from "../form/update";
import { DeleteButton } from "./delete";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { updateProjectMutation, deleteProjectMutation } = useProjectsQuery();

  const toggleFeatured = () => {
    updateProjectMutation.mutate({
      id: project.id,
      payload: { featured: !project.featured },
    });
  };

  const deleteProject = () => {
    deleteProjectMutation.mutate(project.id);
    toast.success("Deleted project");
  };

  return (
    <c.Card
      className={` group relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-ring/20 ${
        project?.featured && " border-primary/50 bg-primary/[0.02] "
      }`}
    >
      <c.CardHeader className="pb-3">
        <div className="space-y-2">
          <c.CardDescription>{project.source}</c.CardDescription>
        </div>
        <c.CardTitle>{project.name}</c.CardTitle>
      </c.CardHeader>

      <c.CardContent className="pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {project.links?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.links.map((link, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="h-8 rounded-md text-xs font-medium"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-[12ch] inline-flex gap-2"
                >
                  {link.includes("github") ? (
                    <Link className="mr-2 h-3.5 w-3.5" />
                  ) : (
                    <Link2 className="mr-2 h-3.5 w-3.5" />
                  )}
                  {link.includes("github") ? "Visit Repo" : `View Project`}
                </a>
              </Button>
            ))}
          </div>
        )}
      </c.CardContent>

      <c.CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/70">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>
            {project.start} — {project.end}
          </span>
        </div>
        <ButtonGroup>
          <FeatureButton
            featured={project.featured}
            toggleFeatured={toggleFeatured}
          />
          <UpdateProject project={project} />
          <DeleteButton deleteProject={deleteProject} />
        </ButtonGroup>
      </c.CardFooter>
    </c.Card>
  );
};
