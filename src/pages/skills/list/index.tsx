import { CardWrapper } from "@/components/cardwrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSkillsQuery } from "@/store/query/skill";
import type { Skill } from "@/types";

import { skillFormatter } from "../common";
import { SkillButton } from "./skillsButtons";

export const SkillsList = () => {
  const { getSkillsQuery } = useSkillsQuery();
  const { data, isLoading, isError, error } = getSkillsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  const dict = skillFormatter(data);

  return (
    <CardWrapper
      title="Skills"
      description="List of skills"
      render={
        <div className="space-y-4 mb-4">
          {dict.map(({ category, name }) => (
            <SkillCard
              key={category}
              category={category}
              name={name}
              data={data}
            />
          ))}
        </div>
      }
    />
  );
};

interface SkillCardProps {
  category: string;
  name: string[];
  data: Skill[];
}

const SkillCard = ({ category, name, data }: SkillCardProps) => {
  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="bg-muted/10 py-3 border-b">
        <CardTitle className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
          {category}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-wrap gap-2">
        {name.map((it) => (
          <SkillButton key={it} item={it} data={data} />
        ))}
      </CardContent>
    </Card>
  );
};
