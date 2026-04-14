import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export const SkillsForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Skills
          <CardDescription>Add your skills</CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="">L</FieldLabel>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
