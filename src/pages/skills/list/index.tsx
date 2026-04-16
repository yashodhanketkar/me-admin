import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSkillsQuery } from "@/store/query/skill";

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
    <>
      {dict.map(({ category, name }) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
          </CardHeader>
          <CardContent className="inline-flex flex-wrap gap-2">
            {name.map((it) => (
              <SkillButton key={it} item={it} data={data} />
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
};
