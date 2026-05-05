import { CardWrapper } from "@/components/cardwrapper";
import { useExperiencesQuery } from "@/store/query/experience";

import { ExperienceCard } from "./card";

export const ExperiencesList = () => {
  const { getExperiencesQuery } = useExperiencesQuery();
  const { data, isLoading, isError, error } = getExperiencesQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  return (
    <CardWrapper
      title="Experiences"
      description="List of experiences"
      render={data.map((d) => (
        <ExperienceCard key={d.id} experience={d} />
      ))}
    />
  );
};
