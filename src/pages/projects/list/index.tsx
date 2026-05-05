import { CardWrapper } from "@/components/cardwrapper";
import { useProjectsQuery } from "@/store/query/project";

import { ProjectCard } from "./card";

export const ProjectsList = () => {
  const { getProjectsQuery } = useProjectsQuery();
  const { data, isLoading, isError, error } = getProjectsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  return (
    <CardWrapper
      title="Projects"
      description="List of projects"
      render={data.map((d) => (
        <ProjectCard key={d.id} project={d} />
      ))}
    />
  );
};
