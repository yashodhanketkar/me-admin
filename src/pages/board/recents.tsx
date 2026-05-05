import { Link } from "@tanstack/react-router";

import * as c from "@/components/ui/card";
import type { Project } from "@/types";

interface RecentsProps {
  projects: Project[];
}

export const RecentProjects = ({ projects }: RecentsProps) => {
  return (
    <c.Card className="col-span-4">
      <c.CardHeader>
        <c.CardTitle>Recent Projects</c.CardTitle>
      </c.CardHeader>
      <c.CardContent>
        <p className="text-base text-muted-foreground">
          Latest ongoing project entries.
        </p>
        <ul className="mt-2">
          {projects
            .filter((p) => !p.end)
            .sort((a, b) => a.end.localeCompare(b.end))
            .slice(0, 2)
            .map((p) => (
              <li key={p.id} className="text-muted-foreground">
                <Link
                  to={p.source}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                >
                  {p.name + " ... "}
                  <span className="italic">({p.source})</span>
                </Link>
              </li>
            ))}
        </ul>
      </c.CardContent>
    </c.Card>
  );
};
