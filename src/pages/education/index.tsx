import { CreateEducation } from "./form/add";
import { EducationsList } from "./list";

const EducationsPage = () => {
  return (
    <>
      <EducationsList />
      <CreateEducation />
    </>
  );
};

export default EducationsPage;
