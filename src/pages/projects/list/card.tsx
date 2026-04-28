import { CalendarDays, Link, Link2, Star, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProjectsQuery } from "@/store/query/project";
import type { Project } from "@/types/types";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { updateProjectMutation, deleteProjectMutation } = useProjectsQuery();

  const toggleFeatured = () => {
    updateProjectMutation.mutate({
      id: project.id,
      payload: {
        featured: !project.featured,
      },
    });
  };

  const deleteProject = () => {
    deleteProjectMutation.mutate(project.id);
  };

  return (
    <Card
      className={` group relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-ring/20 ${
        project?.featured && " border-primary/50 bg-primary/[0.02] "
      }`}
    >
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardDescription>{project.source}</CardDescription>
          <div className="absolute right-3 top-3 z-10">
            <FeatureButton
              featured={project.featured}
              toggleFeatured={toggleFeatured}
            />
          </div>
        </div>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
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
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/70">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>
            {project.start} — {project.end}
          </span>
        </div>
        <DeleteButton deleteProject={deleteProject} />
      </CardFooter>
    </Card>
  );
};

const FeatureButton = ({
  featured,
  toggleFeatured,
}: {
  featured: boolean;
  toggleFeatured: () => void;
}) => {
  return (
    <Button
      size="icon"
      onClick={toggleFeatured}
      variant="ghost"
      type="button"
      className="cursor-pointer"
      title={featured ? "Remove from featured" : "Add to featured"}
    >
      <Star
        className={`h-3 w-3 ${featured && "fill-[#FFB900] text-[#FFB900]"}`}
      />
    </Button>
  );
};

const DeleteButton = ({ deleteProject }: { deleteProject: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
        type="button"
        className="cursor-pointer"
      >
        <Trash2 className="h-3 w-3" />
        Delete
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          Are you sure you want to delete this project?
        </DialogHeader>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
