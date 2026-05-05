import { CardWrapper } from "@/components/cardwrapper";
import { usePublicationsQuery } from "@/store/query/publication";

import { PublicationCard } from "./card";

export const PublicationsList = () => {
  const { getPublicationsQuery } = usePublicationsQuery();
  const { data, isLoading, isError, error } = getPublicationsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  return (
    <CardWrapper
      title="Publications"
      description="List of publications"
      render={data.map((d) => (
        <PublicationCard key={d.id} publication={d} />
      ))}
    />
  );
};
