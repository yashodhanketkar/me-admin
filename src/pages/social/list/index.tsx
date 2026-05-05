import { CardWrapper } from "@/components/cardwrapper";
import { useSocialsQuery } from "@/store/query/social";

import { SocialCard } from "./card";

export const SocialsList = () => {
  const { getSocialsQuery } = useSocialsQuery();
  const { data, isLoading, isError, error } = getSocialsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  return (
    <CardWrapper
      title="Socials"
      description="List of socials"
      render={data.map((d) => (
        <SocialCard key={d.id} social={d} />
      ))}
    />
  );
};
