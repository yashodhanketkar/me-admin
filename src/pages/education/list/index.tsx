import { CardWrapper } from "@/components/cardwrapper";
import { useEducationsQuery } from "@/store/query/education";

import { EducationCard } from "./card";

export const EducationsList = () => {
  const { getEducationsQuery } = useEducationsQuery();
  const { data, isLoading, isError, error } = getEducationsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  return (
    <CardWrapper
      title="Education"
      description="List of educations"
      render={data.map((d) => (
        <EducationCard key={d.id} education={d} />
      ))}
    />
  );
};
