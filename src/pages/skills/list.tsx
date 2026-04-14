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

interface ISkills {
  category: string;
  id: string;
  name: string;
}

const apiData: ISkills[] = [
  {
    category: "Frontend",
    id: "1",
    name: "HTML",
  },
  {
    category: "Frontend",
    id: "2",
    name: "CSS",
  },
  {
    category: "Backend",
    id: "3",
    name: "Go",
  },
];

export const SkillsList = () => {
  const dict = Object.values(
    apiData.reduce(
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
          <Accordion>
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
