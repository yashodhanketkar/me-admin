import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSkillsQuery } from "@/store/query/skill";

export const SkillsList = () => {
  const { getSkillsQuery } = useSkillsQuery();
  const { data, isLoading, isError, error } = getSkillsQuery;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error: "No data!"</p>;

  const dict = Object.values(
    data.reduce(
      (acc, { category, name }) => {
        if (!acc[category]) {
          acc[category] = { category, name: [] };
        }
        acc[category].name.push(name);
        return acc;
      },
      {} as Record<string, { category: string; name: string[] }>,
    ),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Skills
          <CardDescription>Current skills</CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {dict.map((d) => (
          <Accordion key={d.name + d.category}>
            <AccordionItem value={d.category}>
              <AccordionTrigger>{d.category}</AccordionTrigger>
              <AccordionContent>{d.name.join(", ")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
};
