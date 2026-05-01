import { ScrollArea } from "@/components/ui/scroll-area";
import { useEducationsQuery } from "@/store/query/education";

import { EducationCard } from "./card";

export const EducationsList = () => {
  const { getEducationsQuery } = useEducationsQuery();
  const { data, isLoading, isError, error } = getEducationsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  return (
    <div className="h-[82vh] flex flex-col bg-card border text-card-foreground shadow-sm rounded-xl overflow-hidden">
      <div className="p-6 pb-4 shrink-0 border-b bg-muted/5">
        <h2 className="text-2xl font-bold tracking-tight">Educations</h2>
        <h3 className="text-sm text-muted-foreground font-medium">
          List of educations
        </h3>
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-4 p-6">
          {data.map((d) => (
            <EducationCard key={d.id} education={d} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
