import { CreateExperience } from "./form/add";
import { ExperiencesList } from "./list";

const ExperiencesPage = () => {
  return (
    <>
      <ExperiencesList />
      <CreateExperience />
    </>
  );
};

export default ExperiencesPage;
