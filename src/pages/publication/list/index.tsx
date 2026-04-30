import { ScrollArea } from "@/components/ui/scroll-area";
import { usePublicationsQuery } from "@/store/query/publication";

import { PublicationCard } from "./card";

export const PublicationsList = () => {
  const { getPublicationsQuery } = usePublicationsQuery();
  const { data, isLoading, isError, error } = getPublicationsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  return (
    <div className="h-[82vh] flex flex-col bg-card border text-card-foreground shadow-sm rounded-xl overflow-hidden">
      <div className="p-6 pb-4 shrink-0 border-b bg-muted/5">
        <h2 className="text-2xl font-bold tracking-tight">Publications</h2>
        <h3 className="text-sm text-muted-foreground font-medium">
          List of publications
        </h3>
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-4 p-6">
          {data.map((d) => (
            <PublicationCard key={d.id} publication={d} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
